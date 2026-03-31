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
      className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold text-mfu-text-muted uppercase tracking-widest hover:bg-slate-50 transition-colors"
    >
      <span>{label}</span>
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );
}
