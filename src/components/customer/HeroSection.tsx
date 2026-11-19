import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Heart,
  ChevronRight,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-transparent py-10 sm:py-16 border-b border-amber-100/60">
      {/* Background soft ambient blur */}
      <div className="absolute top-0 right-10 -z-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Student & Campus Tag */}
            <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-900 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>DGU Campus • Selaqui, Dehradun</span>
              <span className="text-amber-400">|</span>
              <span className="text-amber-800 font-bold">265 Official Dishes • Starting ₹15</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Good Food.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-700 to-amber-900 underline decoration-amber-300 decoration-wavy decoration-2">
                Student-Friendly Prices.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Tasty, hygienic and affordable meals near DGU, Selaqui — made for busy students and nearby professionals who want wholesome food without wasting lecture breaks.
            </p>

            {/* Fast Value Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Hygienic Kitchen
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Ready in 10–15 Mins
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
                <Coffee className="w-3.5 h-3.5 text-orange-600" /> Dine-in & Quick Pickup
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setSelectedCategory('Combos');
                  setActiveTab('menu');
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-900/25 transition-all transform active:scale-95 group"
              >
                <span>Order for Pickup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('menu');
                }}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xs transition hover:border-slate-400"
              >
                <span>View Full Menu</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className="flex items-center justify-center gap-1.5 text-amber-900 hover:text-amber-950 font-bold text-xs px-3 py-2 rounded-lg hover:bg-amber-100/50 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Student Offers (₹20 OFF)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Student Food Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Food Showcase Card */}
              <div className="bg-white rounded-3xl p-4 shadow-xl border border-amber-100/80 relative overflow-hidden">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
                    alt="Student Pocket Mini Thali"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-amber-900/90 backdrop-blur-md text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> #1 Best Seller
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-amber-200 font-semibold uppercase tracking-wider">
                          Rush n Hill Special
                        </p>
                        <h3 className="text-lg font-bold text-white">Veg Thali Combo</h3>
                        <p className="text-xs text-slate-200 line-clamp-1">
                          Dal, Paneer, Seasonal Sabzi, Rice, Rotis & Salad • 2 for ₹340
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-amber-200 block">1 Combo</span>
                        <div className="text-xl font-extrabold text-amber-300">₹200</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge 1: Quick Prep */}
                <div className="absolute -top-3 -right-2 sm:right-3 bg-white border border-slate-200/90 rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold">Pre-order wait</p>
                    <p className="text-xs font-extrabold text-slate-900">10-12 Mins</p>
                  </div>
                </div>

                {/* Floating Micro Badge 2: Starting from ₹50 */}
                <div className="absolute -bottom-3 -left-2 sm:left-3 bg-white border border-slate-200/90 rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                    <span className="text-sm">₹</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold">Budget Bites</p>
                    <p className="text-xs font-extrabold text-emerald-700">Parathas @ ₹40</p>
                  </div>
                </div>

                {/* Quick 3-Dish Mini Ribbon */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                    <p className="text-[10px] text-slate-500">Parathas</p>
                    <p className="text-xs font-bold text-amber-900">From ₹40</p>
                  </div>
                  <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                    <p className="text-[10px] text-slate-500">Kathi Rolls</p>
                    <p className="text-xs font-bold text-amber-900">From ₹80</p>
                  </div>
                  <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                    <p className="text-[10px] text-slate-500">Chai & Coffee</p>
                    <p className="text-xs font-bold text-amber-900">From ₹15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
