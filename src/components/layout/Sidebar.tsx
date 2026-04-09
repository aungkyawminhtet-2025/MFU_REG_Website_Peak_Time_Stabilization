import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  FileSearch, 
  History, 
  UserCheck, 
  ClipboardList, 
  GraduationCap, 
  Wallet, 
  Receipt, 
  Undo2, 
  MessageSquare, 
  LogOut,
  User
} from 'lucide-react';
import { SidebarItem } from '../ui/SidebarItem';
import { CategoryHeader } from '../ui/CategoryHeader';
import { View } from '../../types';

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  expandedMenus: string[];
  toggleMenu: (menu: string) => void;
  navigateToProtectedView: (view: View) => void;
  handleLogout: () => void;
}

export function Sidebar({ 
  view, 
  setView, 
  expandedMenus, 
  toggleMenu, 
  navigateToProtectedView, 
  handleLogout 
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-mfu-border h-[calc(100vh-64px)] overflow-y-auto sticky top-16 flex flex-col">
      <nav className="py-2 flex-1 px-2 space-y-0.5">
        <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
        <SidebarItem icon={<Calendar />} label="Pre-Registration System" active={view === 'pre-reg'} onClick={() => navigateToProtectedView('pre-reg')} />
        <SidebarItem icon={<FileText />} label="Exit Examination System" active={view === 'exit-exam'} onClick={() => setView('exit-exam')} />
        
        <CategoryHeader label="General Menu" icon={<User />} isOpen={expandedMenus.includes('General Menu')} onToggle={() => toggleMenu('General Menu')} />
        {expandedMenus.includes('General Menu') && (
          <div className="bg-slate-50/30">
            <SidebarItem icon={<FileSearch />} label="Search Instructor Schedule" active={view === 'search-instructor'} onClick={() => setView('search-instructor')} isSub />
            <SidebarItem icon={<History />} label="Login History" active={view === 'login-history'} onClick={() => setView('login-history')} isSub />
            <SidebarItem icon={<UserCheck />} label="Admin Dashboard" active={view === 'admin'} onClick={() => setView('admin')} isSub />
          </div>
        )}

        <CategoryHeader label="Student Menu" icon={<GraduationCap />} isOpen={expandedMenus.includes('Student Menu')} onToggle={() => toggleMenu('Student Menu')} />
        {expandedMenus.includes('Student Menu') && (
          <div className="bg-slate-50/30">
            <SidebarItem icon={<ClipboardList />} label="Enrollment Results" active={view === 'enrollment-results'} onClick={() => setView('enrollment-results')} isSub />
            <SidebarItem icon={<Calendar />} label="Student Schedule Check" active={view === 'schedule'} onClick={() => setView('schedule')} isSub />
            <SidebarItem icon={<GraduationCap />} label="Grade Results" active={view === 'grades'} onClick={() => navigateToProtectedView('grades')} isSub />
            <SidebarItem icon={<LayoutDashboard />} label="Programme Structure" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<UserCheck />} label="Graduation Check" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Wallet />} label="Debt / Scholarship" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Receipt />} label="Payment / Receipt" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Undo2 />} label="Refund Request" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<MessageSquare />} label="Message to Student" active={false} onClick={() => {}} isSub />
          </div>
        )}
      </nav>
      
      <div className="p-2 mt-auto border-t border-mfu-border">
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-bold text-mfu-text-muted hover:text-mfu-red hover:bg-red-50 transition-colors w-full px-3 py-2 rounded-lg">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
