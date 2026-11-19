import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerType, OrderType, PaymentMethod } from '../../types';
import {
  X,
  User,
  Phone,
  Mail,
  GraduationCap,
  Clock,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartGrandTotal,
    cartEstimatedPrepTime,
    customerProfile,
    authUser,
    signInWithGoogle,
    isAuthBusy,
    placeOrder,
  } = useApp();

  // Form states initialized with customer profile if present
  const [name, setName] = useState(customerProfile?.name || '');
  const [phone, setPhone] = useState(customerProfile?.phone || '');
  const [email, setEmail] = useState(customerProfile?.email || authUser?.email || '');
  const [customerType, setCustomerType] = useState<CustomerType>(
    (customerProfile?.customerType as CustomerType) || 'DGU Student'
  );
  const [orderType, setOrderType] = useState<OrderType>('Takeaway / Pickup');
  const [tableNumber, setTableNumber] = useState('Table 3');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI / Online Payment (Demo)');

  // Form validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep checkout inputs synced with signed-in account profile
  useEffect(() => {
    if (isCheckoutOpen) {
      if (customerProfile?.name) setName(customerProfile.name);
      if (customerProfile?.phone) setPhone(customerProfile.phone);
      if (customerProfile?.email || authUser?.email) {
        setEmail(customerProfile?.email || authUser?.email || '');
      }
      if (customerProfile?.customerType) {
        setCustomerType(customerProfile.customerType as CustomerType);
      }
    }
  }, [isCheckoutOpen, customerProfile, authUser]);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (orderType === 'Dine-in' && !tableNumber.trim()) {
      errs.tableNumber = 'Please specify your table number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        customerType,
        orderType,
        tableNumber: orderType === 'Dine-in' ? tableNumber.trim() : undefined,
        paymentMethod,
        specialInstructions: specialInstructions.trim() || undefined,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-xl bg-white rounded-3xl text-left shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150 relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
                Dine-in & Pickup Checkout
              </span>
              <h3 className="text-lg font-extrabold mt-1">Complete Your Food Order</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                Estimated kitchen preparation: ~{cartEstimatedPrepTime} mins
              </p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-xl text-amber-200 hover:text-white hover:bg-amber-700/60 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Optional Sign-In Banner for Cloud Order Sync */}
            {!authUser && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div>
                  <p className="font-bold text-amber-950">Save this order to your account</p>
                  <p className="text-[11px] text-amber-800">
                    Sign in with Google to auto-fill details and sync order history across devices.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isAuthBusy}
                  onClick={() => signInWithGoogle().catch(() => {})}
                  className="px-3.5 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold text-xs shrink-0 transition disabled:opacity-60"
                >
                  {isAuthBusy ? 'Signing in...' : 'Sign In / Sign Up'}
                </button>
              </div>
            )}

            {/* Step 1: Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-700" />
                <span>1. Customer Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aman Sharma"
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[10px] text-rose-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="for order invoice"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Customer Type / Segment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Category *
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={customerType}
                      onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    >
                      <option value="DGU Student">DGU Student (Hostel/Resident)</option>
                      <option value="Day Scholar">Day Scholar (Commuting)</option>
                      <option value="Industrial Employee">Industrial Employee (Selaqui)</option>
                      <option value="Other">Other / Visitor</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Order Type */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>2. Order & Dining Type</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Takeaway / Pickup */}
                <button
                  type="button"
                  onClick={() => setOrderType('Takeaway / Pickup')}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    orderType === 'Takeaway / Pickup'
                      ? 'border-amber-700 bg-amber-50/70 text-amber-950 ring-2 ring-amber-700/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Takeaway / Pickup</span>
                    {orderType === 'Takeaway / Pickup' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Grab & go from counter when ready
                  </p>
                </button>

                {/* Dine-in */}
                <button
                  type="button"
                  onClick={() => setOrderType('Dine-in')}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                    orderType === 'Dine-in'
                      ? 'border-amber-700 bg-amber-50/70 text-amber-950 ring-2 ring-amber-700/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Dine-in</span>
                    {orderType === 'Dine-in' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Eat inside the cafe lounge
                  </p>
                </button>
              </div>

              {/* Table Number input if Dine-in */}
              {orderType === 'Dine-in' && (
                <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-amber-900 mb-1">
                    Table Number or Area *
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4, Corner Sofa, or Waiting Area"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.tableNumber && (
                    <p className="text-[10px] text-rose-600 mt-1">{errors.tableNumber}</p>
                  )}
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kitchen Notes / Special Requests
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Less spicy, pack Roti in foil, extra tissue paper, no onion..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                <span>3. Payment Selection</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* UPI Demo Payment */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI / Online Payment (Demo)')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'UPI / Online Payment (Demo)'
                      ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-700/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-slate-900">
                        UPI / QR (Demo)
                      </span>
                    </div>
                    {paymentMethod === 'UPI / Online Payment (Demo)' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    GPay, PhonePe, Paytm QR simulation
                  </p>
                </button>

                {/* Pay at Counter */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Pay at Counter')}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    paymentMethod === 'Pay at Counter'
                      ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-700/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-slate-900">Pay at Counter</span>
                    </div>
                    {paymentMethod === 'Pay at Counter' && (
                      <CheckCircle2 className="w-4 h-4 text-amber-800" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Pay cash or card when picking up
                  </p>
                </button>
              </div>

              {/* UPI Mock Preview Details */}
              {paymentMethod === 'UPI / Online Payment (Demo)' && (
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex flex-col sm:flex-row items-center gap-3 animate-in fade-in">
                  <div className="w-24 h-24 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-dashed border-slate-300 p-1">
                      <QrCode className="w-8 h-8 text-amber-900" />
                      <span className="text-[8px] font-mono text-slate-500 mt-1 font-bold">
                        RIH@upi
                      </span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Realistic Demo Payment Flow
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      Simulated UPI instant transaction
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      No real money is charged in this MVP stage. Your order will be marked as paid and sent straight to the kitchen.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Snapshot */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Items ({cart.length})</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Student Discount</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Dine-in / Pickup Packing</span>
                <span className="text-emerald-700 font-semibold">FREE (₹0)</span>
              </div>
              <div className="pt-2 border-t border-amber-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Final Payable</span>
                <span className="text-amber-900 text-base">₹{cartGrandTotal}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-amber-900/25 transition active:scale-98 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <span className="text-amber-200">•</span>
                    <span>₹{cartGrandTotal}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
