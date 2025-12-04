import React from 'react';

const Resources: React.FC = () => {
  return (
    <div className="p-4 lg:p-10 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">හදිසි අවස්ථා සම්පත්</h2>
      
      <div className="bg-accent-50/90 backdrop-blur-md border border-accent-100 rounded-3xl p-8 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent-100 rounded-full opacity-50 blur-2xl"></div>
        
        <h3 className="text-2xl font-bold text-accent-600 mb-3 relative z-10">ක්ෂණික සහාය</h3>
        <p className="text-accent-700/80 mb-6 font-medium relative z-10 max-w-lg">ඔබ හෝ ඔබ දන්නා අයෙක් අනතුරක සිටී නම්, වහාම හදිසි ඇමතුම් අංශ අමතන්න (ශ්‍රී ලංකාවේ 1990 හෝ 119).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/80 p-4 rounded-2xl border border-accent-100 flex items-center gap-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 font-bold text-lg">📞</div>
                <div>
                    <div className="font-bold text-accent-700 text-xl">1926</div>
                    <div className="text-xs text-accent-600/70 font-medium uppercase tracking-wide">ජාතික මානසික සෞඛ්‍ය</div>
                </div>
            </div>
             <div className="bg-white/80 p-4 rounded-2xl border border-accent-100 flex items-center gap-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 font-bold text-lg">📞</div>
                <div>
                    <div className="font-bold text-accent-700 text-xl">1333</div>
                    <div className="text-xs text-accent-600/70 font-medium uppercase tracking-wide">CCCline උපදේශනය</div>
                </div>
            </div>
             <div className="bg-white/80 p-4 rounded-2xl border border-accent-100 flex items-center gap-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 font-bold text-lg">📞</div>
                <div>
                    <div className="font-bold text-accent-700 text-xl">0112696666</div>
                    <div className="text-xs text-accent-600/70 font-medium uppercase tracking-wide">සුමිත්‍රයෝ</div>
                </div>
            </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-neutral-800 mb-6 px-2">අධ්‍යාපනික සම්පත් (ඉංග්‍රීසි)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="https://www.nimh.nih.gov/" target="_blank" rel="noreferrer" className="block p-6 bg-white/80 backdrop-blur-md border border-neutral-100 rounded-3xl hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition group">
          <div className="flex justify-between items-start">
             <h4 className="font-bold text-neutral-900 group-hover:text-brand-600 transition">NIMH</h4>
             <span className="text-neutral-300 group-hover:text-brand-400">↗</span>
          </div>
          <p className="text-sm text-neutral-500 mt-2 font-medium">ජාතික මානසික සෞඛ්‍ය ආයතනය</p>
        </a>
        <a href="https://adaa.org/" target="_blank" rel="noreferrer" className="block p-6 bg-white/80 backdrop-blur-md border border-neutral-100 rounded-3xl hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition group">
          <div className="flex justify-between items-start">
             <h4 className="font-bold text-neutral-900 group-hover:text-brand-600 transition">ADAA</h4>
             <span className="text-neutral-300 group-hover:text-brand-400">↗</span>
          </div>
          <p className="text-sm text-neutral-500 mt-2 font-medium">Anxiety & Depression Association of America</p>
        </a>
      </div>
    </div>
  );
};

export default Resources;