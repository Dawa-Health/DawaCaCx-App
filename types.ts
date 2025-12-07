
export enum AppState {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  OTP = 'OTP',
  GET_STARTED = 'GET_STARTED',
  DASHBOARD = 'DASHBOARD',
  RESULTS = 'RESULTS',
  VIA_TEST = 'VIA_TEST',
  PURCHASE = 'PURCHASE',
  TERMS = 'TERMS'
}

export enum DashboardTab {
  HOME = 'HOME',
  PATIENTS = 'PATIENTS',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  contact: string;
  lastTestDate?: string;
  status: 'Normal' | 'Suspicious' | 'Pending' | 'Untested';
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface AnalysisResult {
  imageUrl: string;
  label: string;
  confidence: number;
  suspicionLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  rawOutput?: any;
  error?: string;
}

export interface VIATestRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  result: string;
  notes: string;
  imageUri?: string;
  aiAnalysis?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  clinic: string;
  credits: number;
}
