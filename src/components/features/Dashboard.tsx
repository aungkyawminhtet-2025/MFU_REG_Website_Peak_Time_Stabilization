import React from 'react';
import {
 ClipboardList,
 ChevronRight,
 TrendingUp,
 Wallet,
 Bell,
 MapPin,
 HeartPulse,
 Briefcase,
 Library,
 BookOpen
} from 'lucide-react';
import { User, View, Activity } from '../../types';
import { motion } from 'motion/react';
import { MOCK_COURSES, ACTIVITIES } from '../../constants';


interface DashboardProps {
  user: User | null;
  setView: (view: View) => void;
  navigateToProtectedView: (view: View) => void;
  submittedCourses: string[];
  handleDropCourse: (courseId: string, isSubmitted?: boolean) => void;
  isPeakMode?: boolean;
}


export function Dashboard({ user, setView, navigateToProtectedView, submittedCourses, handleDropCourse, isPeakMode }: DashboardProps) {
  return (
    <div className="space-y-8">
      {isPeakMode && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">System Alert: High Traffic Mode Active</p>
              <p className="text-xs text-amber-700">The virtual waiting room is currently active for Registration and Grades. Expect delays.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Live Status</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Focus: Registered Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-mfu-text-main">Registered Courses</h2>
              <span className="text-[10px] font-bold text-mfu-red bg-red-50 px-2 py-1 rounded uppercase tracking-widest">Semester 2/2025</span>
            </div>
            <div className="mfu-card p-4">
              {submittedCourses.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <ClipboardList size={32} className="text-mfu-text-muted opacity-20" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-mfu-text-muted uppercase tracking-widest">No active registrations</p>
                    <p className="text-xs text-mfu-text-muted mt-1">Start your pre-registration to see courses here.</p>
                  </div>
                  <button
                    onClick={() => navigateToProtectedView('pre-reg')}
                    className="px-6 py-2 bg-mfu-red text-white text-xs font-bold rounded-lg hover:bg-red-800 transition-all"
                  >
                    Go to Pre-Registration
                  </button>
                </div>
              ) : (
               <div className="overflow-x-auto">
                 <table className="mfu-table text-sm">
                   <thead>
                     <tr>
                       <th>Code</th>
                       <th>Course Name</th>
                       <th className="text-center">Credits</th>
                       <th className="text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {submittedCourses.map(id => {
                       const course = MOCK_COURSES.find(c => c.id === id);
                       return (
                         <tr key={id}>
                           <td className="font-bold text-mfu-red">{course?.code}</td>
                           <td className="text-sm">{course?.name}</td>
                           <td className="text-sm text-center font-bold">{course?.credits}</td>
                           <td className="text-right">
                             <button
                               onClick={() => handleDropCourse(id, true)}
                               className="text-[10px] font-bold text-mfu-red hover:bg-red-50 px-2 py-1 rounded border border-mfu-red/20 transition-colors uppercase"
                             >
                               Drop
                             </button>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
             )}
           </div>
         </div>


         {/* Upcoming Deadlines - Compact */}
         <div className="space-y-4">
           <h2 className="text-xl font-medium text-mfu-text-main">Upcoming Deadlines</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="mfu-card p-4 flex items-center gap-4 hover:border-mfu-red/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 bg-red-50 text-mfu-red rounded flex flex-col items-center justify-center border border-red-100 font-bold shrink-0">
                 <span className="text-[8px] uppercase">Apr</span>
                 <span className="text-sm leading-none">15</span>
               </div>
               <div>
                 <p className="text-xs font-bold text-mfu-text-main group-hover:text-mfu-red transition-colors">Graduation Application</p>
                 <p className="text-[10px] text-mfu-text-muted">Academic Year 2/2025</p>
               </div>
             </div>
             <div className="mfu-card p-4 flex items-center gap-4 hover:border-mfu-red/30 transition-all cursor-pointer group">
               <div className="w-10 h-10 bg-slate-50 text-mfu-text-main rounded flex flex-col items-center justify-center border border-slate-200 font-bold shrink-0">
                 <span className="text-[8px] uppercase">May</span>
                 <span className="text-sm leading-none">02</span>
               </div>
               <div>
                 <p className="text-xs font-bold text-mfu-text-main group-hover:text-mfu-red transition-colors">Final Exam Period</p>
                 <p className="text-[10px] text-mfu-text-muted">Academic Year 2/2025</p>
               </div>
             </div>
           </div>
         </div>


         {/* Monthly Activities - Simplified */}
         <div className="space-y-4">
           <h2 className="text-xl font-medium text-mfu-text-main">Academic Calendar</h2>
          
           {['Bachelor\'s Degree'].map((degree) => (
             <div key={degree} className="mfu-card overflow-hidden">
               <div className="p-4 bg-slate-50/50 border-b border-mfu-border flex justify-between items-center">
                 <span className="text-sm font-bold">{degree} - April 2026</span>
                 <ChevronRight size={16} className="text-mfu-text-muted" />
               </div>
              
               <div className="p-4 space-y-4">
                 {Object.entries(ACTIVITIES).slice(0, 1).map(([term, items]) => (
                   <div key={term} className="space-y-2">
                     <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                         <tbody>
                           {items.slice(0, 3).map((item, idx) => (
                             <tr key={idx} className="border-b border-slate-100 last:border-0">
                               <td className="py-2 text-[11px] text-mfu-text-main pr-4">{item.list}</td>
                               <td className="py-2 text-[10px] font-bold text-mfu-red whitespace-nowrap">{item.firstDay}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   </div>
                 ))}
                 <button className="w-full py-2 text-[10px] font-bold text-mfu-text-muted hover:text-mfu-red transition-colors uppercase tracking-widest border-t border-slate-100 pt-3">
                   View Full Calendar
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>


       <div className="space-y-6">
         {/* Profile Summary */}
         <div className="mfu-card p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full border-2 border-mfu-red/20 p-1 shrink-0">
               <img
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aung"
                 alt="Profile"
                 className="w-full h-full rounded-full bg-slate-100"
               />
             </div>
             <div>
               <h3 className="text-lg font-bold text-mfu-text-main leading-tight">{user?.name}</h3>
               <p className="text-xs font-bold text-mfu-red">ID: {user?.id}</p>
             </div>
           </div>


           <div className="grid grid-cols-2 gap-2">
             <div className="bg-white p-2 rounded border border-mfu-border text-center">
               <p className="text-[8px] font-bold text-mfu-text-muted uppercase">GPAX</p>
               <p className="text-sm font-bold text-mfu-red">3.85</p>
             </div>
             <div className="bg-white p-2 rounded border border-mfu-border text-center">
               <p className="text-[8px] font-bold text-mfu-text-muted uppercase">Credits</p>
               <p className="text-sm font-bold text-mfu-text-main">42</p>
             </div>
           </div>
         </div>


         {/* Academic Progress - Moved to Sidebar and Simplified */}
         <div className="mfu-card p-5 space-y-4">
           <h3 className="text-xs font-bold text-mfu-text-main flex items-center gap-2 uppercase tracking-widest">
             <TrendingUp size={14} className="text-mfu-red" />
             Degree Progress
           </h3>
           <div className="space-y-4">
             <div className="space-y-1.5">
               <div className="flex justify-between text-[10px]">
                 <span className="text-mfu-text-muted font-bold uppercase">Major</span>
                 <span className="font-bold">75%</span>
               </div>
               <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-mfu-red w-3/4 rounded-full" />
               </div>
             </div>
             <div className="space-y-1.5">
               <div className="flex justify-between text-[10px]">
                 <span className="text-mfu-text-muted font-bold uppercase">Gen Ed</span>
                 <span className="font-bold">100%</span>
               </div>
               <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-full rounded-full" />
               </div>
             </div>
           </div>
           <button className="w-full py-2 bg-slate-50 text-[9px] font-bold text-mfu-text-muted rounded hover:bg-slate-100 transition-colors uppercase">
             View Detailed Audit
           </button>
         </div>


         {/* Quick Info: Financial & Notifications */}
         <div className="grid grid-cols-1 gap-4">
           <div className="mfu-card p-4 space-y-3">
             <div className="flex items-center justify-between">
               <h3 className="text-[10px] font-bold text-mfu-text-main uppercase tracking-widest flex items-center gap-2">
                 <Wallet size={12} className="text-mfu-red" />
                 Finance
               </h3>
               <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase">Paid</span>
             </div>
             <p className="text-xl font-bold text-mfu-text-main">฿ 0.00</p>
           </div>


           <div className="mfu-card p-4 space-y-3">
             <h3 className="text-[10px] font-bold text-mfu-text-main uppercase tracking-widest flex items-center gap-2">
               <Bell size={12} className="text-mfu-red" />
               Alerts
             </h3>
             <div className="space-y-2">
               <div className="p-2 bg-blue-50/50 rounded border border-blue-100 text-[10px] text-blue-800">
                 Pre-reg starts April 23.
               </div>
             </div>
           </div>
         </div>


         {/* Campus Resources - Compact Grid */}
         <div className="grid grid-cols-2 gap-3">
           <button className="mfu-card p-3 flex flex-col items-center gap-1.5 hover:bg-slate-50 transition-all">
             <Library size={16} className="text-mfu-red" />
             <span className="text-[9px] font-bold uppercase">Library</span>
           </button>
           <button className="mfu-card p-3 flex flex-col items-center gap-1.5 hover:bg-slate-50 transition-all">
             <HeartPulse size={16} className="text-mfu-red" />
             <span className="text-[9px] font-bold uppercase">Health</span>
           </button>
           <button className="mfu-card p-3 flex flex-col items-center gap-1.5 hover:bg-slate-50 transition-all">
             <Briefcase size={16} className="text-mfu-red" />
             <span className="text-[9px] font-bold uppercase">Career</span>
           </button>
           <button className="mfu-card p-3 flex flex-col items-center gap-1.5 hover:bg-slate-50 transition-all">
             <BookOpen size={16} className="text-mfu-red" />
             <span className="text-[9px] font-bold uppercase">E-Learning</span>
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}
