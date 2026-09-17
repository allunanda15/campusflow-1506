import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  Assignment,
  StudyGoal,
  NotificationItem,
  CampusEvent,
  StudentProfile,
  AttendanceRecord
} from './types';
import {
  STUDENT_PROFILE,
  SUBJECTS,
  TIMETABLE,
  ATTENDANCE_DATA,
  INITIAL_ASSIGNMENTS,
  EXAMS_DATA,
  INITIAL_GOALS,
  CAMPUS_EVENTS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

// Core Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AgileOverviewModal } from './components/AgileOverviewModal';
import { DashboardScreen } from './components/DashboardScreen';
import { ClassesScreen } from './components/ClassesScreen';
import { AttendanceScreen } from './components/AttendanceScreen';
import { AssignmentsScreen } from './components/AssignmentsScreen';
import { ExamsScreen } from './components/ExamsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { StudyGoalsScreen } from './components/StudyGoalsScreen';
import { EventsScreen } from './components/EventsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';

// AI-Powered Product Screens
import { AIFocusEngineScreen } from './components/AIFocusEngineScreen';
import { SmartDayPlannerScreen } from './components/SmartDayPlannerScreen';
import { AIStudyAssistantScreen } from './components/AIStudyAssistantScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [isAgileModalOpen, setIsAgileModalOpen] = useState<boolean>(false);

  // Persistence State with LocalStorage fallbacks
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('campusflow_student');
      return saved ? JSON.parse(saved) : STUDENT_PROFILE;
    } catch {
      return STUDENT_PROFILE;
    }
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_assignments');
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_events');
      return saved ? JSON.parse(saved) : CAMPUS_EVENTS;
    } catch {
      return CAMPUS_EVENTS;
    }
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_attendance');
      return saved ? JSON.parse(saved) : ATTENDANCE_DATA;
    } catch {
      return ATTENDANCE_DATA;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('campusflow_student', JSON.stringify(student));
    } catch {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_assignments', JSON.stringify(assignments));
    } catch {}
  }, [assignments]);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_goals', JSON.stringify(studyGoals));
    } catch {}
  }, [studyGoals]);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_attendance', JSON.stringify(attendanceRecords));
    } catch {}
  }, [attendanceRecords]);

  // Assignment Handlers
  const handleAddAssignment = (newAssignmentData: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = {
      ...newAssignmentData,
      id: `asg-${Date.now()}`,
    };
    setAssignments((prev) => [newAssignment, ...prev]);

    // Also add a notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Assignment Created: ${newAssignment.title}`,
      message: `Due on ${newAssignment.dueDate} for ${newAssignment.subject}`,
      timestamp: 'Just now',
      category: 'Assignments',
      read: false,
      priority: 'normal',
      targetScreen: 'assignments',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleToggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Submitted' ? 'Pending' : 'Submitted';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  // Study Goal Handlers
  const handleToggleGoal = (id: string) => {
    setStudyGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddGoal = (newGoalData: Omit<StudyGoal, 'id' | 'createdDate'>) => {
    const newGoal: StudyGoal = {
      ...newGoalData,
      id: `goal-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setStudyGoals((prev) => [newGoal, ...prev]);
  };

  const handleDeleteGoal = (id: string) => {
    setStudyGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Event Handlers
  const handleToggleEventRegister = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const nextRegistered = !ev.registered;
          return {
            ...ev,
            registered: nextRegistered,
            seatsFilled: nextRegistered ? ev.seatsFilled + 1 : ev.seatsFilled - 1,
          };
        }
        return ev;
      })
    );
  };

  // Notification Handlers
  const handleToggleNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Profile Handlers
  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudent(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingTasksCount = assignments.filter((a) => a.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Top Professional Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        unreadNotificationCount={unreadCount}
        student={student}
        onOpenAgileOverview={() => setIsAgileModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
        {/* 1. Dashboard: AI Smart Dashboard */}
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            student={student}
            timetable={TIMETABLE}
            attendance={attendanceRecords}
            assignments={assignments}
            exams={EXAMS_DATA}
            notifications={notifications}
            onNavigate={setCurrentScreen}
            onOpenAgileOverview={() => setIsAgileModalOpen(true)}
          />
        )}

        {/* 2. AI Focus Engine ("WHAT SHOULD I DO NOW?") */}
        {currentScreen === 'focus' && (
          <AIFocusEngineScreen
            assignments={assignments}
            studyGoals={studyGoals}
            attendanceRecords={attendanceRecords}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* 3. Smart Day Planner */}
        {currentScreen === 'planner' && (
          <SmartDayPlannerScreen
            timetable={TIMETABLE}
            assignments={assignments}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* 4. AI Study Assistant ("Ask CampusFlow AI") */}
        {currentScreen === 'assistant' && (
          <AIStudyAssistantScreen
            student={student}
            timetable={TIMETABLE}
            attendanceRecords={attendanceRecords}
            assignments={assignments}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* 5. Classes Screen */}
        {currentScreen === 'classes' && (
          <ClassesScreen timetable={TIMETABLE} onOpenAgileOverview={() => setIsAgileModalOpen(true)} />
        )}

        {/* 6. Attendance Tracker */}
        {currentScreen === 'attendance' && (
          <AttendanceScreen records={attendanceRecords} />
        )}

        {/* 7. Assignments Manager */}
        {currentScreen === 'assignments' && (
          <AssignmentsScreen
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onToggleStatus={handleToggleAssignmentStatus}
            onDeleteAssignment={handleDeleteAssignment}
          />
        )}

        {/* 8. Exams Screen */}
        {currentScreen === 'exams' && <ExamsScreen exams={EXAMS_DATA} />}

        {/* 9. Smart Notifications Screen */}
        {currentScreen === 'notifications' && (
          <NotificationsScreen
            notifications={notifications}
            onToggleRead={handleToggleNotificationRead}
            onMarkAllRead={handleMarkAllNotificationsRead}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* 10. Study Goals Screen */}
        {currentScreen === 'goals' && (
          <StudyGoalsScreen
            goals={studyGoals}
            onToggleGoal={handleToggleGoal}
            onAddGoal={handleAddGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        )}

        {/* 11. Events Screen */}
        {currentScreen === 'events' && (
          <EventsScreen events={events} onToggleRegister={handleToggleEventRegister} />
        )}

        {/* 12. Student Profile & AI Settings */}
        {currentScreen === 'profile' && (
          <ProfileScreen
            student={student}
            studyGoals={studyGoals}
            onUpdateProfile={handleUpdateProfile}
            onOpenAgileOverview={() => setIsAgileModalOpen(true)}
          />
        )}

        {/* 13. AI Academic Insights & Analytics */}
        {currentScreen === 'analytics' && (
          <AnalyticsScreen
            attendanceRecords={attendanceRecords}
            assignments={assignments}
            studyGoals={studyGoals}
            cgpa={student.cgpa}
            onNavigate={setCurrentScreen}
            onOpenAgileOverview={() => setIsAgileModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        pendingTasksCount={pendingTasksCount}
        unreadNotificationCount={unreadCount}
      />

      {/* Comprehensive Agile Methodologies (CIA) Modal */}
      <AgileOverviewModal
        isOpen={isAgileModalOpen}
        onClose={() => setIsAgileModalOpen(false)}
        onNavigateToScreen={setCurrentScreen}
      />
    </div>
  );
}
