import React, { useState } from 'react';
import { generatePhobiaHierarchy } from '../services/geminiService';
import { PhobiaScenario } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PhobiaTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<PhobiaScenario | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const jsonStr = await generatePhobiaHierarchy(input);
      const data = JSON.parse(jsonStr);
      setScenario(data);
    } catch (e) {
      alert("සැලැස්ම සකස් කිරීමේදී ගැටළුවක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 lg:p-10 overflow-y-auto">
      <h2 className="text-3xl font-bold text-neutral-900 mb-2">භීතින් ජයගැනීමේ සහකරු</h2>
      <p className="text-neutral-600 font-medium mb-8">Systematic Desensitization ක්‍රමය භාවිතා කරමින් පියවරෙන් පියවර ඉදිරියට යමු.</p>
      
      {!scenario && (
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white/50 text-center max-w-3xl mx-auto mt-8">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-brand-500">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
             </svg>
          </div>
          <p className="text-xl text-neutral-700 font-medium mb-8">
            ඔබට ජය ගැනීමට අවශ්‍ය භීතියක් හඳුනා ගන්න.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="උදා: මකුළුවන්, උස ස්ථාන, ප්‍රසිද්ධියේ කතා කිරීම"
              className="w-full sm:w-96 px-6 py-4 rounded-2xl border border-neutral-200 bg-white/80 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-lg backdrop-blur-sm text-neutral-900 placeholder-neutral-500"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !input}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-200 whitespace-nowrap"
            >
              {loading ? 'විශ්ලේෂණය...' : 'සැලැස්ම සාදන්න'}
            </button>
          </div>
        </div>
      )}

      {scenario && (
        <div className="animate-fade-in space-y-8 pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
            <div>
                 <h3 className="text-2xl font-bold text-neutral-900">{scenario.title}</h3>
                 <p className="text-brand-600 text-sm font-medium mt-1">පුද්ගලීකරණය කළ නිරාවරණය සැලැස්ම</p>
            </div>
            <button 
              onClick={() => { setScenario(null); setInput(''); }}
              className="px-4 py-2 text-sm text-neutral-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition font-medium"
            >
              නව සැලැස්මක්
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visualization Column */}
            <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 h-96 flex flex-col">
                 <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">තීව්‍රතාවය</h4>
                 <div className="flex-1">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scenario.steps} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                           <XAxis dataKey="level" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                           <YAxis hide />
                           <Tooltip 
                              cursor={{fill: 'transparent'}}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: '#1e293b', color: '#fff' }}
                              itemStyle={{ color: '#fff' }}
                           />
                           <Bar dataKey="level" radius={[6, 6, 6, 6]} barSize={32}>
                              {scenario.steps.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${0.4 + (index * 0.15)})`} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                 </div>
            </div>

            {/* Steps Column */}
            <div className="lg:col-span-2 space-y-4">
                 {scenario.steps.map((step) => (
                   <div key={step.level} className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:border-brand-200 hover:shadow-md transition-all group">
                     <div className="flex items-center justify-between mb-3">
                        <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-brand-100 transition-colors">පියවර {step.level}</span>
                     </div>
                     <p className="text-lg text-neutral-800 font-semibold mb-4 leading-relaxed">{step.description}</p>
                     <div className="bg-neutral-50 p-4 rounded-2xl flex items-start gap-3">
                        <span className="text-lg">💡</span>
                        <p className="text-sm text-neutral-600 leading-relaxed pt-0.5">
                          {step.copingTip}
                        </p>
                     </div>
                   </div>
                 ))}
            </div>
          </div>
          
          <div className="bg-brand-50/80 backdrop-blur-sm border border-brand-100 p-4 rounded-2xl text-center text-sm text-brand-800 font-medium">
            සටහන: මෙය AI මගින් ජනනය කරන ලද මාර්ගෝපදේශයකි. සෙමින් පුහුණු වන්න. අපහසුතාවයක් දැනේ නම් නවත්වන්න.
          </div>
        </div>
      )}
    </div>
  );
};

export default PhobiaTool;
