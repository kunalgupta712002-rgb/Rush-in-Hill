import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import {
  db,
  BOOTSTRAP_ADMIN_EMAIL,
  BLUEPRINT_LIMITS,
  truncateString,
  OperationType,
  handleFirestoreError,
} from '../firebase';
import {
  UserAccountProfile,
  CustomerType,
  Order,
  OrderStatus,
  PaymentStatus,
  CustomerFeedback,
} from '../types';

function timestampToIso(ts: unknown): string {
  if (ts instanceof Timestamp) {
    return ts.toDate().toISOString();
  }
  if (typeof ts === 'string') {
    return ts;
  }
  return new Date().toISOString();
}

function sanitizePhoneOptional(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').slice(0, 10);
  if (BLUEPRINT_LIMITS.OPTIONAL_PHONE_REGEX.test(cleaned)) {
    return cleaned;
  }
  return '';
}

function sanitizePhoneRequired(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').slice(0, 10);
  return cleaned;
}

export const FirebaseService = {
  async checkIsAdmin(user: User): Promise<boolean> {
    if (!user.emailVerified) return false;
    if (user.email === BOOTSTRAP_ADMIN_EMAIL) return true;
    const path = `admins/${user.uid}`;
    try {
      const snap = await getDoc(doc(db, 'admins', user.uid));
      return snap.exists();
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async getUserProfile(uid: string): Promise<UserAccountProfile | null> {
    const path = `users/${uid}`;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) return null;
      const data = snap.data();
      return {
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
        phone: data.phone || '',
        customerType: (data.customerType as CustomerType) || 'DGU Student',
        photoURL: data.photoURL || undefined,
        createdAt: timestampToIso(data.createdAt),
        updatedAt: timestampToIso(data.updatedAt),
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async createUserProfile(
    user: User,
    details: { displayName?: string; phone?: string; customerType?: CustomerType }
  ): Promise<UserAccountProfile> {
    const path = `users/${user.uid}`;
    const displayName = truncateString(
      details.displayName || user.displayName || user.email?.split('@')[0] || 'Student',
      BLUEPRINT_LIMITS.DISPLAY_NAME_MAX
    );
    const email = truncateString(user.email || '', BLUEPRINT_LIMITS.EMAIL_MAX);
    const phone = sanitizePhoneOptional(details.phone || '');
    const customerType: CustomerType = details.customerType || 'DGU Student';
    const photoURL = user.photoURL
      ? truncateString(user.photoURL, BLUEPRINT_LIMITS.PHOTO_URL_MAX)
      : '';

    const payload: Record<string, unknown> = {
      uid: user.uid,
      displayName,
      email,
      phone,
      customerType,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (photoURL) {
      payload.photoURL = photoURL;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), payload);
      const nowIso = new Date().toISOString();
      return {
        uid: user.uid,
        displayName,
        email,
        phone,
        customerType,
        photoURL: photoURL || undefined,
        createdAt: nowIso,
        updatedAt: nowIso,
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateUserProfile(
    uid: string,
    updates: { displayName: string; phone: string; customerType: CustomerType; photoURL?: string }
  ): Promise<void> {
    const path = `users/${uid}`;
    const displayName = truncateString(updates.displayName, BLUEPRINT_LIMITS.DISPLAY_NAME_MAX);
    const phone = sanitizePhoneOptional(updates.phone);
    const payload: Record<string, unknown> = {
      displayName,
      phone,
      customerType: updates.customerType,
      updatedAt: serverTimestamp(),
    };
    if (updates.photoURL) {
      payload.photoURL = truncateString(updates.photoURL, BLUEPRINT_LIMITS.PHOTO_URL_MAX);
    }

    try {
      await updateDoc(doc(db, 'users', uid), payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  subscribeToOrders(
    uid: string,
    isBootstrapAdmin: boolean,
    onData: (orders: Order[]) => void,
    onError?: (err: Error) => void
  ): Unsubscribe {
    const path = 'orders';
    const ordersRef = collection(db, path);
    const q = isBootstrapAdmin ? query(ordersRef) : query(ordersRef, where('customerId', '==', uid));

    return onSnapshot(
      q,
      (snapshot) => {
        const list: Order[] = snapshot.docs
          .map((d) => {
            const data = d.data();
            return {
              id: data.id || d.id,
              customerId: data.customerId,
              customerName: data.customerName,
              phone: data.phone,
              email: data.email || undefined,
              customerType: data.customerType as CustomerType,
              items: Array.isArray(data.items) ? data.items : [],
              subtotal: Number(data.subtotal || 0),
              discount: Number(data.discount || 0),
              total: Number(data.total || 0),
              orderType: data.orderType,
              tableNumber: data.tableNumber || undefined,
              paymentMethod: data.paymentMethod,
              paymentStatus: data.paymentStatus as PaymentStatus,
              orderStatus: data.orderStatus as OrderStatus,
              specialInstructions: data.specialInstructions || undefined,
              estimatedPrepTimeMinutes: Number(data.estimatedPrepTimeMinutes || 12),
              createdAt: timestampToIso(data.createdAt),
              updatedAt: timestampToIso(data.updatedAt),
              hasFeedbackSubmitted: Boolean(data.hasFeedbackSubmitted),
            };
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onData(list);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch (wrapped) {
          if (onError && wrapped instanceof Error) {
            onError(wrapped);
          }
        }
      }
    );
  },

  async createOrder(uid: string, order: Order): Promise<void> {
    const path = `orders/${order.id}`;
    const payload: Record<string, unknown> = {
      id: order.id,
      customerId: uid,
      customerName: truncateString(order.customerName, BLUEPRINT_LIMITS.DISPLAY_NAME_MAX),
      phone: sanitizePhoneRequired(order.phone),
      customerType: order.customerType,
      items: order.items.slice(0, BLUEPRINT_LIMITS.MAX_ORDER_ITEMS),
      subtotal: Math.max(0, Math.min(100000, Number(order.subtotal))),
      discount: Math.max(0, Math.min(50000, Number(order.discount))),
      total: Math.max(0, Math.min(100000, Number(order.total))),
      orderType: order.orderType,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: 'PLACED',
      estimatedPrepTimeMinutes: Math.max(1, Math.min(180, Number(order.estimatedPrepTimeMinutes))),
      hasFeedbackSubmitted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (order.email) {
      payload.email = truncateString(order.email, BLUEPRINT_LIMITS.EMAIL_MAX);
    }
    if (order.tableNumber) {
      payload.tableNumber = truncateString(order.tableNumber, BLUEPRINT_LIMITS.TABLE_NUMBER_MAX);
    }
    if (order.specialInstructions) {
      payload.specialInstructions = truncateString(
        order.specialInstructions,
        BLUEPRINT_LIMITS.INSTRUCTIONS_MAX
      );
    }

    try {
      await setDoc(doc(db, 'orders', order.id), payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateOrderStatus(
    orderId: string,
    orderStatus: OrderStatus,
    paymentStatus: PaymentStatus
  ): Promise<void> {
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        orderStatus,
        paymentStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async submitFeedbackAtomic(
    uid: string,
    feedback: Omit<CustomerFeedback, 'createdAt' | 'customerPhone'>
  ): Promise<void> {
    const path = `feedback/${feedback.id}`;
    try {
      const batch = writeBatch(db);
      const fbRef = doc(db, 'feedback', feedback.id);
      const orderRef = doc(db, 'orders', feedback.orderId);

      batch.set(fbRef, {
        id: feedback.id,
        orderId: feedback.orderId,
        customerId: uid,
        customerName: truncateString(feedback.customerName, BLUEPRINT_LIMITS.DISPLAY_NAME_MAX),
        overallRating: Math.max(1, Math.min(5, Number(feedback.overallRating))),
        tasteRating: Math.max(1, Math.min(5, Number(feedback.tasteRating))),
        hygieneRating: Math.max(1, Math.min(5, Number(feedback.hygieneRating))),
        serviceRating: Math.max(1, Math.min(5, Number(feedback.serviceRating))),
        valueRating: Math.max(1, Math.min(5, Number(feedback.valueRating))),
        comment: truncateString(feedback.comment || '', BLUEPRINT_LIMITS.FEEDBACK_COMMENT_MAX),
        wouldRecommend: feedback.wouldRecommend,
        createdAt: serverTimestamp(),
      });

      batch.update(orderRef, {
        hasFeedbackSubmitted: true,
        updatedAt: serverTimestamp(),
      });

      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  subscribeToFeedback(
    uid: string,
    isBootstrapAdmin: boolean,
    onData: (items: CustomerFeedback[]) => void,
    onError?: (err: Error) => void
  ): Unsubscribe {
    const path = 'feedback';
    const ref = collection(db, path);
    const q = isBootstrapAdmin ? query(ref) : query(ref, where('customerId', '==', uid));

    return onSnapshot(
      q,
      (snapshot) => {
        const list: CustomerFeedback[] = snapshot.docs
          .map((d) => {
            const data = d.data();
            return {
              id: data.id || d.id,
              orderId: data.orderId,
              customerName: data.customerName,
              overallRating: Number(data.overallRating || 5),
              tasteRating: Number(data.tasteRating || 5),
              hygieneRating: Number(data.hygieneRating || 5),
              serviceRating: Number(data.serviceRating || 5),
              valueRating: Number(data.valueRating || 5),
              comment: data.comment || '',
              wouldRecommend: data.wouldRecommend || 'Yes',
              createdAt: timestampToIso(data.createdAt),
            };
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onData(list);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, path);
        } catch (wrapped) {
          if (onError && wrapped instanceof Error) {
            onError(wrapped);
          }
        }
      }
    );
  },
};
