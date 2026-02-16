"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import StatusPanel from "@/components/StatusPanel";
import TaskBoard from "@/components/TaskBoard";
import { useStore, TaskType } from "@/store/useStore";
import { TaskFormModal, TaskDetailModal, GlobalAlerts, ExtendedTask } from "@/components/TaskModals";
import { 
  Search, Plus, Bell, Settings, Diamond, Coins, Check, X, CheckSquare, Info, Filter
} from "lucide-react";

export default function Home() {
  const { tasks, stats } = useStore();
  const extendedTasks = tasks as ExtendedTask[];

  // --- STATE PENCARIAN & FILTER GLOBAL ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const availableCategories = ["Semua", ...Array.from(new Set(extendedTasks.map(t => t.category)))];

  // --- STATE MODAL CONTROLS ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<TaskType | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Kalkulasi Notifikasi
  const isTaskCreated = tasks.length > 0;
  const isTaskCompleted = tasks.some(t => t.done === true);
  const onboardingProgress = (( (isTaskCreated ? 1 : 0) + (isTaskCompleted ? 1 : 0) ) / 4) * 100;

  const openAddModal = (type: TaskType | null, fixed: boolean = false) => {
    setFormType(type); setIsFixed(fixed); setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-mono flex overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .font-pixel { font-family: 'Press Start 2P', monospace; text-transform: uppercase; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>

      <Navbar />

      <div className="flex-1 flex flex-col h-screen relative">
        <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-800 flex justify-between items-center px-8 z-50 shrink-0">
          
          {/* SEARCH & FILTER AREA */}
          <div className="flex items-center gap-4 w-2/3 max-w-2xl relative">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari tugas, catatan, atau proyek..." className="w-full bg-slate-950 border border-slate-700 rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-200 outline-none focus:border-purple-500 transition-colors"/>
            </div>
            <div className="relative shrink-0 flex items-center bg-slate-950 border border-slate-700 rounded-full px-4 py-2.5 hover:border-purple-500 transition-colors">
              <Filter size={16} className="text-slate-500 mr-2" />
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer appearance-none pr-4 max-w-[120px] truncate">
                {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-full">
              <div className="flex items-center gap-1.5 text-emerald-400 font-pixel text-[8px]"><Diamond size={14} className="fill-emerald-400/20"/> 0</div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[8px]"><Coins size={14} className="fill-amber-400/20"/> {stats.gold}</div>
            </div>

            <div className="relative">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`text-slate-400 hover:text-white transition-colors relative ${isNotifOpen ? 'text-white' : ''}`}>
                <Bell size={20} /><span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-900"></span>
              </button>
              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-slate-900 border-2 border-slate-700 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-4">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <span className="font-bold text-sm text-white">Notifikasi</span>
                    <button onClick={() => setIsNotifOpen(false)} className="text-slate-500 hover:text-pink-500 p-1 rounded-full hover:bg-slate-800 transition-all"><X size={16}/></button>
                  </div>
                  <div className="p-5 bg-slate-900 flex flex-col gap-4">
                     <div className="text-center">
                       <div className="flex justify-center gap-1 mb-2 text-amber-400"><Coins size={20}/> <Coins size={28} className="text-amber-300 -mt-1"/> <Coins size={20}/></div>
                       <h4 className="font-bold text-white text-sm">Persiapan</h4>
                       <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">Selesaikan panduan ini untuk mendapat bonus <span className="text-amber-400 font-bold">100 Emas</span> perdana!</p>
                     </div>
                     <div className="mt-1">
                        <div className="flex justify-between text-[10px] font-bold mb-1.5"><span className="text-slate-300">Perkembanganmu</span><span className="text-amber-400">{onboardingProgress}% kemajuan</span></div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${onboardingProgress}%` }}></div></div>
                     </div>
                     <div className="flex flex-col gap-4 mt-2 max-h-[40vh] overflow-y-auto">
                        <div className="flex gap-3 items-start">
                          <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border-2 ${isTaskCreated ? 'bg-emerald-500 border-emerald-500 text-slate-900' : 'bg-slate-800 border-slate-600 text-slate-500'}`}>
                            {isTaskCreated ? <Check size={12}/> : <Plus size={12}/>}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isTaskCreated ? 'text-slate-400 line-through' : 'text-slate-200'}`}>Buat misi pertamamu</span>
                            <span className="text-[10px] text-slate-500 mt-0.5">Catat apa saja yang ingin kamu capai minggu ini</span>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border-2 ${isTaskCompleted ? 'bg-emerald-500 border-emerald-500 text-slate-900' : 'bg-slate-800 border-slate-600 text-slate-500'}`}>
                            {isTaskCompleted ? <Check size={12}/> : <CheckSquare size={12}/>}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isTaskCompleted ? 'text-slate-400 line-through' : 'text-slate-200'}`}>Selesaikan sebuah misi</span>
                            <span className="text-[10px] text-slate-500 mt-0.5">Centang misimu untuk mulai mengumpulkan EXP dan Gold</span>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>
            <button className="text-slate-400 hover:text-white transition-colors"><Settings size={20} /></button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative flex flex-col">
            <div className="flex justify-between items-end mb-6 shrink-0">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide mb-1">Command Center</h1>
                <p className="text-sm text-slate-400">Atur prioritas dan klasifikasikan misimu.</p>
              </div>
              <button onClick={() => openAddModal(null, false)} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all">
                <Plus size={18} /> Misi Baru
              </button>
            </div>

            {/* KOMPONEN PAPAN TUGAS YANG TELAH DIPISAHKAN */}
            <TaskBoard 
              searchQuery={searchQuery} 
              activeCategory={activeCategory} 
              openAddModal={openAddModal} 
              setSelectedTask={setSelectedTask} 
            />

          </main>
          <StatusPanel />
        </div>
      </div>

      <TaskFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} initialType={formType} isFixed={isFixed} />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <GlobalAlerts />
      
    </div>
  );
}