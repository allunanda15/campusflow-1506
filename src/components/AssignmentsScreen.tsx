import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Calendar,
  X,
  Filter,
  Sparkles,
  Trash2,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Assignment } from '../types';
import { SUBJECTS } from '../data/mockData';

interface AssignmentsScreenProps {
  assignments: Assignment[];
  onAddAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  onToggleStatus: (id: string) => void;
  onDeleteAssignment: (id: string) => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  assignments,
  onAddAssignment,
  onToggleStatus,
  onDeleteAssignment,
}) => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Submitted' | 'All'>('Pending');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(SUBJECTS[0].name);
  const [newFaculty, setNewFaculty] = useState(SUBJECTS[0].faculty);
  const [newDueDate, setNewDueDate] = useState('2026-09-25');
  const [newDueTime, setNewDueTime] = useState('11:59 PM');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newDescription, setNewDescription] = useState('');

  // Handle subject change to auto-fill faculty
  const handleSubjectChange = (subjName: string) => {
    setNewSubject(subjName);
    const found = SUBJECTS.find((s) => s.name === subjName);
    if (found) setNewFaculty(found.faculty);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const matched = SUBJECTS.find((s) => s.name === newSubject);

    onAddAssignment({
      title: newTitle.trim(),
      subject: newSubject,
      subjectCode: matched?.code || 'MCA300',
      faculty: newFaculty,
      dueDate: newDueDate,
      dueTime: newDueTime,
      priority: newPriority,
      status: 'Pending',
      description: newDescription.trim() || 'CIA coursework task and report submission.',
      marks: '20 Marks',
    });

    // Reset & close
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const filteredAssignments = assignments.filter((item) => {
    // Tab filter
    if (activeTab === 'Pending' && item.status === 'Submitted') return false;
    if (activeTab === 'Submitted' && item.status !== 'Submitted') return false;

    // Subject filter
    if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;

    return true;
  });

  const pendingCount = assignments.filter((a) => a.status !== 'Submitted').length;
  const submittedCount = assignments.filter((a) => a.status === 'Submitted').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
              CIA Continuous Assessment
            </span>
            <span className="text-xs text-slate-500">MCA 3rd Semester</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Assignment Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track coursework, design deliverables, lab records, and individual projects.
          </p>
        </div>

        <button
          id="add-assignment-open-modal-btn"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2 self-start sm:self-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          + Add Assignment
        </button>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Tabs: Pending, Submitted, All */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            id="tab-assignments-pending"
            onClick={() => setActiveTab('Pending')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'Pending'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700">
              {pendingCount}
            </span>
          </button>
          <button
            id="tab-assignments-submitted"
            onClick={() => setActiveTab('Submitted')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'Submitted'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Submitted</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-700">
              {submittedCount}
            </span>
          </button>
          <button
            id="tab-assignments-all"
            onClick={() => setActiveTab('All')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'All'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({assignments.length})
          </button>
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssignments.map((assignment) => {
          const isSubmitted = assignment.status === 'Submitted';

          return (
            <div
              key={assignment.id}
              className={`p-5 sm:p-6 rounded-3xl border transition shadow-2xs flex flex-col justify-between ${
                isSubmitted
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white border-slate-200/90 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header Tags */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold">
                      {assignment.subjectCode}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        assignment.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : assignment.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {assignment.priority} Priority
                    </span>
                    {assignment.marks && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        {assignment.marks}
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                      isSubmitted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </>
                    )}
                  </span>
                </div>

                {/* Title & Subject */}
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-2">
                  {assignment.title}
                </h3>
                <p className="text-xs font-bold text-purple-700 mt-0.5">
                  {assignment.subject}
                </p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {assignment.description}
                </p>

                {/* Faculty & Due Date Metadata */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      Faculty Evaluator
                    </span>
                    <span className="font-semibold text-slate-800">
                      {assignment.faculty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      Submission Cut-off
                    </span>
                    <span className="font-semibold text-rose-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {assignment.dueDate} ({assignment.dueTime})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onToggleStatus(assignment.id);
                    if (!isSubmitted) {
                      try {
                        confetti({
                          particleCount: 70,
                          spread: 70,
                          origin: { y: 0.6 },
                        });
                      } catch {}
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSubmitted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  {isSubmitted ? 'Mark as Pending' : 'Mark as Submitted'}
                </button>

                <button
                  onClick={() => onDeleteAssignment(assignment.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Assignment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-600">
            No assignments found in this category.
          </p>
          <button
            onClick={() => setActiveTab('All')}
            className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
          >
            Show All Assignments
          </button>
        </div>
      )}

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                + Create New Assignment
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Individual Product UI Design"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Subject *
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Faculty *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFaculty}
                    onChange={(e) => setNewFaculty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description / Deliverable Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Details on what needs to be implemented or submitted..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-xs"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
