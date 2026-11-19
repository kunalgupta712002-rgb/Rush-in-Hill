import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  CheckCircle2,
  Users,
  Star,
  TrendingUp,
  Flame,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { orders, feedback, menuItems, setAdminSubTab } = useApp();

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'PLACED' || o.orderStatus === 'CONFIRMED' || o.orderStatus === 'PREPARING'
  ).length;
  const completedOrdersCount = orders.filter((o) => o.orderStatus === 'COMPLETED').length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'CANCELLED')
    .reduce((sum, o) => sum + o.total, 0);

  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Customer segment counts
  const segmentCounts: { [key: string]: number } = {
    'DGU Student': 0,
    'Day Scholar': 0,
    'Industrial Employee': 0,
    Other: 0,
  };
  orders.forEach((o) => {
    if (segmentCounts[o.customerType] !== undefined) {
      segmentCounts[o.customerType] += 1;
    } else {
      segmentCounts['Other'] += 1;
    }
  });

  // Order type distribution
  const dineInCount = orders.filter((o) => o.orderType === 'Dine-in').length;
  const takeawayCount = orders.filter((o) => o.orderType === 'Takeaway / Pickup').length;

  // Avg feedback
  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((sum, f) => sum + f.overallRating, 0) / feedback.length).toFixed(1)
      : '4.5';

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
            Live Counter & Kitchen Dashboard
          </span>
          <h2 className="text-xl font-bold mt-1">Rush in Hill Operations Center</h2>
          <p className="text-xs text-amber-200 mt-0.5">
            Serving DGU students, day scholars & Selaqui workforce
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAdminSubTab('orders')}
            className="px-3.5 py-2 bg-white text-slate-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition shadow-xs"
          >
            Manage Kitchen ({pendingOrdersCount} Active)
          </button>
          <button
            onClick={() => setAdminSubTab('validation')}
            className="px-3.5 py-2 bg-amber-700/80 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold transition"
          >
            MVP Validation →
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Today's Orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalOrdersCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            {completedOrdersCount} fulfilled
          </span>
        </div>

        {/* Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Gross Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">₹{totalRevenue}</p>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            Zero delivery cut
          </span>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Active In Kitchen</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-800 mt-2">{pendingOrdersCount}</p>
          <span className="text-[10px] text-amber-700 font-medium mt-1 block">
            Needs prep/pickup
          </span>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Avg Basket Size</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">₹{avgOrderValue}</p>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            Target ₹100
          </span>
        </div>

        {/* Customer Rating */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Verified Rating</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{avgRating} <span className="text-xs font-normal text-slate-400">/5</span></p>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">
            {feedback.length} student reviews
          </span>
        </div>

        {/* Repeat Rate */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Repeat Visits</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-900 mt-2">24%</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Exceeds 20% target
          </span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Segment Breakdown */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Orders by Customer Segment</h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Distribution</span>
          </div>

          <div className="space-y-3">
            {Object.entries(segmentCounts).map(([seg, count]) => {
              const pct = totalOrdersCount > 0 ? Math.round((count / totalOrdersCount) * 100) : 0;
              return (
                <div key={seg} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{seg}</span>
                    <span className="text-slate-900">{count} orders ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        seg === 'DGU Student'
                          ? 'bg-amber-700'
                          : seg === 'Day Scholar'
                          ? 'bg-amber-500'
                          : seg === 'Industrial Employee'
                          ? 'bg-emerald-600'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${Math.max(8, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            💡 DGU hostel students and day scholars represent the largest immediate volume for lunch thalis and evening snacks.
          </div>
        </div>

        {/* Dining Type Distribution */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Dining vs Pickup Ratio</h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Channel</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 text-center">
              <span className="text-xs font-bold text-amber-900 block">Takeaway / Pickup</span>
              <p className="text-2xl font-black text-amber-950 mt-1">{takeawayCount}</p>
              <span className="text-[10px] text-slate-500 font-medium">
                {totalOrdersCount > 0 ? Math.round((takeawayCount / totalOrdersCount) * 100) : 0}% of orders
              </span>
            </div>

            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200/80 text-center">
              <span className="text-xs font-bold text-orange-900 block">Dine-in Pre-order</span>
              <p className="text-2xl font-black text-orange-950 mt-1">{dineInCount}</p>
              <span className="text-[10px] text-slate-500 font-medium">
                {totalOrdersCount > 0 ? Math.round((dineInCount / totalOrdersCount) * 100) : 0}% of orders
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            💡 High takeaway volume confirms students grab meals between classes to eat in academic lawns or hostel rooms.
          </div>
        </div>

        {/* Top Selling Food Items */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Popular Campus Dishes</h3>
            <button
              onClick={() => setAdminSubTab('menu')}
              className="text-xs text-amber-800 font-bold hover:underline"
            >
              Edit Menu
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {menuItems
              .filter((m) => m.isPopular)
              .slice(0, 4)
              .map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-500">{item.category} • {item.preparationTimeMinutes} min prep</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{item.price}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
