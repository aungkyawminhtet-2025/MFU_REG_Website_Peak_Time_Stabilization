import React from 'react';
import { Clock, Search, Undo2 } from 'lucide-react';
import { MOCK_COURSES, FACULTIES } from '../../constants';
import { Course } from '../../types';


interface PreRegProps {
 searchQuery: string;
 setSearchQuery: (query: string) => void;
 selectedFaculty: string;
 setSelectedFaculty: (faculty: string) => void;
 registeredCourses: string[];
 submittedCourses: string[];
 handleDropCourse: (courseId: string, isSubmitted?: boolean) => void;
 handleAddCourse: (course: Course) => void;
 handleSubmitRegistration: () => void;
 isProcessing: boolean;
 totalCredits: number;
 courseCapacities: Record<string, number>;
}


export function PreReg({
 searchQuery,
 setSearchQuery,
 selectedFaculty,
 setSelectedFaculty,
 registeredCourses,
 submittedCourses,
 handleDropCourse,
 handleAddCourse,
 handleSubmitRegistration,
 isProcessing,
 totalCredits,
 courseCapacities
}: PreRegProps) {
 const filteredCourses = MOCK_COURSES.filter(c =>
   (c.code.includes(searchQuery) || c.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
   (selectedFaculty === 'All' || c.faculty === selectedFaculty)
 );


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
             <div className="w-12 relative">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" />
               <input
                 type="text"
                //  placeholder="Search by Course Code or Name..."
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
                 {filteredCourses.map(course => {
                   const currentCapacity = courseCapacities[course.id];
                   const enrolledCount = course.capacity - course.remainingSeats;
                   const currentRemaining = Math.max(0, currentCapacity - enrolledCount);
                   
                   return (
                     <tr key={course.id}>
                       <td className="font-bold text-mfu-red">{course.code}</td>
                       <td>{course.name}</td>
                       <td className="text-xs">{course.faculty}</td>
                       <td className="text-xs">{course.day} {course.time}</td>
                       <td>
                         <span className={currentRemaining > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                           {currentRemaining}/{currentCapacity}
                         </span>
                       </td>
                       <td>
                         <button
                           onClick={() => {
                             if (registeredCourses.includes(course.id)) {
                               handleDropCourse(course.id);
                             } else if (submittedCourses.includes(course.id)) {
                               handleDropCourse(course.id, true);
                             } else {
                               handleAddCourse(course);
                             }
                           }}
                           disabled={isProcessing || (currentRemaining <= 0 && !registeredCourses.includes(course.id) && !submittedCourses.includes(course.id))}
                           className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                             registeredCourses.includes(course.id)
                               ? 'bg-slate-100 text-mfu-red hover:bg-red-50 border border-mfu-red/20'
                               : submittedCourses.includes(course.id)
                               ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-red-50 hover:text-mfu-red hover:border-mfu-red/20'
                               : currentRemaining <= 0
                               ? 'bg-red-50 text-red-400 cursor-not-allowed'
                               : 'bg-mfu-red text-white hover:bg-red-800'
                           }`}
                         >
                           {registeredCourses.includes(course.id) ? 'Remove' : submittedCourses.includes(course.id) ? 'Drop' : 'Add'}
                         </button>
                       </td>
                     </tr>
                   );
                 })}
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
}
