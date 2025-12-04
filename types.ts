
export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export enum AppMode {
  CHAT = 'CHAT',
  PHOBIA_COACH = 'PHOBIA_COACH',
  ADDICTIONS = 'ADDICTIONS',
  BREATHING = 'BREATHING',
  RESOURCES = 'RESOURCES',
  GAME = 'GAME'
}

export interface PhobiaScenario {
  title: string;
  steps: {
    level: number;
    description: string;
    copingTip: string;
  }[];
}

export interface AddictionPlan {
  title: string;
  weeks: {
    weekNumber: number;
    focus: string;
    tasks: string[];
  }[];
}

export enum SafetyStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  CRISIS = 'CRISIS'
}

export enum Language {
  SINHALA = 'si',
  ENGLISH = 'en'
}

export enum Theme {
  COLORFUL = 'COLORFUL',
  DARK = 'DARK'
}

export interface UserProfile {
  username: string; // ID
  password?: string; // Stored for auth (in real app, this would be hashed)
  name: string;
  wellnessScore: number; // 0 to 100
  lastQuizDate?: string; // ISO Date string
  language: Language;
  theme?: Theme;
  email?: string;
  birthday?: string;
  sex?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  civilStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Other';
  city?: string;
}
