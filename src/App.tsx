/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
// import React;
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Mail,
  Bell,
  LogOut,
  Calendar,
  FileText,
  GraduationCap,
  CreditCard,
  History,
  UserCheck,
  FileSearch,
  Wallet,
  Receipt,
  Undo2,
  MessageSquare,
  Eye,
  EyeOff,
  ChevronRight,
  Download,
  Info,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';
import { MOCK_COURSES, FACULTIES } from './constants';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'login' | 'dashboard' | 'schedule' | 'grades' | 'pre-reg' | 'exit-exam' | 'admin' | 'queue';

interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  day: string;
  time: string;
  credits: number;
  capacity: number;
  remainingSeats: number;
}

interface Registration {
  courseId: string;
  timestamp: string;
}

interface Activity {
  list: string;
  firstDay: string;
  lastDay: string;
}

interface GradeRecord {
  code: string;
  name: string;
  credit: string;
  grade: string;
}

interface ScheduleItem {
  code: string;
  type: string;
  section: string;
  room: string;
  day: number; // 0: Mo, 1: Tu, etc.
  start: number; // hour
  duration: number; // hours
}

// --- Mock Data ---

const ACTIVITIES: Record<string, Activity[]> = {
  '2/2568': [
    { list: 'Announcement of the 3rd exit examination result', firstDay: '01 Apr 2026', lastDay: '01 Apr 2026' },
    { list: 'Announcement of Final examination rooms', firstDay: '06 Apr 2026', lastDay: '06 Apr 2026' },
    { list: 'Announcement of eligible students of the 4th exit examination', firstDay: '17 Apr 2026', lastDay: '17 Apr 2026' },
    { list: 'Payment of the 4th exit examination fee', firstDay: '17 Apr 2026', lastDay: '23 Apr 2026' },
    { list: 'Last day of classes', firstDay: '26 Apr 2026', lastDay: '26 Apr 2026' },
    { list: 'Final Examinations', firstDay: '27 Apr 2026', lastDay: '08 May 2026' },
  ],
  '3/2568': [
    { list: 'Announcement of class and examination schedule', firstDay: '23 Apr 2026', lastDay: '23 Apr 2026' },
  ]
};

