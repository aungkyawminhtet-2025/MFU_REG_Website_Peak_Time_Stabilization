import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { INSTRUCTORS } from '../../constants';

export function SearchInstructor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSurname, setSearchSurname] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All');

  const filteredInstructors = INSTRUCTORS.filter(instructor => {
    const nameMatch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const surnameMatch = instructor.surname.toLowerCase().includes(searchSurname.toLowerCase());
    const schoolMatch = selectedSchool === 'All' || instructor.school === selectedSchool;
    return nameMatch && surnameMatch && schoolMatch;
  });

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-5xl font-medium text-mfu-text-main">Search Instructor Schedule</h2>
      </div>

      <div className="mfu-card p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-sm font-bold text-mfu-text-main">Search by Name</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Please Enter Name To Search" 
                className="mfu-input pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-mfu-text-main">Search by Surname</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Please Enter Surname To Search" 
                className="mfu-input pr-10"
                value={searchSurname}
                onChange={(e) => setSearchSurname(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-mfu-text-main">School / Departments</label>
            <div className="relative">
              <select 
                className="mfu-input appearance-none pr-10"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="All">All</option>
                <option value="School of Information Technology">School of Information Technology</option>
                <option value="School of Management">School of Management</option>
                <option value="School of Liberal Arts">School of Liberal Arts</option>
                <option value="School of Science">School of Science</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={18} />
            </div>
          </div>
          <button className="h-[46px] bg-mfu-red text-white font-bold rounded-lg hover:bg-red-800 transition-colors uppercase tracking-wider">
            Search
          </button>
        </div>
      </div>

      {searchTerm || searchSurname || selectedSchool !== 'All' ? (
        <div className="mfu-card overflow-hidden">
          <table className="mfu-table">
            <thead>
              <tr className="bg-mfu-red text-white">
                <th className="text-white">Name</th>
                <th className="text-white">Surname</th>
                <th className="text-white">School / Department</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.length > 0 ? (
                filteredInstructors.map((instructor) => (
                  <tr key={instructor.id}>
                    <td>{instructor.name}</td>
                    <td>{instructor.surname}</td>
                    <td>{instructor.school}</td>
                    <td>
                      <button className="text-mfu-red font-bold hover:underline">View Schedule</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-mfu-text-muted italic">
                    No instructors found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
