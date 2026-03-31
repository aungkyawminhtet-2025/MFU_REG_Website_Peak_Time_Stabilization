import React from 'react';
import { 
  ClipboardList, 
  ChevronRight, 
  TrendingUp, 
  Wallet, 
  Bell, 
  MapPin, 
  HeartPulse, 
  Briefcase, 
  Library, 
  BookOpen 
} from 'lucide-react';
import { User, View, Activity } from '../../types';
import { MOCK_COURSES, ACTIVITIES } from '../../constants';

interface DashboardProps {
  user: User | null;
  setView: (view: View) => void;
  submittedCourses: string[];
  handleDropCourse: (courseId: string, isSubmitted?: boolean) => void;
}

export function Dashboard({ user, setView, submittedCourses, handleDropCourse }: DashboardProps) {
  return (
    <div className="space-y-8">
      hello dashboard
    </div>
  );
}