const GRADES: GradeRecord[] = [
  { code: '1006134', name: 'English for Communication 1', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1101105', name: 'Sciences and Mathematics All Around', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1301118', name: 'Introduction to Digital Technology and Data Science', credit: '3 (2-2-5)', grade: 'A' },
  { code: '1501115', name: 'Computer Engineering Essentials', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1501116', name: 'Computer Programming', credit: '3 (2-2-5)', grade: 'A' },
  { code: '1800001', name: 'Psychology in Daily Life', credit: '3 (3-0-6)', grade: 'A' },
];

const SCHEDULE: ScheduleItem[] = [
  { code: '1305102', type: 'LECT-1', section: 'E4 A 618', room: 'E4 A 618', day: 0, start: 9, duration: 3 },
  { code: '1305104', type: 'LECT-1', section: 'E3 B 102', room: 'E3 B 102', day: 0, start: 13, duration: 3 },
  { code: '1006135', type: 'LECT-33', section: 'C2 308', room: 'C2 308', day: 1, start: 13, duration: 3 },
  { code: '1501114', type: 'LECT-2', section: 'E4 A 811', room: 'E4 A 811', day: 2, start: 9, duration: 3 },
  { code: '1305104', type: 'LAB-1', section: 'S1 401', room: 'S1 401', day: 2, start: 13, duration: 3 },
];

// --- Components ---

export default function App() {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['General Menu', 'Student Menu']);
  const [showPassword, setShowPassword] = useState(false);

  // Peak Mode & Queue State
  const [isPeakMode, setIsPeakMode] = useState(false);
  const [isQueued, setIsQueued] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [eta, setEta] = useState(0);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  // Registration State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'info' | 'success' | 'error' }[]>([]);

  // Admin State
  const [systemMetrics, setSystemMetrics] = useState({
    traffic: [
      { time: '09:00', value: 400 },
      { time: '10:00', value: 800 },
      { time: '11:00', value: 1200 },
      { time: '12:00', value: 900 },
      { time: '13:00', value: 1500 },
      { time: '14:00', value: 2100 },
    ],
    errors: 0.02,
    activeUsers: 1242
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const addNotification = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    if (isQueued && queuePosition > 0) {
      const timer = setInterval(() => {
        setQueuePosition(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setHasAccessToken(true);
            setIsQueued(false);
            addNotification('It is your turn! Access granted.', 'success');
            return 0;
          }
          return prev - Math.floor(Math.random() * 5 + 1);
        });
        setEta(prev => Math.max(0, prev - 0.5));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isQueued, queuePosition]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ id: '6831503002', name: 'Mr. Aung Kyaw Min Htet', email: '6831503002@lamduan.mfu.ac.th' });
    setView('dashboard');
    addNotification('Logged in successfully via MFU SSO', 'success');
  };

  const navigateToProtectedView = (targetView: View) => {
    if (isPeakMode && !hasAccessToken && (targetView === 'pre-reg' || targetView === 'grades')) {
      setQueuePosition(Math.floor(Math.random() * 100 + 50));
      setEta(Math.floor(Math.random() * 10 + 5));
      setIsQueued(true);
      setView('queue');
    } else {
      setView(targetView);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  const renderLogin = () => (
    <div className="min-h-screen flex flex-col bg-mfu-bg">
      <header className="h-16 bg-white border-b border-mfu-border flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/th/thumb/a/a2/Mae_Fah_Luang_University_Logo.png/220px-Mae_Fah_Luang_University_Logo.png" alt="MFU" className="h-10" referrerPolicy="no-referrer" />
          <div>
            <h1 className="text-lg font-bold text-mfu-text-main leading-tight">PORTAL.MFU</h1>
            <p className="text-[10px] text-mfu-text-muted uppercase tracking-widest font-bold">Registrar System</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-mfu-red">
          <button className="hover:underline">EN</button>
          <span className="text-mfu-border">|</span>
          <button className="text-mfu-text-muted hover:underline">TH</button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white p-12 border border-mfu-border shadow-sm text-center"
        >
          <h2 className="text-4xl font-medium text-mfu-text-main mb-12">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Username" 
                className="mfu-input border-mfu-red/30 focus:border-mfu-red h-12"
                required
              />
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="mfu-input border-mfu-red/30 focus:border-mfu-red h-12 pr-10"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="text-right">
              <button type="button" className="text-sm text-mfu-red hover:underline">Forgot <span className="font-bold">Password?</span></button>
            </div>
            
            <button type="submit" className="w-40 mx-auto flex items-center justify-center gap-2 border border-mfu-red rounded-full py-2 text-mfu-red font-bold hover:bg-mfu-red hover:text-white transition-all">
              <img src="https://portal.mfu.ac.th/login/assets/img/sso-icon.png" alt="SSO" className="w-5 h-5" referrerPolicy="no-referrer" />
              MFU SSO
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );

  const renderTopNav = () => (
    <header className="h-16 bg-white border-b border-mfu-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="https://upload.wikimedia.org/wikipedia/th/thumb/a/a2/Mae_Fah_Luang_University_Logo.png/220px-Mae_Fah_Luang_University_Logo.png" alt="MFU" className="h-10" referrerPolicy="no-referrer" />
        <div>
          <h1 className="text-lg font-bold text-mfu-text-main leading-tight">REG.MFU</h1>
          <p className="text-[10px] text-mfu-text-muted uppercase tracking-widest font-bold">Registrar System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-bold text-mfu-red">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <Globe size={14} />
            <span>EN</span>
          </div>
          <span className="text-mfu-border">|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-mfu-text-muted">
            <span>TH</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-mfu-border">
          <div className="text-right">
            <p className="text-xs font-bold text-mfu-red leading-none mb-1">{user?.id}</p>
            <p className="text-[11px] font-medium text-mfu-text-main">{user?.name}</p>
          </div>
          <div className="relative group">
            <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" className="w-10 h-10 rounded-full border border-mfu-border cursor-pointer" referrerPolicy="no-referrer" />
            <ChevronDown size={14} className="absolute -right-1 bottom-0 bg-white rounded-full border border-mfu-border" />
          </div>
        </div>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside className="w-64 bg-white border-r border-mfu-border h-[calc(100vh-64px)] overflow-y-auto sticky top-16 flex flex-col">
      <nav className="py-4 flex-1">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
        <SidebarItem icon={<Calendar size={18} />} label="Pre-Registration System" active={view === 'pre-reg'} onClick={() => navigateToProtectedView('pre-reg')} />
        <SidebarItem icon={<FileText size={18} />} label="Exit Examination System (NEW)" active={view === 'exit-exam'} onClick={() => setView('exit-exam')} />
        
        <CategoryHeader label="General Menu" isOpen={expandedMenus.includes('General Menu')} onToggle={() => toggleMenu('General Menu')} />
        {expandedMenus.includes('General Menu') && (
          <div className="bg-slate-50/30">
            <SidebarItem icon={<FileSearch size={18} />} label="Search Instructor Schedule" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<History size={18} />} label="Login History" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<UserCheck size={18} />} label="Admin Dashboard" active={view === 'admin'} onClick={() => setView('admin')} isSub />
          </div>
        )}

        <CategoryHeader label="Student Menu" isOpen={expandedMenus.includes('Student Menu')} onToggle={() => toggleMenu('Student Menu')} />
        {expandedMenus.includes('Student Menu') && (
          <div className="bg-slate-50/30">
            <SidebarItem icon={<ClipboardList size={18} />} label="Enrollment Results" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Calendar size={18} />} label="Student Schedule Check" active={view === 'schedule'} onClick={() => setView('schedule')} isSub />
            <SidebarItem icon={<GraduationCap size={18} />} label="Grade Results" active={view === 'grades'} onClick={() => navigateToProtectedView('grades')} isSub />
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Programme Structure" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<UserCheck size={18} />} label="Graduation Check" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Wallet size={18} />} label="Debt / Scholarship" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Receipt size={18} />} label="Payment / Receipt" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<Undo2 size={18} />} label="Refund Request" active={false} onClick={() => {}} isSub />
            <SidebarItem icon={<MessageSquare size={18} />} label="Message to Student" active={false} onClick={() => {}} isSub />
          </div>
        )}
      </nav>
      
      <div className="p-4 mt-auto border-t border-mfu-border">
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-bold text-mfu-text-muted hover:text-mfu-red transition-colors w-full px-4 py-2">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-medium text-mfu-text-main">Monthly Activities Month : March, 2026</h2>
            <div className="p-12 bg-white border border-mfu-border rounded-xl flex flex-col items-center justify-center text-mfu-text-muted gap-4">
              <Calendar size={48} className="opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">Data not found for this month</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-medium text-mfu-text-main">Monthly Activities Month : April, 2026</h2>
            
            {['Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree'].map((degree, dIdx) => (
              <div key={degree} className="mfu-card overflow-hidden">
                <div className="mfu-accordion-header bg-slate-50/50">
                  <span className="font-bold">{degree}</span>
                  <ChevronUp size={20} />
                </div>
                
                {dIdx === 0 && (
                  <div className="p-6 space-y-8">
                    {Object.entries(ACTIVITIES).map(([term, items]) => (
                      <div key={term} className="space-y-3">
                        <div className="flex items-center gap-2 text-mfu-red">
                          <div className="w-1 h-4 bg-mfu-red rounded-full" />
                          <h3 className="font-bold text-mfu-text-main">Academic Year {term}</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="mfu-table">
                            <thead>
                              <tr>
                                <th className="w-1/2">Activity List</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="text-sm">{item.list}</td>
                                  <td className="text-sm font-medium">{item.firstDay}</td>
                                  <td className="text-sm font-medium">{item.lastDay}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="mfu-card p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full border-4 border-mfu-red/20 p-1">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aung" 
                  alt="Profile" 
                  className="w-full h-full rounded-full bg-slate-100"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-mfu-text-main">{user?.name}</h3>
                <p className="text-sm font-bold text-mfu-red">ID: {user?.id}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-mfu-border">
              <div className="flex justify-between text-xs">
                <span className="text-mfu-text-muted">Faculty</span>
                <span className="font-bold text-mfu-text-main text-right">Information Technology</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-mfu-text-muted">Program</span>
                <span className="font-bold text-mfu-text-main text-right">Computer Engineering</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-mfu-text-muted">Advisor</span>
                <span className="font-bold text-mfu-text-main text-right">Dr. Somchai Rakdee</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="bg-white p-3 rounded-lg border border-mfu-border text-center">
                <p className="text-[10px] font-bold text-mfu-text-muted uppercase">GPAX</p>
                <p className="text-lg font-bold text-mfu-red">3.85</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-mfu-border text-center">
                <p className="text-[10px] font-bold text-mfu-text-muted uppercase">Credits</p>
                <p className="text-lg font-bold text-mfu-text-main">42</p>
              </div>
            </div>
          </div>

          <div className="mfu-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-mfu-text-main flex items-center gap-2">
              <Bell size={16} className="text-mfu-red" />
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-[11px] text-blue-800">
                <p className="font-bold mb-1">Registration Period</p>
                Pre-registration for Semester 3/2025 starts on April 23, 2026.
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-[11px] text-orange-800">
                <p className="font-bold mb-1">Exit Exam Result</p>
                The 3rd exit examination results are now available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-medium text-mfu-text-main">Student Schedule Check</h2>
      
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button className="px-6 py-2 bg-mfu-red text-white font-bold rounded-md text-sm">Student Schedule Check</button>
        <button className="px-6 py-2 text-mfu-red font-bold hover:bg-white rounded-md text-sm transition-all">Exam Schedule</button>
      </div>

      <div className="mfu-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-mfu-red">* Academic Year</label>
          <select className="mfu-input">
            <option>2025</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-mfu-red">* Semester</label>
          <select className="mfu-input">
            <option>2</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-mfu-red">* Search by Date</label>
          <div className="relative">
            <input type="text" value="30 Mar 2026 - 05 Apr 2026" readOnly className="mfu-input pr-10" />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-sm font-bold text-mfu-text-main">Remark :</p>
            <p className="text-xs text-mfu-text-muted">The following data as shown below consists of course code, teaching type - section, building and classroom, respectively.</p>
          </div>
          <button className="text-mfu-red hover:bg-red-50 p-2 rounded-full border border-mfu-border">
            <Download size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] bg-white border border-mfu-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-[100px_repeat(14,1fr)] bg-slate-50 border-b border-mfu-border">
              <div className="p-4 border-r border-mfu-border"></div>
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="p-4 text-center text-[10px] font-bold text-mfu-text-muted border-r border-mfu-border last:border-r-0">
                  {String(8 + i).padStart(2, '0')}.00
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[100px_repeat(14,1fr)] relative">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, dayIdx) => (
                <React.Fragment key={day}>
                  <div className="p-4 border-r border-b border-mfu-border bg-slate-50/50 flex flex-col items-center justify-center gap-1">
                    <span className="text-sm font-bold text-mfu-red">{day}</span>
                    <span className="text-[9px] text-mfu-text-muted font-bold">{30 + dayIdx} Mar</span>
                  </div>
                  <div className="col-span-14 grid grid-cols-14 border-b border-mfu-border relative h-24">
                    {/* Grid Lines */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} className="border-r border-mfu-border/30 h-full last:border-r-0" />
                    ))}
                    
                    {/* Schedule Items */}
                    {SCHEDULE.filter(s => s.day === dayIdx).map((item, idx) => (
                      <div 
                        key={idx}
                        className="absolute top-2 bottom-2 bg-mfu-red/10 border-l-4 border-mfu-red p-2 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        style={{ 
                          left: `${((item.start - 8) / 14) * 100}%`,
                          width: `${(item.duration / 14) * 100}%`
                        }}
                      >
                        <p className="text-[10px] font-bold text-mfu-red leading-tight">{item.code}</p>
                        <p className="text-[9px] text-mfu-text-main font-bold truncate">{item.type} - {item.section}</p>
                        <p className="text-[8px] text-mfu-text-muted font-bold truncate">{item.room}</p>
                        
                        <div className="absolute inset-0 bg-mfu-red text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center">
                          <p className="text-[10px] font-bold">{item.code}</p>
                          <p className="text-[8px]">{item.type} Section {item.section}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreReg = () => {
    const filteredCourses = MOCK_COURSES.filter(c => 
      (c.code.includes(searchQuery) || c.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedFaculty === 'All' || c.faculty === selectedFaculty)
    );

    const handleAddCourse = async (course: Course) => {
      if (registeredCourses.includes(course.id)) {
        addNotification('Course already in your plan', 'error');
        return;
      }
      if (course.remainingSeats <= 0) {
        addNotification('Course is full', 'error');
        return;
      }

      setIsProcessing(true);
      // Simulate transactional delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRegisteredCourses(prev => [...prev, course.id]);
      setIsProcessing(false);
      addNotification(`Successfully added ${course.code}`, 'success');
    };

    const handleDropCourse = (courseId: string) => {
      setRegisteredCourses(prev => prev.filter(id => id !== courseId));
      addNotification('Course removed from plan', 'info');
    };

    const handleSubmitRegistration = async () => {
      setIsProcessing(true);
      addNotification('Initiating transactional registration...', 'info');
      
      // Simulate backend validation and transactional processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.1; // 90% success rate
      
      setIsProcessing(false);
      if (success) {
        addNotification('Registration submitted successfully!', 'success');
        setRegisteredCourses([]); // Clear plan after success for demo
        setView('dashboard');
      } else {
        addNotification('Transaction failed: Seat limit reached for one or more courses.', 'error');
      }
    };

    const totalCredits = registeredCourses.reduce((acc, id) => {
      const course = MOCK_COURSES.find(c => c.id === id);
      return acc + (course?.credits || 0);
    }, 0);

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-medium text-mfu-text-main">Pre-Registration System</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
            <Clock size={16} />
            Registration Window: OPEN
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="mfu-card p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by Course Code or Name..." 
                    className="mfu-input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="mfu-input md:w-64"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="All">All Faculties</option>
                  {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="mfu-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Course Name</th>
                      <th>Faculty</th>
                      <th>Day/Time</th>
                      <th>Seats</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map(course => (
                      <tr key={course.id}>
                        <td className="font-bold text-mfu-red">{course.code}</td>
                        <td>{course.name}</td>
                        <td className="text-xs">{course.faculty}</td>
                        <td className="text-xs">{course.day} {course.time}</td>
                        <td>
                          <span className={course.remainingSeats > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                            {course.remainingSeats}/{course.capacity}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleAddCourse(course)}
                            disabled={isProcessing || registeredCourses.includes(course.id) || course.remainingSeats <= 0}
                            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                              registeredCourses.includes(course.id)
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : course.remainingSeats <= 0
                                ? 'bg-red-50 text-red-400 cursor-not-allowed'
                                : 'bg-mfu-red text-white hover:bg-red-800'
                            }`}
                          >
                            {registeredCourses.includes(course.id) ? 'Added' : 'Add'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="mfu-card p-6 space-y-4 sticky top-24">
              <h3 className="text-xl font-bold text-mfu-text-main border-b border-mfu-border pb-2">Registration Plan</h3>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {registeredCourses.length === 0 ? (
                  <p className="text-sm text-mfu-text-muted text-center py-8">No courses added yet.</p>
                ) : (
                  registeredCourses.map(id => {
                    const course = MOCK_COURSES.find(c => c.id === id);
                    return (
                      <div key={id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-start group">
                        <div>
                          <p className="text-sm font-bold text-mfu-red">{course?.code}</p>
                          <p className="text-xs text-mfu-text-main line-clamp-1">{course?.name}</p>
                          <p className="text-[10px] text-mfu-text-muted">{course?.credits} Credits</p>
                        </div>
                        <button 
                          onClick={() => handleDropCourse(id)}
                          className="text-mfu-text-muted hover:text-mfu-red p-1"
                        >
                          <Undo2 size={14} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-4 border-t border-mfu-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-mfu-text-main">Total Credits:</span>
                  <span className="text-lg font-bold text-mfu-red">{totalCredits}</span>
                </div>
                <button 
                  onClick={handleSubmitRegistration}
                  disabled={registeredCourses.length === 0 || isProcessing}
                  className="w-full py-3 bg-mfu-red text-white font-bold rounded-lg hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Clock size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : 'Submit Registration'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQueue = () => (
    <div className="flex flex-col items-center justify-center py-20 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-24 h-24 bg-mfu-red/10 text-mfu-red rounded-full flex items-center justify-center animate-pulse">
        <Clock size={48} />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl font-medium text-mfu-text-main">Virtual Waiting Room</h2>
        <p className="text-mfu-text-muted">High traffic detected. Please stay on this page to maintain your position in the queue.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="mfu-card p-8 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Your Position</p>
          <p className="text-5xl font-bold text-mfu-red">{queuePosition}</p>
        </div>
        <div className="mfu-card p-8 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Estimated Wait</p>
          <p className="text-5xl font-bold text-mfu-text-main">{Math.ceil(eta)} <span className="text-xl">min</span></p>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-mfu-red"
          initial={{ width: '0%' }}
          animate={{ width: `${100 - (queuePosition / 150) * 100}%` }}
        />
      </div>

      <p className="text-sm text-mfu-text-muted italic">"Thank you for your patience. We are processing requests as quickly as possible."</p>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-medium text-mfu-text-main">Admin Monitoring Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-mfu-text-main">Peak Mode:</span>
          <button 
            onClick={() => {
              setIsPeakMode(!isPeakMode);
              addNotification(`Peak Mode ${!isPeakMode ? 'Enabled' : 'Disabled'}`, !isPeakMode ? 'error' : 'success');
            }}
            className={`w-14 h-7 rounded-full transition-all relative ${isPeakMode ? 'bg-mfu-red' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isPeakMode ? 'left-8' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mfu-card p-6 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Active Users</p>
          <p className="text-3xl font-bold text-mfu-text-main">{systemMetrics.activeUsers}</p>
          <div className="text-xs text-green-600 flex items-center gap-1">
            <ChevronUp size={12} /> 12% from last hour
          </div>
        </div>
        <div className="mfu-card p-6 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Error Rate</p>
          <p className="text-3xl font-bold text-mfu-text-main">{(systemMetrics.errors * 100).toFixed(2)}%</p>
          <div className="text-xs text-green-600">Within normal range</div>
        </div>
        <div className="mfu-card p-6 space-y-2">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Queue Size</p>
          <p className="text-3xl font-bold text-mfu-red">{isPeakMode ? '1,402' : '0'}</p>
          <div className="text-xs text-mfu-text-muted">Waiting for access</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="mfu-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mfu-text-main">Traffic Metrics (Requests/sec)</h3>
          <div className="h-64 w-full bg-slate-50 rounded-lg flex items-end justify-between p-4 gap-2">
            {systemMetrics.traffic.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-mfu-red/40 rounded-t-sm hover:bg-mfu-red transition-all cursor-pointer relative group"
                  style={{ height: `${(t.value / 2500) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-mfu-text-main text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.value}
                  </div>
                </div>
                <span className="text-[10px] text-mfu-text-muted">{t.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mfu-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mfu-text-main">System Logs</h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-2 bg-slate-50 rounded border-l-2 border-green-500">
              <span className="text-mfu-text-muted">[09:42:11]</span> INFO: User 6831503002 authenticated via SSO.
            </div>
            <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
              <span className="text-mfu-text-muted">[09:43:05]</span> INFO: Transaction committed for Course 1006134.
            </div>
            <div className={`p-2 rounded border-l-2 ${isPeakMode ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'}`}>
              <span className="text-mfu-text-muted">[09:44:00]</span> {isPeakMode ? 'WARN: Peak Mode enabled by Admin.' : 'INFO: System status normal.'}
            </div>
            <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
              <span className="text-mfu-text-muted">[09:44:15]</span> INFO: Cache TTL refreshed for GPA results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-mfu-text-muted">Grade Results</p>
          <h2 className="text-5xl font-medium text-mfu-text-main">Grade Results</h2>
        </div>
        <button className="text-mfu-red hover:bg-red-50 p-2 rounded-full border border-mfu-border">
          <Download size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mfu-card p-6 space-y-1">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Cumulative GPA</p>
          <p className="text-4xl font-bold text-mfu-red">3.85</p>
        </div>
        <div className="mfu-card p-6 space-y-1">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Total Credits</p>
          <p className="text-4xl font-bold text-mfu-text-main">42</p>
        </div>
        <div className="mfu-card p-6 space-y-1">
          <p className="text-xs font-bold text-mfu-text-muted uppercase tracking-widest">Academic Status</p>
          <p className="text-4xl font-bold text-green-600">Normal</p>
        </div>
      </div>

      <div className="mfu-card p-8 max-w-md">
        <div className="space-y-1">
          <label className="text-xs font-bold text-mfu-text-main">Academic Year</label>
          <select className="mfu-input">
            <option>2025</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-5xl font-medium text-mfu-text-main">Academic Year 2025</h3>
          <button className="flex items-center gap-2 text-mfu-red text-sm font-bold">
            The meaning of the abbreviation
            <Info size={16} />
          </button>
        </div>

        <div className="mfu-card">
          <div className="mfu-accordion-header">
            <span>Semester 1</span>
            <ChevronUp size={20} />
          </div>
          <table className="mfu-table">
            <thead>
              <tr>
                <th className="w-1/6">Course Code</th>
                <th className="w-1/2">Course Name</th>
                <th className="w-1/6">Credit</th>
                <th className="w-1/6 text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((grade, idx) => (
                <tr key={idx}>
                  <td className="text-mfu-red underline cursor-pointer">{grade.code}</td>
                  <td>{grade.name}</td>
                  <td>{grade.credit}</td>
                  <td className="text-center font-bold">{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mfu-bg">
      {view === 'login' ? renderLogin() : (
        <div className="flex flex-col min-h-screen">
          {renderTopNav()}
          
          {/* Status Banner */}
          <AnimatePresence>
            {isPeakMode && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-mfu-red text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-2 overflow-hidden"
              >
                <ShieldAlert size={14} />
                SYSTEM NOTICE: HIGH TRAFFIC DETECTED. VIRTUAL QUEUEING IS ACTIVE.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-1">
            {renderSidebar()}
            <main className="flex-1 p-8 overflow-x-hidden relative">
              
              {/* Notifications Toast */}
              <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
                <AnimatePresence>
                  {notifications.map(n => (
                    <motion.div 
                      key={n.id}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-4 text-sm font-bold bg-white min-w-[300px] ${
                        n.type === 'success' ? 'border-green-100 text-slate-700' : 
                        n.type === 'error' ? 'border-red-100 text-mfu-red' : 'border-blue-100 text-blue-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        n.type === 'success' ? 'bg-green-50 text-green-500' : 
                        n.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {n.type === 'success' ? <CheckCircle2 size={18} /> : 
                         n.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
                      </div>
                      <span>{n.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {view === 'dashboard' && renderDashboard()}
                  {view === 'schedule' && renderSchedule()}
                  {view === 'grades' && renderGrades()}
                  {view === 'pre-reg' && renderPreReg()}
                  {view === 'queue' && renderQueue()}
                  {view === 'admin' && renderAdmin()}
                  {view === 'exit-exam' && (
                    <div className="flex flex-col items-center justify-center py-20 text-mfu-text-muted">
                      <LayoutDashboard size={64} className="mb-4 opacity-20" />
                      <p className="text-xl font-medium">This feature is coming soon.</p>
                      <button onClick={() => setView('dashboard')} className="mt-4 text-mfu-red font-bold hover:underline">Back to Dashboard</button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-components ---

function SidebarItem({ icon, label, active, onClick, isSub = false }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; isSub?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`mfu-sidebar-item group ${isSub ? 'pl-10' : ''} ${active ? 'mfu-sidebar-item-active' : 'text-mfu-text-muted hover:text-mfu-red'}`}
    >
      <span className={`transition-colors ${active ? 'text-mfu-red' : 'text-slate-400 group-hover:text-mfu-red'}`}>
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}

function CategoryHeader({ label, isOpen, onToggle }: { label: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className="mfu-sidebar-category hover:bg-slate-50 w-full"
    >
      <span>{label}</span>
      {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
    </button>
  );
}
