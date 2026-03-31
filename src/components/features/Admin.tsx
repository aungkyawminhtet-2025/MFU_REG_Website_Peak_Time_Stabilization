import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ChevronUp, FileSearch } from 'lucide-react';
import { MOCK_COURSES } from '../../constants';
import { Notification } from '../../types';

interface AdminProps {
  isPeakMode: boolean;
  setIsPeakMode: (peak: boolean) => void;
  addNotification: (message: string, type: Notification['type']) => void;
  systemMetrics: {
    activeUsers: number;
    errors: number;
    queueSize: number;
    traffic: { time: string; value: number }[];
  };
  courseCapacities: Record<string, number>;
  setCourseCapacities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export function Admin({ 
  isPeakMode, 
  setIsPeakMode, 
  addNotification, 
  systemMetrics, 
  courseCapacities, 
  setCourseCapacities 
}: AdminProps) {
  return (
    <div>
      hello admin    
    </div>
  );
}
