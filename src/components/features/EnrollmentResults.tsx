import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ENROLLMENT_RESULTS } from '../../constants';

export function EnrollmentResults() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium text-mfu-text-main">Enrollment Results</h2>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-2 bg-mfu-red text-white rounded-full font-medium">
          Enrollment Results
        </button>
        <button className="px-6 py-2 bg-white text-mfu-red border border-mfu-border rounded-full font-medium hover:bg-slate-50">
          Enrollment Results History
        </button>
      </div>

      <div className="mfu-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-mfu-text-main">
              <span className="text-red-500 mr-1">*</span> Academic Year
            </label>
            <div className="relative">
              <select className="mfu-input appearance-none pr-10">
                <option>2025</option>
                <option>2024</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-mfu-text-main">
              <span className="text-red-500 mr-1">*</span> Semester
            </label>
            <div className="relative">
              <select className="mfu-input appearance-none pr-10">
                <option>2</option>
                <option>1</option>
                <option>3</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="mfu-card">
        <div className="p-4 border-b border-mfu-border flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-mfu-text-main">Detail</h3>
          <ChevronDown size={20} className="text-mfu-text-muted" />
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm font-medium text-mfu-text-main">
            <span className="text-mfu-red">Learning Mode :</span> On Campus
          </p>

          <div className="overflow-x-auto">
            <table className="mfu-table text-sm">
              <thead>
                <tr className="bg-mfu-red text-white">
                  <th className="text-white">Course Code</th>
                  <th className="text-white">Course Name</th>
                  <th className="text-white">Section</th>
                  <th className="text-white">Grade Mode</th>
                  <th className="text-white">Credit</th>
                </tr>
              </thead>
              <tbody>
                {ENROLLMENT_RESULTS.map((result, idx) => (
                  <tr key={idx}>
                    <td className="text-mfu-red underline font-medium cursor-pointer">{result.code}</td>
                    <td>{result.name}</td>
                    <td>{result.section}</td>
                    <td>{result.gradeMode}</td>
                    <td>{result.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
