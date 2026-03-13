"use client";
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import StatusPanel from "@/components/StatusPanel";
import TaskBoard from "@/components/TaskBoard";
import DashboardBoard from "@/components/DashboardBoard";
import StatisticsBoard from "@/components/StatisticsBoard";
import ShopBoard from "@/components/ShopBoard";
import CharacterSelection from "@/components/CharacterSelection"; // <-- TAMBAHAN: Import form karakter
import { useStore, TaskType } from "@/store/useStore";
import {
  TaskFormModal,
  TaskDetailModal,
  GlobalAlerts,
  ExtendedTask,
  ToggleStatusPanelButton
} from "@/components/TaskModals";
import {
  Search,
  Plus,
  Bell,
  Settings,
  Diamond,
  Coins,
  X,
  Check,
  CheckSquare,
  Filter
} from "lucide-react";
import Finance from "./finance";
import CalendarBoard from "@/components/CalendarBoard";

// --- KOMPONEN TRANSISI RETRO (CYBER SHUTTERS) ---
const RetroTransition = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-[9999] pointer-events-none flex flex-col">
      <div className="bg-[#1a1b26] w-full animate-shutter-top border-b-4 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.5)] z-20"></div>

      <div className="absolute inset-0 flex items-center justify-center z-30">
        <span className="font-pixel text-2xl text-white tracking-[0.5em] animate-text-fade drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          LOADING
        </span>
      </div>

      <div className="bg-[#1a1b26] w-full animate-shutter-bottom border-t-4 border-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.5)] mt-auto z-20"></div>
    </div>
  );
};

