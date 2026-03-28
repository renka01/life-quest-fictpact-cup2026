"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Navbar from "@/components/Navbar";
import StatusPanel from "@/components/StatusPanel";
import TaskBoard from "@/components/TaskBoard";
import DashboardBoard from "@/components/DashboardBoard";
import StatisticsBoard from "@/components/StatisticsBoard";
import ShopBoard from "@/components/ShopBoard";
import CharacterSelection from "@/components/CharacterSelection";
import FocusArena from "@/components/FocusArena";
import { useStore, TaskType } from "@/store/useStore";
import AchievementBoard from "@/components/AchievementBoard";
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
  Filter,
  Trophy,
  LogOut
} from "lucide-react";
import Finance from "./finance";
import CalendarBoard from "@/components/CalendarBoard";
import SettingsBoard from "@/components/SettingsBoard";
import { translations } from "@/utils/translations";
import { signOut } from "next-auth/react";

// --- KOMPONEN TRANSISI RETRO (CYBER SHUTTERS) ---
const RetroTransition = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-[9999] pointer-events-none flex flex-col">
      <div className="bg-zinc-900 w-full animate-shutter-top border-b-4 border-amber-500 shadow-[0_0_50px_rgba(251,191,36,0.5)] z-20"></div>

      <div className="absolute inset-0 flex items-center justify-center z-30">
        <span className="font-pixel text-2xl text-white tracking-[0.5em] animate-text-fade drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          LOADING
        </span>
      </div>

      <div className="bg-zinc-900 w-full animate-shutter-bottom border-t-4 border-amber-500 shadow-[0_0_50px_rgba(251,191,36,0.5)] mt-auto z-20"></div>
    </div>
  );
};

