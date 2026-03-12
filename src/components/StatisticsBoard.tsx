"use client";
import React from "react";
import { useStore } from "@/store/useStore";
import {
  BarChart3,
  Wallet,
  TrendingUp,
  TrendingDown,
  Coins,
  Zap,
  CheckCircle2,
  Clock3,
  Target,
  Layers3,
  Flame,
  Trophy,
} from "lucide-react";

export default function StatisticsBoard() {
  const { tasks, transactions, accounts, stats } = useStore();

  // =========================
  // TASK STATS
  // =========================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const pendingTasks = tasks.filter((t) => !t.done).length;
  const habitTasks = tasks.filter((t) => t.type === "habit").length;
  const dailyTasks = tasks.filter((t) => t.type === "daily").length;
  const todoTasks = tasks.filter((t) => t.type === "todo").length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const categoryCountMap = tasks.reduce((acc: Record<string, number>, task) => {
    const key = task.category || "Tanpa Kategori";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const difficultyCountMap = tasks.reduce((acc: Record<string, number>, task) => {
    const key = `Lv ${task.difficulty || 1}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const difficultyStats = Object.entries(difficultyCountMap).sort((a, b) => {
    const aNum = Number(a[0].replace("Lv ", ""));
    const bNum = Number(b[0].replace("Lv ", ""));
    return aNum - bNum;
  });

  // =========================
  // FINANCE STATS
  // =========================
  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalIncome - totalExpense;

  const totalRekening = accounts
    .filter((acc) => acc.type === "rekening")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalTabungan = accounts
    .filter((acc) => acc.type === "tabungan")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const netWorth = totalRekening + totalTabungan;

  const largestAccount =
    accounts.length > 0
      ? [...accounts].sort((a, b) => b.balance - a.balance)[0]
      : null;

  const goldAccounts = accounts.filter(
    (acc) =>
      acc.type === "tabungan" &&
      (acc.name.toLowerCase().includes("emas") ||
        acc.name.toLowerCase().includes("gold"))
  );

  const totalGoldGram = goldAccounts.reduce((sum, acc) => sum + (acc.weight || 0), 0);

  // =========================
  // CHARACTER STATS
  // =========================
  const expPercent =
    stats.maxExp > 0 ? Math.min(100, (stats.exp / stats.maxExp) * 100) : 0;

  const energyPercent =
    stats.maxEnergy > 0 ? Math.min(100, (stats.energy / stats.maxEnergy) * 100) : 0;

  const hpPercent =
    stats.maxHp > 0 ? Math.min(100, (stats.hp / stats.maxHp) * 100) : 0;

  const expRemaining = Math.max(0, stats.maxExp - stats.exp);

  const playerTitle =
    stats.level >= 20
      ? "Vault Master"
      : stats.level >= 15
      ? "Elite Grinder"
      : stats.level >= 10
      ? "Senior Adventurer"
      : stats.level >= 5
      ? "Rising Hunter"
      : "Rookie Adventurer";

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-6">
      {/* HERO */}
      <div className="bg-[#24283b] border-4 border-slate-700 shadow-[6px_6px_0_#000] p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2">
              Data Center
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Statistik
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Ringkasan performa misi, karakter, dan kondisi keuanganmu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1b26] border-2 border-cyan-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Completion Rate</p>
              <p className="text-cyan-400 text-3xl font-bold">{completionRate}%</p>
            </div>

            <div className="bg-[#1a1b26] border-2 border-emerald-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Net Worth</p>
              <p className="text-emerald-400 text-3xl font-bold">
                Rp {netWorth.toLocaleString()}
              </p>
            </div>

            <div className="bg-[#1a1b26] border-2 border-yellow-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-slate-500 mb-1">Player Title</p>
              <p className="text-yellow-400 text-xl font-bold">{playerTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <StatCard
          title="Statistik Misi"
          icon={<CheckCircle2 size={16} />}
          color="cyan"
          lines={[
            ["Total", totalTasks.toString()],
            ["Selesai", completedTasks.toString()],
            ["Pending", pendingTasks.toString()],
            ["Habit / Daily / Todo", `${habitTasks} / ${dailyTasks} / ${todoTasks}`],
          ]}
          progress={completionRate}
          progressLabel="Completion"
          progressColor="bg-cyan-400"
        />

        <StatCard
          title="Statistik Keuangan"
          icon={<Wallet size={16} />}
          color="emerald"
          lines={[
            ["Pemasukan", `Rp ${totalIncome.toLocaleString()}`],
            ["Pengeluaran", `Rp ${totalExpense.toLocaleString()}`],
            ["Net Flow", `Rp ${netFlow.toLocaleString()}`],
            ["Transaksi", transactions.length.toString()],
          ]}
        />

        <StatCard
          title="Statistik Karakter"
          icon={<Zap size={16} />}
          color="yellow"
          lines={[
            ["Level", stats.level.toString()],
            ["Gold", stats.gold.toString()],
            ["Streak", `${stats.streak} Hari`],
            ["EXP ke level berikutnya", expRemaining.toString()],
          ]}
          progress={expPercent}
          progressLabel="EXP"
          progressColor="bg-yellow-400"
        />

        <StatCard
          title="Aset & Cadangan"
          icon={<Coins size={16} />}
          color="pink"
          lines={[
            ["Rekening", `Rp ${totalRekening.toLocaleString()}`],
            ["Tabungan", `Rp ${totalTabungan.toLocaleString()}`],
            ["Akun Terbesar", largestAccount ? largestAccount.name : "-"],
            ["Emas", `${totalGoldGram.toFixed(4)} GR`],
          ]}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* TASK BREAKDOWN */}
        <div className="bg-[#24283b] border-4 border-cyan-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-4">
            <Layers3 size={16} />
            <h2 className="text-sm font-bold uppercase">Breakdown Misi</h2>
          </div>

          <div className="space-y-4">
            <SimpleBar label="Habit" value={habitTasks} max={Math.max(totalTasks, 1)} color="bg-cyan-400" />
            <SimpleBar label="Daily" value={dailyTasks} max={Math.max(totalTasks, 1)} color="bg-emerald-400" />
            <SimpleBar label="Todo" value={todoTasks} max={Math.max(totalTasks, 1)} color="bg-pink-400" />
          </div>

          <div className="mt-6 border-t-2 border-slate-700 pt-4">
            <p className="text-[10px] uppercase text-slate-500 mb-3">Kesulitan Misi</p>
            <div className="space-y-3">
              {difficultyStats.length > 0 ? (
                difficultyStats.map(([level, count]) => (
                  <SimpleBar
                    key={level}
                    label={level}
                    value={count}
                    max={Math.max(totalTasks, 1)}
                    color="bg-yellow-400"
                  />
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Belum ada data kesulitan.</p>
              )}
            </div>
          </div>
        </div>

        {/* TOP CATEGORY */}
        <div className="bg-[#24283b] border-4 border-pink-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-pink-400 mb-4">
            <Target size={16} />
            <h2 className="text-sm font-bold uppercase">Kategori Teraktif</h2>
          </div>

          <div className="space-y-3">
            {topCategories.length > 0 ? (
              topCategories.map(([category, count], idx) => (
                <div
                  key={category}
                  className="bg-[#1a1b26] border-2 border-slate-700 p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-pink-500 text-pink-400 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-bold">{category}</p>
                      <p className="text-xs text-slate-500">Jumlah misi di kategori ini</p>
                    </div>
                  </div>
                  <div className="text-pink-400 font-bold text-xl">{count}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">Belum ada kategori yang tercatat.</p>
            )}
          </div>
        </div>

        {/* FINANCE SUMMARY */}
        <div className="bg-[#24283b] border-4 border-emerald-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <BarChart3 size={16} />
            <h2 className="text-sm font-bold uppercase">Arus Keuangan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MiniBox
              label="Income"
              value={`Rp ${totalIncome.toLocaleString()}`}
              color="text-emerald-400"
              icon={<TrendingUp size={14} />}
            />
            <MiniBox
              label="Expense"
              value={`Rp ${totalExpense.toLocaleString()}`}
              color="text-pink-400"
              icon={<TrendingDown size={14} />}
            />
            <MiniBox
              label="Net Flow"
              value={`Rp ${netFlow.toLocaleString()}`}
              color={netFlow >= 0 ? "text-cyan-400" : "text-yellow-400"}
              icon={<Wallet size={14} />}
            />
          </div>

          <div className="mt-6 space-y-4">
            <SimpleBar
              label="Pemasukan"
              value={totalIncome}
              max={Math.max(totalIncome, totalExpense, 1)}
              color="bg-emerald-400"
              isCurrency
            />
            <SimpleBar
              label="Pengeluaran"
              value={totalExpense}
              max={Math.max(totalIncome, totalExpense, 1)}
              color="bg-pink-400"
              isCurrency
            />
          </div>
        </div>

        {/* CHARACTER PANEL */}
        <div className="bg-[#24283b] border-4 border-yellow-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-yellow-400 mb-4">
            <Trophy size={16} />
            <h2 className="text-sm font-bold uppercase">Progres Karakter</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <MiniBox label="Level" value={stats.level.toString()} color="text-white" />
            <MiniBox label="Gold" value={stats.gold.toString()} color="text-yellow-400" />
            <MiniBox label="Streak" value={`${stats.streak} Hari`} color="text-orange-400" icon={<Flame size={14} />} />
          </div>

          <div className="space-y-4">
            <SimpleBar label="HP" value={stats.hp} max={stats.maxHp || 1} color="bg-pink-400" />
            <SimpleBar label="Energy" value={stats.energy} max={stats.maxEnergy || 1} color="bg-cyan-400" />
            <SimpleBar label="EXP" value={stats.exp} max={stats.maxExp || 1} color="bg-yellow-400" />
          </div>

          <div className="mt-5 border-t-2 border-slate-700 pt-4">
            <p className="text-[10px] uppercase text-slate-500 mb-1">Insight</p>
            <p className="text-sm text-slate-200">
              {stats.energy <= 20
                ? "Energi kamu rendah. Lebih baik fokus ke misi ringan dulu."
                : stats.exp >= stats.maxExp * 0.8
                ? "Kamu hampir naik level. Sedikit lagi!"
                : "Progress karakter stabil. Lanjut pertahankan ritme."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  icon,
  color,
  lines,
  progress,
  progressLabel,
  progressColor,
}: {
  title: string;
  icon: React.ReactNode;
  color: "cyan" | "emerald" | "yellow" | "pink";
  lines: [string, string][];
  progress?: number;
  progressLabel?: string;
  progressColor?: string;
}) {
  const styles = {
    cyan: "border-cyan-500 text-cyan-400",
    emerald: "border-emerald-500 text-emerald-400",
    yellow: "border-yellow-500 text-yellow-400",
    pink: "border-pink-500 text-pink-400",
  };

  return (
    <div className={`bg-[#24283b] border-4 ${styles[color]} shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4`}>
      <div className={`flex items-center gap-2 ${styles[color].split(" ")[1]}`}>
        {icon}
        <h2 className="text-sm font-bold uppercase">{title}</h2>
      </div>

      <div className="space-y-3">
        {lines.map(([label, value]) => (
          <div key={label}>
            <p className="text-slate-500 text-xs uppercase">{label}</p>
            <p className="text-white font-bold text-xl break-words">{value}</p>
          </div>
        ))}
      </div>

      {typeof progress === "number" && (
        <div>
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>{progressLabel || "Progress"}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-slate-900 border border-slate-700 overflow-hidden">
            <div
              className={`h-full transition-all ${progressColor || "bg-white"}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MiniBox({
  label,
  value,
  color = "text-white",
  icon,
}: {
  label: string;
  value: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1b26] border-2 border-slate-700 p-3">
      <p className="text-[10px] uppercase text-slate-500 mb-2">{label}</p>
      <div className={`font-bold text-lg flex items-center gap-2 ${color}`}>
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

function SimpleBar({
  label,
  value,
  max,
  color,
  isCurrency = false,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  isCurrency?: boolean;
}) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div>
      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
        <span>{label}</span>
        <span>{isCurrency ? `Rp ${value.toLocaleString()}` : value}</span>
      </div>
      <div className="h-3 bg-slate-900 border border-slate-700 overflow-hidden">
        <div
          className={`h-full transition-all ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}