/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  User, 
  LayoutDashboard, 
  LogOut, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'login' | 'dashboard' | 'search' | 'gpa' | 'queue' | 'admin';

interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  schedule: string;
  seats: number;
  maxSeats: number;
}

interface Registration {
  courseId: string;
  timestamp: string;
}

// --- Mock Data ---

const MOCK_COURSES: Course[] = [
  { id: '1', code: 'CS301', name: 'Software Engineering', faculty: 'ICT', schedule: 'Mon 09:00-12:00', seats: 5, maxSeats: 40 },
  { id: '2', code: 'CS401', name: 'Software V&V', faculty: 'ICT', schedule: 'Tue 13:00-16:00', seats: 1, maxSeats: 30 },
  { id: '3', code: 'MT201', name: 'Marketing Management', faculty: 'Management', schedule: 'Wed 09:00-12:00', seats: 15, maxSeats: 50 },
  { id: '4', code: 'GE101', name: 'Thai Language', faculty: 'Liberal Arts', schedule: 'Thu 13:00-16:00', seats: 0, maxSeats: 60 },
  { id: '5', code: 'CS202', name: 'Data Structures', faculty: 'ICT', schedule: 'Fri 09:00-12:00', seats: 10, maxSeats: 40 },
];

const MOCK_GPA_DATA: Record<string, { termGpa: number; cumulativeGpa: number; credits: number }> = {
  '1/2023': { termGpa: 3.75, cumulativeGpa: 3.75, credits: 18 },
  '2/2023': { termGpa: 3.85, cumulativeGpa: 3.80, credits: 21 },
  '1/2024': { termGpa: 3.60, cumulativeGpa: 3.74, credits: 18 },
};

// --- Components ---

