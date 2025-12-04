
import React, { useState } from 'react';
import { generateAddictionPlan } from '../services/geminiService';
import { AddictionPlan, Language } from '../types';

interface AddictionToolProps {
  language: Language;
}

const ADDICTIONS = [
  { id: 'porn', labelEn: 'Pornography', labelSi: 'අසැබි දර්ශන (Pornography)' },
  { id: 'masturbation', labelEn: 'Masturbation', labelSi: 'ස්වයංවින්දනය (Masturbation)' },
  { id: 'alcohol', labelEn: 'Alcohol', labelSi: 'මද්‍යසාර (Alcohol)' },
  { id: 'smoking', labelEn: 'Smoking', labelSi: 'දුම්පානය (Smoking)' },
  { id: 'weed', labelEn: 'Weed/Cannabis', labelSi: 'ගංජා (Weed)' },
  { id: 'heroin', labelEn: 'Heroin', labelSi: 'හෙරොයින් (Heroin)' },
  { id: 'meth', labelEn: 'Methamphetamine', labelSi: 'මෙතම්ෆෙටමින් (Meth/Ice)' },
];

const AddictionTool: React.FC<AddictionToolProps> = ({ language }) => {
  const [selectedAddiction, setSelectedAddiction] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AddictionPlan | null>(null);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  const isSi = language === Language.SINHALA;

  const handleGenerate = async () => {
    if (!selectedAddiction) return;
    setLoading(true);
    setPlan(null); // Clear previous
    setActiveWeekIndex(0);
    try {
      const jsonStr = await generateAddictionPlan(selectedAddiction, language);
      const data = JSON.parse(jsonStr);
      setPlan(data);
    } catch (e) {
      alert(isSi ? "සැලැස්ම සකස් කිරීමේදී ගැටළුවක් ඇති විය." : "Error generating plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextWeek = () => {
    if (plan && activeWeekIndex < plan.weeks.length - 1) {
      setActiveWeekIndex(prev => prev + 1);
    }
  };

  const prevWeek = () => {
    if (activeWeekIndex > 0) {
      setActiveWeekIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 lg:p-10 overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-neutral-900">
            {isSi ? 'ඇබ්බැහිවීම් පාලනය' : 'Addiction Recovery'}
        </h2>
        {plan && (
             <button 
              onClick={() => { setPlan(null); setSelectedAddiction(''); setActiveWeekIndex(0); }}
              className="px-4 py-2 text-sm text-neutral-500 hover:text-brand-600 bg-white/50 rounded-xl transition font-medium"
            >
              {isSi ? 'නව සැලැස්මක්' : 'Start Over'}
            </button>
        )}
      </div>
      
      {!plan && <p className="text-neutral-600 font-medium mb-8">
        {isSi ? 'දින 30 කින් ඔබේ ජීවිතය වෙනස් කරගන්න. පහතින් තෝරන්න.' : 'Reclaim your life with a 30-Day Recovery Plan.'}
      </p>}

      {!plan && (
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-sm border border-white/50 max-w-3xl mx-auto mt-4 animate-fade-in">
          <label className="block text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
            {isSi ? 'ඔබට ජය ගැනීමට අවශ්‍ය දේ තෝරන්න' : 'Select category to overcome'}
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {ADDICTIONS.map((addiction) => (
              <button
                key={addiction.id}
                onClick={() => setSelectedAddiction(addiction.labelEn)}
                className={`p-4 rounded-xl border text-left transition-all font-medium ${
                  selectedAddiction === addiction.labelEn
                    ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-brand-300'
                }`}
              >
                {isSi ? addiction.labelSi : addiction.labelEn}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !selectedAddiction}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-200"
          >
            {loading 
              ? (isSi ? 'සකසමින් පවතී...' : 'Generating 30-Day Plan...') 
              : (isSi ? 'දින 30 සැලැස්ම සාදන්න' : 'Generate 30-Day Plan')}
          </button>
        </div>
      )}

      {plan && (
        <div className="animate-fade-in space-y-6 pb-10 flex flex-col items-center">
            {/* Title Section */}
            <div className="text-center mb-4">
                 <h3 className="text-2xl font-bold text-neutral-900 bg-white/60 px-6 py-2 rounded-full inline-block backdrop-blur-md shadow-sm border border-white/40">{plan.title}</h3>
            </div>

            {/* Stepper Progress */}
            <div className="flex gap-2 mb-4">
                {plan.weeks.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-2 w-12 rounded-full transition-all duration-300 ${idx === activeWeekIndex ? 'bg-brand-600 scale-110' : idx < activeWeekIndex ? 'bg-brand-300' : 'bg-neutral-200'}`}
                    ></div>
                ))}
            </div>

            {/* Active Card */}
            <div className="w-full max-w-2xl perspective-1000">
                {plan.weeks.map((week, idx) => {
                    if (idx !== activeWeekIndex) return null;
                    return (
                        <div key={week.weekNumber} className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/60 animate-fade-in relative overflow-hidden transition-all duration-500">
                             {/* Decorative Number */}
                             <div className="absolute -right-6 -top-6 text-9xl font-black text-neutral-100 select-none z-0">
                                {week.weekNumber}
                             </div>

                             <div className="relative z-10">
                                <span className="bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider mb-4 inline-block">
                                    {isSi ? `සතිය ${week.weekNumber}` : `Week ${week.weekNumber}`}
                                </span>
                                <h4 className="font-bold text-neutral-800 text-2xl mb-6">{week.focus}</h4>
                                <ul className="space-y-4">
                                {week.tasks.map((task, tIdx) => (
                                    <li key={tIdx} className="flex items-start gap-4 text-neutral-800 bg-neutral-50/80 p-4 rounded-xl border border-neutral-100 hover:border-brand-200 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                        {tIdx + 1}
                                    </div>
                                    <span className="leading-relaxed font-medium">{task}</span>
                                    </li>
                                ))}
                                </ul>
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
                <button 
                    onClick={prevWeek}
                    disabled={activeWeekIndex === 0}
                    className="px-6 py-3 rounded-xl bg-white/80 hover:bg-white text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition shadow-sm border border-neutral-200"
                >
                    {isSi ? 'පෙර' : 'Previous'}
                </button>
                <button 
                    onClick={nextWeek}
                    disabled={activeWeekIndex === plan.weeks.length - 1}
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-30 disabled:cursor-not-allowed font-bold transition shadow-lg shadow-brand-200"
                >
                    {isSi ? 'ඊළඟ' : 'Next'}
                </button>
            </div>
          
          <div className="w-full max-w-2xl bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 mt-8 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-xl">⚠️</span>
            <div className="text-xs text-red-800 leading-relaxed">
              <strong className="block mb-1">{isSi ? 'වෛද්‍ය උපදෙස්:' : 'Medical Disclaimer:'}</strong>
              {isSi 
                ? 'මත්ද්‍රව්‍ය (Heroin, Meth) වැනි දරුණු ඇබ්බැහිවීම් සඳහා වෛද්‍ය ප්‍රතිකාර අත්‍යවශ්‍ය විය හැක. මෙම සැලැස්ම මනෝවිද්‍යාත්මක සහාය සඳහා පමණි.' 
                : 'For substance addictions like Heroin or Meth, medical detoxification is often required. This plan is a psychological aid, not a medical treatment.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddictionTool;
