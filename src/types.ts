export type ScreenType =
  | 'dashboard'
  | 'classes'
  | 'attendance'
  | 'assignments'
  | 'exams'
  | 'assistant'
  | 'planner'
  | 'focus'
  | 'notifications'
  | 'goals'
  | 'events'
  | 'profile'
  | 'analytics';

export interface SubjectInfo {
  code: string;
  name: string;
  faculty: string;
  designation?: string;
  isLab?: boolean;
  credits: number;
  classroom: string;
  color: string;
  bgLight: string;
}

export interface ClassSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  timeSlot: string;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  classroom: string;
  isLab?: boolean;
  topic?: string;
}

export interface AttendanceRecord {
  subjectCode: string;
  subjectName: string;
  faculty: string;
  present: number;
  absent: number;
  total: number;
  percentage: number;
  threshold: number; // 75%
  status: 'safe' | 'warning' | 'danger';
  neededTo75: number;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  faculty: string;
  dueDate: string;
  dueTime: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Submitted';
  description: string;
  submittedDate?: string;
  marks?: string;
}

export interface Exam {
  id: string;
  subject: string;
  subjectCode: string;
  faculty: string;
  date: string; // YYYY-MM-DD
  time: string;
  classroom: string;
  type: 'CIA-1' | 'CIA-2' | 'Lab Internals' | 'End Semester';
  syllabus: string[];
  maxMarks: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Classes' | 'Assignments' | 'Exams' | 'Events' | 'Attendance';
  timestamp: string;
  read: boolean;
  targetScreen?: ScreenType;
  priority?: 'normal' | 'high' | 'urgent';
}

export interface StudyGoal {
  id: string;
  title: string;
  category: 'Daily' | 'Weekly' | 'Monthly';
  completed: boolean;
  subject?: string;
  targetDate?: string;
  createdDate: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: 'Workshops' | 'Seminars' | 'Hackathons' | 'Cultural' | 'Sports';
  date: string;
  time: string;
  location: string;
  speakerOrOrganizer: string;
  registered: boolean;
  bannerGradient: string;
  iconName: string;
  seatsTotal: number;
  seatsFilled: number;
}

export interface StudentProfile {
  name: string;
  course: string;
  specialisation: string;
  semester: string;
  university: string;
  department: string;
  rollNumber: string;
  email: string;
  avatarUrl?: string;
  cgpa: string;
  academicYear: string;
  classCoordinator: string;
  interests: string[];
  bio: string;
}

export interface AgileUserStory {
  id: string;
  role: string;
  want: string;
  soThat: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Done' | 'In Progress' | 'Backlog';
  acceptanceCriteria: string[];
  screen: string;
}

export interface AgileSprint {
  sprintNumber: number;
  name: string;
  goal: string;
  duration: string;
  velocity: number;
  tasks: {
    id: string;
    title: string;
    storyPoints: number;
    status: 'To Do' | 'In Progress' | 'Done';
    assignee: string;
  }[];
}

export interface AIFocusTask {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  priorityLevel: 'High' | 'Medium' | 'Low';
  priorityBadge: '🔥 HIGH PRIORITY' | '⚡ MEDIUM PRIORITY' | '📚 LOW PRIORITY';
  deadlineText: string;
  dueHoursRemaining: number;
  difficulty: 'High' | 'Medium' | 'Low';
  examProximityScore: number; // 0-100
  attendanceRisk: boolean;
  academicImportance: string;
  estimatedMinutes: number;
  completed: boolean;
  aiRationale: string;
}

export interface AIDayPlanSlot {
  id: string;
  time: string;
  title: string;
  type: 'class' | 'study' | 'break' | 'event' | 'assignment';
  subject?: string;
  subjectCode?: string;
  location?: string;
  faculty?: string;
  isAIGenerated?: boolean;
  notes?: string;
  completed?: boolean;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    screen: ScreenType;
  };
}

export interface AIPreferences {
  dailyStudyHours: number;
  preferredStudyTime: 'Morning (06:00 - 09:00)' | 'Evening (04:30 - 08:00)' | 'Night (08:30 - 11:30)';
  riskSensitivity: 'Strict (Alert at 78%)' | 'Standard (Alert at 75%)' | 'Relaxed (Alert at 70%)';
  primaryFocusSubject: string;
  pomodoroDuration: number;
  autoOptimizeSchedule: boolean;
}

