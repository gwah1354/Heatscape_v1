import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Trees, 
  SunMedium, 
  Layers,
  Sparkles
} from 'lucide-react';

export const ActionPlanner: React.FC = () => {
  const { 
    selectedHotspot, 
    interventionOptions, 
    selectedOption, 
    setSelectedOption, 
    setActiveScreen, 
    language 
  } = useApp();

  const plans = [
    {
      id: 'option-a',
      title: 'Tree-focused',
      titleTa: 'மரங்களை மையப்படுத்திய திட்டம்',
      subtitle: 'More shade',
      subtitleTa: 'அதிக நிழல் மற்றும் மரக்கன்றுகள்',
      cost: '₹14.8L',
      isRecommended: false,
      optionObj: interventionOptions.find(o => o.id === 'option-a') || interventionOptions[0]
    },
    {
      id: 'option-b',
      title: 'Balanced cooling',
      titleTa: 'சமச்சீர் குளிர்ச்சித் திட்டம்',
      subtitle: 'Trees + cool roofs',
      subtitleTa: 'மரங்கள் + பிரதிபலிப்பு கூரைகள்',
      cost: '₹15.0L',
      isRecommended: true,
      optionObj: interventionOptions.find(o => o.id === 'option-b') || interventionOptions[1] || interventionOptions[0]
    },
    {
      id: 'option-c',
      title: 'Cool-roof focused',
      titleTa: 'குளிர் கூரைகளை மையப்படுத்திய திட்டம்',
      subtitle: 'Cool roofs',
      subtitleTa: 'சூரிய வெப்பத்தை பிரதிபலிக்கும் கூரைகள்',
      cost: '₹14.2L',
      isRecommended: false,
      optionObj: interventionOptions.find(o => o.id === 'option-c') || interventionOptions[2] || interventionOptions[0]
    }
  ];

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('planner_hotspot')}
          id="btn-back-to-diagnose"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Diagnose"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-stone-400">
            {language === 'ta' ? selectedHotspot.nameTa : selectedHotspot.name}
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {language === 'ta' ? 'இங்கு என்ன செய்ய வேண்டும்?' : 'What should we do here?'}
          </h1>
        </div>
      </div>

      {/* 2–3 Clean Intervention Options */}
      <div className="space-y-3">
        {plans.map((plan) => {
          const isSelected = selectedOption.id === plan.id;

          return (
            <div
              key={plan.id}
              id={`plan-card-${plan.id}`}
              onClick={() => setSelectedOption(plan.optionObj)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-stone-900/95 border-emerald-500 shadow-xl ring-1 ring-emerald-500/40'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-white tracking-tight">
                      {language === 'ta' ? plan.titleTa : plan.title}
                    </h2>
                    {plan.isRecommended && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {language === 'ta' ? 'பரிந்துரைக்கப்படுகிறது' : 'Recommended'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {language === 'ta' ? plan.subtitleTa : plan.subtitle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-black text-white font-mono">
                    {plan.cost}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {isSelected 
                    ? (language === 'ta' ? '✓ தேர்வு செய்யப்பட்டது' : '✓ Selected plan') 
                    : (language === 'ta' ? 'தேர்வு செய்ய கிளிக் செய்க' : 'Tap to select')}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption(plan.optionObj);
                  }}
                  id={`btn-select-plan-${plan.id}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-stone-950 shadow-md'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{isSelected ? (language === 'ta' ? 'தேர்வு' : 'Selected') : (language === 'ta' ? 'தேர்ந்தெடு' : 'Select')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Under the recommendation: Why this plan? */}
      <section className="p-4 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-1.5">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {language === 'ta' ? 'ஏன் இந்த திட்டம்?' : 'Why this plan?'}
        </h3>
        <p className="text-xs text-stone-200 leading-relaxed font-medium">
          {language === 'ta' 
            ? 'ஒதுக்கப்பட்ட நிதிக்குள் அதிகபட்ச வெப்பக் குறைவு மற்றும் பொதுமக்களுக்கான நிழல் நன்மையை வழங்குகிறது.'
            : 'Best estimated benefit within the selected budget.'}
        </p>
      </section>

      {/* PRIMARY ACTION: Set budget → */}
      <div className="pt-1">
        <button
          onClick={() => setActiveScreen('planner_budget')}
          id="btn-proceed-to-budget"
          className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 active:scale-98 transition-all"
        >
          <span>{language === 'ta' ? 'பட்ஜெட் நிர்ணயம் செய்க →' : 'Set budget →'}</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>
    </div>
  );
};
