"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import {
  Plus,
  Minus,
  History,
  CreditCard,
  PiggyBank,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Wallet,
  Banknote,
  Building2,
  Smartphone,
  CalendarClock,
  Trash2,
  Search,
  Clock,
} from "lucide-react";
import { translations } from "@/utils/translations";

// ==========================================
// 0. HELPER COMPONENTS
// ==========================================
const CircularProgress = ({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg className="transform -rotate-90 w-full h-full drop-shadow-lg">
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
          className="text-slate-950/50"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <span className={`absolute text-[10px] font-bold ${color}`}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

// ==========================================
// 1. MAIN PAGE COMPONENT
// ==========================================
export default function Finance({
  initialOpenType,
  searchQuery = "",
  activeCategory = "all",
}: {
  initialOpenType?: "rekening" | "tabungan" | null;
  searchQuery?: string;
  activeCategory?: string;
}) {
  const {
    accounts,
    deleteAccount,
    transactions,
    recurringTransactions,
    processRecurringTransactions,
    confirmRecurringPayment,
    snoozeRecurringTransaction,
    settings
  } = useStore();
  
  const tFin = translations[settings?.language || 'id']?.finance || translations['id'].finance;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addType, setAddType] = useState<"rekening" | "tabungan">("rekening");
  const [isTransModalOpen, setIsTransModalOpen] = useState(false);
  const [transData, setTransData] = useState({
    id: "",
    name: "",
    balance: 0,
    isAdding: true,
  });
  const [isRecurringOpen, setIsRecurringOpen] = useState(false);

  useEffect(() => {
    processRecurringTransactions();
  }, [processRecurringTransactions]);

  useEffect(() => {
    if (initialOpenType) {
      setAddType(initialOpenType);
      setIsAddOpen(true);
    }
  }, [initialOpenType]);

  const openAddModal = (type: "rekening" | "tabungan") => {
    setAddType(type);
    setIsAddOpen(true);
  };

  const openTransModal = (
    id: string,
    name: string,
    balance: number,
    isAdding: boolean
  ) => {
    setTransData({ id, name, balance, isAdding });
    setIsTransModalOpen(true);
  };

  // Fungsi Pembantu untuk Format Tanggal Dinamis
  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    if (settings.dateFormat === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
    if (settings.dateFormat === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    return `${day}/${month}/${year}`; // DD/MM/YYYY
  };

  const q = searchQuery.toLowerCase();
  const rekeningList = accounts?.filter((acc) => acc.type === "rekening" && (activeCategory === 'all' || activeCategory === 'rekening')) || [];
  const tabunganList = accounts?.filter((acc) => acc.type === "tabungan" && (activeCategory === 'all' || activeCategory === 'tabungan')) || [];

  const totalRekening = rekeningList.reduce(
    (acc: number, curr: any) => acc + curr.balance,
    0
  );
  const totalTabungan = tabunganList.reduce(
    (acc: number, curr: any) => acc + (curr.balance || 0),
    0
  );
  const netWorth = totalRekening + totalTabungan;

  const filteredRekening = rekeningList.filter(acc => acc.name.toLowerCase().includes(q));
  const filteredTabungan = tabunganList.filter(acc => acc.name.toLowerCase().includes(q));
  
  const dueTodayBills = recurringTransactions.filter((tx: any) => tx.status === "due" && tx.name.toLowerCase().includes(q));
  const overdueBills = recurringTransactions.filter((tx: any) => tx.status === "overdue" && tx.name.toLowerCase().includes(q));
  const upcomingBills = recurringTransactions
    .filter((tx: any) => tx.status === "upcoming" && tx.name.toLowerCase().includes(q))
    .sort((a: any, b: any) => a.nextDueDate - b.nextDueDate);
  const filteredTransactions = transactions.filter((log: any) => log.accountName.toLowerCase().includes(q));

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6 text-left p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 border-b border-slate-700/50 pb-6 gap-4">
        <div className="flex flex-col gap-3 text-left">
          <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000]">
            <span className="text-cyan-500"><Wallet size={18} /></span>
            {tFin.center}
          </h1>
          <div>
            <p className="font-pixel text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest mb-2">
              {tFin.netWorth}
            </p>
            <p className="text-4xl font-bold text-white font-mono italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
              Rp {netWorth.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 font-mono italic w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-[#24283b] border-2 border-slate-600 border-b-4 border-b-emerald-500 px-6 py-3 rounded-none shadow-[4px_4px_0_#000]">
            <p className="text-[10px] font-pixel not-italic text-slate-500 mb-2 uppercase">
              {tFin.cash}
            </p>
            <p className="text-xl font-bold text-emerald-400">
              Rp {totalRekening.toLocaleString()}
            </p>
          </div>

          <div className="flex-1 md:flex-none bg-[#24283b] border-2 border-slate-600 border-b-4 border-b-cyan-500 px-6 py-3 rounded-none shadow-[4px_4px_0_#000]">
            <p className="text-[10px] font-pixel not-italic text-slate-500 mb-2 uppercase">
              {tFin.asset}
            </p>
            <p className="text-xl font-bold text-cyan-400">
              Rp {totalTabungan.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 items-start">
        {/* KOLOM 1 */}
        {(activeCategory === 'all' || activeCategory === 'rekening') && (
        <div className="bg-[#1a1b26] border-4 border-emerald-600 rounded-none flex flex-col min-h-[450px] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          <div className="p-5 border-b-4 border-emerald-600 flex items-center gap-3 text-emerald-400 bg-[#24283b]">
            <CreditCard size={20} />
            <h2 className="text-base font-bold uppercase tracking-wider">
              {tFin.walletTitle}
            </h2>
          </div>

          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            <button
              onClick={() => openAddModal("rekening")}
              className="w-full bg-[#24283b] border-2 border-dashed border-slate-600 hover:border-emerald-500 text-slate-400 hover:text-emerald-400 p-5 rounded-none flex items-center justify-center gap-2 text-sm font-bold transition-all uppercase hover:bg-emerald-500/10"
            >
              <Plus size={18} /> {tFin.addWallet}
            </button>

          {filteredRekening.length === 0 && q && (
            <p className="text-sm text-slate-500 italic text-center py-4">{tFin.noWallet}</p>
          )}
          {filteredRekening.map((acc) => (
              <div
                key={acc.id}
                className="group bg-[#24283b] border-2 border-slate-700 p-4 rounded-none flex justify-between items-center transition-all hover:border-emerald-500 shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000]"
              >
                <div className="flex-1 text-left">
                  <span className="text-base font-bold text-slate-200 block mb-1">
                    {acc.name}
                  </span>
                  <p className="text-lg font-bold text-emerald-400 font-mono">
                    Rp {acc.balance.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => deleteAccount(acc.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-pink-500 transition-all"
                  >
                    <X size={18} />
                  </button>

                  <button
                    onClick={() => openTransModal(acc.id, acc.name, acc.balance, true)}
                    className="w-10 h-10 bg-[#1a1b26] border border-slate-600 text-emerald-500 rounded-none hover:bg-emerald-500 hover:text-slate-900 transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>

                  <button
                    onClick={() => openTransModal(acc.id, acc.name, acc.balance, false)}
                    className="w-10 h-10 bg-[#1a1b26] border border-slate-600 text-pink-500 rounded-none hover:bg-pink-500 hover:text-slate-900 transition-colors flex items-center justify-center"
                  >
                    <Minus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* KOLOM 2 */}
        {(activeCategory === 'all' || activeCategory === 'tabungan') && (
        <div className="bg-[#1a1b26] border-4 border-cyan-600 rounded-none flex flex-col min-h-[450px] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          <div className="p-5 border-b-4 border-cyan-600 flex items-center gap-3 text-cyan-400 bg-[#24283b]">
            <PiggyBank size={20} />
            <h2 className="text-base font-bold uppercase tracking-wider">
              {tFin.savingsTitle}
            </h2>
          </div>

          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            <button
              onClick={() => openAddModal("tabungan")}
              className="w-full bg-[#24283b] border-2 border-dashed border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 p-5 rounded-none flex items-center justify-center gap-2 text-sm font-bold transition-all uppercase hover:bg-cyan-500/10"
            >
              <Plus size={18} /> {tFin.addSaving}
            </button>

          {filteredTabungan.length === 0 && q && (
            <p className="text-sm text-slate-500 italic text-center py-4">{tFin.noSaving}</p>
          )}
          {filteredTabungan.map((acc) => {
              const isGold =
                acc.name.toLowerCase().includes("emas") ||
                acc.name.toLowerCase().includes("gold");
              const progress = Math.min(
                ((acc.balance || 0) / (acc.target || 1)) * 100,
                100
              );

              return (
                <div
                  key={acc.id}
                  className={`group bg-[#24283b] border-2 ${
                    isGold
                      ? "border-yellow-600 hover:border-yellow-400"
                      : "border-slate-700 hover:border-cyan-500"
                  } p-5 rounded-none flex flex-col gap-3 transition-all shadow-[4px_4px_0_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000]`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isGold ? (
                          <Coins size={18} className="text-yellow-500" />
                        ) : (
                          <PiggyBank size={18} className="text-cyan-400" />
                        )}
                        <span
                          className={`text-base font-bold ${
                            isGold ? "text-yellow-500" : "text-slate-200"
                          }`}
                        >
                          {acc.name}
                        </span>
                      </div>

                      {isGold && (
                        <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-none border border-yellow-500 mb-2 inline-block">
                          {(acc.weight || 0).toFixed(2)} GR
                        </span>
                      )}

                      <div className="text-sm font-mono text-slate-400">
                        Rp {(acc.balance || 0).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {tFin.target} Rp {(acc.target || 0).toLocaleString()}
                      </div>
                    </div>

                    <CircularProgress
                      value={acc.balance || 0}
                      max={acc.target || 1}
                      color={isGold ? "text-yellow-500" : "text-cyan-400"}
                    />
                  </div>

                  <div className="flex justify-end items-center mt-1 pt-3 border-t-2 border-slate-700">
                    <div className="flex gap-1">
                      <button
                        onClick={() => deleteAccount(acc.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-pink-500 transition-all"
                      >
                        <X size={16} />
                      </button>

                      <button
                        onClick={() => openTransModal(acc.id, acc.name, acc.balance, false)}
                        className="w-8 h-8 bg-[#1a1b26] border border-slate-600 text-pink-500 rounded-none flex items-center justify-center transition-all hover:bg-pink-500 hover:text-slate-900"
                      >
                        <Minus size={16} />
                      </button>

                      <button
                        onClick={() => openTransModal(acc.id, acc.name, acc.balance, true)}
                        className={`px-4 py-1 rounded-none text-xs font-bold transition-all border ${
                          isGold
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-slate-900"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500 hover:bg-cyan-500 hover:text-slate-900"
                        }`}
                      >
                        {tFin.fill}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* KOLOM 3 */}
        <div className="bg-[#1a1b26] border-4 border-pink-600 rounded-none flex flex-col h-[450px] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          <div className="p-5 border-b-4 border-pink-600 flex justify-between items-center text-pink-400 bg-[#24283b]">
            <div className="flex items-center gap-3">
              <History size={20} />
              <h2 className="text-base font-bold uppercase tracking-wider">{tFin.history}</h2>
            </div>

            <button
              onClick={() => setIsRecurringOpen(true)}
              className="text-[10px] bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-slate-900 border border-pink-500 px-2 py-1 rounded-none flex items-center gap-1 transition-colors"
              title="Kelola Tagihan Rutin"
            >
              <CalendarClock size={14} /> {tFin.billsBtn}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#1a1b26]">
            {dueTodayBills.length > 0 && (
              <div className="bg-[#24283b] border-b-2 border-slate-700">
                <div className="px-4 py-2 text-[10px] font-bold text-pink-400 uppercase tracking-wider bg-[#1a1b26]">
                  {tFin.reqConfirm}
                </div>

                {dueTodayBills.map((tx: any) => (
                  <div
                    key={tx.id}
                    className="p-4 border-b border-slate-700 flex flex-col gap-3 bg-pink-500/5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left">
                        <span className="text-sm text-slate-200 font-bold flex items-center gap-2">
                          <Clock size={12} className="text-pink-400" />
                          {tx.name}
                        </span>
                        <span className="text-xs text-pink-300/80 font-mono">
                          {tFin.due} {formatDate(tx.nextDueDate)}
                        </span>
                      </div>

                      <div className="font-mono font-bold text-sm text-pink-400">
                        Rp {tx.amount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => snoozeRecurringTransaction(tx.id)}
                        className="px-3 py-1 text-[10px] font-bold uppercase border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-slate-950 transition-all"
                      >
                        {tFin.delay}
                      </button>
                      <button
                        onClick={() => confirmRecurringPayment(tx.id)}
                        className="px-3 py-1 text-[10px] font-bold uppercase border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                      >
                        {tFin.payNow}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {overdueBills.length > 0 && (
              <div className="bg-[#24283b] border-b-2 border-slate-700">
                <div className="px-4 py-2 text-[10px] font-bold text-yellow-400 uppercase tracking-wider bg-[#1a1b26]">
                  {tFin.delayedBills}
                </div>

                {overdueBills.map((tx: any) => (
                  <div
                    key={tx.id}
                    className="p-4 border-b border-slate-700 flex flex-col gap-3 bg-yellow-500/5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left">
                        <span className="text-sm text-slate-200 font-bold flex items-center gap-2">
                          <Clock size={12} className="text-yellow-400" />
                          {tx.name}
                        </span>
                        <span className="text-xs text-yellow-300/80 font-mono">
                          {tFin.overdue} {formatDate(tx.nextDueDate)}
                        </span>
                      </div>

                      <div className="font-mono font-bold text-sm text-yellow-400">
                        Rp {tx.amount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => confirmRecurringPayment(tx.id)}
                        className="px-3 py-1 text-[10px] font-bold uppercase border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                      >
                        {tFin.pay}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {upcomingBills.length > 0 && (
              <div className="bg-[#24283b] border-b-2 border-slate-700">
                <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#1a1b26]">
                  {tFin.upcomingBills}
                </div>

                {upcomingBills.map((tx: any) => (
                  <div
                    key={tx.id}
                    className="p-4 border-b border-slate-700 flex justify-between items-center hover:bg-slate-800 transition-colors group"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-sm text-slate-300 font-bold flex items-center gap-2">
                        <Clock size={12} className="text-amber-500" />
                        {tx.name}
                      </span>
                      <span className="text-xs text-amber-500/80 font-mono">
                        {tFin.due} {formatDate(tx.nextDueDate)}
                      </span>
                    </div>

                    <div className="font-mono font-bold text-sm text-slate-400 group-hover:text-white transition-colors">
                      Rp {tx.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#1a1b26] sticky top-0 border-b border-slate-700">
              {tFin.historyDone}
            </div>

          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((log: any) => (
                <div
                  key={log.id}
                  className="p-4 border-b border-slate-700 flex justify-between items-center hover:bg-slate-800 transition-colors"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-slate-200 font-bold">
                      {log.accountName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {formatDate(log.timestamp)} •{" "}
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className={`font-mono font-bold text-base ${
                        log.type === "income" ? "text-emerald-400" : "text-pink-500"
                      }`}
                    >
                      {log.type === "income" ? "+" : "-"} Rp {log.amount.toLocaleString()}
                      {log.type === "income" ? (
                        <ArrowUpRight size={14} className="inline ml-1" />
                      ) : (
                        <ArrowDownRight size={14} className="inline ml-1" />
                      )}
                    </div>

                    {typeof log.expGained === "number" && log.expGained > 0 && (
                      <div className="text-[10px] text-yellow-400 font-bold uppercase mt-1">
                        +{log.expGained} EXP
                      </div>
                    )}

                    {typeof log.gram === "number" && log.gram > 0 && (
                      <div className="text-[10px] text-yellow-500 font-mono italic">
                        {log.type === "income" ? "+" : "-"} {log.gram.toFixed(4)} GR
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-sm text-slate-500 italic">
              {q ? tFin.noTrans : tFin.noHistory}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddAccountModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        type={addType}
      />

      <TransactionModal
        isOpen={isTransModalOpen}
        onClose={() => setIsTransModalOpen(false)}
        accountId={transData.id}
        accountName={transData.name}
        currentBalance={transData.balance}
        isAdding={transData.isAdding}
      />

      <RecurringModal
        isOpen={isRecurringOpen}
        onClose={() => setIsRecurringOpen(false)}
      />
    </div>
  );
}

// ==========================================
// 2. RECURRING BILLS MODAL
// ==========================================
function RecurringModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { recurringTransactions, addRecurringTransaction, deleteRecurringTransaction, accounts, settings } = useStore();
  const tFin = translations[settings?.language || 'id']?.finance || translations['id'].finance;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [accountId, setAccountId] = useState("");
  const [date, setDate] = useState("");
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");
  const RATE = 17000;

  const handleAdd = () => {
    if (!name || amount <= 0 || !accountId || !date) return;

    const finalAmount = currency === "USD" ? amount * RATE : amount;

    addRecurringTransaction({
      id: Date.now().toString(),
      name,
      amount: finalAmount,
      type: "expense",
      accountId,
      nextDueDate: new Date(date).getTime(),
    });

    setName("");
    setAmount(0);
    setDate("");
    setCurrency("IDR");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/\./g, ""));
    if (!isNaN(val)) setAmount(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4">
      <div className="bg-[#1a1b26] border-4 border-pink-600 rounded-none w-full max-w-md overflow-hidden shadow-[8px_8px_0_#000] animate-in zoom-in duration-200">
        <div className="p-5 border-b-4 border-slate-700 flex justify-between items-center bg-[#24283b]">
          <h2 className="font-bold text-base uppercase tracking-wider text-pink-400 flex items-center gap-2">
            <CalendarClock size={20} /> {tFin.autoPay}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-2">
            {recurringTransactions.length === 0 && (
              <p className="text-xs text-slate-500 text-center italic py-4">
                {tFin.noBills}
              </p>
            )}

            {recurringTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-[#24283b] border-2 border-slate-700 p-3 rounded-none flex justify-between items-center shadow-[2px_2px_0_#000]"
              >
                <div>
                  <p className="text-sm font-bold text-white">{tx.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {tFin.next} {new Date(tx.nextDueDate).toLocaleDateString()} •{" "}
                    {accounts.find((a) => a.id === tx.accountId)?.name}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-pink-400 font-bold">
                    Rp {tx.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteRecurringTransaction(tx.id)}
                    className="text-slate-600 hover:text-pink-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-slate-700 pt-4 flex flex-col gap-3">
            <p className="text-xs font-bold text-slate-400 uppercase">
              {tFin.newBill}
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tFin.billName}
              className="bg-[#24283b] border-2 border-slate-600 rounded-none p-3 text-sm text-white outline-none focus:border-pink-500"
            />

            <div className="relative">
              <div className="absolute right-2 top-2 flex gap-1">
                <button
                  onClick={() => setCurrency("IDR")}
                  className={`px-2 py-1 text-[10px] font-bold rounded-none ${
                    currency === "IDR"
                      ? "bg-slate-700 text-white"
                      : "bg-slate-900 text-slate-500"
                  }`}
                >
                  IDR
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-1 text-[10px] font-bold rounded-none ${
                    currency === "USD"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-slate-500"
                  }`}
                >
                  USD
                </button>
              </div>

              <input
                type="text"
                value={amount === 0 ? "" : amount.toLocaleString("id-ID")}
                onChange={handleAmountChange}
                placeholder={`${tFin.amount} (${currency})`}
                className="bg-[#24283b] border-2 border-slate-600 rounded-none p-3 text-sm text-white outline-none focus:border-pink-500 w-full"
              />
              {currency === "USD" && amount > 0 && (
                <p className="text-[10px] text-emerald-500 mt-1 text-right">
                  ≈ Rp {(amount * RATE).toLocaleString()}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#24283b] border-2 border-slate-600 rounded-none p-3 text-sm text-white outline-none focus:border-pink-500 [color-scheme:dark] cursor-pointer"
              />
            </div>

            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="bg-[#24283b] border-2 border-slate-600 rounded-none p-3 text-sm text-slate-300 outline-none focus:border-pink-500"
            >
              <option value="" disabled hidden>
                {tFin.source}
              </option>
              {accounts
                .filter((a) => a.type === "rekening")
                .map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} (Rp {acc.balance.toLocaleString()})
                  </option>
                ))}
            </select>

            <button
              onClick={handleAdd}
              disabled={!name || amount <= 0 || !accountId || !date}
              className="bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 disabled:text-slate-500 text-white py-3 rounded-none font-bold text-sm transition-colors mt-2 shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]"
            >
              {tFin.saveSchedule}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ADD ACCOUNT MODAL
// ==========================================
function AddAccountModal({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: "rekening" | "tabungan";
}) {
  const { addAccount, _applySimpleReward, settings } = useStore();
  const tFin = translations[settings?.language || 'id']?.finance || translations['id'].finance;

  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [target, setTarget] = useState(0);
  const [isGold, setIsGold] = useState(false);
  const [goldWeight, setGoldWeight] = useState<number | string>("");
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");
  const RATE = 17000;

  useEffect(() => {
    if (isOpen) {
      setName("");
      setBalance(0);
      setGoldWeight("");
      setTarget(0);
      setIsGold(false);
      setCurrency("IDR");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name) return;

    let finalName = name;
    let finalBalance = currency === "USD" ? balance * RATE : balance;
    let finalTarget = currency === "USD" ? target * RATE : target;

    if (type === "tabungan" && isGold) {
      if (
        !finalName.toLowerCase().includes("emas") &&
        !finalName.toLowerCase().includes("gold")
      ) {
        finalName = `${finalName} (Emas)`;
      }
      const gw = Number(goldWeight) || 0;
      finalBalance = gw * 2800000;
    }

    addAccount({
      id: Date.now().toString(),
      name: finalName,
      balance: finalBalance,
      type,
      target: type === "tabungan" ? finalTarget : undefined,
      weight: type === "tabungan" && isGold ? (Number(goldWeight) || 0) : 0,
    });

    if (type === "rekening") {
      _applySimpleReward(10, 3);
    } else {
      _applySimpleReward(isGold ? 20 : 15, isGold ? 5 : 4);
    }

    onClose();
  };

  const handleBalanceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: number) => void
  ) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (!isNaN(Number(rawValue))) setter(Number(rawValue));
  };

  const providers = [
    { label: "BCA", icon: Building2, color: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10" },
    { label: "Mandiri", icon: Building2, color: "text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10" },
    { label: "BRI", icon: Building2, color: "text-blue-300 border-blue-400/30 hover:bg-blue-400/10" },
    { label: "GoPay", icon: Smartphone, color: "text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10" },
    { label: "Dana", icon: Smartphone, color: "text-blue-500 border-blue-600/30 hover:bg-blue-600/10" },
    { label: "OVO", icon: Smartphone, color: "text-purple-400 border-purple-500/30 hover:bg-purple-500/10" },
    { label: "ShopeePay", icon: Smartphone, color: "text-orange-400 border-orange-500/30 hover:bg-orange-500/10" },
    { label: "Tunai", icon: Banknote, color: "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4">
      <div
        className={`bg-[#1a1b26] border-4 rounded-none w-full max-w-md overflow-hidden shadow-[8px_8px_0_#000] animate-in zoom-in duration-200 ${
          type === "rekening" ? "border-emerald-500" : "border-cyan-500"
        }`}
      >
        <div className="p-5 border-b-4 border-slate-700 flex justify-between items-center bg-[#24283b]">
          <h2
            className={`font-bold text-base uppercase tracking-wider flex items-center gap-2 ${
              type === "rekening" ? "text-emerald-400" : "text-cyan-400"
            }`}
          >
            {type === "rekening" ? <CreditCard size={20} /> : <PiggyBank size={20} />}
            {type === "rekening" ? tFin.addAccWallet : tFin.addAccTarget}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {type === "rekening" && (
            <div>
              <label className="text-sm font-bold text-slate-400 mb-3 block uppercase">
                {tFin.quickSelect}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {providers.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setName(p.label)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-none border-2 transition-all ${p.color} ${
                      name === p.label ? "bg-slate-800 ring-2 ring-white/20" : "bg-[#24283b]"
                    }`}
                  >
                    <p.icon size={24} />
                    <span className="text-xs font-bold">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === "tabungan" && (
            <div className="bg-[#24283b] p-1 rounded-none border-2 border-slate-700 flex">
              <button
                onClick={() => setIsGold(false)}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-none transition-all ${
                  !isGold
                    ? "bg-cyan-500 text-slate-950 shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tFin.tabMoney}
              </button>
              <button
                onClick={() => setIsGold(true)}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-none transition-all ${
                  isGold
                    ? "bg-yellow-500 text-slate-950 shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tFin.tabGold}
              </button>
            </div>
          )}

          <div>
            <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">
              {tFin.accName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                type === "rekening"
                  ? tFin.phWallet
                  : isGold
                  ? tFin.phGold
                  : tFin.phTarget
              }
              className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none p-4 text-base text-white outline-none focus:border-white transition-all"
              autoFocus
            />
          </div>

          {!isGold && (
            <div className="flex justify-end">
              <div className="bg-[#24283b] p-0.5 rounded-none flex text-[10px] font-bold border-2 border-slate-600">
                <button
                  onClick={() => setCurrency("IDR")}
                  className={`px-3 py-1 rounded-none transition-all ${
                    currency === "IDR"
                      ? "bg-slate-700 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  IDR
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-none transition-all ${
                    currency === "USD"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  USD
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {isGold ? (
              <div>
                <label className="text-sm font-bold text-yellow-500 mb-2 block uppercase">
                  {tFin.startWeight}
                </label>
                <input
                  type="number"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none p-4 text-base text-white outline-none focus:border-yellow-500 transition-all"
                  placeholder="0.00"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  ≈ Rp {((Number(goldWeight) || 0) * 2800000).toLocaleString()}
                </p>
              </div>
            ) : (
              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">
                  {tFin.startBal} ({currency})
                </label>
                <input
                  type="text"
                  value={balance === 0 ? "" : balance.toLocaleString("id-ID")}
                  onChange={(e) => handleBalanceChange(e, setBalance)}
                  className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none p-4 text-base text-white outline-none focus:border-white transition-all"
                  placeholder="0"
                />
                {currency === "USD" && (
                  <p className="text-[10px] text-emerald-500 mt-1">
                    ≈ Rp {(balance * RATE).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {type === "tabungan" && (
              <div>
                <label className="text-sm font-bold text-slate-400 mb-2 block uppercase">
                  {tFin.targetBal} ({currency})
                </label>
                <input
                  type="text"
                  value={target === 0 ? "" : target.toLocaleString("id-ID")}
                  onChange={(e) => handleBalanceChange(e, setTarget)}
                  className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none p-4 text-base text-white outline-none focus:border-white transition-all"
                  placeholder="0"
                />
                {currency === "USD" && (
                  <p className="text-[10px] text-emerald-500 mt-1">
                    ≈ Rp {(target * RATE).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!name}
            className={`w-full py-4 rounded-none font-bold text-base text-slate-950 transition-all mt-2 shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] ${
              type === "rekening"
                ? "bg-emerald-500 hover:bg-emerald-400"
                : "bg-cyan-500 hover:bg-cyan-400"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {tFin.saveAcc}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. TRANSACTION MODAL
// ==========================================
function TransactionModal({
  isOpen,
  onClose,
  accountId,
  accountName,
  currentBalance,
  isAdding,
}: any) {
  const { updateBalance, showAlert, accounts, settings } = useStore();
  const tFin = translations[settings?.language || 'id']?.finance || translations['id'].finance;

  const [money, setMoney] = useState<number>(0);
  const [gramInput, setGramInput] = useState<string>("");
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");
  const RATE = 17000;
  const GOLD_PRICE_PER_GRAM = 2800000;
  const isGold =
    accountName.toLowerCase().includes("emas") ||
    accountName.toLowerCase().includes("gold");

  useEffect(() => {
    if (isOpen) {
      setMoney(0);
      setGramInput("");
      setCurrency("IDR");
    }
  }, [isOpen]);

  const handleMoneyChange = (rawVal: string) => {
    const val = Number(rawVal.replace(/\./g, ""));
    if (isNaN(val)) return;

    setMoney(val);

    if (isGold) {
      const idrValue = currency === "USD" ? val * RATE : val;
      const calcGram = (idrValue / GOLD_PRICE_PER_GRAM).toFixed(4);
      setGramInput(parseFloat(calcGram).toString());
    }
  };

  const handleGramChangeLocal = (val: string) => {
    let cleaned = val.replace(/,/g, ".").replace(/[^\d.]/g, "");

    const firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }

    setGramInput(cleaned);

    if (cleaned === "" || cleaned === ".") {
      setMoney(0);
      return;
    }

    const num = Number(cleaned);

    if (!Number.isNaN(num)) {
      const idrValue = Math.round(num * GOLD_PRICE_PER_GRAM);
      setMoney(
        currency === "USD" ? Number((idrValue / RATE).toFixed(2)) : idrValue
      );
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (money <= 0) return;

    const acc = accounts.find((a) => a.id === accountId);
    if (!acc) return;

    const inputGram = parseFloat((gramInput || "0").replace(",", ".")) || 0;
    const finalAmount = currency === "USD" ? money * RATE : money;

    if (!isAdding) {
      if (acc.balance < finalAmount) {
        showAlert("VAULT_ERROR", "DANA TIDAK MENCUKUPI.", "danger");
        return;
      }
    }

    const expGain = isAdding
      ? isGold
        ? Math.max(1, Math.floor(inputGram * 5))
        : Math.max(1, Math.floor(finalAmount / 50000))
      : 0;

    const goldGain = isAdding
      ? isGold
        ? Math.max(1, Math.floor(inputGram * 2))
        : Math.min(20, Math.max(1, Math.floor(finalAmount / 100000)))
      : 0;

    updateBalance(
      accountId,
      isAdding ? finalAmount : -finalAmount,
      isGold ? (isAdding ? inputGram : -inputGram) : 0,
      {
        exp: expGain,
        gold: goldGain,
        gram: isGold ? inputGram : undefined,
      }
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4">
      <div
        className={`bg-[#1a1b26] border-4 rounded-none w-full max-w-sm overflow-hidden shadow-[8px_8px_0_#000] animate-in zoom-in duration-200 ${
          isAdding ? "border-emerald-500" : "border-pink-500"
        }`}
      >
        <div className="p-5 border-b-4 border-slate-700 flex justify-between items-center bg-[#24283b]">
          <h2
            className={`font-bold text-base uppercase tracking-wider ${
              isAdding ? "text-emerald-400" : "text-pink-400"
            }`}
          >
            {isAdding ? tFin.incomeOp : tFin.expenseOp}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-left">
          <div className="text-center bg-[#24283b] p-3 rounded-none border-2 border-slate-600">
            <p className="text-sm text-slate-400 uppercase font-bold">
              {tFin.account} <span className="text-white">{accountName}</span>
            </p>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-400 uppercase">
                {tFin.amount} ({currency})
              </label>

              <div className="bg-[#24283b] p-0.5 rounded-none flex text-[10px] font-bold border-2 border-slate-600">
                <button
                  onClick={() => setCurrency("IDR")}
                  className={`px-2 py-0.5 rounded-none transition-all ${
                    currency === "IDR"
                      ? "bg-slate-700 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  IDR
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-0.5 rounded-none transition-all ${
                    currency === "USD"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  USD
                </button>
              </div>
            </div>

            <input
              type="text"
              autoFocus
              value={money === 0 ? "" : money.toLocaleString("id-ID")}
              onChange={(e) => handleMoneyChange(e.target.value)}
              className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none h-14 px-4 font-mono text-white text-xl outline-none focus:border-emerald-500 transition-all"
              placeholder="0"
            />

            {currency === "USD" && (
              <p className="text-[10px] text-emerald-500 mt-1 text-right">
                ≈ Rp {(money * RATE).toLocaleString()}
              </p>
            )}
          </div>

          {isGold && (
            <div className="relative">
              <label className="text-sm font-bold text-yellow-500 mb-2 block uppercase">
                {tFin.goldWeight}
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={gramInput}
                onChange={(e) => handleGramChangeLocal(e.target.value)}
                className="w-full bg-[#24283b] border-2 border-slate-600 rounded-none h-14 px-4 font-mono text-white text-xl outline-none focus:border-yellow-500 transition-all"
                placeholder="0.0000"
              />
              <p className="text-xs text-slate-500 mt-1 italic text-right">
                {tFin.rate}
              </p>
            </div>
          )}

          {!isAdding && (
            <button
              onClick={() => setMoney(currentBalance)}
              className="text-sm font-bold text-pink-500 border-2 border-pink-500 py-3 rounded-none hover:bg-pink-500 hover:text-white transition-all uppercase"
            >
              {tFin.useAll}
            </button>
          )}
        </div>

        <div className="p-5 bg-[#24283b] border-t-4 border-slate-700 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase"
          >
            {tFin.cancel}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-3 text-slate-950 text-sm rounded-none transition-all uppercase font-bold shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] ${
              isAdding ? "bg-emerald-500 hover:bg-emerald-400" : "bg-pink-500 hover:bg-pink-400"
            }`}
          >
            {tFin.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}