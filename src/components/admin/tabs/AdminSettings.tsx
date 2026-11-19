import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Store,
  MapPin,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  RotateCcw,
  Download,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllData, showToast } = useApp();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [location, setLocation] = useState(settings.location);
  const [landmark, setLandmark] = useState(settings.landmark);
  const [city, setCity] = useState(settings.city);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [isStoreOpen, setIsStoreOpen] = useState(settings.isStoreOpen);
  const [minPrepTime, setMinPrepTime] = useState(settings.minPrepTimeMinutes);
  const [noticeBanner, setNoticeBanner] = useState(settings.noticeBanner || '');

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      location,
      landmark,
      city,
      phone,
      email,
      openingHours,
      isStoreOpen,
      minPrepTimeMinutes: Number(minPrepTime),
      noticeBanner,
    });
  };

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      venture: 'Rush in Hill Restro and Cafe',
      settings,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rush-in-hill-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Cafe configuration exported', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Cafe & Operational Settings
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure physical address near DGU campus, daily timings, contact info, and kitchen defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Venture Brand Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City & State</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inquiry Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Min Base Prep (Mins)</label>
                <input
                  type="number"
                  value={minPrepTime}
                  onChange={(e) => setMinPrepTime(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Daily Timings</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Top Student Notice Bar</label>
              <input
                type="text"
                value={noticeBanner}
                onChange={(e) => setNoticeBanner(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            {/* Store Open Status */}
            <div className="pt-2">
              <label className="flex items-center gap-2 p-3 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStoreOpen}
                  onChange={(e) => setIsStoreOpen(e.target.checked)}
                  className="rounded text-amber-800"
                />
                <span className="font-bold text-slate-900">
                  Kitchen Open for Orders ({isStoreOpen ? 'Accepting Orders' : 'Paused / Closed'})
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Demo & Data Controls */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          {/* Backup */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-800" />
              <span>Data Export & Backup</span>
            </h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Export all local orders, dishes, and metrics to inspect offline or prepare for Firebase migration.
            </p>
            <button
              onClick={handleExportJSON}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition"
            >
              Export JSON Backup
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="bg-rose-50/60 p-5 rounded-3xl border border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Reset Demo State</span>
            </div>
            <p className="text-rose-800 text-[11px] leading-relaxed">
              Clears localStorage and restores original demo dishes, orders, student reviews, and baseline financial inputs.
            </p>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-xs"
            >
              Reset to Seed Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setIsResetConfirmOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl relative border border-slate-200">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Reset Demo Data?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will reset all menu modifications, custom orders, and reviews back to the initial sample dataset.
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetAllData();
                    setIsResetConfirmOpen(false);
                  }}
                  className="flex-1 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
