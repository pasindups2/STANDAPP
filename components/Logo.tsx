
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* Brand-500 */}
          <stop offset="100%" stopColor="#f43f5e" /> {/* Accent-500 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Abstract "S" / Plant Shape */}
      <path 
        d="M50 20 C 30 20, 20 40, 35 55 C 50 70, 70 60, 65 40 C 60 20, 40 30, 30 50 C 20 70, 40 90, 60 90" 
        stroke="url(#logoGradient)" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Central Dot/Core */}
      <circle cx="50" cy="50" r="8" fill="#fff" />
      <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" opacity="0.8" />
    </svg>
  );
};

export default Logo;
