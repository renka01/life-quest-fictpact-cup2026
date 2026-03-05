"use client";
import React, { useState } from 'react';
import { useStore, TaskType } from "@/store/useStore";
import { ExtendedTask } from "./TaskModals";
import { 
  Plus, Minus, Star, Circle, Flame, Check, X, 
  ListTodo, Repeat, Activity, CheckSquare, CalendarDays, RotateCcw
} from "lucide-react";

interface TaskBoardProps {
  searchQuery: string;
  activeCategory: string;
  openAddModal: (type: TaskType | null, fixed: boolean) => void;
  setSelectedTask: (task: ExtendedTask | null) => void;
}

export default function TaskBoard({ searchQuery, activeCategory, openAddModal, setSelectedTask }: TaskBoardProps) {
  const { tasks, toggleTaskDone, handleHabitPlus, handleHabitMinus, deleteTask } = useStore();
  const extendedTasks = tasks as ExtendedTask[];

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
        {[1, 2, 3, 4].map(star => <Star key={star} size={10} className={star <= difficulty ? activeColor : "fill-slate-800 text-slate-700"} />)}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 items-start">
      {/* ==================== KOLOM 1: SIKLUS MISI (HABIT) ==================== */}
      <div className="bg-[#1a1b26] border-4 border-amber-600 rounded-none flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-amber-600 flex flex-col gap-3 bg-[#24283b]">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-amber-500" />
            <h2 className="font-bold text-amber-400">Siklus Misi</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => setHabitTab('Semua')} className={`pb-1 ${habitTab === 'Semua' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>Semua</button>
            <button onClick={() => setHabitTab('Lemah')} className={`pb-1 ${habitTab === 'Lemah' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>Lemah</button>
            <button onClick={() => setHabitTab('Kuat')} className={`pb-1 ${habitTab === 'Kuat' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-500 hover:text-slate-300'}`}>Kuat</button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          <button onClick={() => openAddModal('habit', true)} className="w-full bg-[#24283b] border-2 border-dashed border-slate-600 hover:border-amber-500 text-slate-400 hover:text-amber-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-amber-500/10">
            <Plus size={16} /> Tambah Siklus
          </button>
          
          {habits.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <Activity size={32} className="mb-3 text-amber-500 opacity-60" />
              <h3 className="text-xs font-bold text-amber-400 mb-1">Ini adalah Siklus-mu</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Misi yang bisa dilakukan berkali-kali tanpa jadwal ketat.<br/><br/>
                <span className="italic text-slate-500">Contoh: Minum 8 gelas air, Olahraga 15 menit, atau Makan Sayur.</span>
              </p>
            </div>
          )}

          {habits.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className="group bg-[#24283b] border-2 border-slate-700 hover:border-amber-500 p-3 rounded-none flex justify-between items-center shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all cursor-pointer">
              <button onClick={(e) => { e.stopPropagation(); handleHabitPlus(task); }} className="w-8 h-8 shrink-0 bg-[#1a1b26] border border-slate-600 hover:bg-emerald-500 hover:text-slate-900 text-emerald-500 rounded-none flex items-center justify-center transition-colors"><Plus size={16}/></button>
              <div className="flex-1 px-3 flex flex-col">
                <span className="text-sm font-bold text-slate-200 line-clamp-1">{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1"><Circle size={6} className="fill-slate-500"/> {task.category}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-pink-500 transition-opacity mr-1"><X size={14}/></button>
                  <button onClick={(e) => { e.stopPropagation(); handleHabitMinus(task); }} className="w-8 h-8 bg-[#1a1b26] border border-slate-600 hover:bg-pink-500 hover:text-slate-900 text-pink-500 rounded-none flex items-center justify-center transition-colors"><Minus size={16}/></button>
                </div>
                <span className={`text-[9px] font-pixel mr-1 ${(task.habitCount || 0) < 0 ? 'text-pink-500' : 'text-slate-500'}`}>{task.habitCount || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== KOLOM 2: OPERASI HARIAN (DAILY) ==================== */}
      <div className="bg-[#1a1b26] border-4 border-cyan-600 rounded-none flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-cyan-600 flex flex-col gap-3 bg-[#24283b]">
          <div className="flex items-center gap-2">
            <Repeat size={18} className="text-cyan-500" />
            <h2 className="font-bold text-cyan-400">Operasi Harian</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => setDailyTab('Semua')} className={`pb-1 ${dailyTab === 'Semua' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>Semua</button>
            <button onClick={() => setDailyTab('Tenggat Waktu')} className={`pb-1 ${dailyTab === 'Tenggat Waktu' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>Tenggat Waktu</button>
            <button onClick={() => setDailyTab('Tanpa Tenggat')} className={`pb-1 ${dailyTab === 'Tanpa Tenggat' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>Tanpa Tenggat</button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          <button onClick={() => openAddModal('daily', true)} className="w-full bg-[#24283b] border-2 border-dashed border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-cyan-500/10">
            <Plus size={16} /> Tambah Operasi
          </button>

          {dailies.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <CalendarDays size={32} className="mb-3 text-cyan-500 opacity-60" />
              <h3 className="text-xs font-bold text-cyan-400 mb-1">Ini adalah Operasi Harian-mu</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Misi yang berulang sesuai jadwal untuk menjaga kedisiplinanmu.<br/><br/>
                <span className="italic text-slate-500">Contoh: Rapikan tempat tidur, Beribadah, atau Minum Vitamin harian.</span>
              </p>
            </div>
          )}

          {dailies.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className={`group border-2 p-3 rounded-none flex items-center gap-3 transition-all cursor-pointer shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] ${task.done ? 'bg-[#1a1b26] border-slate-700 opacity-60' : 'bg-[#24283b] border-slate-700 hover:border-cyan-500'}`}>
              <button onClick={(e) => { e.stopPropagation(); toggleTaskDone(task); }} className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center transition-colors border-2 ${task.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500 hover:border-cyan-400'}`}>
                {task.done && <Check size={14} strokeWidth={3} />}
              </button>
              <div className="flex-1 flex flex-col">
                <span className={`text-sm font-bold line-clamp-1 transition-colors ${task.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1"><Circle size={6} className="fill-slate-500"/> {task.category}</span>
                  <span className="text-[9px] text-cyan-500/70 flex items-center gap-1"><Repeat size={10}/> Tiap {task.repeatEvery} {task.repeatUnit}</span>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-pink-500 transition-opacity"><X size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== KOLOM 3: TARGET UTAMA (TO-DO) ==================== */}
      <div className="bg-[#1a1b26] border-4 border-pink-600 rounded-none flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        <div className="p-4 border-b-4 border-pink-600 flex flex-col gap-3 bg-[#24283b]">
          <div className="flex items-center gap-2">
            <ListTodo size={18} className="text-pink-500" />
            <h2 className="font-bold text-pink-400">Target Utama</h2>
          </div>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => setTodoTab('Aktif')} className={`pb-1 ${todoTab === 'Aktif' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-slate-500 hover:text-slate-300'}`}>Aktif</button>
            <button onClick={() => setTodoTab('Terjadwal')} className={`pb-1 ${todoTab === 'Terjadwal' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-slate-500 hover:text-slate-300'}`}>Terjadwal</button>
            <button onClick={() => setTodoTab('Selesai')} className={`pb-1 ${todoTab === 'Selesai' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-slate-500 hover:text-slate-300'}`}>Selesai</button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          {todoTab !== 'Selesai' && (
            <button onClick={() => openAddModal('todo', true)} className="w-full bg-[#24283b] border-2 border-dashed border-slate-600 hover:border-pink-500 text-slate-400 hover:text-pink-400 p-3 rounded-none flex items-center justify-center gap-2 transition-all text-xs font-bold mb-2 hover:bg-pink-500/10">
              <Plus size={16} /> Tambah Target
            </button>
          )}

          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4 opacity-50 select-none">
              <CheckSquare size={32} className="mb-3 text-pink-500 opacity-60" />
              <h3 className="text-xs font-bold text-pink-400 mb-1">Ini adalah Target-mu</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Misi yang hanya perlu diselesaikan sekali untuk imbalan besar.<br/><br/>
                <span className="italic text-slate-500">Contoh: Bayar tagihan listrik, Beli kado ulang tahun, atau Bereskan kamar.</span>
              </p>
            </div>
          )}

          {todos.map(task => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className={`group border-2 p-3 rounded-none flex items-center gap-3 transition-all cursor-pointer shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] ${task.done ? 'bg-[#1a1b26] border-slate-700 opacity-60' : 'bg-[#24283b] border-slate-700 hover:border-pink-500'}`}>
              <button onClick={(e) => { e.stopPropagation(); toggleTaskDone(task); }} className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center transition-colors border-2 ${task.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500 hover:border-pink-400'}`}>
                {task.done && <Check size={14} strokeWidth={3} />}
              </button>
              <div className="flex-1 flex flex-col">
                <span className={`text-sm font-bold line-clamp-1 transition-colors ${task.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{task.title}</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                  {renderDifficultyStars(task.difficulty, task.type)}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1"><Circle size={6} className="fill-slate-500"/> {task.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                 {task.isBoss && !task.done && <span title="Boss Task"><Flame size={14} className="text-pink-500 animate-pulse" /></span>}
                 <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-pink-500 transition-opacity"><X size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}