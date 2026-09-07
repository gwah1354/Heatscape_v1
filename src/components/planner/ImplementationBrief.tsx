import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  IndianRupee, 
  Send,
  Check,
  FileCheck
} from 'lucide-react';

export const ImplementationBrief: React.FC = () => {
  const { 
    selectedHotspot, 
    selectedOption, 
    budgetLakhs, 
    setActiveScreen, 
    language 
  } = useApp();

  const [projectCreated, setProjectCreated] = useState(false);

  const getStrategyName = () => {
    if (selectedOption.id === 'option-a') {
      return language === 'ta' ? 'மரம் நடுதல் மற்றும் பசுமை வளையம்' : 'Tree planting + green buffer';
    }
    if (selectedOption.id === 'option-c') {
      return language === 'ta' ? 'குளிர் கூரைகள்' : 'Cool roofs';
    }
    return language === 'ta' ? 'மரம் நடுதல் + குளிர் கூரைகள்' : 'Tree planting + cool roofs';
  };

  const handleCreateProject = () => {
    setProjectCreated(true);
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('planner_budget')}
          id="btn-back-to-budget-step"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Budget"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
            {language === 'ta' ? 'இறுதி நிலை: திட்ட உருவாக்கம்' : 'Decision Output'}
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {language === 'ta' ? 'இம்முடிவை திட்டமாக மாற்றுவது எப்படி?' : 'How do we turn this decision into a project?'}
          </h1>
        </div>
      </div>

      {projectCreated ? (
        /* SUCCESS CONFIRMATION */
        <div className="p-6 rounded-3xl bg-stone-900/95 border border-emerald-500/40 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {language === 'ta' ? 'திட்டம் உருவாக்கப்பட்டது' : 'Project created'}
            </h2>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-xs font-mono">
              <span className="text-stone-400">{language === 'ta' ? 'நிலை:' : 'Status:'}</span>
              <strong className="text-emerald-400 font-bold">{language === 'ta' ? 'திட்டமிடப்பட்டது' : 'Planned'}</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-400">{language === 'ta' ? 'இடம்:' : 'Location:'}</span>
              <span className="font-bold text-white">{selectedHotspot.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{language === 'ta' ? 'பணி:' : 'Work:'}</span>
              <span className="font-semibold text-white">{getStrategyName()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{language === 'ta' ? 'செலவு:' : 'Cost:'}</span>
              <span className="font-mono text-emerald-400 font-bold">₹{budgetLakhs.toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{language === 'ta' ? 'திட்ட எண்:' : 'Reference:'}</span>
              <span className="font-mono text-stone-400">PROJ-GCC-2026-088</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setProjectCreated(false);
                setActiveScreen('citizen_projects');
              }}
              id="btn-view-in-projects-list"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-all active:scale-98"
            >
              {language === 'ta' ? 'திட்டங்களின் பட்டியலில் பார்க்க' : 'View in projects list'}
            </button>
            <button
              onClick={() => {
                setProjectCreated(false);
                setActiveScreen('planner_dashboard');
              }}
              id="btn-back-to-planner-home"
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs transition-all"
            >
              {language === 'ta' ? 'முகப்புக்கு திரும்புக' : 'Back to Planner Home'}
            </button>
          </div>
        </div>
      ) : (
        /* CLEAN IMPLEMENTATION BRIEF */
        <div className="space-y-4">
          <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-4">
            {/* Target Area */}
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {language === 'ta' ? selectedHotspot.nameTa : selectedHotspot.name}
              </h2>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                {language === 'ta' ? 'குளிர்ச்சித் திட்டம்' : 'Cooling project'}
              </span>
              <p className="text-sm font-semibold text-stone-200 mt-1">
                {getStrategyName()}
              </p>
            </div>

            {/* Estimated cost + Timeline */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-800/80">
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
                  {language === 'ta' ? 'மதிப்பிடப்பட்ட செலவு' : 'Estimated cost'}
                </span>
                <span className="text-lg font-black text-white font-mono mt-0.5 block">
                  ₹{budgetLakhs.toFixed(1)}L
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
                  {language === 'ta' ? 'கால அவகாசம்' : 'Timeline'}
                </span>
                <span className="text-lg font-black text-white font-mono mt-0.5 block">
                  60 days
                </span>
              </div>
            </div>

            {/* Responsible authority */}
            <div className="pt-2 border-t border-stone-800/80">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block">
                {language === 'ta' ? 'பொறுப்பு துறை' : 'Responsible authority'}
              </span>
              <p className="text-xs font-bold text-stone-200 mt-0.5">
                {language === 'ta' ? 'நகராட்சி பொறியியல் துறை (Greater Chennai Corporation)' : 'Municipal Department (Greater Chennai Corporation)'}
              </p>
            </div>

            {/* Plan */}
            <div className="pt-2 border-t border-stone-800/80 space-y-1">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                {language === 'ta' ? 'செயல் திட்டம்' : 'Plan'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'ta' 
                  ? 'வெப்ப அபாய பகுப்பாய்வு மற்றும் இடஞ்சார்ந்த சாத்தியக்கூறுகள் மூலம் தேர்ந்தெடுக்கப்பட்ட இடங்கள்.'
                  : 'Candidate locations identified through hotspot and spatial-feasibility analysis.'}
              </p>
            </div>

            {/* Maintenance */}
            <div className="pt-2 border-t border-stone-800/80 space-y-1">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                {language === 'ta' ? 'பராமரிப்பு முறை' : 'Maintenance'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'ta'
                  ? 'நீர் ஊற்றுதல் மற்றும் வாரந்தோறும் வழக்கமான கண்காணிப்பு.'
                  : 'Watering and periodic monitoring.'}
              </p>
            </div>
          </section>

          {/* PRIMARY ACTION: Create project */}
          <div className="pt-1">
            <button
              onClick={handleCreateProject}
              id="btn-create-project-submit"
              className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 active:scale-98 transition-all"
            >
              <FileCheck className="w-5 h-5 text-stone-950" />
              <span>{language === 'ta' ? 'திட்டத்தை உருவாக்கு' : 'Create project'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
