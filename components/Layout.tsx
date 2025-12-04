
import React, { ReactNode, useState } from 'react';
import { AppMode, UserProfile, Language, Theme } from '../types';
import Settings from './Settings';
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  userProfile: UserProfile;
  onEditProfile: () => void;
  onLogout?: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, currentMode, setMode, userProfile, onEditProfile, onLogout, onUpdateProfile 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isSinhala = userProfile.language === Language.SINHALA;

  const navItems = [
    { mode: AppMode.CHAT, label: isSinhala ? 'සංවාදය' : 'Chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { mode: AppMode.PHOBIA_COACH, label: isSinhala ? 'භීතින්' : 'Phobia', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { mode: AppMode.ADDICTIONS, label: isSinhala ? 'ඇබ්බැහිවීම්' : 'Addictions', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
    { mode: AppMode.BREATHING, label: isSinhala ? 'හුස්ම' : 'Breath', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { mode: AppMode.GAME, label: isSinhala ? 'ක්‍රීඩා' : 'Games', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' },
    { mode: AppMode.RESOURCES, label: isSinhala ? 'සම්පත්' : 'Help', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  const handleModeChange = (m: AppMode) => {
    setMode(m);
    setMobileMenuOpen(false);
  };

  // High-End Wallpapers
  const bgImage = userProfile.theme === Theme.DARK
    ? "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop')" // Deep starry night
    : "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')"; // Colorful

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-brand-500';
    return 'text-accent-500';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-neutral-800 font-sans transition-colors duration-500">
      
      {/* BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-1000"
        style={{ 
          backgroundImage: bgImage, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div className={`absolute inset-0 backdrop-blur-[2px] transition-colors duration-500 ${userProfile.theme === Theme.DARK ? 'bg-brand-50/80' : 'bg-white/40'}`}></div>
      </div>

      {/* TOP FLOATING MENU (Desktop + Mobile) */}
      <nav className="relative z-50 flex items-center justify-between px-4 py-3 mx-4 mt-4 rounded-3xl glass shadow-lg border-neutral-300/20">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           <div className="relative group">
              <div className={`absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow ${userProfile.theme === Theme.DARK ? 'bg-gradient-to-r from-brand-500 to-accent-600' : 'bg-brand-200'}`}></div>
              <div className="relative p-1 bg-white/10 rounded-xl backdrop-blur-sm">
                <Logo className="w-8 h-8" />
              </div>
           </div>
           <div className="hidden sm:flex flex-col">
              <span className={`text-lg font-bold tracking-tight ${userProfile.theme === Theme.DARK ? 'text-white' : 'text-neutral-900'}`}>STANDAPP</span>
           </div>
        </div>

        {/* Center: Main Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-100/10 p-1 rounded-2xl backdrop-blur-md border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => handleModeChange(item.mode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                currentMode === item.mode
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                  : 'text-neutral-500 hover:text-brand-500 hover:bg-white/10'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-3">
           <div className="hidden sm:flex flex-col items-end mr-2">
              <span className={`text-xs font-bold ${userProfile.theme === Theme.DARK ? 'text-neutral-300' : 'text-neutral-600'}`}>{userProfile.name}</span>
              <span className={`text-[10px] font-black ${getScoreColor(userProfile.wellnessScore)}`}>{userProfile.wellnessScore}% Wellness</span>
           </div>
           <button 
             onClick={() => setShowSettings(true)}
             className={`p-2.5 rounded-full transition-all ${userProfile.theme === Theme.DARK ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
           >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66c-.29-.63-.178-1.391.41-1.81l.657-.38c.551-.318 1.26-.117 1.527.461 2.098 4.636 2.098 9.98 0 14.616-.268.579-.976.78-1.527.461l-.657-.38c-.588-.418-.7-.1.179-.41-1.81m-8.835-2.535c.704 0 1.402.03 2.09.09m0-9.18c-.688.06-1.386.09-2.09.09" />
              </svg>
           </button>
           
           {/* Mobile Menu Toggle */}
           <button 
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             className={`md:hidden p-2.5 rounded-full transition-all ${userProfile.theme === Theme.DARK ? 'bg-brand-600 text-white' : 'bg-brand-500 text-white'}`}
           >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
           </button>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <div className={`fixed inset-0 z-[60] transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        <aside className={`relative w-4/5 max-w-xs h-full shadow-2xl flex flex-col p-6 ${userProfile.theme === Theme.DARK ? 'bg-neutral-100/95 text-white border-r border-neutral-300/20' : 'bg-white text-neutral-900'}`}>
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                 <Logo className="w-8 h-8" />
                 <span className={`text-2xl font-black tracking-tighter ${userProfile.theme === Theme.DARK ? 'text-black' : 'text-black'}`}>STANDAPP</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-neutral-200 text-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
           
           <div className="flex-1 space-y-2">
             {navItems.map((item) => (
                <button
                  key={item.mode}
                  onClick={() => handleModeChange(item.mode)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    currentMode === item.mode
                      ? 'bg-brand-600 text-white shadow-lg'
                      : 'text-neutral-600 hover:bg-brand-500/10'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
           </div>

           <div className="mt-auto space-y-4">
              <button onClick={onEditProfile} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-800">
                 <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                    {userProfile.name.charAt(0)}
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-sm">{isSinhala ? 'පැතිකඩ සකසන්න' : 'Edit Profile'}</p>
                    <p className="text-xs opacity-60">{userProfile.email || userProfile.name}</p>
                 </div>
              </button>
              
              {onLogout && (
                <button onClick={onLogout} className="w-full py-4 text-center text-red-500 font-bold hover:bg-red-50 rounded-2xl transition">
                   {isSinhala ? 'ඉවත් වන්න' : 'Logout'}
                </button>
              )}
              
              {/* Founder Profile */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
                    alt="Founder" 
                    className="w-12 h-12 rounded-xl object-cover shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-800">Pasindu Vithanage</p>
                    <p className="text-[10px] text-brand-600 font-semibold uppercase tracking-wider">Founder & CEO</p>
                  </div>
                </div>
              </div>
           </div>
        </aside>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative z-10 p-4 overflow-hidden">
        <div className="h-full w-full max-w-7xl mx-auto rounded-[2.5rem] glass shadow-2xl overflow-hidden relative">
           {children}
        </div>
      </main>

      {/* Founder Footer (Subtle) */}
      <div className="fixed bottom-2 right-4 z-0 pointer-events-none opacity-30 text-[10px] text-white hidden md:block">
         STANDAPP by Pasindu Vithanage
      </div>

      {showSettings && (
        <Settings 
          currentTheme={userProfile.theme || Theme.COLORFUL} 
          currentLanguage={userProfile.language}
          onThemeChange={(t) => onUpdateProfile({ theme: t })}
          onLanguageChange={(l) => onUpdateProfile({ language: l })}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Layout;
