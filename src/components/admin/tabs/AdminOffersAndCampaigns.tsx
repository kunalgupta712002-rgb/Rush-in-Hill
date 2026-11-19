import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Offer, Campaign } from '../../../types';
import {
  Tag,
  Megaphone,
  Plus,
  Check,
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
} from 'lucide-react';

export const AdminOffersAndCampaigns: React.FC = () => {
  const {
    offers,
    campaigns,
    toggleOfferActive,
    addOffer,
    updateCampaigns,
    showToast,
  } = useApp();

  const [activeSubView, setActiveSubView] = useState<'offers' | 'campaigns'>('offers');

  // Add Offer Form state
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [flatDiscount, setFlatDiscount] = useState<number>(20);
  const [minOrderValue, setMinOrderValue] = useState<number>(100);
  const [badgeText, setBadgeText] = useState('Flat ₹20 OFF');

  // Add Campaign Form state
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [campName, setCampName] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campAudience, setCampAudience] = useState('DGU 1st & 2nd Year Students');
  const [campChannel, setCampChannel] = useState<Campaign['channel']>('Campus Activation');
  const [campBudget, setCampBudget] = useState<number>(2000);
  const [campLeads, setCampLeads] = useState<number>(200);
  const [campCustomers, setCampCustomers] = useState<number>(30);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    addOffer({
      id: `offer-${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title.trim(),
      description: description.trim(),
      flatDiscount: Number(flatDiscount),
      minOrderValue: Number(minOrderValue),
      validUntil: '2026-12-31',
      badgeText: badgeText.trim() || 'Special',
      isActive: true,
    });
    setIsAddOfferOpen(false);
    setCode('');
    setTitle('');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName.trim()) return;

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: campName.trim(),
      description: campDesc.trim(),
      targetAudience: campAudience.trim(),
      channel: campChannel,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-11-30',
      budget: Number(campBudget),
      leads: Number(campLeads),
      customers: Number(campCustomers),
      status: 'Active',
      offerCode: 'DGUFIRST',
    };

    updateCampaigns([newCamp, ...campaigns]);
    setIsAddCampaignOpen(false);
    showToast(`Campaign "${campName}" registered`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Marketing & Student Promotions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure coupons, launch campus flyer drives, and evaluate Customer Acquisition Cost (CAC).
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubView('offers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubView === 'offers'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Coupon Codes ({offers.length})
          </button>
          <button
            onClick={() => setActiveSubView('campaigns')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubView === 'campaigns'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campus Campaigns ({campaigns.length})
          </button>
        </div>
      </div>

      {activeSubView === 'offers' ? (
        /* OFFERS VIEW */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Active Student Offers</span>
            <button
              onClick={() => setIsAddOfferOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  offer.isActive ? 'border-slate-200' : 'border-slate-200 bg-slate-50/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                      {offer.code}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {offer.badgeText}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1">{offer.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{offer.description}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    Min. Order: ₹{offer.minOrderValue || 0}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`text-[10px] font-bold ${
                      offer.isActive ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {offer.isActive ? '● Live for Students' : '○ Paused'}
                  </span>
                  <button
                    onClick={() => toggleOfferActive(offer.id)}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    {offer.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Offer Modal */}
          {isAddOfferOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div
                onClick={() => setIsAddOfferOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-slate-200 text-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Create New Student Offer</h3>
                    <button
                      onClick={() => setIsAddOfferOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateOffer} className="space-y-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="e.g. EXAMFREE"
                        className="w-full px-3 py-2 uppercase font-mono font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Offer Title *</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Exam Cram Discount"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Flat ₹15 off for study night meals"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Flat Discount (₹)</label>
                        <input
                          type="number"
                          value={flatDiscount}
                          onChange={(e) => setFlatDiscount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Min Order Value (₹)</label>
                        <input
                          type="number"
                          value={minOrderValue}
                          onChange={(e) => setMinOrderValue(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={badgeText}
                        onChange={(e) => setBadgeText(e.target.value)}
                        placeholder="e.g. Save ₹20"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddOfferOpen(false)}
                        className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-amber-800 text-white font-bold rounded-xl shadow-xs"
                      >
                        Add Offer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CAMPAIGNS VIEW */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Acquisition Channels & CAC</span>
            <button
              onClick={() => setIsAddCampaignOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Campaign</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((camp) => {
              const cac = camp.customers > 0 ? Math.round(camp.budget / camp.customers) : 0;
              const convRate = camp.leads > 0 ? ((camp.customers / camp.leads) * 100).toFixed(1) : 0;

              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {camp.channel}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {camp.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{camp.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{camp.description}</p>
                    <p className="text-[10px] text-slate-500 mt-2">
                      Target: <strong>{camp.targetAudience}</strong>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-center bg-slate-50 p-2.5 rounded-xl">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Budget</span>
                        <span className="font-extrabold text-slate-900">₹{camp.budget}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Calculated CAC</span>
                        <span className="font-extrabold text-emerald-700">₹{cac} / buyer</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-600 px-1">
                      <span>Leads: <strong>{camp.leads}</strong></span>
                      <span>Paying: <strong>{camp.customers}</strong></span>
                      <span>Conv: <strong>{convRate}%</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Campaign Modal */}
          {isAddCampaignOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div
                onClick={() => setIsAddCampaignOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative border border-slate-200 text-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Register Marketing Campaign</h3>
                    <button
                      onClick={() => setIsAddCampaignOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateCampaign} className="space-y-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Campaign Name *</label>
                      <input
                        type="text"
                        required
                        value={campName}
                        onChange={(e) => setCampName(e.target.value)}
                        placeholder="e.g. DGU Freshers Fest Drive"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={campDesc}
                        onChange={(e) => setCampDesc(e.target.value)}
                        placeholder="Flyer distribution at cafeteria gate"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Channel *</label>
                        <select
                          value={campChannel}
                          onChange={(e) => setCampChannel(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="Campus Activation">Campus Activation</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Posters">Posters</option>
                          <option value="Referrals">Referrals</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Budget (₹)</label>
                        <input
                          type="number"
                          value={campBudget}
                          onChange={(e) => setCampBudget(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Expected Leads</label>
                        <input
                          type="number"
                          value={campLeads}
                          onChange={(e) => setCampLeads(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Paying Customers</label>
                        <input
                          type="number"
                          value={campCustomers}
                          onChange={(e) => setCampCustomers(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                      Est. CAC: <strong>₹{campCustomers > 0 ? Math.round(campBudget / campCustomers) : 0}</strong> per acquired student customer.
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddCampaignOpen(false)}
                        className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-amber-800 text-white font-bold rounded-xl shadow-xs"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
