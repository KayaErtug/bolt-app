export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  address: string;
  walletAddress?: string;
  occupation: string;
  profilePicture?: string;
  totalPoints: number;
  level: number;
  joinDate: string;
  referralCode: string;
  referredBy?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'one-time';
  completed: boolean;
  deadline?: string;
}

export interface Referral {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  points: number;
  status: 'active' | 'pending';
}