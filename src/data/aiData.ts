import { AIFocusTask, AIDayPlanSlot, AIChatMessage, AIPreferences } from '../types';

export interface AcademicRiskFactor {
  name: string;
  weight: number;
  score: number; // 0-100 contribution
  status: 'low' | 'moderate' | 'high';
  detail: string;
  subject?: string;
}

export interface AcademicRiskSummary {
  score: number; // e.g. 32
  maxScore: number; // 100
  level: 'LOW RISK' | 'MODERATE RISK' | 'HIGH RISK';
  color: string;
  badgeBg: string;
  badgeText: string;
  primaryRiskStatement: string;
  recommendation: string;
  factors: AcademicRiskFactor[];
}

export const ACADEMIC_RISK_DATA: AcademicRiskSummary = {
  score: 32,
  maxScore: 100,
  level: 'LOW RISK',
  color: '#10B981', // emerald
  badgeBg: 'bg-emerald-50 border-emerald-200',
  badgeText: 'text-emerald-700',
  primaryRiskStatement: 'Your biggest current risk is Mathematics attendance.',
  recommendation:
    'Attend the next 6 consecutive Mathematics & Statistics sessions with Dr. Sowbhagya to safely recover your attendance above the mandatory 75% university regulation.',
  factors: [
    {
      name: 'Mathematics Attendance',
      weight: 40,
      score: 18,
      status: 'high',
      detail: '72.0% (36/50 classes) — 3.0% below SVYASA 75% minimum threshold',
      subject: 'MCAP344 Mathematics and Statistics',
    },
    {
      name: 'Upcoming Agile CIA Deadline',
      weight: 25,
      score: 8,
      status: 'moderate',
      detail: 'Agile Methodologies individual product presentation is due tomorrow',
      subject: 'MCAP343 Agile Methodologies',
    },
    {
      name: 'Pending Course Assignments',
      weight: 20,
      score: 4,
      status: 'low',
      detail: 'R Programming exercise due in 2 days; 4 assignments pending total',
      subject: 'MCAP342 R Programming',
    },
    {
      name: 'Study Goals Consistency',
      weight: 15,
      score: 2,
      status: 'low',
      detail: '2 of 4 daily study goals completed today (50% velocity)',
      subject: 'All Subjects',
    },
  ],
};

export const AI_DAILY_RECOMMENDATION = {
  greeting: 'Good morning Anand 👋',
  overview:
    'You have an Agile Methodologies presentation tomorrow and your R Programming assignment is due in 2 days.',
  items: [
    {
      step: 1,
      title: 'Complete Agile UI design',
      subtitle: 'Finalize interactive components & user stories deck for Ms. Shubha C G',
      tag: '🔥 High Priority',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      actionScreen: 'assignments' as const,
      estimatedMins: 45,
    },
    {
      step: 2,
      title: 'Revise R Programming',
      subtitle: 'Complete practice exercise on Tidyverse data wrangling for Dr. Vasumathi B',
      tag: '⚡ Medium Priority',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      actionScreen: 'assignments' as const,
      estimatedMins: 45,
    },
    {
      step: 3,
      title: "Attend today's Deep Learning class",
      subtitle: '10:50 AM with Dr. Ashwini Alasheetty in AI Lecture Hall 1',
      tag: '📚 Essential Session',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      actionScreen: 'classes' as const,
      estimatedMins: 50,
    },
  ],
  whyRationale: {
    heuristicRules: [
      {
        rule: 'Deadline Proximity (< 24 Hours)',
        explanation: 'Agile Methodologies CIA product submission is tomorrow, September 18, weighting it to rank #1.',
        weight: '35% AI Weight',
      },
      {
        rule: 'Short-term Deliverable (< 48 Hours)',
        explanation: 'R Programming assignment requires hands-on RStudio script execution before Friday cutoff.',
        weight: '30% AI Weight',
      },
      {
        rule: 'Curriculum Progression & Attendance',
        explanation: 'Deep Learning lecture introduces Transformer architectures critical for the upcoming CIA-1 examination.',
        weight: '20% AI Weight',
      },
      {
        rule: 'Attendance Buffer Preservation',
        explanation: 'Maintaining Deep Learning attendance above 76% safeguards your semester examination eligibility.',
        weight: '15% AI Weight',
      },
    ],
    confidenceScore: '94% Confidence Match',
    modelNote: 'Simulated multi-factor academic ranking engine analyzing SVYASA MCA syllabus deadlines.',
  },
};

