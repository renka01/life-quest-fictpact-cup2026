"use client";
import React from "react";
import { useStore, TaskType } from "@/store/useStore";
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  ScrollText,
  Zap,
  Coins,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CalendarClock,
  Target,
  CheckCircle2,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface DashboardBoardProps {
  onOpenTaskModal: (type?: TaskType | null) => void;
  onOpenFinanceAction: (type: "rekening" | "tabungan") => void;
  onOpenBills: () => void;
  onGoToFinance: () => void;
}


export default function DashboardBoard({
  onOpenTaskModal,
  onOpenFinanceAction,
  onOpenBills,
  onGoToFinance,
}: DashboardBoardProps) {
  const { tasks, stats, accounts, transactions, recurringTransactions } = useStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const pendingTasks = tasks.filter((t) => !t.done).length;

  const dailyTasks = tasks.filter((t) => t.type === "daily" && !t.done);
  const todoTasks = tasks.filter((t) => t.type === "todo" && !t.done);
  const habitTasks = tasks.filter((t) => t.type === "habit");

  const focusTasks =
    [...todoTasks, ...dailyTasks].length > 0
      ? [...todoTasks, ...dailyTasks].slice(0, 5)
      : habitTasks.slice(0, 5);

  const totalRekening = accounts
    .filter((acc) => acc.type === "rekening")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalTabungan = accounts
    .filter((acc) => acc.type === "tabungan")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const netWorth = totalRekening + totalTabungan;
  const recentTransactions = transactions.slice(0, 5);

  const upcomingBills = recurringTransactions
    .slice()
    .sort((a, b) => a.nextDueDate - b.nextDueDate)
    .slice(0, 4);

  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgIncome =
    incomeTransactions.length > 0 ? Math.round(totalIncome / incomeTransactions.length) : 0;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const expPercent =
    stats.maxExp > 0 ? Math.min(100, (stats.exp / stats.maxExp) * 100) : 0;

  const savingRatio =
    netWorth > 0 ? Math.round((totalTabungan / netWorth) * 100) : 0;

  const greeting = focusTasks.length > 0
      ? `Kamu punya ${focusTasks.length} fokus utama hari ini.`
      : "Hari ini cukup tenang. Saatnya susun langkah berikutnya.";

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-6">
      {/* HERO */}
      <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6 items-start">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2">
                Command Center
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Dashboard Utama
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Ringkasan progres karakter, misi, dan keuanganmu dalam satu layar.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-[#1a1b26] border-2 border-cyan-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[150px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Role</p>
                <p className="text-cyan-400 font-bold">Lv. {stats.level} Adventurer</p>
              </div>

              <div className="bg-[#1a1b26] border-2 border-orange-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[120px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Streak</p>
                <p className="text-orange-400 font-bold flex items-center gap-2">
                  <Flame size={14} />
                  {stats.streak} Hari
                </p>
              </div>

              <div className="bg-[#1a1b26] border-2 border-yellow-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[100px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Gold</p>
                <p className="text-yellow-400 font-bold flex items-center gap-2">
                  <Coins size={14} />
                  {stats.gold}
                </p>
              </div>
            </div>

            <div className="bg-[#1a1b26] border-2 border-slate-700 p-4">
              <p className="text-[10px] uppercase text-slate-500 mb-2">System Insight</p>
              <p className="text-sm text-slate-200">{greeting}</p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-[#1a1b26] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000]">
            <p className="text-[10px] uppercase text-slate-500 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onOpenTaskModal(null)}
               // Contoh untuk tombol "Misi Baru"
              className="bg-[#24283b] border-2 border-cyan-500 text-cyan-400 px-3 py-3 text-xs font-bold transition-all shadow-[3px_3px_0_#000] 
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <Plus size={14} />
                  Misi Baru
                </span>
              </button>

              <button
                onClick={() => onOpenFinanceAction("rekening")}
                className="bg-[#24283b] border-2 border-emerald-500 text-emerald-400 px-3 py-3 text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"
              >
                <span className="flex items-center justify-center gap-2">
                  <CreditCard size={14} />
                  Rekening Baru
                </span>
              </button>

              <button
                onClick={() => onOpenFinanceAction("tabungan")}
                className="bg-[#24283b] border-2 border-yellow-500 text-yellow-400 px-3 py-3 text-xs font-bold hover:bg-yellow-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"
              >
                <span className="flex items-center justify-center gap-2">
                  <PiggyBank size={14} />
                  Tambah Aset
                </span>
              </button>

              <button
                onClick={onOpenBills}
                className="bg-[#24283b] border-2 border-pink-500 text-pink-400 px-3 py-3 text-xs font-bold hover:bg-pink-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"
              >
                <span className="flex items-center justify-center gap-2">
                  <CalendarClock size={14} />
                  Tagihan
                </span>
              </button>
            </div>

            <button
              onClick={onGoToFinance}
              className="w-full mt-3 bg-[#24283b] border-2 border-slate-600 text-slate-300 px-3 py-3 text-xs font-bold hover:border-white hover:text-white transition-all shadow-[3px_3px_0_#000]"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={14} />
                Buka Financial Command Center
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP WIDGETS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-[#24283b] border-4 border-cyan-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Zap size={16} />
            <h2 className="text-sm font-bold uppercase">Status Karakter</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs uppercase">Level</p>
              <p className="text-white font-bold text-2xl">{stats.level}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase">Streak</p>
              <p className="text-orange-400 font-bold text-2xl">{stats.streak}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase">Gold</p>
              <p className="text-yellow-400 font-bold text-xl">{stats.gold}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>EXP</span>
              <span>{stats.exp}/{stats.maxExp}</span>
            </div>
            <div className="h-3 bg-slate-900 border border-slate-700 overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all" style={{ width: `${expPercent}%` }} />
            </div>
          </div>

        </div>

        <div className="bg-[#24283b] border-4 border-emerald-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Wallet size={16} />
            <h2 className="text-sm font-bold uppercase">Balance Overview</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-slate-500 text-xs uppercase">Uang Tunai / Rekening</p>
              <p className="text-emerald-400 font-bold text-2xl">
                Rp {totalRekening.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-xs uppercase">Tabungan & Aset</p>
              <p className="text-cyan-400 font-bold text-2xl">
                Rp {totalTabungan.toLocaleString()}
              </p>
            </div>

            <div className="pt-2 border-t-2 border-slate-700">
              <p className="text-slate-500 text-xs uppercase">Total Net Worth</p>
              <p className="text-white font-bold text-3xl">
                Rp {netWorth.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#24283b] border-4 border-yellow-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Coins size={16} />
            <h2 className="text-sm font-bold uppercase">Ringkasan Pemasukan</h2>
          </div>

          <div>
            <p className="text-slate-500 text-xs uppercase">Total Pemasukan</p>
            <p className="text-yellow-400 font-bold text-3xl">
              Rp {totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1b26] border-2 border-slate-700 p-3">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Transaksi Masuk</p>
              <p className="text-white font-bold text-xl">{incomeTransactions.length}</p>
            </div>

            <div className="bg-[#1a1b26] border-2 border-slate-700 p-3">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Rata-rata</p>
              <p className="text-white font-bold text-xl">Rp {avgIncome.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[#1a1b26] border-2 border-slate-700 p-3">
            <p className="text-[10px] uppercase text-slate-500 mb-1">Saving Ratio</p>
            <p className="text-cyan-400 font-bold text-xl">{savingRatio}%</p>
          </div>
        </div>

        <div className="bg-[#24283b] border-4 border-pink-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-pink-400">
            <ScrollText size={16} />
            <h2 className="text-sm font-bold uppercase">Progress Misi</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-slate-500 text-xs uppercase">Total</p>
              <p className="text-white font-bold text-2xl">{totalTasks}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase">Selesai</p>
              <p className="text-emerald-400 font-bold text-2xl">{completedTasks}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase">Pending</p>
              <p className="text-yellow-400 font-bold text-2xl">{pendingTasks}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Completion Rate</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-slate-900 border border-slate-700 overflow-hidden">
              <div className="h-full bg-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN WIDGETS */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
        <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase">Fokus Hari Ini</h2>
            <span className="text-[10px] uppercase text-slate-500">
              {focusTasks.length} Task
            </span>
          </div>

          <div className="space-y-3">
            {focusTasks.length > 0 ? (
              focusTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-2 border-slate-700 bg-[#1a1b26] p-4 hover:border-cyan-500 transition-all"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-white font-bold text-base">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] uppercase text-slate-500">
                        <span>{task.type}</span>
                        <span>•</span>
                        <span>{task.category}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] px-2 py-1 border border-slate-600 text-slate-300 uppercase">
                        Lv {task.difficulty}
                      </span>
                      {task.done ? (
                        <span className="text-[10px] text-emerald-400 uppercase flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Done
                        </span>
                      ) : (
                        <span className="text-[10px] text-yellow-400 uppercase flex items-center gap-1">
                          <Target size={12} />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <div className="w-16 h-16 bg-[#1a1b26] border-4 border-slate-700 border-dashed flex items-center justify-center mb-4">
                  <LayoutDashboard size={24} className="opacity-50" />
                </div>
                <p className="text-sm italic">Belum ada misi aktif.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white uppercase">Aktivitas Terbaru</h2>
              <span className="text-[10px] uppercase text-slate-500">
                {recentTransactions.length} Logs
              </span>
            </div>

            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((log) => (
                  <div
                    key={log.id}
                    className="border-2 border-slate-700 bg-[#1a1b26] p-3 flex justify-between items-start gap-4"
                  >
                    <div>
                      <p className="text-white font-bold">{log.accountName}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(log.timestamp).toLocaleDateString()} •{" "}
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-bold flex items-center gap-1 justify-end ${
                          log.type === "income" ? "text-emerald-400" : "text-pink-400"
                        }`}
                      >
                        {log.type === "income" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>
                          {log.type === "income" ? "+" : "-"} Rp {log.amount.toLocaleString()}
                        </span>
                      </div>

                      {typeof log.expGained === "number" && log.expGained > 0 && (
                        <p className="text-[10px] text-yellow-400 font-bold mt-1">
                          +{log.expGained} EXP
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Belum ada aktivitas terbaru.</p>
              )}
            </div>
          </div>

          <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white uppercase">Upcoming Bills</h2>
              <span className="text-[10px] uppercase text-slate-500">
                {upcomingBills.length} Item
              </span>
            </div>

            <div className="space-y-3">
              {upcomingBills.length > 0 ? (
                upcomingBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="border-2 border-slate-700 bg-[#1a1b26] p-3 flex justify-between items-start"
                  >
                    <div>
                      <p className="text-white font-bold">{bill.name}</p>
                      <p className="text-xs text-slate-500">
                        Due: {new Date(bill.nextDueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-pink-400 font-bold">
                      Rp {bill.amount.toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Belum ada tagihan rutin.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
