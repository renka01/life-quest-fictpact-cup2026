import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  expGained?: number;
  gram?: number;
}

export interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  accountId: string;
  nextDueDate: number;
  status?: 'upcoming' | 'due' | 'overdue';
}

export interface Stats {
  level: number;
  hp: number;
  maxHp: number;
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
  type: 'info' | 'success' | 'danger' | 'warning' | 'levelup';
}

interface ConfirmDialog {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

export interface UserProfile {
  accountName: string;
  nickname: string;
  gender?: string | null; 
  avatarId?: number | null; 
  level?: number | null;    
  gold?: number | null;     
  exp?: number | null;      
}

export interface DailyProgress {
  loginClaimed: boolean;
  tasksCompleted: number;
  taskClaimed: boolean;
  bossesDefeated: number;
  bossClaimed: boolean;
}

export interface AppSettings {
  language: string;
  dateFormat: string;
  startOfDay: string;
  audioTheme: string;
  holidayMode: boolean;
}

export type EquipSlot = 'weapon' | 'armor' | 'helmet' | 'cloak' | 'accessory' | 'potion';

export interface InventoryItem {
  id: number;
  quantity: number;
}

export type EquippedItems = {
  [key in EquipSlot]?: number;
};

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

  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  playSound: (soundName: string) => void;

  userProfile: UserProfile;
  setUserProfile: (profile: Partial<UserProfile>) => void;

  dailyProgress: DailyProgress;
  claimDailyReward: (type: 'login' | 'task' | 'boss') => void;
  recordBossDefeated: () => void;

  inventory: InventoryItem[];
  equippedItems: EquippedItems;
  buyItem: (itemId: number, price: number) => boolean;
  sellItem: (itemId: number, price: number) => void;
  equipItem: (slot: EquipSlot, itemId: number) => void;
  unequipItem: (slot: EquipSlot) => void;

  markRecurringDue: () => void;
  confirmRecurringPayment: (id: string) => void;
  snoozeRecurringTransaction: (id: string) => void;
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
  updateBalance: (
    id: string,
    amount: number,
    weightChange?: number,
    meta?: { exp?: number; gram?: number; gold?: number }
  ) => void;
  deleteAccount: (id: string) => void;
  clearTransactions: () => void;
  
  _applyReward: (baseExp: number, baseGold: number, difficulty: number) => void;
  _applySimpleReward: (expGain: number, goldGain?: number) => void;

