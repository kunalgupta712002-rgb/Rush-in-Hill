import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowUp,
} from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin }) => {
  const { setActiveTab, setSelectedCategory, settings, isAdminLoggedIn } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white font-extrabold text-sm">
                RIH
              </div>
              <span className="font-bold text-base text-white">Rush in Hill</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tasty, hygienic and affordable casual dining & takeaway pre-orders right opposite DGU campus gate, Selaqui.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Digital MVP Prototype
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Full Menu (from ₹50)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('offers')}
                  className="hover:text-white transition"
                >
                  Student Offers & Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="hover:text-white transition"
                >
                  Track Order / History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition"
                >
                  About the Venture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Food Categories */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Menu Highlights
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Subha Ka Nasta');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Subha Ka Nasta (Parathas & Maggi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Hills Tadka');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Hills Tadka (Dal, Paneer & Curries)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Made in China');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Made in China (Momos & Noodles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Pizza Menu');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Pizza Menu (Buy 2 Get 1 Free)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Combos');
                    setActiveTab('menu');
                  }}
                  className="hover:text-white transition"
                >
                  Thali & Meal Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Hours */}
          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Find & Contact Us
            </h4>
            <p className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{settings.location}, {settings.landmark}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{settings.openingHours.split('(')[0]}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300 font-mono">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{settings.phone}</span>
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setActiveTab('admin');
                  } else {
                    onOpenAdminLogin();
                  }
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cafe Owner & Kitchen Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom micro bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Rush in Hill Restro and Cafe. Built for DGU students & Selaqui community.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-slate-400 transition"
            >
              Venture JTBD Story
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