export const AI_FOCUS_TASKS: AIFocusTask[] = [
  {
    id: 'focus-1',
    title: 'Complete Individual Product UI Design',
    subject: 'Agile Methodologies',
    subjectCode: 'MCAP343',
    priorityLevel: 'High',
    priorityBadge: '🔥 HIGH PRIORITY',
    deadlineText: 'Due tomorrow (11:59 PM)',
    dueHoursRemaining: 18,
    difficulty: 'High',
    examProximityScore: 90,
    attendanceRisk: false,
    academicImportance: 'CIA Presentation Evaluation (20 Marks)',
    estimatedMinutes: 45,
    completed: false,
    aiRationale: 'Highest deadline urgency + major CIA weight. Immediate focus advised.',
  },
  {
    id: 'focus-2',
    title: 'Complete R Programming practice exercise',
    subject: 'R Programming for Data Science',
    subjectCode: 'MCAP342',
    priorityLevel: 'Medium',
    priorityBadge: '⚡ MEDIUM PRIORITY',
    deadlineText: 'Due in 2 days',
    dueHoursRemaining: 48,
    difficulty: 'Medium',
    examProximityScore: 65,
    attendanceRisk: false,
    academicImportance: 'Class Coordinator Practical Assessment (15 Marks)',
    estimatedMinutes: 45,
    completed: false,
    aiRationale: 'Next immediate submission deadline. Requires RStudio execution.',
  },
  {
    id: 'focus-3',
    title: 'Revise neural networks & backprop',
    subject: 'Deep Learning',
    subjectCode: 'MCAM341',
    priorityLevel: 'Low',
    priorityBadge: '📚 LOW PRIORITY',
    deadlineText: 'Due next week',
    dueHoursRemaining: 140,
    difficulty: 'High',
    examProximityScore: 40,
    attendanceRisk: false,
    academicImportance: 'Exam Readiness & Weekly Goal',
    estimatedMinutes: 30,
    completed: false,
    aiRationale: 'Critical concept for CIA-1 exam, but comfortable deadline window.',
  },
  {
    id: 'focus-4',
    title: 'Two-way ANOVA problem derivations',
    subject: 'Mathematics and Statistics for Data Analytics',
    subjectCode: 'MCAP344',
    priorityLevel: 'High',
    priorityBadge: '🔥 HIGH PRIORITY',
    deadlineText: 'Due in 3 days',
    dueHoursRemaining: 72,
    difficulty: 'High',
    examProximityScore: 85,
    attendanceRisk: true,
    academicImportance: 'High Attendance Deficit Recovery (72%)',
    estimatedMinutes: 40,
    completed: false,
    aiRationale: 'Attendance is 72%. Demonstrating solved problems directly to Dr. Sowbhagya improves academic standing.',
  },
  {
    id: 'focus-5',
    title: 'Apache Spark RDD operations practice',
    subject: 'Big Data Analytics',
    subjectCode: 'MCAP341',
    priorityLevel: 'Medium',
    priorityBadge: '⚡ MEDIUM PRIORITY',
    deadlineText: 'Due in 5 days',
    dueHoursRemaining: 120,
    difficulty: 'Medium',
    examProximityScore: 60,
    attendanceRisk: false,
    academicImportance: 'Lab & Theory Cross-Integration (15 Marks)',
    estimatedMinutes: 35,
    completed: false,
    aiRationale: 'Foundation for Big Data lab exam. Schedule during tomorrow study slot.',
  },
];

