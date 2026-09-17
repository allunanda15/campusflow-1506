import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
  CheckSquare,
  MessageSquare
} from 'lucide-react';
import { AIFocusTask, ScreenType } from '../types';
import { AI_FOCUS_TASKS } from '../data/aiData';

interface AIFocusEngineScreenProps {
  tasks?: AIFocusTask[];
  onNavigate: (screen: ScreenType) => void;
  onOpenAssistantWithPrompt?: (prompt: string) => void;
}

export const AIFocusEngineScreen: React.FC<AIFocusEngineScreenProps> = ({
  tasks: initialTasks,
  onNavigate,
  onOpenAssistantWithPrompt,
}) => {
  const [taskList, setTaskList] = useState<AIFocusTask[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_focus_tasks');
      return saved ? JSON.parse(saved) : AI_FOCUS_TASKS;
    } catch {
      return AI_FOCUS_TASKS;
    }
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [activeTaskId, setActiveTaskId] = useState<string>(taskList[0]?.id || 'focus-1');

  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_focus_tasks', JSON.stringify(taskList));
    } catch {}
  }, [taskList]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleTaskCompleted = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const activeTask = taskList.find((t) => t.id === activeTaskId) || taskList[0];

  const filteredTasks = taskList.filter((t) => {
    if (activeFilter === 'All') return true;
    return t.priorityLevel === activeFilter;
  });

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const resetTimer = (minutes: number = 25) => {
    setTimerActive(false);
    setTimerSeconds(minutes * 60);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner / Engine Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Multi-Factor Ranking Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              WHAT SHOULD I DO NOW?
            </h1>
            <p className="text-sm sm:text-base text-purple-200 mt-2 leading-relaxed">
              CampusFlow AI dynamically synthesizes <strong className="text-white">Urgency, Difficulty, Deadline, Exam Proximity, Attendance Shortages</strong>, and <strong className="text-white">Academic Weight</strong> into a single ranked focus queue.
            </p>
          </div>

          {/* Pomodoro Focus Companion Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 sm:w-80 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Focus Timer
              </span>
              <span className="text-xs text-purple-200 truncate max-w-[140px]">
                {activeTask?.subject}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-center my-2 text-white">
              {formatTimer(timerSeconds)}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                id="toggle-focus-timer-btn"
                onClick={() => setTimerActive(!timerActive)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                  timerActive
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white'
                }`}
              >
                {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{timerActive ? 'Pause Session' : 'Start Focus'}</span>
              </button>
              <button
                id="reset-focus-timer-btn"
                onClick={() => resetTimer(25)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition"
                title="Reset to 25m"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['All', 'High', 'Medium', 'Low'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                id={`filter-${filter}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {filter === 'High' && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                {filter === 'Medium' && <Zap className="w-3.5 h-3.5 text-amber-500" />}
                {filter === 'Low' && <BookOpen className="w-3.5 h-3.5 text-blue-500" />}
                <span>{filter === 'All' ? 'All Ranked Tasks' : `${filter} Priority`}</span>
              </button>
            );
          })}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {taskList.filter((t) => t.completed).length} of {taskList.length} Completed
        </span>
      </div>

      {/* Main Content Layout: Priority List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ranked Task Queue */}
        <div className="lg:col-span-2 space-y-3">
          {filteredTasks.map((task, idx) => {
            const isSelected = activeTask?.id === task.id;
            const isHigh = task.priorityLevel === 'High';
            const isMed = task.priorityLevel === 'Medium';

            return (
              <div
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`p-4 sm:p-5 rounded-3xl border transition cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
                } ${task.completed ? 'opacity-60 bg-slate-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      type="button"
                      id={`check-task-${task.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskCompleted(task.id);
                      }}
                      className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center transition shrink-0 ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 hover:border-indigo-500 bg-white text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </button>

                    <div>
                      {/* Priority Badge */}
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                            isHigh
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : isMed
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {task.priorityBadge}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {task.subjectCode} • {task.subject}
                        </span>
                      </div>

                      <h3
                        className={`text-base font-extrabold text-slate-900 ${
                          task.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-rose-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {task.deadlineText}
                        </span>
                        <span>•</span>
                        <span>Est: {task.estimatedMinutes} mins</span>
                        <span>•</span>
                        <span className="text-slate-600 font-medium">
                          {task.academicImportance}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Rank Number */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                      #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* AI Rationale Strip */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 italic text-[11px] line-clamp-1">
                    💡 AI Rationale: {task.aiRationale}
                  </span>
                  <span className="text-indigo-600 font-bold text-[11px] shrink-0 ml-2 hover:underline">
                    View Matrix →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Deep Heuristic Inspector for Selected Task */}
        {activeTask && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  AI Decision Matrix
                </span>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  {activeTask.subjectCode}
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 mb-1">
                {activeTask.title}
              </h2>
              <p className="text-xs text-slate-500 mb-4">{activeTask.subject}</p>

              {/* Heuristics Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Urgency</span>
                    <span className="font-bold text-rose-600">
                      {activeTask.priorityLevel === 'High'
                        ? 'Critical (95%)'
                        : activeTask.priorityLevel === 'Medium'
                        ? 'Moderate (70%)'
                        : 'Low (40%)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        activeTask.priorityLevel === 'High'
                          ? 'bg-rose-500 w-[95%]'
                          : activeTask.priorityLevel === 'Medium'
                          ? 'bg-amber-500 w-[70%]'
                          : 'bg-blue-500 w-[40%]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Difficulty</span>
                    <span className="font-bold text-slate-800">{activeTask.difficulty}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{
                        width:
                          activeTask.difficulty === 'High'
                            ? '85%'
                            : activeTask.difficulty === 'Medium'
                            ? '60%'
                            : '35%',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Exam Proximity</span>
                    <span className="font-bold text-purple-600">
                      {activeTask.examProximityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{ width: `${activeTask.examProximityScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Attendance Risk Buffer</span>
                    <span
                      className={`font-bold ${
                        activeTask.attendanceRisk ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {activeTask.attendanceRisk ? 'Deficit Warning (<75%)' : 'Safe Standing'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rationale Card */}
              <div className="mt-5 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-indigo-900">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  AI Optimization Summary
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {activeTask.aiRationale}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  id="action-start-active-task-btn"
                  onClick={() => {
                    resetTimer(activeTask.estimatedMinutes || 25);
                    setTimerActive(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start {activeTask.estimatedMinutes}m Focus Session</span>
                </button>

                <button
                  id="action-ask-assistant-btn"
                  onClick={() => {
                    if (onOpenAssistantWithPrompt) {
                      onOpenAssistantWithPrompt(
                        `How should I best prepare and complete: "${activeTask.title}" for ${activeTask.subject}?`
                      );
                    } else {
                      onNavigate('assistant');
                    }
                  }}
                  className="w-full py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ask AI Copilot About This Task</span>
                </button>

                <button
                  id="action-toggle-complete-btn"
                  onClick={() => toggleTaskCompleted(activeTask.id)}
                  className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>{activeTask.completed ? 'Mark Incomplete' : 'Mark as Completed'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
