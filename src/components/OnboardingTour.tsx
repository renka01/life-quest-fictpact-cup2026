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
  MousePointer2,
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
  requireAction?: 'add_task' | 'buy_item' | 'navigate_misi' | 'navigate_keuangan' | 'navigate_toko' | 'navigate_kalender' | 'navigate_focus' | 'navigate_statistik';
  actionText?: Record<string, string>;
}

const STEPS: Step[] = [
  {
    title: { id: "SELAMAT DATANG DI LIFEQUEST! ⚔️", en: "WELCOME TO LIFEQUEST! ⚔️" },
    text: { 
      id: "Halo Pahlawan! Ini adalah gerbang awal petualanganmu. LifeQuest mengubah tugas harian, kebiasaan positif, dan pengelolaan keuanganmu menjadi game RPG yang epik! Mari keliling sejenak untuk mempelajari dasar-dasarnya.",
      en: "Hello Hero! This is the gateway to your adventure. LifeQuest turns your daily tasks, positive habits, and financial management into an epic RPG game! Let's take a quick tour to learn the basics."
    },
    menu: "Dashboard",
    position: "center"
  },
  {
    title: { id: "PANEL STATUS PAHLAWAN 🎭", en: "HERO STATUS PANEL 🎭" },
    text: {
      id: "Ini adalah panel profilmu. Di sini kamu bisa melihat ringkasan status Level, sisa HP, serta akumulasi EXP. Menyelesaikan misi akan memberimu Gold dan EXP untuk level up. Tapi awas, mengabaikan misi harian akan melukaimu (HP berkurang)!",
      en: "This is your profile panel. Here you can see your Level, remaining HP, and accumulated EXP. Completing missions gives you Gold and EXP to level up. But beware, ignoring daily missions will hurt you (HP drops)!"
    },
    menu: "Dashboard",
    targetId: "tour-status-panel",
    position: "left"
  },
  {
    title: { id: "NAVIGASI: BUKA MENU MISI 🧭", en: "NAVIGATION: OPEN MISSION MENU 🧭" },
    text: {
      id: "Sekarang, mari kita lihat buku misimu. Klik menu 'Misi' di panel navigasi untuk melanjutkan.",
      en: "Now, let's check your mission book. Click the 'Misi' menu in the navigation panel to continue."
    },
    menu: "Dashboard",
    targetId: "tour-nav-Misi",
    position: "right",
    requireAction: 'navigate_misi',
    actionText: { id: "Klik menu Misi...", en: "Click Misi menu..." }
  },
  {
    title: { id: "🔄 SIKLUS MISI (HABIT)", en: "🔄 MISSION CYCLE (HABIT)" },
    text: {
      id: "Ini adalah Siklus Misi (Habit). Di sini kamu bisa mencatat kebiasaan berulang tanpa tenggat waktu untuk grinding positif. Melakukan kebiasaan positif memberimu Gold dan EXP, tetapi jika kamu melakukan kebiasaan buruk atau mengabaikannya, tidak ada batas waktu harian namun disarankan tetap disiplin!",
      en: "This is the Mission Cycle (Habit). Here you can record recurring habits without deadlines for positive grinding. Performing positive habits gives you Gold and EXP, but keep in mind that they are flexible and repeat indefinitely to build long-term positive routines!"
    },
    menu: "Misi",
    targetId: "tour-habit-column",
    position: "right"
  },
  {
    title: { id: "📅 OPERASI HARIAN (DAILY)", en: "📅 DAILY OPERATIONS (DAILY)" },
    text: {
      id: "Ini adalah Operasi Harian (Daily Task). Ini adalah tugas wajib yang harus kamu selesaikan hari ini sebelum hari berakhir. Jika dilewati atau diabaikan, pahlawanmu akan terkena damage (HP berkurang) di keesokan harinya!",
      en: "This is the Daily Operations (Daily Task). These are mandatory tasks that you must complete today before the day ends. If missed or ignored, your hero will take damage (HP drops) the next day!"
    },
    menu: "Misi",
    targetId: "tour-daily-column",
    position: "bottom"
  },
  {
    title: { id: "🎯 TARGET UTAMA (TO-DO)", en: "🎯 MAIN TARGET (TO-DO)" },
    text: {
      id: "Ini adalah Target Utama (To-Do List). Ini adalah misi khusus sekali selesai yang tidak memiliki batasan waktu harian. Sangat cocok untuk proyek besar atau target jangka panjang dengan imbalan reward yang melimpah!",
      en: "This is the Main Target (To-Do List). These are special one-time completion missions with no daily time limits. Perfect for big projects or long-term goals with massive rewards!"
    },
    menu: "Misi",
    targetId: "tour-todo-column",
    position: "left"
  },
  {
    title: { id: "LATIHAN: BUAT MISI HARIAN 🎯", en: "TRAINING: CREATE DAILY MISSION 🎯" },
    text: {
      id: "Sekarang giliranmu! Cobalah untuk menambahkan satu Operasi Harian (Daily Task) dengan mengklik tombol ini. Kamu harus membuatnya sebelum bisa melanjutkan perjalanan.",
      en: "Now it's your turn! Try adding one Daily Task by clicking this button. You must create it before continuing your journey."
    },
    menu: "Misi",
    targetId: "tour-add-daily",
    position: "bottom",
    requireAction: 'add_task',
    actionText: { id: "Menunggu kamu membuat misi...", en: "Waiting for you to create a mission..." }
  },
  {
    title: { id: "NAVIGASI: MENU KEUANGAN 🪙", en: "NAVIGATION: FINANCE MENU 🪙" },
    text: {
      id: "Bagus sekali! Selanjutnya, mari kita lihat tempat kamu menyimpan hartamu. Klik menu 'Keuangan'.",
      en: "Great job! Next, let's see where you store your wealth. Click the 'Keuangan' menu."
    },
    menu: "Misi",
    targetId: "tour-nav-Keuangan",
    position: "right",
    requireAction: 'navigate_keuangan',
    actionText: { id: "Klik menu Keuangan...", en: "Click Keuangan menu..." }
  },
  {
    title: { id: "👛 DOMPET & REKENING", en: "👛 WALLET & ACCOUNTS" },
    text: {
      id: "Ini adalah Dompet & Rekening. Di sini kamu bisa mencatat saldo tunai atau rekening bank aslimu secara real-time. Setiap pemasukan dan pengeluaran operasional harian dicatat di sini agar riwayat keuanganmu tetap bersih!",
      en: "This is the Wallet & Accounts. Here you can track your real-time cash or bank account balances. Every daily operational income and expense is recorded here to keep your financial history clean!"
    },
    menu: "Keuangan",
    targetId: "tour-wallet-column",
    position: "right"
  },
  {
    title: { id: "🏦 TABUNGAN & KANTONG ASET", en: "🏦 SAVINGS & ASSET VAULT" },
    text: {
      id: "Ini adalah Tabungan & Kantong Aset. Di sini kamu bisa menyisihkan emas/dana untuk target impian masa depanmu. Menariknya, kamu akan mendapatkan bonus EXP pahlawan setiap kali kamu menabung!",
      en: "This is the Savings & Asset Vault. Here you can set aside gold/funds for your future dream goals. Interestingly, you will gain hero EXP bonuses every time you save!"
    },
    menu: "Keuangan",
    targetId: "tour-savings-column",
    position: "right"
  },
  {
    title: { id: "💸 RIWAYAT TRANSAKSI", en: "💸 TRANSACTION HISTORY" },
    text: {
      id: "Ini adalah Riwayat Transaksi & Pengeluaran. Di sini kamu bisa memantau semua arus kas masuk dan keluar, serta tagihan rutin berkala (seperti langganan/sewa) yang harus dibayar tepat waktu agar status pahlawan tetap aman.",
      en: "This is the Transaction History & Expenses. Here you can monitor all incoming and outgoing cash flows, as well as recurring bills (like subscriptions/rent) that must be paid on time to keep hero status safe."
    },
    menu: "Keuangan",
    targetId: "tour-history-column",
    position: "left"
  },
  {
    title: { id: "NAVIGASI: MENU KALENDER 📅", en: "NAVIGATION: CALENDAR MENU 📅" },
    text: {
      id: "Petualanganmu terjadwal! Klik menu 'Kalender' di panel navigasi untuk melihat jadwal misimu.",
      en: "Your adventure is scheduled! Click the 'Kalender' menu in the navigation panel to view your mission schedule."
    },
    menu: "Keuangan",
    targetId: "tour-nav-Kalender",
    position: "right",
    requireAction: 'navigate_kalender',
    actionText: { id: "Klik menu Kalender...", en: "Click Kalender menu..." }
  },
  {
    title: { id: "KALENDER PETUALANGAN 📅", en: "ADVENTURE CALENDAR 📅" },
    text: {
      id: "Di sinilah Kalender Petualanganmu! Di sini kamu bisa merencanakan, melihat, dan melacak tanggal jatuh tempo misi harian dan target utama di masa depan agar tidak terlewat.",
      en: "Here is your Adventure Calendar! Here you can plan, view, and track due dates of daily missions and main targets in the future so you never miss them."
    },
    menu: "Kalender",
    targetId: "tour-nav-Kalender",
    position: "right"
  },
  {
    title: { id: "NAVIGASI: MENU FOCUS ARENA ⏳", en: "NAVIGATION: FOCUS ARENA MENU ⏳" },
    text: {
      id: "Pahlawan butuh fokus tinggi! Klik menu 'Focus Arena' untuk mulai melatih konsentrasimu.",
      en: "Heroes need high focus! Click the 'Focus Arena' menu to start training your concentration."
    },
    menu: "Kalender",
    targetId: "tour-nav-FocusArena",
    position: "right",
    requireAction: 'navigate_focus',
    actionText: { id: "Klik menu Focus Arena...", en: "Click Focus Arena menu..." }
  },
  {
    title: { id: "ARENA FOKUS (POMODORO) ⏳", en: "FOCUS ARENA (POMODORO) ⏳" },
    text: {
      id: "Selamat datang di Arena Fokus! Di sini kamu bisa menggunakan metode timer Pomodoro untuk membantumu fokus belajar atau bekerja. Setiap sesi fokus yang berhasil selesai akan memberimu Gold tambahan!",
      en: "Welcome to the Focus Arena! Here you can use the Pomodoro timer method to help you focus on studying or working. Every successfully completed focus session gives you bonus Gold!"
    },
    menu: "Focus Arena",
    targetId: "tour-nav-FocusArena",
    position: "right"
  },
  {
    title: { id: "NAVIGASI: MENU STATISTIK 📊", en: "NAVIGATION: STATISTICS MENU 📊" },
    text: {
      id: "Pantau kekuatan dan perkembangan dirimu! Klik menu 'Statistik' di navigasi.",
      en: "Track your strength and self-growth! Click the 'Statistik' menu in the navigation."
    },
    menu: "Focus Arena",
    targetId: "tour-nav-Statistik",
    position: "right",
    requireAction: 'navigate_statistik',
    actionText: { id: "Klik menu Statistik...", en: "Click Statistik menu..." }
  },
  {
    title: { id: "AULA LAPORAN & STATISTIK 📊", en: "REPORT HALL & STATISTICS 📊" },
    text: {
      id: "Ini adalah Aula Laporanmu! Di sini kamu bisa melihat bagan statistik penyelesaian misimu, pengeluaran keuangan, serta perkembangan levelmu secara visual.",
      en: "This is your Report Hall! Here you can see chart statistics of your mission completion, financial spending, and your level growth visually."
    },
    menu: "Statistik",
    targetId: "tour-nav-Statistik",
    position: "right"
  },
  {
    title: { id: "NAVIGASI: MENU TOKO & LOOT 🛒", en: "NAVIGATION: SHOP & LOOT MENU 🛒" },
    text: {
      id: "Sekarang bagian yang paling menyenangkan. Mari kita pergi ke Toko! Klik menu 'Toko & Loot'.",
      en: "Now for the fun part. Let's go to the Shop! Click the 'Toko & Loot' menu."
    },
    menu: "Statistik",
    targetId: "tour-nav-TokoLoot",
    position: "right",
    requireAction: 'navigate_toko',
    actionText: { id: "Klik menu Toko & Loot...", en: "Click Toko & Loot menu..." }
  },
  {
    title: { id: "TOKO & ARMORY LOOT 🛡️", en: "SHOP & ARMORY LOOT 🛡️" },
    text: {
      id: "Belanjakan Gold yang kamu dapat di sini! Lengkapi pahlawanmu dengan Senjata dan Armor legendaris. Kami sudah memberimu 50 Gold sebagai modal awal.",
      en: "Spend your hard-earned Gold here! Equip your hero with legendary Weapons and Armor. We've given you 50 Gold as a starting bonus."
    },
    menu: "Toko & Loot",
    targetId: "tour-nav-TokoLoot",
    position: "right"
  },
  {
    title: { id: "LATIHAN: BELI PERABOTAN / PERLENGKAPAN ⚔️", en: "TRAINING: BUY EQUIPMENT ⚔️" },
    text: {
      id: "Ayo kita berbelanja! Klik barang pertama di toko, lalu klik tombol BELI. Kamu punya cukup Gold untuk membeli perabotan/perlengkapan murah.",
      en: "Let's go shopping! Click the first item in the shop, then click BUY. You have enough Gold for a cheap item."
    },
    menu: "Toko & Loot",
    targetId: "tour-shop-item-1",
    position: "bottom",
    requireAction: 'buy_item',
    actionText: { id: "Menunggu kamu membeli item...", en: "Waiting for you to buy an item..." }
  },
  {
    title: { id: "EMAS & KEMAKMURAN 💎", en: "GOLD & PROSPERITY 💎" },
    text: {
      id: "Luar biasa! Pahlawanmu sekarang siap untuk petualangan. Kamu bisa mengulang tutorial ini kapan saja melalui menu Pengaturan. Selamat berjuang!",
      en: "Amazing! Your hero is now ready for adventure. You can repeat this tutorial anytime via Settings. Good luck!"
    },
    menu: "Dashboard",
    targetId: "tour-gold-panel",
    position: "bottom"
  }
];

