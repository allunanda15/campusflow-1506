import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FlaskConical,
  BookOpen,
  Info,
  X,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { ClassSlot, SubjectInfo } from '../types';
import { SUBJECTS, TIME_SLOTS } from '../data/mockData';

interface ClassesScreenProps {
  timetable: ClassSlot[];
  onOpenAgileOverview?: () => void;
}

type DayType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export const ClassesScreen: React.FC<ClassesScreenProps> = ({ timetable }) => {
  const [selectedDay, setSelectedDay] = useState<DayType>('Monday');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedClass, setSelectedClass] = useState<ClassSlot | null>(null);

  const days: DayType[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const daySlots = timetable.filter((slot) => slot.day === selectedDay);

  // Helper to find slot in timetable
  const getSlotForDayAndTime = (day: DayType, timeSlot: string) => {
    return timetable.find((s) => s.day === day && s.timeSlot === timeSlot);
  };

  const selectedSubjectInfo = selectedClass
    ? SUBJECTS.find((s) => s.code === selectedClass.subjectCode)
    : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Screen Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              MCA Sem 3 (AI/ML)
            </span>
            <span className="text-xs text-slate-500">SVYASA University</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            My Classes & Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full 9-period daily schedule including theory lectures and GPU / Hadoop laboratories.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-center">
          <button
            id="view-mode-day-btn"
            onClick={() => setViewMode('day')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'day'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day Schedule
          </button>
          <button
            id="view-mode-week-btn"
            onClick={() => setViewMode('week')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'week'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Grid Matrix
          </button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              id={`day-tab-${day.toLowerCase()}`}
              onClick={() => {
                setSelectedDay(day);
                if (viewMode === 'week') setViewMode('day');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
                isSelected && viewMode === 'day'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-sm shadow-indigo-200'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: DAY SCHEDULE VIEW */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              {selectedDay}'s Class Schedule (9 Slots)
            </h2>
            <span className="text-xs text-slate-500">
              Click any class to view syllabus, faculty & venue details
            </span>
          </div>

          <div className="space-y-3">
            {TIME_SLOTS.map((slot, index) => {
              // Check if lunch break
              const isLunch = slot.includes('Lunch Break');
              if (isLunch) {
                return (
                  <div
                    key={slot}
                    className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-center gap-2 text-amber-900 text-xs font-bold"
                  >
                    <span>🍱 01:20 PM – 02:10 PM: Lunch Break (University Cafeteria & Student Commons)</span>
                  </div>
                );
              }

              const classInSlot = daySlots.find((c) => c.timeSlot === slot);

              if (!classInSlot) {
                return (
                  <div
                    key={slot}
                    className="p-4 rounded-2xl bg-white border border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-400"
                  >
                    <span className="font-mono font-semibold text-slate-500">{slot}</span>
                    <span className="italic">Free Study / Library Period</span>
                  </div>
                );
              }

              const subjectMeta = SUBJECTS.find((s) => s.code === classInSlot.subjectCode);

              return (
                <div
                  key={classInSlot.id}
                  id={`class-card-${classInSlot.id}`}
                  onClick={() => setSelectedClass(classInSlot)}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Time Slot badge */}
                    <div className="w-24 text-center shrink-0 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-indigo-50/50 transition">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Slot 0{index > 5 ? index : index + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-indigo-900">
                        {classInSlot.timeSlot.split('–')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        to {classInSlot.timeSlot.split('–')[1]?.trim()}
                      </span>
                    </div>

                    {/* Class Details */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="px-2 py-0.5 rounded-md text-[11px] font-bold text-white shadow-2xs"
                          style={{ backgroundColor: subjectMeta?.color || '#4F46E5' }}
                        >
                          {classInSlot.subjectCode}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition">
                          {classInSlot.subjectName}
                        </h3>
                        {classInSlot.isLab && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-200">
                            <FlaskConical className="w-3 h-3" /> Practical Lab
                          </span>
                        )}
                        {subjectMeta?.designation && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                            {subjectMeta.designation}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <User className="w-3.5 h-3.5 text-indigo-500" />
                          Faculty: {classInSlot.faculty}
                        </span>
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-purple-500" />
                          {classInSlot.classroom}
                        </span>
                      </div>

                      {classInSlot.topic && (
                        <p className="text-xs text-slate-600 mt-2 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 italic">
                          <strong className="text-slate-800 not-italic font-semibold">Today's Topic:</strong> {classInSlot.topic}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Details
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: WEEKLY GRID MATRIX */}
      {viewMode === 'week' && (
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm overflow-x-auto">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">Weekly Master Timetable Matrix</h2>
            <p className="text-xs text-slate-500">Comprehensive overview of Monday through Saturday classes</p>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-bold text-slate-700 w-28">Time Slot</th>
                {days.map((d) => (
                  <th key={d} className="p-3 font-bold text-slate-900 text-center">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TIME_SLOTS.map((slot) => {
                if (slot.includes('Lunch Break')) {
                  return (
                    <tr key={slot} className="bg-amber-50/50">
                      <td className="p-2.5 font-mono text-[11px] text-amber-900 font-bold">
                        01:20–02:10
                      </td>
                      <td colSpan={6} className="p-2.5 text-center font-bold text-amber-900">
                        🍱 Lunch Break (01:20 PM – 02:10 PM)
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={slot} className="hover:bg-slate-50/70 transition">
                    <td className="p-2.5 font-mono text-[11px] text-slate-600 font-semibold align-top whitespace-nowrap bg-slate-50/50">
                      {slot}
                    </td>
                    {days.map((day) => {
                      const item = getSlotForDayAndTime(day, slot);
                      if (!item) {
                        return (
                          <td key={day} className="p-2 text-center text-slate-300 italic align-top">
                            —
                          </td>
                        );
                      }
                      const subMeta = SUBJECTS.find((s) => s.code === item.subjectCode);
                      return (
                        <td
                          key={day}
                          onClick={() => setSelectedClass(item)}
                          className="p-2 align-top cursor-pointer hover:bg-indigo-50/80 transition"
                        >
                          <div
                            className="p-2 rounded-xl border text-[11px] shadow-2xs"
                            style={{
                              backgroundColor: `${subMeta?.color}10` || '#EEF2FF',
                              borderColor: `${subMeta?.color}40` || '#C7D2FE',
                            }}
                          >
                            <span className="font-bold block text-slate-900 line-clamp-1">
                              {item.subjectCode}
                            </span>
                            <span className="text-[10px] text-slate-600 block line-clamp-1">
                              {item.faculty.split(' ')[0]} {item.faculty.split(' ')[1]}
                            </span>
                            <span className="text-[9px] text-indigo-700 font-medium block mt-0.5">
                              {item.classroom}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Interactive Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-md text-xs font-bold text-white shadow-2xs"
                  style={{ backgroundColor: selectedSubjectInfo?.color || '#4F46E5' }}
                >
                  {selectedClass.subjectCode}
                </span>
                {selectedClass.isLab && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Lab Session
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedClass.subjectName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Master of Computer Applications (MCA 3rd Sem) • SVYASA University
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Faculty In-Charge</span>
                  <span className="font-bold text-slate-800 block text-xs mt-0.5">
                    {selectedClass.faculty}
                  </span>
                  {selectedSubjectInfo?.designation && (
                    <span className="text-[10px] text-purple-700 font-medium">
                      ({selectedSubjectInfo.designation})
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Classroom / Lab Venue</span>
                  <span className="font-bold text-slate-800 block text-xs mt-0.5">
                    {selectedClass.classroom}
                  </span>
                  <span className="text-[10px] text-slate-500">Prashanti Campus</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Day & Time Slot</span>
                  <span className="font-bold text-slate-800 block text-xs mt-0.5">
                    {selectedClass.day}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 font-semibold">
                    {selectedClass.timeSlot}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Academic Credits</span>
                  <span className="font-bold text-slate-800 block text-xs mt-0.5">
                    {selectedSubjectInfo?.credits || 4} Credit Points
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">Core Curriculum</span>
                </div>
              </div>

              {selectedClass.topic && (
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                  <span className="text-[11px] font-bold text-indigo-900 block mb-1">
                    Lesson Topic / Lab Module:
                  </span>
                  <p className="text-xs text-indigo-950 font-medium">
                    {selectedClass.topic}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedClass(null)}
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
