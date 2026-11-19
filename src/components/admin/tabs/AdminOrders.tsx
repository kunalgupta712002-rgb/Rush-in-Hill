import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { OrderStatus } from '../../../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ChefHat,
  ChevronRight,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<typeof orders[0] | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const statuses: OrderStatus[] = [
    'PLACED',
    'CONFIRMED',
    'PREPARING',
    'READY',
    'COMPLETED',
    'CANCELLED',
  ];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.orderStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.phone.includes(q);
      return matchId || matchName || matchPhone;
    }
    return true;
  });

  const handleNextStatus = (orderId: string, currentStatus: OrderStatus) => {
    if (currentStatus === 'PLACED') updateOrderStatus(orderId, 'CONFIRMED');
    else if (currentStatus === 'CONFIRMED') updateOrderStatus(orderId, 'PREPARING');
    else if (currentStatus === 'PREPARING') updateOrderStatus(orderId, 'READY');
    else if (currentStatus === 'READY') updateOrderStatus(orderId, 'COMPLETED');
  };

  const handleConfirmCancel = () => {
    if (orderToCancel) {
      updateOrderStatus(orderToCancel, 'CANCELLED');
      setOrderToCancel(null);
      showToast(`Order #${orderToCancel} cancelled.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Kitchen & Counter Order Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance orders through cooking stages, notify student pickups, and record counter settlements.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, name, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
            statusFilter === 'ALL'
              ? 'bg-amber-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All ({orders.length})
        </button>
        {statuses.map((st) => {
          const count = orders.filter((o) => o.orderStatus === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Segment</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isFinished =
                    order.orderStatus === 'COMPLETED' || order.orderStatus === 'CANCELLED';

                  return (
                    <tr key={order.id} className="hover:bg-amber-50/30 transition">
                      {/* ID & Time */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-900 block">
                          #{order.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">
                          {order.customerName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {order.phone}
                        </span>
                      </td>

                      {/* Customer Type */}
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
                          {order.customerType}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-4 max-w-[200px]">
                        <p className="truncate font-medium text-slate-800">
                          {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                        {order.specialInstructions && (
                          <p className="text-[10px] text-amber-700 italic truncate">
                            Note: {order.specialInstructions}
                          </p>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-3 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                        ₹{order.total}
                      </td>

                      {/* Order Type */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-slate-800 font-semibold block">
                          {order.orderType}
                        </span>
                        {order.tableNumber && (
                          <span className="text-[10px] text-slate-500 font-medium">
                            {order.tableNumber}
                          </span>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            order.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {order.paymentMethod.split(' ')[0]}
                        </span>
                      </td>

                      {/* Order Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            order.orderStatus === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.orderStatus === 'READY'
                              ? 'bg-blue-100 text-blue-800'
                              : order.orderStatus === 'PREPARING'
                              ? 'bg-amber-100 text-amber-800 animate-pulse'
                              : order.orderStatus === 'CANCELLED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isFinished && (
                            <button
                              onClick={() => handleNextStatus(order.id, order.orderStatus)}
                              className="px-2.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                              title="Advance to next step"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}

                          {!isFinished && (
                            <button
                              onClick={() => setOrderToCancel(order.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Cancel order"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedOrderForModal(order)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            title="Inspect details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Order Confirmation Dialog */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setOrderToCancel(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl relative border border-slate-200">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Cancel Order #{orderToCancel}?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to mark this order as cancelled? This action cannot be reversed.
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setOrderToCancel(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setSelectedOrderForModal(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-slate-200 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Order Details #{selectedOrderForModal.id}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedOrderForModal.customerName} ({selectedOrderForModal.customerType})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Items Breakdown</p>
                {selectedOrderForModal.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-50">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between font-extrabold text-sm text-slate-900 border-t border-slate-100">
                <span>Grand Total</span>
                <span className="text-amber-900">₹{selectedOrderForModal.total}</span>
              </div>

              {selectedOrderForModal.specialInstructions && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Kitchen instructions:</strong> {selectedOrderForModal.specialInstructions}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
