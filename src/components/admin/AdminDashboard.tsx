import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './tabs/AdminOverview';
import { AdminOrders } from './tabs/AdminOrders';
import { AdminMenu } from './tabs/AdminMenu';
import { AdminCustomers } from './tabs/AdminCustomers';
import { AdminFeedback } from './tabs/AdminFeedback';
import { AdminOffersAndCampaigns } from './tabs/AdminOffersAndCampaigns';
import { AdminAnalytics } from './tabs/AdminAnalytics';
import { AdminValidation } from './tabs/AdminValidation';
import { AdminSettings } from './tabs/AdminSettings';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Star,
  Tag,
  Calculator,
  Target,
  Settings,
  ArrowLeft,
  LogOut,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminSubTab,
    setAdminSubTab,
    setActiveTab,
    setIsAdminLoggedIn,
    orders,
    feedback,
    showToast,
  } = useApp();

  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'PLACED' || o.orderStatus === 'CONFIRMED' || o.orderStatus === 'PREPARING'
  ).length;

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'feedback', label: 'Feedback', icon: Star, badge: `${feedback.length}` },
    { id: 'offers', label: 'Offers & Campaigns', icon: Tag },
    { id: 'analytics', label: 'Financial Analytics', icon: Calculator },
    { id: 'validation', label: '30-Day Validation', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveTab('home');
    showToast('Logged out of Admin Portal', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center font-extrabold text-sm shadow-xs">
              RIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Rush in Hill — Management Portal
                </h1>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono">
                  Admin Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Opposite DGU Campus Gate, Selaqui
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Return to public customer website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customer App</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Sub-Navigation Pills */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 sticky top-[53px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = adminSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab view body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {adminSubTab === 'overview' && <AdminOverview />}
        {adminSubTab === 'orders' && <AdminOrders />}
        {adminSubTab === 'menu' && <AdminMenu />}
        {adminSubTab === 'customers' && <AdminCustomers />}
        {adminSubTab === 'feedback' && <AdminFeedback />}
        {adminSubTab === 'offers' && <AdminOffersAndCampaigns />}
        {adminSubTab === 'analytics' && <AdminAnalytics />}
        {adminSubTab === 'validation' && <AdminValidation />}
        {adminSubTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
