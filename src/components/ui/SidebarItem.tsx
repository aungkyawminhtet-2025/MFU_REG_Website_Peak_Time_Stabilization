import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isSub?: boolean;
}

export function SidebarItem({ icon, label, active, onClick, isSub = false }: SidebarItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 transition-all group relative rounded-lg ${
        active 
          ? 'text-mfu-red bg-red-50' 
          : 'text-mfu-text-main hover:bg-slate-50 hover:text-mfu-red'
      } ${isSub ? 'pl-10 text-sm font-medium' : 'text-sm font-medium'}`}
    >
      <span className={`flex items-center justify-center rounded-full transition-colors ${active ? 'text-mfu-red' : 'text-mfu-red group-hover:text-mfu-red'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}
