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
  difficulty: number; 
  done?: boolean;
  isBoss?: boolean;
  resetCounter?: string;
  habitCount?: number; 
  startDate?: string;
  repeatEvery?: number;
  repeatUnit?: string;
  dueDate?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'rekening' | 'tabungan';
  target?: number;
  weight?: number; 
}

export interface Transaction {
  id: string;
  accountName: string;
  amount: number;
  type: 'income' | 'expense'; 
  timestamp: number;
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
// 2. STATE & ACTIONS INTERFACE
// ==========================================
interface LifeQuestStore {
  tasks: Task[];
  accounts: Account[];
  transactions: Transaction[];
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

  addAccount: (account: Account) => void;
  updateBalance: (id: string, amount: number, weightChange?: number) => void; 
  deleteAccount: (id: string) => void;
  clearTransactions: () => void;
  
  _applyReward: (baseExp: number, baseGold: number, baseEnergyCost: number, difficulty: number) => void;
  _applySimpleReward: (expGain: number) => void; // 🔥 Tambahkan interface baru
}

// ==========================================
// 3. FUNGSI HELPER
// ==========================================
const getDifficultyMultiplier = (difficulty: number) => {
  switch (difficulty) {
    case 1: return 0.5; 
    case 2: return 1.0; 
    case 3: return 1.5; 
    case 4: return 2.0; 
    default: return 1.0;
  }
};

// ==========================================
// 4. MEMBUAT STORE ZUSTAND
// ==========================================
export const useStore = create<LifeQuestStore>((set, get) => ({
  // --- INITIAL DATA ---
  tasks: [],
  accounts: [], 
  transactions: [],
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
    showConfirm("Apakah kamu yakin ingin menghapus misi ini?", () => {
      set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) }));
      closeConfirm();
    });
  },

  // --- ACTIONS FINANCE ---
  addAccount: (newAcc) => set((state) => {
    const isExist = state.accounts.find(acc => acc.name === newAcc.name);

    if (isExist) {
      return {
        accounts: state.accounts.map(acc => 
          acc.name === newAcc.name 
            ? { 
                ...acc, 
                balance: newAcc.balance, 
                weight: newAcc.weight,
                target: newAcc.target ?? acc.target 
              } 
            : acc
        )
      };
    }

    return { accounts: [...state.accounts, newAcc] };
  }),

  updateBalance: (id, amount, weightChange = 0) => {
    const { accounts, transactions, showAlert } = get();
    const targetAccount = accounts.find(acc => acc.id === id);
    if (!targetAccount) return;

    const isExpense = amount < 0 || weightChange < 0;
    const logType: 'income' | 'expense' = isExpense ? 'expense' : 'income';

    const newLog: Transaction = {
      id: Date.now().toString(),
      accountName: targetAccount.name,
      amount: amount !== 0 ? Math.abs(amount) : Math.abs(weightChange),
      type: logType,
      timestamp: Date.now(),
    };

    set({
      accounts: accounts.map(acc => {
        if (acc.id !== id) return acc;

        let newBalance = acc.balance + amount;

        if (amount > 0 && acc.type === 'tabungan' && acc.target) {
          if (newBalance >= acc.target) {
            const kelebihan = newBalance - acc.target;
            newBalance = acc.target;

            setTimeout(() => {
              showAlert(
                "TARGET TERCAPAI! 🏆", 
                `Misi menabung di ${acc.name} selesai!\n` + 
                (kelebihan > 0 ? `Sisa Rp ${kelebihan.toLocaleString()} dikembalikan.` : `Target Rp ${acc.target?.toLocaleString()} tercapai!`),
                "success"
              );
            }, 200);
          }
        }

        return {
          ...acc,
          balance: newBalance,
          weight: Number(((acc.weight || 0) + weightChange).toFixed(4))
        };
      }),
      transactions: [newLog, ...transactions].slice(0, 30)
    });
  },

  deleteAccount: (id) => {
    const { showConfirm, closeConfirm } = get();
    showConfirm("Apakah Anda yakin ingin menghapus aset ini dari Vault?", () => {
      set((state) => ({ accounts: state.accounts.filter(acc => acc.id !== id) }));
      closeConfirm();
    });
  },

  clearTransactions: () => {
    const { showConfirm, closeConfirm } = get();
    showConfirm("Hapus seluruh log transaksi selamanya?", () => {
      set({ transactions: [] });
      closeConfirm();
    });
  },

  // --- LOGIKA GAMIFIKASI ---
  _applyReward: (baseExp, baseGold, baseEnergyCost, difficulty) => {
    const { stats, showAlert } = get();
    const multiplier = getDifficultyMultiplier(difficulty);
    
    const finalExp = Math.round(baseExp * multiplier);
    const finalGold = Math.round(baseGold * multiplier);
    const finalEnergyCost = Math.round(baseEnergyCost * multiplier);

    let newExp = stats.exp + finalExp;
    let newLevel = stats.level;
    let newMaxExp = stats.maxExp;
    let newGold = stats.gold + finalGold;
    
    let newEnergy = Math.min(stats.maxEnergy, Math.max(0, stats.energy - finalEnergyCost));

    while (newExp >= newMaxExp) {
      newLevel += 1;
      newExp -= newMaxExp;
      newMaxExp = Math.floor(newMaxExp * 1.5);
      const levelUpLevel = newLevel; 
      setTimeout(() => showAlert("LEVEL UP!", `Selamat! Level ${levelUpLevel} tercapai!`, "success"), 100);
    }

    set({ stats: { ...stats, exp: newExp, level: newLevel, maxExp: newMaxExp, gold: newGold, energy: newEnergy } });
  },

  // 🔥 FUNGSI REWARD SEDERHANA UNTUK FINANCE
  _applySimpleReward: (expGain) => {
    const { stats, showAlert } = get();
    let newExp = stats.exp + expGain;
    let newLevel = stats.level;
    let newMaxExp = stats.maxExp;

    while (newExp >= newMaxExp) {
      newLevel += 1;
      newExp -= newMaxExp;
      newMaxExp = Math.floor(newMaxExp * 1.5);
      const levelUpLevel = newLevel; 
      setTimeout(() => showAlert("LEVEL UP!", `Selamat! Level ${levelUpLevel} tercapai!`, "success"), 100);
    }

    set({ stats: { ...stats, exp: newExp, level: newLevel, maxExp: newMaxExp } });
  },

  handleHabitPlus: (task) => {
    const { _applyReward } = get();
    _applyReward(10, 2, -5, task.difficulty); 

    set((state) => ({
      tasks: state.tasks.map(t => 
        t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) + 1 } : t
      )
    }));
  },

  handleHabitMinus: (task) => {
    const { stats, showAlert } = get();
    const damage = Math.round(5 * getDifficultyMultiplier(task.difficulty));
    const newHp = Math.max(0, stats.hp - damage);
    
    if (newHp === 0 && stats.hp > 0) {
      showAlert("DIED", "Karaktermu pingsan! Kurangi kebiasaan buruk.", "danger");
    }

    set((state) => ({
      stats: { ...state.stats, hp: newHp },
      tasks: state.tasks.map(t => 
        t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) - 1 } : t
      )
    }));
  },

  toggleTaskDone: (task) => {
    const { stats, showAlert, _applyReward } = get();
    const isNowDone = !task.done;
    
    set((state) => ({ 
        tasks: state.tasks.map(t => t.id === task.id ? { ...t, done: isNowDone } : t) 
    }));

    if (isNowDone) {
      const baseExp = task.isBoss ? 50 : 20;
      const baseGold = task.isBoss ? 20 : 5;
      
      let baseEnergyCost = 0;
      if (task.type === 'daily') {
          baseEnergyCost = 10; 
      } else if (task.type === 'todo') {
          baseEnergyCost = task.isBoss ? 25 : 15; 
      }

      const finalEnergyCost = Math.round(baseEnergyCost * getDifficultyMultiplier(task.difficulty));

      if (finalEnergyCost > 0 && stats.energy < finalEnergyCost) {
        showAlert("LOW ENERGY", "Kamu terlalu lelah, istirahatlah sebentar.", "warning");
      }

      _applyReward(baseExp, baseGold, baseEnergyCost, task.difficulty);
    }
  }
}));