import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HeroSection } from './components/customer/HeroSection';
import { WhyChooseUs } from './components/customer/WhyChooseUs';
import { MenuSection } from './components/customer/MenuSection';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { OrderHistory } from './components/customer/OrderHistory';
import { FeedbackModal } from './components/customer/FeedbackModal';
import { OffersPage } from './components/customer/OffersPage';
import { AboutAndLocation } from './components/customer/AboutAndLocation';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { CustomerLoginModal, AuthModalMode } from './components/customer/CustomerLoginModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  UtensilsCrossed,
  Tag,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setSelectedCategory,
    menuItems,
    addToCart,
    offers,
    settings,
  } = useApp();

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [customerAuthOpen, setCustomerAuthOpen] = useState(false);
  const [customerAuthMode, setCustomerAuthMode] = useState<AuthModalMode>('login');

  const handleOpenCustomerAuth = (mode: AuthModalMode) => {
    setCustomerAuthMode(mode);
    setCustomerAuthOpen(true);
  };

  // If in admin view, render Admin Dashboard
  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <ToastContainer />
        <AdminDashboard />
      </div>
    );
  }

  // Home Page View
  const renderHome = () => (
    <div className="space-y-0">
      {/* Notice Banner if active */}
      {settings.noticeBanner && (
        <div className="bg-amber-100/90 border-b border-amber-200 text-amber-950 text-xs font-semibold py-2 px-4 text-center">
          {settings.noticeBanner}
        </div>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Today's Special Offers Snapshot */}
      <section className="py-10 bg-amber-50/40 border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
                Limited Time Deals
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Today’s Campus Offers
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('offers')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <span>View All Student Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs flex items-center justify-between gap-3 group hover:border-amber-400 transition"
              >
                <div>
                  <span className="text-[10px] font-extrabold text-white bg-amber-800 px-2 py-0.5 rounded">
                    {offer.badgeText}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs mt-2">
                    {offer.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {offer.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 shrink-0 transition"
                >
                  Use {offer.code}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Popular Dishes Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
                Student Favourites
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                Most Popular Dishes Near DGU
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Freshly cooked, highly reviewed, and ready for quick pickup between lectures.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('menu');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              <span>See Full Menu ({menuItems.length} Dishes)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {menuItems
              .filter((m) => m.isPopular)
              .slice(0, 4)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 p-1 rounded-md shadow-xs">
                      {item.isVeg ? (
                        <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 border-2 border-rose-600 flex items-center justify-center rounded-xs">
                          <div className="w-1.5 h-1.5 bg-rose-600"></div>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.preparationTimeMinutes} mins</span>
                    </div>
                    {item.calories && (
                      <div className="absolute bottom-2 right-2 bg-slate-950/85 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/20">
                        <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                        <span>{item.calories} kcal</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs group-hover:text-amber-900 transition">
                        {item.name}
                      </h3>

                      {item.nutritionalTags && item.nutritionalTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.nutritionalTags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[9px] px-1.5 py-0.5 rounded-md border font-semibold ${
                                tag === 'High Protein'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : tag === 'Low Carb'
                                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                                  : 'bg-amber-50 text-amber-900 border-amber-200'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition shadow-xs active:scale-95"
                      >
                        + Add to Tray
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews & JTBD Highlight */}
      <section className="py-12 bg-amber-50/30 border-b border-amber-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Verified Campus Feedback
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Loved by Students & Commuters
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              "No long wait times, clean food, and prices that don’t drain our allowance."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 italic">
                "The Pocket Mini Thali for ₹99 is unmatched around DGU. The rotis are hot and dal tadka feels just like home."
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-900">Aman Sharma</span>
                <span className="text-slate-400">DGU 2nd Year</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 italic">
                "Pre-ordering on the app before leaving the computer lab saved me so much time. Grabbed my roll and chai in 2 minutes."
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-900">Pooja Rawat</span>
                <span className="text-slate-400">Day Scholar</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 italic">
                "Clean dining area and hygienic preparation. A welcome upgrade from roadside dhabas in the Selaqui industrial zone."
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-900">Vikram Joshi</span>
                <span className="text-slate-400">Selaqui Employee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus CTA Callout Banner */}
      <section className="py-12 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-700/60">
            <Sparkles className="w-3.5 h-3.5" /> Skip Campus Lunch Crowds
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order for Pickup or Dine-in Pre-order Today
          </h2>
          <p className="text-xs sm:text-sm text-amber-200 max-w-xl mx-auto">
            Fresh meals prepared with hygiene and ready in 10-15 minutes. Starting from just ₹50.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('menu');
              }}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-amber-50 rounded-xl font-bold text-xs shadow-md transition"
            >
              Order Meal Now
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className="px-6 py-3 bg-amber-700/80 hover:bg-amber-700 text-amber-100 rounded-xl font-bold text-xs border border-amber-600 transition"
            >
              Claim Student ₹20 Coupon
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <ToastContainer />

      {/* Top Navbar */}
      <Navbar
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenCustomerAuth={handleOpenCustomerAuth}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'menu' && <MenuSection />}
        {activeTab === 'offers' && <OffersPage />}
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'about' && <AboutAndLocation />}
        {activeTab === 'contact' && <AboutAndLocation />}
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setAdminLoginOpen(true)} />

      {/* Sticky Bottom Nav on Mobile */}
      <MobileBottomNav />

      {/* Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <FeedbackModal />
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />
      <CustomerLoginModal
        isOpen={customerAuthOpen}
        initialMode={customerAuthMode}
        onClose={() => setCustomerAuthOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
