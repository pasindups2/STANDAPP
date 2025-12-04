
import { UserProfile, Language, Theme } from '../types';

const DB_KEY = 'standapp_users_db';
const SESSION_KEY = 'standapp_active_session';

// Helper to get all users
const getDatabase = (): Record<string, UserProfile> => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {};
};

// Helper to save database
const saveDatabase = (db: Record<string, UserProfile>) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const authService = {
  // Check if a username exists
  userExists: (username: string): boolean => {
    const db = getDatabase();
    return !!db[username];
  },

  // Register a new user
  signup: (username: string, password: string): UserProfile => {
    const db = getDatabase();
    if (db[username]) {
      throw new Error("User already exists");
    }

    const newUser: UserProfile = {
      username,
      password,
      name: '', // Will be set in onboarding
      language: Language.ENGLISH, // Default, set in onboarding
      wellnessScore: 0,
      theme: Theme.COLORFUL // Default theme
    };

    db[username] = newUser;
    saveDatabase(db);
    localStorage.setItem(SESSION_KEY, username);
    return newUser;
  },

  // Login a user
  login: (username: string, password: string): UserProfile => {
    const db = getDatabase();
    const user = db[username];

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem(SESSION_KEY, username);
    return user;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Get currently logged in user
  getCurrentUser: (): UserProfile | null => {
    const username = localStorage.getItem(SESSION_KEY);
    if (!username) return null;
    const db = getDatabase();
    return db[username] || null;
  },

  // Update user profile
  updateUser: (username: string, updates: Partial<UserProfile>): UserProfile => {
    const db = getDatabase();
    if (!db[username]) throw new Error("User not found");

    const updatedUser = { ...db[username], ...updates };
    db[username] = updatedUser;
    saveDatabase(db);
    return updatedUser;
  },

  // Check if quiz needs to be taken (New day reset logic)
  needsQuiz: (user: UserProfile): boolean => {
    if (!user.lastQuizDate) return true;

    const lastDate = new Date(user.lastQuizDate);
    const now = new Date();

    // Reset after 00:01 local time (effectively checking if it's a different day)
    const isSameDay = 
      lastDate.getFullYear() === now.getFullYear() &&
      lastDate.getMonth() === now.getMonth() &&
      lastDate.getDate() === now.getDate();

    return !isSameDay;
  }
};