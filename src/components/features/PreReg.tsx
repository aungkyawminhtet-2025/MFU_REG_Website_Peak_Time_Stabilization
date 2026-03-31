import React from 'react';
import { Clock, Search, Undo2 } from 'lucide-react';
import { MOCK_COURSES, FACULTIES } from '../../constants';
import { Course } from '../../types';

interface PreRegProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFaculty: string;
  setSelectedFaculty: (faculty: string) => void;
  registeredCourses: string[];
  submittedCourses: string[];
  handleDropCourse: (courseId: string, isSubmitted?: boolean) => void;
  handleAddCourse: (course: Course) => void;
  handleSubmitRegistration: () => void;
  isProcessing: boolean;
  totalCredits: number;
}

export function PreReg({
  searchQuery,
  setSearchQuery,
  selectedFaculty,
  setSelectedFaculty,
  registeredCourses,
  submittedCourses,
  handleDropCourse,
  handleAddCourse,
  handleSubmitRegistration,
  isProcessing,
  totalCredits
}: PreRegProps) {
  const filteredCourses = MOCK_COURSES.filter(c => 
    (c.code.includes(searchQuery) || c.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedFaculty === 'All' || c.faculty === selectedFaculty)
  );

  return (
    <div className="space-y-8">
      Pre Reg page
    </div>
  );
}
