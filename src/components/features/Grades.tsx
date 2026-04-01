import React from 'react';
import { Download, Info, ChevronUp, AlertCircle } from 'lucide-react';
import { GRADES } from '../../constants';


interface GradesProps {
 selectedTerm: string;
 setSelectedTerm: (term: string) => void;
}


export function Grades({ selectedTerm, setSelectedTerm }: GradesProps) {
 return (
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
         <label className="text-xs font-bold text-mfu-text-main">Academic Year / Semester</label>
         <select
           className="mfu-input"
           value={selectedTerm}
           onChange={(e) => setSelectedTerm(e.target.value)}
         >
           <option value="1/2025">1/2025</option>
           <option value="2/2024">2/2024</option>
           <option value="1/2024">1/2024</option>
         </select>
       </div>
     </div>


     <div className="space-y-4">
       <div className="flex justify-between items-center">
         <h3 className="text-5xl font-medium text-mfu-text-main">Academic Year {selectedTerm.split('/')[1]}</h3>
         <button className="flex items-center gap-2 text-mfu-red text-sm font-bold">
           The meaning of the abbreviation
           <Info size={16} />
         </button>
       </div>


       <div className="mfu-card">
         <div className="mfu-accordion-header">
           <span>Semester {selectedTerm.split('/')[0]}</span>
           <ChevronUp size={20} />
         </div>
        
         {selectedTerm === '2/2024' ? (
           <div className="p-20 text-center space-y-4">
             <AlertCircle size={48} className="mx-auto text-mfu-text-muted opacity-20" />
             <p className="text-xl font-medium text-mfu-text-muted">No GPA data available for this term</p>
             <p className="text-sm text-mfu-text-muted">The results for this semester have not been released yet.</p>
           </div>
         ) : (
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
         )}
       </div>
     </div>
   </div>
 );
}


