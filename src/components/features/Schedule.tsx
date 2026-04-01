import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { SCHEDULE } from '../../constants';


export function Schedule() {
 return (
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
}
