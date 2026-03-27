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
import { translations } from "@/utils/translations";

export default function StatisticsBoard() {
  const { tasks, transactions, accounts, stats, settings } = useStore();
  const t = translations[settings?.language || 'id']?.stats || translations['id'].stats;

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
      <div className="bg-zinc-800 border-4 border-zinc-700 shadow-[6px_6px_0_#000] p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-3">
              {t.dc}
            </p>
            <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000] mb-3">
              <span className="text-cyan-500"><BarChart3 size={18} /></span>
              {t.title}
            </h1>
            <p className="font-pixel text-[7px] md:text-[8px] text-zinc-400 uppercase tracking-widest leading-relaxed max-w-2xl">
              {t.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border-2 border-cyan-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-zinc-500 mb-1">{t.compRate}</p>
              <p className="text-cyan-400 text-3xl font-bold">{completionRate}%</p>
            </div>

            <div className="bg-zinc-900 border-2 border-emerald-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-zinc-500 mb-1">{t.netWorth}</p>
              <p className="text-emerald-400 text-3xl font-bold">
                Rp {netWorth.toLocaleString()}
              </p>
            </div>

            <div className="bg-zinc-900 border-2 border-yellow-500 p-4 shadow-[3px_3px_0_#000]">
              <p className="text-[10px] uppercase text-zinc-500 mb-1">{t.titleLabel}</p>
              <p className="text-yellow-400 text-xl font-bold">{playerTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <StatCard
          title={t.taskStats}
          icon={<CheckCircle2 size={16} />}
          color="cyan"
          lines={[
            [t.total, totalTasks.toString()],
            [t.done, completedTasks.toString()],
            [t.pending, pendingTasks.toString()],
            [t.types, `${habitTasks} / ${dailyTasks} / ${todoTasks}`],
          ]}
          progress={completionRate}
          progressLabel="Completion"
          progressColor="bg-cyan-400"
        />

        <StatCard
          title={t.finStats}
          icon={<Wallet size={16} />}
          color="emerald"
          lines={[
            [t.income, `Rp ${totalIncome.toLocaleString()}`],
            [t.expense, `Rp ${totalExpense.toLocaleString()}`],
            ["Net Flow", `Rp ${netFlow.toLocaleString()}`],
            [t.trans, transactions.length.toString()],
          ]}
        />

        <StatCard
          title={t.charStats}
          icon={<Zap size={16} />}
          color="yellow"
          lines={[
            [t.level, stats.level.toString()],
            [t.gold, stats.gold.toString()],
            [t.streak, `${stats.streak}`],
            [t.expNext, expRemaining.toString()],
          ]}
          progress={expPercent}
          progressLabel="EXP"
          progressColor="bg-yellow-400"
        />

        <StatCard
          title={t.assets}
          icon={<Coins size={16} />}
          color="pink"
          lines={[
            [t.acc1, `Rp ${totalRekening.toLocaleString()}`],
            [t.acc2, `Rp ${totalTabungan.toLocaleString()}`],
            [t.largest, largestAccount ? largestAccount.name : "-"],
            [t.goldVal, `${totalGoldGram.toFixed(4)} GR`],
          ]}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* TASK BREAKDOWN */}
        <div className="bg-zinc-800 border-4 border-cyan-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-4">
            <Layers3 size={16} />
            <h2 className="text-sm font-bold uppercase">{t.breakdown}</h2>
          </div>

          <div className="space-y-4">
            {/* MENGGANTI NAMA HABIT / DAILY / TODO SESUAI PERMINTAAN */}
            <SimpleBar label={translations[settings?.language || 'id']?.tasks?.habit || "Siklus Misi"} value={habitTasks} max={Math.max(totalTasks, 1)} color="bg-cyan-400" />
            <SimpleBar label={translations[settings?.language || 'id']?.tasks?.daily || "Operasi Harian"} value={dailyTasks} max={Math.max(totalTasks, 1)} color="bg-emerald-400" />
            <SimpleBar label={translations[settings?.language || 'id']?.tasks?.todo || "Target Utama"} value={todoTasks} max={Math.max(totalTasks, 1)} color="bg-pink-400" />
          </div>

          <div className="mt-6 border-t-2 border-zinc-700 pt-4">
            <p className="text-[10px] uppercase text-zinc-500 mb-3">{t.diff}</p>
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
                <p className="text-sm text-zinc-500 italic">{t.noDiff}</p>
              )}
            </div>
          </div>
        </div>

        {/* TOP CATEGORY */}
        <div className="bg-zinc-800 border-4 border-pink-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-pink-400 mb-4">
            <Target size={16} />
            <h2 className="text-sm font-bold uppercase">{t.topCat}</h2>
          </div>

          <div className="space-y-3">
            {topCategories.length > 0 ? (
              topCategories.map(([category, count], idx) => (
                <div
                  key={category}
                  className="bg-zinc-900 border-2 border-zinc-700 p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-pink-500 text-pink-400 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-bold">{category}</p>
                      <p className="text-xs text-zinc-500">{t.catCount}</p>
                    </div>
                  </div>
                  <div className="text-pink-400 font-bold text-xl">{count}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500 italic">{t.noCat}</p>
            )}
          </div>
        </div>

        {/* FINANCE SUMMARY */}
        <div className="bg-zinc-800 border-4 border-emerald-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <BarChart3 size={16} />
            <h2 className="text-sm font-bold uppercase">{t.flow}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MiniBox
              label={t.income}
              value={`Rp ${totalIncome.toLocaleString()}`}
              color="text-emerald-400"
              icon={<TrendingUp size={14} />}
            />
            <MiniBox
              label={t.expense}
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
              label={t.income}
              value={totalIncome}
              max={Math.max(totalIncome, totalExpense, 1)}
              color="bg-emerald-400"
              isCurrency
            />
            <SimpleBar
              label={t.expense}
              value={totalExpense}
              max={Math.max(totalIncome, totalExpense, 1)}
              color="bg-pink-400"
              isCurrency
            />
          </div>
        </div>

        {/* CHARACTER PANEL */}
        <div className="bg-zinc-800 border-4 border-yellow-500 shadow-[6px_6px_0_#000] p-5">
          <div className="flex items-center gap-2 text-yellow-400 mb-4">
            <Trophy size={16} />
            <h2 className="text-sm font-bold uppercase">{t.charProg}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <MiniBox label={t.level} value={stats.level.toString()} color="text-white" />
            <MiniBox label={t.gold} value={stats.gold.toString()} color="text-yellow-400" />
            <MiniBox label={t.streak} value={`${stats.streak}`} color="text-orange-400" icon={<Flame size={14} />} />
          </div>

          <div className="space-y-4">
            <SimpleBar label="HP" value={stats.hp} max={stats.maxHp || 1} color="bg-pink-400" />
            <SimpleBar label="EXP" value={stats.exp} max={stats.maxExp || 1} color="bg-yellow-400" />
          </div>

          <div className="mt-5 border-t-2 border-zinc-700 pt-4">
            <p className="text-[10px] uppercase text-zinc-500 mb-1">{t.insight}</p>
            <p className="text-sm text-zinc-200">
              {stats.exp >= stats.maxExp * 0.8 ? t.insight1 : t.insight2}
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
    <div className={`bg-zinc-800 border-4 ${styles[color]} shadow-[6px_6px_0_#000] p-5 flex flex-col gap-4`}>
      <div className={`flex items-center gap-2 ${styles[color].split(" ")[1]}`}>
        {icon}
        <h2 className="text-sm font-bold uppercase">{title}</h2>
      </div>

      <div className="space-y-3">
        {lines.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <p className="text-zinc-500 text-xs uppercase truncate" title={label}>{label}</p>
            <p className="text-white font-bold text-xl truncate" title={value}>{value}</p>
          </div>
        ))}
      </div>

      {typeof progress === "number" && (
        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span>{progressLabel || "Progress"}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-zinc-950 border border-zinc-700 overflow-hidden">
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
    <div className="bg-zinc-900 border-2 border-zinc-700 p-3 min-w-0">
      <p className="text-[10px] uppercase text-zinc-500 mb-2 truncate" title={label}>{label}</p>
      <div className={`font-bold text-lg flex items-center gap-2 ${color} min-w-0`} title={value}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{value}</span>
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
      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
        <span>{label}</span>
        <span>{isCurrency ? `Rp ${value.toLocaleString()}` : value}</span>
      </div>
      <div className="h-3 bg-zinc-950 border border-zinc-700 overflow-hidden">
        <div
          className={`h-full transition-all ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}