export default function OnboardingTour({ 
  activeMenu, 
  setActiveMenu,
  isStatusPanelOpen,
  setIsStatusPanelOpen
}: OnboardingTourProps) {
  const { settings, updateSetting, playSound, tasks, inventory, equipItem } = useStore();

  // ===== EARLY EXIT: Must be before ALL hooks that access currentData =====
  // This ensures we never crash on stale state
  if (settings.tutorialCompleted) return null;

  return <OnboardingTourInner 
    activeMenu={activeMenu}
    setActiveMenu={setActiveMenu}
    isStatusPanelOpen={isStatusPanelOpen}
    setIsStatusPanelOpen={setIsStatusPanelOpen}
  />;
}

// Inner component that only mounts when tutorial is active
function OnboardingTourInner({ 
  activeMenu, 
  setActiveMenu,
  isStatusPanelOpen,
  setIsStatusPanelOpen
}: OnboardingTourProps) {
  const { settings, updateSetting, playSound, tasks, inventory, equipItem } = useStore();
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
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elevatedElementsRef = useRef<{ element: HTMLElement; zIndex: string; position: string; pointerEvents: string }[]>([]);

  // Monitor store for required actions
  const [initialTaskCount, setInitialTaskCount] = useState(tasks.length);
  const [initialInvCount, setInitialInvCount] = useState(inventory.length);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastModalOpen, setLastModalOpen] = useState(false);

  const lang = settings.language || 'id';

  // Clamp currentStep to valid range
  const safeStep = Math.max(0, Math.min(currentStep, STEPS.length - 1));
  if (safeStep !== currentStep) {
    setCurrentStep(safeStep);
  }
  const currentData = STEPS[safeStep];

  // If tutorial gets completed while this inner component is mounted, return null
  if (settings.tutorialCompleted) return null;

  // Auto open/close status panel depending on tutorial step
  useEffect(() => {
    if (!setIsStatusPanelOpen) return;
    
    if (safeStep === 1) {
      setIsStatusPanelOpen(true);
    } else {
      setIsStatusPanelOpen(false);
    }
  }, [safeStep, setIsStatusPanelOpen]);

  // Auto-minimize when task or shop modal is open
  useEffect(() => {
    const checkModal = () => {
      const isTaskFormOpen = typeof document !== 'undefined' && !!document.getElementById('task-form-modal');
      const isShopModalOpen = typeof document !== 'undefined' && !!document.getElementById('shop-item-modal');
      const isAnyModalOpen = isTaskFormOpen || isShopModalOpen;

      if (isAnyModalOpen !== lastModalOpen) {
        setLastModalOpen(isAnyModalOpen);
        setIsMinimized(isAnyModalOpen);
      }
    };

    const interval = setInterval(checkModal, 200);
    return () => clearInterval(interval);
  }, [lastModalOpen]);

  // Helper to clean up elevated elements
  const cleanupElevation = useCallback(() => {
    elevatedElementsRef.current.forEach(saved => {
      if (saved.element) {
        saved.element.style.zIndex = saved.zIndex;
        saved.element.style.position = saved.position;
        saved.element.style.pointerEvents = saved.pointerEvents;
      }
    });
    elevatedElementsRef.current = [];
  }, []);

  // Dynamically elevate the target element (and critical parents) so it pops above the blocker divs
  useEffect(() => {
    // Clean up previous elevation first
    cleanupElevation();

    if (!currentData.targetId) return;

    // Small delay to let the DOM settle after menu transitions
    const timer = setTimeout(() => {
      const element = document.getElementById(currentData.targetId!);
      if (!element) return;

      const saved: { element: HTMLElement; zIndex: string; position: string; pointerEvents: string }[] = [];

      // Elevate the target itself
      saved.push({
        element,
        zIndex: element.style.zIndex,
        position: element.style.position,
        pointerEvents: element.style.pointerEvents
      });
      element.style.zIndex = '99995';
      if (window.getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
      element.style.pointerEvents = 'auto';

      // Walk up and elevate ancestors that create stacking contexts
      let parent = element.parentElement;
      while (parent && parent !== document.body) {
        const computed = window.getComputedStyle(parent);
        if (computed.zIndex !== 'auto' || computed.position !== 'static') {
          saved.push({
            element: parent,
            zIndex: parent.style.zIndex,
            position: parent.style.position,
            pointerEvents: parent.style.pointerEvents
          });
          parent.style.zIndex = '99995';
        }
        parent = parent.parentElement;
      }

      elevatedElementsRef.current = saved;
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupElevation();
    };
  }, [safeStep, currentData.targetId, cleanupElevation]);

  // Watch for task addition
  useEffect(() => {
    if (actionCompleted) return;
    if (currentData?.requireAction === 'add_task') {
      if (tasks.length > initialTaskCount) {
        setActionCompleted(true);
        playSound('success');
      }
    }
  }, [tasks.length, currentData, initialTaskCount, playSound, actionCompleted]);

  // Watch for item purchase
  useEffect(() => {
    if (actionCompleted) return;
    if (currentData?.requireAction === 'buy_item') {
      const currentInvCount = inventory.reduce((acc, item) => acc + item.quantity, 0);
      if (currentInvCount > initialInvCount) {
        setActionCompleted(true);
        playSound('coin');
        if (equipItem) {
          equipItem('weapon', 1);
        }
      }
    }
  }, [inventory, currentData, initialInvCount, playSound, equipItem, actionCompleted]);

  // Watch for navigation actions
  useEffect(() => {
    if (actionCompleted) return;
    
    const req = currentData?.requireAction;
    if (!req || !req.startsWith('navigate_')) return;

    const navMap: Record<string, string> = {
      'navigate_misi': 'Misi',
      'navigate_keuangan': 'Keuangan',
      'navigate_kalender': 'Kalender',
      'navigate_focus': 'Focus Arena',
      'navigate_statistik': 'Statistik',
      'navigate_toko': 'Toko & Loot',
    };

    if (navMap[req] && activeMenu === navMap[req]) {
      setActionCompleted(true);
      playSound('success');
    }
  }, [activeMenu, currentData, playSound, actionCompleted]);

  // Step transition effect: auto-navigate menu & setup
  useEffect(() => {
    // Only auto-navigate if it is NOT a navigation step
    if (currentData.menu !== activeMenu && !currentData.requireAction?.startsWith('navigate')) {
      setActiveMenu(currentData.menu);
    }
    
    // Reset action state for the new step
    setActionCompleted(false);
    if (currentData.requireAction === 'add_task') {
      setInitialTaskCount(tasks.length);
      if (tasks.length > 0) {
        setActionCompleted(true);
      }
    }
    if (currentData.requireAction === 'buy_item') {
      const currentCount = inventory.reduce((acc, item) => acc + item.quantity, 0);
      setInitialInvCount(currentCount);
      if (currentCount > 0) {
        setActionCompleted(true);
        if (equipItem) {
          equipItem('weapon', 1);
        }
      }
    }

    if (safeStep === 0) {
      playSound('glitch');
    }
    
    // Auto-scroll target into view
    const scrollToTarget = () => {
      if (currentData.targetId) {
        const el = document.getElementById(currentData.targetId);
        if (el) {
          el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
        }
      }
    };
    
    scrollToTarget();
    const scrollTimer = setTimeout(scrollToTarget, 300);

    // Wait for menu transition to finish before calculating highlight positions
    const timer = setTimeout(() => {
      updateHighlightAndTooltip();
    }, 450);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeStep]);

  // Scroll listener to update highlight position in real-time
  useEffect(() => {
    const handleScroll = () => {
      updateHighlightAndTooltip();
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeStep]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        updateHighlightAndTooltip();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeStep]);

  const updateHighlightAndTooltip = () => {
    const isTaskFormOpen = typeof document !== 'undefined' && !!document.getElementById('task-form-modal');
    const isShopModalOpen = typeof document !== 'undefined' && !!document.getElementById('shop-item-modal');
    if (isTaskFormOpen || isShopModalOpen) {
      setHighlightStyle({ display: 'none' });
      setTargetRect(null);
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setTooltipStyle({
          position: 'fixed',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 24px)',
          maxWidth: '320px',
          zIndex: 99999,
          transition: 'all 0.3s ease'
        });
      } else {
        setTooltipStyle({
          position: 'fixed',
          top: '50%',
          right: '24px',
          transform: 'translateY(-50%)',
          zIndex: 99999,
          transition: 'all 0.3s ease'
        });
      }
      return;
    }

    if (!currentData.targetId) {
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

    // Set highlight ring style
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
      pointerEvents: 'none',
      transition: 'none'
    });

    // Calculate tooltip position relative to target element
    let top = rect.bottom + 12;
    let left = rect.left + rect.width / 2;
    let transform = 'translateX(-50%)';

    const tooltipWidth = 320;
    const paddingEdge = 16;

    const tooltipEstimatedHeight = 280;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (currentData.position === 'left') {
      const preferredTop = rect.top + rect.height / 2 - tooltipEstimatedHeight / 2;
      top = Math.max(12, Math.min(preferredTop, screenHeight - tooltipEstimatedHeight - 12));
      left = rect.left - 16;
      transform = 'translateX(-100%)';
    } else if (currentData.position === 'right') {
      const preferredTop = rect.top + rect.height / 2 - tooltipEstimatedHeight / 2;
      top = Math.max(12, Math.min(preferredTop, screenHeight - tooltipEstimatedHeight - 12));
      left = rect.right + 16;
      transform = 'translateX(0)';
    } else if (currentData.position === 'top') {
      top = rect.top - 12 - tooltipEstimatedHeight;
      top = Math.max(12, top);
      left = rect.left + rect.width / 2;
      transform = 'translate(-50%, 0)';
    } else if (currentData.position === 'bottom') {
      top = rect.bottom + 12;
      if (top + tooltipEstimatedHeight > screenHeight - 12) {
        top = rect.top - 12 - tooltipEstimatedHeight;
        top = Math.max(12, top);
      }
      left = rect.left + rect.width / 2;
      transform = 'translate(-50%, 0)';
    }

    // Adjust horizontal position for horizontally-centered tooltips
    if (currentData.position !== 'left' && currentData.position !== 'right') {
      if (left - tooltipWidth / 2 < paddingEdge) {
        left = paddingEdge + tooltipWidth / 2;
      } else if (left + tooltipWidth / 2 > screenWidth - paddingEdge) {
        left = screenWidth - paddingEdge - tooltipWidth / 2;
      }
    }

    // Special logic for mobile nav buttons
    if (screenWidth < 768 && currentData.targetId?.startsWith('tour-nav-')) {
      top = rect.top - 12 - tooltipEstimatedHeight;
      top = Math.max(12, top);
      transform = 'translate(-50%, 0)';
    }

    setTooltipStyle({
      position: 'fixed',
      top,
      left,
      transform,
      zIndex: 99999,
      transition: 'none'
    });
  };

  const handleNext = () => {
    playSound('click');
    if (safeStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    playSound('click');
    if (safeStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    playSound('success');
    cleanupElevation();
    updateSetting('tutorialCompleted', true);
  };

  const handleSkip = () => {
    playSound('glitch');
    cleanupElevation();
    updateSetting('tutorialCompleted', true);
  };

  const tTitle = currentData.title[lang] || currentData.title['id'];
  const tText = currentData.text[lang] || currentData.text['id'];
  const tAction = currentData.actionText ? (currentData.actionText[lang] || currentData.actionText['id']) : '';

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 md:bottom-4 right-4 z-[99999] pointer-events-auto flex items-center animate-in slide-in-from-bottom-2 duration-300">
        <button 
          onClick={() => setIsMinimized(false)}
          className="bg-zinc-950 border-4 border-amber-500 shadow-[8px_8px_0_#000] p-2.5 sm:p-3 flex items-center gap-2 hover:bg-zinc-900 active:translate-y-[2px] active:shadow-none transition-all font-mono text-left"
          title={lang === 'en' ? 'Expand Tutorial' : 'Perluas Panduan'}
        >
          <Compass className="text-amber-400 animate-spin-slow shrink-0" size={16} />
          <span className="font-pixel text-[8px] text-amber-400 tracking-wider hidden sm:inline">
            {lang === 'en' ? 'TUTORIAL (EXPAND)' : 'PANDUAN (PERLUAS)'}
          </span>
          <span className="font-pixel text-[8px] text-amber-400 tracking-wider sm:hidden">
            {lang === 'en' ? 'TUTORIAL' : 'PANDUAN'}
          </span>
          <span className="text-[10px] text-zinc-500 font-bold border-l border-zinc-800 pl-2">
            {safeStep + 1}/{STEPS.length}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99990] pointer-events-none" style={{ overflow: 'visible' }}>

      {/* Backdrop global for center mode (no target) */}
      {!currentData.targetId && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-[99991] pointer-events-auto" 
        />
      )}

      {/* 4 blocker overlays surrounding the active highlight to block clicks */}
      {currentData.targetId && targetRect && highlightStyle.display !== 'none' && (() => {
        const pad = 6;
        const tTop = targetRect.top - pad;
        const tLeft = targetRect.left - pad;
        const tBottom = targetRect.bottom + pad;
        const tRight = targetRect.right + pad;
        
        return (
          <>
            {/* Top Blocker */}
            <div 
              className="fixed bg-black/75 z-[99992] pointer-events-auto" 
              style={{
                top: 0,
                left: 0,
                width: '100vw',
                height: Math.max(0, tTop)
              }}
            />
            {/* Bottom Blocker */}
            <div 
              className="fixed bg-black/75 z-[99992] pointer-events-auto" 
              style={{
                top: tBottom,
                left: 0,
                width: '100vw',
                height: `calc(100vh - ${tBottom}px)`
              }}
            />
            {/* Left Blocker */}
            <div 
              className="fixed bg-black/75 z-[99992] pointer-events-auto" 
              style={{
                top: Math.max(0, tTop),
                left: 0,
                width: Math.max(0, tLeft),
                height: Math.max(0, tBottom - tTop)
              }}
            />
            {/* Right Blocker */}
            <div 
              className="fixed bg-black/75 z-[99992] pointer-events-auto" 
              style={{
                top: Math.max(0, tTop),
                left: tRight,
                width: `calc(100vw - ${tRight}px)`,
                height: Math.max(0, tBottom - tTop)
              }}
            />
          </>
        );
      })()}

      {/* Target Highlight Cut-Out Ring */}
      <div style={highlightStyle} className="animate-pulse duration-1000 pointer-events-none" />

      {/* Tooltip Card */}
      <div 
        style={tooltipStyle} 
        className="w-[320px] bg-zinc-950 border-4 border-amber-500 shadow-[8px_8px_0_#000] flex flex-col font-mono text-left animate-in zoom-in-95 duration-200 pointer-events-auto"
      >
        {/* Card Header */}
        <div className="bg-zinc-900 border-b-4 border-amber-500 p-3 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2 relative z-10">
            <Compass className="text-amber-400 animate-spin-slow shrink-0" size={16} />
            <span className="font-pixel text-[9px] text-amber-400 tracking-wider">
              TUTORIAL TOUR
            </span>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-zinc-500 hover:text-white transition-colors"
              title={lang === 'en' ? 'Minimize' : 'Kecilkan'}
            >
              <Minimize2 size={14} />
            </button>
            <button 
              onClick={handleSkip} 
              className="text-zinc-500 hover:text-white transition-colors"
              title={lang === 'en' ? 'Skip Tutorial' : 'Lewati Panduan'}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col gap-3.5 bg-gradient-to-b from-zinc-900 to-zinc-950">
          
          {/* Avatar Guide Pemandu */}
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

          {/* Text Instruksi */}
          <div className="flex flex-col gap-2">
            <h4 className="font-pixel text-[9px] text-white leading-normal tracking-wide text-left">
              {tTitle}
            </h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed text-left">
              {tText}
            </p>
          </div>

          {/* Action Required Banner */}
          {currentData.requireAction && (
            <div className={`mt-2 border border-dashed p-2 rounded-none text-[10px] font-bold text-center flex items-center justify-center gap-2 transition-colors ${actionCompleted ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-amber-500 bg-amber-500/10 text-amber-400 animate-pulse'}`}>
              {actionCompleted ? (
                <>
                  <Trophy size={14} />
                  {lang === 'en' ? 'Action Completed!' : 'Misi Berhasil!'}
                </>
              ) : (
                <>
                  <MousePointer2 size={14} />
                  {tAction}
                </>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-1">
            <span>{lang === 'en' ? 'Tour Progress' : 'Progress Panduan'}</span>
            <span className="text-amber-500 font-pixel text-[8px]">{safeStep + 1} / {STEPS.length}</span>
          </div>
          <div className="w-full bg-zinc-900 h-2 border border-zinc-800 rounded-none overflow-hidden relative">
            <div 
              className="h-full bg-amber-500 transition-all duration-300 shadow-[0_0_8px_#f59e0b]" 
              style={{ width: `${((safeStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-3 border-t-2 border-zinc-800 bg-zinc-900 flex justify-between items-center gap-2 shrink-0">
          <button 
            onClick={handleSkip} 
            className="text-[10px] font-bold text-zinc-500 hover:text-pink-400 uppercase tracking-wider transition-colors py-1 px-2"
          >
            {lang === 'en' ? 'Skip' : 'Lewati'}
          </button>

          <div className="flex items-center gap-2">
            {safeStep > 0 && !currentData.requireAction && (
              <button 
                onClick={handleBack} 
                className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none flex items-center gap-1 shrink-0"
              >
                <ChevronLeft size={12} /> {lang === 'en' ? 'Back' : 'Kembali'}
              </button>
            )}
            
            <button 
              onClick={handleNext} 
              disabled={currentData.requireAction && !actionCompleted}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase transition-all shadow-[2px_2px_0_#000] flex items-center gap-1 shrink-0 ${currentData.requireAction && !actionCompleted ? 'bg-zinc-700 text-zinc-500 shadow-none cursor-not-allowed border border-zinc-600' : 'bg-amber-500 hover:bg-amber-400 text-amber-950 active:translate-y-[2px] active:shadow-none'}`}
            >
              {safeStep === STEPS.length - 1 ? (
                <>
                  {lang === 'en' ? 'Finish' : 'Selesai'} <Trophy size={12} className="ml-0.5 text-amber-950 animate-pulse" />
                </>
              ) : (
                <>
                  {lang === 'en' ? 'Next' : 'Lanjut'} <ChevronRight size={12} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
