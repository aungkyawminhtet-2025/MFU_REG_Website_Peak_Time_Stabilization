import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { User } from '../../types';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.jpg';

interface TopNavProps {
  user: User | null;
}

export function TopNav({ user }: TopNavProps) {
  return (
    <header className="h-16 bg-white border-b border-mfu-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img src={logo} alt="MFU" className="h-14" />
        <div className="h-10 w-[1px] bg-slate-200" />
        <div>
          <h1 className="text-xl font-bold text-mfu-text-main leading-none tracking-tight">PORTAL.MFU</h1>
          <p className="text-[10px] text-mfu-text-muted uppercase tracking-[0.2em] font-medium mt-1">Registrar System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-bold text-mfu-red">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <Globe size={14} />
            <span>EN</span>
          </div>
          <span className="text-mfu-border">|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-mfu-text-muted">
            <span>TH</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-mfu-border">
          <div className="text-right">
            <p className="text-xs font-bold text-mfu-red leading-none mb-1">{user?.id}</p>
            <p className="text-[11px] font-medium text-mfu-text-main">{user?.name}</p>
          </div>
          <div className="relative group">
            <img src={profile} alt="Avatar" className="w-10 h-10 rounded-full border border-mfu-border cursor-pointer" referrerPolicy="no-referrer" />
            <ChevronDown size={14} className="absolute -right-1 bottom-0 bg-white rounded-full border border-mfu-border" />
          </div>
        </div>
      </div>
    </header>
  );
}
