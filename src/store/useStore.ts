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

export interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  accountId: string;
  nextDueDate: number; // Timestamp tanggal jatuh tempo berikutnya
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
  streak: number;
  lastLoginDate: string;
}

export interface CoinPopup {
  show: boolean;
  amount: number;
  id: number;
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
  recurringTransactions: RecurringTransaction[];
  coinPopup: CoinPopup;

  addRecurringTransaction: (tx: RecurringTransaction) => void;
  deleteRecurringTransaction: (id: string) => void;
  processRecurringTransactions: () => void;
  checkDailyStreak: () => void;

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
  recurringTransactions: [],
  coinPopup: { show: false, amount: 0, id: 0 },
  stats: {
    level: 1,
    hp: 50, maxHp: 50,
    energy: 100, maxEnergy: 100,
    exp: 0, maxExp: 300,
    gold: 0,
    streak: 0,
    lastLoginDate: ""
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
          if (newBalance >= acc.target && acc.balance < acc.target) {
            setTimeout(() => {
              showAlert(
                "TARGET TERCAPAI! 🏆", 
                `Misi menabung di ${acc.name} selesai!\nTarget Rp ${acc.target?.toLocaleString()} tercapai!`,
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

  // --- ACTIONS RECURRING ---
  addRecurringTransaction: (tx) => set((state) => ({ 
    recurringTransactions: [...state.recurringTransactions, tx] 
  })),

  deleteRecurringTransaction: (id) => set((state) => ({ 
    recurringTransactions: state.recurringTransactions.filter(t => t.id !== id) 
  })),

  processRecurringTransactions: () => {
    const { recurringTransactions, updateBalance, showAlert } = get();
    const now = Date.now();
    let hasUpdates = false;

    const updatedRecurring = recurringTransactions.map(tx => {
      if (tx.nextDueDate <= now) {
        // Proses transaksi
        updateBalance(tx.accountId, tx.type === 'income' ? tx.amount : -tx.amount);
        hasUpdates = true;
        
        // Update tanggal ke bulan depan
        const nextDate = new Date(tx.nextDueDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        return { ...tx, nextDueDate: nextDate.getTime() };
      }
      return tx;
    });

    if (hasUpdates) {
      set({ recurringTransactions: updatedRecurring });
      showAlert("AUTOPAY", "Tagihan rutin berhasil diproses otomatis.", "info");
    }
  },

  checkDailyStreak: () => {
    const { stats, showAlert } = get();
    const today = new Date().toDateString();
    const lastLogin = stats.lastLoginDate;

    if (lastLogin === today) return; // Sudah login hari ini

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak = 1;
    // Jika login terakhir adalah kemarin, tambah streak
    if (lastLogin === yesterday.toDateString()) {
      newStreak = stats.streak + 1;
    }

    // Reward logic
    const expBonus = newStreak * 10;
    const goldBonus = newStreak * 5;
    
    set((state) => ({
      stats: {
        ...state.stats,
        streak: newStreak,
        lastLoginDate: today,
        exp: state.stats.exp + expBonus,
        gold: state.stats.gold + goldBonus
      },
      coinPopup: { show: true, amount: goldBonus, id: Date.now() }
    }));

    showAlert("DAILY STREAK! 🔥", `Login ${newStreak} hari beruntun! \n+${expBonus} EXP, +${goldBonus} Gold`, "success");
  },

  // --- LOGIKA GAMIFIKASI ---
  _applyReward: (baseExp, baseGold, baseEnergyCost, difficulty) => {
    const { stats, showAlert } = get();
    const multiplier = getDifficultyMultiplier(difficulty);
    
    const expGain = Math.round(baseExp * multiplier);
    const goldGain = Math.round(baseGold * multiplier);
    const energyCost = Math.round(baseEnergyCost * multiplier);

    if (stats.energy < energyCost) {
      showAlert("LELAH!", "Energi tidak cukup. Istirahatlah sejenak!", "warning");
      return;
    }

    let newExp = stats.exp + expGain;
    let newLevel = stats.level;
    let newMaxExp = stats.maxExp;
    let newHp = stats.hp;
    let newMaxHp = stats.maxHp;

    if (newExp >= stats.maxExp) {
      newLevel += 1;
      newExp -= stats.maxExp;
      newMaxExp = Math.floor(stats.maxExp * 1.2);
      newMaxHp += 10;
      newHp = newMaxHp; // Full heal on level up
      showAlert("LEVEL UP!", `Selamat! Kamu naik ke level ${newLevel}!`, "success");
    }

    set({
      stats: {
        ...stats,
        exp: newExp,
        level: newLevel,
        maxExp: newMaxExp,
        gold: stats.gold + goldGain,
        energy: Math.max(0, stats.energy - energyCost),
        hp: newHp,
        maxHp: newMaxHp
      },
      coinPopup: { show: true, amount: goldGain, id: Date.now() }
    });
  },

  _applySimpleReward: (expGain) => {
    const { stats, showAlert } = get();
    let newExp = stats.exp + expGain;
    let newLevel = stats.level;
    let newMaxExp = stats.maxExp;

    if (newExp >= stats.maxExp) {
      newLevel += 1;
      newExp -= stats.maxExp;
      newMaxExp = Math.floor(stats.maxExp * 1.2);
      showAlert("LEVEL UP!", `Selamat! Kamu naik ke level ${newLevel}!`, "success");
    }

    set({ stats: { ...stats, exp: newExp, level: newLevel, maxExp: newMaxExp } });
  },

  toggleTaskDone: (task) => {
    const { tasks, _applyReward } = get();
    const isDone = !task.done;
    set({ tasks: tasks.map(t => t.id === task.id ? { ...t, done: isDone } : t) });
    if (isDone) _applyReward(20, 10, 5, task.difficulty);
  },

  handleHabitPlus: (task) => {
    const { tasks, _applyReward } = get();
    set({ tasks: tasks.map(t => t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) + 1 } : t) });
    _applyReward(5, 2, 1, task.difficulty);
  },

  handleHabitMinus: (task) => {
    const { tasks } = get();
    set({ tasks: tasks.map(t => t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) - 1 } : t) });
  }
}));