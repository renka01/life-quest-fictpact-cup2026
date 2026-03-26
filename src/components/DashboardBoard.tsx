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
import { translations } from "@/utils/translations";

interface DashboardBoardProps {
  onOpenTaskModal: (type?: TaskType | null) => void;
  onOpenFinanceAction: (type: "rekening" | "tabungan" | "tagihan") => void;
  onOpenBills: () => void;
  onGoToFinance: () => void;
}


export default function DashboardBoard({
  onOpenTaskModal,
  onOpenFinanceAction,
  onOpenBills,
  onGoToFinance,
}: DashboardBoardProps) {
  const { tasks, stats, accounts, transactions, recurringTransactions, settings } = useStore();
  const t = translations[settings?.language || 'id']?.dash || translations['id'].dash;

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

  const greeting = focusTasks.length > 0
      ? t.greetActive.replace('{n}', focusTasks.length)
      : t.greetQuiet;

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-6">
      {/* HERO */}
      <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-6 items-start">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mb-3">
                {t.cmd}
              </p>

              <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000] mb-3">
                <span className="text-amber-500"><LayoutDashboard size={18} /></span>
                {t.title}
              </h1>
              
              <p className="font-pixel text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest leading-relaxed max-w-2xl">
                {t.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-[#1a1b26] border-2 border-amber-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[150px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">{t.role}</p>
                <p className="text-amber-400 font-bold">Lv. {stats.level} Adventurer</p>
              </div>

              <div className="bg-[#1a1b26] border-2 border-orange-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[120px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">{t.streak}</p>
                <p className="text-orange-400 font-bold flex items-center gap-2">
                  <Flame size={14} />
                  {stats.streak} Hari
                </p>
              </div>

              <div className="bg-[#1a1b26] border-2 border-yellow-500 px-4 py-2 shadow-[3px_3px_0_#000] min-w-[100px]">
                <p className="text-[10px] uppercase text-slate-500 mb-1">{t.gold}</p>
                <p className="text-yellow-400 font-bold flex items-center gap-2">
                  <Coins size={14} />
                  {stats.gold}
                </p>
              </div>
            </div>

            <div className="bg-[#1a1b26] border-2 border-slate-700 p-4">
              <p className="text-[10px] uppercase text-slate-500 mb-2">{t.sysInsight}</p>
              <p className="text-sm text-slate-200">{greeting}</p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-[#1a1b26] border-2 border-slate-700 p-4 shadow-[4px_4px_0_#000]">
            <p className="text-[10px] uppercase text-slate-500 mb-3">{t.quick}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onOpenTaskModal(null)}
               // Contoh untuk tombol "Misi Baru"
              className="bg-[#24283b] border-2 border-cyan-500 text-cyan-400 px-3 py-3 text-xs font-bold transition-all shadow-[3px_3px_0_#000] 
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <Plus size={14} />
                  {t.newMission}
                </span>
              </button>

              <button
                onClick={() => onOpenFinanceAction("rekening")}
                className="bg-[#24283b] border-2 border-emerald-500 text-emerald-400 px-3 py-3 text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"
              >
                <span className="flex items-center justify-center gap-2">
                  <CreditCard size={14} />
                  {t.newAcc}
                </span>
              </button>

              <button
                onClick={() => onOpenFinanceAction("tabungan")}
                className="bg-[#24283b] border-2 border-yellow-500 text-yellow-400 px-3 py-3 text-xs font-bold hover:bg-yellow-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"
              >
                <span className="flex items-center justify-center gap-2">
                  <PiggyBank size={14} />
                  {t.newAsset}
                </span>
              </button>

              <button
                onClick={() => onOpenFinanceAction("tagihan")} 
                className="bg-[#24283b] border-2 border-pink-500 text-pink-400 px-3 py-3 text-xs font-bold hover:bg-pink-500 hover:text-slate-950 transition-all shadow-[3px_3px_0_#000]"              >
                <span className="flex items-center justify-center gap-2">
                  <CalendarClock size={14} />
                  {t.bills}
                </span>
              </button>
            </div>

            <button
              onClick={onGoToFinance}
              className="w-full mt-3 bg-[#24283b] border-2 border-slate-600 text-slate-300 px-3 py-3 text-xs font-bold hover:border-white hover:text-white transition-all shadow-[3px_3px_0_#000]"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={14} />
                {t.openFin}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* TOP WIDGETS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-[#24283b] border-4 border-amber-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap size={18} />
            <h2 className="text-sm font-bold uppercase">{t.charStat}</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.level}</p>
              <p className="text-white font-bold text-xl truncate">{stats.level}</p>
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.streak}</p>
              <p className="text-orange-400 font-bold text-xl truncate">{stats.streak}</p>
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.gold}</p>
              <p className="text-yellow-400 font-bold text-xl truncate">{stats.gold}</p>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t-2 border-slate-700">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1.5 uppercase">
              <span>{t.expProg}</span>
              <span className="text-amber-400">{stats.exp} / {stats.maxExp}</span>
            </div>
            <div className="h-2 bg-slate-900 border border-slate-700 overflow-hidden">
              <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${expPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-[#24283b] border-4 border-emerald-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Wallet size={18} />
            <h2 className="text-sm font-bold uppercase">{t.balOver}</h2>
          </div>

          <div className="space-y-4 flex-1">
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.cash}</p>
              <p className="text-white font-bold text-lg truncate" title={`Rp ${totalRekening.toLocaleString()}`}>
                Rp {totalRekening.toLocaleString()}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.asset}</p>
              <p className="text-white font-bold text-lg truncate" title={`Rp ${totalTabungan.toLocaleString()}`}>
                Rp {totalTabungan.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-slate-700 min-w-0 mt-auto">
            <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.net}</p>
            <p className="text-emerald-400 font-bold text-2xl truncate" title={`Rp ${netWorth.toLocaleString()}`}>
              Rp {netWorth.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-[#24283b] border-4 border-yellow-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Coins size={18} />
            <h2 className="text-sm font-bold uppercase">{t.incSec}</h2>
          </div>

          <div className="min-w-0 mb-2">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.totInc}</p>
            <p className="text-yellow-400 font-bold text-2xl truncate" title={`Rp ${totalIncome.toLocaleString()}`}>
              Rp {totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t-2 border-slate-700">
            <div className="min-w-0">
                <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.trans}</p>
              <p className="text-white font-bold text-lg truncate">{incomeTransactions.length}x</p>
            </div>
            <div className="min-w-0">
                <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.avg}</p>
              <p className="text-white font-bold text-lg truncate" title={`Rp ${avgIncome.toLocaleString()}`}>
                Rp {avgIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#24283b] border-4 border-pink-500 shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-pink-400">
            <ScrollText size={18} />
            <h2 className="text-sm font-bold uppercase">{t.prog}</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.tot}</p>
              <p className="text-white font-bold text-xl truncate">{totalTasks}</p>
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.done}</p>
              <p className="text-emerald-400 font-bold text-xl truncate">{completedTasks}</p>
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] uppercase mb-1 truncate">{t.pend}</p>
              <p className="text-pink-400 font-bold text-xl truncate">{pendingTasks}</p>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t-2 border-slate-700">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1.5 uppercase">
              <span>{t.compRate}</span>
              <span className="text-pink-400">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-900 border border-slate-700 overflow-hidden">
              <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN WIDGETS */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6">
        <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white uppercase">{t.focus}</h2>
            <span className="text-[10px] uppercase text-slate-500">
              {focusTasks.length} {t.taskCount}
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
                          {t.done}
                        </span>
                      ) : (
                        <span className="text-[10px] text-yellow-400 uppercase flex items-center gap-1">
                          <Target size={12} />
                          {t.active}
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
                <p className="text-sm italic">{t.noFocus}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-white uppercase">{t.recent}</h2>
              <span className="text-[10px] uppercase text-slate-500">
                {recentTransactions.length} {t.logCount}
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
                <p className="text-sm text-slate-500 italic">{t.noRecent}</p>
              )}
            </div>
          </div>

          <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-white uppercase">{t.upcoming}</h2>
              <span className="text-[10px] uppercase text-slate-500">
                {upcomingBills.length} {t.itemCount}
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
                        {t.due}: {new Date(bill.nextDueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-pink-400 font-bold">
                      Rp {bill.amount.toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">{t.noBills}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
