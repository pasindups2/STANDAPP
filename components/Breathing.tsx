import React, { useState, useEffect } from 'react';

const Breathing: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [phaseText, setPhaseText] = useState('හුස්ම ගන්න'); 
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    let isMounted = true;
    
    const cycle = async () => {
      if (!isMounted) return;
      // Inhale (4s)
      setPhase('Inhale');
      setPhaseText('හුස්ම ගන්න');
      setSeconds(4);
      await new Promise(r => setTimeout(r, 4000));
      
      if (!isMounted) return;
      // Hold (4s)
      setPhase('Hold');
      setPhaseText('රඳවා ගන්න');
      setSeconds(4);
      await new Promise(r => setTimeout(r, 4000));
      
      if (!isMounted) return;
      // Exhale (4s)
      setPhase('Exhale');
      setPhaseText('පිට කරන්න');
      setSeconds(4);
      await new Promise(r => setTimeout(r, 4000));

      if (!isMounted) return;
      // Hold (4s)
      setPhase('Hold');
      setPhaseText('රඳවා ගන්න');
      setSeconds(4);
      await new Promise(r => setTimeout(r, 4000));
      
      if (isMounted) {
        cycle(); // Loop
      }
    };

    cycle();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-neutral-800">
      <h2 className="text-3xl font-bold text-neutral-900 mb-12 tracking-tight">කොටු හුස්ම ගැනීමේ ක්‍රමය (Box Breathing)</h2>
      
      <div className="relative flex items-center justify-center">
        {/* Outer Rings Animation */}
        <div className={`
          w-80 h-80 rounded-full border-2 border-brand-200 absolute opacity-30
          transition-all duration-[4000ms] ease-in-out
          ${phase === 'Inhale' ? 'scale-125' : 'scale-90'}
        `}></div>
         <div className={`
          w-72 h-72 rounded-full border border-brand-300 absolute opacity-40
          transition-all duration-[4000ms] ease-in-out delay-75
          ${phase === 'Inhale' ? 'scale-110' : 'scale-95'}
        `}></div>
        
        {/* Glow */}
        <div className={`
          w-64 h-64 rounded-full bg-brand-400 blur-2xl absolute
          transition-all duration-[4000ms] ease-in-out
          ${phase === 'Inhale' ? 'scale-110 opacity-40' : phase === 'Exhale' ? 'scale-75 opacity-10' : 'scale-100 opacity-20'}
        `}></div>
        
        {/* Main Circle */}
        <div className={`
          w-64 h-64 rounded-full bg-gradient-to-br from-brand-400 to-brand-600
          flex items-center justify-center shadow-2xl shadow-brand-200 z-10
          transition-all duration-[4000ms] ease-in-out
          ${phase === 'Inhale' ? 'scale-110' : phase === 'Exhale' ? 'scale-90' : 'scale-100'}
        `}>
          <div className="text-center text-white">
            <div className="text-4xl font-bold tracking-wider mb-2 drop-shadow-md">{phaseText}</div>
            <div className="text-brand-100 text-sm font-medium tracking-wide">සන්සුන් වන්න</div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-md text-center bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50">
        <p className="text-neutral-600 font-medium leading-relaxed">මෙම ක්‍රමය ස්නායු පද්ධතිය සන්සුන් කිරීමට සහ ආතතිය ක්ෂණිකව අඩු කිරීමට උපකාරී වේ.</p>
      </div>
    </div>
  );
};

export default Breathing;