  takeDamage: (amount: number) => void;
  healPlayer: (amount: number) => void;
  consumeItem: (itemId: number) => void;
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
export const useStore = create<LifeQuestStore>()(
  persist(
    (set, get) => ({
      // --- INITIAL DATA ---
      userProfile: {
        accountName: "",
        nickname: "", 
        gender: null,
        avatarId: null,
        level: 1,
        gold: 0,
        exp: 0
      },
      settings: {
        language: "id",
        dateFormat: "DD/MM/YYYY",
        startOfDay: "00:00",
        audioTheme: "retro",
        holidayMode: false,
      },
      dailyProgress: {
        loginClaimed: false,
        tasksCompleted: 0,
        taskClaimed: false,
        bossesDefeated: 0,
        bossClaimed: false,
      },
      inventory: [],
      equippedItems: {},
      tasks: [],
      accounts: [], 
      transactions: [],
      recurringTransactions: [],
      coinPopup: { show: false, amount: 0, id: 0 },
      stats: {
        level: 1,
        hp: 50, maxHp: 50,
        exp: 0, maxExp: 300,
        gold: 0,
        streak: 0,
        lastLoginDate: ""
      },
      alertDialog: { isOpen: false, title: "", message: "", type: "info" },
      confirmDialog: { isOpen: false, message: "", onConfirm: () => {} },

      // --- ACTIONS PROFILE ---
      setUserProfile: (profile) => set((state) => ({
        userProfile: { 
          ...state.userProfile, 
          ...profile 
        }
      })),

      // --- ACTIONS SETTINGS & AUDIO ---
      updateSetting: (key, value) => set((state) => ({ 
        settings: { ...state.settings, [key]: value } 
      })),
      playSound: (soundName) => {
        const { settings } = get();
        if (settings.audioTheme === 'mute') return; 
        if (typeof window !== 'undefined') {
          try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            const now = ctx.currentTime;
            
            if (soundName === 'click') {
              osc.type = 'square';
              osc.frequency.setValueAtTime(400, now);
              osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
              gain.gain.setValueAtTime(0.05, now);
              gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
              osc.start(now); osc.stop(now + 0.1);
            } else if (soundName === 'success') {
              osc.type = 'square';
              osc.frequency.setValueAtTime(400, now);
              osc.frequency.setValueAtTime(600, now + 0.1);
              gain.gain.setValueAtTime(0.05, now);
              gain.gain.linearRampToValueAtTime(0, now + 0.3);
              osc.start(now); osc.stop(now + 0.3);
            } else if (soundName === 'error') {
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(150, now);
              osc.frequency.linearRampToValueAtTime(100, now + 0.2);
              gain.gain.setValueAtTime(0.05, now);
              gain.gain.linearRampToValueAtTime(0, now + 0.2);
              osc.start(now); osc.stop(now + 0.2);
            } else if (soundName === 'glitch') {
              osc.type = 'square';
              osc.frequency.setValueAtTime(150, now);
              osc.frequency.setValueAtTime(300, now + 0.05);
              osc.frequency.setValueAtTime(150, now + 0.1);
              gain.gain.setValueAtTime(0.05, now);
              gain.gain.linearRampToValueAtTime(0, now + 0.15);
              osc.start(now); osc.stop(now + 0.15);
            } else if (soundName === 'coin') {
              osc.type = 'square';
              osc.frequency.setValueAtTime(987.77, now); 
              osc.frequency.setValueAtTime(1318.51, now + 0.1); 
              gain.gain.setValueAtTime(0.05, now);
              gain.gain.setValueAtTime(0.05, now + 0.1);
              gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
              osc.start(now); osc.stop(now + 0.4);
            }
          } catch(e) {}
        }
      },

      // --- ACTIONS INVENTORY & SHOP ---
      buyItem: (itemId, price) => {
        const { stats, inventory, showAlert } = get();
        if (stats.gold < price) {
          showAlert("EMAS TIDAK CUKUP", "Kumpulkan lebih banyak gold dari misi!", "warning");
          return false;
        }
        
        const existing = inventory.find(i => i.id === itemId);
        let newInv = [];
        if (existing) {
          newInv = inventory.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          newInv = [...inventory, { id: itemId, quantity: 1 }];
        }

        set({
          stats: { ...stats, gold: stats.gold - price },
          inventory: newInv
        });
        return true;
      },
      sellItem: (itemId, price) => {
        // Optional
      },
      equipItem: (slot, itemId) => set((state) => ({
        equippedItems: {
          ...state.equippedItems,
          [slot]: itemId
        }
      })),
      unequipItem: (slot) => set((state) => {
        const newEquipped = { ...state.equippedItems };
        delete newEquipped[slot];
        return { equippedItems: newEquipped };
      }),

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
        const initialAmount = Math.abs(newAcc.balance || 0);
        const initialGram = Math.abs(newAcc.weight || 0);

        const shouldCreateLog = initialAmount > 0 || initialGram > 0;

        const newLog: Transaction | null = shouldCreateLog
          ? {
              id: Date.now().toString(),
              accountName: newAcc.name,
              amount: initialAmount,
              type: 'income',
              timestamp: Date.now(),
              expGained: undefined,
              gram: initialGram > 0 ? initialGram : undefined,
            }
          : null;

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
            ),
            transactions: newLog
              ? [newLog, ...state.transactions].slice(0, 30)
              : state.transactions
          };
        }

