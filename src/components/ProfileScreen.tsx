import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Mail,
  Hash,
  Building,
  Award,
  BookOpen,
  Edit3,
  X,
  Sparkles,
  CheckCircle2,
  Phone,
  Calendar,
  Layers,
  Sliders,
  ShieldAlert,
  Clock,
  Target
} from 'lucide-react';
import { StudentProfile, AIPreferences, StudyGoal } from '../types';
import { SUBJECTS, STUDENT_PROFILE, INITIAL_GOALS } from '../data/mockData';
import { INITIAL_AI_PREFERENCES } from '../data/aiData';
import { CustomizeAIModal } from './CustomizeAIModal';

interface ProfileScreenProps {
  student?: StudentProfile;
  studyGoals?: StudyGoal[];
  onUpdateProfile?: (updated: StudentProfile) => void;
  onOpenAgileOverview?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student = STUDENT_PROFILE,
  studyGoals = INITIAL_GOALS,
  onUpdateProfile = (_updated: StudentProfile) => {},
  onOpenAgileOverview = () => {},
}) => {
  const currentStudent = student || STUDENT_PROFILE;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCustomizeAIModal, setShowCustomizeAIModal] = useState<boolean>(false);

  const [aiPreferences, setAiPreferences] = useState<AIPreferences>(() => {
    try {
      const saved = localStorage.getItem('campusflow_ai_preferences');
      return saved ? JSON.parse(saved) : INITIAL_AI_PREFERENCES;
    } catch {
      return INITIAL_AI_PREFERENCES;
    }
  });

  const [bio, setBio] = useState<string>(currentStudent.bio || '');
  const [email, setEmail] = useState<string>(currentStudent.email || '');
  const [interestsText, setInterestsText] = useState<string>(
    (currentStudent.interests || []).join(', ')
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentStudent,
      bio: bio.trim(),
      email: email.trim(),
      interests: interestsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setShowEditModal(false);
  };

  const handleSaveAIPreferences = (updated: AIPreferences) => {
    setAiPreferences(updated);
    try {
      localStorage.setItem('campusflow_ai_preferences', JSON.stringify(updated));
    } catch {}
  };

  const activeGoals = studyGoals || INITIAL_GOALS;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Student Identity Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-200 shrink-0">
              AB
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {currentStudent.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentStudent.course}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  {currentStudent.specialisation}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {currentStudent.semester}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {currentStudent.course} — Specialisation in {currentStudent.specialisation} (AI/ML)
              </p>

              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Building className="w-3.5 h-3.5 text-indigo-500" />
                  {currentStudent.university}
                </span>
                <span>•</span>
                <span>Roll: <strong className="font-mono text-slate-800">{currentStudent.rollNumber}</strong></span>
                <span>•</span>
                <span>CGPA: <strong className="font-mono text-slate-800">{currentStudent.cgpa}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              id="customize-ai-profile-top-btn"
              onClick={() => setShowCustomizeAIModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Customize AI Recommendations</span>
            </button>
            <button
              id="edit-profile-open-btn"
              onClick={() => setShowEditModal(true)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Academic Details Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              University Roll Number
            </span>
            <span className="font-mono font-bold text-sm text-slate-900 mt-0.5 block">
              {currentStudent.rollNumber}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Institutional Email
            </span>
            <span className="font-mono font-medium text-xs text-indigo-700 mt-0.5 block truncate">
              {currentStudent.email}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Class Coordinator
            </span>
            <span className="font-bold text-xs text-purple-900 mt-0.5 block">
              {currentStudent.classCoordinator}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Academic Year
            </span>
            <span className="font-bold text-xs text-slate-900 mt-0.5 block">
              {currentStudent.academicYear}
            </span>
          </div>
        </div>
      </div>

      {/* 2. DESIGN 9 REQUIRED SECTIONS:
          - Academic Preferences
          - Risk Alert Settings
          - Study Goals
          - Button: "Customize AI Recommendations"
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Academic Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Calibration
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Academic Preferences
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Configured study targets for the CampusFlow planner
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Daily Target</span>
                <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {aiPreferences.dailyStudyHours} Hours / Day
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Study Window</span>
                <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {aiPreferences.preferredStudyTime.split(' ')[0]}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Pomodoro Interval</span>
                <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {aiPreferences.pomodoroDuration} Minutes
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCustomizeAIModal(true)}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 hover:text-indigo-800 text-left flex items-center gap-1"
          >
            <span>Change Academic Preferences →</span>
          </button>
        </div>

        {/* Card 2: Risk Alert Settings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Safeguards
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Risk Alert Settings
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Threshold triggers for attendance shortage notifications
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Warning Sensitivity</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {aiPreferences.riskSensitivity.split(' ')[0]}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">University Minimum</span>
                <span className="font-bold text-slate-900 font-mono">75.0% Mandatory</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Active Alert</span>
                <span className="font-bold text-rose-600">Math: 72.0%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCustomizeAIModal(true)}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 hover:text-amber-900 text-left flex items-center gap-1"
          >
            <span>Adjust Alert Sensitivity →</span>
          </button>
        </div>

        {/* Card 3: Study Goals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Milestones
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Study Goals
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Active milestones tracked by CampusFlow AI
            </p>

            <div className="space-y-2 text-xs">
              {activeGoals.slice(0, 3).map((goal) => (
                <div
                  key={goal.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <span
                    className={`line-clamp-1 font-semibold ${
                      goal.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {goal.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      goal.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {goal.completed ? 'Done' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {activeGoals.filter((g) => g.completed).length} of {activeGoals.length} Completed
            </span>
            <span className="font-bold text-indigo-600">Active Pipeline</span>
          </div>
        </div>
      </div>

      {/* Prominent Button Section for Customizing AI Recommendations as Specified */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Personalize CampusFlow AI Behavior
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Tune your daily focus heuristic weights, set preferred study windows, and configure early warning thresholds for SVYASA examination rules.
            </p>
          </div>
        </div>

        <button
          id="customize-ai-recommendations-btn"
          onClick={() => setShowCustomizeAIModal(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Sliders className="w-4 h-4 text-amber-300" />
          <span>Customize AI Recommendations</span>
        </button>
      </div>

      {/* Enrolled Subjects & Faculty Directory */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Registered Subjects & Faculty Mentors (Sem 3)
            </h2>
            <p className="text-xs text-slate-500">
              SVYASA University curriculum structure for MCA AI/ML cohort
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
            8 Subjects (27 Credits)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((subj) => (
            <div
              key={subj.code}
              className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition shadow-2xs flex items-start gap-3.5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs"
                style={{ backgroundColor: subj.color }}
              >
                {subj.code.slice(0, 4)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">
                    {subj.code}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {subj.credits} Credits
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                  {subj.name}
                </h3>
                <p className="text-xs text-indigo-700 font-medium mt-1">
                  Faculty: <strong className="text-slate-800">{subj.faculty}</strong>
                  {subj.designation && ` (${subj.designation})`}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Venue: {subj.classroom}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CIA Presentation Note */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-900">
        <div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
            MCA Coursework
          </span>
          <h3 className="font-bold text-base text-white mt-1">
            Agile Methodologies (MCAP343) CIA Project
          </h3>
          <p className="text-xs text-purple-200">
            Presented to Ms. Shubha C G by Anand B. Demonstrating Scrum artifacts and AI student productivity UI.
          </p>
        </div>
        <button
          onClick={onOpenAgileOverview}
          className="px-4 py-2 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-purple-50 transition shrink-0 cursor-pointer"
        >
          View CIA Agile Case Study →
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                Edit Student Profile
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Full Name (Read-only for academic integrity)
                </label>
                <input
                  type="text"
                  disabled
                  value={currentStudent.name}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-bold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Academic Bio / Statement
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Interests (Comma separated)
                </label>
                <input
                  type="text"
                  value={interestsText}
                  onChange={(e) => setInterestsText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customize AI Modal */}
      <CustomizeAIModal
        isOpen={showCustomizeAIModal}
        onClose={() => setShowCustomizeAIModal(false)}
        preferences={aiPreferences}
        onSavePreferences={handleSaveAIPreferences}
      />
    </div>
  );
};
