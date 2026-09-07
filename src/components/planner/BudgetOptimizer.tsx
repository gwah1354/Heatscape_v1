import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  IndianRupee, 
  Plus, 
  Minus,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const BudgetOptimizer: React.FC = () => {
  const { 
    selectedHotspot, 
    selectedOption, 
    budgetLakhs, 
    setBudgetLakhs, 
    setActiveScreen, 
    language 
  } = useApp();

  const presets = [10.0, 15.0, 20.0, 25.0];

  const getPlanName = () => {
    if (selectedOption.id === 'option-a') {
      return language === 'ta' ? 'மரங்களை மையப்படுத்திய குளிர்ச்சி' : 'Tree-focused cooling';
    }
    if (selectedOption.id === 'option-c') {
      return language === 'ta' ? 'குளிர் கூரைகள்' : 'Cool roofs';
    }
    return language === 'ta' ? 'மரங்கள் + குளிர் கூரைகள்' : 'Trees + cool roofs';
  };

  const getRelativeBenefit = () => {
    if (budgetLakhs >= 22) return language === 'ta' ? 'மிக அதிகம்' : 'Very High';
    if (budgetLakhs >= 13) return language === 'ta' ? 'அதிகம்' : 'High';
    return language === 'ta' ? 'மிதமானது' : 'Moderate';
  };

  // Intervention mix dynamically updated
  const scale = budgetLakhs / 15.0;
  const treesCount = Math.round(selectedOption.treeCount * scale);
  const coolRoofSqFt = Math.round(selectedOption.coolRoofSqFt * scale);

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('planner_action')}
          id="btn-back-to-action-plan"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Plan"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-stone-400">
            {language === 'ta' ? selectedHotspot.nameTa : selectedHotspot.name}
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {language === 'ta' ? 'எவ்வளவு நிதி ஒதுக்க முடியும்?' : 'What can we afford?'}
          </h1>
        </div>
      </div>

      {/* 1. Available Budget Card */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-4">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
          {language === 'ta' ? 'கிடைக்கும் பட்ஜெட்' : 'Available budget'}
        </span>

        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-4xl font-black text-white">
              ₹{budgetLakhs.toFixed(1)}
            </span>
            <span className="text-base font-bold text-emerald-400">L</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setBudgetLakhs(Math.max(5.0, budgetLakhs - 2.5))}
              id="btn-decrease-budget"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all active:scale-95"
              aria-label="Decrease Budget"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBudgetLakhs(Math.min(40.0, budgetLakhs + 2.5))}
              id="btn-increase-budget"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all active:scale-95"
              aria-label="Increase Budget"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={5.0}
          max={35.0}
          step={1.0}
          value={budgetLakhs}
          onChange={(e) => setBudgetLakhs(parseFloat(e.target.value))}
          className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        {/* Quick Presets */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setBudgetLakhs(p)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                budgetLakhs === p
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              ₹{p}L
            </button>
          ))}
        </div>
      </section>

      {/* 2. Recommended Plan (Budget -> Recommended plan) */}
      <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3.5">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
          {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட திட்டம்' : 'Recommended plan'}
        </span>

        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">
            {getPlanName()}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
              {language === 'ta' ? 'மதிப்பிடப்பட்ட செலவு' : 'Estimated cost'}
            </span>
            <span className="text-base font-black text-white font-mono mt-0.5 block">
              ₹{budgetLakhs.toFixed(1)}L
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
              {language === 'ta' ? 'மதிப்பிடப்பட்ட பயன்' : 'Estimated relative benefit'}
            </span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">
              {getRelativeBenefit()}
            </span>
          </div>
        </div>

        {/* Dynamic mix details */}
        <div className="p-3 rounded-2xl bg-stone-950/50 border border-stone-800/60 flex items-center justify-around text-xs text-stone-300">
          <div>
            <span className="text-[10px] text-stone-400 block">{language === 'ta' ? 'மரக்கன்றுகள்' : 'Trees'}</span>
            <span className="font-mono font-bold text-white">{treesCount}</span>
          </div>
          <div className="h-6 w-px bg-stone-800" />
          {coolRoofSqFt > 0 ? (
            <div>
              <span className="text-[10px] text-stone-400 block">{language === 'ta' ? 'குளிர் கூரை' : 'Cool Roof'}</span>
              <span className="font-mono font-bold text-white">{coolRoofSqFt.toLocaleString()} sq.ft</span>
            </div>
          ) : (
            <div>
              <span className="text-[10px] text-stone-400 block">{language === 'ta' ? 'நிழற்குடைகள்' : 'Shade Canopies'}</span>
              <span className="font-mono font-bold text-white">{Math.round(4 * scale)}</span>
            </div>
          )}
        </div>
      </section>

      {/* PRIMARY ACTION: Turn into project → */}
      <div className="pt-1">
        <button
          onClick={() => setActiveScreen('planner_brief')}
          id="btn-turn-into-project"
          className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 active:scale-98 transition-all"
        >
          <span>{language === 'ta' ? 'திட்டமாக மாற்றுக →' : 'Turn into project →'}</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>
    </div>
  );
};
