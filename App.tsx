
import React, { useState, useEffect } from 'react';
import { AppState, DashboardTab, Patient, VIATestRecord } from './types';
import { MainLayout } from './components/Layout';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Dialog } from './components/UIComponents';
import { Logo } from './components/Logo';
import { 
  Users, Activity, Calendar, Search, Plus, Filter, 
  ChevronRight, Camera, CheckCircle2, AlertCircle, ShoppingCart, 
  CreditCard, ArrowRight, ShieldCheck, Mail, Lock, Phone,
  Stethoscope, HeartPulse, ScanLine, History, ArrowLeft, FileText, Globe, UserPlus, Briefcase, Building, UserCircle,
  ArrowUpRight, Clock, MoreVertical, RefreshCw, Play
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { analyzeVIAImage } from './services/geminiService';

// --- Auth Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds display time

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1127ab]">
      <div className="animate-bounce mb-6">
        <Logo className="w-48 h-48 drop-shadow-2xl" outlineColor="#ffffff" fillColor="#46c741" />
      </div>
      <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-4 duration-700 fade-in">
        <h1 className="text-5xl font-bold text-white tracking-wider drop-shadow-md">DAWA CaCx</h1>
        <p className="text-primary-200 text-sm tracking-[0.2em] uppercase font-medium">Smart Cervical Screening</p>
      </div>
      <div className="absolute bottom-12">
         <Loader2 className="h-8 w-8 text-white/70 animate-spin" />
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin, onSignup, onShowTerms }: { onLogin: () => void, onSignup: () => void, onShowTerms: () => void }) => {
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231127ab' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-500 border border-slate-100">
        <div className="bg-primary-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500 to-primary-800 opacity-90"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-3 rounded-full shadow-lg mb-4">
               <Logo className="h-12 w-12" outlineColor="#1127ab" />
            </div>
            <h1 className="text-2xl font-bold text-white">Midwife Login</h1>
            <p className="text-primary-100 mt-2 text-sm">Access the Dawa CaCx Platform</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <Input label="Email or License ID" placeholder="nurse.sarah@clinic.com" icon={<Mail className="h-4 w-4" />} required />
            <div className="space-y-1">
               <Input label="Password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} required />
               <div className="flex justify-end">
                 <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline">Forgot Password?</a>
               </div>
            </div>
            
            <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary-500/20" isLoading={loading}>
              Sign In
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 mb-4">New to Dawa CaCx?</p>
            <Button variant="outline" className="w-full border-primary-200 text-primary-700 hover:bg-primary-50" onClick={onSignup}>
              Register as a Midwife
            </Button>
            <div className="mt-6 text-xs text-slate-400 cursor-pointer hover:text-primary-600 transition-colors" onClick={onShowTerms}>
              Terms of Service & Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignupPage = ({ onSignup, onLogin }: { onSignup: () => void, onLogin: () => void }) => {
  const [loading, setLoading] = useState(false);
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignup();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-in slide-in-from-right-8 duration-500 border border-slate-100">
        <div className="bg-white p-8 pb-0">
          <Button variant="ghost" size="sm" onClick={onLogin} className="mb-4 pl-0 hover:bg-transparent text-slate-500 hover:text-slate-800">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Button>
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-secondary-100 p-2 rounded-lg">
                <UserPlus className="h-6 w-6 text-secondary-600" />
             </div>
             <h1 className="text-2xl font-bold text-slate-900">Midwife Registration</h1>
          </div>
          <p className="text-slate-500 text-sm">Create your professional account to start screening.</p>
        </div>

        <div className="p-8 pt-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <Input label="First Name" placeholder="Sarah" required />
               <Input label="Last Name" placeholder="Johnson" required />
            </div>
            <Input label="Email Address" type="email" placeholder="sarah@example.com" icon={<Mail className="h-4 w-4" />} required />
            <Input label="Medical License Number" placeholder="MW-1234-5678" icon={<Briefcase className="h-4 w-4" />} required />
            <Input label="Clinic / Facility Name" placeholder="Dawa Clinic" icon={<Building className="h-4 w-4" />} required />
            
            <div className="pt-2">
              <Input label="Create Password" type="password" placeholder="Min. 8 characters" icon={<Lock className="h-4 w-4" />} required />
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-4 bg-primary-600 hover:bg-primary-700" isLoading={loading}>
              Create Account
            </Button>
          </form>
          
          <p className="text-xs text-slate-400 mt-6 text-center">
            By registering, you confirm that you are a certified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

const OTPVerification = ({ onVerify }: { onVerify: () => void }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center animate-in slide-in-from-right-8 duration-300">
        <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Security Verification</h2>
        <p className="text-slate-500 mb-8 text-sm">To protect patient data, please enter the code sent to your email.</p>
        
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              className="w-14 h-14 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all text-slate-800"
              maxLength={1}
              value={code[i]}
              onChange={(e) => {
                const newCode = [...code];
                newCode[i] = e.target.value;
                setCode(newCode);
                if (e.target.value && i < 3) {
                  const nextInput = document.querySelector(`input:nth-child(${i + 2})`) as HTMLInputElement;
                  nextInput?.focus();
                }
              }}
            />
          ))}
        </div>

        <Button onClick={handleVerify} className="w-full h-12 text-base" isLoading={loading}>
          Verify & Access
        </Button>
        <div className="mt-6">
          <button className="text-sm text-primary-600 font-medium hover:underline">Resend Verification Code</button>
        </div>
      </div>
    </div>
  );
};

