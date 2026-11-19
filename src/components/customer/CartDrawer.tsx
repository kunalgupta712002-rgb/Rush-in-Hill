import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  Tag,
  Check,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalQuantity,
    cartSubtotal,
    cartDiscount,
    cartGrandTotal,
    cartEstimatedPrepTime,
    offers,
    appliedOffer,
    applyOffer,
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const match = offers.find(
      (o) => o.code.toUpperCase() === promoInput.trim().toUpperCase() && o.isActive
    );
    if (match) {
      applyOffer(match);
      setPromoInput('');
    } else {
      applyOffer(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-800 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Your Meal Order
                </h2>
                <p className="text-[11px] text-slate-500">
                  {cartTotalQuantity} {cartTotalQuantity === 1 ? 'item' : 'items'} in order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition"
                  title="Clear all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
                  <UtensilsCrossed className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your meal tray is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Hungry? Browse our student menu and add delicious meals starting from ₹50.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-900/15 transition"
                >
                  Explore Campus Menu
                </button>
              </div>
            ) : (
              <>
                {/* Preparation Time Banner */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <div>
                      <span className="font-bold">Est. Kitchen Prep Time: </span>
                      <span>~{cartEstimatedPrepTime} mins</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-200/70 font-semibold px-2 py-0.5 rounded text-amber-950">
                    Dine-in / Pickup
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-slate-100 border-y border-slate-100">
                  {cart.map((cartItem) => {
                    const item = cartItem.item;
                    const itemSubtotal = item.price * cartItem.quantity;
                    return (
                      <div key={item.id} className="py-3 flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {item.isVeg ? (
                              <span className="w-3 h-3 border border-emerald-600 flex items-center justify-center shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              </span>
                            ) : (
                              <span className="w-3 h-3 border border-rose-600 flex items-center justify-center shrink-0">
                                <span className="w-1.5 h-1.5 bg-rose-600"></span>
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-slate-800 truncate">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            ₹{item.price} each
                          </p>
                          <p className="text-xs font-bold text-slate-900 mt-1">
                            ₹{itemSubtotal}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.id, cartItem.quantity - 1)}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-800">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, cartItem.quantity + 1)}
                            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code Section */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span>Student Promo Code</span>
                    </span>
                    {appliedOffer && (
                      <button
                        onClick={() => applyOffer(null)}
                        className="text-[10px] text-rose-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {appliedOffer ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="font-bold">{appliedOffer.code}</span> applied: -₹{cartDiscount}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">
                        Active
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCustomCode} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. DGUFIRST or STUDENTCOMBO"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-1.5 text-xs uppercase font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-lg transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {/* Quick Select Offer pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {offers
                      .filter((o) => o.isActive)
                      .slice(0, 2)
                      .map((off) => (
                        <button
                          key={off.id}
                          type="button"
                          onClick={() => applyOffer(off)}
                          className="text-[10px] bg-white border border-amber-200 text-amber-900 hover:bg-amber-100/60 font-semibold px-2 py-1 rounded-md transition"
                        >
                          Use {off.code} ({off.badgeText})
                        </button>
                      ))}
                  </div>
                </div>

                {/* Important MVP Notice */}
                <div className="text-[11px] text-slate-500 bg-slate-100/80 p-2.5 rounded-xl">
                  💡 <strong>No Delivery Fees:</strong> This cafe MVP serves Dine-in pre-orders and Counter Takeaway at zero surcharge.
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedOffer?.code})</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Takeaway / Dine-in Packaging</span>
                  <span className="text-emerald-700 font-semibold">FREE (₹0)</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm sm:text-base font-extrabold text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-amber-900">₹{cartGrandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-900/25 transition active:scale-98"
              >
                <span>Proceed to Order</span>
                <span className="text-amber-200">|</span>
                <span>₹{cartGrandTotal}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
