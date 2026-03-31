import { Course, Activity, GradeRecord, ScheduleItem } from './types';

export const MOCK_COURSES: Course[] = [
  { id: '1', code: '1006134', name: 'English for Communication 1', faculty: 'Liberal Arts', day: 'Mon', time: '09:00-12:00', credits: 3, capacity: 40, remainingSeats: 5 },
  { id: '2', code: '1101105', name: 'Sciences and Mathematics All Around', faculty: 'Science', day: 'Tue', time: '13:00-16:00', credits: 3, capacity: 50, remainingSeats: 12 },
  { id: '3', code: '1301118', name: 'Introduction to Digital Technology', faculty: 'ICT', day: 'Wed', time: '09:00-12:00', credits: 3, capacity: 45, remainingSeats: 0 },
  { id: '4', code: '1501115', name: 'Computer Engineering Essentials', faculty: 'ICT', day: 'Thu', time: '13:00-16:00', credits: 3, capacity: 30, remainingSeats: 1 },
  { id: '5', code: '1501116', name: 'Computer Programming', faculty: 'ICT', day: 'Fri', time: '09:00-12:00', credits: 3, capacity: 40, remainingSeats: 10 },
  { id: '6', code: '1800001', name: 'Psychology in Daily Life', faculty: 'Social Innovation', day: 'Mon', time: '13:00-16:00', credits: 3, capacity: 60, remainingSeats: 25 },
  { id: '7', code: '1305102', name: 'Data Structures and Algorithms', faculty: 'ICT', day: 'Tue', time: '09:00-12:00', credits: 3, capacity: 40, remainingSeats: 8 },
  { id: '8', code: '1305104', name: 'Object-Oriented Programming', faculty: 'ICT', day: 'Wed', time: '13:00-16:00', credits: 3, capacity: 40, remainingSeats: 3 },
];

export const FACULTIES = [
  'Liberal Arts',
  'Science',
  'ICT',
  'Social Innovation',
  'Management',
  'Law',
  'Medicine',
  'Nursing',
];

export const ACTIVITIES: Record<string, Activity[]> = {
  '2/2568': [
    { list: 'Announcement of the 3rd exit examination result', firstDay: '01 Apr 2026', lastDay: '01 Apr 2026' },
    { list: 'Announcement of Final examination rooms', firstDay: '06 Apr 2026', lastDay: '06 Apr 2026' },
    { list: 'Announcement of eligible students of the 4th exit examination', firstDay: '17 Apr 2026', lastDay: '17 Apr 2026' },
    { list: 'Payment of the 4th exit examination fee', firstDay: '17 Apr 2026', lastDay: '23 Apr 2026' },
    { list: 'Last day of classes', firstDay: '26 Apr 2026', lastDay: '26 Apr 2026' },
    { list: 'Final Examinations', firstDay: '27 Apr 2026', lastDay: '08 May 2026' },
  ],
  '3/2568': [
    { list: 'Announcement of class and examination schedule', firstDay: '23 Apr 2026', lastDay: '23 Apr 2026' },
  ]
};

export const GRADES: GradeRecord[] = [
  { code: '1006134', name: 'English for Communication 1', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1101105', name: 'Sciences and Mathematics All Around', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1301118', name: 'Introduction to Digital Technology and Data Science', credit: '3 (2-2-5)', grade: 'A' },
  { code: '1501115', name: 'Computer Engineering Essentials', credit: '3 (3-0-6)', grade: 'A' },
  { code: '1501116', name: 'Computer Programming', credit: '3 (2-2-5)', grade: 'A' },
  { code: '1800001', name: 'Psychology in Daily Life', credit: '3 (3-0-6)', grade: 'A' },
];

export const SCHEDULE: ScheduleItem[] = [
  { code: '1305102', type: 'LECT-1', section: 'E4 A 618', room: 'E4 A 618', day: 0, start: 9, duration: 3 },
  { code: '1305104', type: 'LECT-1', section: 'E3 B 102', room: 'E3 B 102', day: 0, start: 13, duration: 3 },
  { code: '1006135', type: 'LECT-33', section: 'C2 308', room: 'C2 308', day: 1, start: 13, duration: 3 },
  { code: '1501114', type: 'LECT-2', section: 'E4 A 811', room: 'E4 A 811', day: 2, start: 9, duration: 3 },
  { code: '1305104', type: 'LAB-1', section: 'S1 401', room: 'S1 401', day: 2, start: 13, duration: 3 },
];
