import {
  MenuItem,
  Order,
  CustomerFeedback,
  Offer,
  Campaign,
  BusinessSettings,
  FinancialAssumptions,
  ValidationMetricTarget,
  OrderStatus,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_FEEDBACK,
  INITIAL_OFFERS,
  INITIAL_CAMPAIGNS,
  INITIAL_SETTINGS,
  INITIAL_FINANCIAL_ASSUMPTIONS,
  INITIAL_VALIDATION_METRICS,
} from '../data/mockData';

const STORAGE_KEYS = {
  MENU: 'rih_menu_items_v2',
  ORDERS: 'rih_orders_v2',
  FEEDBACK: 'rih_feedback_v1',
  OFFERS: 'rih_offers_v2',
  CAMPAIGNS: 'rih_campaigns_v1',
  SETTINGS: 'rih_settings_v1',
  FINANCIAL: 'rih_financial_v1',
  VALIDATION: 'rih_validation_v1',
  CUSTOMER_PROFILE: 'rih_customer_profile_v1',
};

// Safe JSON parser with fallback
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed reading storage key "${key}", using fallback.`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger custom event so other tabs/components stay reactive
    window.dispatchEvent(new Event('rih-storage-update'));
  } catch (err) {
    console.error(`Failed writing storage key "${key}".`, err);
  }
}

export const StorageService = {
  // Menu
  getMenuItems(): MenuItem[] {
    const raw = loadFromStorage<MenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU_ITEMS);
    return raw.map((item) => {
      const initial = INITIAL_MENU_ITEMS.find((m) => m.id === item.id);
      return {
        ...item,
        fullPrice: item.fullPrice ?? initial?.fullPrice,
        portionLabels: item.portionLabels ?? initial?.portionLabels,
        calories: item.calories ?? initial?.calories,
        nutritionalTags: item.nutritionalTags?.length ? item.nutritionalTags : initial?.nutritionalTags || [],
      };
    });
  },
  saveMenuItems(items: MenuItem[]): void {
    saveToStorage(STORAGE_KEYS.MENU, items);
  },
  addMenuItem(item: MenuItem): MenuItem[] {
    const current = this.getMenuItems();
    const updated = [item, ...current];
    this.saveMenuItems(updated);
    return updated;
  },
  updateMenuItem(updatedItem: MenuItem): MenuItem[] {
    const current = this.getMenuItems();
    const updated = current.map((it) => (it.id === updatedItem.id ? updatedItem : it));
    this.saveMenuItems(updated);
    return updated;
  },
  deleteMenuItem(itemId: string): MenuItem[] {
    const current = this.getMenuItems();
    const updated = current.filter((it) => it.id !== itemId);
    this.saveMenuItems(updated);
    return updated;
  },

  // Orders
  getOrders(): Order[] {
    return loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  },
  createOrder(order: Order): Order[] {
    const current = this.getOrders();
    const updated = [order, ...current];
    this.saveOrders(updated);
    return updated;
  },
  updateOrderStatus(orderId: string, status: OrderStatus): Order[] {
    const current = this.getOrders();
    const updated = current.map((o) =>
      o.id === orderId
        ? {
            ...o,
            orderStatus: status,
            paymentStatus: status === 'COMPLETED' ? 'Paid' : o.paymentStatus,
            updatedAt: new Date().toISOString(),
          }
        : o
    );
    this.saveOrders(updated);
    return updated;
  },
  getOrderById(orderId: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === orderId);
  },

  // Feedback
  getFeedback(): CustomerFeedback[] {
    return loadFromStorage<CustomerFeedback[]>(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK);
  },
  saveFeedback(feedbacks: CustomerFeedback[]): void {
    saveToStorage(STORAGE_KEYS.FEEDBACK, feedbacks);
  },
  addFeedback(feedback: CustomerFeedback): CustomerFeedback[] {
    const current = this.getFeedback();
    const updated = [feedback, ...current];
    this.saveFeedback(updated);

    // Also mark order as hasFeedbackSubmitted
    const orders = this.getOrders();
    const updatedOrders = orders.map((o) =>
      o.id === feedback.orderId ? { ...o, hasFeedbackSubmitted: true } : o
    );
    this.saveOrders(updatedOrders);

    return updated;
  },

  // Offers
  getOffers(): Offer[] {
    return loadFromStorage<Offer[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  },
  saveOffers(offers: Offer[]): void {
    saveToStorage(STORAGE_KEYS.OFFERS, offers);
  },
  toggleOffer(offerId: string): Offer[] {
    const current = this.getOffers();
    const updated = current.map((o) => (o.id === offerId ? { ...o, isActive: !o.isActive } : o));
    this.saveOffers(updated);
    return updated;
  },

  // Campaigns
  getCampaigns(): Campaign[] {
    return loadFromStorage<Campaign[]>(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  },
  saveCampaigns(campaigns: Campaign[]): void {
    saveToStorage(STORAGE_KEYS.CAMPAIGNS, campaigns);
  },

  // Settings
  getSettings(): BusinessSettings {
    return loadFromStorage<BusinessSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  saveSettings(settings: BusinessSettings): void {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  },

  // Financial Assumptions
  getFinancialAssumptions(): FinancialAssumptions {
    return loadFromStorage<FinancialAssumptions>(
      STORAGE_KEYS.FINANCIAL,
      INITIAL_FINANCIAL_ASSUMPTIONS
    );
  },
  saveFinancialAssumptions(assumptions: FinancialAssumptions): void {
    saveToStorage(STORAGE_KEYS.FINANCIAL, assumptions);
  },

  // Validation Metrics
  getValidationMetrics(): ValidationMetricTarget[] {
    return loadFromStorage<ValidationMetricTarget[]>(
      STORAGE_KEYS.VALIDATION,
      INITIAL_VALIDATION_METRICS
    );
  },
  saveValidationMetrics(metrics: ValidationMetricTarget[]): void {
    saveToStorage(STORAGE_KEYS.VALIDATION, metrics);
  },

  // Customer Profile (saved locally for seamless checkout)
  getCustomerProfile(): { name: string; phone: string; customerType: string } | null {
    return loadFromStorage(STORAGE_KEYS.CUSTOMER_PROFILE, null);
  },
  saveCustomerProfile(profile: { name: string; phone: string; customerType: string }): void {
    saveToStorage(STORAGE_KEYS.CUSTOMER_PROFILE, profile);
  },

  // Reset to default sample data
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    localStorage.removeItem(STORAGE_KEYS.OFFERS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.FINANCIAL);
    localStorage.removeItem(STORAGE_KEYS.VALIDATION);
    window.dispatchEvent(new Event('rih-storage-update'));
  },
};
