
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import PhobiaTool from './components/PhobiaTool';
import AddictionTool from './components/AddictionTool';
import Breathing from './components/Breathing';
import Resources from './components/Resources';
import MindGame from './components/MindGame';
import Onboarding from './components/Onboarding';
import ProfileEditor from './components/ProfileEditor';
import Auth from './components/Auth';
import { AppMode, UserProfile, Theme } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mode, setMode] = useState<AppMode>(AppMode.CHAT);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for active session on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUserProfile(user);
    }
    setLoading(false);
  }, []);

  // Handle Login/Signup Success
  const handleAuthSuccess = (user: UserProfile) => {
    setUserProfile(user);
  };

  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    setUserProfile(null);
    setMode(AppMode.CHAT);
  };

  // Handle Updates from Onboarding or Profile Editor
  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    
    // Save to DB
    const updatedUser = authService.updateUser(userProfile.username, updates);
    setUserProfile(updatedUser);
    setIsEditingProfile(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-brand-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
  }

  // Apply theme class to a top-level wrapper
  const themeClass = userProfile?.theme === Theme.DARK ? 'theme-dark' : '';

  return (
    <div className={`${themeClass} min-h-[100dvh]`}>
      {/* 1. No User -> Show Auth Screen */}
      {!userProfile && <Auth onSuccess={handleAuthSuccess} />}

      {/* 2. User exists but name is empty (Just signed up) -> Show Full Onboarding */}
      {userProfile && !userProfile.name && (
        <Onboarding 
          initialProfile={userProfile} 
          mode="full" 
          onComplete={handleProfileUpdate} 
        />
      )}

      {/* 3. User exists but needs daily quiz -> Show Quiz Only Onboarding */}
      {userProfile && userProfile.name && authService.needsQuiz(userProfile) && (
        <Onboarding 
          initialProfile={userProfile} 
          mode="quiz-only" 
          onComplete={handleProfileUpdate} 
        />
      )}

      {/* 4. Everything valid -> Show Main App */}
      {userProfile && userProfile.name && !authService.needsQuiz(userProfile) && (
        <>
          <Layout 
            currentMode={mode} 
            setMode={setMode} 
            userProfile={userProfile}
            onEditProfile={() => setIsEditingProfile(true)}
            onLogout={handleLogout}
            onUpdateProfile={handleProfileUpdate}
          >
            {mode === AppMode.CHAT && (
              <ChatInterface 
                onSuggestResource={() => setMode(AppMode.RESOURCES)} 
                language={userProfile.language}
                userName={userProfile.name}
              />
            )}
            {mode === AppMode.PHOBIA_COACH && <PhobiaTool />}
            {mode === AppMode.ADDICTIONS && <AddictionTool language={userProfile.language} />}
            {mode === AppMode.BREATHING && <Breathing />}
            {mode === AppMode.GAME && <MindGame />}
            {mode === AppMode.RESOURCES && <Resources />}
          </Layout>

          {isEditingProfile && (
            <ProfileEditor 
              profile={userProfile} 
              onSave={(updated) => handleProfileUpdate(updated)} 
              onCancel={() => setIsEditingProfile(false)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
