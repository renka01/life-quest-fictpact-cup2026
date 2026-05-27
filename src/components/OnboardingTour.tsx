"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles,
  Trophy,
  Compass,
  Minimize2
} from 'lucide-react';

interface OnboardingTourProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isStatusPanelOpen?: boolean;
  setIsStatusPanelOpen?: (open: boolean) => void;
}

interface Step {
  title: Record<string, string>;
  text: Record<string, string>;
  menu: string;
  targetId?: string;
  position?: 'bottom' | 'top' | 'left' | 'right' | 'center';
  offsetY?: number;
}

const STEPS: Step[] = [
  {
    title: { id: "SELAMAT DATANG DI DAILY DUNGEON! ⚔️", en: "WELCOME TO DAILY DUNGEON! ⚔️" },
    text: { 
      id: "Halo Pahlawan! Ini adalah gerbang awal petualanganmu. Daily Dungeon mengubah tugas harian, kebiasaan positif, dan pengelolaan keuanganmu menjadi game RPG yang epik!",
      en: "Hello Hero! This is the gateway to your adventure!"
    },
    menu: "Dashboard",
    position: "center"
  },
  {
    title: { id: "PANEL STATUS PAHLAWAN 🎭", en: "HERO STATUS PANEL 🎭" },
    text: {
      id: "Ini adalah panel profilmu. Di sini kamu bisa melihat Level, HP, dan EXP-mu.",
      en: "This is your profile panel."
    },
    menu: "Dashboard",
    targetId: "tour-status-panel",
    position: "left",
    offsetY: 20
  },
  {
    title: { id: "📋 MENU MISI", en: "📋 MISSION MENU" },
    text: {
      id: "Ini adalah pusat semua misimu. Kamu bisa mengelola Habit, Daily, dan To-Do di sini.",
      en: "This is the center of all your missions."
    },
    menu: "Misi",
    position: "center"
  },
  {
    title: { id: "🔄 SIKLUS MISI (HABIT)", en: "🔄 MISSION CYCLE" },
    text: {
      id: "Habit adalah kebiasaan yang bisa kamu ulang setiap hari tanpa batas.",
      en: "Habits are repeatable activities."
    },
    menu: "Misi",
    targetId: "tour-habit-column",
    position: "right"
  },
  {
    title: { id: "📅 OPERASI HARIAN (DAILY)", en: "📅 DAILY OPERATIONS" },
    text: {
      id: "Daily Task adalah tugas yang harus diselesaikan hari ini.",
      en: "Daily Tasks must be completed today."
    },
    menu: "Misi",
    targetId: "tour-daily-column",
    position: "right", 
    offsetY: 40       
  },
  {
    title: { id: "🎯 TARGET UTAMA (TO-DO)", en: "🎯 MAIN TARGET" },
    text: {
      id: "To-Do adalah misi besar yang cukup diselesaikan sekali.",
      en: "To-Dos are one-time big missions."
    },
    menu: "Misi",
    targetId: "tour-todo-column",
    position: "left"
  },
  {
    title: { id: "💰 MENU KEUANGAN", en: "💰 FINANCE MENU" },
    text: {
      id: "Kelola keuanganmu di sini!",
      en: "Manage your finances here!"
    },
    menu: "Keuangan",
    position: "center"
  },
  {
    title: { id: "👛 DOMPET & REKENING", en: "👛 WALLET & ACCOUNTS" },
    text: {
      id: "Catat saldo tunai dan rekening bankmu.",
      en: "Track your cash and bank accounts."
    },
    menu: "Keuangan",
    targetId: "tour-wallet-column",
    position: "right"
  },
  {
    title: { id: "🏦 TABUNGAN", en: "🏦 SAVINGS" },
    text: {
      id: "Simpan uang untuk target impianmu.",
      en: "Save money for your dreams."
    },
    menu: "Keuangan",
    targetId: "tour-savings-column",
    position: "right"
  },
  {
    title: { id: "📜 RIWAYAT TRANSAKSI", en: "📜 TRANSACTION HISTORY" },
    text: {
      id: "Semua pemasukan dan pengeluaran tercatat di sini.",
      en: "All transactions are recorded here."
    },
    menu: "Keuangan",
    targetId: "tour-history-column",
    position: "left"
  },
  {
    title: { id: "📅 KALENDER PETUALANGAN 📅", en: "📅 ADVENTURE CALENDAR" },
    text: {
      id: "Lihat jadwal sisa waktu operasi harian dan batasan jatuh tempo seluruh misimu di dalam Kalender Petualangan agar strategimu grinding tetap terpantau rapi.",
      en: "View missions in calendar view."
    },
    menu: "Kalender",
    targetId: "tour-nav-Kalender", // FIX: Menyorot langsung ke navigasi menu kalender aktif
    position: "right",
    offsetY: 10
  },
  {
    title: { id: "⏳ FOCUS ARENA (POMODORO) ⏳", en: "⏳ FOCUS ARENA" },
    text: {
      id: "Gunakan metode timer Pomodoro di Focus Arena untuk melatih disiplin pahlawanmu saat belajar atau bekerja. Setiap sesi fokus yang berhasil diselesaikan akan menghasilkan imbalan Gold tambahan!",
      en: "Use Pomodoro timer to focus."
    },
    menu: "Focus Arena",
    targetId: "tour-nav-FocusArena", // FIX: Menyorot langsung ke navigasi focus arena
    position: "right",
    offsetY: 10
  },
  {
    title: { id: "📊 AULA LAPORAN & STATISTIK 📊", en: "📊 STATISTICS" },
    text: {
      id: "Pantau visualisasi grafik perkembangan kekuatan pahlawanmu, grafik perputaran arus kas masuk-keluar, serta statistik rasio penyelesaian misi harianmu secara real-time.",
      en: "View your progress in charts."
    },
    menu: "Statistik",
    targetId: "tour-nav-Statistik", // FIX: Menyorot langsung ke navigasi statistik
    position: "right",
    offsetY: 10
  },
  {
    title: { id: "🛒 TOKO & ARMORY LOOT 🛒", en: "🛒 SHOP & LOOT" },
    text: {
      id: "Tempat membelanjakan tabungan Gold yang berhasil kamu kumpulkan! Lengkapi pahlawanmu dengan perlengkapan senjata kustom atau armor legendaris untuk memperkuat status pahlawanmu.",
      en: "Spend your Gold to buy items!"
    },
    menu: "Toko & Loot",
    targetId: "tour-nav-TokoLoot", // FIX: Menyorot langsung ke navigasi toko
    position: "right",
    offsetY: 10
  },
  {
    title: { id: "🎉 SELAMAT BERPETUALANG! 🎉", en: "🎉 HAPPY ADVENTURING! 🎉" },
    text: {
      id: "Persiapan komando awal petualanganmu telah selesai. Kamu sekarang siap naik level dan menjadi pahlawan legendaris di Daily Dungeon!",
      en: "You are now ready to be a hero!"
    },
    menu: "Dashboard",
    position: "center"
  }
];

