import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { Exam } from '../types';

interface ExamsScreenProps {
  exams: Exam[];
}

export const ExamsScreen: React.FC<ExamsScreenProps> = ({ exams }) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<number>(8); // 8 = September (0-indexed)
  const [calendarYear] = useState<number>(2026);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days remaining calculator
  const calculateDaysRemaining = (examDateStr: string) => {
    const today = new Date('2026-09-14'); // Context date
    const examDate = new Date(examDateStr);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Generate calendar days for current month view
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay(); // 0 = Sun

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prefixBlanks = Array.from({ length: firstDayIndex }, (_, i) => i);

  // Check if a date has an exam
  const getExamForDate = (dayNum: number) => {
    const monthFormatted = String(calendarMonth + 1).padStart(2, '0');
    const dayFormatted = String(dayNum).padStart(2, '0');
    const dateStr = `${calendarYear}-${monthFormatted}-${dayFormatted}`;
    return exams.find((e) => e.date === dateStr);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
              CIA Internal Assessment Schedule
            </span>
            <span className="text-xs text-slate-500">Academic Year 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Exam Planner & Hall Allocation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Continuous Internal Assessment (CIA-1) and practical lab internals timetable.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Next Exam: Agile Methodologies in 4 Days
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Calendar & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Monthly Calendar (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-600" />
                {monthNames[calendarMonth]} {calendarYear}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCalendarMonth((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCalendarMonth((prev) => Math.min(11, prev + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
              {prefixBlanks.map((_, i) => (
                <div key={`blank-${i}`} className="h-9" />
              ))}

              {daysArray.map((day) => {
                const exam = getExamForDate(day);
                const monthFormatted = String(calendarMonth + 1).padStart(2, '0');
                const dayFormatted = String(day).padStart(2, '0');
                const dateStr = `${calendarYear}-${monthFormatted}-${dayFormatted}`;
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      if (exam) setSelectedExam(exam);
                    }}
                    className={`h-10 rounded-xl flex flex-col items-center justify-center relative transition font-semibold ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : exam
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold hover:bg-amber-100'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{day}</span>
                    {exam && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-amber-300' : 'bg-amber-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Exam Scheduled on Date (Click to preview syllabus)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Selected Date Inspection</span>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Exams List (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Scheduled MCA Assessments
              </h2>
              <p className="text-xs text-slate-500">
                Exam timings, room allocations & days remaining
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              {exams.length} Upcoming
            </span>
          </div>

          <div className="space-y-3.5">
            {exams.map((exam) => {
              const daysLeft = calculateDaysRemaining(exam.date);
              const isUrgent = daysLeft <= 5;

              return (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExam(exam)}
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:shadow-md ${
                    selectedDate === exam.date
                      ? 'border-indigo-500 ring-2 ring-indigo-100 bg-indigo-50/20'
                      : 'border-slate-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 text-center shrink-0 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        {exam.type === 'Lab Internals' ? 'LAB' : 'CIA'}
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {exam.date.split('-')[2]}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold block">
                        {monthNames[parseInt(exam.date.split('-')[1]) - 1].slice(0, 3)}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                          {exam.subjectCode}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900">
                          {exam.subject}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          {exam.time}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-800 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {exam.classroom}
                        </span>
                        <span>•</span>
                        <span>Faculty: {exam.faculty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-black shadow-2xs ${
                        isUrgent
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {daysLeft > 0 ? `${daysLeft} Days Left` : 'Today'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Exam Detail & Syllabus Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-mono font-bold">
                  {selectedExam.subjectCode} • {selectedExam.type}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedExam.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Exam Date & Time</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedExam.date}</p>
                  <p className="text-[11px] text-indigo-600 font-mono font-semibold">{selectedExam.time}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Classroom / Hall</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedExam.classroom}</p>
                  <p className="text-[11px] text-slate-500">Max Marks: {selectedExam.maxMarks}</p>
                </div>
              </div>

              {/* Syllabus Outline */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Prescribed CIA Syllabus Units:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedExam.syllabus.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedExam(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
