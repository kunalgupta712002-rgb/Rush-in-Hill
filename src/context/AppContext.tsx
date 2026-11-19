import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider, BOOTSTRAP_ADMIN_EMAIL } from '../firebase';
import { FirebaseService } from '../services/firebaseService';
import {
  MenuItem,
  CartItem,
  Order,
  CustomerFeedback,
  Offer,
  Campaign,
  BusinessSettings,
  FinancialAssumptions,
  ValidationMetricTarget,
  OrderStatus,
  CustomerType,
  OrderType,
  PaymentMethod,
  UserAccountProfile,
} from '../types';
import { StorageService } from '../services/storage';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Auth & User Profile
  authUser: User | null;
  authReady: boolean;
  userProfile: UserAccountProfile | null;
  isAdminUser: boolean;
  isAuthBusy: boolean;
  signInWithGoogle: (signupMeta?: {
    displayName?: string;
    phone?: string;
    customerType?: CustomerType;
  }) => Promise<{ isNewUser: boolean; profile: UserAccountProfile | null; isAdmin: boolean }>;
  logoutUser: () => Promise<void>;
  updateUserProfile: (updates: {
    displayName: string;
    phone: string;
    customerType: CustomerType;
  }) => Promise<void>;

  // Data
  menuItems: MenuItem[];
  orders: Order[];
  cart: CartItem[];
  feedback: CustomerFeedback[];
  offers: Offer[];
  campaigns: Campaign[];
  settings: BusinessSettings;
  financialAssumptions: FinancialAssumptions;
  validationMetrics: ValidationMetricTarget[];
  appliedOffer: Offer | null;
  customerProfile: { name: string; phone: string; customerType: string; email?: string } | null;

  // Navigation & UI States
  activeTab: string;
  adminSubTab: string;
  isAdminLoggedIn: boolean;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isFeedbackModalOpen: boolean;
  feedbackTargetOrderId: string | null;
  activeTrackingOrderId: string | null;
  selectedCategory: string;
  toasts: ToastInfo[];

  // Cart Calculations
  cartTotalQuantity: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartGrandTotal: number;
  cartEstimatedPrepTime: number;

  // Actions
  setActiveTab: (tab: string) => void;
  setAdminSubTab: (subTab: string) => void;
  setSelectedCategory: (category: string) => void;
  setIsAdminLoggedIn: (status: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setActiveTrackingOrderId: (orderId: string | null) => void;

  // Cart Operations
  addToCart: (item: MenuItem, qty?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyOffer: (offer: Offer | null) => void;

  // Orders
  placeOrder: (details: {
    customerName: string;
    phone: string;
    email?: string;
    customerType: CustomerType;
    orderType: OrderType;
    tableNumber?: string;
    paymentMethod: PaymentMethod;
    specialInstructions?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  trackOrder: (orderId: string) => void;

  // Feedback
  openFeedbackModal: (orderId: string) => void;
  closeFeedbackModal: () => void;
  submitFeedback: (feedbackData: {
    orderId: string;
    customerName: string;
    overallRating: number;
    tasteRating: number;
    hygieneRating: number;
    serviceRating: number;
    valueRating: number;
    comment: string;
    wouldRecommend: 'Yes' | 'Maybe' | 'No';
  }) => void;

  // Admin Mutations
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  toggleOfferActive: (offerId: string) => void;
  addOffer: (offer: Offer) => void;
  updateSettings: (settings: BusinessSettings) => void;
  updateFinancialAssumptions: (assumptions: FinancialAssumptions) => void;
  updateValidationMetrics: (metrics: ValidationMetricTarget[]) => void;
  updateCampaigns: (campaigns: Campaign[]) => void;
  resetAllData: () => void;

  // Toast
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Firebase Auth state
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserAccountProfile | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [isAuthBusy, setIsAuthBusy] = useState<boolean>(false);

  // Primary collections
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => StorageService.getMenuItems());
  const [localOrders, setLocalOrders] = useState<Order[]>(() => StorageService.getOrders());
  const [cloudOrders, setCloudOrders] = useState<Order[]>([]);
  const [localFeedback, setLocalFeedback] = useState<CustomerFeedback[]>(() =>
    StorageService.getFeedback()
  );
  const [cloudFeedback, setCloudFeedback] = useState<CustomerFeedback[]>([]);
  const [offers, setOffers] = useState<Offer[]>(() => StorageService.getOffers());
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => StorageService.getCampaigns());
  const [settings, setSettings] = useState<BusinessSettings>(() => StorageService.getSettings());
  const [financialAssumptions, setFinancialAssumptions] = useState<FinancialAssumptions>(() =>
    StorageService.getFinancialAssumptions()
  );
  const [validationMetrics, setValidationMetrics] = useState<ValidationMetricTarget[]>(() =>
    StorageService.getValidationMetrics()
  );

  // Cart & checkout
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rih_active_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);

  // UI States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [adminSubTab, setAdminSubTab] = useState<string>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [feedbackTargetOrderId, setFeedbackTargetOrderId] = useState<string | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Local fallback customer profile (for guest browsing)
  const [localCustomerProfile, setLocalCustomerProfile] = useState<{
    name: string;
    phone: string;
    customerType: string;
  } | null>(() => StorageService.getCustomerProfile());

  // Derived active customer profile (prefers authenticated Firestore profile)
  const customerProfile = userProfile
    ? {
        name: userProfile.displayName,
        phone: userProfile.phone,
        customerType: userProfile.customerType,
        email: userProfile.email,
      }
    : authUser
    ? {
        name: authUser.displayName || authUser.email?.split('@')[0] || 'Student',
        phone: localCustomerProfile?.phone || '',
        customerType: localCustomerProfile?.customerType || 'DGU Student',
        email: authUser.email || undefined,
      }
    : localCustomerProfile;

  // Merge cloud orders (for signed-in user) with local orders without duplicates
  const orders: Order[] = React.useMemo(() => {
    if (!authUser) return localOrders;
    const cloudIds = new Set(cloudOrders.map((o) => o.id));
    const merged = [...cloudOrders, ...localOrders.filter((o) => !cloudIds.has(o.id))];
    return merged.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [authUser, cloudOrders, localOrders]);

  const feedback: CustomerFeedback[] = React.useMemo(() => {
    if (!authUser) return localFeedback;
    const cloudIds = new Set(cloudFeedback.map((f) => f.id));
    return [...cloudFeedback, ...localFeedback.filter((f) => !cloudIds.has(f.id))];
  }, [authUser, cloudFeedback, localFeedback]);

  // Toast dispatch
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        try {
          const [profile, adminStatus] = await Promise.all([
            FirebaseService.getUserProfile(user.uid),
            FirebaseService.checkIsAdmin(user),
          ]);
          setIsAdminUser(adminStatus);
          if (adminStatus) {
            setIsAdminLoggedIn(true);
          }
          if (profile) {
            setUserProfile(profile);
          } else if (user.emailVerified) {
            // Auto-bootstrap profile if authenticated user has no Firestore profile yet
            const created = await FirebaseService.createUserProfile(user, {
              displayName: user.displayName || undefined,
              customerType: 'DGU Student',
            });
            setUserProfile(created);
          }
        } catch (err) {
          console.error('Error hydrating authenticated profile:', err);
        }
      } else {
        setUserProfile(null);
        setIsAdminUser(false);
        setCloudOrders([]);
        setCloudFeedback([]);
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Live Firestore subscriptions ONLY when authReady && authUser is signed in
  useEffect(() => {
    if (!authReady || !authUser) {
      setCloudOrders([]);
      setCloudFeedback([]);
      return;
    }

    const isBootstrapAdmin =
      Boolean(authUser.emailVerified) && authUser.email === BOOTSTRAP_ADMIN_EMAIL;

    const unsubOrders = FirebaseService.subscribeToOrders(
      authUser.uid,
      isBootstrapAdmin,
      (syncedOrders) => setCloudOrders(syncedOrders),
      (err) => console.error('Order sync error:', err.message)
    );

    const unsubFeedback = FirebaseService.subscribeToFeedback(
      authUser.uid,
      isBootstrapAdmin,
      (syncedFeedback) => setCloudFeedback(syncedFeedback),
      (err) => console.error('Feedback sync error:', err.message)
    );

    return () => {
      unsubOrders();
      unsubFeedback();
    };
  }, [authReady, authUser]);

  // Sign in / Sign up with Google Popup
  const signInWithGoogle = async (signupMeta?: {
    displayName?: string;
    phone?: string;
    customerType?: CustomerType;
  }): Promise<{ isNewUser: boolean; profile: UserAccountProfile | null; isAdmin: boolean }> => {
    setIsAuthBusy(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      let existingProfile = await FirebaseService.getUserProfile(user.uid);
      let isNewUser = false;

      if (!existingProfile) {
        isNewUser = true;
        existingProfile = await FirebaseService.createUserProfile(user, {
          displayName: signupMeta?.displayName || user.displayName || undefined,
          phone: signupMeta?.phone || '',
          customerType: signupMeta?.customerType || 'DGU Student',
        });
      } else if (signupMeta && (signupMeta.phone || signupMeta.customerType || signupMeta.displayName)) {
        const nextDisplay = signupMeta.displayName?.trim() || existingProfile.displayName;
        const nextPhone = signupMeta.phone?.trim() || existingProfile.phone;
        const nextType = signupMeta.customerType || existingProfile.customerType;
        await FirebaseService.updateUserProfile(user.uid, {
          displayName: nextDisplay,
          phone: nextPhone,
          customerType: nextType,
          photoURL: user.photoURL || existingProfile.photoURL,
        });
        existingProfile = {
          ...existingProfile,
          displayName: nextDisplay,
          phone: nextPhone,
          customerType: nextType,
        };
      }

      setUserProfile(existingProfile);
      const adminStatus = await FirebaseService.checkIsAdmin(user);
      setIsAdminUser(adminStatus);
      if (adminStatus) {
        setIsAdminLoggedIn(true);
      }

      showToast(
        isNewUser
          ? `Welcome to Rush in Hill, ${existingProfile.displayName}! Account created.`
          : `Welcome back, ${existingProfile.displayName}!`,
        'success'
      );

      return { isNewUser, profile: existingProfile, isAdmin: adminStatus };
    } catch (error: unknown) {
      const errCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code?: string }).code)
          : '';
      if (errCode === 'auth/popup-closed-by-user' || errCode === 'auth/cancelled-popup-request') {
        showToast('Sign-in popup was closed before completing.', 'info');
      } else if (errCode === 'auth/popup-blocked') {
        showToast('Please allow popups in your browser to sign in with Google.', 'warning');
      } else {
        showToast('Unable to sign in right now. Please try again.', 'error');
      }
      throw error;
    } finally {
      setIsAuthBusy(false);
    }
  };

  const logoutUser = async () => {
    setIsAuthBusy(true);
    try {
      await signOut(auth);
      setUserProfile(null);
      setIsAdminUser(false);
      setIsAdminLoggedIn(false);
      if (activeTab === 'admin') {
        setActiveTab('home');
      }
      showToast('Signed out of your account.', 'info');
    } catch (error) {
      console.error('Sign out error:', error);
      showToast('Failed to sign out. Please try again.', 'error');
    } finally {
      setIsAuthBusy(false);
    }
  };

  const updateUserProfile = async (updates: {
    displayName: string;
    phone: string;
    customerType: CustomerType;
  }) => {
    if (!authUser) return;
    setIsAuthBusy(true);
    try {
      await FirebaseService.updateUserProfile(authUser.uid, {
        ...updates,
        photoURL: authUser.photoURL || userProfile?.photoURL,
      });
      setUserProfile((prev) =>
        prev
          ? {
              ...prev,
              displayName: updates.displayName.trim(),
              phone: updates.phone.replace(/\D/g, '').slice(0, 10),
              customerType: updates.customerType,
              updatedAt: new Date().toISOString(),
            }
          : null
      );
      showToast('Profile updated and saved to your account.', 'success');
    } catch (error) {
      console.error('Profile update failed:', error);
      showToast('Could not update profile. Please check your details.', 'error');
      throw error;
    } finally {
      setIsAuthBusy(false);
    }
  };

  // Keep cart in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rih_active_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync local storage across tabs/updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setMenuItems(StorageService.getMenuItems());
      setLocalOrders(StorageService.getOrders());
      setLocalFeedback(StorageService.getFeedback());
      setOffers(StorageService.getOffers());
      setCampaigns(StorageService.getCampaigns());
      setSettings(StorageService.getSettings());
      setFinancialAssumptions(StorageService.getFinancialAssumptions());
      setValidationMetrics(StorageService.getValidationMetrics());
    };
    window.addEventListener('rih-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('rih-storage-update', handleStorageUpdate);
  }, []);

  // Cart calculations
  const cartTotalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Discount calculation
  let cartDiscount = 0;
  if (appliedOffer && cartSubtotal >= (appliedOffer.minOrderValue || 0)) {
    if (appliedOffer.flatDiscount) {
      cartDiscount = Math.min(appliedOffer.flatDiscount, cartSubtotal);
    } else if (appliedOffer.discountPercentage) {
      cartDiscount = Math.round((cartSubtotal * appliedOffer.discountPercentage) / 100);
    }
  }

  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount);

  const cartEstimatedPrepTime =
    cart.length === 0
      ? 0
      : Math.max(
          settings.minPrepTimeMinutes,
          ...cart.map((c) => c.item.preparationTimeMinutes)
        );

  // Cart actions
  const addToCart = (item: MenuItem, qty = 1) => {
    if (!item.isAvailable) {
      showToast(`${item.name} is currently sold out!`, 'warning');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { item, quantity: qty }];
    });
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffer(null);
  };

  const applyOffer = (offer: Offer | null) => {
    if (!offer) {
      setAppliedOffer(null);
      showToast('Offer removed', 'info');
      return;
    }
    if (cartSubtotal < (offer.minOrderValue || 0)) {
      showToast(
        `Add items worth ₹${(offer.minOrderValue || 0) - cartSubtotal} more to use ${offer.code}`,
        'warning'
      );
      return;
    }
    setAppliedOffer(offer);
    showToast(`Coupon ${offer.code} applied successfully!`, 'success');
  };

  // Place order (writes to Firestore if signed in + local cache)
  const placeOrder = (details: {
    customerName: string;
    phone: string;
    email?: string;
    customerType: CustomerType;
    orderType: OrderType;
    tableNumber?: string;
    paymentMethod: PaymentMethod;
    specialInstructions?: string;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `RIH-${randomSuffix}`;

    const orderItems = cart.map((c) => ({
      menuItemId: c.item.id,
      name: c.item.name,
      price: c.item.price,
      quantity: c.quantity,
      isVeg: c.item.isVeg,
    }));

    const newOrder: Order = {
      id: orderId,
      customerId: authUser ? authUser.uid : `cust-${Date.now().toString().slice(-4)}`,
      customerName: details.customerName,
      phone: details.phone,
      email: details.email || authUser?.email || undefined,
      customerType: details.customerType,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartGrandTotal,
      orderType: details.orderType,
      tableNumber:
        details.orderType === 'Dine-in' ? details.tableNumber || 'Counter Table' : undefined,
      paymentMethod: details.paymentMethod,
      paymentStatus: details.paymentMethod.includes('UPI') ? 'Paid' : 'Pending',
      orderStatus: 'PLACED',
      specialInstructions: details.specialInstructions,
      estimatedPrepTimeMinutes: cartEstimatedPrepTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hasFeedbackSubmitted: false,
    };

    const updatedOrders = StorageService.createOrder(newOrder);
    setLocalOrders(updatedOrders);

    // Sync to Firestore when authenticated with a verified email
    if (authUser && authUser.emailVerified) {
      FirebaseService.createOrder(authUser.uid, newOrder).catch((err) => {
        console.error('Failed persisting order to Firestore:', err);
      });
      // Also keep user's saved phone/segment up to date if empty
      if (userProfile && !userProfile.phone && details.phone) {
        updateUserProfile({
          displayName: details.customerName,
          phone: details.phone,
          customerType: details.customerType,
        }).catch(() => {});
      }
    }

    // Save local profile for fast future ordering
    StorageService.saveCustomerProfile({
      name: details.customerName,
      phone: details.phone,
      customerType: details.customerType,
    });
    setLocalCustomerProfile({
      name: details.customerName,
      phone: details.phone,
      customerType: details.customerType,
    });

    // Clear cart
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTrackingOrderId(orderId);
    setActiveTab('orders');

    showToast(`Order placed successfully! Order ID: ${orderId}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = StorageService.updateOrderStatus(orderId, status);
    setLocalOrders(updated);

    // If admin and order exists in cloudOrders, sync to Firestore
    const cloudMatch = cloudOrders.find((o) => o.id === orderId);
    if (cloudMatch && isAdminUser) {
      const nextPaymentStatus = status === 'COMPLETED' ? 'Paid' : cloudMatch.paymentStatus;
      FirebaseService.updateOrderStatus(orderId, status, nextPaymentStatus).catch((err) => {
        console.error('Failed updating Firestore order status:', err);
      });
    }

    showToast(`Order ${orderId} updated to ${status}`, 'info');
  };

  const trackOrder = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setActiveTab('orders');
  };

  // Feedback
  const openFeedbackModal = (orderId: string) => {
    setFeedbackTargetOrderId(orderId);
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setFeedbackTargetOrderId(null);
  };

  const submitFeedback = (data: {
    orderId: string;
    customerName: string;
    overallRating: number;
    tasteRating: number;
    hygieneRating: number;
    serviceRating: number;
    valueRating: number;
    comment: string;
    wouldRecommend: 'Yes' | 'Maybe' | 'No';
  }) => {
    const feedbackId = `fb-${Date.now()}`;
    const newFeedback: CustomerFeedback = {
      id: feedbackId,
      createdAt: new Date().toISOString(),
      ...data,
    };
    const updated = StorageService.addFeedback(newFeedback);
    setLocalFeedback(updated);
    setLocalOrders(StorageService.getOrders());

    // Atomic Firestore feedback write if order exists in Firestore for this user
    const cloudOrder = cloudOrders.find((o) => o.id === data.orderId);
    if (
      authUser &&
      authUser.emailVerified &&
      cloudOrder &&
      cloudOrder.customerId === authUser.uid &&
      !cloudOrder.hasFeedbackSubmitted &&
      (cloudOrder.orderStatus === 'READY' || cloudOrder.orderStatus === 'COMPLETED')
    ) {
      FirebaseService.submitFeedbackAtomic(authUser.uid, {
        id: feedbackId,
        ...data,
      }).catch((err) => {
        console.error('Failed persisting atomic feedback to Firestore:', err);
      });
    }

    closeFeedbackModal();
    showToast('Thank you! Your feedback helps us improve meals for DGU.', 'success');
  };

  // Admin Mutations
  const addMenuItem = (item: MenuItem) => {
    const updated = StorageService.addMenuItem(item);
    setMenuItems(updated);
    showToast(`Added ${item.name} to menu`, 'success');
  };

  const updateMenuItem = (item: MenuItem) => {
    const updated = StorageService.updateMenuItem(item);
    setMenuItems(updated);
    showToast(`Updated ${item.name}`, 'success');
  };

  const deleteMenuItem = (itemId: string) => {
    const updated = StorageService.deleteMenuItem(itemId);
    setMenuItems(updated);
    showToast('Menu item removed', 'info');
  };

  const toggleOfferActive = (offerId: string) => {
    const updated = StorageService.toggleOffer(offerId);
    setOffers(updated);
    showToast('Offer status updated', 'info');
  };

  const addOffer = (offer: Offer) => {
    const current = StorageService.getOffers();
    const updated = [offer, ...current];
    StorageService.saveOffers(updated);
    setOffers(updated);
    showToast(`Created offer ${offer.code}`, 'success');
  };

  const updateSettings = (newSettings: BusinessSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
    showToast('Cafe settings updated', 'success');
  };

  const updateFinancialAssumptions = (assumptions: FinancialAssumptions) => {
    StorageService.saveFinancialAssumptions(assumptions);
    setFinancialAssumptions(assumptions);
    showToast('Financial model recalculations updated', 'success');
  };

  const updateValidationMetrics = (metrics: ValidationMetricTarget[]) => {
    StorageService.saveValidationMetrics(metrics);
    setValidationMetrics(metrics);
    showToast('Validation metrics updated', 'success');
  };

  const updateCampaigns = (newCampaigns: Campaign[]) => {
    StorageService.saveCampaigns(newCampaigns);
    setCampaigns(newCampaigns);
    showToast('Marketing campaigns updated', 'success');
  };

  const resetAllData = () => {
    StorageService.resetAll();
    setMenuItems(StorageService.getMenuItems());
    setLocalOrders(StorageService.getOrders());
    setLocalFeedback(StorageService.getFeedback());
    setOffers(StorageService.getOffers());
    setCampaigns(StorageService.getCampaigns());
    setSettings(StorageService.getSettings());
    setFinancialAssumptions(StorageService.getFinancialAssumptions());
    setValidationMetrics(StorageService.getValidationMetrics());
    clearCart();
    showToast('All demo data restored to initial seed defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        authUser,
        authReady,
        userProfile,
        isAdminUser,
        isAuthBusy,
        signInWithGoogle,
        logoutUser,
        updateUserProfile,
        menuItems,
        orders,
        cart,
        feedback,
        offers,
        campaigns,
        settings,
        financialAssumptions,
        validationMetrics,
        appliedOffer,
        customerProfile,
        activeTab,
        adminSubTab,
        isAdminLoggedIn,
        isCartOpen,
        isCheckoutOpen,
        isFeedbackModalOpen,
        feedbackTargetOrderId,
        activeTrackingOrderId,
        selectedCategory,
        toasts,
        cartTotalQuantity,
        cartSubtotal,
        cartDiscount,
        cartGrandTotal,
        cartEstimatedPrepTime,
        setActiveTab,
        setAdminSubTab,
        setSelectedCategory,
        setIsAdminLoggedIn,
        setIsCartOpen,
        setIsCheckoutOpen,
        setActiveTrackingOrderId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyOffer,
        placeOrder,
        updateOrderStatus,
        trackOrder,
        openFeedbackModal,
        closeFeedbackModal,
        submitFeedback,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleOfferActive,
        addOffer,
        updateSettings,
        updateFinancialAssumptions,
        updateValidationMetrics,
        updateCampaigns,
        resetAllData,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
