import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  Heart,
  Users,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutAndLocation: React.FC = () => {
  const { settings, setActiveTab } = useApp();

  const handleDirections = () => {
    window.open(
      'https://maps.google.com/?q=DGU+Campus+Selaqui+Dehradun+Uttarakhand',
      '_blank'
    );
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
      {/* About Venture Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Our Mission Near DGU</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tasty, Hygienic Meals Built for Fast Student Schedules.
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            <strong>Rush in Hill Restro and Cafe</strong> was founded to solve a daily frustration shared by thousands of college students and young professionals around the DGU campus and Selaqui industrial corridor:
            <em className="text-amber-900 block mt-2 p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 not-italic">
              "During lunch or dinner when students and employees are busy with classes or shifts, they need tasty, hygienic, and affordable food nearby without spending hours cooking or settling for unhealthy street snacks."
            </em>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We focus strictly on the essentials: high hygiene standards, consistent homestyle taste, pocket-friendly student pricing (from ₹50 to ₹149), and a fast counter pre-order system that guarantees your meal is ready the moment you walk through our doors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-extrabold text-slate-900">Zero Food Compromise</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Daily fresh produce, RO-purified water, and hygienic food prep standards.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-extrabold text-slate-900">Pocket-Friendly</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Transparent student-priced meal boxes, thalis, and between-class bites.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-extrabold text-slate-900">10-15 Min Pickup</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Pre-order from your desk or lecture hall and walk right in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                Visit Us
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                Rush in Hill Restro and Cafe
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Opposite DGU Campus Gate • Selaqui, Dehradun
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Address */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Physical Location</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {settings.location}
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    {settings.landmark}, {settings.city}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Daily Operating Hours</h4>
                  <p className="text-slate-600 mt-0.5 font-medium">
                    {settings.openingHours}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Open for Lunch, Evening Snacks & Dinner
                  </span>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <Phone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Counter Phone & WhatsApp</h4>
                  <p className="text-slate-700 mt-0.5 font-bold font-mono">
                    {settings.phone}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {settings.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <button
              onClick={handleDirections}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-3.5 rounded-2xl font-bold text-xs shadow-md shadow-amber-900/15 transition active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </button>
          </div>

          {/* Right Map Placeholder & Directions Visual */}
          <div className="lg:col-span-7 bg-amber-50/50 rounded-3xl p-4 border border-amber-200/80 relative">
            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-200 relative flex flex-col items-center justify-center text-center p-6 border border-slate-300">
              {/* Stylized Map View Simulation */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Map roads mock */}
              <div className="absolute w-full h-8 bg-slate-300/80 top-1/2 -translate-y-1/2 rotate-12"></div>
              <div className="absolute h-full w-8 bg-slate-300/80 left-1/3 -translate-x-1/2"></div>

              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-amber-900 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-amber-400">
                  <MapPin className="w-6 h-6 text-amber-300 fill-amber-300" />
                  <div className="text-left">
                    <p className="text-xs font-black tracking-tight leading-none">Rush in Hill Cafe</p>
                    <p className="text-[9px] text-amber-200 leading-none mt-1">Opposite DGU Gate</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-amber-900 rotate-45 -mt-1.5 shadow-md"></div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md text-left flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">DGU Main Campus Landmark</p>
                  <p className="text-[10px] text-slate-500">2-minute walk from academic block</p>
                </div>
                <button
                  onClick={handleDirections}
                  className="px-3 py-1.5 bg-amber-800 text-white rounded-lg text-[11px] font-bold"
                >
                  Navigate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
