"use client";
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import StatusPanel from "@/components/StatusPanel";
import TaskBoard from "@/components/TaskBoard";
import { useStore, TaskType } from "@/store/useStore";
import { TaskFormModal, TaskDetailModal, GlobalAlerts, ExtendedTask } from "@/components/TaskModals";
import { 
  Search, Plus, Bell, Settings, Diamond, Coins, X, Check, CheckSquare, Filter
} from "lucide-react";
import Finance from "./finance";

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
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Kalkulasi Notifikasi Onboarding
  const isTaskCreated = tasks.length > 0;
  const isTaskCompleted = tasks.some(t => t.done === true);
  const onboardingProgress = (((isTaskCreated ? 1 : 0) + (isTaskCompleted ? 1 : 0)) / 2) * 100;

  const openAddModal = (type: TaskType | null, fixed: boolean = false) => {
    setFormType(type); 
    setIsFixed(fixed); 
    setIsFormOpen(true);
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

      {/* SIDEBAR */}
      <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex-1 flex flex-col h-screen relative">
        {/* HEADER */}
        <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-800 flex justify-between items-center px-8 z-50 shrink-0">
          
          <div className="flex items-center gap-4 w-2/3 max-w-2xl relative">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Cari tugas atau proyek..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none focus:border-purple-500 transition-all"
              />
            </div>
            
            <div className="relative shrink-0 flex items-center bg-slate-950 border border-slate-700 rounded-full px-4 py-2.5">
              <Filter size={16} className="text-slate-500 mr-2" />
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)} 
                className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer appearance-none pr-4"
              >
                {availableCategories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-full">
              <div className="flex items-center gap-1.5 text-emerald-400 font-pixel text-[8px]"><Diamond size={14}/> 0</div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[8px]"><Coins size={14}/> {stats.gold}</div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)} 
                className={`text-slate-400 hover:text-white transition-colors relative ${isNotifOpen ? 'text-white' : ''}`}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-900"></span>
              </button>

              {/* NOTIFICATION DROP-DOWN */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-slate-900 border-2 border-slate-700 rounded-lg shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <span className="font-bold text-sm text-white">System Logs</span>
                    <button onClick={() => setIsNotifOpen(false)} className="text-slate-500 hover:text-white"><X size={16}/></button>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="mt-1">
                        <div className="flex justify-between text-[10px] font-bold mb-1.5 text-slate-300">
                          <span>Onboarding</span>
                          <span className="text-amber-400">{onboardingProgress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 transition-all" style={{ width: `${onboardingProgress}%` }}></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className={`flex items-center gap-3 text-xs ${isTaskCreated ? 'text-slate-500' : 'text-slate-200'}`}>
                        {isTaskCreated ? <Check size={14} className="text-emerald-500"/> : <Plus size={14}/>} 
                        <span>Buat misi pertamamu</span>
                      </div>
                      <div className={`flex items-center gap-3 text-xs ${isTaskCompleted ? 'text-slate-500' : 'text-slate-200'}`}>
                        {isTaskCompleted ? <Check size={14} className="text-emerald-500"/> : <CheckSquare size={14}/>} 
                        <span>Selesaikan sebuah misi</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="text-slate-400 hover:text-white"><Settings size={20} /></button>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative flex flex-col scroll-smooth">
            {activeMenu === "Dashboard" ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-end mb-6 shrink-0">
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-wide mb-1">Command Center</h1>
                    <p className="text-sm text-slate-400">Status misi dan operasi harian.</p>
                  </div>
                  <button 
                    onClick={() => openAddModal(null, false)} 
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-xs font-bold transition-all active:scale-95"
                  >
                    <Plus size={18} /> Misi Baru
                  </button>
                </div>
                <TaskBoard 
                  searchQuery={searchQuery} 
                  activeCategory={activeCategory} 
                  openAddModal={openAddModal} 
                  setSelectedTask={setSelectedTask} 
                />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <Finance />
              </div>
            )}
          </main>

          {/* STATUS PANEL (Character HP/Energy) */}
          <StatusPanel />
        </div>
      </div>

      {/* OVERLAYS & MODALS */}
      <TaskFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialType={formType} 
        isFixed={isFixed} 
      />
      
      <TaskDetailModal 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />

      {/* ALERTS SYSTEM - Pastikan ini paling bawah dengan z-index tinggi */}
      <div className="relative z-[999]">
        <GlobalAlerts />
      </div>
      
    </div>
  );
}