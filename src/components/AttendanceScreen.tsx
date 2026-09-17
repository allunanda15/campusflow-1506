import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calculator,
  UserCheck,
  Award,
  HelpCircle,
  Plus,
  RefreshCw,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { AttendanceRecord } from '../types';

interface AttendanceScreenProps {
  records: AttendanceRecord[];
  onUpdateRecord?: (updated: AttendanceRecord[]) => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  records: initialRecords,
}) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [calcSubject, setCalcSubject] = useState<string>(initialRecords[3]?.subjectCode || '');
  const [classesToAttend, setClassesToAttend] = useState<number>(5);

  const totalClasses = records.reduce((acc, r) => acc + r.total, 0);
  const presentClasses = records.reduce((acc, r) => acc + r.present, 0);
  const absentClasses = records.reduce((acc, r) => acc + r.absent, 0);
  const overallPercentage = ((presentClasses / totalClasses) * 100).toFixed(1);

  // Shortage subjects (< 75%)
  const shortSubjects = records.filter((r) => r.percentage < 75);

  // Mark simulated attendance
  const simulateMark = (code: string, isPresent: boolean) => {
    setRecords((prev) =>
      prev.map((item) => {
        if (item.subjectCode === code) {
          const newPresent = isPresent ? item.present + 1 : item.present;
          const newAbsent = !isPresent ? item.absent + 1 : item.absent;
          const newTotal = item.total + 1;
          const newPct = parseFloat(((newPresent / newTotal) * 100).toFixed(1));
          return {
            ...item,
            present: newPresent,
            absent: newAbsent,
            total: newTotal,
            percentage: newPct,
            status: newPct < 75 ? 'danger' : 'safe',
          };
        }
        return item;
      })
    );
  };

  // Calculator helper
  const targetRecord = records.find((r) => r.subjectCode === calcSubject) || records[0];
  const projectedPresent = targetRecord ? targetRecord.present + classesToAttend : 0;
  const projectedTotal = targetRecord ? targetRecord.total + classesToAttend : 0;
  const projectedPct = targetRecord
    ? ((projectedPresent / projectedTotal) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              SVYASA University Regulations
            </span>
            <span className="text-xs text-slate-500">Minimum 75% Mandatory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Attendance Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time biometric attendance records across all 3rd Semester MCA subjects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Overall Status:</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-sm border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {overallPercentage}% (Eligible)
          </span>
        </div>
      </div>

      {/* Mandatory 75% Attendance Warning Alert (Requested in Prompt) */}
      {shortSubjects.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Attendance Alert: Your attendance is below 75%.
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 mt-0.5 max-w-2xl">
                Warning in{' '}
                <span className="font-bold underline text-white">
                  {shortSubjects.map((s) => `${s.subjectName} (${s.percentage}%)`).join(', ')}
                </span>
                . You are currently below the university eligibility threshold. Attend the next consecutive sessions to avoid CIA exam debarment.
              </p>
            </div>
          </div>
          <a
            href="#simulator"
            className="px-4 py-2 rounded-xl bg-white text-rose-700 font-extrabold text-xs hover:bg-rose-50 transition shrink-0 self-start sm:self-center shadow-sm"
          >
            Calculate Recovery →
          </a>
        </div>
      )}

      {/* Overall Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Overall Attendance
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {overallPercentage}%
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Target: 75% (+{(parseFloat(overallPercentage) - 75).toFixed(1)}% buffer)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Present Classes
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600">
              {presentClasses}
            </span>
            <span className="text-xs text-slate-400">sessions</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Attended successfully</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Absent Classes
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-rose-600">
              {absentClasses}
            </span>
            <span className="text-xs text-slate-400">sessions</span>
          </div>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">
            Leave / Medical exemptions
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Classes
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-600">
              {totalClasses}
            </span>
            <span className="text-xs text-slate-400">conducted</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Till current semester week</p>
        </div>
      </div>

      {/* Subject-Wise Attendance List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Subject-Wise Attendance Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Core MCA courses, specializations & laboratory modules
            </p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Simulate attend/miss with buttons
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((record) => {
            const isDanger = record.percentage < 75;
            return (
              <div
                key={record.subjectCode}
                className={`p-5 rounded-2xl border transition-all ${
                  isDanger
                    ? 'bg-rose-50/40 border-rose-200 hover:border-rose-400'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                } shadow-2xs flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                          {record.subjectCode}
                        </span>
                        {isDanger && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold animate-pulse">
                            Below 75%
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">
                        {record.subjectName}
                      </h3>
                      <p className="text-xs text-slate-500">Faculty: {record.faculty}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-2xl font-black ${
                          isDanger ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {record.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 my-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDanger
                          ? 'bg-rose-500'
                          : record.percentage >= 85
                          ? 'bg-emerald-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.min(record.percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                    <span>
                      Present: <strong className="text-slate-800">{record.present}</strong> / {record.total}
                    </span>
                    <span>
                      Absent: <strong className="text-rose-600">{record.absent}</strong>
                    </span>
                  </div>
                </div>

                {/* Simulation Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Test Marking:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => simulateMark(record.subjectCode, true)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition flex items-center gap-1 border border-emerald-200"
                      title="Simulate Attending Today"
                    >
                      <Plus className="w-3 h-3" /> Present
                    </button>
                    <button
                      onClick={() => simulateMark(record.subjectCode, false)}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1 border border-rose-200"
                      title="Simulate Missed Class"
                    >
                      <Plus className="w-3 h-3" /> Absent
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Goal Simulator / Recovery Calculator */}
      <div
        id="simulator"
        className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-amber-300" />
          <h2 className="text-lg font-bold text-white">
            Interactive Attendance Target Calculator
          </h2>
        </div>
        <p className="text-xs text-purple-200 mb-5 max-w-xl">
          Simulate how many consecutive future classes you need to attend to cross the 75% or 80% mark.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-bold text-purple-200 block mb-1">
              Select Subject
            </label>
            <select
              value={calcSubject}
              onChange={(e) => setCalcSubject(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            >
              {records.map((r) => (
                <option key={r.subjectCode} value={r.subjectCode} className="text-slate-900">
                  {r.subjectName} ({r.percentage}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-purple-200 block mb-1">
              Number of Consecutive Classes to Attend
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={15}
                value={classesToAttend}
                onChange={(e) => setClassesToAttend(parseInt(e.target.value))}
                className="flex-1 accent-amber-400 cursor-pointer"
              />
              <span className="font-bold text-lg font-mono text-amber-300 w-8 text-center">
                +{classesToAttend}
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-purple-200 uppercase tracking-wider block">
                Projected Attendance
              </span>
              <span className="text-2xl font-black text-amber-300">
                {projectedPct}%
              </span>
              <p className="text-[11px] text-purple-100 mt-0.5">
                {parseFloat(projectedPct) >= 75 ? '✓ Meets 75% Requirement!' : 'Still below 75%'}
              </p>
            </div>
            <div className="text-right text-xs text-purple-200">
              <span className="block font-semibold">New Total:</span>
              <span className="font-mono font-bold text-white">
                {projectedPresent}/{projectedTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
