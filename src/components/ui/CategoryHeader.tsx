import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryHeaderProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function CategoryHeader({ label, isOpen, onToggle }: CategoryHeaderProps) {
  return (
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold text-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
    >
      <span className='text-[13px] text-black'>{label}</span>
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );
}
