import React from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { LOGIN_HISTORY } from '../../constants';

export function LoginHistory() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium text-mfu-text-main">Login History</h2>
      </div>

      <div className="mfu-card p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <div className="relative">
              <select className="mfu-input appearance-none pr-10">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input 
                type="text" 
                defaultValue="01 Apr 2026 - 01 Apr 2026" 
                className="mfu-input pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted" size={18} />
            </div>
          </div>
          <button className="h-[46px] bg-mfu-red text-white font-bold rounded-lg hover:bg-red-800 transition-colors uppercase tracking-wider">
            Search
          </button>
        </div>
      </div>

      <div className="mfu-card overflow-hidden">
        <div className="p-4 border-b border-mfu-border flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <select className="mfu-input appearance-none pr-10 py-1 h-auto text-sm w-40">
              <option>50 per 1 page</option>
              <option>100 per 1 page</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={14} />
          </div>
          <div className="flex items-center gap-4 text-sm text-mfu-text-muted">
            <span>1-3 of 3</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronsLeft size={16} /></button>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
              <span className="px-2 font-bold text-mfu-text-main">1</span>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronRight size={16} /></button>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="mfu-table text-sm">
            <thead>
              <tr className="bg-mfu-red text-white">
                <th className="text-white">No.</th>
                <th className="text-white">Date</th>
                <th className="text-white">Time</th>
                <th className="text-white">Login History</th>
                <th className="text-white">IP</th>
                <th className="text-white">Remark</th>
              </tr>
            </thead>
            <tbody>
              {LOGIN_HISTORY.length > 0 ? (
                LOGIN_HISTORY.map((record) => (
                  <tr key={record.no}>
                    <td>{record.no}</td>
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td className="text-green-600 font-medium">{record.loginHistory}</td>
                    <td>{record.ip}</td>
                    <td className="text-xs text-mfu-text-muted">{record.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-mfu-text-muted italic">
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-mfu-border flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <select className="mfu-input appearance-none pr-10 py-1 h-auto text-sm w-40">
              <option>50 per 1 page</option>
              <option>100 per 1 page</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-mfu-text-muted pointer-events-none" size={14} />
          </div>
          <div className="flex items-center gap-4 text-sm text-mfu-text-muted">
            <span>1-3 of 3</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronsLeft size={16} /></button>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
              <span className="px-2 font-bold text-mfu-text-main">1</span>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronRight size={16} /></button>
              <button className="p-1 hover:bg-slate-100 rounded disabled:opacity-30" disabled><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
