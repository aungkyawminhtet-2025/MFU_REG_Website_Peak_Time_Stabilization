export type View = 'login' | 'dashboard' | 'schedule' | 'grades' | 'pre-reg' | 'exit-exam' | 'admin' | 'queue' | 'enrollment-results' | 'search-instructor' | 'login-history';

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  day: string;
  time: string;
  credits: number;
  capacity: number;
  remainingSeats: number;
}

export interface Registration {
  courseId: string;
  timestamp: string;
}

export interface Activity {
  list: string;
  firstDay: string;
  lastDay: string;
}

export interface GradeRecord {
  code: string;
  name: string;
  credit: string;
  grade: string;
}

export interface ScheduleItem {
  code: string;
  type: string;
  section: string;
  room: string;
  day: number; // 0: Mo, 1: Tu, etc.
  start: number; // hour
  duration: number; // hours
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface EnrollmentResult {
  code: string;
  name: string;
  section: string;
  gradeMode: string;
  credit: number;
}

export interface Instructor {
  id: string;
  name: string;
  surname: string;
  school: string;
}

export interface LoginHistoryRecord {
  no: number;
  date: string;
  time: string;
  loginHistory: string;
  ip: string;
  remark: string;
}
