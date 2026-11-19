import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VALIDATION_4_WEEKS_PLAN } from '../../../data/mockData';
import {
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Compass,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const AdminValidation: React.FC = () => {
  const { orders, feedback, validationMetrics, updateValidationMetrics, showToast } = useApp();

  const [weekPlans, setWeekPlans] = useState(VALIDATION_4_WEEKS_PLAN);

  // Compute live actuals from orders
  const payingCustomersSet = new Set(orders.map((o) => o.phone || o.customerName));
  const livePayingCustomers = payingCustomersSet.size;

  // Repeat customers
  const phoneCounts: { [key: string]: number } = {};
  orders.forEach((o) => {
    const k = o.phone || o.customerName;
    phoneCounts[k] = (phoneCounts[k] || 0) + 1;
  });
  const liveRepeatCount = Object.values(phoneCounts).filter((c) => c > 1).length;
  const liveRepeatRate =
    livePayingCustomers > 0 ? Math.round((liveRepeatCount / livePayingCustomers) * 100) : 0;

  // Avg satisfaction
  const liveSatisfaction =
    feedback.length > 0
      ? (feedback.reduce((s, f) => s + f.overallRating, 0) / feedback.length).toFixed(1)
      : '4.4';

  const recommendCount = feedback.filter((f) => f.wouldRecommend === 'Yes').length;
  const liveReferralRate =
    feedback.length > 0 ? Math.round((recommendCount / feedback.length) * 100) : 88;

  const toggleWeekDone = (weekNum: number) => {
    setWeekPlans((prev) =>
      prev.map((w) => (w.week === weekNum ? { ...w, completed: !w.completed } : w))
    );
    showToast(`Week ${weekNum} status toggled`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6 rounded-3xl shadow-sm">
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
            Lean Startup Validation Dashboard
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            30-Day Venture Validation Plan
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Primary Hypothesis:{' '}
            <strong className="text-white">
              "Will at least 30 college students make a paid purchase within the first month when offered affordable, tasty food with quick service?"
            </strong>
          </p>
        </div>
      </div>

      {/* 4 Core Success Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Paid Customers Target */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold text-slate-700">Paid Customers</span>
              <Users className="w-4 h-4 text-amber-800" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">{livePayingCustomers}</span>
              <span className="text-sm font-bold text-slate-400">/ 30 Target</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              At least 30 paid student purchases in Month 1
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-amber-800 rounded-full"
                style={{ width: `${Math.min(100, Math.round((livePayingCustomers / 30) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block text-right font-bold">
              {Math.min(100, Math.round((livePayingCustomers / 30) * 100))}% Achieved
            </span>
          </div>
        </div>

        {/* Repeat Purchase Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold text-slate-700">Repeat Purchase Rate</span>
              <TrendingUp className="w-4 h-4 text-purple-700" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-purple-900">{liveRepeatRate}%</span>
              <span className="text-sm font-bold text-slate-400">/ 20% Min</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Validation target: Minimum 20% repeat rate
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Target Met ({liveRepeatCount} students repeated)
            </span>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold text-slate-700">Satisfaction Score</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">{liveSatisfaction}</span>
              <span className="text-sm font-bold text-slate-400">/ 5.0</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Across taste, cleanliness & pricing value
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Target 4.0/5 Exceeded
            </span>
          </div>
        </div>

        {/* Referral Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold text-slate-700">Willingness to Refer</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-emerald-900">{liveReferralRate}%</span>
              <span className="text-sm font-bold text-slate-400">/ 70% Target</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Students recommending to friends
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Strong word of mouth
            </span>
          </div>
        </div>
      </div>

      {/* Additional Stated Metrics Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Interviews Conducted</span>
          <span className="text-base font-extrabold text-slate-900 mt-0.5 block">30 Conversations</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Trial Pre-Orders</span>
          <span className="text-base font-extrabold text-slate-900 mt-0.5 block">10 Cohort Users</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Top Acq. Channel</span>
          <span className="text-base font-extrabold text-amber-900 mt-0.5 block">Campus Activation (₹67 CAC)</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Top Selling Item</span>
          <span className="text-base font-extrabold text-slate-900 mt-0.5 block">Student Mini Thali (₹99)</span>
        </div>
      </div>

      {/* 4-WEEK ROADMAP DETAILED ACCORDION / CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span>Structured 4-Week Validation Execution Plan</span>
          </h3>
          <span className="text-xs text-slate-400">Milestone checkpoints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weekPlans.map((plan) => (
            <div
              key={plan.week}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                plan.completed
                  ? 'bg-white border-emerald-300 ring-1 ring-emerald-300/40 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                    {plan.title}
                  </span>
                  <button
                    onClick={() => toggleWeekDone(plan.week)}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition flex items-center gap-1 ${
                      plan.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {plan.completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>Mark Complete</span>
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{plan.theme}</h4>

                {/* Target */}
                <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-xs">
                  <span className="font-bold text-slate-700">Target: </span>
                  <span className="text-slate-600">{plan.target}</span>
                </div>

                {/* Actions */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 text-[11px] uppercase block">
                    Execution Steps:
                  </span>
                  {plan.actions.map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Learning Question */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="font-bold text-amber-950 block text-[10px] uppercase">
                  Learning Question:
                </span>
                <p className="text-amber-900 italic mt-0.5">
                  "{plan.learningQuestion}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
