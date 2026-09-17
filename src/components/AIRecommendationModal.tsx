import React from 'react';
import { X, Sparkles, Brain, CheckCircle2, ShieldAlert, Clock, ArrowRight } from 'lucide-react';
import { AI_DAILY_RECOMMENDATION } from '../data/aiData';
import { ScreenType } from '../types';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const { heuristicRules, confidenceScore, modelNote } = AI_DAILY_RECOMMENDATION.whyRationale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Why This Recommendation?
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                  AI Explainability
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-factor academic priority heuristics
              </p>
            </div>
          </div>
          <button
            id="close-ai-why-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center transition shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-indigo-900 text-white shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Algorithm Assessment
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {confidenceScore}
              </span>
            </div>
            <p className="text-sm font-medium text-purple-100 leading-relaxed">
              CampusFlow AI determined that completing your <strong className="text-white">Agile Methodologies UI Design</strong> yields the highest academic return today, followed immediately by <strong className="text-white">R Programming</strong> preparation and <strong className="text-white">Deep Learning</strong> lecture attendance.
            </p>
          </div>

          {/* Factor Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Weighted Decision Factors
            </h4>
            <div className="space-y-3">
              {heuristicRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      {rule.rule}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {rule.weight}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                    {rule.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Safeguard Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-950">Attendance Safeguard Guardrail:</strong>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                The algorithm automatically downranks low-urgency optional activities whenever any core subject (such as Mathematics at 72.0%) falls below the 75% attendance threshold.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center">
            {modelNote}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="modal-view-planner-btn"
            onClick={() => {
              onClose();
              onNavigate('planner');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>View Full Day Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            id="modal-close-why-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
