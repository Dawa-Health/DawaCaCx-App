
import React from 'react';
import { DashboardTab } from '../types';
import { Home, Users, History, UserCircle, LogOut } from 'lucide-react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export const MainLayout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" outlineColor="#1127ab" />
          <span className="font-bold text-lg text-primary-900 tracking-tight">Dawa CaCx</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs">
          MM
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-slate-200 h-screen sticky top-0 z-20">
        <div className="h-20 flex items-center gap-3 px-8 border-b border-slate-100/50">
          <Logo className="h-9 w-9" outlineColor="#1127ab" />
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg text-primary-900 leading-tight">Dawa CaCx</span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Midwife Console</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            active={activeTab === DashboardTab.HOME} 
            onClick={() => onTabChange(DashboardTab.HOME)} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Patient Registry" 
            active={activeTab === DashboardTab.PATIENTS} 
            onClick={() => onTabChange(DashboardTab.PATIENTS)} 
          />
          <SidebarItem 
            icon={<History size={20} />} 
            label="Screening History" 
            active={activeTab === DashboardTab.HISTORY} 
            onClick={() => onTabChange(DashboardTab.HISTORY)} 
          />
          <SidebarItem 
            icon={<UserCircle size={20} />} 
            label="My Profile" 
            active={activeTab === DashboardTab.PROFILE} 
            onClick={() => onTabChange(DashboardTab.PROFILE)} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
              MM
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-slate-900 truncate">Memory Musonda</span>
              <span className="text-xs text-slate-500 truncate">Dawa Clinic</span>
            </div>
            <LogOut size={16} className="ml-auto text-slate-400 hover:text-red-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24 md:pb-0 bg-slate-50/50">
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-30 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <MobileNavItem 
          icon={<Home size={22} />} 
          label="Home" 
          active={activeTab === DashboardTab.HOME} 
          onClick={() => onTabChange(DashboardTab.HOME)} 
        />
        <MobileNavItem 
          icon={<Users size={22} />} 
          label="Patients" 
          active={activeTab === DashboardTab.PATIENTS} 
          onClick={() => onTabChange(DashboardTab.PATIENTS)} 
        />
        <MobileNavItem 
          icon={<History size={22} />} 
          label="History" 
          active={activeTab === DashboardTab.HISTORY} 
          onClick={() => onTabChange(DashboardTab.HISTORY)} 
        />
        <MobileNavItem 
          icon={<UserCircle size={22} />} 
          label="Profile" 
          active={activeTab === DashboardTab.PROFILE} 
          onClick={() => onTabChange(DashboardTab.PROFILE)} 
        />
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
      active 
        ? "bg-primary-50/80 text-primary-700 shadow-sm" 
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-primary-600" />}
    <span className={`transition-colors ${active ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
      {icon}
    </span>
    {label}
  </button>
);

const MobileNavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg flex-1 transition-all ${
      active ? "text-primary-600 bg-primary-50" : "text-slate-400 hover:text-slate-600"
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);
