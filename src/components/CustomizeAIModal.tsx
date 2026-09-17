import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, Clock, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { AIPreferences } from '../types';
import { SUBJECTS } from '../data/mockData';

interface CustomizeAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: AIPreferences;
  onSavePreferences: (updated: AIPreferences) => void;
}

export const CustomizeAIModal: React.FC<CustomizeAIModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [formData, setFormData] = useState<AIPreferences>(preferences);
  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePreferences(formData);
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Customize AI Recommendations
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calibrate CampusFlow AI algorithms to your study style
              </p>
            </div>
          </div>
          <button
            id="close-customize-ai-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center transition shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5">
          {/* Daily Study Hours Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Target Daily Self-Study
              </label>
              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                {formData.dailyStudyHours} Hours / Day
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={formData.dailyStudyHours}
              onChange={(e) =>
                setFormData({ ...formData, dailyStudyHours: parseFloat(e.target.value) })
              }
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              AI will distribute this target into balanced 45-minute focus intervals.
            </p>
          </div>

          {/* Preferred Study Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Preferred Study Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(
                [
                  'Morning (06:00 - 09:00)',
                  'Evening (04:30 - 08:00)',
                  'Night (08:30 - 11:30)',
                ] as const
              ).map((timeOpt) => (
                <button
                  type="button"
                  key={timeOpt}
                  onClick={() => setFormData({ ...formData, preferredStudyTime: timeOpt })}
                  className={`p-3 rounded-2xl border text-xs font-bold transition text-left flex flex-col justify-between ${
                    formData.preferredStudyTime === timeOpt
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-2xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{timeOpt.split(' ')[0]}</span>
                  <span className="text-[10px] font-normal text-slate-500 mt-1">
                    {timeOpt.match(/\((.*?)\)/)?.[1] || ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Sensitivity Threshold */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                Attendance Risk Warning Sensitivity
              </label>
            </div>
            <select
              value={formData.riskSensitivity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  riskSensitivity: e.target.value as AIPreferences['riskSensitivity'],
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Strict (Alert at 78%)">
                Strict (Alert when attendance drops below 78% — Early Prevention)
              </option>
              <option value="Standard (Alert at 75%)">
                Standard (Alert when attendance drops below 75% — University Baseline)
              </option>
              <option value="Relaxed (Alert at 70%)">
                Relaxed (Alert at 70% — High Risk Emergencies Only)
              </option>
            </select>
          </div>

          {/* Primary Subject Focus */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Primary Subject Priority
            </label>
            <select
              value={formData.primaryFocusSubject}
              onChange={(e) => setFormData({ ...formData, primaryFocusSubject: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub.code} value={`${sub.code} ${sub.name}`}>
                  {sub.code} — {sub.name} ({sub.faculty})
                </option>
              ))}
            </select>
          </div>

          {/* Pomodoro Duration & Auto Optimize */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Pomodoro Focus Interval
              </label>
              <div className="flex items-center gap-2">
                {[25, 45, 60].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setFormData({ ...formData, pomodoroDuration: mins })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      formData.pomodoroDuration === mins
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Auto-Optimize Day</p>
                <p className="text-[10px] text-slate-500">Recalibrate on new deadline</p>
              </div>
              <input
                type="checkbox"
                checked={formData.autoOptimizeSchedule}
                onChange={(e) =>
                  setFormData({ ...formData, autoOptimizeSchedule: e.target.checked })
                }
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Toast */}
          {isSavedToast && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Preferences updated successfully!</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-ai-preferences-btn"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Apply AI Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
