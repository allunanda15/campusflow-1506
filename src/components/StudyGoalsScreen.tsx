import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Target,
  Sparkles,
  Calendar,
  Trash2,
  X,
  BookOpen,
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudyGoal } from '../types';
import { SUBJECTS } from '../data/mockData';

interface StudyGoalsScreenProps {
  goals: StudyGoal[];
  onToggleGoal: (id: string) => void;
  onAddGoal: (goal: Omit<StudyGoal, 'id' | 'createdDate'>) => void;
  onDeleteGoal: (id: string) => void;
}

export const StudyGoalsScreen: React.FC<StudyGoalsScreenProps> = ({
  goals,
  onToggleGoal,
  onAddGoal,
  onDeleteGoal,
}) => {
  const [activeTab, setActiveTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(SUBJECTS[0].name);

  const tabGoals = goals.filter((g) => g.category === activeTab);
  const completedCount = tabGoals.filter((g) => g.completed).length;
  const totalCount = tabGoals.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddGoal({
      title: newTitle.trim(),
      category: activeTab,
      completed: false,
      subject: newSubject,
    });

    setNewTitle('');
    setShowAddModal(false);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
              Academic Productivity Engine
            </span>
            <span className="text-xs text-slate-500">Self-Regulated Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Study Goals & Daily Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Break down CIA preparation into manageable Daily, Weekly, and Monthly sprint tasks.
          </p>
        </div>

        <button
          id="open-add-goal-modal-btn"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 transition flex items-center gap-2 self-start sm:self-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          + Add Goal
        </button>
      </div>

      {/* Tabs & Progress Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
        {/* Tabs: Daily / Weekly / Monthly */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-goal-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} Goals
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Progress:</span>
            <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              {completedCount}/{totalCount} Tasks Completed ({percentage}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Goals Checklist List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" />
          Active {activeTab} Tasks Checklist
        </h2>

        <div className="space-y-2.5">
          {tabGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                goal.completed
                  ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div
                onClick={() => {
                  onToggleGoal(goal.id);
                  if (!goal.completed) {
                    try {
                      confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.6 },
                      });
                    } catch {}
                  }
                }}
                className="flex items-center gap-3.5 flex-1 cursor-pointer"
              >
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition ${
                    goal.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-emerald-500 bg-white'
                  }`}
                >
                  {goal.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <p
                    className={`text-sm font-semibold transition ${
                      goal.completed
                        ? 'line-through text-slate-400 font-normal'
                        : 'text-slate-800'
                    }`}
                  >
                    {goal.title}
                  </p>
                  {goal.subject && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {goal.subject}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDeleteGoal(goal.id)}
                className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Delete Goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {tabGoals.length === 0 && (
          <div className="p-10 text-center text-slate-500 text-xs">
            No goals found for this period. Click "+ Add Goal" to set your academic targets!
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                + Add {activeTab} Study Goal
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Goal / Action Item *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practice Big Data Analytics MapReduce sets"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Associated Subject
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
