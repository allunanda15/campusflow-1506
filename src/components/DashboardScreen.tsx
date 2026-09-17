import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  CheckSquare,
  Award,
  ArrowRight,
  TrendingUp,
  MapPin,
  Bell,
  Sparkles,
  ChevronRight,
  Zap,
  Users,
  AlertCircle,
  HelpCircle,
  Flame,
  ShieldCheck,
  ShieldAlert,
  ListTodo
} from 'lucide-react';
import {
  ScreenType,
  ClassSlot,
  AttendanceRecord,
  Assignment,
  Exam,
  StudyGoal,
  CampusEvent,
  StudentProfile
} from '../types';
import {
  STUDENT_PROFILE,
  TIMETABLE,
  ATTENDANCE_DATA,
  INITIAL_ASSIGNMENTS,
  EXAMS_DATA,
  INITIAL_GOALS,
  CAMPUS_EVENTS,
} from '../data/mockData';
import {
  AI_DAILY_RECOMMENDATION,
  ACADEMIC_RISK_DATA,
  AI_FOCUS_TASKS
} from '../data/aiData';
import { AIRecommendationModal } from './AIRecommendationModal';

interface DashboardScreenProps {
  student?: StudentProfile;
  timetable?: ClassSlot[];
  todayClasses?: ClassSlot[];
  nextClass?: ClassSlot | null;
  attendance?: AttendanceRecord[];
  attendanceRecords?: AttendanceRecord[];
  assignments?: Assignment[];
  pendingAssignments?: Assignment[];
  exams?: Exam[];
  upcomingExams?: Exam[];
  studyGoals?: StudyGoal[];
  notifications?: unknown[];
  featuredEvent?: CampusEvent;
  onNavigate: (screen: ScreenType) => void;
  onToggleGoal?: (id: string) => void;
  onOpenAgileOverview: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  student,
  timetable,
  todayClasses,
  nextClass,
  attendance,
  attendanceRecords,
  assignments,
  pendingAssignments,
  exams,
  upcomingExams,
  studyGoals,
  featuredEvent,
  onNavigate,
  onToggleGoal,
  onOpenAgileOverview,
}) => {
  const [showWhyModal, setShowWhyModal] = useState(false);

  // Fallbacks
  const activeStudent = student || STUDENT_PROFILE;
  const activeAttendance = attendanceRecords || attendance || ATTENDANCE_DATA;
  const activeTodayClasses =
    todayClasses ||
    (timetable ? timetable.filter((slot) => slot.day === 'Monday') : TIMETABLE.filter((slot) => slot.day === 'Monday'));
  const activeNextClass =
    nextClass !== undefined ? nextClass : (activeTodayClasses[1] || activeTodayClasses[0] || null);
  const activePendingAssignments =
    pendingAssignments ||
    (assignments ? assignments.filter((a) => a.status === 'Pending') : INITIAL_ASSIGNMENTS.filter((a) => a.status === 'Pending'));
  const activeUpcomingExams = upcomingExams || exams || EXAMS_DATA;
  const activeGoals = studyGoals || INITIAL_GOALS;
  const activeFeaturedEvent = featuredEvent || CAMPUS_EVENTS[0];
  const handleGoalToggle = onToggleGoal || (() => {});

  // Metrics
  const totalClasses = activeAttendance.reduce((acc, r) => acc + (r.total || 0), 0) || 1;
  const presentClasses = activeAttendance.reduce((acc, r) => acc + (r.present || 0), 0);
  const overallAttendance = ((presentClasses / totalClasses) * 100).toFixed(1);

  const completedGoals = activeGoals.filter((g) => g.completed).length;
  const totalGoals = activeGoals.length;
  const goalPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const shortSubjects = activeAttendance.filter((r) => r.percentage < 75);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  // Academic Risk SVG calculation
  const riskScore = ACADEMIC_RISK_DATA.score; // 32
  const circleRadius = 40;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Presentation Banner / Agile CIA Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-900/60">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
            CIA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                MCAP343 Agile Methodologies — Individual Product CIA
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-400/20 text-purple-200 border border-purple-400/40">
                SVYASA MCA
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Presented to: <strong className="text-white">Ms. Shubha C G</strong> • Student:{' '}
              <strong className="text-white">Anand B</strong> (AI/ML 3rd Sem)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="hero-agile-case-study-btn"
            onClick={onOpenAgileOverview}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Agile Case Study</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Grid: MOST IMPORTANT CARD ("CampusFlow AI recommends") & ACADEMIC RISK SCORE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: MOST IMPORTANT CARD - "CampusFlow AI recommends" */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-indigo-600/40">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/20 flex items-center gap-1.5 text-purple-100">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                {formattedDate}
              </span>
              <span className="text-xs text-purple-200 font-medium">
                SVYASA University • MCA AI/ML Sem 3
              </span>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Hi Anand 👋
            </h1>

            {/* Most Important Card Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md my-2">
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>CampusFlow AI recommends</span>
            </div>

            {/* AI Daily Overview Statement */}
            <p className="text-sm sm:text-base text-purple-100 mt-2 font-medium leading-relaxed">
              {AI_DAILY_RECOMMENDATION.overview}
            </p>

            {/* Recommended 3 Focus Steps */}
            <div className="mt-4 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Recommended focus today:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {AI_DAILY_RECOMMENDATION.items.map((item) => (
                  <div
                    key={item.step}
                    onClick={() => onNavigate(item.actionScreen)}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                          {item.tag.split(' ')[1] || 'Focus'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-white group-hover:text-amber-300 transition line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-purple-200 mt-1 line-clamp-2 leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-[10px] text-amber-300 font-bold mt-2 flex items-center gap-1">
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons: Why this recommendation? & View AI Plan */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <button
              id="why-this-recommendation-btn"
              onClick={() => setShowWhyModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition flex items-center gap-2 border border-white/20 shadow-xs cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Why this recommendation?</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                id="view-focus-engine-btn"
                onClick={() => onNavigate('focus')}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-rose-300" />
                <span>Focus Queue</span>
              </button>
              <button
                id="view-ai-plan-btn"
                onClick={() => onNavigate('planner')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>View AI Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: ACADEMIC RISK SCORE (Circular Indicator) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AI Assessment
                </span>
                <h3 className="text-lg font-black text-slate-900">Academic Risk Score</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                LOW RISK
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex items-center justify-center my-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    className="text-slate-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {riskScore}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 -mt-1">/ 100</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider mt-0.5">
                    LOW RISK
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Risk Statement as requested by Prompt */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs mt-2">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-amber-950">
                    Your biggest current risk is Mathematics attendance.
                  </p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Currently at 72.0% (below SVYASA 75% limit). 6 classes needed to clear shortage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              id="fix-attendance-risk-btn"
              onClick={() => onNavigate('attendance')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Manage Attendance Risk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="risk-insights-btn"
              onClick={() => onNavigate('analytics')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Full Analytics
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick-Action Cards (Attendance, Assignments, Exams, Study Goals) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </h2>
          <span className="text-xs text-slate-500 font-medium">1-Click Direct Access</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Quick Action: Attendance */}
          <button
            id="quick-action-attendance"
            onClick={() => onNavigate('attendance')}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {overallAttendance}%
              </span>
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition">
                Attendance
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Track & calculate</p>
            </div>
          </button>

          {/* Quick Action: Assignments */}
          <button
            id="quick-action-assignments"
            onClick={() => onNavigate('assignments')}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                {activePendingAssignments.length} Pending
              </span>
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-purple-700 transition">
                Assignments
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Coursework & CIA</p>
            </div>
          </button>

          {/* Quick Action: Exams */}
          <button
            id="quick-action-exams"
            onClick={() => onNavigate('exams')}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                In 4 Days
              </span>
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-amber-700 transition">
                Exams
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Hall & Timetable</p>
            </div>
          </button>

          {/* Quick Action: Study Goals */}
          <button
            id="quick-action-goals"
            onClick={() => onNavigate('goals')}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 transition">
                <ListTodo className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {completedGoals}/{totalGoals}
              </span>
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-teal-700 transition">
                Study Goals
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Daily sprint targets</p>
            </div>
          </button>
        </div>
      </div>

      {/* Study Goal Progress & Campus Event Notification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Study Goal Progress Card */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <ListTodo className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    Study Goal Progress
                  </h3>
                  <p className="text-[11px] text-slate-500">Daily Milestone Checklist</p>
                </div>
              </div>
              <span className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {completedGoals}/{totalGoals} Tasks Completed ({goalPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-3.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${goalPercent}%` }}
              />
            </div>

            {/* Quick interactive goals */}
            <div className="space-y-2">
              {activeGoals.slice(0, 3).map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-2.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    goal.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50/70 border-slate-200 hover:border-indigo-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => handleGoalToggle(goal.id)}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <span
                      className={`text-xs font-bold ${
                        goal.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {goal.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {goal.subject}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Keep streak active for CIA exams
            </span>
            <button
              onClick={() => onNavigate('goals')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Manage All Goals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Campus Event Notification Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md border border-indigo-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                Campus Event Alert
              </span>
              <span className="text-[11px] text-purple-200 font-medium">
                SVYASA University
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {activeFeaturedEvent.title}
            </h3>
            <p className="text-xs text-purple-100 mt-1.5 line-clamp-2 leading-relaxed">
              {activeFeaturedEvent.description}
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-purple-200 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="font-semibold text-white">{activeFeaturedEvent.date} • {activeFeaturedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{activeFeaturedEvent.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[11px] text-amber-300 font-bold">
              {activeFeaturedEvent.registered ? '✓ You are Registered' : 'Registration Open'}
            </span>
            <button
              onClick={() => onNavigate('events')}
              className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-950 hover:bg-purple-50 font-extrabold text-xs transition flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>View Events</span>
              <ArrowRight className="w-3 h-3 text-indigo-700" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick AI Focus Engine Strip ("WHAT SHOULD I DO NOW?") */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200/80 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-slate-900 uppercase tracking-wider">
                WHAT SHOULD I DO NOW?
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                #1 Ranked Focus
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-0.5">
              <strong className="text-slate-900">Agile Methodologies:</strong> Complete Individual Product UI Design (Due tomorrow, Sep 18 • 20 Marks CIA)
            </p>
          </div>
        </div>

        <button
          id="launch-focus-engine-banner-btn"
          onClick={() => onNavigate('focus')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Launch AI Focus Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Core Operational Grid: Today's Classes, Attendance & Pending Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Timetable Flow
                </span>
                <h3 className="text-lg font-black text-slate-900">Today's Classes</h3>
              </div>
              <button
                id="view-full-timetable-btn"
                onClick={() => onNavigate('classes')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>All {activeTodayClasses.length} Slots</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {activeTodayClasses.slice(0, 3).map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-black text-slate-900">{slot.time}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {slot.room}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                    {slot.subject}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{slot.faculty}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Next: <strong className="text-slate-800">{activeNextClass?.subject || 'Agile Methodologies'}</strong>
            </span>
            <button
              id="open-day-planner-btn"
              onClick={() => onNavigate('planner')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Smart Planner →
            </button>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Compliance
                </span>
                <h3 className="text-lg font-black text-slate-900">Attendance Summary</h3>
              </div>
              <span
                className={`text-xs font-black px-2.5 py-1 rounded-full ${
                  parseFloat(overallAttendance) >= 75
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {overallAttendance}% Overall
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900">{presentClasses}</span>
                <p className="text-[11px] text-slate-500 font-semibold">Attended</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900">{totalClasses}</span>
                <p className="text-[11px] text-slate-500 font-semibold">Total Sessions</p>
              </div>
            </div>

            {shortSubjects.length > 0 && (
              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-rose-900 text-xs mt-2">
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>1 Subject Below 75% Limit</span>
                </div>
                <p className="text-[11px] text-rose-800">
                  Mathematics: 72.0% (36/50). Attend 6 classes to recover safely.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              id="view-attendance-details-btn"
              onClick={() => onNavigate('attendance')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View 8 Subject Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-slate-400">Min Req: 75%</span>
          </div>
        </div>

        {/* Pending Assignments & Upcoming Exam */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deliverables
                </span>
                <h3 className="text-lg font-black text-slate-900">Active Deadlines</h3>
              </div>
              <button
                id="view-all-assignments-btn"
                onClick={() => onNavigate('assignments')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>{activePendingAssignments.length} Pending</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {activePendingAssignments.slice(0, 2).map((asg) => (
                <div
                  key={asg.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-rose-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {asg.dueDate}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                      {asg.priority.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                    {asg.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{asg.subject}</p>
                </div>
              ))}
            </div>

            {/* Next Exam Card */}
            {activeUpcomingExams[0] && (
              <div className="mt-3 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                    Next CIA Exam
                  </span>
                  <span className="text-[10px] font-black text-purple-800 bg-white px-2 py-0.5 rounded border border-purple-200">
                    {activeUpcomingExams[0].date}
                  </span>
                </div>
                <p className="font-extrabold text-slate-900">{activeUpcomingExams[0].subject}</p>
                <p className="text-[11px] text-slate-500">
                  {activeUpcomingExams[0].examType} • {activeUpcomingExams[0].time} ({activeUpcomingExams[0].room})
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              id="view-exams-btn"
              onClick={() => onNavigate('exams')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <span>Exams Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="chat-with-ai-shortcut-btn"
              onClick={() => onNavigate('assistant')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Ask Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Why This Recommendation Modal */}
      <AIRecommendationModal
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
