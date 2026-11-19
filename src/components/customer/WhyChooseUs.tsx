import React from 'react';
import { DollarSign, Sparkles, Clock, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: 'Affordable',
      tagline: 'Student-friendly prices designed for everyday meals.',
      description: 'Portions sized right and priced reasonably (₹50–₹150) so you never have to worry about monthly budget.',
      accentColor: 'from-amber-600 to-amber-700',
      badge: 'Starts ₹50',
    },
    {
      icon: ShieldCheck,
      title: 'Fresh & Hygienic',
      tagline: 'Freshly prepared food with hygiene as a priority.',
      description: 'Clean kitchen, filtered water, fresh seasonal vegetables, and zero compromised street-side shortcuts.',
      accentColor: 'from-emerald-600 to-emerald-700',
      badge: '100% Inspected',
    },
    {
      icon: Clock,
      title: 'Quick Service',
      tagline: 'Get your meal quickly between classes or work.',
      description: 'Pre-order online while walking from lecture hall. Your food is ready the minute you reach the counter.',
      accentColor: 'from-orange-600 to-orange-700',
      badge: '10-15 Min Ready',
    },
    {
      icon: MapPin,
      title: 'Near DGU',
      tagline: 'Conveniently located for students and nearby employees.',
      description: 'Right opposite DGU campus gate in Selaqui. Walk in for dine-in or grab your takeaway pack in seconds.',
      accentColor: 'from-rose-600 to-rose-700',
      badge: 'Campus Gate',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Why Students Choose Rush in Hill
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Designed for Campus Hunger & Busy Schedules
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No more overpriced cafeteria snacks or unhygienic oily dhabas. Enjoy tasty meals made fresh everyday.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-amber-50/40 hover:bg-white rounded-2xl p-6 border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accentColor} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-900 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 mt-1">
                    "{item.tagline}"
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-100/60 flex items-center text-[11px] font-medium text-amber-900">
                  <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Student verified guarantee</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
