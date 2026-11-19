import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderTracker } from './OrderTracker';
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Star,
  Calendar,
  Utensils,
  ArrowRight,
  Check,
} from 'lucide-react';

export const OrderHistory: React.FC = () => {
  const {
    orders,
    menuItems,
    addToCart,
    setIsCartOpen,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    openFeedbackModal,
    setActiveTab,
    showToast,
  } = useApp();

  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null);

  const handleQuickReorder = (order: typeof orders[0]) => {
    setReorderingOrderId(order.id);

    let addedItemsCount = 0;
    const unavailableItems: string[] = [];

    order.items.forEach((orderItem) => {
      const isFullVariant = orderItem.menuItemId.endsWith('__full');
      const baseId = orderItem.menuItemId.replace(/__full$/, '');
      const menuItem = menuItems.find((m) => m.id === baseId);
      if (menuItem && menuItem.isAvailable) {
        const cartItem =
          isFullVariant && menuItem.fullPrice
            ? {
                ...menuItem,
                id: orderItem.menuItemId,
                name: orderItem.name,
                price: menuItem.fullPrice,
              }
            : menuItem.fullPrice
            ? {
                ...menuItem,
                name: orderItem.name,
              }
            : menuItem;
        addToCart(cartItem, orderItem.quantity);
        addedItemsCount += orderItem.quantity;
      } else {
        unavailableItems.push(orderItem.name);
      }
    });

    setTimeout(() => {
      setReorderingOrderId(null);

      if (addedItemsCount > 0) {
        if (unavailableItems.length > 0) {
          showToast(
            `Added ${addedItemsCount} items to tray. (${unavailableItems.join(', ')} currently sold out)`,
            'warning'
          );
        } else {
          showToast(
            `Quick Reorder: Added ${addedItemsCount} dishes from #${order.id} to your tray!`,
            'success'
          );
        }
        setIsCartOpen(true);
      } else {
        showToast('Items from this order are currently sold out for today.', 'error');
      }
    }, 300);
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
            Customer Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Order Status & History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track current kitchen progress or use Quick Reorder to add your regular meals with a single click.
          </p>
        </div>

        {activeTrackingOrderId && (
          <button
            onClick={() => setActiveTrackingOrderId(null)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition"
          >
            ← View All Orders
          </button>
        )}
      </div>

      {/* If specific order is selected for live tracking */}
      {activeTrackingOrderId ? (
        <OrderTracker orderId={activeTrackingOrderId} />
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl mx-auto flex items-center justify-center text-amber-700 mb-3">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            You haven't placed an order yet. Browse our affordable menu and order delicious meals starting at ₹50.
          </p>
          <button
            onClick={() => setActiveTab('menu')}
            className="mt-5 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Reorder Top Spotlight for Returning Students */}
          {latestOrder && (
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-amber-700/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-600/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-200 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Quick Reorder Spotlight</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    Hungry again? Reorder your last meal in 1 click
                  </h3>
                  <p className="text-xs text-amber-100/90 flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span>Order #{latestOrder.id}:</span>
                    <strong className="text-amber-300">
                      {latestOrder.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </strong>
                    <span>(₹{latestOrder.total})</span>
                  </p>
                </div>

                <button
                  onClick={() => handleQuickReorder(latestOrder)}
                  disabled={reorderingOrderId === latestOrder.id}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition-all active:scale-95 shrink-0 group border border-amber-200"
                >
                  <RotateCcw
                    className={`w-4 h-4 text-amber-800 ${
                      reorderingOrderId === latestOrder.id
                        ? 'animate-spin'
                        : 'group-hover:-rotate-90 transition-transform duration-300'
                    }`}
                  />
                  <span>
                    {reorderingOrderId === latestOrder.id
                      ? 'Adding to Tray...'
                      : 'Quick Reorder This Meal'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                All Past Orders ({orders.length})
              </h3>
              <span className="text-[11px] text-slate-400">
                Click "Quick Reorder" on any order to reload your cart
              </span>
            </div>

            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              const isCompleted = order.orderStatus === 'COMPLETED';
              const isCancelled = order.orderStatus === 'CANCELLED';
              const isCurrentlyReordering = reorderingOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-300 p-4 sm:p-5 shadow-xs transition-all hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold bg-slate-100 text-slate-800 px-2 py-1 rounded">
                        #{order.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCancelled
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {formattedDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {order.orderType}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{order.total}
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="py-3 flex flex-wrap items-center gap-2 text-xs">
                    {order.items.map((it, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium"
                      >
                        <span className="font-bold text-amber-800">{it.quantity}x</span>
                        <span>{it.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500">
                      Payment:{' '}
                      <span className="font-semibold text-slate-700">
                        {order.paymentMethod}
                      </span>{' '}
                      ({order.paymentStatus})
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Track Button */}
                      <button
                        onClick={() => setActiveTrackingOrderId(order.id)}
                        className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition flex items-center gap-1"
                      >
                        <span>Track Status</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Feedback Button */}
                      {(order.orderStatus === 'READY' || order.orderStatus === 'COMPLETED') && (
                        <button
                          onClick={() => openFeedbackModal(order.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1 ${
                            order.hasFeedbackSubmitted
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <Star className="w-3 h-3 fill-current" />
                          <span>{order.hasFeedbackSubmitted ? 'Reviewed' : 'Rate Food'}</span>
                        </button>
                      )}

                      {/* Prominent Quick Reorder Button */}
                      <button
                        onClick={() => handleQuickReorder(order)}
                        disabled={isCurrentlyReordering}
                        className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 rounded-xl transition flex items-center gap-1.5 shadow-xs active:scale-95 group"
                        title="Add all dishes from this order back to your cart with a single click"
                      >
                        <RotateCcw
                          className={`w-3.5 h-3.5 text-amber-200 ${
                            isCurrentlyReordering
                              ? 'animate-spin'
                              : 'group-hover:-rotate-90 transition-transform duration-200'
                          }`}
                        />
                        <span>
                          {isCurrentlyReordering ? 'Adding...' : 'Quick Reorder'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

