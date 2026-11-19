import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Utensils, Tag, Clock, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartTotalQuantity, setIsCartOpen } = useApp();

  // If in admin view, don't show customer bottom nav
  if (activeTab === 'admin') return null;

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'orders', label: 'My Orders', icon: Clock },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
              isActive ? 'text-amber-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Quick Cart button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-amber-800 relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          {cartTotalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartTotalQuantity}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-0.5">Cart</span>
      </button>
    </div>
  );
};
