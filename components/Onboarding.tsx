
import React, { useState, useEffect } from 'react';
import { Language, UserProfile } from '../types';

interface OnboardingProps {
  initialProfile: UserProfile;
  mode: 'full' | 'quiz-only';
  onComplete: (profile: Partial<UserProfile>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ initialProfile, mode, onComplete }) => {
  // If mode is quiz-only, start at 'quiz', else start at 'lang'
  const [step, setStep] = useState<'lang' | 'name' | 'quiz'>(mode === 'quiz-only' ? 'quiz' : 'lang');
  
  const [language, setLanguage] = useState<Language>(initialProfile.language || Language.SINHALA);
  const [name, setName] = useState(initialProfile.name || '');
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // If initial profile has language, respect it for UI
  const isSi = language === Language.SINHALA;

  // Update local state if initialProfile changes (e.g. returning user data loaded)
  useEffect(() => {
    if (initialProfile.language) setLanguage(initialProfile.language);
    if (initialProfile.name) setName(initialProfile.name);
  }, [initialProfile]);

  // 8 Questions
  // Scoring: 0 (Poor) to 3 (Good)
  const questions = [
    {
      id: 1,
      si: "අද ඔබට දැනෙන්නේ කෙසේද?",
      en: "How is your overall mood today?",
      options: [
        { val: 0, si: "ඉතා නරකයි", en: "Very low/Sad" },
        { val: 1, si: "ටිකක් නරකයි", en: "A bit down" },
        { val: 2, si: "සාමාන්‍යයි", en: "Okay/Neutral" },
        { val: 3, si: "ඉතා හොඳයි", en: "Great/Happy" }
      ]
    },
    {
      id: 2,
      si: "පසුගිය රාත්‍රියේ නින්ද කෙසේද?",
      en: "How was your sleep last night?",
      options: [
        { val: 0, si: "නින්ද ගියේ නැත", en: "Terrible/Insomnia" },
        { val: 1, si: "කඩින් කඩ නින්ද ගියේය", en: "Restless" },
        { val: 2, si: "හොඳයි", en: "Good" },
        { val: 3, si: "සුවබර නින්දක් ලැබුනා", en: "Deep & Restful" }
      ]
    },
    {
      id: 3,
      si: "ඔබට නිතරම කනස්සල්ලක් දැනේද?",
      en: "Do you feel anxious or worried often?",
      options: [
        { val: 0, si: "සෑම විටම", en: "Constantly" },
        { val: 1, si: "බොහෝ විට", en: "Often" },
        { val: 2, si: "ඉඳහිට", en: "Sometimes" },
        { val: 3, si: "කලාතුරකින්", en: "Rarely/Never" }
      ]
    },
    {
      id: 4,
      si: "වැඩ කිරීමට ඇති උනන්දුව කෙසේද?",
      en: "How is your motivation to do things?",
      options: [
        { val: 0, si: "කිසිම උනන්දුවක් නැත", en: "No motivation" },
        { val: 1, si: "අඩුයි", en: "Low" },
        { val: 2, si: "සාමාන්‍යයි", en: "Moderate" },
        { val: 3, si: "ඉතා උනන්දුවෙන් සිටිමි", en: "High/Energetic" }
      ]
    },
    {
      id: 5,
      si: "ඔබට තනිව සිටීමට අවශ්‍යද?",
      en: "How social do you feel?",
      options: [
        { val: 0, si: "කිසිවෙක් හමුවීමට අකමැතියි", en: "Want to isolate completely" },
        { val: 1, si: "හුදකලාව ප්‍රිය කරමි", en: "Prefer being alone" },
        { val: 2, si: "මිතුරන් සමඟ කතා කරමි", en: "Socializing a bit" },
        { val: 3, si: "සමාජශීලීව සිටිමි", en: "Very social" }
      ]
    },
    {
      id: 6,
      si: "ඔබට පහසුවෙන් අවධානය යොමු කළ හැකිද?",
      en: "Can you focus easily?",
      options: [
        { val: 0, si: "කොහෙත්ම බැහැ", en: "Not at all" },
        { val: 1, si: "අමාරුයි", en: "With difficulty" },
        { val: 2, si: "පුළුවන්", en: "Mostly yes" },
        { val: 3, si: "ඉතා හොඳ අවධානයක් ඇත", en: "Sharp focus" }
      ]
    },
    {
      id: 7,
      si: "ආහාර රුචිය කෙසේද?",
      en: "How is your appetite?",
      options: [
        { val: 0, si: "කෑම එපා වී ඇත/වැඩියි", en: "Too low/Too high" },
        { val: 1, si: "වෙනස් වී ඇත", en: "Somewhat changed" },
        { val: 2, si: "සාමාන්‍යයි", en: "Normal" },
        { val: 3, si: "සෞඛ්‍ය සම්පන්නයි", en: "Healthy" }
      ]
    },
    {
      id: 8,
      si: "හෙට දවස ගැන බලාපොරොත්තුවක් තිබේද?",
      en: "Do you feel hopeful about tomorrow?",
      options: [
        { val: 0, si: "නැත, අඳුරුයි", en: "No, feels hopeless" },
        { val: 1, si: "සුළු බලාපොරොත්තුවක් ඇත", en: "A little" },
        { val: 2, si: "ඔව්", en: "Yes, mostly" },
        { val: 3, si: "ඉතා හොඳ බලාපොරොත්තුවක් ඇත", en: "Very hopeful" }
      ]
    }
  ];

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setStep('name');
  };

  const handleNameSubmit = () => {
    if (name.trim()) setStep('quiz');
  };

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);

    if (quizIndex < questions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers: number[]) => {
    const sum = finalAnswers.reduce((a, b) => a + b, 0);
    const max = questions.length * 3;
    const percentage = Math.round((sum / max) * 100);

    onComplete({
      name: name.trim(),
      language: language,
      wellnessScore: percentage,
      lastQuizDate: new Date().toISOString()
    });
  };

  const handleBack = () => {
    if (step === 'name') {
      setStep('lang');
    } else if (step === 'quiz') {
      // If quiz-only mode, user shouldn't go back to name, maybe just logout (handled by parent?)
      // But if full mode, go back to name.
      if (mode === 'full') {
        setStep('name');
        setQuizIndex(0);
        setAnswers([]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-neutral-100 p-4 font-sans text-neutral-900">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 animate-fade-in relative overflow-hidden">
        
        {/* Back Button */}
        {step !== 'lang' && mode === 'full' && (
          <button 
            onClick={handleBack}
            className="absolute top-6 left-6 p-2 text-neutral-400 hover:text-black hover:bg-black/5 rounded-full transition-all"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-bl-full opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-100 rounded-tr-full opacity-50 -z-10"></div>

        {/* Step 1: Language Selection */}
        {step === 'lang' && (
          <div className="text-center space-y-8 animate-fade-in">
             <div className="w-20 h-20 bg-brand-600 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-brand-200 transform rotate-6 mb-6">
                <span className="text-3xl font-black">S</span>
             </div>
             <div>
               <h1 className="text-3xl font-bold text-black mb-2">Welcome to STANDAPP</h1>
               <p className="text-neutral-600">Select your preferred language to begin.<br/>කරුණාකර ඔබගේ භාෂාව තෝරන්න.</p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button 
                 onClick={() => handleLangSelect(Language.ENGLISH)}
                 className="p-6 rounded-2xl border-2 border-neutral-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
               >
                 <span className="text-2xl block mb-2">🇬🇧</span>
                 <span className="font-bold text-black group-hover:text-brand-700">English</span>
               </button>
               <button 
                 onClick={() => handleLangSelect(Language.SINHALA)}
                 className="p-6 rounded-2xl border-2 border-neutral-100 hover:border-brand-500 hover:bg-brand-50 transition-all group"
               >
                 <span className="text-2xl block mb-2">🇱🇰</span>
                 <span className="font-bold text-black group-hover:text-brand-700">සිංහල</span>
               </button>
             </div>
          </div>
        )}

        {/* Step 2: Name Input */}
        {step === 'name' && (
          <div className="text-center space-y-8 animate-fade-in pt-6">
             <h2 className="text-2xl font-bold text-black">
               {isSi ? 'අපි ඔබව අමතන්නේ කෙසේද?' : 'What should we call you?'}
             </h2>
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder={isSi ? 'ඔබේ නම ඇතුළත් කරන්න...' : 'Enter your name...'}
               className="w-full text-center text-xl p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-brand-400 focus:border-brand-500 outline-none transition text-black placeholder-neutral-400"
               onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
             />
             <button
               onClick={handleNameSubmit}
               disabled={!name.trim()}
               className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-200"
             >
               {isSi ? 'ඉදිරියට යන්න' : 'Continue'}
             </button>
          </div>
        )}

        {/* Step 3: Quiz */}
        {step === 'quiz' && (
          <div className="animate-fade-in pt-6">
             <div className="flex justify-between items-center mb-8">
               <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
                 {mode === 'quiz-only' && isSi ? 'දෛනික මානසික සුවතා පරීක්ෂණය' : mode === 'quiz-only' ? 'Daily Wellness Check' : isSi ? 'මානසික සුවතා පරීක්ෂණය' : 'Wellness Check'}
               </span>
               <span className="text-xs font-bold text-neutral-400">
                 {quizIndex + 1} / {questions.length}
               </span>
             </div>
             
             {mode === 'quiz-only' && quizIndex === 0 && (
                <div className="mb-6 p-4 bg-brand-50 rounded-xl text-center text-brand-700 font-medium text-sm">
                  {isSi ? `ආයුබෝවන් ${name}! අද දවස පටන් ගමු.` : `Welcome back, ${name}! Let's check in for today.`}
                </div>
             )}

             <div className="mb-8">
               <h3 className="text-xl font-bold text-black leading-relaxed mb-6">
                 {isSi ? questions[quizIndex].si : questions[quizIndex].en}
               </h3>
               
               <div className="space-y-3">
                 {questions[quizIndex].options.map((opt, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(opt.val)}
                     className="w-full text-left p-4 rounded-xl bg-neutral-50 hover:bg-brand-500 hover:text-white border border-neutral-100 transition-all duration-200 group"
                   >
                     <span className="font-medium text-black group-hover:text-white">{isSi ? opt.si : opt.en}</span>
                   </button>
                 ))}
               </div>
             </div>
             
             <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
               <div 
                 className="bg-brand-500 h-full transition-all duration-500" 
                 style={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }}
               ></div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Onboarding;