export default function Home() {
  const { 
    tasks, stats, checkDailyStreak, coinPopup, userProfile, 
    setUserProfile, dailyProgress, claimDailyReward, playSound,
    inventory, accounts, equippedItems,
    hasLoadedFromCloud, setHasLoadedFromCloud 
  } = useStore();
  
  const router = useRouter(); 
  const extendedTasks = tasks as ExtendedTask[];

  const [isMounted, setIsMounted] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false); // STATE PENGUNCI LOADING
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [shopCategory, setShopCategory] = useState("all");
  const [financeCategory, setFinanceCategory] = useState("all");
  
  const defaultCategories = ["Kesehatan", "Pendidikan", "Pekerjaan", "Proyek"];
  const customCategories = Array.from(new Set(extendedTasks.map(t => t.category).filter(c => c && !defaultCategories.includes(c))));
  const availableCategories = ["Semua", ...defaultCategories, ...customCategories];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<TaskType | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatusPanelOpen, setIsStatusPanelOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- STATE UNTUK QUOTE ACAK ---
  const [quoteIndex, setQuoteIndex] = useState(0); 

  const [dashboardFinanceAction, setDashboardFinanceAction] = useState<"rekening" | "tabungan" | "tagihan" | null>(null);
  const { settings } = useStore();
  const tPage = translations[settings?.language || 'id']?.page || translations['id'].page;
  const tDropdown = translations[settings?.language || 'id']?.dropdown || translations['id'].dropdown;
  const tSyslog = translations[settings?.language || 'id']?.syslog || translations['id'].syslog;
  const tQuotes = translations[settings?.language || 'id']?.quotes || translations['id'].quotes;

  const isTaskCreated = tasks.length > 0;
  const isTaskCompleted = tasks.some(t => t.done === true);
  const onboardingProgress = (((isTaskCreated ? 1 : 0) + (isTaskCompleted ? 1 : 0)) / 2) * 100;

  const dp = dailyProgress || { loginClaimed: false, tasksCompleted: 0, taskClaimed: false, bossesDefeated: 0, bossClaimed: false };
  const hasClaimableQuests = (!dp.loginClaimed) || (dp.tasksCompleted >= 3 && !dp.taskClaimed) || (dp.bossesDefeated >= 1 && !dp.bossClaimed);

  useEffect(() => {
    setIsMounted(true);
    setQuoteIndex(Math.floor(Math.random() * 10));
  }, []);

  // ========================================================
  // <-- LOGIC GATES & CLOUD LOAD -->
  // ========================================================
  useEffect(() => {
    const initializeUser = async () => {
      if (!isMounted) return;

      try {
        const resProfile = await fetch('/api/user/profile');
        if (resProfile.ok) {
          const dbData = await resProfile.json();
          if (dbData && (dbData.accountName || dbData.email || dbData.nickname)) {
            
            setUserProfile({
              ...dbData,
              accountName: dbData.accountName || dbData.email || 'Petarung',
              nickname: dbData.nickname || (dbData.email ? dbData.email.split('@')[0] : 'Petarung')
            });

            // LOAD CLOUD DATA
            const progRes = await fetch('/api/progress');
            if (progRes.ok) {
              const progData = await progRes.json();
              if (progData.gameState) {
                 useStore.getState().loadFromCloud(progData.gameState);
              } else {
                 setHasLoadedFromCloud(true); 
              }
            }
            
            // BERHASIL LOAD SEMUA, BUKA GERBANG LOADING
            setIsAppReady(true);
            return; 
          }
        }
      } catch (err) { console.error(err); }
      
      router.push('/login');
    };

    initializeUser();
  }, [isMounted, router, setUserProfile, setHasLoadedFromCloud]);

  // ========================================================
  // 🔥 AUTO-SAVE BACKGROUND DAEMON 🔥
  // ========================================================
  useEffect(() => {
    if (!isMounted || !userProfile?.accountName || !hasLoadedFromCloud) return;
    
    const autoSaveTimer = setTimeout(() => {
      console.log("💾 Mengamankan progres ke Cloud..."); 
      useStore.getState().syncToCloud(); 
    }, 3000); 

    return () => clearTimeout(autoSaveTimer);
  }, [
    tasks, stats, dailyProgress, inventory, accounts, equippedItems, 
    isMounted, userProfile?.accountName, hasLoadedFromCloud
  ]);

  useEffect(() => {
    if (isMounted) checkDailyStreak();
  }, [checkDailyStreak, isMounted]);

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

  const handleDashboardFinanceAction = (type: "rekening" | "tabungan" | "tagihan") => {
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

  // UPDATE DARI TEMAN: Menggunakan await signOut() agar session di backend terhapus tuntas
  const handleLogout = async () => {
    setUserProfile({ accountName: "", nickname: "", gender: null, avatarId: null });
    setHasLoadedFromCloud(false); 
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const handleClaimReward = (type: 'login' | 'task' | 'boss') => {
    claimDailyReward(type);
    playSound('coin');
  };

  const handleMenuChange = (menuName: string) => {
    if (menuName === activeMenu) return;
    playSound('glitch');
    setSearchQuery("");
    setIsTransitioning(true);
    setTimeout(() => { setActiveMenu(menuName); }, 400);
    setTimeout(() => { setIsTransitioning(false); }, 800);
  };

  // ========================================================
  // RENDER PENGUNCI LOADING SPARTAN FULLSCREEN
  // ========================================================
  if (!isMounted || !isAppReady || !userProfile?.accountName) {
    return (
      <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center">
        <div className="mb-12 relative flex justify-center items-center" style={{ animation: 'float 2s ease-in-out infinite alternate' }}>
          <div className="absolute inset-0 bg-amber-500/30 blur-[50px] rounded-full animate-pulse" />
          <img 
            src="/favicon.ico" 
            alt="Daily Dungeon Loading" 
            className="w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]" 
            style={{ imageRendering: 'pixelated' }} 
          />
        </div>
        <div className="w-64 md:w-80 h-6 bg-zinc-900 border-4 border-zinc-700 p-0.5 relative overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <div className="h-full bg-amber-500" style={{ animation: 'fillBarPhase2 0.8s ease-out forwards' }} />
        </div>
        <style>{`
          @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 100%{ transform: translateY(-12px) rotate(5deg); } }
          @keyframes fillBarPhase2 { 0% { width: 80%; } 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }
  
  // Jika belum pilih gender (Character Selection)
  if (!userProfile?.gender) {
      return (
        <div className="animate-in fade-in duration-700">
          <CharacterSelection onComplete={() => console.log("Karakter siap!")} />
        </div>
      );
  }
  
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
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
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 flex flex-col w-full min-h-[80vh]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 shrink-0 border-b border-zinc-700/50 pb-6">
              <div className="flex flex-col gap-3 text-left">
                <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000] uppercase">
                  <span className="text-amber-500"><CheckSquare size={18} /></span> 
                  {translations[settings?.language || 'id']?.tasks?.log || "LOG MISI"}
                </h1>
                <p className="font-pixel text-[7px] md:text-[8px] text-zinc-400 uppercase leading-relaxed tracking-widest">
                  {translations[settings?.language || 'id']?.tasks?.logDesc || "STATUS MISI DAN OPERASI HARIAN."}
                </p>
              </div>

              <button
                onClick={() => openAddModal(null, false)}
                className="bg-zinc-800 border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-zinc-900 px-6 py-2.5 rounded-none flex items-center justify-center gap-2 text-[10px] font-pixel transition-all shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] shrink-0 uppercase"
              >
                <Plus size={14} /> {translations[settings?.language || 'id']?.tasks?.new || "MISI BARU"}
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
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <ShopBoard searchQuery={searchQuery} activeCategory={shopCategory} />
          </div>
        );

      case "Keuangan":
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full flex flex-col">
            <Finance initialOpenType={dashboardFinanceAction} searchQuery={searchQuery} activeCategory={financeCategory} />
          </div>
        );

      case "Kalender":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <CalendarBoard />
          </div>
        );

      case "Focus Arena":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <FocusArena />
          </div>
        );

      case "Statistik":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <StatisticsBoard />
          </div>
        );

      case "Pengaturan":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <SettingsBoard />
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-zinc-800 rounded-none flex items-center justify-center mb-6 border-4 border-zinc-700 border-dashed">
              <Settings size={40} className="animate-spin-slow opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">Fitur Belum Tersedia</h2>
            <p className="text-sm max-w-md text-center">
              Modul <span className="text-purple-400 font-bold">{activeMenu}</span> sedang dalam pengembangan.
            </p>
          </div>
        );

      case "Pencapaian":
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 w-full flex flex-col">
            <AchievementBoard />
          </div>
        );  

    }
  };

  const renderHeaderContent = () => {
    switch (activeMenu) {
      case "Misi":
        return (
          <>
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`${tPage.search}...`}
                className="w-full bg-zinc-800 border-2 border-zinc-600 rounded-none py-2.5 pl-12 pr-4 text-sm outline-none focus:border-purple-500 transition-all placeholder:text-zinc-500 text-zinc-200 shadow-[4px_4px_0_#000]"
              />
            </div>

            <div className="relative shrink-0 flex items-center bg-zinc-800 border-2 border-zinc-600 rounded-none px-4 py-2.5 shadow-[4px_4px_0_#000]">
              <Filter size={16} className="text-zinc-500 mr-2" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer appearance-none pr-4"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-900">
                    {cat === "Semua" ? tPage.allCat : cat}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      case "Toko & Loot":
        return (
          <>
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={`${tPage.search} di ${activeMenu}...`} className="w-full bg-zinc-800 border-2 border-zinc-600 rounded-none py-2.5 pl-12 pr-4 text-sm outline-none focus:border-amber-500 transition-all placeholder:text-zinc-500 text-zinc-200 shadow-[4px_4px_0_#000]" />
            </div>
            <div className="relative shrink-0 flex items-center bg-zinc-800 border-2 border-zinc-600 rounded-none px-4 py-2.5 shadow-[4px_4px_0_#000]">
              <Filter size={16} className="text-zinc-500 mr-2" />
              <select value={shopCategory} onChange={(e) => setShopCategory(e.target.value)} className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer appearance-none pr-4">
                <option value="all" className="bg-zinc-900">{tPage.allCat}</option>
                <option value="weapon" className="bg-zinc-900">{tPage.weapon}</option>
                <option value="armor" className="bg-zinc-900">{tPage.armor}</option>
                <option value="helmet" className="bg-zinc-900">{tPage.helmet}</option>
                <option value="cloak" className="bg-zinc-900">{tPage.cloak}</option>
                <option value="accessory" className="bg-zinc-900">{tPage.acc}</option>
                <option value="potion" className="bg-zinc-900">{tPage.potion}</option>
              </select>
            </div>
          </>
        );
      case "Keuangan":
        return (
          <>
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={`${tPage.search} di ${activeMenu}...`} className="w-full bg-zinc-800 border-2 border-zinc-600 rounded-none py-2.5 pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-500 text-zinc-200 shadow-[4px_4px_0_#000]" />
            </div>
            <div className="relative shrink-0 flex items-center bg-zinc-800 border-2 border-zinc-600 rounded-none px-4 py-2.5 shadow-[4px_4px_0_#000]">
              <Filter size={16} className="text-zinc-500 mr-2" />
              <select value={financeCategory} onChange={(e) => setFinanceCategory(e.target.value)} className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer appearance-none pr-4">
                <option value="all" className="bg-zinc-900">{tPage.allAcc}</option>
                <option value="rekening" className="bg-zinc-900">{tPage.wallet}</option>
                <option value="tabungan" className="bg-zinc-900">{tPage.saving}</option>
              </select>
            </div>
          </>
        );
      
      case "Dashboard": return <HeaderQuote text={tQuotes?.random?.[quoteIndex] || tQuotes.dash} />;
      case "Kalender": return <HeaderQuote text={tQuotes.cal} />;
      case "Focus Arena": return <HeaderQuote text={tQuotes.focus} />;
      case "Statistik": return <HeaderQuote text={tQuotes.stats} />;
      case "Pengaturan": return <HeaderQuote text={tQuotes.set} />;
      default: return null;
    }
  };

  const HeaderQuote = ({ text, accentColor = "amber", label = "HERO'S LOG" }: { 
    text: string; 
    accentColor?: "amber" | "teal" | "purple";
    label?: string;
  }) => (
    <div className="hidden md:flex relative max-w-xl w-full h-[54px] bg-zinc-800 border-2 border-zinc-600 shadow-[4px_4px_0_#000] overflow-hidden">
      <div className={`w-1.5 flex-shrink-0 ${accentColor === "teal" ? "bg-teal-500" : accentColor === "purple" ? "bg-purple-500" : "bg-amber-500"}`} 
           style={{ backgroundImage: `repeating-linear-gradient(to bottom, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)` }} />
      <div className="flex items-center gap-3 px-4 py-2 flex-1 min-w-0">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="font-pixel text-[6px] tracking-widest text-purple-400 uppercase">{label}</span>
          <span className="font-pixel text-[7px] md:text-[8px] text-zinc-300 leading-normal line-clamp-2">
            &quot;{text}&quot;
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-zinc-900 text-zinc-200 font-mono flex overflow-hidden selection:bg-purple-500 selection:text-white relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .font-pixel {
          font-family: 'Press Start 2P', monospace;
          text-transform: uppercase;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #18181b; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }

        ::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(1) saturate(5) hue-rotate(350deg);
          cursor: pointer;
        }

        input[type="number"] {
          color-scheme: dark;
        }

        @keyframes shutterTop { 0% { height: 0; } 40%, 60% { height: 50%; } 100% { height: 0; } }
        @keyframes shutterBottom { 0% { height: 0; } 40%, 60% { height: 50%; } 100% { height: 0; } }
        @keyframes textFade { 0%, 30% { opacity: 0; transform: scale(0.9); } 40%, 60% { opacity: 1; transform: scale(1); } 70%, 100% { opacity: 0; transform: scale(1.1); } }

        .animate-shutter-top { animation: shutterTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-shutter-bottom { animation: shutterBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-text-fade { animation: textFade 0.8s linear forwards; }
      `}</style>

      <RetroTransition isActive={isTransitioning} />

      <Navbar activeMenu={activeMenu} setActiveMenu={handleMenuChange} />

      <div className="flex-1 flex flex-col h-full relative z-10 min-w-0">

        <header className="h-auto min-h-[5rem] md:h-20 bg-zinc-900 border-b-4 border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 p-3 md:p-4 lg:px-8 z-50 shrink-0">
          
          <div className="flex items-center gap-2 md:gap-4 w-full md:flex-1 max-w-2xl relative h-full">
            {renderHeaderContent()}
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex items-center gap-2 px-2 sm:px-4 py-1.5 bg-zinc-800 border-2 border-zinc-600 rounded-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[8px] sm:text-[10px]">
                <Coins size={14} /> {stats?.gold || userProfile?.gold || 0}
              </div>
            </div>

            <ToggleStatusPanelButton
              isOpen={isStatusPanelOpen}
              onToggle={() => setIsStatusPanelOpen(!isStatusPanelOpen)}
            />

            <div className="relative">
              <button
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsSettingsOpen(false); }}
                className={`text-zinc-400 hover:text-white transition-colors relative ${isNotifOpen ? "text-white" : ""}`}
              >
                <Bell size={20} />
                {hasClaimableQuests && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-none border-2 border-zinc-900 animate-pulse"></span>
                )}
              </button>

              {showCoinAnim && (
                <div className="absolute top-full mt-4 right-0 w-max max-w-[90vw] bg-zinc-800 border-2 border-amber-500 px-3 sm:px-4 py-2 sm:py-2.5 rounded-none shadow-[4px_4px_0_#000] flex items-center gap-2 sm:gap-3 animate-in slide-in-from-top-2 fade-in duration-300 z-[60] pointer-events-none text-left">
                   <Coins size={16} className="text-amber-400 animate-bounce" />
                   <div className="flex flex-col">
                     <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">{tSyslog.income}</span>
                     <span className="text-amber-400 font-pixel text-xs drop-shadow-sm">+{coinPopup.amount} Gold</span>
                   </div>
                </div>
              )}

              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-72 sm:w-80 max-w-[90vw] bg-zinc-900 border-4 border-zinc-700 rounded-none shadow-[8px_8px_0_#000] z-[100] animate-in fade-in slide-in-from-top-2 overflow-hidden text-left">
                  <div className="p-4 border-b-4 border-zinc-700 flex justify-between items-center bg-zinc-800">
                    <span className="font-bold text-sm text-white uppercase tracking-widest">{tSyslog.title}</span>
                    <button onClick={() => setIsNotifOpen(false)} className="text-zinc-500 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col gap-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest border-b-2 border-zinc-700 pb-2 mb-1 flex items-center gap-2">
                        <CheckSquare size={14}/> {tSyslog.dailyQuests}
                      </h4>
                      
                      <div className={`flex flex-col gap-2 p-3 border-2 ${dp.loginClaimed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-zinc-800 border-zinc-600'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-bold ${dp.loginClaimed ? 'text-emerald-500/70 line-through' : 'text-zinc-200'}`}>{tSyslog.login}</span>
                            <span className="text-[9px] text-amber-400 font-pixel mt-1">15 XP | 10 G</span>
                          </div>
                          {dp.loginClaimed ? (
                            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 border border-emerald-500/20">{tSyslog.done}</span>
                          ) : (
                            <button onClick={() => handleClaimReward('login')} className="px-3 py-1.5 bg-amber-500 text-amber-950 text-[10px] font-bold uppercase hover:bg-amber-400 transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none shrink-0">{tSyslog.claim}</button>
                          )}
                        </div>
                      </div>

                      <div className={`flex flex-col gap-2 p-3 border-2 ${dp.taskClaimed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-zinc-800 border-zinc-600'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5 w-full pr-4">
                            <span className={`text-xs font-bold ${dp.taskClaimed ? 'text-emerald-500/70 line-through' : 'text-zinc-200'}`}>{tSyslog.ops3}</span>
                            <span className="text-[9px] text-amber-400 font-pixel mt-1 mb-1">30 XP | 20 G</span>
                            <div className="w-full bg-zinc-900 h-1.5 border border-zinc-700">
                               <div className="bg-amber-400 h-full transition-all" style={{ width: `${Math.min(100, (dp.tasksCompleted / 3) * 100)}%` }}></div>
                            </div>
                          </div>
                          {dp.taskClaimed ? (
                            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 shrink-0">{tSyslog.done}</span>
                          ) : dp.tasksCompleted >= 3 ? (
                            <button onClick={() => handleClaimReward('task')} className="px-3 py-1.5 bg-amber-500 text-amber-950 text-[10px] font-bold uppercase hover:bg-amber-400 transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none shrink-0">{tSyslog.claim}</button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-bold shrink-0">{dp.tasksCompleted}/3</span>
                          )}
                        </div>
                      </div>

                      <div className={`flex flex-col gap-2 p-3 border-2 ${dp.bossClaimed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-zinc-800 border-zinc-600'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-bold ${dp.bossClaimed ? 'text-emerald-500/70 line-through' : 'text-zinc-200'}`}>{tSyslog.boss1}</span>
                            <span className="text-[9px] text-amber-400 font-pixel mt-1">50 XP | 30 G</span>
                          </div>
                          {dp.bossClaimed ? (
                            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 shrink-0">{tSyslog.done}</span>
                          ) : dp.bossesDefeated >= 1 ? (
                            <button onClick={() => handleClaimReward('boss')} className="px-3 py-1.5 bg-amber-500 text-amber-950 text-[10px] font-bold uppercase hover:bg-amber-400 transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none shrink-0">{tSyslog.claim}</button>
                          ) : (
                            <span className="text-[10px] text-zinc-500 font-bold shrink-0">{dp.bossesDefeated}/1</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {(!isTaskCreated || !isTaskCompleted) && (
                      <div className="mt-2 pt-4 border-t-2 border-zinc-700 border-dashed">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">{tSyslog.onboarding}</h4>
                        <div className="mt-1 mb-3">
                          <div className="flex justify-between text-[10px] font-bold mb-1.5 text-zinc-300 uppercase">
                            <span>{tSyslog.advProg}</span>
                            <span>{onboardingProgress}%</span>
                          </div>
                          <div className="h-2 bg-zinc-900 border border-zinc-700 rounded-none overflow-hidden">
                            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${onboardingProgress}%` }}></div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {!isTaskCreated ? (
                            <div className="flex items-start gap-3 p-3 bg-pink-500/10 border-l-2 border-pink-500">
                              <CheckSquare size={14} className="text-pink-500 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-pink-400">{tSyslog.createFirst}</span>
                                <span className="text-[10px] text-zinc-400">{tSyslog.usePlus}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border-l-2 border-emerald-500 opacity-60">
                              <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-emerald-400 line-through">{tSyslog.createFirst}</span>
                                <span className="text-[10px] text-zinc-500">{tSyslog.done}</span>
                              </div>
                            </div>
                          )}

                          {!isTaskCompleted ? (
                            <div className="flex items-start gap-3 p-3 bg-pink-500/10 border-l-2 border-pink-500">
                              <CheckSquare size={14} className="text-pink-500 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-pink-400">{tSyslog.finishFirst}</span>
                                <span className="text-[10px] text-zinc-400">{tSyslog.checkFirst}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border-l-2 border-emerald-500 opacity-60">
                              <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-emerald-400 line-through">{tSyslog.finishFirst}</span>
                                <span className="text-[10px] text-zinc-500">{tSyslog.done}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsNotifOpen(false); }}
                className={`text-zinc-400 hover:text-white transition-colors ${isSettingsOpen ? "text-white" : ""}`}
              >
                <Settings size={20} />
              </button>
              
              {isSettingsOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-zinc-900 border-4 border-zinc-700 rounded-none shadow-[8px_8px_0_#000] z-[100] animate-in fade-in slide-in-from-top-2 overflow-hidden text-left">
                  <div className="flex flex-col">
                    <button onClick={() => { setActiveMenu("Pencapaian"); setIsSettingsOpen(false); }} className="px-4 py-3 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white text-left border-b border-zinc-800 transition-colors flex items-center gap-2"><Trophy size={14} /> {tDropdown.achievements}</button>                    <button onClick={() => { setActiveMenu("Pengaturan"); setIsSettingsOpen(false); }} className="px-4 py-3 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white text-left border-b border-zinc-800 transition-colors flex items-center gap-2"><Settings size={14} /> {tDropdown.settings}</button>
                    <button onClick={handleLogout} className="px-4 py-3 text-xs font-bold text-pink-500 hover:bg-pink-500/10 text-left transition-colors flex items-center gap-2"><LogOut size={14} /> {tDropdown.logout}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-zinc-900 p-4 lg:p-8 custom-scrollbar">
          {renderContent()}
          {/* Spacer fisik untuk menjamin konten mobile aman dari navbar */}
          <div className="h-32 md:h-8 w-full shrink-0 block pointer-events-none" />
        </main>
      </div>

      <StatusPanel isOpen={isStatusPanelOpen} onClose={() => setIsStatusPanelOpen(false)} />
      
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