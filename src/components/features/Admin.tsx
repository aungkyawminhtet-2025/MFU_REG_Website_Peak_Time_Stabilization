import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ChevronUp, FileSearch } from 'lucide-react';
import { MOCK_COURSES } from '../../constants';
import { Notification } from '../../types';


interface AdminProps {
 isPeakMode: boolean;
 setIsPeakMode: (peak: boolean) => void;
 addNotification: (message: string, type: Notification['type']) => void;
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
 isPeakMode,
 setIsPeakMode,
 addNotification,
 systemMetrics,
 courseCapacities,
 setCourseCapacities
}: AdminProps) {
 return (
   <div className="space-y-8 pb-20">
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


     {isPeakMode && systemMetrics.queueSize > 500 && (
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
         <p className="text-3xl font-bold text-mfu-red">{isPeakMode ? systemMetrics.queueSize.toLocaleString() : '0'}</p>
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
         <div className="space-y-3 text-xs font-mono max-h-[260px] overflow-y-auto pr-2">
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
                     <input
                       type="number"
                       min="0"
                       className="w-20 p-1 border border-mfu-border rounded text-center text-sm"
                       defaultValue={courseCapacities[course.id]}
                       onBlur={(e) => {
                         const val = parseInt(e.target.value);
                         if (isNaN(val) || val < 0) {
                           addNotification('Invalid capacity. Must be 0 or greater.', 'error');
                           e.target.value = courseCapacities[course.id].toString();
                         } else {
                           setCourseCapacities(prev => ({ ...prev, [course.id]: val }));
                           addNotification(`Updated capacity for ${course.code} to ${val}`, 'success');
                         }
                       }}
                     />
                     <span className="text-[10px] text-mfu-text-muted">Seats</span>
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
