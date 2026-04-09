import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryHeaderProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

export function CategoryHeader({ label, isOpen, onToggle, icon }: CategoryHeaderProps) {
  return (
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-mfu-text-main hover:bg-slate-50 transition-colors rounded-lg"
    >
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 bg-orange-100/50 rounded-full flex items-center justify-center text-mfu-red">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </span>
        <span>{label}</span>
      </div>
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );
}
