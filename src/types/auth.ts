// src/types/auth.ts

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  setAuthenticatedUser: (user: User, token: string) => void;
  logout: () => void;
  resendOtp: () => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
}