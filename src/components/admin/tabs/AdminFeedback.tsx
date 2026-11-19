import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Star, MessageSquare, ThumbsUp, Filter, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const AdminFeedback: React.FC = () => {
  const { feedback } = useApp();
  const [starFilter, setStarFilter] = useState<number | 'ALL'>('ALL');

  const filtered = feedback.filter((f) => {
    if (starFilter === 'ALL') return true;
    return f.overallRating === starFilter;
  });

  // Calculate averages
  const count = feedback.length;
  const avgOverall = count > 0 ? (feedback.reduce((s, f) => s + f.overallRating, 0) / count).toFixed(1) : '0.0';
  const avgTaste = count > 0 ? (feedback.reduce((s, f) => s + f.tasteRating, 0) / count).toFixed(1) : '0.0';
  const avgHygiene = count > 0 ? (feedback.reduce((s, f) => s + f.hygieneRating, 0) / count).toFixed(1) : '0.0';
  const avgService = count > 0 ? (feedback.reduce((s, f) => s + f.serviceRating, 0) / count).toFixed(1) : '0.0';
  const avgValue = count > 0 ? (feedback.reduce((s, f) => s + f.valueRating, 0) / count).toFixed(1) : '0.0';

  const recommendYes = feedback.filter((f) => f.wouldRecommend === 'Yes').length;
  const recommendPct = count > 0 ? Math.round((recommendYes / count) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Customer Quality & Feedback Portal
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified student surveys on food taste, kitchen cleanliness, pickup speed, and pricing value.
        </p>
      </div>

      {/* Aggregate Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
          <span className="text-[10px] font-bold text-amber-900 uppercase">Overall Rating</span>
          <p className="text-2xl font-black text-amber-900 mt-1 flex items-center justify-center gap-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span>{avgOverall}</span>
          </p>
          <span className="text-[10px] text-amber-700">{count} total ratings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Taste & Flavour</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgTaste} <span className="text-xs font-normal text-slate-400">/5</span></p>
          <span className="text-[10px] text-emerald-600 font-semibold">High praise</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Hygiene & Clean</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgHygiene} <span className="text-xs font-normal text-slate-400">/5</span></p>
          <span className="text-[10px] text-emerald-600 font-semibold">Clean kitchen</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Service Speed</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgService} <span className="text-xs font-normal text-slate-400">/5</span></p>
          <span className="text-[10px] text-slate-500">10-15m target</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Value for Money</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{avgValue} <span className="text-xs font-normal text-slate-400">/5</span></p>
          <span className="text-[10px] text-emerald-600 font-semibold">Student approved</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
          <span className="text-[10px] font-bold text-emerald-900 uppercase">Recommend Rate</span>
          <p className="text-2xl font-black text-emerald-900 mt-1">{recommendPct}%</p>
          <span className="text-[10px] text-emerald-700 font-semibold">{recommendYes} Yes votes</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setStarFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            starFilter === 'ALL'
              ? 'bg-amber-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Reviews ({feedback.length})
        </button>
        {[5, 4, 3, 2, 1].map((s) => (
          <button
            key={s}
            onClick={() => setStarFilter(s)}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
              starFilter === s
                ? 'bg-amber-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{s}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </button>
        ))}
      </div>

      {/* Feedback Feed */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-400 border border-slate-200">
            No feedback found under this filter.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs">{item.customerName}</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    Order #{item.orderId}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= item.overallRating
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">
                    {item.overallRating}.0
                  </span>
                </div>
              </div>

              {/* Granular Breakdown Badges */}
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-600">
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  Taste: <strong>{item.tasteRating}/5</strong>
                </span>
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  Hygiene: <strong>{item.hygieneRating}/5</strong>
                </span>
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  Speed: <strong>{item.serviceRating}/5</strong>
                </span>
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  Value: <strong>{item.valueRating}/5</strong>
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Recommends: <strong>{item.wouldRecommend}</strong>
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs text-slate-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100/70 italic">
                "{item.comment}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