        return {
          accounts: [...state.accounts, newAcc],
          transactions: newLog
            ? [newLog, ...state.transactions].slice(0, 30)
            : state.transactions
        };
      }),

      updateBalance: (id, amount, weightChange = 0, meta) => {
        const { accounts, transactions, showAlert, _applySimpleReward, stats } = get();
        const targetAccount = accounts.find(acc => acc.id === id);
        if (!targetAccount) return;

        const hasMoney = Math.abs(amount) > 0;
        const hasWeight = Math.abs(weightChange) > 0;
        if (!hasMoney && !hasWeight) return;

        const isExpense = amount < 0 || weightChange < 0;
        const logType: 'income' | 'expense' = isExpense ? 'expense' : 'income';

        const expGain = logType === 'income' ? (meta?.exp || 0) : 0;
        const goldGain = logType === 'income' ? (meta?.gold || 0) : 0;

        if (expGain > 0 || goldGain > 0) {
          _applySimpleReward(expGain, goldGain);
        }

        const newLog: Transaction = {
          id: Date.now().toString(),
          accountName: targetAccount.name,
          amount: Math.abs(amount),
          type: logType,
          timestamp: Date.now(),
          expGained: expGain, 
          gram: weightChange ? Math.abs(weightChange) : undefined
        };

        set({
          accounts: accounts.map(acc => {
            if (acc.id !== id) return acc;

            let newBalance = acc.balance + amount;

            if (amount > 0 && acc.type === 'tabungan' && acc.target) {
              if (newBalance >= acc.target && acc.balance < acc.target) {
                setTimeout(() => {
                  showAlert(
                    "TARGET TERCAPAI!",
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
      addRecurringTransaction: (tx) =>
        set((state) => ({
          recurringTransactions: [
            ...state.recurringTransactions,
            { ...tx, status: 'upcoming' as const },
          ],
        })),

      deleteRecurringTransaction: (id) => set((state) => ({ 
        recurringTransactions: state.recurringTransactions.filter(t => t.id !== id) 
      })),

      processRecurringTransactions: () => {
        const { recurringTransactions } = get();
        const now = new Date();
        const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        const updatedRecurring = recurringTransactions.map((tx) => {
          const dueDate = new Date(tx.nextDueDate);
          const dueOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()).getTime();

          if (dueOnly === todayOnly) {
            return { ...tx, status: 'due' as const };
          }
          if (dueOnly < todayOnly && tx.status !== 'due') {
            return { ...tx, status: 'overdue' as const };
          }
          if (dueOnly > todayOnly) {
            return { ...tx, status: 'upcoming' as const };
          }
          return tx;
        });

        set({ recurringTransactions: updatedRecurring });
      },

      markRecurringDue: () => {
        const { processRecurringTransactions } = get();
        processRecurringTransactions();
      },

      confirmRecurringPayment: (id) => {
        const { recurringTransactions, updateBalance, showAlert } = get();
        const tx = recurringTransactions.find((item) => item.id === id);
        if (!tx) return;

        updateBalance(tx.accountId, tx.type === 'income' ? tx.amount : -tx.amount);

        const nextDate = new Date(tx.nextDueDate);
        nextDate.setMonth(nextDate.getMonth() + 1);

        set((state) => ({
          recurringTransactions: state.recurringTransactions.map((item) =>
            item.id === id
              ? {
                  ...item,
                  nextDueDate: nextDate.getTime(),
                  status: 'upcoming',
                }
              : item
          ),
        }));

        showAlert("TAGIHAN DIBAYAR", `${tx.name} berhasil diproses.`, "success");
      },

      snoozeRecurringTransaction: (id) => {
        const { showAlert } = get();

        set((state) => ({
          recurringTransactions: state.recurringTransactions.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: 'overdue',
                }
              : item
          ),
        }));

        showAlert("DITUNDA", "Tagihan ditunda. Akan tetap muncul sampai dibayar.", "warning");
      },

      checkDailyStreak: () => {
        const { stats, dailyProgress } = get();
        const today = new Date().toDateString();
        const lastLogin = stats.lastLoginDate;

        if (lastLogin === today) return; 

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        let newStreak = 1;
        if (lastLogin === yesterday.toDateString()) {
          newStreak = stats.streak + 1;
        }

        const expBonus = newStreak * 10;
        const goldBonus = newStreak * 5;
        
        set((state) => ({
          stats: {
            ...state.stats,
            streak: newStreak,
            lastLoginDate: today,
            exp: state.stats.exp + expBonus,
            gold: state.stats.gold + goldBonus,
            hp: state.stats.maxHp 
          },
          dailyProgress: {
            loginClaimed: false,
            tasksCompleted: 0,
            taskClaimed: false,
            bossesDefeated: 0,
            bossClaimed: false,
          }
        }));
      },

      claimDailyReward: (type) => {
        const { dailyProgress, _applySimpleReward } = get();
        const dp = dailyProgress || { loginClaimed: false, tasksCompleted: 0, taskClaimed: false, bossesDefeated: 0, bossClaimed: false };
        
        if (type === 'login' && !dp.loginClaimed) {
          set({ dailyProgress: { ...dp, loginClaimed: true } });
          _applySimpleReward(15, 10);
        } else if (type === 'task' && dp.tasksCompleted >= 3 && !dp.taskClaimed) {
          set({ dailyProgress: { ...dp, taskClaimed: true } });
          _applySimpleReward(30, 20);
        } else if (type === 'boss' && dp.bossesDefeated >= 1 && !dp.bossClaimed) {
          set({ dailyProgress: { ...dp, bossClaimed: true } });
          _applySimpleReward(50, 30);
        }
      },

      recordBossDefeated: () => set((state) => {
        const dp = state.dailyProgress || { loginClaimed: false, tasksCompleted: 0, taskClaimed: false, bossesDefeated: 0, bossClaimed: false };
        return { dailyProgress: { ...dp, bossesDefeated: dp.bossesDefeated + 1 } };
      }),

      // --- LOGIKA GAMIFIKASI ---
      _applyReward: (baseExp, baseGold, difficulty) => {
        const { stats, showAlert } = get();
        const multiplier = getDifficultyMultiplier(difficulty);
        
        const expGain = Math.round(baseExp * multiplier);
        const goldGain = Math.round(baseGold * multiplier);

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
          newHp = newMaxHp; 
          showAlert("LEVEL UP!", `Selamat! Kamu naik ke level ${newLevel}!`, "levelup");
        }

        set({
          stats: {
            ...stats,
            exp: newExp,
            level: newLevel,
            maxExp: newMaxExp,
            gold: stats.gold + goldGain,
            hp: newHp,
            maxHp: newMaxHp
          },
          coinPopup: { show: true, amount: goldGain, id: Date.now() }
        });
      },

      _applySimpleReward: (expGain, goldGain = 0) => {
        const { stats, showAlert } = get();
        let newExp = stats.exp + expGain;
        let newLevel = stats.level;
        let newMaxExp = stats.maxExp;

        if (newExp >= stats.maxExp) {
          newLevel += 1;
          newExp -= stats.maxExp;
          newMaxExp = Math.floor(stats.maxExp * 1.2);
          showAlert("LEVEL UP!", `Selamat! Kamu naik ke level ${newLevel}!`, "levelup");
        }

        set({
          stats: {
            ...stats,
            exp: newExp,
            level: newLevel,
            maxExp: newMaxExp,
            gold: stats.gold + goldGain
          },
          coinPopup: goldGain > 0
            ? { show: true, amount: goldGain, id: Date.now() }
            : { show: false, amount: 0, id: 0 }
        });
      },

      toggleTaskDone: (task) => {
        const { tasks, _applyReward, dailyProgress } = get();
        const isDone = !task.done;
        const dp = dailyProgress || { loginClaimed: false, tasksCompleted: 0, taskClaimed: false, bossesDefeated: 0, bossClaimed: false };

        set({ 
          tasks: tasks.map(t => t.id === task.id ? { ...t, done: isDone } : t),
          dailyProgress: { ...dp, tasksCompleted: isDone ? dp.tasksCompleted + 1 : Math.max(0, dp.tasksCompleted - 1) }
        });
        if (isDone) _applyReward(20, 10, task.difficulty);
      },

      handleHabitPlus: (task) => {
        const { tasks, _applyReward } = get();
        set({ tasks: tasks.map(t => t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) + 1 } : t) });
        _applyReward(5, 2, task.difficulty);
      },

      handleHabitMinus: (task) => {
        const { tasks, stats, takeDamage, showAlert } = get();
        
        const damage = Math.max(1, Math.round(5 * getDifficultyMultiplier(task.difficulty)));
        takeDamage(damage);
        
        if (stats.hp > 0 && stats.hp - damage <= 0) {
          showAlert("NYAWA HABIS", "Karaktermu pingsan karena terlalu banyak kebiasaan buruk! Segera gunakan potion dari Toko.", "danger");
        }

        set({ tasks: tasks.map(t => t.id === task.id ? { ...t, habitCount: (t.habitCount || 0) - 1 } : t) });
      },

      takeDamage: (amount) => set((state) => ({
        stats: {
          ...state.stats,
          hp: Math.max(0, state.stats.hp - amount)
        }
      })),

      healPlayer: (amount) => set((state) => ({
        stats: {
          ...state.stats,
          hp: Math.min(state.stats.maxHp, state.stats.hp + amount)
        }
      })),

      consumeItem: (itemId) => set((state) => {
        const existing = state.inventory.find(i => i.id === itemId);
        if (!existing) return state;
        const newInv = state.inventory.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0);
        return { inventory: newInv };
      })

    }),
    {
      name: 'lifequest-storage',
      // KITA GUNAKAN LOCAL STORAGE BIASA AGAR TIDAK BENTROK SAAT INIT CHARACTER
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => !['coinPopup', 'alertDialog', 'confirmDialog'].includes(key))
      ),
    }
  )
);