const GetStarted = ({ onStart, onShowTerms }: { onStart: () => void, onShowTerms: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const illustrations = [
    { 
      icon: <Stethoscope size={64} className="text-white" />, 
      title: "Midwife Companion", 
      description: "Empowering midwives with intelligent diagnostic tools for better care." 
    },
    { 
      icon: <HeartPulse size={64} className="text-white" />, 
      title: "Cervical Health", 
      description: "Protecting women's health through early detection and prevention." 
    },
    { 
      icon: <ScanLine size={64} className="text-white" />, 
      title: "AI-Powered VIA", 
      description: "Instant analysis of VIA images to support your clinical decisions." 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % illustrations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[#1127ab] flex flex-col overflow-hidden animate-in fade-in duration-500 relative">
       {/* Background pattern */}
       <div className="absolute inset-0 z-0 opacity-10" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>

      <div className="flex-1 flex flex-col items-center justify-between p-6 max-w-md mx-auto w-full z-10">
        {/* Logo */}
        <div className="flex justify-center pt-8">
          <Logo className="w-40 h-40" outlineColor="white" />
        </div>

        {/* Carousel Container */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {/* Illustration Carousel */}
          <div className="w-full max-w-xs mb-8">
            <div className="relative h-48 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${illustrations.length * 100}%` }}
              >
                {illustrations.map((item, index) => (
                  <div key={index} className="w-full flex items-center justify-center" style={{ width: `${100 / illustrations.length}%` }}>
                    <div className="w-48 h-48 relative flex flex-col items-center justify-center">
                      <div className={`relative z-10 drop-shadow-xl transition-all duration-500 ${index === currentIndex ? 'scale-110' : 'scale-90'}`}>
                         {item.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {illustrations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-6 bg-secondary-400' 
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center px-4">
            <h2 className="mb-3 text-white font-bold text-2xl tracking-tight">
              {illustrations[currentIndex].title}
            </h2>
            <p className="text-primary-100 text-sm leading-relaxed max-w-[280px] mx-auto">
              {illustrations[currentIndex].description}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full pb-8">
          <Button
            onClick={onStart}
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white h-14 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all font-bold text-lg"
          >
            Get Started
          </Button>

          <p className="text-xs text-primary-200 mt-4 text-center px-4">
            By continuing, you agree to our <span className="underline cursor-pointer hover:text-white" onClick={onShowTerms}>Terms of Service and Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const TermsAndConditions = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Button variant="ghost" onClick={onBack} size="sm" className="p-2 -ml-2">
          <ArrowLeft className="h-6 w-6 text-slate-600" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900">Terms & Conditions</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 max-w-3xl mx-auto w-full bg-white shadow-sm my-4 rounded-xl">
        <div className="prose prose-slate max-w-none">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
            <Logo className="h-12 w-12" outlineColor="#1127ab" />
            <div>
              <h2 className="text-2xl font-bold text-[#1127ab] m-0">Dawa Health</h2>
              <p className="text-sm text-slate-500 m-0">Effective Date: October 25, 2023</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-4">1. Introduction</h3>
          <p className="mb-4 text-slate-700">
            Welcome to Dawa CaCx, a digital health platform developed by Dawa Health Inc. ("Dawa Health", "we", "us", or "our"). 
            These Terms of Service ("Terms") govern your access to and use of the Dawa CaCx application, including our AI-assisted 
            cervical cancer screening tools (VIA analysis), patient management systems, and related services.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">2. Medical Disclaimer</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
              <AlertCircle className="h-5 w-5" />
              Professional Use Only
            </h4>
            <p className="text-sm text-amber-900 m-0">
              The Dawa CaCx application and its AI analysis features are designed as <strong>clinical decision support tools</strong> for trained healthcare professionals (Midwives, Nurses, Doctors). 
              They do <strong>not</strong> provide a definitive medical diagnosis. The visual inspection results generated by our AI models should always 
              be verified by a qualified medical practitioner. Dawa Health is not responsible for medical decisions made based on this data.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-4">3. User Accounts & Security</h3>
          <p className="mb-4 text-slate-700">
            You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately of any unauthorized use of your account. 
            Access to this application is restricted to authorized healthcare providers and clinic administrators verified by Dawa Health.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">4. Patient Data & Privacy</h3>
          <p className="mb-4 text-slate-700">
            We are committed to protecting patient privacy. By using Dawa CaCx, you agree to:
          </p>
          <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-1">
            <li>Comply with all applicable data protection laws (e.g., Data Protection Act of Kenya, HIPAA, GDPR).</li>
            <li>Obtain necessary patient consent before capturing or uploading images for VIA analysis.</li>
            <li>Use patient data solely for the purpose of medical screening and treatment tracking.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mb-4">5. Intellectual Property</h3>
          <p className="mb-4 text-slate-700">
            The Dawa CaCx application, including its algorithms, software, trademarks, and visual interfaces, is the exclusive property of Dawa Health Inc. 
            You are granted a limited, non-exclusive, non-transferable license to use the application for its intended medical purpose.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h3>
          <p className="mb-4 text-slate-700">
            To the maximum extent permitted by law, Dawa Health shall not be liable for any indirect, incidental, or consequential damages arising out of 
            your use of the service. Our total liability for any claim arising from the service shall not exceed the amount paid by you for the service credits 
            in the twelve months preceding the claim.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">7. Contact Us</h3>
          <p className="mb-4 text-slate-700">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4" /> <span>info@dawa-health.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Globe className="h-4 w-4" /> <span>www.dawa-health.com</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
           <Button onClick={onBack} className="w-full md:w-auto min-w-[200px]">
             I Acknowledge & Understand
           </Button>
        </div>
      </div>
    </div>
  );
};

// --- Mock Data ---

const MOCK_PATIENTS: Patient[] = [
  { id: 'DW-1045', name: 'Mulenga Banda', age: 34, contact: '0971234567', lastTestDate: '2025-02-15', status: 'Normal', riskLevel: 'Low' },
  { id: 'DW-2138', name: 'Grace Phiri', age: 42, contact: '0962345678', lastTestDate: '2025-01-20', status: 'Suspicious', riskLevel: 'High' },
  { id: 'DW-1892', name: 'Esther Lungu', age: 29, contact: '0952345678', status: 'Untested', riskLevel: 'Medium' },
  { id: 'DW-3401', name: 'Sarah Mwape', age: 38, contact: '0977345678', lastTestDate: '2025-03-01', status: 'Pending', riskLevel: 'Low' },
  { id: 'DW-2766', name: 'Jane Chilufya', age: 45, contact: '0966345678', status: 'Untested', riskLevel: 'High' },
];

const CHART_DATA = [
  { name: 'Jan', tests: 40 },
  { name: 'Feb', tests: 30 },
  { name: 'Mar', tests: 20 },
  { name: 'Apr', tests: 27 },
  { name: 'May', tests: 18 },
  { name: 'Jun', tests: 23 },
  { name: 'Jul', tests: 34 },
];

// --- Sub-components for Dashboard ---

const StatCard = ({ title, value, icon, trend, trendUp, colorClass }: { title: string, value: string, icon: React.ReactNode, trend?: string, trendUp?: boolean, colorClass: string }) => (
  <Card className="shadow-sm border-slate-100 hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
          {icon}
        </div>
        {trend && (
           <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {trendUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowUpRight size={12} className="mr-1 rotate-90" />}
              {trend}
           </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>
    </CardContent>
  </Card>
);

const ScreeningCreditCard = ({ onPurchase }: { onPurchase: () => void }) => (
  <Card className="bg-gradient-to-br from-primary-800 to-primary-900 text-white border-none shadow-lg relative overflow-hidden group h-full">
    <div className="absolute top-0 right-0 p-0 opacity-10 transform translate-x-8 -translate-y-8">
      <Logo className="h-48 w-48" outlineColor="#ffffff" />
    </div>
    <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start">
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <Button 
           size="sm" 
           onClick={onPurchase}
           className="bg-white/10 hover:bg-white/20 text-white border-none font-medium text-xs backdrop-blur-sm"
        >
          Top Up
        </Button>
      </div>
      
      <div className="mt-6">
        <p className="text-primary-200 text-xs font-semibold tracking-wider uppercase mb-1">Available Credits</p>
        <div className="flex items-baseline gap-2">
           <h3 className="text-4xl font-bold tracking-tight">124</h3>
           <span className="text-sm text-primary-300">scans</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PatientsList = ({ patients, onSelect }: { patients: Patient[], onSelect: (p: Patient) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-slate-500">
      <thead className="text-xs text-slate-400 uppercase bg-slate-50/50 border-b border-slate-100">
        <tr>
          <th className="px-6 py-4 font-semibold tracking-wider">Patient ID</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Patient Name</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Diagnosis Status</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Last Screening</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Risk Level</th>
          <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {patients.map((patient) => (
          <tr key={patient.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
            <td className="px-6 py-4 font-medium text-slate-600 font-mono">
              {patient.id}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                    {patient.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">{patient.name}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <Badge variant={patient.status === 'Normal' ? 'success' : patient.status === 'Suspicious' ? 'danger' : 'default'} className="px-2.5 py-1 text-[11px] shadow-sm">
                {patient.status}
              </Badge>
            </td>
            <td className="px-6 py-4">
               <div className="flex items-center gap-2 text-slate-500">
                 <Calendar className="h-3.5 w-3.5 text-slate-400" />
                 <span className="text-xs font-medium">{patient.lastTestDate || 'N/A'}</span>
               </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${
                    patient.riskLevel === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 
                    patient.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                 }`}></div>
                 <span className="text-xs font-semibold text-slate-700">{patient.riskLevel}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <Button size="sm" variant="ghost" onClick={() => onSelect(patient)} className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary-600">
                <ChevronRight size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main App Logic ---

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.SPLASH);
  const [previousState, setPreviousState] = useState<AppState>(AppState.LOGIN);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.HOME);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // VIATest State
  const [viaStep, setViaStep] = useState(0);
  const [viaImage, setViaImage] = useState<string | null>(null);
  const [viaAnalysis, setViaAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Navigation Handlers
  const login = () => setAppState(AppState.OTP);
  const signup = () => setAppState(AppState.OTP);
  const verifyOtp = () => setAppState(AppState.GET_STARTED);
  const startApp = () => setAppState(AppState.DASHBOARD);
  
  const openTerms = () => {
    setPreviousState(appState);
    setAppState(AppState.TERMS);
  };

  const closeTerms = () => {
    setAppState(previousState);
  };
  
  const startViaTest = (patient?: Patient) => {
    if (patient) setActivePatient(patient);
    setAppState(AppState.VIA_TEST);
    setViaStep(0);
    setViaImage(null);
    setViaAnalysis('');
  };

  const cancelTest = () => {
    setAppState(AppState.DASHBOARD);
    setViaStep(0);
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // Generate a random ID in the format DW-XXXX
    const randomId = `DW-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newPatient: Patient = {
      id: randomId,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value),
      contact: (form.elements.namedItem('contact') as HTMLInputElement).value,
      status: 'Untested',
      riskLevel: 'Low'
    };
    setPatients([newPatient, ...patients]);
    setShowAddPatient(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setViaImage(base64);
        // Do not auto-advance. Let user preview first.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setViaImage(null);
    setViaAnalysis('');
  };

  const handleConfirmAnalysis = async () => {
    if (!viaImage) return;
    
    setViaStep(2); // Move to analysis step
    setIsAnalyzing(true);
    const result = await analyzeVIAImage(viaImage);
    setViaAnalysis(result);
    setIsAnalyzing(false);
  };

  // Filter patients logic
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Views ---

  if (appState === AppState.SPLASH) return <SplashScreen onFinish={() => setAppState(AppState.LOGIN)} />;
  if (appState === AppState.LOGIN) return <LoginPage onLogin={login} onSignup={() => setAppState(AppState.SIGNUP)} onShowTerms={openTerms} />;
  if (appState === AppState.SIGNUP) return <SignupPage onSignup={signup} onLogin={() => setAppState(AppState.LOGIN)} />;
  if (appState === AppState.OTP) return <OTPVerification onVerify={verifyOtp} />;
  if (appState === AppState.GET_STARTED) return <GetStarted onStart={startApp} onShowTerms={openTerms} />;
  if (appState === AppState.TERMS) return <TermsAndConditions onBack={closeTerms} />;

  if (appState === AppState.VIA_TEST) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary-600" />
              VIA Examination
            </h2>
            <p className="text-sm text-slate-500">Patient: <span className="font-semibold text-slate-800">{activePatient?.name || 'Unknown'}</span></p>
          </div>
          <Button variant="ghost" onClick={cancelTest} className="text-slate-500 hover:text-slate-900">Close</Button>
        </div>

        <div className="flex-1 overflow-auto p-6 max-w-5xl mx-auto w-full bg-slate-50/50">
          {/* Progress Stepper */}
          <div className="flex justify-between mb-10 relative max-w-2xl mx-auto mt-4">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
            {['Preparation', 'Capture', 'Analysis', 'Report'].map((step, idx) => (
              <div key={step} className={`flex flex-col items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ring-4 ring-white ${idx <= viaStep ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${idx <= viaStep ? 'text-primary-700' : 'text-slate-400'}`}>{step}</span>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
          {viaStep === 0 && (
            <div className="space-y-6 animate-in fade-in">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 rounded-t-xl">
                  <CardTitle className="text-lg text-slate-800">Pre-Examination Checklist</CardTitle>
                  <p className="text-slate-500 text-sm">Please confirm all preparation steps before proceeding.</p>
                </CardHeader>
                <CardContent className="space-y-1 pt-6">
                  {[
                    'Explain VIA procedure to the patient', 
                    'Prepare 5% Acetic Acid solution (freshly made)', 
                    'Ensure examination light source is adequate', 
                    'Position patient comfortably in lithotomy position',
                    'Clean cervix with saline before applying acetic acid'
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-4 p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50 rounded-lg cursor-pointer transition-all group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer h-5 w-5 border-2 border-slate-300 rounded text-primary-600 focus:ring-primary-500/20 transition-all checked:border-primary-600" />
                      </div>
                      <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{item}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>
              <div className="flex justify-end pt-4">
                 <Button onClick={() => setViaStep(1)} className="h-12 px-8 text-base shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 transition-all">
                    Checklist Complete & Continue <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </div>
            </div>
          )}

          {viaStep === 1 && (
            <div className="space-y-6 text-center animate-in fade-in">
              {!viaImage ? (
                // State 1: No image uploaded - Show Upload Box
                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-16 bg-white hover:bg-slate-50 hover:border-primary-300 transition-all group cursor-pointer relative shadow-sm">
                  <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="camera-input" />
                  <div className="flex flex-col items-center gap-6 pointer-events-none">
                    <div className="bg-primary-50 p-6 rounded-full group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300 ring-8 ring-primary-50/50">
                      <Camera className="h-12 w-12 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Tap to Capture Cervix Image</h3>
                      <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
                        Wait 1 minute after applying acetic acid. Ensure the cervix is clearly visible, in focus, and well-lit.
                      </p>
                    </div>
                    <Button variant="outline" className="pointer-events-none border-slate-200 text-slate-600">Select from Device / Camera</Button>
                  </div>
                </div>
              ) : (
                // State 2: Image Preview & Confirmation
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl mx-auto">
                    <div className="bg-slate-900 h-[400px] flex items-center justify-center relative">
                      <img src={viaImage} alt="Captured Preview" className="h-full w-full object-contain" />
                    </div>
                    <div className="p-6">
                       <h3 className="text-lg font-bold text-slate-800 mb-2">Confirm Image Quality</h3>
                       <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                         Please ensure the cervix is centered, in focus, and free of glare before proceeding to AI analysis.
                       </p>
                       <div className="flex gap-4 justify-center">
                          <Button variant="outline" onClick={handleRetake} className="min-w-[140px] border-slate-300 hover:bg-slate-50 hover:text-red-600 hover:border-red-200">
                             <RefreshCw className="mr-2 h-4 w-4" /> Retake Photo
                          </Button>
                          <Button onClick={handleConfirmAnalysis} className="min-w-[180px] shadow-lg shadow-primary-500/20">
                             <Play className="mr-2 h-4 w-4 fill-current" /> Analyze Image
                          </Button>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {viaStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid md:grid-cols-2 gap-8 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Camera className="h-4 w-4 text-slate-400" /> Captured Evidence
                  </h3>
                  <div className="relative group rounded-xl overflow-hidden shadow-md border border-slate-200 bg-black flex-1 min-h-[300px] flex items-center justify-center">
                     <img src={viaImage || ''} alt="Cervix" className="w-full h-full object-contain" />
                     {!isAnalyzing && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Button variant="outline" onClick={() => setViaStep(1)} className="text-white border-white hover:bg-white hover:text-black font-semibold">Retake Photo</Button>
                     </div>
                     )}
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Activity className="h-4 w-4 text-primary-600" /> 
                    AI Analysis Result
                  </h3>
                  <Card className="bg-white border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 animate-gradient-x"></div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {isAnalyzing ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-12 text-primary-700">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-25"></div>
                            <div className="relative bg-primary-50 p-4 rounded-full">
                               <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                            </div>
                          </div>
                          <p className="font-bold text-lg text-slate-800">Running MedSigLIP Analysis</p>
                          <p className="text-sm text-slate-500 mt-2">Processing visual patterns & lesions...</p>
                        </div>
                      ) : (
                        <div className="space-y-6 flex-1 flex flex-col">
                          <div className="prose prose-sm prose-slate max-w-none bg-slate-50/80 p-5 rounded-xl border border-slate-100 flex-1 overflow-auto">
                            <div className="whitespace-pre-line text-slate-700 leading-relaxed font-medium">
                              {viaAnalysis}
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100/50 flex gap-3 items-start">
                             <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                             <div>
                               <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Clinical Verification Required</p>
                               <p className="text-xs text-amber-800/80 leading-relaxed">
                                 This AI assessment is a decision support tool. Please combine with your visual inspection findings before final diagnosis.
                               </p>
                             </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <Button variant="outline" onClick={() => setViaStep(1)} className="flex-1 h-12 border-slate-300 text-slate-700 hover:bg-slate-50">Discard & Retake</Button>
                <Button onClick={() => setViaStep(3)} className="flex-1 h-12 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 font-semibold" disabled={isAnalyzing}>Confirm & Record Findings</Button>
              </div>
            </div>
          )}
          
          {viaStep === 3 && (
            <div className="space-y-8 max-w-md mx-auto text-center pt-16 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100 ring-8 ring-green-50/50">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Result Recorded</h2>
                <p className="text-slate-500 mt-2 text-sm">Screening data securely saved to <span className="font-semibold text-slate-900">{activePatient?.name}</span>'s medical record.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-left space-y-3">
                 <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                    <span className="text-slate-500">Date & Time</span>
                    <span className="font-medium text-slate-800">{new Date().toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                    <span className="text-slate-500">Facility</span>
                    <span className="font-medium text-slate-800">Dawa Clinic</span>
                 </div>
                 <div className="flex justify-between text-sm py-1">
                    <span className="text-slate-500">Performed By</span>
                    <span className="font-medium text-slate-800">Sarah Johnson (Midwife)</span>
                 </div>
              </div>
              <Button onClick={cancelTest} className="w-full h-12 text-base font-semibold shadow-md">Return to Patient Registry</Button>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }

  const PurchaseScreen = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center gap-2 mb-6">
         <Button variant="ghost" onClick={() => setActiveTab(DashboardTab.HOME)} className="p-0 hover:bg-transparent">
             <ArrowRight className="rotate-180 mr-2 h-4 w-4" /> Back to Dashboard
         </Button>
         <h2 className="text-2xl font-bold text-slate-900">Purchase Screening Credits</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { qty: 10, price: '1,000 KES', label: 'Starter Pack', desc: 'For independent midwives' },
          { qty: 50, price: '4,500 KES', label: 'Clinic Standard', popular: true, desc: 'Best value for small clinics' },
          { qty: 100, price: '8,000 KES', label: 'Hospital Bulk', desc: 'High volume centers' },
        ].map((pkg) => (
          <Card key={pkg.label} className={`relative hover:border-primary-500 hover:shadow-xl transition-all cursor-pointer group ${pkg.popular ? 'border-primary-500 ring-1 ring-primary-500 bg-primary-50/10' : ''}`}>
             {pkg.popular && <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-wider shadow-sm">Most Popular</div>}
             <CardContent className="text-center py-10 px-6">
               <h3 className="text-lg font-bold text-slate-800">{pkg.label}</h3>
               <p className="text-xs text-slate-400 mb-8">{pkg.desc}</p>
               <div className="flex items-baseline justify-center gap-1 my-6">
                  <span className="text-5xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors tracking-tight">{pkg.qty}</span>
                  <span className="text-sm font-medium text-slate-500 mb-1">Credits</span>
               </div>
               <div className="text-xl font-bold text-primary-700 mb-8 bg-slate-50 py-3 rounded-lg border border-slate-100">{pkg.price}</div>
               <Button className="w-full h-11 font-semibold shadow-sm" variant={pkg.popular ? 'primary' : 'outline'}>Select Package</Button>
             </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === DashboardTab.HOME && appState !== AppState.PURCHASE && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">Welcome back, Sarah Johnson</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => { setActiveTab(DashboardTab.PATIENTS); setShowAddPatient(true); }} className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> New Registration
              </Button>
              <Button onClick={() => startViaTest()} className="shadow-md shadow-primary-500/20">
                <Camera className="mr-2 h-4 w-4" /> Start Screening
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScreeningCreditCard onPurchase={() => setAppState(AppState.PURCHASE)} />
            
            <StatCard 
               title="Registered Patients" 
               value={patients.length.toString()} 
               icon={<Users className="h-6 w-6 text-primary-600" />} 
               trend="12% vs last month"
               trendUp={true}
               colorClass="bg-primary-50 text-primary-600"
            />

            <StatCard 
               title="Follow-Up Required" 
               value="3" 
               icon={<Activity className="h-6 w-6 text-amber-600" />} 
               trend="2 new this week"
               trendUp={false}
               colorClass="bg-amber-50 text-amber-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-sm border-slate-200">
               <CardHeader className="border-b border-slate-50 pb-4 bg-slate-50/30">
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-slate-800">Monthly Screenings</CardTitle>
                    <div className="flex gap-2">
                       <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md cursor-pointer hover:border-slate-300">Last 6 Months</span>
                    </div>
                 </div>
               </CardHeader>
               <CardContent className="pt-6">
                 <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
                        <YAxis fontSize={11} stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                          cursor={{fill: '#f8fafc'}}
                        />
                        <Bar dataKey="tests" fill="#1127ab" radius={[4, 4, 0, 0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
               </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 flex flex-col">
               <CardHeader className="border-b border-slate-50 pb-4 bg-slate-50/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-slate-800">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab(DashboardTab.PATIENTS)} className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 h-8 text-xs font-semibold">View All</Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0 flex-1 overflow-auto">
                 <div className="divide-y divide-slate-50">
                    {patients.slice(0, 4).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors group" onClick={() => { setActivePatient(p); setActiveTab(DashboardTab.PATIENTS); }}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm transition-colors">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">{p.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                               <Clock size={10} />
                               {p.lastTestDate ? `Screened: ${p.lastTestDate}` : 'Registered today'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge variant={p.status === 'Normal' ? 'success' : p.status === 'Suspicious' ? 'danger' : 'default'} className="shadow-none border border-transparent">
                             {p.status}
                           </Badge>
                           <MoreVertical className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
                        </div>
                      </div>
                    ))}
                 </div>
               </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === DashboardTab.PATIENTS && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
               <p className="text-slate-500 text-sm mt-1 font-medium">Manage patient records and histories</p>
            </div>
            <Button onClick={() => setShowAddPatient(true)} size="lg" className="shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all">
              <Plus className="mr-2 h-5 w-5" /> Add New Patient
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search by name or ID..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 h-11 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent transition-all text-sm" 
               />
             </div>
             <div className="flex gap-2">
                <Button variant="outline" className="border-slate-200 text-slate-600 bg-white"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button variant="outline" className="border-slate-200 text-slate-600 bg-white"><ArrowUpRight className="mr-2 h-4 w-4" /> Export</Button>
                <div className="w-px h-auto bg-slate-200 mx-1 hidden md:block"></div>
                 <Button onClick={() => setShowAddPatient(true)} className="md:hidden bg-primary-100 text-primary-700 hover:bg-primary-200 border-transparent"><Plus className="h-4 w-4" /></Button>
             </div>
          </div>

          <Card className="overflow-hidden shadow-sm border-slate-200">
            <PatientsList 
              patients={filteredPatients} 
              onSelect={(p) => {
                setActivePatient(p);
                // In a real app, this might open a detail view. For now, let's start a test.
                startViaTest(p);
              }} 
            />
            <div className="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center px-6">
               <span className="text-xs text-slate-500">Showing {filteredPatients.length} patients</span>
               <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 text-xs" disabled>Previous</Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs" disabled>Next</Button>
               </div>
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === DashboardTab.HISTORY && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <div className="pb-4 border-b border-slate-200">
             <h1 className="text-2xl font-bold text-slate-900">Screening History</h1>
             <p className="text-slate-500 text-sm mt-1">Archive of all past VIA examinations</p>
           </div>
           
           <Card className="bg-slate-50 border-dashed border-2 border-slate-200 shadow-none">
             <CardContent className="py-24 text-center text-slate-500">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 ring-4 ring-slate-50">
                   <History className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">No Records Found</h3>
                <p className="max-w-md mx-auto mb-8 text-sm leading-relaxed text-slate-400">
                  You haven't performed any screenings in this period. Start a new test from the dashboard to create a record.
                </p>
                <Button onClick={() => setActiveTab(DashboardTab.HOME)} variant="outline" className="bg-white hover:bg-slate-50 border-slate-300">
                   Go to Dashboard
                </Button>
             </CardContent>
           </Card>
        </div>
      )}

      {activeTab === DashboardTab.PROFILE && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="pb-4 border-b border-slate-200">
             <h1 className="text-2xl font-bold text-slate-900">Professional Profile</h1>
             <p className="text-slate-500 text-sm mt-1">Manage your account and clinic settings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-1">
                <Card className="text-center h-full border-slate-200 shadow-sm overflow-hidden relative">
                   <div className="h-24 bg-gradient-to-br from-primary-600 to-primary-800 absolute top-0 left-0 right-0"></div>
                   <CardContent className="pt-12 relative z-10">
                      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-primary-700 border-4 border-white shadow-md mx-auto mb-4">
                        SJ
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Sarah Johnson</h2>
                      <Badge className="mt-2 mb-6 shadow-sm">Certified Midwife</Badge>
                      
                      <div className="text-left space-y-4 pt-6 border-t border-slate-100">
                         <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <Briefcase className="h-4 w-4 text-slate-400" /> 
                            <div>
                               <p className="text-[10px] text-slate-400 uppercase font-bold">License ID</p>
                               <p className="font-medium text-slate-900">MW-8842</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <Building className="h-4 w-4 text-slate-400" />
                            <div>
                               <p className="text-[10px] text-slate-400 uppercase font-bold">Facility</p>
                               <p className="font-medium text-slate-900">Dawa Clinic</p>
                            </div>
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
             
             <div className="md:col-span-2">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-4">
                     <CardTitle className="text-base font-bold text-slate-800">Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 gap-5">
                       <Input label="First Name" defaultValue="Sarah" />
                       <Input label="Last Name" defaultValue="Johnson" />
                    </div>
                    <Input label="Email Address" defaultValue="sarah.j@dawa.clinic" disabled className="bg-slate-50 text-slate-500" icon={<Mail className="h-4 w-4"/>} />
                    <Input label="Phone Number" defaultValue="+254 712 345 678" icon={<Phone className="h-4 w-4"/>} />
                    <Input label="Clinic / Facility" defaultValue="Dawa Clinic" icon={<Building className="h-4 w-4"/>} />
                    
                    <div className="pt-8 flex justify-between items-center border-t border-slate-100 mt-2">
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline">Deactivate Account</button>
                      <div className="flex gap-3">
                         <Button variant="outline" className="border-slate-200">Reset Password</Button>
                         <Button className="shadow-md">Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
             </div>
          </div>
        </div>
      )}
      
      {appState === AppState.PURCHASE && <PurchaseScreen />}

      {/* Add Patient Modal */}
      <Dialog isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} title="Register New Patient">
        <form onSubmit={handleAddPatient} className="space-y-5">
          <Input name="name" label="Full Name" placeholder="e.g. Mary Wanjiku" icon={<UserCircle className="h-4 w-4" />} required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="age" label="Age" type="number" placeholder="34" required />
            <Input name="contact" label="Phone Number" placeholder="07..." icon={<Phone className="h-4 w-4" />} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Previous Medical History</label>
            <textarea className="w-full rounded-lg border border-slate-300 p-3 text-sm h-24 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow placeholder:text-slate-400" placeholder="Any relevant gynecological history, previous screenings, symptoms..."></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button type="button" variant="ghost" onClick={() => setShowAddPatient(false)}>Cancel</Button>
            <Button type="submit" className="shadow-md">Register Patient</Button>
          </div>
        </form>
      </Dialog>

    </MainLayout>
  );
}

// Simple loader component helper
function Loader2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