export const INITIAL_DAY_PLAN_SLOTS: AIDayPlanSlot[] = [
  {
    id: 'plan-1',
    time: '09:00 – 09:50',
    title: 'Big Data Analytics',
    type: 'class',
    subject: 'Big Data Analytics',
    subjectCode: 'MCAP341',
    location: 'Room 304 (Academic Block A)',
    faculty: 'Dr. Bharathi S',
    notes: 'HDFS block replication & MapReduce pipeline lecture.',
    completed: true,
  },
  {
    id: 'plan-2',
    time: '10:50 – 11:40',
    title: 'R Programming for Data Science',
    type: 'class',
    subject: 'R Programming for Data Science',
    subjectCode: 'MCAP342',
    location: 'Room 306 (Academic Block A)',
    faculty: 'Dr. Vasumathi B',
    notes: 'Class Coordinator session on Tidyverse pipelines.',
    completed: true,
  },
  {
    id: 'plan-3',
    time: '12:30 – 01:20',
    title: 'Campus Lunch & Refreshment',
    type: 'break',
    location: 'SVYASA Cafeteria & Garden Courtyard',
    notes: 'Healthy break before afternoon lab sessions.',
    completed: true,
  },
  {
    id: 'plan-4',
    time: '02:10 – 03:00',
    title: 'Agile Methodologies',
    type: 'class',
    subject: 'Agile Methodologies',
    subjectCode: 'MCAP343',
    location: 'Room 302 (Academic Block A)',
    faculty: 'Ms. Shubha C G',
    notes: 'Pre-CIA review on Scrum artifacts & burndown metrics.',
    completed: false,
  },
  {
    id: 'plan-5',
    time: '04:45 – 05:30',
    title: 'AI Study Slot: Agile UI Design',
    type: 'study',
    subject: 'Agile Methodologies',
    subjectCode: 'MCAP343',
    location: 'SVYASA Innovation Hub / Study Pod 3',
    isAIGenerated: true,
    notes: 'AI Scheduled: Finalize CampusFlow UI slides & user stories deck for CIA presentation.',
    completed: false,
  },
  {
    id: 'plan-6',
    time: '06:00 – 06:45',
    title: 'AI Study Slot: R Programming Practice',
    type: 'study',
    subject: 'R Programming for Data Science',
    subjectCode: 'MCAP342',
    location: 'Central Library Quiet Zone',
    isAIGenerated: true,
    notes: 'AI Scheduled: Solve EDA exercises & export ggplot2 visualization scripts.',
    completed: false,
  },
  {
    id: 'plan-7',
    time: '08:00 – 08:30',
    title: 'AI Study Slot: Deep Learning Revision',
    type: 'study',
    subject: 'Deep Learning',
    subjectCode: 'MCAM341',
    location: 'Hostel Workstation',
    isAIGenerated: true,
    notes: 'AI Scheduled: Revise CNN backpropagation derivatives and loss functions.',
    completed: false,
  },
];

export const INITIAL_AI_PREFERENCES: AIPreferences = {
  dailyStudyHours: 2.5,
  preferredStudyTime: 'Evening (04:30 - 08:00)',
  riskSensitivity: 'Standard (Alert at 75%)',
  primaryFocusSubject: 'MCAP343 Agile Methodologies',
  pomodoroDuration: 25,
  autoOptimizeSchedule: true,
};

export const AI_ACADEMIC_INSIGHTS_DATA = {
  academicScore: 88,
  attendanceScore: 82,
  assignmentCompletionRate: 80,
  studyConsistencyRate: 85,
  examReadinessScore: 74,
  aiTakeaways: [
    {
      id: 'ins-1',
      type: 'positive',
      icon: 'TrendingUp',
      title: 'Your attendance is improving.',
      detail: 'Overall attendance is steady at 82.0%. 6 out of 8 courses are well above the mandatory 75% threshold.',
    },
    {
      id: 'ins-2',
      type: 'highlight',
      icon: 'Award',
      title: 'R Programming is currently your strongest subject.',
      detail: 'With 82% attendance and 95% assignment performance, Dr. Vasumathi B course is your highest performing academic track.',
    },
    {
      id: 'ins-3',
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Mathematics needs more attention.',
      detail: 'Mathematics and Statistics attendance is at 72.0% (36/50 sessions). 6 consecutive attendances needed to clear shortage.',
    },
    {
      id: 'ins-4',
      type: 'stat',
      icon: 'CheckCircle2',
      title: 'You completed 80% of your assignments this month.',
      detail: '5 of 7 major assignments submitted on or before deadline dates across MCA AI/ML curriculum.',
    },
    {
      id: 'ins-5',
      type: 'positive',
      icon: 'Sparkles',
      title: 'Your study consistency increased this week.',
      detail: 'Active study goal completion frequency is up by 18% compared to the previous week.',
    },
  ],
  snapshot: [
    { status: 'success', text: 'Strong performance in AI & ML (90% attendance, excellent model evaluations)' },
    { status: 'success', text: 'Good assignment completion (80% submission velocity)' },
    { status: 'warning', text: 'Mathematics attendance needs attention (Currently 72.0%, threshold is 75%)' },
    { status: 'urgent', text: 'Agile presentation should be your next priority (CIA presentation tomorrow)' },
  ],
  recommendedNextSteps: [
    {
      title: 'Rehearse Agile CIA Demo',
      description: 'Review the 10 UI designs and user story backlog for Ms. Shubha C G presentation.',
      actionLabel: 'Open Agile CIA Case Study',
      targetScreen: 'dashboard' as const,
      isAgileModal: true,
    },
    {
      title: 'Attend Mathematics on Friday',
      description: 'Dr. Sowbhagya has a 2-hour PCA session. Attending both brings your attendance to 73.1%.',
      actionLabel: 'View Timetable',
      targetScreen: 'classes' as const,
    },
    {
      title: 'Submit R Programming Exercise',
      description: 'Dr. Vasumathi B assignment closes in 2 days. 1.5 hours needed to finish EDA charts.',
      actionLabel: 'Open Assignment',
      targetScreen: 'assignments' as const,
    },
    {
      title: 'Engage AI Study Copilot',
      description: 'Ask CampusFlow AI any question about your curriculum or study pacing.',
      actionLabel: 'Chat with AI Copilot',
      targetScreen: 'assistant' as const,
    },
  ],
};