export default function App() {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);
  const [isPeakMode, setIsPeakMode] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [eta, setEta] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' }[]>([]);
  const [auditLogs, setAuditLogs] = useState<{ id: string; action: string; time: string; user: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Effects ---

  // Log critical actions
  const logAction = (action: string) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      time: new Date().toLocaleTimeString(),
      user: user?.id || 'System'
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 20));
  };

  // Simulate Queue Progression
  useEffect(() => {
    if (view === 'queue' && queuePosition !== null) {
      const interval = setInterval(() => {
        setQueuePosition(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            setTimeout(() => {
              addNotification('Your turn has arrived!', 'success');
              logAction('Queue turn arrived');
              setView('search');
              setQueuePosition(null);
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
        setEta(prev => (prev !== null && prev > 0 ? prev - 0.5 : 0));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [view, queuePosition]);

  // --- Handlers ---

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleLogin = (id: string) => {
    if (id.length < 5) {
      addNotification('Invalid Student ID', 'error');
      return;
    }
    setUser({ id, name: 'Aung Kaung Set' });
    setView('dashboard');
    addNotification('Logged in via SSO', 'success');
    logAction('User Login via SSO');
  };

  const handleLogout = () => {
    logAction('User Logout');
    setUser(null);
    setView('login');
    setQueuePosition(null);
  };

  const handleRegisterClick = () => {
    if (isPeakMode) {
      logAction('Entered Virtual Queue');
      setQueuePosition(50);
      setEta(15);
      setView('queue');
    } else {
      setView('search');
    }
  };

  const registerCourse = async (courseId: string) => {
    setIsProcessing(true);
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) return;

    // Simulate transactional delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (course.seats <= 0) {
      addNotification('Course is full!', 'error');
      setIsProcessing(false);
      return;
    }

    if (registeredCourses.includes(courseId)) {
      addNotification('Already registered for this course', 'error');
      setIsProcessing(false);
      return;
    }

    setRegisteredCourses(prev => [...prev, courseId]);
    addNotification(`Successfully registered for ${course.code}`, 'success');
    logAction(`Registered Course: ${course.code}`);
    setIsProcessing(false);
  };

  const dropCourse = async (courseId: string) => {
    setIsProcessing(true);
    const course = MOCK_COURSES.find(c => c.id === courseId);
    
    // Simulate transactional delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setRegisteredCourses(prev => prev.filter(id => id !== courseId));
    addNotification('Course dropped successfully', 'success');
    logAction(`Dropped Course: ${course?.code || courseId}`);
    setIsProcessing(false);
  };

  const togglePeakMode = () => {
    const newState = !isPeakMode;
    setIsPeakMode(newState);
    logAction(`Peak Mode ${newState ? 'Enabled' : 'Disabled'}`);
    addNotification(`Peak Mode ${newState ? 'Enabled' : 'Disabled'}`, 'success');
  };

  // --- Render Helpers ---

  const renderStatusBanner = () => (
    <AnimatePresence>
      {isPeakMode && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-orange-600 text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2 overflow-hidden"
        >
          <Clock size={16} />
          <span>SYSTEM STATUS: PEAK MODE ACTIVE - VIRTUAL QUEUE ENABLED FOR REGISTRATION</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <BookOpen className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MFU REG</h1>
          <p className="text-gray-500 text-sm">Single Sign-On Prototype</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Student ID</label>
            <input 
              type="text" 
              placeholder="e.g. 6831503001"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin((e.target as HTMLInputElement).value)}
            />
          </div>
          <button 
            onClick={() => handleLogin('6831503001')}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-md active:scale-95"
          >
            Log In
          </button>
          <div className="text-center">
            <button 
              onClick={() => setView('admin')}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Admin Access
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
          <BookOpen className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">MFU REG</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
        <SidebarItem icon={<Search size={20}/>} label="Course Search" active={view === 'search'} onClick={handleRegisterClick} />
        <SidebarItem icon={<BarChart3 size={20}/>} label="GPA Results" active={view === 'gpa'} onClick={() => setView('gpa')} />
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
            AS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.id}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 bg-[#f8f9fa] min-h-screen flex flex-col">
      {renderStatusBanner()}
      {view === 'login' ? renderLogin() : (
        <div className="flex flex-1">
          {renderSidebar()}
          <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {view === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}</h2>
                    <p className="text-gray-500">Academic Year 2024 | Semester 2</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard label="Registered Credits" value={registeredCourses.length * 3} sub="Max 22" icon={<BookOpen className="text-blue-500"/>} />
                    <StatCard label="Current GPA" value="3.74" sub="Cumulative" icon={<BarChart3 className="text-green-500"/>} />
                    <StatCard label="Registration Status" value={isPeakMode ? "Peak Mode" : "Normal"} sub="System Status" icon={<Clock className="text-orange-500"/>} />
                  </div>

                  <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg">My Registered Courses</h3>
                      <button onClick={handleRegisterClick} className="text-sm text-orange-600 font-semibold hover:underline">Add More</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {registeredCourses.length > 0 ? registeredCourses.map(id => {
                        const course = MOCK_COURSES.find(c => c.id === id);
                        return course ? (
                          <div key={id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                {course.code.substring(0, 2)}
                              </div>
                              <div>
                                <h4 className="font-bold">{course.code}: {course.name}</h4>
                                <p className="text-sm text-gray-500">{course.schedule} • {course.faculty}</p>
                              </div>
                            </div>
                            <button 
                              disabled={isProcessing}
                              onClick={() => dropCourse(id)}
                              className={`text-sm font-medium transition-colors ${isProcessing ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-red-600'}`}
                            >
                              {isProcessing ? 'Processing...' : 'Drop'}
                            </button>
                          </div>
                        ) : null;
                      }) : (
                        <div className="p-12 text-center text-gray-400">
                          <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                          <p>No courses registered yet.</p>
                        </div>
                      )}
                    </div>
                  </section>
                </motion.div>
              )}

              {view === 'queue' && (
                <motion.div key="queue" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20">
                  <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100 text-center max-w-md w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-orange-600 animate-pulse" />
                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Users className="text-orange-600 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Virtual Queue</h2>
                    <p className="text-gray-500 mb-8">High traffic detected. Please wait for your turn.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-50 p-6 rounded-3xl">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Position</p>
                        <p className="text-4xl font-black text-gray-900">{queuePosition}</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-3xl">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Est. Wait</p>
                        <p className="text-4xl font-black text-gray-900">{Math.ceil(eta || 0)}m</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-sm text-gray-400">
                      <Clock size={16} />
                      <span>Updating every 30 seconds</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === 'search' && (
                <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Course Search</h2>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search courses..." 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {MOCK_COURSES.map(course => (
                      <div key={course.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-lg text-gray-700 border border-gray-100">
                            {course.code}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{course.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1"><User size={14}/> {course.faculty}</span>
                              <span className="flex items-center gap-1"><Clock size={14}/> {course.schedule}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Seats Available</p>
                            <p className={`text-xl font-black ${course.seats === 0 ? 'text-red-500' : 'text-green-600'}`}>
                              {course.seats} / {course.maxSeats}
                            </p>
                          </div>
                          <button 
                            disabled={course.seats === 0 || registeredCourses.includes(course.id) || isProcessing}
                            onClick={() => registerCourse(course.id)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${
                              registeredCourses.includes(course.id) 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : course.seats === 0 
                                  ? 'bg-red-50 text-red-400 cursor-not-allowed'
                                  : isProcessing
                                    ? 'bg-orange-300 text-white cursor-wait'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-100 active:scale-95'
                            }`}
                          >
                            {registeredCourses.includes(course.id) ? 'Registered' : course.seats === 0 ? 'Full' : isProcessing ? 'Adding...' : 'Add Course'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {view === 'gpa' && (
                <motion.div key="gpa" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">GPA Results</h2>
                    {isPeakMode && (
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100 flex items-center gap-1">
                        <Clock size={12} />
                        CACHED VIEW ENABLED
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {['1/2023', '2/2023', '1/2024', '2/2024'].map(term => {
                      const data = MOCK_GPA_DATA[term];
                      return (
                        <div key={term} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                          <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Semester {term}</h3>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Official Record</span>
                          </div>
                          <div className="p-8">
                            {data ? (
                              <div className="grid grid-cols-3 gap-8">
                                <div>
                                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Term GPA</p>
                                  <p className="text-4xl font-black text-orange-600">{data.termGpa.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Cumulative GPA</p>
                                  <p className="text-4xl font-black text-gray-900">{data.cumulativeGpa.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Credits Earned</p>
                                  <p className="text-4xl font-black text-gray-900">{data.credits}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="py-4 flex items-center gap-3 text-gray-400 italic">
                                <AlertCircle size={20} />
                                <span>No GPA data available for this term.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {view === 'admin' && (
                <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <ShieldAlert className="text-red-600" />
                      Admin Monitoring
                    </h2>
                    <button onClick={() => setView('login')} className="text-sm text-gray-500 hover:underline">Back to Login</button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">System Controls</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                          <div>
                            <p className="font-bold">Peak Registration Mode</p>
                            <p className="text-sm text-gray-500">Enables virtual queue for all users</p>
                          </div>
                          <button 
                            onClick={togglePeakMode}
                            className={`w-14 h-8 rounded-full transition-colors relative ${isPeakMode ? 'bg-orange-600' : 'bg-gray-300'}`}
                          >
                            <motion.div 
                              animate={{ x: isPeakMode ? 24 : 0 }}
                              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">Real-Time Metrics</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Latency</p>
                            <p className="text-xl font-black text-green-600">42ms</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Error Rate</p>
                            <p className="text-xl font-black text-gray-900">0.02%</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Active Users</p>
                            <p className="text-xl font-black text-gray-900">1,240</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                      <h3 className="font-bold text-lg mb-6">Queue Health</h3>
                      <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-end">
                          <p className="text-sm text-gray-500">Queue Size</p>
                          <p className="text-2xl font-black">242 users</p>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-600 w-[48%]" />
                        </div>
                        {242 > 500 && (
                          <div className="p-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-bold">
                            <AlertCircle size={16} />
                            Critical: Queue size exceeds 500 users!
                          </div>
                        )}
                        <div className="pt-4 border-t border-gray-50">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-3">Audit Logs</p>
                          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {auditLogs.map(log => (
                              <div key={log.id} className="text-[10px] p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <span className="font-bold text-orange-600">{log.time}</span> • {log.action}
                                <p className="text-gray-400 mt-0.5">User: {log.user}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div 
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border ${
                n.type === 'success' ? 'bg-white border-green-100 text-green-800' : 'bg-white border-red-100 text-red-800'
              }`}
            >
              {n.type === 'success' ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-red-500" />}
              <span className="font-semibold">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Sub-components ---

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600" />}
    </button>
  );
}

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sub}</span>
      </div>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-3xl font-black tracking-tight">{value}</p>
    </div>
  );
}
