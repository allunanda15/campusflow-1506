import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Tag,
  Sparkles,
  Ticket,
  Filter,
  Cpu,
  Database,
  Code,
  Bot,
  Music,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CampusEvent } from '../types';

interface EventsScreenProps {
  events: CampusEvent[];
  onToggleRegister: (id: string) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  events,
  onToggleRegister,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Workshops', 'Seminars', 'Hackathons', 'Cultural', 'Sports'];

  const filtered = events.filter((ev) => {
    if (selectedCategory === 'All') return true;
    return ev.category === selectedCategory;
  });

  const getEventIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-white" />;
      case 'Database':
        return <Database className="w-6 h-6 text-white" />;
      case 'Code':
        return <Code className="w-6 h-6 text-white" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-white" />;
      case 'Music':
        return <Music className="w-6 h-6 text-white" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              Campus Life & Activities
            </span>
            <span className="text-xs text-slate-500">SVYASA University</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Campus Events & Hackathons
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Participate in AI masterclasses, hackathons, robotics challenges, and cultural festivals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
          <Ticket className="w-4 h-4 text-purple-600" />
          <span>{events.filter((e) => e.registered).length} Events Registered</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`event-cat-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event) => {
          return (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Event Image / Gradient Banner */}
              <div
                className={`h-40 bg-gradient-to-r ${event.bannerGradient} p-5 text-white flex flex-col justify-between relative`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/20">
                    {event.category}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    {getEventIcon(event.iconName)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {event.seatsFilled} / {event.seatsTotal} Registered ({event.seatsTotal - event.seatsFilled} seats left)
                    </span>
                  </div>
                </div>

                {/* Register Button (Interactive as requested) */}
                <div className="pt-2">
                  <button
                    id={`register-btn-${event.id}`}
                    onClick={() => {
                      onToggleRegister(event.id);
                      if (!event.registered) {
                        try {
                          confetti({
                            particleCount: 60,
                            spread: 70,
                            origin: { y: 0.7 },
                          });
                        } catch {}
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs ${
                      event.registered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {event.registered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered (Tap to Cancel)</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        <span>Register for Event</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
