import { create } from 'zustand';

// ==========================================
// 1. TIPE DATA (TYPESCRIPT INTERFACES)
// ==========================================
export type TaskType = 'habit' | 'daily' | 'todo';

export interface Task {
  id: number;
  type: TaskType;
  title: string;
  notes: string;
  category: string;
  difficulty: number; // 1: Remeh, 2: Mudah, 3: Sedang, 4: Susah
  done?: boolean;
  isBoss?: boolean;
  resetCounter?: string;
  habitCount?: number; 
  startDate?: string;
  repeatEvery?: number;
  repeatUnit?: string;
  dueDate?: string;
}

export interface Stats {
  level: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  exp: number;
  maxExp: number;
  gold: number;
}

interface AlertDialog {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'success' | 'danger' | 'warning';
}

interface ConfirmDialog {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

// ==========================================
// 2. STATE & ACTIONS BUNDLE
// ==========================================
interface LifeQuestStore {
  tasks: Task[];
  stats: Stats;
  alertDialog: AlertDialog;
  confirmDialog: ConfirmDialog;

  showAlert: (title: string, message: string, type: AlertDialog['type']) => void;
  closeAlert: () => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
  closeConfirm: () => void;

  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: number) => void;
  toggleTaskDone: (task: Task) => void;
  handleHabitPlus: (task: Task) => void;
  handleHabitMinus: (task: Task) => void;
  
  _applyReward: (baseExp: number, baseGold: number, baseEnergyCost: number, difficulty: number) => void;
}

// ==========================================
// 3. FUNGSI HELPER
// ==========================================
const getDifficultyMultiplier = (difficulty: number) => {
  switch (difficulty) {
    case 1: return 0.5; // Remeh
    case 2: return 1.0; // Mudah
    case 3: return 1.5; // Sedang
    case 4: return 2.0; // Susah
    default: return 1.0;
  }
};

// ==========================================
// 4. MEMBUAT STORE ZUSTAND
// ==========================================
export const useStore = create<LifeQuestStore>((set, get) => ({
  // --- INITIAL DATA ---
  tasks: [],
  stats: {
    level: 1,
    hp: 50, maxHp: 50,
    energy: 100, maxEnergy: 100,
    exp: 0, maxExp: 300,
    gold: 0
  },
  alertDialog: { isOpen: false, title: "", message: "", type: "info" },
  confirmDialog: { isOpen: false, message: "", onConfirm: () => {} },

  // --- ACTIONS MODAL ---
  showAlert: (title, message, type) => set({ alertDialog: { isOpen: true, title, message, type } }),
  closeAlert: () => set((state) => ({ alertDialog: { ...state.alertDialog, isOpen: false } })),
  showConfirm: (message, onConfirm) => set({ confirmDialog: { isOpen: true, message, onConfirm } }),
  closeConfirm: () => set((state) => ({ confirmDialog: { ...state.confirmDialog, isOpen: false } })),

  // --- ACTIONS TUGAS ---
  addTask: (taskData) => set((state) => ({
    tasks: [{ id: Date.now(), ...taskData, habitCount: taskData.habitCount || 0 }, ...state.tasks]
  })),

  deleteTask: (id) => {
    const { showConfirm, closeConfirm } = get();
    showConfirm("Apakah kamu yakin ingin menghapus misi ini? Data yang dihapus akan lenyap selamanya dari Log.", () => {
      set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) }));
      closeConfirm();
    });
  },

  // --- LOGIKA GAMIFIKASI ---
  _applyReward: (baseExp: number, baseGold: number, baseEnergyCost: number, difficulty: number) => {
    const { stats, showAlert } = get();
    const multiplier = getDifficultyMultiplier(difficulty);
    
    const finalExp = Math.round(baseExp * multiplier);
    const finalGold = Math.round(baseGold * multiplier);
    const finalEnergyCost = Math.round(baseEnergyCost * multiplier);

    let newExp = stats.exp + finalExp;
    let newLevel = stats.level;
    let newMaxExp = stats.maxExp;
    let newGold = stats.gold + finalGold;
    
    // 🔥 PERBAIKAN: Membatasi agar energi tidak melebihi 100 (maxEnergy)
    let newEnergy = Math.min(stats.maxEnergy, Math.max(0, stats.energy - finalEnergyCost));

    if (newExp >= newMaxExp) {
      newLevel += 1;
      newExp -= newMaxExp;
      newMaxExp = Math.floor(newMaxExp * 1.5);
      showAlert("LEVEL UP!", `Luar biasa! Kamu telah mencapai Level ${newLevel}!`, "success");
    }

    set({ stats: { ...stats, exp: newExp, level: newLevel, maxExp: newMaxExp, gold: newGold, energy: newEnergy } });
  },

  handleHabitPlus: (task) => {
    const { tasks, _applyReward } = get();
    
    // Habit (+) memberi 10 EXP, 2 Gold, dan MENAMBAH 5 Energi (Karena pakai minus)
    _applyReward(10, 2, -5, task.difficulty); 

    set({
      tasks: tasks.map(t => 
        t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) + 1 } : t
      )
    });
  },

  handleHabitMinus: (task) => {
    const { tasks, stats, showAlert } = get();
    
    const damage = Math.round(5 * getDifficultyMultiplier(task.difficulty));
    const newHp = Math.max(0, stats.hp - damage);
    if (newHp === 0 && stats.hp > 0) {
      showAlert("NYAWA HABIS", "Karaktermu pingsan! Terlalu banyak kebiasaan buruk. Hati-hati!", "danger");
    }
    set({ stats: { ...stats, hp: newHp } });

    set({
        tasks: tasks.map(t => 
          t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) - 1 } : t
        )
      });
  },

  toggleTaskDone: (task) => {
    const { tasks, stats, showAlert, _applyReward } = get();
    const isNowDone = !task.done;
    
    set({ tasks: tasks.map(t => t.id === task.id ? { ...t, done: isNowDone } : t) });

    if (isNowDone) {
      const baseExp = task.isBoss ? 50 : 20;
      const baseGold = task.isBoss ? 20 : 5;
      
      // 🔥 PENGATURAN ENERGI HARIAN & TO-DO:
      // - Kalau angkanya POSITIF (misal: 10), energi akan BERKURANG
      // - Kalau angkanya NEGATIF (misal: -10), energi akan BERTAMBAH
      // - Kalau 0, energi tidak berubah saat dicentang.
      // Kita set agar Harian menambah energi (+10) dan To-Do memakan energi (-15)
      let baseEnergyCost = 0;
      if (task.type === 'daily') {
         baseEnergyCost = -10; // Harian = nge-charge energi 10 point!
      } else if (task.type === 'todo') {
         baseEnergyCost = task.isBoss ? 20 : 10; // ToDo biasa = nguras 10 point
      }

      const finalEnergyCost = Math.round(baseEnergyCost * getDifficultyMultiplier(task.difficulty));

      // Peringatan jika energi hampir habis (hanya cek jika cost-nya positif / nguras)
      if (baseEnergyCost > 0 && stats.energy < finalEnergyCost) {
        showAlert("PERINGATAN ENERGI", "Energimu sangat rendah! Mengerjakan tugas berat bisa membuatmu Burnout. Istirahatlah!", "warning");
      }

      _applyReward(baseExp, baseGold, baseEnergyCost, task.difficulty);
    }
  }
}));