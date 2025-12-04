
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { UserProfile } from '../types';
import Logo from './Logo';

interface AuthProps {
  onSuccess: (user: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const user = authService.login(username, password);
        onSuccess(user);
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        if (password.length < 4) {
          setError("Password must be at least 4 characters");
          return;
        }
        const user = authService.signup(username, password);
        onSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center font-sans">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 p-8 relative overflow-hidden animate-fade-in z-10">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-500/30 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-500/30 rounded-full blur-[80px]"></div>

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                 <Logo className="w-20 h-20" />
              </div>
          </div>
          <h1 className="text-4xl font-black text-white font-sans tracking-tighter drop-shadow-lg">STANDAPP</h1>
          <p className="text-neutral-300 text-sm mt-2 font-medium font-sans">Your Personal Mental Wellness Companion</p>
        </div>

        {error && (
          <div className="bg-accent-500/20 text-accent-200 p-3 rounded-xl text-sm font-semibold mb-6 text-center border border-accent-500/30 animate-pulse font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10 font-sans">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-xl border border-white/10 bg-white text-black placeholder-neutral-500 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-inner"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-white/10 bg-white text-black placeholder-neutral-500 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-inner"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1 ml-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-white/10 bg-white text-black placeholder-neutral-500 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-inner"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/40 transform hover:scale-[1.02] active:scale-[0.98] border border-white/10 mt-2"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 font-sans">
          <p className="text-neutral-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-brand-400 font-bold hover:text-brand-300 hover:underline transition"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