export default function Home() {
  // <-- TAMBAHAN: Panggil userProfile dari store
  const { tasks, stats, checkDailyStreak, coinPopup, userProfile } = useStore();
  const extendedTasks = tasks as ExtendedTask[];

  // <-- TAMBAHAN: State untuk mencegah Hydration Error
  const [isMounted, setIsMounted] = useState(false);

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
  const [isStatusPanelOpen, setIsStatusPanelOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger dari dashboard ke finance
  const [dashboardFinanceAction, setDashboardFinanceAction] = useState<"rekening" | "tabungan" | null>(null);

  // Kalkulasi Notifikasi Onboarding
  const isTaskCreated = tasks.length > 0;
  const isTaskCompleted = tasks.some(t => t.done === true);
  const onboardingProgress = (((isTaskCreated ? 1 : 0) + (isTaskCompleted ? 1 : 0)) / 2) * 100;

  // <-- TAMBAHAN: Menandakan bahwa komponen sudah di-mount di browser
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    checkDailyStreak();
  }, [checkDailyStreak]);

  useEffect(() => {
    if (coinPopup.show) {
      setShowCoinAnim(true);
      const timer = setTimeout(() => setShowCoinAnim(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [coinPopup]);

  const openAddModal = (type: TaskType | null, fixed: boolean = false) => {
    setFormType(type);
    setIsFixed(fixed);
    setIsFormOpen(true);
  };

  const handleDashboardFinanceAction = (type: "rekening" | "tabungan") => {
    setDashboardFinanceAction(type);
    setActiveMenu("Keuangan");
  };

  const handleOpenBillsFromDashboard = () => {
    setDashboardFinanceAction(null);
    setActiveMenu("Keuangan");
  };

  const handleGoToFinance = () => {
    setDashboardFinanceAction(null);
    setActiveMenu("Keuangan");
  };

  const handleMenuChange = (menuName: string) => {
    if (menuName === activeMenu) return;

    const audio = new Audio('/sounds/glitch.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveMenu(menuName);
    }, 400);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // ========================================================
  // <-- TAMBAHAN: LOGIC GATES UNTUK HYDRATION & KARAKTER -->
  // ========================================================

  // 1. Mencegah Hydration Error (Tunggu sampai browser siap)
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center">
        <span className="font-pixel text-xl text-cyan-400 tracking-[0.2em] animate-pulse">
          SYSTEM BOOTING...
        </span>
      </div>
    );
  }

  // 2. Jika user belum memilih karakter, arahkan ke form pemilihan karakter
  if (!userProfile?.gender) {
    return <CharacterSelection onComplete={() => console.log("Karakter siap!")} />;
  }

  // ========================================================

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 h-full">
            <DashboardBoard
              onOpenTaskModal={(type) => openAddModal(type ?? null, false)}
              onOpenFinanceAction={handleDashboardFinanceAction}
              onOpenBills={handleOpenBillsFromDashboard}
              onGoToFinance={handleGoToFinance}
            />
          </div>
        );

      case "Misi":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 flex flex-col h-full">
            <div className="flex justify-between items-end mb-6 shrink-0">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide mb-1">Log Misi</h1>
                <p className="text-sm text-slate-400">Status misi dan operasi harian.</p>
              </div>

              <button
                onClick={() => openAddModal(null, false)}
                className="bg-[#24283b] border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 px-6 py-2.5 rounded-none flex items-center gap-2 text-xs font-bold transition-all shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]"
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
        );

        case "Toko & Loot":
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500 h-full">
      <ShopBoard />
    </div>
  );

      case "Keuangan":
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <Finance initialOpenType={dashboardFinanceAction} />
          </div>
        );

      case "Kalender":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 h-full">
            <CalendarBoard />
          </div>
        );

      case "Statistik":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 h-full">
            <StatisticsBoard />
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-[#24283b] rounded-none flex items-center justify-center mb-6 border-4 border-slate-700 border-dashed">
              <Settings size={40} className="animate-spin-slow opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-slate-300 mb-2">Fitur Belum Tersedia</h2>
            <p className="text-sm max-w-md text-center">
              Modul <span className="text-purple-400 font-bold">{activeMenu}</span> sedang dalam pengembangan.
              Silakan kembali lagi nanti!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-slate-200 font-mono flex overflow-hidden selection:bg-purple-500 selection:text-white relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .font-pixel {
          font-family: 'Press Start 2P', monospace;
          text-transform: uppercase;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0f172a;
        }

        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }

        @keyframes shutterTop {
          0% { height: 0; }
          40% { height: 50%; }
          60% { height: 50%; }
          100% { height: 0; }
        }

        @keyframes shutterBottom {
          0% { height: 0; }
          40% { height: 50%; }
          60% { height: 50%; }
          100% { height: 0; }
        }

        @keyframes textFade {
          0%, 30% { opacity: 0; transform: scale(0.9); }
          40%, 60% { opacity: 1; transform: scale(1); }
          70%, 100% { opacity: 0; transform: scale(1.1); }
        }

        .animate-shutter-top {
          animation: shutterTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-shutter-bottom {
          animation: shutterBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-text-fade {
          animation: textFade 0.8s linear forwards;
        }
      `}</style>

      <RetroTransition isActive={isTransitioning} />

      <Navbar activeMenu={activeMenu} setActiveMenu={handleMenuChange} />

      <div className="flex-1 flex flex-col h-screen relative z-10">
        <header className="min-h-20 bg-[#1a1b26] border-b-4 border-slate-700 flex flex-col lg:flex-row justify-between items-center gap-4 p-4 lg:px-8 z-50 shrink-0">
          <div className="flex items-center gap-4 w-full lg:w-2/3 max-w-2xl relative">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari misi..."
                className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none py-2.5 pl-12 pr-4 text-sm outline-none focus:border-purple-500 transition-all placeholder:text-slate-500 text-slate-200 shadow-[4px_4px_0_#000]"
              />
            </div>

            <div className="relative shrink-0 flex items-center bg-[#24283b] border-2 border-slate-600 rounded-none px-4 py-2.5 shadow-[4px_4px_0_#000]">
              <Filter size={16} className="text-slate-500 mr-2" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer appearance-none pr-4"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-4 px-4 py-1.5 bg-[#24283b] border-2 border-slate-600 rounded-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-pixel text-[8px]">
                <Diamond size={14} /> 0
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[8px]">
                <Coins size={14} /> {stats.gold}
              </div>
            </div>

            <ToggleStatusPanelButton
              isOpen={isStatusPanelOpen}
              onToggle={() => setIsStatusPanelOpen(!isStatusPanelOpen)}
            />

            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`text-slate-400 hover:text-white transition-colors relative ${isNotifOpen ? "text-white" : ""}`}
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-none border-2 border-[#1a1b26]"></span>
              </button>

              {showCoinAnim && (
                <div className="absolute top-full mt-4 right-0 w-max bg-[#24283b] border-2 border-amber-500 px-4 py-2.5 rounded-none shadow-[4px_4px_0_#000] flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300 z-[60] pointer-events-none">
                  <div className="bg-amber-500/20 p-1.5 rounded-none border border-amber-500">
                    <Coins size={16} className="text-amber-400 animate-bounce" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5">
                      Pendapatan
                    </span>
                    <span className="text-amber-400 font-pixel text-xs drop-shadow-sm">
                      +{coinPopup.amount} Gold
                    </span>
                  </div>
                </div>
              )}

              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-[#1a1b26] border-4 border-slate-700 rounded-none shadow-[8px_8px_0_#000] z-[100] animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  <div className="p-4 border-b-4 border-slate-700 flex justify-between items-center bg-[#24283b]">
                    <span className="font-bold text-sm text-white">System Logs</span>
                    <button onClick={() => setIsNotifOpen(false)} className="text-slate-500 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div className="mt-1">
                      <div className="flex justify-between text-[10px] font-bold mb-1.5 text-slate-300">
                        <span>Onboarding</span>
                        <span className="text-amber-400">{onboardingProgress}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-none border border-slate-600 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 transition-all"
                          style={{ width: `${onboardingProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className={`flex items-center gap-3 text-xs ${isTaskCreated ? 'text-slate-500' : 'text-slate-200'}`}>
                        {isTaskCreated ? <Check size={14} className="text-emerald-500" /> : <Plus size={14} />}
                        <span>Buat misi pertamamu</span>
                      </div>

                      <div className={`flex items-center gap-3 text-xs ${isTaskCompleted ? 'text-slate-500' : 'text-slate-200'}`}>
                        {isTaskCompleted ? <Check size={14} className="text-emerald-500" /> : <CheckSquare size={14} />}
                        <span>Selesaikan sebuah misi</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="text-slate-400 hover:text-white">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative flex flex-col scroll-smooth pb-24 md:pb-8">
            {renderContent()}
          </main>

          <StatusPanel isOpen={isStatusPanelOpen} onClose={() => setIsStatusPanelOpen(false)} />

          {isStatusPanelOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setIsStatusPanelOpen(false)}
            ></div>
          )}
        </div>
      </div>

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
      
      <GlobalAlerts />
    </div>
  );
}