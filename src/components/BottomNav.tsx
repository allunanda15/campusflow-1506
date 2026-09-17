import React from 'react';
import {
  Home,
  Calendar,
  CheckSquare,
  Ticket,
  User
} from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onSelectScreen?: (screen: ScreenType) => void;
  onNavigate?: (screen: ScreenType) => void;
  pendingTasksCount?: number;
  unreadNotificationCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  onNavigate,
  pendingTasksCount = 0,
}) => {
  const navigate = onSelectScreen || onNavigate || (() => {});
  const navItems: {
    id: ScreenType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'classes', label: 'Classes', icon: Calendar },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'events', label: 'Events', icon: Ticket },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg sm:hidden">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center relative transition-colors cursor-pointer ${
                isActive ? 'text-indigo-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center ring-1 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
