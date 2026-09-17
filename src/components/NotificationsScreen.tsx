import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  CalendarCheck,
  CheckCheck,
  Filter,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { NotificationItem, ScreenType } from '../types';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onToggleRead: (id: string) => void;
  onMarkAllRead: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onToggleRead,
  onMarkAllRead,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Classes', 'Assignments', 'Exams', 'Events', 'Attendance'];

  const filtered = notifications.filter((n) => {
    if (selectedCategory === 'All') return true;
    return n.category === selectedCategory;
  });

  const unreadTotal = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              Campus Intelligence
            </span>
            <span className="text-xs text-slate-500">Live College Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Smart Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Automated alerts for timetable changes, attendance shortage warnings, and CIA deadlines.
          </p>
        </div>

        {unreadTotal > 0 && (
          <button
            id="mark-all-read-btn"
            onClick={onMarkAllRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-2 self-start sm:self-center"
          >
            <CheckCheck className="w-4 h-4 text-indigo-600" />
            Mark All as Read ({unreadTotal})
          </button>
        )}
      </div>

      {/* Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`notif-filter-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isUrgent = item.priority === 'urgent';
          const isHigh = item.priority === 'high';

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !item.read
                  ? 'bg-white border-indigo-200 ring-1 ring-indigo-50/50'
                  : 'bg-slate-50/70 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Icon based on category */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUrgent
                      ? 'bg-rose-100 text-rose-600'
                      : item.category === 'Classes'
                      ? 'bg-blue-100 text-blue-600'
                      : item.category === 'Assignments'
                      ? 'bg-purple-100 text-purple-600'
                      : item.category === 'Exams'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {isUrgent ? (
                    <ShieldAlert className="w-5 h-5" />
                  ) : item.category === 'Classes' ? (
                    <BookOpen className="w-5 h-5" />
                  ) : item.category === 'Exams' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : item.category === 'Events' ? (
                    <CalendarCheck className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {item.timestamp}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      !item.read ? 'text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {item.targetScreen && (
                  <button
                    onClick={() => {
                      if (!item.read) onToggleRead(item.id);
                      onNavigate(item.targetScreen!);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onToggleRead(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    item.read
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {item.read ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-600">
            No notifications in this category.
          </p>
        </div>
      )}
    </div>
  );
};
