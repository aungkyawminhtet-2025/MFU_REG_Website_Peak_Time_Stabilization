import React from 'react';
import { Download, Info, ChevronUp, AlertCircle } from 'lucide-react';
import { GRADES } from '../../constants';

interface GradesProps {
  selectedTerm: string;
  setSelectedTerm: (term: string) => void;
}

export function Grades({ selectedTerm, setSelectedTerm }: GradesProps) {
  return (
    <div className="space-y-8">
      Grade page
    </div>
  );
}
