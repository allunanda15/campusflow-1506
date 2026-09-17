import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  CheckSquare,
  Target,
  Award,
  BookOpen,
  BarChart3,
  PieChart,
  Zap,
  Clock,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  Flame,
  ArrowRight,
  Brain
} from 'lucide-react';
import { AttendanceRecord, Assignment, StudyGoal, ScreenType } from '../types';
import { AI_ACADEMIC_INSIGHTS_DATA } from '../data/aiData';

interface AnalyticsScreenProps {
  attendanceRecords: AttendanceRecord[];
  assignments: Assignment[];
  studyGoals: StudyGoal[];
  cgpa: string;
  onNavigate?: (screen: ScreenType) => void;
  onOpenAgileOverview?: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  attendanceRecords,
  assignments,
  studyGoals,
  cgpa,
  onNavigate = (_screen: ScreenType) => {},
  onOpenAgileOverview = () => {},
}) => {
  // Calculations
  const totalClasses = attendanceRecords.reduce((acc, r) => acc + r.total, 0) || 1;
  const presentClasses = attendanceRecords.reduce((acc, r) => acc + r.present, 0);
  const overallAttendance = ((presentClasses / totalClasses) * 100).toFixed(1);

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter((a) => a.status === 'Submitted').length;
  const assignmentRate = totalAssignments > 0 ? Math.round((submittedAssignments / totalAssignments) * 100) : 80;

  const totalGoals = studyGoals.length;
  const completedGoals = studyGoals.filter((g) => g.completed).length;
  const goalRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 85;

  const {
    academicScore,
    attendanceScore,
    assignmentCompletionRate,
    studyConsistencyRate,
    examReadinessScore,
    aiTakeaways,
    snapshot,
    recommendedNextSteps,
  } = AI_ACADEMIC_INSIGHTS_DATA;

  const coreSubjects = [
    {
      name: 'Agile Methodologies',
      code: 'MCAP343',
      faculty: 'Ms. Shubha C G',
      attendance: 85.0,
      studyHours: 16,
      color: '#6366F1',
    },
    {
      name: 'R Programming for Data Science',
      code: 'MCAP342',
      faculty: 'Dr. Vasumathi B',
      attendance: 82.0,
      studyHours: 14,
      color: '#8B5CF6',
    },
    {
      name: 'Big Data Analytics',
      code: 'MCAP341',
      faculty: 'Dr. Bharathi S',
      attendance: 78.0,
      studyHours: 14,
      color: '#3B82F6',
    },
    {
      name: 'Deep Learning',
      code: 'MCAM341',
      faculty: 'Dr. Ashwini Alasheetty',
      attendance: 76.0,
      studyHours: 15,
      color: '#EC4899',
    },
    {
      name: 'Mathematics and Statistics',
      code: 'MCAP344',
      faculty: 'Dr. Sowbhagya',
      attendance: 72.0,
      studyHours: 18,
      color: '#F59E0B',
    },
    {
      name: 'Introduction to AI & ML',
      code: 'MCAM342',
      faculty: 'Ms. Akshatha Rithesh',
      attendance: 90.0,
      studyHours: 13,
      color: '#10B981',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Academic Insights & Diagnostic</span>
            </span>
            <span className="text-xs text-purple-200">MCA 3rd Sem • Anand B</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            AI ACADEMIC INSIGHTS
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            Continuous synthesis of attendance records, assignment velocity, and exam readiness scores at SVYASA University.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">Current CGPA</span>
            <span className="text-2xl font-black text-amber-300">{cgpa}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-purple-200 block">Overall Health</span>
            <span className="text-2xl font-black text-emerald-300">88%</span>
          </div>
        </div>
      </div>

      {/* DESIGN 8 REQUIRED: 4 Primary Metrics
          - Attendance trends
          - Assignment completion rate
          - Study consistency
          - Exam readiness score
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Trends */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Attendance Trends
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{overallAttendance}%</p>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Your attendance is improving</span>
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div className="h-full rounded-full bg-blue-600" style={{ width: `${overallAttendance}%` }} />
          </div>
        </div>

        {/* Assignment Completion Rate */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Assignment Completion
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{assignmentCompletionRate}%</p>
            <p className="text-xs text-purple-700 font-bold mt-1">
              Completed 80% this month
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-600"
              style={{ width: `${assignmentCompletionRate}%` }}
            />
          </div>
        </div>

        {/* Study Consistency */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Study Consistency
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{studyConsistencyRate}%</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">
              Consistency increased this week
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${studyConsistencyRate}%` }}
            />
          </div>
        </div>

        {/* Exam Readiness Score */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exam Readiness
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{examReadinessScore}%</p>
            <p className="text-xs text-amber-700 font-bold mt-1">
              Agile CIA test is tomorrow
            </p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${examReadinessScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* DESIGN 8 REQUIRED: AI SUMMARY SECTION ("Academic Snapshot") */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Academic Snapshot
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time diagnostic summary produced by CampusFlow AI
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
            SVYASA AI Engine Diagnostic
          </span>
        </div>

        {/* The 4 Explicit Snapshot Bullet Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-950">
                Strong performance in AI & ML
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                90.0% attendance with Ms. Akshatha Rithesh, 19/20 on practical model evaluation, excellent conceptual grasp.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-purple-950">
                Good assignment completion
              </h4>
              <p className="text-xs text-purple-800 mt-0.5">
                Completed 80% of coursework assignments on time. 5 major submissions logged across Big Data, AI, and Lab tracks.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-amber-950">
                Mathematics attendance needs attention
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Currently 72.0% (36/50 classes). 6 consecutive classes with Dr. Sowbhagya needed to meet the mandatory 75% limit.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-rose-950">
                Agile presentation should be your next priority
              </h4>
              <p className="text-xs text-rose-800 mt-0.5">
                CIA presentation with Ms. Shubha C G is tomorrow. Ensure individual product UI and sprint backlog are ready.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Explicit AI Takeaway Statements in Clean Cards */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Synthesized AI Takeaways
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiTakeaways.map((takeaway) => (
              <div
                key={takeaway.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      "{takeaway.title}"
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {takeaway.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Chart: Subject Attendance vs 75% Minimum Threshold */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Subject Attendance vs 75% University Threshold
              </h2>
              <p className="text-xs text-slate-500">
                Comparing all 8 MCA courses against SVYASA examination guidelines
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Attendance %
              </span>
              <span className="flex items-center gap-1 text-rose-600 font-semibold">
                <span className="w-3 h-0.5 bg-rose-500" /> 75% Threshold
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {coreSubjects.map((subj) => {
              const isShort = subj.attendance < 75;

              return (
                <div key={subj.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono text-slate-400 font-semibold mr-1.5">
                        {subj.code}
                      </span>
                      <strong className="text-slate-800">{subj.name}</strong>
                      <span className="text-[11px] text-slate-400 ml-1">({subj.faculty})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold ${
                          isShort ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {subj.attendance}%
                      </span>
                      {isShort && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                          Shortage
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Bar with 75% Marker */}
                  <div className="relative w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                      style={{ left: '75%' }}
                      title="75% Minimum Attendance Requirement"
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isShort
                          ? 'bg-rose-500'
                          : subj.attendance >= 85
                          ? 'bg-emerald-500'
                          : 'bg-indigo-600'
                      }`}
                      style={{ width: `${subj.attendance}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Hours Allocation & Next Steps */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Study Time Distribution
              </h2>
              <span className="text-xs text-slate-400">Weekly</span>
            </div>

            <div className="space-y-3">
              {coreSubjects.map((subj) => (
                <div key={subj.code} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: subj.color }}
                    />
                    <span className="text-slate-700 truncate max-w-[170px] font-medium">
                      {subj.name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {subj.studyHours} hrs/wk
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs">
            <span className="font-bold text-indigo-900 block mb-1">
              Recommended Next Action:
            </span>
            <p className="text-indigo-950 leading-relaxed">
              Launch the <strong className="text-indigo-900">AI Focus Engine</strong> to finish the Agile Methodologies presentation UI, then schedule study slots for R Programming.
            </p>
            <button
              onClick={() => onNavigate('focus')}
              className="mt-3 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Launch Focus Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
