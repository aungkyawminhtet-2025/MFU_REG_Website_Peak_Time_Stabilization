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