export const INITIAL_CHAT_MESSAGES: AIChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `Hello Anand! 👋 I am **CampusFlow AI**, your academic copilot for **MCA AI/ML (3rd Semester) at SVYASA University**.\n\nI continuously synthesize your timetable, attendance records, CIA assignments, and exam calendars to guide your daily priorities.\n\nHow can I support your studies today?`,
    timestamp: 'Just now',
    suggestions: [
      'What should I study today?',
      'Which subject needs my attention?',
      'How can I improve my attendance?',
      'What assignments are urgent?',
      'How should I prepare for my exams?',
      'Help me plan my day',
    ],
  },
];

export function getAIResponseForPrompt(userPrompt: string): {
  text: string;
  actionLink?: { label: string; screen: any };
  suggestions: string[];
} {
  const query = userPrompt.toLowerCase().trim();

  if (query.includes('study today') || query.includes('what should i study')) {
    return {
      text: `Based on your deadlines and syllabus weightage, here is your **AI Recommended Study Plan for Today**:\n\n1. **Agile Methodologies (45 mins)**\n   • Finalize Individual Product UI Design and user stories for **Ms. Shubha C G**'s CIA presentation tomorrow.\n\n2. **R Programming for Data Science (45 mins)**\n   • Complete the practice exercise on data wrangling using Tidyverse before the 2-day deadline for **Dr. Vasumathi B**.\n\n3. **Deep Learning (30 mins)**\n   • Quick revision of neural networks and backpropagation mathematics before **Dr. Ashwini Alasheetty**'s session.\n\nWould you like me to add these study blocks into your Day Planner?`,
      actionLink: { label: 'Open Smart Day Planner', screen: 'planner' },
      suggestions: ['Help me plan my day', 'What assignments are urgent?', 'Which subject needs my attention?'],
    };
  }

  if (query.includes('risky') || query.includes('needs my attention') || query.includes('attention') || query.includes('risk')) {
    return {
      text: `⚠️ **Current Academic Risk Assessment**:\n\n• **Highest Risk:** **Mathematics and Statistics for Data Analytics (MCAP344)**\n  - Faculty: **Dr. Sowbhagya**\n  - Current Attendance: **72.0%** (36/50 classes)\n  - University Requirement: **75.0%**\n  - Action Required: You need to attend the next **6 consecutive classes** without unexcused absences to surpass the 75% threshold safely.\n\n• **Secondary Attention Area:** **Agile Methodologies (MCAP343)** CIA presentation scheduled for tomorrow. Your attendance is high (85.0%), but deliverable readiness is paramount!`,
      actionLink: { label: 'View Attendance Risk Breakdown', screen: 'attendance' },
      suggestions: ['How can I improve my attendance?', 'What should I study today?', 'What assignments are urgent?'],
    };
  }

  if (query.includes('attendance') || query.includes('improve attendance') || query.includes('75%')) {
    return {
      text: `📊 **Attendance Recovery Strategy for Anand B**:\n\nYour overall attendance is **82.0%** across 8 courses, which is generally healthy. However:\n\n1. **Mathematics and Statistics:** Currently at **72.0%**.\n   - Attending the next **6 classes** will elevate your standing to **75.4%**.\n   - Do not miss Friday's 2-hour PCA session!\n2. **Deep Learning:** At **76.0%** (borderline buffer).\n   - Missing 1 class drops you to 74.5%, so maintain strict attendance with Dr. Ashwini Alasheetty.\n3. **AI & ML:** Strongest attendance at **90.0%** with Ms. Akshatha Rithesh.\n\nI recommend setting automatic 15-minute reminders before each morning class.`,
      actionLink: { label: 'Open Attendance Tracker', screen: 'attendance' },
      suggestions: ['Which subject needs my attention?', 'What should I study today?', 'Help me plan my day'],
    };
  }

  if (query.includes('urgent') || query.includes('assignment') || query.includes('tasks') || query.includes('pending')) {
    return {
      text: `🔥 **Urgent Deliverables Queue**:\n\n1. **🔥 HIGH PRIORITY: Individual Product UI Design**\n   - Subject: **Agile Methodologies (MCAP343)**\n   - Faculty: **Ms. Shubha C G**\n   - Due: **Tomorrow (Sep 18, 11:59 PM)**\n   - Value: 20 Marks (CIA Individual Component)\n\n2. **⚡ MEDIUM PRIORITY: R Programming Exercise**\n   - Subject: **R Programming (MCAP342)**\n   - Faculty: **Dr. Vasumathi B**\n   - Due: **In 2 days (Sep 20)**\n   - Value: 15 Marks\n\n3. **🔥 HIGH PRIORITY: Statistical Analysis Assignment**\n   - Subject: **Mathematics & Statistics (MCAP344)**\n   - Faculty: **Dr. Sowbhagya**\n   - Due: **In 3 days (Sep 20)**\n\nWould you like me to launch the AI Focus Engine to prioritize your tasks?`,
      actionLink: { label: 'Launch AI Focus Engine', screen: 'focus' },
      suggestions: ['What should I study today?', 'Help me plan my day', 'How should I prepare for my exams?'],
    };
  }

  if (query.includes('exam') || query.includes('prepare') || query.includes('cia') || query.includes('test')) {
    return {
      text: `🎯 **AI Exam Preparation Status for Anand B**:\n\n• **Agile Methodologies (MCAP343)**\n  - Exam: **CIA-1 in 4 days** (September 18, 10:00 AM)\n  - AI Preparation Readiness: **75%**\n  - Remaining Topics: Kanban metrics and sprint retrospectives.\n\n• **Big Data Analytics (MCAP341)**\n  - Exam: **CIA-1 in 10 days** (September 24, 02:00 PM)\n  - AI Preparation Readiness: **60%**\n  - Remaining Topics: Spark DataFrames and GraphX algorithms.\n\n• **Introduction to AI & ML (MCAM342)**\n  - Exam: **CIA-1 in 22 days** (October 06)\n  - AI Preparation Readiness: **50%**\n\nFocus strictly on Agile Methodologies today for maximum score impact!`,
      actionLink: { label: 'Open AI Exam Planner', screen: 'exams' },
      suggestions: ['What should I study today?', 'What assignments are urgent?', 'Help me plan my day'],
    };
  }

  if (query.includes('plan') || query.includes('schedule') || query.includes('day') || query.includes('optimize')) {
    return {
      text: `🗓️ **Optimized Daily Schedule for Today**:\n\n• **09:00 - 09:50**: Big Data Analytics (Dr. Bharathi S, Room 304)\n• **10:50 - 11:40**: R Programming for Data Science (Dr. Vasumathi B, Room 306)\n• **12:30 - 01:20**: Lunch Break & Mindful Walk\n• **02:10 - 03:00**: Agile Methodologies (Ms. Shubha C G, Room 302)\n\n✨ **AI Study Slots Scheduled For You**:\n• **04:45 - 05:30**: Agile UI Design (CIA presentation polish)\n• **06:00 - 06:45**: R Programming Practice (Tidyverse EDA)\n• **08:00 - 08:30**: Deep Learning Revision (CNN backpropagation)\n\nThis schedule has been calibrated to give you 2 hours of dedicated focus without burnout.`,
      actionLink: { label: 'View Smart Day Planner', screen: 'planner' },
      suggestions: ['What should I study today?', 'Which subject needs my attention?', 'What assignments are urgent?'],
    };
  }

  // Default smart fallback
  return {
    text: `Understood Anand! Based on your **MCA AI/ML (3rd Sem)** records at **SVYASA University**:\n\n• You have **${query ? `inquired about "${query}"` : 'active academic goals'}**.\n• Current AI Academic Risk Score is **32 / 100 (LOW RISK)**.\n• Your #1 priority today is completing the **Agile Methodologies UI Design** for **Ms. Shubha C G** ahead of tomorrow's presentation.\n• Your primary attention alert remains **Mathematics attendance at 72.0%** with **Dr. Sowbhagya**.\n\nWhat would you like to inspect next?`,
    suggestions: [
      'What should I study today?',
      'Which subject needs my attention?',
      'What assignments are urgent?',
      'Help me plan my day',
    ],
  };
}
