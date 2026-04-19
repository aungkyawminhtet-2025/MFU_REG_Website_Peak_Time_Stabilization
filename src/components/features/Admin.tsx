import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ChevronUp, FileSearch, Trash2, Users } from 'lucide-react';
import { MOCK_COURSES } from '../../constants';
import { Notification } from '../../types';


interface AdminProps {
  isPreRegPeakMode: boolean;
  setIsPreRegPeakMode: (peak: boolean) => void;
  isGradesPeakMode: boolean;
  setIsGradesPeakMode: (peak: boolean) => void;
  addNotification: (message: string, type: Notification['type']) => void;
  preRegTraffic: number;
  gradesTraffic: number;
  onResetDemo: () => void;
  systemMetrics: {
    activeUsers: number;
    errors: number;
    queueSize: number;
    traffic: { time: string; value: number }[];
  };
  courseCapacities: Record<string, number>;
  setCourseCapacities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}


export function Admin({
  isPreRegPeakMode,
  setIsPreRegPeakMode,
  isGradesPeakMode,
  setIsGradesPeakMode,
  addNotification,
  preRegTraffic,
  gradesTraffic,
  onResetDemo,
  systemMetrics,
  courseCapacities,
  setCourseCapacities
}: AdminProps) {
  const isAnyPeakMode = isPreRegPeakMode || isGradesPeakMode;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-4xl font-medium text-mfu-text-main">Admin Monitoring Dashboard</h2>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button 
            onClick={onResetDemo}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-mfu-text-main font-bold rounded-lg hover:bg-slate-200 transition-all text-sm whitespace-nowrap"
          >
            <Trash2 size={16} />
            Reset Demo
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white p-4 rounded-xl border border-mfu-border shadow-sm">
        <div className="flex items-center justify-between md:justify-start gap-3 flex-1">
          <span className="text-xs md:text-base font-bold text-mfu-text-muted uppercase">Pre-Reg Peak:</span>
          <button
            onClick={() => {
              setIsPreRegPeakMode(!isPreRegPeakMode);
              addNotification(`Pre-Reg Peak Mode ${!isPreRegPeakMode ? 'Enabled' : 'Disabled'}`, !isPreRegPeakMode ? 'error' : 'success');
            }}
            className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${isPreRegPeakMode ? 'bg-mfu-red' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPreRegPeakMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
        <div className="hidden md:block w-px h-6 bg-slate-200" />
        <div className="flex items-center justify-between md:justify-start gap-3 flex-1">
          <span className="text-xs md:text-base font-bold text-mfu-text-muted uppercase">Grades Peak:</span>
          <button
            onClick={() => {
              setIsGradesPeakMode(!isGradesPeakMode);
              addNotification(`Grades Peak Mode ${!isGradesPeakMode ? 'Enabled' : 'Disabled'}`, !isGradesPeakMode ? 'error' : 'success');
            }}
            className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${isGradesPeakMode ? 'bg-mfu-red' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isGradesPeakMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>


      {isAnyPeakMode && systemMetrics.queueSize >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-mfu-red p-6 rounded-xl flex items-center gap-6"
        >
          <div className="w-12 h-12 bg-mfu-red text-white rounded-full flex items-center justify-center animate-bounce">
            <ShieldAlert size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-mfu-red font-bold text-lg">CRITICAL: High Queue Load Detected</h4>
            <p className="text-mfu-red/80 text-sm">Queue size has exceeded 500 users. System performance may degrade. Consider enabling additional caching or scaling web servers.</p>
          </div>
        </motion.div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="mfu-card p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Users size={32} className="text-mfu-red" />
          </div>
          <p className="text-sm font-bold text-mfu-text-muted uppercase tracking-widest">Simulated Traffic</p>
          
          <div className="space-y-3">
             <div className="space-y-1">
               <div className="flex justify-between text-[11px] font-bold">
                 <span>Registration</span>
                 <span className="text-mfu-red">{preRegTraffic} / 7</span>
               </div>
               <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                 <motion.div 
                    animate={{ width: `${(preRegTraffic / 7) * 100}%` }}
                    className={`h-full ${preRegTraffic >= 7 ? 'bg-red-600' : preRegTraffic >= 4 ? 'bg-amber-500' : 'bg-mfu-red'}`} 
                 />
               </div>
             </div>

             <div className="space-y-1">
               <div className="flex justify-between text-[11px] font-bold">
                 <span>Grades</span>
                 <span className="text-mfu-red">{gradesTraffic} / 7</span>
               </div>
               <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                 <motion.div 
                    animate={{ width: `${(gradesTraffic / 7) * 100}%` }}
                    className={`h-full ${gradesTraffic >= 7 ? 'bg-red-600' : gradesTraffic >= 4 ? 'bg-amber-500' : 'bg-mfu-red'}`} 
                 />
               </div>
             </div>
          </div>

          <p className="text-[10px] text-mfu-text-muted italic mt-1 font-bold">
            Clicks separate for each page
          </p>
        </div>
        <div className="mfu-card p-6 space-y-2">
          <p className="text-base font-bold text-mfu-text-muted uppercase tracking-widest">Active Users</p>
          <p className="text-3xl font-bold text-mfu-text-main">{systemMetrics.activeUsers}</p>
          <div className="text-base text-green-600 flex items-center gap-1">
            <ChevronUp size={12} /> 12% from last hour
          </div>
        </div>
        <div className="mfu-card p-6 space-y-2">
          <p className="text-base font-bold text-mfu-text-muted uppercase tracking-widest">Error Rate</p>
          <p className="text-3xl font-bold text-mfu-text-main">{(systemMetrics.errors * 100).toFixed(2)}%</p>
          <div className="text-base text-green-600">Within normal range</div>
        </div>
        <div className="mfu-card p-6 space-y-2">
          <p className="text-base font-bold text-mfu-text-muted uppercase tracking-widest">Queue Size</p>
          <p className="text-3xl font-bold text-mfu-red">{isAnyPeakMode ? systemMetrics.queueSize.toLocaleString() : '0'}</p>
          <div className="text-base text-mfu-text-muted">Waiting for access</div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="mfu-card p-4 md:p-6 space-y-4 overflow-hidden">
          <h3 className="text-base md:text-lg font-bold text-mfu-text-main">Traffic Metrics (Requests/sec)</h3>
          <div className="overflow-x-auto pb-4 -mx-4 md:mx-0 px-4 md:px-0">
            <div className="h-64 min-w-[600px] bg-slate-50 rounded-lg flex items-end justify-between p-4 gap-2">
              {systemMetrics.traffic.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className="w-full bg-mfu-red/40 rounded-t-sm hover:bg-mfu-red transition-all cursor-pointer relative group"
                    style={{ height: `${(t.value / 2500) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-mfu-text-main text-white text-[15px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {t.value} req/s
                    </div>
                  </div>
                  <span className="text-[9px] text-mfu-text-muted whitespace-nowrap rotate-45 origin-left mt-1">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="mfu-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mfu-text-main">System Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <p className="text-[15px] font-bold text-mfu-text-muted uppercase tracking-widest">Banner Cache TTL</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-mfu-red">10s</p>
                <span className="text-[8px] bg-red-100 text-mfu-red px-1 rounded font-bold uppercase">Optimized</span>
              </div>
              <p className="text-[9px] text-mfu-text-muted italic">Reduced from 60s (DEF-08)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <p className="text-[15px] font-bold text-mfu-text-muted uppercase tracking-widest">Read-Side Cache</p>
              <p className="text-xl font-bold text-green-600">Active</p>
              <p className="text-[9px] text-mfu-text-muted italic">Redis Cluster (3 Nodes)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <p className="text-[15px] font-bold text-mfu-text-muted uppercase tracking-widest">Transaction Isolation</p>
              <p className="text-xl font-bold text-mfu-text-main">Serializable</p>
              <p className="text-[9px] text-mfu-text-muted italic">ACID Compliant (PostgreSQL)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <p className="text-[15px] font-bold text-mfu-text-muted uppercase tracking-widest">Autoscaling</p>
              <p className="text-xl font-bold text-mfu-text-main">4 Instances</p>
              <p className="text-[9px] text-mfu-text-muted italic">Target CPU: 70%</p>
            </div>
          </div>
        </div>

        <div className="mfu-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-mfu-text-main">System Logs</h3>
          <div className="space-y-3 text-base font-mono max-h-[260px] overflow-y-auto pr-2">
            <div className="p-2 bg-slate-50 rounded border-l-2 border-green-500">
              <span className="text-mfu-text-muted">[09:42:11]</span> INFO: User 6831503000 authenticated via SSO.
            </div>
            <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
              <span className="text-mfu-text-muted">[09:43:05]</span> INFO: Transaction committed for Course 1006134.
            </div>
            <div className={`p-2 rounded border-l-2 ${isAnyPeakMode ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'}`}>
              <span className="text-mfu-text-muted">[09:44:00]</span> {isAnyPeakMode ? 'WARN: Peak Mode enabled by Admin.' : 'INFO: System status normal.'}
            </div>
            <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
              <span className="text-mfu-text-muted">[09:44:15]</span> INFO: Cache TTL refreshed for GPA results.
            </div>
            <div className="p-2 bg-slate-50 rounded border-l-2 border-blue-500">
              <span className="text-mfu-text-muted">[09:45:22]</span> INFO: Load balancer scaled to 4 instances.
            </div>
          </div>
        </div>
      </div>


     <div className="mfu-card p-6 space-y-6">
       <div className="flex items-center gap-3 border-b border-mfu-border pb-4">
         <FileSearch size={20} className="text-mfu-red" />
         <h3 className="text-lg font-bold text-mfu-text-main">Course Capacity Management</h3>
       </div>
      
       <div className="overflow-x-auto">
         <table className="mfu-table">
           <thead>
             <tr>
               <th>Code</th>
               <th>Course Name</th>
               <th>Current Capacity</th>
               <th>Update Capacity</th>
             </tr>
           </thead>
           <tbody>
             {MOCK_COURSES.map(course => (
               <tr key={course.id}>
                 <td className="font-bold text-mfu-red">{course.code}</td>
                 <td className="text-sm">{course.name}</td>
                 <td className="text-center font-bold">{courseCapacities[course.id]}</td>
                 <td>
                   <div className="flex items-center gap-2">
                     <button 
                       onClick={() => {
                         const newVal = Math.max(0, courseCapacities[course.id] - 1);
                         setCourseCapacities(prev => ({ ...prev, [course.id]: newVal }));
                         addNotification(`Decreased capacity for ${course.code} to ${newVal}`, 'info');
                       }}
                       className="w-6 h-6 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded text-mfu-text-main font-bold"
                     >
                       -
                     </button>
                     <input
                       type="number"
                       min="0"
                       className="w-16 p-1 border border-mfu-border rounded text-center text-sm font-bold"
                       value={courseCapacities[course.id]}
                       onChange={(e) => {
                         const val = parseInt(e.target.value);
                         if (!isNaN(val) && val >= 0) {
                           setCourseCapacities(prev => ({ ...prev, [course.id]: val }));
                         }
                       }}
                     />
                     <button 
                       onClick={() => {
                         const newVal = courseCapacities[course.id] + 1;
                         setCourseCapacities(prev => ({ ...prev, [course.id]: newVal }));
                         addNotification(`Increased capacity for ${course.code} to ${newVal}`, 'success');
                       }}
                       className="w-6 h-6 flex items-center justify-center bg-mfu-red text-white hover:bg-red-800 rounded font-bold"
                     >
                       +
                     </button>
                     <span className="text-[15px] text-mfu-text-muted ml-1">Seats</span>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}
