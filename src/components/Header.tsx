import React from 'react';
import {
  GraduationCap,
  Bell,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  Bot,
  Flame,
  Clock
} from 'lucide-react';
import { ScreenType, StudentProfile } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onSelectScreen?: (screen: ScreenType) => void;
  onNavigate?: (screen: ScreenType) => void;
  unreadCount?: number;
  unreadNotificationCount?: number;
  student?: StudentProfile;
  onOpenAgileOverview: () => void;
}

const SCREENS_LIST: { id: ScreenType; label: string; tag?: string }[] = [
  { id: 'dashboard', label: '1. Dashboard' },
  { id: 'classes', label: '2. My Classes' },
  { id: 'attendance', label: '3. Attendance Tracker' },
  { id: 'assignments', label: '4. Assignment Manager' },
  { id: 'exams', label: '5. Exam Planner' },
  { id: 'notifications', label: '6. Smart Notifications' },
  { id: 'goals', label: '7. Study Goals' },
  { id: 'events', label: '8. Campus Events' },
  { id: 'profile', label: '9. Student Profile' },
  { id: 'analytics', label: '10. Progress Analytics' },
  { id: 'focus', label: 'AI Focus Engine', tag: 'AI' },
  { id: 'planner', label: 'Smart Day Planner', tag: 'AI' },
  { id: 'assistant', label: 'AI Study Assistant', tag: 'AI' },
];

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  onNavigate,
  unreadCount,
  unreadNotificationCount,
  student,
  onOpenAgileOverview,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navigate = onSelectScreen || onNavigate || (() => {});
  const effectiveUnread = unreadCount ?? unreadNotificationCount ?? 0;
  const studentName = student?.name || 'Anand B';
  const studentSemester = student?.semester || 'Sem 3';
  const studentUniversity = student?.university || 'SVYASA';
  const studentInitials =
    studentName
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AB';

  const currentScreenObj = SCREENS_LIST.find((s) => s.id === currentScreen);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand: CAMPUSFLOW AI */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-button"
              onClick={() => navigate('dashboard')}
              className="flex items-center gap-2.5 text-left group transition-transform hover:scale-[1.01] cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                    CAMPUSFLOW
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    MCA AI/ML
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                  "Your College Life. Simplified."
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Shortcuts: Core Academic Screens */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              id="nav-shortcut-dashboard"
              onClick={() => navigate('dashboard')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'dashboard'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-shortcut-classes"
              onClick={() => navigate('classes')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'classes'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-indigo-700'
              }`}
            >
              Classes
            </button>
            <button
              id="nav-shortcut-attendance"
              onClick={() => navigate('attendance')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'attendance'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Attendance
            </button>
            <button
              id="nav-shortcut-assignments"
              onClick={() => navigate('assignments')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'assignments'
                  ? 'bg-white text-purple-700 shadow-2xs'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              Assignments
            </button>
            <button
              id="nav-shortcut-exams"
              onClick={() => navigate('exams')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'exams'
                  ? 'bg-white text-amber-700 shadow-2xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              Exams
            </button>
            <button
              id="nav-shortcut-analytics"
              onClick={() => navigate('analytics')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                currentScreen === 'analytics'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Analytics
            </button>
            <button
              id="nav-shortcut-assistant"
              onClick={() => navigate('assistant')}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
                currentScreen === 'assistant'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                  : 'text-indigo-700 hover:bg-white/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Screen Switcher Dropdown (For rapid testing & CIA presentation) */}
          <div className="relative">
            <button
              id="screen-selector-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-800 transition shadow-2xs cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline text-slate-500 font-normal">View:</span>
              <span className="text-indigo-900 font-extrabold truncate max-w-[130px] sm:max-w-[170px]">
                {currentScreenObj?.label.replace(/^\d+\.\s*/, '') || 'Dashboard'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute top-full mt-2 w-72 -right-4 sm:right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <p className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
                      All Application Screens
                    </p>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      CIA Suite
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto py-1">
                    {SCREENS_LIST.map((item) => (
                      <button
                        key={item.id}
                        id={`nav-screen-${item.id}`}
                        onClick={() => {
                          navigate(item.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between font-medium transition cursor-pointer ${
                          currentScreen === item.id
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                        }`}
                      >
                        <span className="truncate pr-2">{item.label}</span>
                        {item.tag ? (
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.2 rounded shrink-0 ${
                              item.tag === 'AI'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.tag}
                          </span>
                        ) : currentScreen === item.id ? (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Actions: Agile Case Study, Notifications, Profile */}
          <div className="flex items-center gap-2">
            {/* Agile CIA Case Study */}
            <button
              id="agile-cia-overview-button"
              onClick={onOpenAgileOverview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-xs hover:shadow-md hover:from-purple-700 hover:to-indigo-700 transition cursor-pointer"
              title="Agile Methodologies CIA Project Case Study"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden md:inline">Agile CIA Case Study</span>
              <span className="md:hidden">Agile</span>
            </button>

            {/* Notification Bell */}
            <button
              id="header-notification-button"
              onClick={() => navigate('notifications')}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {effectiveUnread > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white">
                  {effectiveUnread}
                </span>
              )}
            </button>

            {/* Student Profile */}
            <button
              id="header-profile-button"
              onClick={() => navigate('profile')}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition border border-slate-200/60 cursor-pointer"
              title="View Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                {studentInitials}
              </div>
              <div className="hidden xl:block text-left pr-2">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {studentName}
                </p>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">
                  {studentSemester} • {studentUniversity}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
