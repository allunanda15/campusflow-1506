import React, { useState } from 'react';
import {
  X,
  Target,
  Users,
  GitPullRequest,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
  Kanban,
  Award,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AGILE_CASE_STUDY } from '../data/mockData';
import { ScreenType } from '../types';

interface AgileOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screen: ScreenType) => void;
}

export const AgileOverviewModal: React.FC<AgileOverviewModalProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'personas' | 'stories' | 'sprints' | 'kanban' | 'future'>('vision');
  const [kanbanFilter, setKanbanFilter] = useState<number>(1);

  if (!isOpen) return null;

  const currentSprint = AGILE_CASE_STUDY.sprints.find((s) => s.sprintNumber === kanbanFilter) || AGILE_CASE_STUDY.sprints[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            id="close-agile-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              MCA CIA Special
            </span>
            <span className="text-xs text-purple-200 font-medium">
              Course: MCAP343 Agile Methodologies • Faculty: Ms. Shubha C G
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-amber-300" />
            Agile Project Overview & Product Architecture
          </h2>
          <p className="text-sm text-purple-100 max-w-2xl mt-1">
            Product: <strong className="text-white">CAMPUSFLOW AI</strong> — "Your Campus. Your Goals. Your AI Copilot." | Designed by <strong className="text-white">Anand B</strong> (3rd Sem MCA AI/ML, SVYASA University)
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 overflow-x-auto gap-2 py-2">
          {[
            { id: 'vision', label: '1. Vision & Problem', icon: Target },
            { id: 'personas', label: '2. User Personas', icon: Users },
            { id: 'stories', label: '3. User Stories (10 Screens)', icon: BookOpen },
            { id: 'sprints', label: '4. Sprint Planning', icon: Zap },
            { id: 'kanban', label: '5. Sprint Board', icon: Kanban },
            { id: 'future', label: '6. Future Roadmap', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`agile-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {/* TAB 1: VISION */}
          {activeTab === 'vision' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2">
                    <Target className="w-5 h-5" />
                    <h3 className="text-base font-bold">Product Vision Statement</h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{AGILE_CASE_STUDY.productVision}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-white font-medium text-indigo-800 shadow-2xs">
                      Primary Target: MCA Students
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white font-medium text-indigo-800 shadow-2xs">
                      Methodology: Scrum & Agile Kanban
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white font-medium text-indigo-800 shadow-2xs">
                      Value: Zero Attendance Shortage & Deadline Adherence
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <div className="flex items-center gap-2 text-rose-700 font-bold mb-2">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-base font-bold">The Problem We Are Solving</h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {AGILE_CASE_STUDY.problemStatement}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Attendance dropping below the mandatory 75% university norm without early warning.
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Confusion between lecture halls and specialized GPU/Hadoop labs across 9 daily periods.
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Unstructured study sessions leading to CIA exam cramming.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Agile Framework Highlights */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Agile Methodologies (MCAP343) Principles Applied in CampusFlow
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <strong className="block text-indigo-700 font-bold mb-1">1. Customer Collaboration</strong>
                    Directly built around real MCA semester 3 timetable, Dr. Bharathi, Dr. Vasumathi, Ms. Shubha & Dr. Sowbhagya.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <strong className="block text-purple-700 font-bold mb-1">2. Working Software Over Docs</strong>
                    A fully interactive 10-screen application with functional state and persistence rather than just static wireframes.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <strong className="block text-emerald-700 font-bold mb-1">3. Responding to Change</strong>
                    Dynamic attendance simulation allows students to adapt to class changes and adjust study goals in real-time.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAS */}
          {activeTab === 'personas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {AGILE_CASE_STUDY.personas.map((persona, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                        {idx === 0 ? 'AB' : 'FAC'}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{persona.name}</h4>
                        <p className="text-xs text-indigo-600 font-medium">{persona.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <strong className="text-slate-800 font-semibold block mb-1">Primary Goals:</strong>
                        <ul className="space-y-1 text-slate-600">
                          {persona.goals.map((g, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-slate-800 font-semibold block mb-1">Frustrations:</strong>
                        <ul className="space-y-1 text-slate-600">
                          {persona.frustrations.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target Cohort: SVYASA MCA</span>
                    <span className="font-bold text-indigo-600">High Priority Persona</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: USER STORIES */}
          {activeTab === 'stories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Showing 8 Agile User Stories adhering to the <strong>INVEST</strong> criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable).
                </p>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  All 8 Implemented & Done
                </span>
              </div>

              <div className="space-y-3">
                {AGILE_CASE_STUDY.userStories.map((story) => (
                  <div key={story.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-mono text-xs font-bold">
                          {story.id}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{story.screen}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                          Priority: {story.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {story.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      <span className="text-indigo-600 font-bold">{story.role}</span>, {story.want},{' '}
                      <span className="text-slate-600 font-normal italic">{story.soThat}</span>
                    </p>

                    {/* Acceptance Criteria */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Acceptance Criteria:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {story.acceptanceCriteria.map((ac, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{ac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SPRINT PLANNING */}
          {activeTab === 'sprints' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AGILE_CASE_STUDY.sprints.map((sprint) => (
                  <div key={sprint.sprintNumber} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Sprint 0{sprint.sprintNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{sprint.duration}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{sprint.name}</h4>
                      <p className="text-xs text-slate-600 mb-3">{sprint.goal}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">Committed Velocity:</span>
                      <span className="text-purple-700 font-bold">{sprint.velocity} Story Points</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Velocity & Burndown Summary */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <h4 className="font-bold text-sm text-indigo-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  Agile Sprint Metrics & Velocity Track
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">Total Story Points</p>
                    <p className="text-xl font-black text-indigo-600">90 SP</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">Completed Velocity</p>
                    <p className="text-xl font-black text-emerald-600">100%</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">Avg Sprint Velocity</p>
                    <p className="text-xl font-black text-purple-600">30 SP</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">CIA Readiness</p>
                    <p className="text-xl font-black text-blue-600">Ready</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KANBAN BOARD */}
          {activeTab === 'kanban' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Select Sprint:</span>
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setKanbanFilter(num)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        kanbanFilter === num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Sprint {num}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {currentSprint.name}
                </span>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* To Do */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="font-bold text-xs text-slate-700 uppercase tracking-wider">To Do</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 rounded-full text-slate-700">0</span>
                  </div>
                  <p className="text-xs text-slate-400 italic text-center py-6">All tasks completed in current iteration.</p>
                </div>

                {/* In Progress */}
                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
                    <span className="font-bold text-xs text-amber-900 uppercase tracking-wider">In Progress</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200 rounded-full text-amber-900">0</span>
                  </div>
                  <p className="text-xs text-amber-700/60 italic text-center py-6">Sprint goals verified.</p>
                </div>

                {/* Done */}
                <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200">
                    <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider">Done (Definition of Done Met)</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 rounded-full text-emerald-900">
                      {currentSprint.tasks.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {currentSprint.tasks.map((task) => (
                      <div key={task.id} className="p-3 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-mono text-emerald-700 font-bold">{task.id}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                            {task.storyPoints} SP
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800">{task.title}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                          <span>Assignee: {task.assignee}</span>
                          <span className="flex items-center gap-1 text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FUTURE ROADMAP */}
          {activeTab === 'future' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Product Backlog: Future Enhancements (Release 2.0)</h4>
              <p className="text-xs text-slate-600">
                Identified during the Sprint 3 Retrospective as high-value candidate epics for the next product release cycle:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AGILE_CASE_STUDY.futureEnhancements.map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition shadow-2xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-xs">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{feat}</p>
                      <span className="text-[10px] text-slate-400 font-medium">Estimated for Release 2.0</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CIA Presentation:</span>
            <span className="text-slate-600">Anand B • MCA AI/ML 3rd Sem • SVYASA University</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Close Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
