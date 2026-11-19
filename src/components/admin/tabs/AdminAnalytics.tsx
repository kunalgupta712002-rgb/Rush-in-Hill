import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Calculator,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  PieChart,
  Sliders,
  Scale,
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { financialAssumptions, updateFinancialAssumptions, showToast } = useApp();

  // Dynamic model sliders/inputs
  const [sellingPrice, setSellingPrice] = useState<number>(financialAssumptions.sellingPrice);
  const [variableCost, setVariableCost] = useState<number>(financialAssumptions.variableCost);
  const [fixedCosts, setFixedCosts] = useState<number>(financialAssumptions.monthlyFixedCosts);
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(
    financialAssumptions.monthlyCustomers
  );
  const [purchasesPerCustomer, setPurchasesPerCustomer] = useState<number>(
    financialAssumptions.purchasesPerCustomer
  );

  // Dynamic Calculations based on exact formulas
  const contributionPerUnit = sellingPrice - variableCost;
  const contributionMarginPct =
    sellingPrice > 0 ? ((contributionPerUnit / sellingPrice) * 100).toFixed(1) : '0';

  const monthlyUnits = monthlyCustomers * purchasesPerCustomer;
  const monthlyRevenue = monthlyUnits * sellingPrice;
  const monthlyVariableCost = monthlyUnits * variableCost;
  const monthlyContribution = monthlyUnits * contributionPerUnit;
  const operatingSurplus = monthlyContribution - fixedCosts;

  const breakEvenUnits =
    contributionPerUnit > 0 ? Math.ceil(fixedCosts / contributionPerUnit) : 0;
  const breakEvenCustomers =
    purchasesPerCustomer > 0 ? Math.ceil(breakEvenUnits / purchasesPerCustomer) : 0;

  const handleResetToVentureBaseline = () => {
    setSellingPrice(100);
    setVariableCost(55);
    setFixedCosts(30000);
    setMonthlyCustomers(150);
    setPurchasesPerCustomer(3);
    updateFinancialAssumptions({
      sellingPrice: 100,
      variableCost: 55,
      monthlyFixedCosts: 30000,
      monthlyCustomers: 150,
      purchasesPerCustomer: 3,
      avgVisitAssumptionNote:
        'Founder-entered assumption: ₹1,200 average-per-visit listed in early notes is maintained as a scenario benchmark.',
    });
    showToast('Reset unit economics to original venture baseline figures', 'info');
  };

  const handleSaveAssumptions = () => {
    updateFinancialAssumptions({
      sellingPrice,
      variableCost,
      monthlyFixedCosts: fixedCosts,
      monthlyCustomers,
      purchasesPerCustomer,
      avgVisitAssumptionNote: financialAssumptions.avgVisitAssumptionNote,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Unit Economics & Financial Projections
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive financial sensitivity model based on the venture's target margin and break-even thresholds.
          </p>
        </div>

        <button
          onClick={handleResetToVentureBaseline}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Venture Baseline</span>
        </button>
      </div>

      {/* Mandatory Assumptions & Validation Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Founder-Entered Assumptions Requiring Validation</span>
        </div>
        <p className="text-amber-900/90 leading-relaxed text-[11px]">
          These figures represent initial venture hypotheses, not verified accounting records. The baseline model uses <strong>150 monthly students</strong> making <strong>3 purchases</strong> (yielding 450 units). A separate note mentions a <strong>₹1,200</strong> average-per-visit assumption in alternate dining scenarios. Real-world actuals must be tested during the 30-Day Validation phase.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-800" />
              <span>Adjust Model Drivers</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              Dynamic Inputs
            </span>
          </div>

          {/* Selling Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Selling Price per Unit</span>
              <span className="text-amber-900 font-extrabold">₹{sellingPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={250}
              step={5}
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-amber-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹50 (Budget)</span>
              <span>₹100 (Baseline)</span>
              <span>₹250 (Combo)</span>
            </div>
          </div>

          {/* Variable Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Variable Cost per Unit (COGS)</span>
              <span className="text-amber-900 font-extrabold">₹{variableCost}</span>
            </div>
            <input
              type="range"
              min={20}
              max={150}
              step={1}
              value={variableCost}
              onChange={(e) => setVariableCost(Number(e.target.value))}
              className="w-full accent-amber-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹20 (Bulk)</span>
              <span>₹55 (Baseline)</span>
              <span>₹150</span>
            </div>
          </div>

          {/* Monthly Fixed Costs */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Monthly Fixed Operating Costs</span>
              <span className="text-amber-900 font-extrabold">₹{fixedCosts.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={80000}
              step={1000}
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full accent-amber-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹10,000 (Low rent)</span>
              <span>₹30,000 (Target)</span>
              <span>₹80,000</span>
            </div>
          </div>

          {/* Monthly Customers */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Active Monthly Customers</span>
              <span className="text-amber-900 font-extrabold">{monthlyCustomers} students</span>
            </div>
            <input
              type="range"
              min={30}
              max={600}
              step={10}
              value={monthlyCustomers}
              onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
              className="w-full accent-amber-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>30 (MVP min)</span>
              <span>150 (Baseline)</span>
              <span>600 (Scaled)</span>
            </div>
          </div>

          {/* Purchases Per Customer */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Purchases per Customer / Month</span>
              <span className="text-amber-900 font-extrabold">{purchasesPerCustomer} visits</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={purchasesPerCustomer}
              onChange={(e) => setPurchasesPerCustomer(Number(e.target.value))}
              className="w-full accent-amber-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 visit</span>
              <span>3 visits (Baseline)</span>
              <span>15 visits (Daily mess)</span>
            </div>
          </div>

          <button
            onClick={handleSaveAssumptions}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Save as Current Model State
          </button>
        </div>

        {/* Right Column: Calculated Unit Economics & Break-even */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Output Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Contribution / Unit
              </span>
              <p className="text-xl font-black text-slate-900 mt-1">₹{contributionPerUnit}</p>
              <span className="text-[10px] text-amber-700 font-semibold">{contributionMarginPct}% margin</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Monthly Units
              </span>
              <p className="text-xl font-black text-slate-900 mt-1">{monthlyUnits}</p>
              <span className="text-[10px] text-slate-500">meals sold</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Monthly Revenue
              </span>
              <p className="text-xl font-black text-slate-900 mt-1">₹{monthlyRevenue.toLocaleString('en-IN')}</p>
              <span className="text-[10px] text-slate-500">at ₹{sellingPrice}/unit</span>
            </div>

            <div
              className={`p-4 rounded-2xl border shadow-xs text-center ${
                operatingSurplus >= 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <span className="text-[10px] font-bold uppercase block">
                {operatingSurplus >= 0 ? 'Operating Surplus' : 'Operating Deficit'}
              </span>
              <p className="text-xl font-black mt-1">
                {operatingSurplus >= 0 ? `+₹${operatingSurplus.toLocaleString('en-IN')}` : `-₹${Math.abs(operatingSurplus).toLocaleString('en-IN')}`}
              </p>
              <span className="text-[10px] font-semibold">
                {operatingSurplus >= 0 ? 'Profitable' : 'Requires Scale'}
              </span>
            </div>
          </div>

          {/* Break-Even Target Showcase */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>Break-Even Volume Analysis</span>
              </h4>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Fixed Cost = ₹{fixedCosts.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-semibold block">
                  Required Break-Even Meals
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {breakEvenUnits} <span className="text-xs font-normal text-slate-500">units/mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Formula: Fixed Costs (₹{fixedCosts}) ÷ Contribution (₹{contributionPerUnit})
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-semibold block">
                  Required Paying Students
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {breakEvenCustomers} <span className="text-xs font-normal text-slate-500">students</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Formula: Break-even Units ({breakEvenUnits}) ÷ Frequency ({purchasesPerCustomer} orders)
                </p>
              </div>
            </div>

            {/* Visual Progress towards break-even */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Current Projected Units vs Break-Even Target</span>
                <span className="text-slate-900">
                  {monthlyUnits} / {breakEvenUnits} units ({breakEvenUnits > 0 ? Math.min(100, Math.round((monthlyUnits / breakEvenUnits) * 100)) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    monthlyUnits >= breakEvenUnits ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                  style={{
                    width: `${breakEvenUnits > 0 ? Math.min(100, Math.round((monthlyUnits / breakEvenUnits) * 100)) : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Breakdown Table of Formula Terms */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-xs space-y-2.5">
            <h4 className="font-bold text-slate-900">Financial Calculation Audit Table</h4>
            <div className="divide-y divide-slate-100 text-slate-700">
              <div className="py-1.5 flex justify-between">
                <span>Contribution per Unit (Selling Price - Variable Cost)</span>
                <span className="font-mono font-bold">₹{sellingPrice} - ₹{variableCost} = ₹{contributionPerUnit}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Monthly Variable Costs ({monthlyUnits} units × ₹{variableCost})</span>
                <span className="font-mono font-bold">₹{monthlyVariableCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Monthly Contribution ({monthlyUnits} units × ₹{contributionPerUnit})</span>
                <span className="font-mono font-bold">₹{monthlyContribution.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Operating Surplus / Deficit (Contribution - Fixed Costs)</span>
                <span className={`font-mono font-bold ${operatingSurplus >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  ₹{monthlyContribution.toLocaleString('en-IN')} - ₹{fixedCosts.toLocaleString('en-IN')} = ₹{operatingSurplus.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