const TOOLTIP_WIDTH = 320;
const TOOLTIP_MARGIN = 8;

export default function OnboardingTour({ 
  activeMenu, 
  setActiveMenu,
  isStatusPanelOpen,
  setIsStatusPanelOpen
}: OnboardingTourProps) {
  const { settings, updateSetting, playSound } = useStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999
  });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lang = settings.language || 'id';
  const currentData = STEPS[currentStep];

  // Auto open/close status panel
  useEffect(() => {
    if (setIsStatusPanelOpen) {
      setIsStatusPanelOpen(currentStep === 1);
    }
  }, [currentStep, setIsStatusPanelOpen]);

  // Play sound on first step
  useEffect(() => {
    if (currentStep === 0) {
      playSound('glitch');
    }
  }, [currentStep, playSound]);

  // Perhitungan penempatan koordinat Highlight & Tooltip
  const updateHighlight = useCallback(() => {
    if (!currentData || !currentData.targetId) {
      setHighlightStyle({ display: 'none' });
      setTargetRect(null);
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999
      });
      return;
    }

    const element = document.getElementById(currentData.targetId);
    if (!element) {
      setHighlightStyle({ display: 'none' });
      setTargetRect(null);
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999
      });
      return;
    }

    const rect = element.getBoundingClientRect();
    setTargetRect(rect);

    const padding = 6;
    setHighlightStyle({
      position: 'fixed',
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      borderRadius: '4px',
      border: '3px solid #f59e0b',
      boxShadow: '0 0 15px #f59e0b',
      zIndex: 99998,
      pointerEvents: 'none'
    });

    let top = rect.bottom + 20 + (currentData.offsetY || 0);
    let left = rect.left + rect.width / 2;
    let transform = 'translateX(-50%)';

    if (currentData.position === 'left') {
      left = rect.left - 20; 
      transform = 'translateX(-100%)'; 
      top = rect.top + (currentData.offsetY || 0); 
    } else if (currentData.position === 'right') {
      left = rect.right + 20;
      transform = 'translateX(0)';
      top = rect.top + (currentData.offsetY || 0);
    }

    let absoluteLeft = left;
    if (transform === 'translateX(-100%)') {
      absoluteLeft = left - TOOLTIP_WIDTH;
    } else if (transform === 'translateX(-50%)') {
      absoluteLeft = left - TOOLTIP_WIDTH / 2;
    }

    if (absoluteLeft < TOOLTIP_MARGIN) {
      left = TOOLTIP_MARGIN;
      transform = 'translateX(0)';
    } else if (absoluteLeft + TOOLTIP_WIDTH > window.innerWidth - TOOLTIP_MARGIN) {
      left = window.innerWidth - TOOLTIP_MARGIN - TOOLTIP_WIDTH;
      transform = 'translateX(0)';
    }

    const estimatedTooltipHeight = 240;
    if (currentData.position !== 'left' && currentData.position !== 'right') {
      if (top + estimatedTooltipHeight > window.innerHeight - TOOLTIP_MARGIN) {
        top = Math.max(12, rect.top - estimatedTooltipHeight - 16);
      }
    } else {
      if (top + estimatedTooltipHeight > window.innerHeight - TOOLTIP_MARGIN) {
        top = window.innerHeight - estimatedTooltipHeight - TOOLTIP_MARGIN;
      }
    }

    setTooltipStyle({
      position: 'fixed',
      top,
      left,
      transform,
      zIndex: 99999
    });
  }, [currentData]);

  useEffect(() => {
    const timer = setTimeout(updateHighlight, 600);
    return () => clearTimeout(timer);
  }, [currentStep, updateHighlight]);

  useEffect(() => {
    const handleScroll = () => {
      if (!currentData.targetId) return;
      const element = document.getElementById(currentData.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        const padding = 6;
        setHighlightStyle(prev => ({
          ...prev,
          top: rect.top - padding,
          left: rect.left - padding
        }));
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [currentData.targetId]);

  useEffect(() => {
    const scrollToTarget = () => {
      if (currentData.targetId) {
        const el = document.getElementById(currentData.targetId);
        if (el) {
          el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
        }
      }
    };
    
    const timer = setTimeout(scrollToTarget, 500);
    return () => clearTimeout(timer);
  }, [currentStep, currentData.targetId]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (!currentData.targetId) return;
        const element = document.getElementById(currentData.targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          setTargetRect(rect);
          const padding = 6;
          setHighlightStyle(prev => ({
            ...prev,
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2
          }));
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [currentData.targetId]);

  const handleNext = () => {
    playSound('click');
    const nextStep = currentStep + 1;
    if (nextStep < STEPS.length) {
      const nextData = STEPS[nextStep];
      if (nextData.menu !== activeMenu) {
        setActiveMenu(nextData.menu);
      }
      setCurrentStep(nextStep);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    playSound('click');
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      const prevData = STEPS[prevStep];
      if (prevData.menu !== activeMenu) {
        setActiveMenu(prevData.menu);
      }
      setCurrentStep(prevStep);
    }
  };

  const handleComplete = () => {
    playSound('success');
    updateSetting('tutorialCompleted', true);
    setIsCompleted(true);
  };

  const handleSkip = () => {
    playSound('glitch');
    updateSetting('tutorialCompleted', true);
    setIsCompleted(true);
  };

  if (isCompleted || settings.tutorialCompleted || !currentData) {
    return null;
  }

  const tTitle = currentData.title[lang] || currentData.title['id'];
  const tText = currentData.text[lang] || currentData.text['id'];

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 md:bottom-4 right-4 z-[99999] pointer-events-auto flex items-center animate-in slide-in-from-bottom-2 duration-300">
        <button 
          onClick={() => setIsMinimized(false)}
          className="bg-zinc-950 border-4 border-amber-500 shadow-[8px_8px_0_#000] p-2.5 sm:p-3 flex items-center gap-2 hover:bg-zinc-900 active:translate-y-[2px] active:shadow-none transition-all font-mono text-left"
        >
          <Compass className="text-amber-400 animate-spin-slow shrink-0" size={16} />
          <span className="font-pixel text-[8px] text-amber-400 tracking-wider hidden sm:inline">TUTORIAL</span>
          <span className="font-pixel text-[8px] text-amber-400 tracking-wider sm:hidden">TUTORIAL</span>
          <span className="text-[10px] text-zinc-500 font-bold border-l border-zinc-800 pl-2">
            {currentStep + 1}/{STEPS.length}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99990] pointer-events-none" style={{ overflow: 'visible' }}>
      {!currentData.targetId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-[99991] pointer-events-auto" />
      )}

      {currentData.targetId && targetRect && highlightStyle.display !== 'none' && (() => {
        const pad = 6;
        const tTop = targetRect.top - pad;
        const tLeft = targetRect.left - pad;
        const tBottom = targetRect.bottom + pad;
        const tRight = targetRect.right + pad;
        
        return (
          <>
            <div className="fixed bg-black/75 z-[99992] pointer-events-auto" style={{ top: 0, left: 0, width: '100vw', height: Math.max(0, tTop) }} />
            <div className="fixed bg-black/75 z-[99992] pointer-events-auto" style={{ top: tBottom, left: 0, width: '100vw', height: `calc(100vh - ${tBottom}px)` }} />
            <div className="fixed bg-black/75 z-[99992] pointer-events-auto" style={{ top: Math.max(0, tTop), left: 0, width: Math.max(0, tLeft), height: Math.max(0, tBottom - tTop) }} />
            <div className="fixed bg-black/75 z-[99992] pointer-events-auto" style={{ top: Math.max(0, tTop), left: tRight, width: `calc(100vw - ${tRight}px)`, height: Math.max(0, tBottom - tTop) }} />
          </>
        );
      })()}

      <div style={highlightStyle} className="animate-pulse duration-1000 pointer-events-none" />

      <div 
        style={tooltipStyle} 
        className="w-[320px] bg-zinc-950 border-4 border-amber-500 shadow-[8px_8px_0_#000] flex flex-col font-mono text-left animate-in zoom-in-95 duration-200 pointer-events-auto"
      >
        <div className="bg-zinc-900 border-b-4 border-amber-500 p-3 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2 relative z-10">
            <Compass className="text-amber-400 animate-spin-slow shrink-0" size={16} />
            <span className="font-pixel text-[9px] text-amber-400 tracking-wider">TUTORIAL TOUR</span>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <button onClick={() => setIsMinimized(true)} className="text-zinc-500 hover:text-white transition-colors">
              <Minimize2 size={14} />
            </button>
            <button onClick={handleSkip} className="text-zinc-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3.5 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="flex gap-3 items-start border-b border-zinc-800 pb-3">
            <div className="w-12 h-12 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center relative rounded-none shrink-0 overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-purple-500/10 pointer-events-none" />
              <div className="text-amber-500 animate-pulse">
                <Sparkles size={22} className="animate-bounce" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-pixel text-[8px] text-purple-400 uppercase tracking-widest">TECHNOMANCER</span>
              <span className="text-[10px] text-zinc-500 font-bold">
                {lang === 'en' ? 'Your Virtual Assistant' : 'Asisten Virtualmu'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-pixel text-[9px] text-white leading-normal tracking-wide text-left">{tTitle}</h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed text-left">{tText}</p>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">
            <span>{lang === 'en' ? 'Tour Progress' : 'Progress Panduan'}</span>
            <span className="text-amber-500 font-pixel text-[8px]">{currentStep + 1} / {STEPS.length}</span>
          </div>
          <div className="w-full bg-zinc-900 h-2 border border-zinc-800 rounded-none overflow-hidden relative">
            <div className="h-full bg-amber-500 transition-all duration-300 shadow-[0_0_8px_#f59e0b]" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        <div className="p-3 border-t-2 border-zinc-800 bg-zinc-900 flex justify-between items-center gap-2 shrink-0">
          <button onClick={handleSkip} className="text-[10px] font-bold text-zinc-500 hover:text-pink-400 uppercase tracking-wider transition-colors py-1 px-2">
            {lang === 'en' ? 'Skip' : 'Lewati'}
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button onClick={handleBack} className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none flex items-center gap-1 shrink-0">
                <ChevronLeft size={12} /> {lang === 'en' ? 'Back' : 'Kembali'}
              </button>
            )}
            
            <button onClick={handleNext} className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 text-[10px] font-bold uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none flex items-center gap-1 shrink-0">
              {currentStep === STEPS.length - 1 ? (
                <>{lang === 'en' ? 'Finish' : 'Selesai'} <Trophy size={12} className="ml-0.5 text-amber-950 animate-pulse" /></>
              ) : (
                <>{lang === 'en' ? 'Next' : 'Lanjut'} <ChevronRight size={12} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}