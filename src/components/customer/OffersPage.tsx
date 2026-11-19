import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, Clock, Check, Copy, ArrowRight } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { offers, applyOffer, appliedOffer, setActiveTab, showToast } = useApp();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Coupon code ${code} copied!`, 'success');
  };

  const handleApply = (offer: typeof offers[0]) => {
    applyOffer(offer);
    setActiveTab('menu');
  };

  const activeOffers = offers.filter((o) => o.isActive);

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
          Campus Perks
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
          Student Offers & Meal Deals
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Enjoy extra pocket savings on your regular meals, mini thalis, and between-class snacks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeOffers.map((offer) => {
          const isApplied = appliedOffer?.id === offer.id;

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative overflow-hidden group hover:shadow-lg ${
                isApplied
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Badge corner */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-700 to-amber-800 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl shadow-xs">
                {offer.badgeText}
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                  <Tag className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-900 transition">
                  {offer.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {offer.description}
                </p>

                {offer.minOrderValue && (
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Min. order value: ₹{offer.minOrderValue}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                {/* Coupon Code Pill */}
                <div className="flex items-center justify-between bg-slate-50 border border-dashed border-slate-300 rounded-xl p-2 px-3">
                  <span className="font-mono text-xs font-bold text-amber-950 tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="Copy Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Apply / Active Action */}
                <button
                  onClick={() => handleApply(offer)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs ${
                    isApplied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-800 hover:bg-amber-900 text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied in Cart</span>
                    </>
                  ) : (
                    <>
                      <span>Apply & Browse Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin editable note */}
      <div className="mt-10 bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-center max-w-xl mx-auto">
        <p className="text-xs text-amber-900">
          💡 <strong>Founder / Admin note:</strong> These offers can be created, disabled, or tailored by the cafe owner inside the <strong>Admin Dashboard → Offers & Campaigns</strong> portal.
        </p>
      </div>
    </div>
  );
};
