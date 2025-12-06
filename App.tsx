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
  ArrowUpRight, Clock, MoreVertical, RefreshCw, Play, Microscope
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
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
        <h1 className="text-5xl font-bold text-white tracking-wider drop-shadow-md">Dawa CaCx</h1>
        <p className="text-primary-200 text-sm tracking-[0.2em] uppercase font-medium">Smart Cervical Screening</p>
      </div>
      <div className="absolute bottom-12">
         <div className="h-8 w-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231127ab' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
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
            <Input label="Email or License ID" placeholder="nurse.memory@clinic.com" icon={<Mail className="h-4 w-4" />} required className="text-slate-900" />
            <div className="space-y-1">
               <Input label="Password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4" />} required className="text-slate-900" />
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
               <Input label="First Name" placeholder="Memory" required className="text-slate-900" />
               <Input label="Last Name" placeholder="Musonda" required className="text-slate-900" />
            </div>
            <Input label="Email Address" type="email" placeholder="memory@example.com" icon={<Mail className="h-4 w-4" />} required className="text-slate-900" />
            <Input label="Medical License Number" placeholder="MW-1234-5678" icon={<Briefcase className="h-4 w-4" />} required className="text-slate-900" />
            <Input label="Clinic / Facility Name" placeholder="Dawa Clinic" icon={<Building className="h-4 w-4" />} required className="text-slate-900" />
            
            <div className="pt-2">
              <Input label="Create Password" type="password" placeholder="Min. 8 characters" icon={<Lock className="h-4 w-4" />} required className="text-slate-900" />
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
              className="w-14 h-14 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all bg-slate-800 text-white placeholder-slate-500"
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

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
           <div className="h-80 flex flex-col items-center justify-center text-center">
              <div className="mb-8 p-6 bg-white/10 rounded-full backdrop-blur-sm ring-4 ring-white/10 animate-in zoom-in duration-500">
                {illustrations[currentIndex].icon}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 transition-all duration-300 min-h-[40px]">
                {illustrations[currentIndex].title}
              </h2>
              <p className="text-primary-100 text-lg leading-relaxed max-w-xs mx-auto transition-all duration-300 min-h-[60px]">
                {illustrations[currentIndex].description}
              </p>
           </div>
           
           <div className="flex justify-center gap-2 mb-12">
             {illustrations.map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-secondary-400' : 'w-2 bg-white/20'}`} />
             ))}
           </div>
        </div>
      </div>

      <div className="p-8 pb-12 bg-gradient-to-t from-[#0b186b] to-transparent relative z-10">
        <div className="max-w-md mx-auto space-y-4">
          <Button onClick={onStart} className="w-full h-14 text-lg font-semibold bg-secondary-500 hover:bg-secondary-600 text-white shadow-xl shadow-secondary-900/20 border-2 border-transparent">
            Get Started
          </Button>
          <p className="text-center text-xs text-primary-200/60 mt-4">
             v2.4.0 • Dawa Health Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.SPLASH);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.HOME);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Generate 20 patients with DM-XXXX IDs
  const [patients] = useState<Patient[]>(Array.from({ length: 20 }).map((_, i) => ({
    id: `DM-${1000 + i}`,
    name: [
      "Alice Mumba", "Beatrice Zulu", "Chipo Banda", "Dorothy Lungu", "Esther Phiri",
      "Florence Sakala", "Grace Mwape", "Hilda Tembo", "Ireen Mulenga", "Joyce Ngoma",
      "Kondwani Daka", "Lillian Chama", "Mary Soko", "Nancy Kaira", "Olive Mwanza",
      "Patricia Gondwe", "Queen Nyirenda", "Ruth Kangwa", "Sarah Mbewe", "Theresa Singogo"
    ][i],
    age: 25 + (i % 20),
    contact: "097" + Math.floor(1000000 + Math.random() * 9000000),
    status: i === 0 ? 'Suspicious' : i === 2 ? 'Suspicious' : i % 5 === 0 ? 'Pending' : 'Normal',
    riskLevel: i === 0 || i === 2 ? 'High' : 'Low',
    lastTestDate: `2025-11-${String(Math.max(1, 30 - i)).padStart(2, '0')}` // November dates
  })));

  const handleFinishSplash = () => setAppState(AppState.LOGIN);
  const handleLogin = () => setAppState(AppState.OTP);
  const handleSignup = () => setAppState(AppState.OTP); // Simplified flow
  const handleVerifyOTP = () => setAppState(AppState.GET_STARTED);
  const handleStartApp = () => setAppState(AppState.DASHBOARD);
  
  // Chart Data: June to November - Breakdown of Normal, <CIN2, CIN2+
  const screeningData = [
    { name: 'Jun', normal: 42, lowGrade: 5, highGrade: 2 },
    { name: 'Jul', normal: 55, lowGrade: 8, highGrade: 1 },
    { name: 'Aug', normal: 48, lowGrade: 6, highGrade: 3 },
    { name: 'Sep', normal: 60, lowGrade: 10, highGrade: 2 },
    { name: 'Oct', normal: 72, lowGrade: 12, highGrade: 4 },
    { name: 'Nov', normal: 65, lowGrade: 8, highGrade: 3 },
  ];

  if (appState === AppState.SPLASH) return <SplashScreen onFinish={handleFinishSplash} />;
  if (appState === AppState.LOGIN) return <LoginPage onLogin={handleLogin} onSignup={() => setAppState(AppState.SIGNUP)} onShowTerms={() => {}} />;
  if (appState === AppState.SIGNUP) return <SignupPage onSignup={handleSignup} onLogin={() => setAppState(AppState.LOGIN)} />;
  if (appState === AppState.OTP) return <OTPVerification onVerify={handleVerifyOTP} />;
  if (appState === AppState.GET_STARTED) return <GetStarted onStart={handleStartApp} onShowTerms={() => {}} />;

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === DashboardTab.HOME && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <header className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">Midwife Console</h1>
            <p className="text-slate-500 text-sm md:text-base">Welcome back, Memory. Here's today's overview.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard 
              title="Registered Patients" 
              value="5" 
              icon={<Users className="h-6 w-6" />} 
              colorClass="text-blue-600"
              trend="+12% this month"
            />
            <StatCard 
              title="Follow-Up Required" 
              value="3" 
              icon={<AlertCircle className="h-6 w-6" />} 
              colorClass="text-amber-500"
              trend="2 urgent"
            />
            {/* Credits Tile - Matches StatCard Layout but with Custom Colors */}
            <Card className="hover:shadow-md transition-shadow border-slate-100 h-full">
              <CardContent className="p-5 pt-8 pb-6 md:p-8 md:pt-10 md:pb-8 flex flex-col items-center justify-center text-center h-full gap-4 md:gap-6">
                <div className="mt-2 p-4 rounded-full bg-secondary-50 text-secondary-600 bg-opacity-10 ring-1 ring-black/5">
                  <CreditCard className="h-6 w-6" />
                </div>
                {/* Horizontal Layout matching StatCard: Value + Title */}
                <div className="flex items-center gap-3 mt-1 justify-center w-full">
                    <span className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">124</span>
                    <h3 className="text-slate-600 font-medium text-base md:text-lg leading-tight text-left max-w-[120px]">Available Credits</h3>
                </div>
                
                <Button
                    onClick={() => setShowPurchaseModal(true)}
                    className="mt-1 bg-primary-600 text-white hover:bg-primary-700 shadow-sm w-full max-w-[160px] rounded-full h-9 text-sm font-medium border-2 border-transparent hover:border-primary-200"
                >
                    Top Up Credits
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-primary-600" />
                  Screening Activity
                </CardTitle>
                <p className="text-xs md:text-sm text-slate-500">Overview of screening results (Jun - Nov)</p>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] md:h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={screeningData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} stackOffset="sign">
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f1f5f9' }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Bar dataKey="normal" name="Normal" stackId="a" fill="#46c741" radius={[0, 0, 4, 4]} barSize={28} />
                      <Bar dataKey="lowGrade" name="< CIN2" stackId="a" fill="#f59e0b" barSize={28} />
                      <Bar dataKey="highGrade" name="CIN2+" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-slate-800 text-lg">Recent Patients</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary-600 h-8 text-xs">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-100">
                   {patients.slice(0, 5).map((p) => (
                     <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm ${
                             p.status === 'Suspicious' ? 'bg-red-50 text-red-600' : 
                             p.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-primary-50 text-primary-600'
                           }`}>
                              {p.name.charAt(0)}
                           </div>
                           <div>
                             <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">{p.name}</p>
                             <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{p.id}</p>
                           </div>
                        </div>
                        <Badge variant={p.status === 'Suspicious' ? 'danger' : p.status === 'Pending' ? 'warning' : 'success'}>
                          {p.status}
                        </Badge>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
              <p className="text-slate-500 text-sm">Manage and track your patient records.</p>
            </div>
            <Button className="gap-2 w-full md:w-auto">
              <Plus size={16} /> New Patient
            </Button>
          </div>

          <Card className="border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  placeholder="Search by name, ID or phone..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-900"
                />
              </div>
              <Button variant="outline" className="gap-2 text-slate-600 w-full md:w-auto">
                <Filter size={14} /> Filter
              </Button>
            </div>
            <div className="overflow-x-auto">
              {/* Added min-w to force horizontal scroll on small devices instead of squashing */}
              <table className="w-full text-sm text-left min-w-[800px]">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Patient Details</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Last Screened</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Risk Profile</th>
                    <th className="px-6 py-3 font-medium text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{patient.name}</span>
                          <span className="text-xs text-slate-500">{patient.id} • {patient.age} yrs</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {patient.lastTestDate || "Never"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={patient.status === 'Suspicious' ? 'danger' : patient.status === 'Pending' ? 'warning' : 'success'}>
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-1.5">
                            <div className={`h-2 w-2 rounded-full ${patient.riskLevel === 'High' ? 'bg-red-500' : 'bg-green-500'}`} />
                            <span className="text-slate-700">{patient.riskLevel} Risk</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-primary-600">
                          View <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === DashboardTab.HISTORY && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Screening History</h1>
            <p className="text-slate-500">Archive of all past VIA tests and AI analysis results.</p>
          </header>
          
          <Card className="border-slate-200 shadow-sm">
             <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[800px]">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Date</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Patient</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">Result</th>
                    <th className="px-6 py-3 font-medium whitespace-nowrap">AI Confidence</th>
                    <th className="px-6 py-3 font-medium text-right whitespace-nowrap">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {[1,2,3,4,5].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 text-slate-900 font-medium whitespace-nowrap">Nov {20-i}, 2025</td>
                         <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                           {patients[i].name} <span className="text-slate-400 text-xs block">{patients[i].id}</span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={i === 2 ? 'danger' : 'success'}>{i === 2 ? 'Suspicious' : 'Normal'}</Badge>
                         </td>
                         <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                            {i === 2 ? '89%' : '94%'}
                         </td>
                         <td className="px-6 py-4 text-right whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="text-primary-600">
                               <FileText size={14} className="mr-1" /> PDF
                            </Button>
                         </td>
                      </tr>
                   ))}
                </tbody>
              </table>
             </div>
          </Card>
        </div>
      )}

      {activeTab === DashboardTab.PROFILE && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <header className="mb-6 md:mb-8">
            <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-500">Manage your account settings and preferences.</p>
          </header>

          <Card className="max-w-2xl border-slate-200 shadow-sm">
             <CardHeader className="border-b border-slate-100 pb-6">
               <div className="flex items-center gap-4">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xl md:text-2xl font-bold ring-4 ring-white shadow-sm">
                    MM
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900">Memory Musonda</h2>
                    <p className="text-sm md:text-base text-slate-500">Certified Midwife • Dawa Clinic</p>
                    <Badge className="mt-2 bg-primary-50 text-primary-700 border-primary-100">Verified Account</Badge>
                  </div>
               </div>
             </CardHeader>
             <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Input label="Full Name" value="Memory Musonda" readOnly className="bg-slate-50" />
                   <Input label="License Number" value="MW-1234-5678" readOnly className="bg-slate-50" icon={<Briefcase size={14}/>} />
                   <Input label="Email Address" value="memory.musonda@dawahealth.zm" readOnly className="bg-slate-50" icon={<Mail size={14}/>} />
                   <Input label="Phone Number" value="+260 97 123 4567" readOnly className="bg-slate-50" icon={<Phone size={14}/>} />
                   <Input label="Clinic / Facility" value="Dawa Clinic, Lusaka" readOnly className="bg-slate-50" icon={<Building size={14}/>} />
                   <Input label="Role" value="Senior Midwife" readOnly className="bg-slate-50" />
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                   <h3 className="font-semibold text-slate-900 mb-4">Account Settings</h3>
                   <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start text-slate-600">
                         Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-slate-600">
                         Notification Preferences
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                         Sign Out
                      </Button>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>
      )}

      <Dialog isOpen={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} title="Top Up Screening Credits">
         <div className="space-y-4">
            <p className="text-slate-600 text-sm">Purchase additional AI analysis credits. Secure payment via Mobile Money or Card.</p>
            
            <div className="grid grid-cols-2 gap-4 my-6">
               <div className="border-2 border-primary-100 bg-primary-50 rounded-xl p-4 cursor-pointer hover:border-primary-500 transition-all text-center">
                  <div className="text-lg font-bold text-primary-900">50 Credits</div>
                  <div className="text-slate-500 text-xs mb-2">Starter Pack</div>
                  <div className="text-xl font-bold text-secondary-600">$10</div>
               </div>
               <div className="border-2 border-primary-500 bg-white rounded-xl p-4 cursor-pointer shadow-md text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-secondary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">POPULAR</div>
                  <div className="text-lg font-bold text-primary-900">100 Credits</div>
                  <div className="text-slate-500 text-xs mb-2">Standard Pack</div>
                  <div className="text-xl font-bold text-secondary-600">$18</div>
               </div>
            </div>

            <Button className="w-full bg-primary-600 h-12">Proceed to Payment</Button>
         </div>
      </Dialog>
    </MainLayout>
  );
}

// Updated StatCard with Professional Centered Look and Mobile Responsiveness
const StatCard = ({ title, value, icon, colorClass, trend }: any) => (
  <Card className="hover:shadow-md transition-shadow border-slate-100 h-full">
    <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center h-full gap-4">
         <div className={`p-4 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '50').replace('500', '50')} ${colorClass} bg-opacity-10 ring-1 ring-black/5`}>
           {icon}
         </div>
         <div className="flex items-center gap-3 mt-1">
            <span className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{value}</span>
            <h3 className="text-slate-600 font-medium text-base md:text-lg leading-tight text-left max-w-[120px]">{title}</h3>
         </div>
         {trend && (
           <div className="mt-1">
             <span className="text-xs text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100">{trend}</span>
           </div>
         )}
    </CardContent>
  </Card>
);
