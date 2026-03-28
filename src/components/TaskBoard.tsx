"use client";
import React, { useState } from 'react';
import { useStore, TaskType } from "@/store/useStore";
import { ExtendedTask } from "./TaskModals";
import { 
  Plus, Minus, Star, Circle, Flame, Check, X, 
  ListTodo, Repeat, Activity, CheckSquare, CalendarDays, RotateCcw
} from "lucide-react";
import { translations } from "@/utils/translations";

interface TaskBoardProps {
  searchQuery: string;
  activeCategory: string;
  openAddModal: (type: TaskType | null, fixed: boolean) => void;
  setSelectedTask: (task: ExtendedTask | null) => void;
}

export default function TaskBoard({ searchQuery, activeCategory, openAddModal, setSelectedTask }: TaskBoardProps) {
  const { tasks, toggleTaskDone, handleHabitPlus, handleHabitMinus, deleteTask, playSound, settings } = useStore();
  const extendedTasks = tasks as ExtendedTask[];
  const t = translations[settings?.language || 'id']?.tasks || translations['id'].tasks;

  // State Tabs per kolom
  const [habitTab, setHabitTab] = useState<'Semua'|'Lemah'|'Kuat'>('Semua');
  const [dailyTab, setDailyTab] = useState<'Semua'|'Tenggat Waktu'|'Tanpa Tenggat'>('Semua');
  const [todoTab, setTodoTab] = useState<'Aktif'|'Terjadwal'|'Selesai'>('Aktif');

  // Filter Global & Tabs
  const filteredGlobalTasks = extendedTasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === "Semua" || t.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const habits = filteredGlobalTasks.filter(t => t.type === 'habit' && (habitTab === 'Semua' || (habitTab === 'Kuat' && (t.habitCount || 0) >= 0) || (habitTab === 'Lemah' && (t.habitCount || 0) < 0)));
  const dailies = filteredGlobalTasks.filter(t => t.type === 'daily' && (dailyTab === 'Semua' || (dailyTab === 'Tenggat Waktu' && t.startDate) || (dailyTab === 'Tanpa Tenggat' && !t.startDate)));
  const todos = filteredGlobalTasks.filter(t => t.type === 'todo' && ((todoTab === 'Aktif' && !t.done) || (todoTab === 'Terjadwal' && !t.done && t.dueDate) || (todoTab === 'Selesai' && t.done)));

  const renderDifficultyStars = (difficulty: number, type: TaskType | null) => {
    const activeColor = type === 'habit' ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : type === 'daily' ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" : "fill-pink-400 text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]";
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map(star => <Star key={star} size={12} className={star <= difficulty ? activeColor : "fill-zinc-800 text-zinc-700"} />)}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 items-start pb-10">
      <style jsx global>{`
        @keyframes task-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); filter: brightness(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: task-pop 0.3s ease-out; }
      `}</style>

      {/* ==================== KOLOM 1: SIKLUS MISI (HABIT) ==================== */}
      <div className="bg-zinc-900 border-4 border-amber-600 rounded-none flex flex-col h-full min-h-[50vh] md:min-h-[75vh] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-amber-600 flex flex-col gap-3 bg-zinc-800">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-amber-500" />
            <h2 className="font-bold text-amber-400 uppercase tracking-wider">{t.habit}</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => { setHabitTab('Semua'); playSound('click'); }} className={`pb-1 ${habitTab === 'Semua' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.all}</button>
            <button onClick={() => { setHabitTab('Lemah'); playSound('click'); }} className={`pb-1 ${habitTab === 'Lemah' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.weak}</button>
            <button onClick={() => { setHabitTab('Kuat'); playSound('click'); }} className={`pb-1 ${habitTab === 'Kuat' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.strong}</button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          <button onClick={() => openAddModal('habit', true)} className="w-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-amber-500 text-zinc-400 hover:text-amber-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-amber-500/10">
            <Plus size={16} /> {t.addHabit}
          </button>
          
          {habits.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <Activity size={32} className="mb-3 text-amber-500 opacity-60" />
              <h3 className="text-xs font-bold text-amber-400 mb-1 uppercase tracking-wider">{t.noHabit}</h3>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                {t.habitDesc}
              </p>
            </div>
          )}

          {habits.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className={`group bg-zinc-800 border-2 border-zinc-700 hover:border-amber-500 p-4 rounded-none flex justify-between items-center shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all cursor-pointer ${task.done ? 'animate-pop' : ''}`}>
              <button onClick={(e) => { e.stopPropagation(); handleHabitPlus(task); }} className="w-8 h-8 shrink-0 bg-zinc-900 border border-zinc-600 hover:bg-emerald-500 hover:text-zinc-900 text-emerald-500 rounded-none flex items-center justify-center transition-colors"><Plus size={16}/></button>
              <div className="flex-1 px-3 flex flex-col">
                <span className="text-base font-bold text-zinc-200 line-clamp-1">{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-xs text-zinc-500 flex items-center gap-1"><Circle size={8} className="fill-zinc-500"/> {task.category}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-pink-500 transition-opacity mr-1"><X size={14}/></button>
                  <button onClick={(e) => { e.stopPropagation(); handleHabitMinus(task); }} className="w-8 h-8 bg-zinc-900 border border-zinc-600 hover:bg-pink-500 hover:text-zinc-900 text-pink-500 rounded-none flex items-center justify-center transition-colors"><Minus size={16}/></button>
                </div>
                <span className={`text-xs font-pixel mr-1 ${(task.habitCount || 0) < 0 ? 'text-pink-500' : 'text-zinc-500'}`}>{task.habitCount || 0}</span>
              </div>
            </div>
          ))}
          <div className="h-24 md:h-4 w-full shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* ==================== KOLOM 2: OPERASI HARIAN (DAILY) ==================== */}
      <div className="bg-zinc-900 border-4 border-cyan-600 rounded-none flex flex-col h-full min-h-[50vh] md:min-h-[75vh] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-cyan-600 flex flex-col gap-3 bg-zinc-800">
          <div className="flex items-center gap-2">
            <Repeat size={18} className="text-cyan-500" />
            <h2 className="font-bold text-cyan-400 uppercase tracking-wider">{t.daily}</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => { setDailyTab('Semua'); playSound('click'); }} className={`pb-1 ${dailyTab === 'Semua' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.all}</button>
            <button onClick={() => { setDailyTab('Tenggat Waktu'); playSound('click'); }} className={`pb-1 ${dailyTab === 'Tenggat Waktu' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.due}</button>
            <button onClick={() => { setDailyTab('Tanpa Tenggat'); playSound('click'); }} className={`pb-1 ${dailyTab === 'Tanpa Tenggat' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.noDue}</button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          <button onClick={() => openAddModal('daily', true)} className="w-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-cyan-500 text-zinc-400 hover:text-cyan-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-cyan-500/10">
            <Plus size={16} /> {t.addDaily}
          </button>

          {dailies.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <CalendarDays size={32} className="mb-3 text-cyan-500 opacity-60" />
              <h3 className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">{t.noDaily}</h3>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                {t.dailyDesc}
              </p>
            </div>
          )}

          {dailies.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className={`group border-2 p-4 rounded-none flex items-center gap-3 transition-all cursor-pointer shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] ${task.done ? 'bg-zinc-900 border-zinc-700 opacity-60 animate-pop' : 'bg-zinc-800 border-zinc-700 hover:border-cyan-500'}`}>
              <button onClick={(e) => { e.stopPropagation(); toggleTaskDone(task); }} className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center transition-colors border-2 ${task.done ? 'bg-emerald-500 border-emerald-500 text-zinc-950' : 'border-zinc-500 hover:border-cyan-400'}`}>
                {task.done && <Check size={14} strokeWidth={3} />}
              </button>
              <div className="flex-1 flex flex-col">
                <span className={`text-base font-bold line-clamp-1 transition-colors ${task.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-xs text-zinc-500 flex items-center gap-1"><Circle size={8} className="fill-zinc-500"/> {task.category}</span>
                  <span className="text-[10px] text-cyan-500/70 flex items-center gap-1"><Repeat size={12}/> Tiap {task.repeatEvery} {task.repeatUnit}</span>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-pink-500 transition-opacity"><X size={14}/></button>
            </div>
          ))}
          <div className="h-24 md:h-4 w-full shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* ==================== KOLOM 3: TARGET UTAMA (TO-DO) ==================== */}
      <div className="bg-zinc-900 border-4 border-pink-600 rounded-none flex flex-col h-full min-h-[50vh] md:min-h-[75vh] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-pink-600 flex flex-col gap-3 bg-zinc-800">
          <div className="flex items-center gap-2">
            <ListTodo size={18} className="text-pink-500" />
            <h2 className="font-bold text-pink-400 uppercase tracking-wider">{t.todo}</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => { setTodoTab('Aktif'); playSound('click'); }} className={`pb-1 ${todoTab === 'Aktif' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.active}</button>
            <button onClick={() => { setTodoTab('Terjadwal'); playSound('click'); }} className={`pb-1 ${todoTab === 'Terjadwal' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.scheduled}</button>
            <button onClick={() => { setTodoTab('Selesai'); playSound('click'); }} className={`pb-1 ${todoTab === 'Selesai' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-zinc-500 hover:text-zinc-300'}`}>{t.done}</button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          {todoTab !== 'Selesai' && (
            <button onClick={() => openAddModal('todo', true)} className="w-full bg-zinc-800 border-2 border-dashed border-zinc-600 hover:border-pink-500 text-zinc-400 hover:text-pink-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-pink-500/10">
              <Plus size={16} /> {t.addTodo}
            </button>
          )}

          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <CheckSquare size={32} className="mb-3 text-pink-500 opacity-60" />
              <h3 className="text-xs font-bold text-pink-400 mb-1 uppercase tracking-wider">{t.noTodo}</h3>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                {t.todoDesc}
              </p>
            </div>
          )}

          {todos.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className={`group border-2 p-4 rounded-none flex items-center gap-3 transition-all cursor-pointer shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] ${task.done ? 'bg-zinc-900 border-zinc-700 opacity-60 animate-pop' : 'bg-zinc-800 border-zinc-700 hover:border-pink-500'}`}>
              <button onClick={(e) => { e.stopPropagation(); toggleTaskDone(task); }} className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center transition-colors border-2 ${task.done ? 'bg-emerald-500 border-emerald-500 text-zinc-950' : 'border-zinc-500 hover:border-pink-400'}`}>
                {task.done && <Check size={14} strokeWidth={3} />}
              </button>
              <div className="flex-1 flex flex-col">
                <span className={`text-base font-bold line-clamp-1 transition-colors ${task.done ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-xs text-zinc-500 flex items-center gap-1"><Circle size={8} className="fill-zinc-500"/> {task.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                 {task.isBoss && !task.done && <span title="Boss Task"><Flame size={14} className="text-pink-500 animate-pulse" /></span>}
                 <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-pink-500 transition-opacity"><X size={14}/></button>
              </div>
            </div>
          ))}
          <div className="h-24 md:h-4 w-full shrink-0 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}