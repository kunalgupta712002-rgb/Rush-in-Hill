import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  LogIn,
  UserPlus,
  Menu as MenuIcon,
  X,
} from 'lucide-react';
import { AuthModalMode } from '../customer/CustomerLoginModal';

interface NavbarProps {
  onOpenAdminLogin: () => void;
  onOpenCustomerAuth: (mode: AuthModalMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminLogin, onOpenCustomerAuth }) => {
  const {
    activeTab,
    setActiveTab,
    cartTotalQuantity,
    cartGrandTotal,
    setIsCartOpen,
    isAdminLoggedIn,
    settings,
    authUser,
    userProfile,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'offers', label: 'Offers', badge: 'Deals' },
    { id: 'orders', label: 'Orders & Track' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top micro bar for student context */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-50 text-[11px] font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-700/60 px-2 py-0.5 rounded text-[10px] text-amber-200 uppercase tracking-wider font-semibold">
              <MapPin className="w-3 h-3 text-amber-300" /> DGU Campus
            </span>
            <span className="hidden sm:inline text-amber-100/90">
              Fresh & Hygienic Meals • 265 Official Dishes • Pickup in 10-15 mins
            </span>
            <span className="sm:hidden text-amber-100/90">
              265 Dishes • Dine-in & Pickup
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-200/90 text-[10px]">
              <Clock className="w-3 h-3" />
              <span>{settings.openingHours.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 text-left group transition"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform border border-amber-600/30">
            <span className="tracking-tighter">RIH</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-amber-800 transition">
                Rush in Hill
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded border border-amber-200">
                Restro & Cafe
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none mt-1">
              Near DGU • Selaqui, Dehradun
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-amber-900 bg-amber-50 border border-amber-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 text-[9px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Switch */}
          <button
            onClick={() => {
              if (activeTab === 'admin') {
                setActiveTab('home');
              } else if (isAdminLoggedIn) {
                setActiveTab('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
              activeTab === 'admin'
                ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Switch to Cafe Admin & Kitchen Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">
              {activeTab === 'admin' ? 'Customer View' : 'Admin Portal'}
            </span>
            <span className="sm:hidden">Admin</span>
          </button>

          {/* Auth Actions: Log In / Sign Up OR Authenticated Profile Pill */}
          {authUser ? (
            <button
              onClick={() => onOpenCustomerAuth('profile')}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-800 bg-amber-50/80 border border-amber-200 hover:bg-amber-100 transition"
              title="Account & Profile"
            >
              {authUser.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt={userProfile?.displayName || 'Account'}
                  className="w-5 h-5 rounded-full object-cover border border-amber-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="w-5 h-5 rounded-full bg-amber-800 text-white text-[10px] font-bold flex items-center justify-center">
                  {(userProfile?.displayName || authUser.email || 'U')[0].toUpperCase()}
                </span>
              )}
              <span className="max-w-[90px] truncate">
                {(userProfile?.displayName || authUser.displayName || 'Account').split(' ')[0]}
              </span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => onOpenCustomerAuth('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-500" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => onOpenCustomerAuth('signup')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-800" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-3 sm:px-4 py-1.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-amber-900/20 transition-all transform active:scale-95"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartTotalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                  {cartTotalQuantity}
                </span>
              )}
            </div>
            <span className="hidden xs:inline">
              {cartTotalQuantity > 0 ? `₹${cartGrandTotal}` : 'Cart'}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-amber-100 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-amber-100/70 text-amber-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            {authUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomerAuth('profile');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-amber-950 bg-amber-50 rounded-lg border border-amber-200"
              >
                <User className="w-3.5 h-3.5 text-amber-800" />
                <span>
                  {userProfile?.displayName || authUser.displayName || authUser.email}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomerAuth('login');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomerAuth('signup');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-amber-950 bg-amber-100 rounded-lg border border-amber-300"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
