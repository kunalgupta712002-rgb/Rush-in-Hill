import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Users, Search, Phone, Star, ShoppingBag, Calendar, CheckCircle2 } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { orders, feedback } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregate customers by phone/name
  const aggregatedCustomers = useMemo(() => {
    const map = new Map<
      string,
      {
        id: string;
        name: string;
        phone: string;
        customerType: string;
        orderCount: number;
        totalSpent: number;
        lastOrderDate: string;
      }
    >();

    orders.forEach((o) => {
      const key = o.phone || o.customerName;
      if (!map.has(key)) {
        map.set(key, {
          id: o.customerId,
          name: o.customerName,
          phone: o.phone,
          customerType: o.customerType,
          orderCount: 1,
          totalSpent: o.total,
          lastOrderDate: o.createdAt,
        });
      } else {
        const curr = map.get(key)!;
        curr.orderCount += 1;
        curr.totalSpent += o.total;
        if (new Date(o.createdAt) > new Date(curr.lastOrderDate)) {
          curr.lastOrderDate = o.createdAt;
        }
      }
    });

    return Array.from(map.values());
  }, [orders]);

  const filteredCustomers = aggregatedCustomers.filter((c) => {
    if (filterType !== 'All' && c.customerType !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  });

  const getCustomerFeedbackScore = (phone: string, name: string) => {
    const userFb = feedback.filter(
      (f) => f.customerPhone === phone || f.customerName.toLowerCase() === name.toLowerCase()
    );
    if (userFb.length === 0) return null;
    const avg = userFb.reduce((s, f) => s + f.overallRating, 0) / userFb.length;
    return avg.toFixed(1);
  };

  const repeatCount = aggregatedCustomers.filter((c) => c.orderCount > 1).length;
  const repeatRate =
    aggregatedCustomers.length > 0
      ? Math.round((repeatCount / aggregatedCustomers.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Customer Directory & Retention
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track student loyalty, repeat purchase patterns, and segment distribution.
          </p>
        </div>

        {/* Quick stat */}
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-900">
          <CheckCircle2 className="w-4 h-4 text-purple-700" />
          <span>Repeat Rate: {repeatRate}% ({repeatCount} repeat students)</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {['All', 'DGU Student', 'Day Scholar', 'Industrial Employee', 'Other'].map((seg) => (
            <button
              key={seg}
              onClick={() => setFilterType(seg)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                filterType === seg
                  ? 'bg-amber-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Segment</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spending</th>
                <th className="py-3 px-4">Repeat Status</th>
                <th className="py-3 px-4">Avg Rating</th>
                <th className="py-3 px-4">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const rating = getCustomerFeedbackScore(cust.phone, cust.name);
                  const isRepeat = cust.orderCount > 1;

                  return (
                    <tr key={cust.phone || cust.name} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {cust.name}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-500">
                        {cust.phone.slice(0, 4)}••••{cust.phone.slice(-2)}
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {cust.customerType}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900">
                        {cust.orderCount}
                      </td>

                      <td className="py-3 px-4 font-extrabold text-amber-900">
                        ₹{cust.totalSpent}
                      </td>

                      <td className="py-3 px-4">
                        {isRepeat ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                            Repeat Buyer
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">
                            1st Order
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {rating ? (
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>{rating}</span>
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[10px]">
                        {new Date(cust.lastOrderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
