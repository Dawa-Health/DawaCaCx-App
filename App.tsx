
import React, { useState, useEffect } from 'react';
import { AppState, DashboardTab, Patient, VIATestRecord } from './types';
import { MainLayout } from './components/Layout';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Dialog } from './components/UIComponents';
import { Logo } from './components/Logo';
import { 
  Users, Activity, Calendar, Search, Plus, Filter, 
  ChevronRight, Camera, CheckCircle2, AlertCircle, ShoppingCart, 
  CreditCard, ArrowRight, ShieldCheck, Mail, Lock, Phone,
  Stethoscope, HeartPulse, ScanLine, History, ArrowLeft, FileText, Globe, UserPlus, Briefcase, Building, UserCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
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
  { id: '1', name: 'Mary Wanjiku', age: 34, contact: '0712345678', lastTestDate: '2023-10-15', status: 'Normal', riskLevel: 'Low' },
  { id: '2', name: 'Grace Ochieng', age: 42, contact: '0722345678', lastTestDate: '2023-09-20', status: 'Suspicious', riskLevel: 'High' },
  { id: '3', name: 'Esther Kamau', age: 29, contact: '0732345678', status: 'Untested', riskLevel: 'Medium' },
  { id: '4', name: 'Sarah Hassan', age: 38, contact: '0742345678', lastTestDate: '2023-10-01', status: 'Pending', riskLevel: 'Low' },
  { id: '5', name: 'Jane Doe', age: 45, contact: '0752345678', status: 'Untested', riskLevel: 'High' },
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

const ScreeningCreditCard = ({ onPurchase }: { onPurchase: () => void }) => (
  <Card className="bg-gradient-to-br from-primary-700 to-primary-900 text-white border-none shadow-xl relative overflow-hidden group">
    <div className="absolute top-[-20px] right-[-20px] p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      <Logo className="h-48 w-48" outlineColor="#ffffff" />
    </div>
    <CardContent className="pt-6 relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-primary-100 font-medium mb-1 text-sm tracking-wide">AVAILABLE CREDITS</p>
          <h3 className="text-4xl font-bold tracking-tight">124</h3>
        </div>
        <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
          <Activity className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="text-sm text-primary-100 mb-6 opacity-90 font-light">
        Each VIA test consumes 1 credit. Low balance alert at 20.
      </p>
      <Button 
        onClick={onPurchase}
        className="w-full bg-white text-primary-800 hover:bg-primary-50 border-none font-bold shadow-md h-10"
      >
        Purchase Credits
      </Button>
    </CardContent>
  </Card>
);

const PatientsList = ({ patients, onSelect }: { patients: Patient[], onSelect: (p: Patient) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-slate-500">
      <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 font-semibold">Patient Name</th>
          <th className="px-6 py-4 font-semibold">Diagnosis Status</th>
          <th className="px-6 py-4 font-semibold">Last Screening</th>
          <th className="px-6 py-4 font-semibold">Risk Level</th>
          <th className="px-6 py-4 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {patients.map((patient) => (
          <tr key={patient.id} className="bg-white hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-900">
              <div className="flex flex-col">
                <span className="text-base font-semibold">{patient.name}</span>
                <span className="text-xs text-slate-400 mt-0.5">Age: {patient.age} • ID: #{patient.id.substring(0,4)}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <Badge variant={patient.status === 'Normal' ? 'success' : patient.status === 'Suspicious' ? 'danger' : 'default'} className="px-3 py-1">
                {patient.status}
              </Badge>
            </td>
            <td className="px-6 py-4 text-slate-600">
              {patient.lastTestDate || <span className="text-slate-400 italic">No previous records</span>}
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider ${
                patient.riskLevel === 'High' ? 'text-red-600' : 
                patient.riskLevel === 'Medium' ? 'text-amber-600' : 'text-green-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  patient.riskLevel === 'High' ? 'bg-red-500' : 
                  patient.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                }`}></span>
                {patient.riskLevel}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <Button size="sm" variant="outline" onClick={() => onSelect(patient)} className="h-8 text-xs font-medium bg-white hover:bg-slate-50 border-slate-200">
                View Record
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
    const newPatient: Patient = {
      id: Math.random().toString().substr(2, 6),
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
        setViaStep(2); // Move to analysis step
        setIsAnalyzing(true);
        const result = await analyzeVIAImage(base64);
        setViaAnalysis(result);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="border-b px-6 py-4 flex justify-between items-center bg-white shadow-sm z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary-600" />
              VIA Examination
            </h2>
            <p className="text-sm text-slate-500">Patient: <span className="font-semibold text-slate-700">{activePatient?.name || 'Unknown'}</span></p>
          </div>
          <Button variant="ghost" onClick={cancelTest}>Close</Button>
        </div>

        <div className="flex-1 overflow-auto p-6 max-w-4xl mx-auto w-full bg-slate-50">
          {/* Progress Stepper */}
          <div className="flex justify-between mb-8 relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
            {['Preparation', 'Capture Image', 'AI Analysis', 'Final Report'].map((step, idx) => (
              <div key={step} className={`flex flex-col items-center gap-2 px-2 bg-slate-50`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${idx <= viaStep ? 'bg-primary-600 text-white scale-110' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold ${idx <= viaStep ? 'text-primary-700' : 'text-slate-400'}`}>{step}</span>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
          {viaStep === 0 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Examination Checklist</CardTitle>
                  <p className="text-slate-500 text-sm">Please confirm the following before proceeding.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    'Explain VIA procedure to the patient', 
                    'Prepare 5% Acetic Acid solution (freshly made)', 
                    'Ensure examination light source is adequate', 
                    'Position patient comfortably in lithotomy position',
                    'Clean cervix with saline before applying acetic acid'
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-gray-300" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>
              <div className="flex justify-end">
                 <Button onClick={() => setViaStep(1)} className="h-12 px-8 text-base shadow-lg shadow-primary-500/20">
                    Checklist Complete & Continue <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </div>
            </div>
          )}

          {viaStep === 1 && (
            <div className="space-y-6 text-center">
              <div className="border-2 border-dashed border-primary-200 rounded-2xl p-16 bg-white hover:bg-primary-50/30 transition-colors group cursor-pointer relative">
                <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="camera-input" />
                <div className="flex flex-col items-center gap-6 pointer-events-none">
                  <div className="bg-primary-100 p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Camera className="h-12 w-12 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Capture Cervix Image</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                      Wait 1 minute after applying acetic acid. Ensure the cervix is clearly visible, in focus, and well-lit.
                    </p>
                  </div>
                  <Button variant="outline" className="pointer-events-none">Select from Device / Camera</Button>
                </div>
              </div>
            </div>
          )}

          {viaStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Camera className="h-4 w-4" /> Captured Image
                  </h3>
                  <div className="relative group rounded-xl overflow-hidden shadow-md">
                     <img src={viaImage || ''} alt="Cervix" className="w-full h-auto object-cover" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline" onClick={() => setViaStep(1)} className="text-white border-white hover:bg-white hover:text-black">Retake Photo</Button>
                     </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary-600" /> 
                    AI Analysis Result
                  </h3>
                  <Card className="bg-white border-primary-100 shadow-sm h-full overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-primary-400 to-secondary-400"></div>
                    <CardContent className="pt-6">
                      {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-12 text-primary-700">
                          <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary-500" />
                          <p className="font-medium animate-pulse">Running MedSigLIP Analysis...</p>
                          <p className="text-xs text-slate-400 mt-2">Processing visual indicators</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="prose prose-sm prose-slate max-w-none bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                              {viaAnalysis}
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex gap-3 items-start">
                             <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                             <p className="text-xs text-amber-800">
                               <strong>Clinical Note:</strong> This AI assessment is for support only. Please combine with your visual inspection findings before diagnosis.
                             </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-200">
                <Button variant="outline" onClick={() => setViaStep(1)} className="flex-1 h-12">Discard & Retake</Button>
                <Button onClick={() => setViaStep(3)} className="flex-1 h-12 shadow-lg shadow-primary-500/20" disabled={isAnalyzing}>Confirm & Record Findings</Button>
              </div>
            </div>
          )}
          
          {viaStep === 3 && (
            <div className="space-y-8 max-w-md mx-auto text-center pt-12 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Result Recorded Successfully</h2>
                <p className="text-slate-500 mt-2">The screening data has been securely saved to <span className="font-medium text-slate-900">{activePatient?.name}</span>'s medical record.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Facility</span>
                    <span className="font-medium">Dawa Clinic</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Performed By</span>
                    <span className="font-medium">Sarah Johnson (Midwife)</span>
                 </div>
              </div>
              <Button onClick={cancelTest} className="w-full h-12 text-base">Return to Patient Registry</Button>
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
          <Card key={pkg.label} className={`relative hover:border-primary-500 hover:shadow-lg transition-all cursor-pointer group ${pkg.popular ? 'border-primary-500 ring-1 ring-primary-500 bg-primary-50/10' : ''}`}>
             {pkg.popular && <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-wider">Most Popular</div>}
             <CardContent className="text-center py-10 px-6">
               <h3 className="text-lg font-bold text-slate-800">{pkg.label}</h3>
               <p className="text-xs text-slate-400 mb-6">{pkg.desc}</p>
               <div className="flex items-center justify-center gap-1 my-6">
                  <span className="text-5xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{pkg.qty}</span>
                  <span className="text-sm font-medium text-slate-500 self-end mb-2">Credits</span>
               </div>
               <div className="text-xl font-semibold text-primary-600 mb-8 bg-slate-50 py-2 rounded-lg">{pkg.price}</div>
               <Button className="w-full h-10 shadow-sm" variant={pkg.popular ? 'primary' : 'outline'}>Select Package</Button>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-slate-200/60">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Midwife Console</h1>
              <p className="text-slate-500 mt-1">Good Morning, <span className="font-semibold text-slate-700">Sarah Johnson</span></p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => { setActiveTab(DashboardTab.PATIENTS); setShowAddPatient(true); }} className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> New Registration
              </Button>
              <Button onClick={() => startViaTest()} variant="success" className="shadow-md shadow-green-200">
                <Camera className="mr-2 h-4 w-4" /> Start Screening
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScreeningCreditCard onPurchase={() => setAppState(AppState.PURCHASE)} />
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Registered Patients</p>
                      <h3 className="text-3xl font-bold mt-2 text-slate-900">{patients.length}</h3>
                      <div className="flex items-center mt-2 text-xs text-secondary-600 font-medium bg-secondary-50 inline-block px-2 py-1 rounded-md">
                        <Activity className="h-3 w-3 mr-1 inline" /> +12% this month
                      </div>
                   </div>
                   <div className="bg-primary-50 p-3 rounded-xl"><Users className="text-primary-600 h-6 w-6"/></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow border-amber-100">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Follow-Up Required</p>
                      <h3 className="text-3xl font-bold mt-2 text-slate-900">3</h3>
                      <div className="flex items-center mt-2 text-xs text-amber-700 font-medium bg-amber-50 inline-block px-2 py-1 rounded-md">
                        <AlertCircle className="h-3 w-3 mr-1 inline" /> Suspicious findings
                      </div>
                   </div>
                   <div className="bg-amber-50 p-3 rounded-xl"><Activity className="text-amber-600 h-6 w-6"/></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
               <CardHeader className="border-b border-slate-100 pb-4">
                 <CardTitle className="text-base font-bold text-slate-800">Monthly Screening Activity</CardTitle>
               </CardHeader>
               <CardContent className="pt-6">
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA}>
                        <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                          cursor={{fill: '#f1f5f9'}}
                        />
                        <Bar dataKey="tests" fill="#1127ab" radius={[4, 4, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
               </CardContent>
            </Card>

            <Card className="shadow-sm">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold text-slate-800">Recent Patients</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab(DashboardTab.PATIENTS)} className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">View All</Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                 <div className="divide-y divide-slate-100">
                    {patients.slice(0, 4).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors group" onClick={() => { setActivePatient(p); setActiveTab(DashboardTab.PATIENTS); }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 shadow-sm">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-primary-700">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.lastTestDate ? `Screened: ${p.lastTestDate}` : 'No screening yet'}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary-400" />
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
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
               <p className="text-slate-500 text-sm mt-1">Dawa Clinic • Total: {patients.length}</p>
            </div>
            <Button onClick={() => setShowAddPatient(true)} className="shadow-md"><Plus className="mr-2 h-4 w-4" /> Add New Patient</Button>
          </div>
          
          <div className="flex gap-4">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input type="text" placeholder="Search by name, ID or phone..." className="w-full pl-10 h-11 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none focus:border-transparent" />
             </div>
             <Button variant="outline" className="border-slate-200 text-slate-600 bg-white"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>

          <Card className="overflow-hidden shadow-sm border-slate-200">
            <PatientsList 
              patients={patients} 
              onSelect={(p) => {
                setActivePatient(p);
                // In a real app, this might open a detail view. For now, let's start a test.
                startViaTest(p);
              }} 
            />
          </Card>
        </div>
      )}
      
      {activeTab === DashboardTab.HISTORY && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">Screening History</h1>
           <Card className="bg-slate-50 border-dashed border-2 border-slate-200 shadow-none">
             <CardContent className="py-20 text-center text-slate-500">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                   <History className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">No Records Found</h3>
                <p className="max-w-md mx-auto mb-6 text-sm">You haven't performed any screenings in this period. Start a new test from the dashboard.</p>
                <Button onClick={() => setActiveTab(DashboardTab.HOME)} variant="outline">Go to Dashboard</Button>
             </CardContent>
           </Card>
        </div>
      )}

      {activeTab === DashboardTab.PROFILE && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
          <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">Professional Profile</h1>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="md:col-span-1">
                <Card className="text-center h-full">
                   <CardContent className="pt-8">
                      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-3xl font-bold text-primary-700 border-4 border-white shadow-lg mx-auto mb-4">
                        SJ
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Sarah Johnson</h2>
                      <Badge className="mt-2 mb-4">Certified Midwife</Badge>
                      
                      <div className="text-left space-y-3 mt-6 pt-6 border-t border-slate-100">
                         <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Briefcase className="h-4 w-4 text-slate-400" /> License: MW-8842
                         </div>
                         <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Building className="h-4 w-4 text-slate-400" /> Dawa Clinic
                         </div>
                         <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Mail className="h-4 w-4 text-slate-400" /> sarah.j@dawa.clinic
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
             
             <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <Input label="First Name" defaultValue="Sarah" />
                       <Input label="Last Name" defaultValue="Johnson" />
                    </div>
                    <Input label="Email Address" defaultValue="sarah.j@dawa.clinic" disabled className="bg-slate-50" />
                    <Input label="Phone Number" defaultValue="+254 712 345 678" />
                    <Input label="Clinic / Facility" defaultValue="Dawa Clinic" />
                    
                    <div className="pt-6 flex justify-between items-center">
                      <a href="#" className="text-sm text-red-600 hover:underline">Deactivate Account</a>
                      <div className="flex gap-3">
                         <Button variant="outline">Reset Password</Button>
                         <Button>Save Changes</Button>
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
            <textarea className="w-full rounded-lg border border-slate-300 p-3 text-sm h-24 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow" placeholder="Any relevant gynecological history, previous screenings, symptoms..."></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setShowAddPatient(false)}>Cancel</Button>
            <Button type="submit">Register Patient</Button>
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
