import React from 'react';
import { Globe, ChevronDown, Menu } from 'lucide-react';
import { User } from '../../types';
import logo from '../../assets/logo.png';

interface TopNavProps {
  user: User | null;
  onMenuClick?: () => void;
}

export function TopNav({ user, onMenuClick }: TopNavProps) {
  return (
    <header className="h-16 bg-white border-b border-mfu-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg lg:hidden text-mfu-text-main"
        >
          <Menu size={24} />
        </button>
        <img src={logo} alt="MFU" className="h-10 md:h-14" referrerPolicy="no-referrer" />
        <div className="h-8 md:h-10 w-[1px] bg-slate-200 hidden xs:block" />
        <div className="hidden xs:block">
          <h1 className="text-lg md:text-2xl font-bold text-mfu-text-main leading-none tracking-tight">PORTAL.MFU</h1>
          <p className="text-[10px] md:text-[12px] text-mfu-text-muted uppercase tracking-[0.2em] font-medium mt-1">Registrar System</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden sm:flex items-center gap-4 text-sm font-bold text-mfu-red">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <Globe size={14} />
            <span>EN</span>
          </div>
          <span className="text-mfu-border">|</span>
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-mfu-text-muted">
            <span>TH</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-mfu-border">
          <div className="text-right hidden xs:block">
            <p className="text-[11px] md:text-sm font-bold text-mfu-red leading-none mb-1">{user?.id}</p>
            <p className="text-[11px] md:text-[13px] font-medium text-mfu-text-main truncate max-w-[100px]">{user?.name}</p>
          </div>
          <div className="relative group flex-shrink-0">
            <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-mfu-border cursor-pointer" referrerPolicy="no-referrer" />
            <ChevronDown size={12} className="absolute -right-1 bottom-0 bg-white rounded-full border border-mfu-border" />
          </div>
        </div>
      </div>
    </header>
  );
}
