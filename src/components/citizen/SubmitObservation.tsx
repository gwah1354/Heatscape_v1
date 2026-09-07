import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Camera, 
  MapPin, 
  Trees, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  Check
} from 'lucide-react';

export const SubmitObservation: React.FC = () => {
  const { 
    selectedProject, 
    addObservation, 
    setActiveScreen, 
    language 
  } = useApp();

  const issueOptions = [
    { 
      id: 'Tree needs maintenance', 
      label: 'Tree needs maintenance', 
      labelTa: 'மரத்திற்கு பராமரிப்பு தேவை',
      icon: Trees
    },
    { 
      id: 'Cooling structure damaged', 
      label: 'Cooling structure damaged', 
      labelTa: 'நிழல் அமைப்பு சேதமடைந்துள்ளது',
      icon: AlertTriangle
    },
    { 
      id: 'Project looks incomplete', 
      label: 'Project looks incomplete', 
      labelTa: 'பணி முழுமையடையாமல் உள்ளது',
      icon: Clock
    },
    { 
      id: 'Other', 
      label: 'Other', 
      labelTa: 'மற்றவை',
      icon: HelpCircle
    },
  ];

  const [selectedIssue, setSelectedIssue] = useState(issueOptions[0].id);
  const [locationName, setLocationName] = useState(
    selectedProject ? selectedProject.location : 'Anna Nagar, Chennai'
  );
  const [hasPhoto, setHasPhoto] = useState(false);
  const [notes, setNotes] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedObj = issueOptions.find(o => o.id === selectedIssue);
    const newId = addObservation({
      type: selectedIssue,
      typeTa: selectedObj?.labelTa || selectedIssue,
      description: notes.trim() || selectedIssue,
      locationName: locationName,
      projectId: selectedProject?.id,
      photoName: hasPhoto ? 'neighborhood_photo.jpg' : undefined,
    });

    setSubmittedId(newId || 'OBS-8821');
  };

  return (
    <div className="space-y-4 pb-28 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveScreen('citizen_home')}
          id="btn-back-from-report-screen"
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-all active:scale-95"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {language === 'ta' ? 'பிரச்சினையைப் பதிவு செய்' : 'Report a problem'}
          </h1>
          <p className="text-xs text-stone-400">
            {language === 'ta' 
              ? 'உங்கள் பகுதியில் கவனித்த குறையை மாநகராட்சிக்கு தெரிவியுங்கள்' 
              : 'Notice something in your neighborhood? Let the city know.'}
          </p>
        </div>
      </div>

      {submittedId ? (
        /* AFTER SUBMISSION SCREEN */
        <div className="p-6 rounded-3xl bg-stone-900/95 border border-emerald-500/40 shadow-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {language === 'ta' ? 'புகார் பெறப்பட்டது' : 'Report submitted'}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {language === 'ta' 
                ? 'உங்கள் தகவல் நகராட்சி பராமரிப்புப் பிரிவுக்கு அனுப்பப்பட்டுள்ளது.' 
                : 'Your report has been received for municipal follow-up.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-mono block">
              {language === 'ta' ? 'குறிப்பு எண்' : 'Reference'}
            </span>
            <span className="text-lg font-black text-emerald-400 font-mono block">
              {submittedId}
            </span>
            <span className="text-[10px] text-stone-400 block pt-1">
              (Illustrative Chennai civic demo)
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setSubmittedId(null);
                setActiveScreen('citizen_home');
              }}
              id="btn-report-back-home"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-all active:scale-98"
            >
              {language === 'ta' ? 'முகப்புக்கு திரும்புக' : 'Back to Home'}
            </button>
          </div>
        </div>
      ) : (
        /* REPORT FORM */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question 1: What did you notice? */}
          <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-3">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              {language === 'ta' ? '1. என்ன கவனித்தீர்கள்?' : '1. What did you notice?'}
            </label>

            <div className="space-y-2">
              {issueOptions.map((opt) => {
                const isSelected = selectedIssue === opt.id;
                const Icon = opt.icon;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedIssue(opt.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-stone-400'}`} />
                      <span className="text-xs">
                        {language === 'ta' ? opt.labelTa : opt.label}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Question 2: Where? */}
          <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              {language === 'ta' ? '2. எங்கே?' : '2. Where?'}
            </label>

            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Locality, landmark, or street..."
                className="w-full pl-10 pr-3 py-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            <span className="text-[10px] text-stone-400 block pl-1">
              {language === 'ta' ? 'தானாகவே கண்டறியப்பட்ட இடம் (தேவைப்பட்டால் மாற்றலாம்)' : 'Automatically detected (edit if necessary)'}
            </span>
          </section>

          {/* Question 3: Photo (Optional) */}
          <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              {language === 'ta' ? '3. புகைப்படம் (விருப்பப்பட்டால்)' : '3. Photo (Optional)'}
            </label>

            <button
              type="button"
              onClick={() => setHasPhoto(!hasPhoto)}
              className={`w-full py-3.5 px-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                hasPhoto
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>
                {hasPhoto 
                  ? (language === 'ta' ? '✓ புகைப்படம் சேர்க்கப்பட்டது' : '✓ Photo attached') 
                  : (language === 'ta' ? 'புகைப்படம் இணைக்க தட்டவும்' : 'Tap to attach photo')}
              </span>
            </button>
          </section>

          {/* Question 4: Anything else? (Optional) */}
          <section className="p-5 rounded-3xl bg-stone-900/95 border border-stone-800 shadow-xl space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              {language === 'ta' ? '4. கூடுதல் தகவல் (விருப்பப்பட்டால்)' : '4. Anything else? (Optional)'}
            </label>

            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'ta' ? 'சுருக்கமான விளக்கம்...' : 'Short description...'}
              className="w-full p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </section>

          {/* Huge Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="btn-submit-citizen-report"
              className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 active:scale-98 transition-all"
            >
              <span>{language === 'ta' ? 'புகாரைச் சமர்ப்பி' : 'Submit report'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
