import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
  Coffee,
  Zap,
  Plus,
  ArrowRight,
  RefreshCw,
  Sliders,
  MapPin,
  CheckSquare
} from 'lucide-react';
import { AIDayPlanSlot, ScreenType } from '../types';
import { INITIAL_DAY_PLAN_SLOTS } from '../data/aiData';

interface SmartDayPlannerScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCustomizeAI?: () => void;
}

export const SmartDayPlannerScreen: React.FC<SmartDayPlannerScreenProps> = ({
  onNavigate,
  onOpenCustomizeAI,
}) => {
  const [slots, setSlots] = useState<AIDayPlanSlot[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_day_plan');
      return saved ? JSON.parse(saved) : INITIAL_DAY_PLAN_SLOTS;
    } catch {
      return INITIAL_DAY_PLAN_SLOTS;
    }
  });

  const [isOptimized, setIsOptimized] = useState<boolean>(true);
  const [optimizationBanner, setOptimizationBanner] = useState<string | null>(
    'AI optimized your day based on your deadlines.'
  );
  const [isOptimizingAnimation, setIsOptimizingAnimation] = useState<boolean>(false);
  const [showAddBlockModal, setShowAddBlockModal] = useState<boolean>(false);

  // New Block Form
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState<AIDayPlanSlot['type']>('study');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_day_plan', JSON.stringify(slots));
    } catch {}
  }, [slots]);

  const handleToggleSlotCompleted = (id: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleOptimizeDay = () => {
    setIsOptimizingAnimation(true);
    setTimeout(() => {
      // Reorder and ensure high-priority slots are prominent
      const optimized: AIDayPlanSlot[] = [
        {
          id: 'plan-1',
          time: '09:00 – 09:50',
          title: 'Big Data Analytics',
          type: 'class',
          subject: 'Big Data Analytics',
          subjectCode: 'MCAP341',
          location: 'Room 304 (Academic Block A)',
          faculty: 'Dr. Bharathi S',
          notes: 'Lecture on MapReduce and HDFS blocks.',
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
          title: 'Campus Lunch & Mindful Break',
          type: 'break',
          location: 'SVYASA Cafeteria & Garden Courtyard',
          notes: 'Optimal cognitive recharge.',
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
          notes: 'Sprint review preparation and burndown charts.',
          completed: false,
        },
        {
          id: 'plan-opt-1',
          time: '04:45 – 05:30',
          title: 'AI Study Slot: Agile UI Design',
          type: 'study',
          subject: 'Agile Methodologies',
          subjectCode: 'MCAP343',
          location: 'Innovation Hub Pod 3',
          isAIGenerated: true,
          notes: 'AI Scheduled: Final polish for tomorrow CIA presentation with Ms. Shubha C G.',
          completed: false,
        },
        {
          id: 'plan-opt-2',
          time: '06:00 – 06:45',
          title: 'AI Study Slot: R Programming Practice',
          type: 'study',
          subject: 'R Programming for Data Science',
          subjectCode: 'MCAP342',
          location: 'Central Library Quiet Zone',
          isAIGenerated: true,
          notes: 'AI Scheduled: Complete practice exercises due in 2 days for Dr. Vasumathi B.',
          completed: false,
        },
        {
          id: 'plan-opt-3',
          time: '08:00 – 08:30',
          title: 'AI Study Slot: Deep Learning Revision',
          type: 'study',
          subject: 'Deep Learning',
          subjectCode: 'MCAM341',
          location: 'Hostel Workstation',
          isAIGenerated: true,
          notes: 'AI Scheduled: CNN convolution backpropagation mathematics review.',
          completed: false,
        },
      ];

      setSlots(optimized);
      setIsOptimized(true);
      setIsOptimizingAnimation(false);
      setOptimizationBanner(
        'Your day has been optimized based on deadlines, attendance and upcoming exams.'
      );
    }, 600);
  };

  const handleAddCustomBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSlot: AIDayPlanSlot = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      time: newTime || '05:30 – 06:15',
      type: newType,
      notes: newNotes,
      completed: false,
      isAIGenerated: false,
    };

    setSlots((prev) => [...prev, newSlot]);
    setShowAddBlockModal(false);
    setNewTitle('');
    setNewTime('');
    setNewNotes('');
  };

  const completedCount = slots.filter((s) => s.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Planner Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-purple-200 border border-white/20 mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Smart Daily Agenda • Anand B (MCA AI/ML)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              SMART DAY PLANNER
            </h1>
            <p className="text-sm sm:text-base text-purple-200 mt-2 max-w-xl">
              An intelligent daily timeline that intertwines college lecture periods with dynamic AI study intervals and restorative breaks.
            </p>
          </div>

          {/* Action Button: Optimize My Day */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="optimize-day-button"
              onClick={handleOptimizeDay}
              disabled={isOptimizingAnimation}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-sm shadow-lg transition flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <Sparkles
                className={`w-4 h-4 text-slate-950 ${
                  isOptimizingAnimation ? 'animate-spin' : 'animate-pulse'
                }`}
              />
              <span>{isOptimizingAnimation ? 'Optimizing Day...' : '✨ Optimize My Day'}</span>
            </button>

            <button
              id="add-custom-block-btn"
              onClick={() => setShowAddBlockModal(true)}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 border border-white/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Block</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Optimization Banner as Requested */}
      {optimizationBanner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 text-indigo-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-indigo-950">
                {optimizationBanner}
              </p>
              <p className="text-xs text-indigo-700 mt-0.5">
                Calculated using: Agile CIA deadline (Tomorrow) • R Programming due date (2 Days) • Attendance risk (Math 72%)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
              {completedCount}/{slots.length} Completed
            </span>
          </div>
        </div>
      )}

      {/* Main Timeline View */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Today's Chronological Flow</h2>
            <p className="text-xs text-slate-500">
              Check off completed periods as your day unfolds
            </p>
          </div>
          <button
            id="focus-engine-jump-btn"
            onClick={() => onNavigate('focus')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Open Focus Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-6">
          {slots.map((slot) => {
            const isClass = slot.type === 'class';
            const isStudy = slot.type === 'study';
            const isBreak = slot.type === 'break';

            return (
              <div key={slot.id} className="relative pl-6 sm:pl-8 group">
                {/* Node on vertical timeline */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    slot.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isStudy
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-white text-white shadow-md'
                      : isBreak
                      ? 'bg-amber-400 border-white text-slate-950'
                      : 'bg-white border-indigo-600 text-indigo-600'
                  }`}
                >
                  {slot.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isStudy ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : isBreak ? (
                    <Coffee className="w-3.5 h-3.5" />
                  ) : (
                    <BookOpen className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Timeline Card */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition ${
                    slot.completed
                      ? 'bg-slate-50 border-slate-200/80 opacity-60'
                      : isStudy
                      ? 'bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white border-indigo-200 shadow-2xs hover:shadow-md'
                      : isBreak
                      ? 'bg-amber-50/40 border-amber-200/70'
                      : 'bg-white border-slate-200/90 hover:border-indigo-200 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {slot.time}
                      </span>
                      {slot.isAIGenerated && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          AI Study Slot
                        </span>
                      )}
                      {slot.subjectCode && (
                        <span className="text-xs font-bold text-slate-500">
                          {slot.subjectCode}
                        </span>
                      )}
                    </div>

                    {/* Toggle Button */}
                    <button
                      id={`toggle-slot-${slot.id}`}
                      onClick={() => handleToggleSlotCompleted(slot.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-lg transition flex items-center gap-1.5 self-start sm:self-auto ${
                        slot.completed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>{slot.completed ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>

                  <h3
                    className={`font-extrabold text-base sm:text-lg text-slate-900 mt-2 ${
                      slot.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {slot.title}
                  </h3>

                  {(slot.faculty || slot.location) && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap">
                      {slot.faculty && (
                        <span>
                          Faculty: <strong className="text-slate-700">{slot.faculty}</strong>
                        </span>
                      )}
                      {slot.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {slot.location}
                        </span>
                      )}
                    </p>
                  )}

                  {slot.notes && (
                    <p className="text-xs text-slate-600 mt-2 italic bg-white/70 p-2 rounded-xl border border-slate-100">
                      {slot.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Block Modal */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Agenda Block</h3>
            <form onSubmit={handleAddCustomBlock} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Block Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agile Mock CIA Rehearsal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  required
                  placeholder="05:30 – 06:15"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Category
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <option value="study">Study Session</option>
                  <option value="assignment">Assignment Work</option>
                  <option value="break">Break / Recreation</option>
                  <option value="event">Campus Event</option>
                  <option value="class">College Class</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Key deliverables or room location"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBlockModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  Add to Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
