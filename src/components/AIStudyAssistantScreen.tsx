import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Calendar,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { AIChatMessage, ScreenType, StudentProfile } from '../types';
import { INITIAL_CHAT_MESSAGES, getAIResponseForPrompt } from '../data/aiData';

interface AIStudyAssistantScreenProps {
  student?: StudentProfile;
  initialQuery?: string;
  onNavigate: (screen: ScreenType) => void;
  onOpenAgileOverview?: () => void;
}

export const AIStudyAssistantScreen: React.FC<AIStudyAssistantScreenProps> = ({
  student,
  initialQuery,
  onNavigate,
  onOpenAgileOverview,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('campusflow_chat_history');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const studentName = student?.name || 'Anand B';

  useEffect(() => {
    try {
      localStorage.setItem('campusflow_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking and generate intelligent response
    setTimeout(() => {
      const response = getAIResponseForPrompt(text);
      const botMsg: AIChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const clearChatHistory = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
    try {
      localStorage.removeItem('campusflow_chat_history');
    } catch {}
  };

  const suggestedQuestions = [
    'What should I study today?',
    'Which subject is risky?',
    'Help me plan my day',
    'What assignments are urgent?',
    'How can I improve my attendance?',
    'How should I prepare for my exams?',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl flex items-center justify-between border border-indigo-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                CampusFlow AI
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Copilot
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Your Academic Copilot • MCA AI/ML at SVYASA University
            </p>
          </div>
        </div>

        <button
          id="clear-chat-history-btn"
          onClick={clearChatHistory}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition text-xs flex items-center gap-1.5 border border-white/10 shrink-0"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Questions Pills */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Ask CampusFlow AI — Quick Prompts</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-xs font-semibold whitespace-nowrap transition shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm min-h-[440px] max-h-[560px] overflow-y-auto flex flex-col space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  isUser
                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xs'
                    : 'bg-slate-900 text-amber-400 border border-indigo-900 shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-2xs'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {msg.text.split('\n').map((line, lIdx) => {
                    // Simple Markdown-like bold formatting
                    const boldProcessed = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={pIdx} className="font-extrabold text-inherit">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    });
                    return (
                      <p key={lIdx} className={line === '' ? 'h-2' : 'my-0.5'}>
                        {boldProcessed}
                      </p>
                    );
                  })}
                </div>

                {/* Optional Action Link inside Assistant Bubble */}
                {msg.actionLink && (
                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      id={`chat-action-${msg.id}`}
                      onClick={() => onNavigate(msg.actionLink!.screen)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400">CampusFlow Shortcut</span>
                  </div>
                )}

                {/* Follow-up Suggestion Chips if any */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold transition"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] mt-2 ${isUser ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-xs shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-medium text-slate-500 ml-1">
                CampusFlow AI analyzing records...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="flex items-center gap-2 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-sm"
      >
        <input
          type="text"
          id="chat-input-field"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask anything about timetable, attendance, exams, assignments..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          id="send-chat-btn"
          disabled={!inputVal.trim() || isTyping}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
        >
          <span>Ask Copilot</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
