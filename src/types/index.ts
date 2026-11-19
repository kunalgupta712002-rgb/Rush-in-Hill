export type CustomerType = 'DGU Student' | 'Day Scholar' | 'Industrial Employee' | 'Other';

export type OrderType = 'Takeaway / Pickup' | 'Dine-in';

export type PaymentMethod = 'Pay at Counter' | 'UPI / Online Payment (Demo)';

export type PaymentStatus = 'Pending' | 'Paid';

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface UserAccountProfile {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  customerType: CustomerType;
  photoURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const MENU_CATEGORIES = [
  'Subha Ka Nasta',
  'Made in China',
  'Soups',
  "Chef's Special Rice",
  'Hills Tadka',
  'Salad & Raita',
  'Koyle ki Khan se',
  'Bread Basket',
  'Hills Appetizer',
  'Pasta, Sandwiches & Burgers',
  'Rolls & Kathi Rolls',
  'Pizza Menu',
  'Combos',
  'Beverages',
  'Shakes Plaza',
] as const;

export type MenuCategoryName = (typeof MENU_CATEGORIES)[number];

export type MenuCategory = 'All' | MenuCategoryName;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryName;
  price: number;
  fullPrice?: number;
  portionLabels?: [string, string];
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  preparationTimeMinutes: number;
  calories?: number;
  nutritionalTags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export interface Order {
  id: string; // e.g. "RIH-8421"
  customerId: string;
  customerName: string;
  phone: string;
  email?: string;
  customerType: CustomerType;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderType: OrderType;
  tableNumber?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  specialInstructions?: string;
  estimatedPrepTimeMinutes: number;
  createdAt: string; // ISO string
  updatedAt: string;
  hasFeedbackSubmitted?: boolean;
}

export interface CustomerFeedback {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone?: string;
  overallRating: number; // 1-5
  tasteRating: number; // 1-5
  hygieneRating: number; // 1-5
  serviceRating: number; // 1-5
  valueRating: number; // 1-5
  comment: string;
  wouldRecommend: 'Yes' | 'Maybe' | 'No';
  createdAt: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercentage?: number;
  flatDiscount?: number;
  minOrderValue?: number;
  validUntil: string;
  badgeText: string;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  channel: 'Instagram' | 'WhatsApp' | 'Campus Activation' | 'Posters' | 'Referrals';
  startDate: string;
  endDate: string;
  budget: number;
  leads: number;
  customers: number;
  status: 'Active' | 'Completed' | 'Draft';
  offerCode?: string;
}

export interface BusinessSettings {
  storeName: string;
  tagline: string;
  location: string;
  landmark: string;
  city: string;
  phone: string;
  email: string;
  openingHours: string;
  isStoreOpen: boolean;
  minPrepTimeMinutes: number;
  noticeBanner?: string;
}

export interface FinancialAssumptions {
  sellingPrice: number; // default 100
  variableCost: number; // default 55
  monthlyFixedCosts: number; // default 30000
  monthlyCustomers: number; // default 150
  purchasesPerCustomer: number; // default 3
  avgVisitAssumptionNote: string; // ₹1,200 note
}

export interface ValidationMetricTarget {
  id: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  status: 'In Progress' | 'Achieved' | 'Needs Attention';
  notes: string;
}

export interface ValidationWeekPlan {
  week: number;
  title: string;
  theme: string;
  actions: string[];
  target: string;
  learningQuestion: string;
  completed: boolean;
}
