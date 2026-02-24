"use client";
import React, { useState, useEffect } from 'react';
import { useStore } from "@/store/useStore";
import FinanceFormModal from "@/components/FinanceModal"; 
import { 
  Plus, Minus, History, CreditCard, PiggyBank, X,
  ArrowUpRight, ArrowDownRight, Coins 
} from "lucide-react";

// ==========================================
// 1. MAIN PAGE COMPONENT
// ==========================================
export default function Finance() {
  const { accounts, deleteAccount, transactions } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'rekening' | 'tabungan'>('rekening');
  const [isTransModalOpen, setIsTransModalOpen] = useState(false);
  const [transData, setTransData] = useState({ id: '', name: '', balance: 0, isAdding: true });

  const openModal = (type: 'rekening' | 'tabungan') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const openTransModal = (id: string, name: string, balance: number, isAdding: boolean) => {
    setTransData({ id, name, balance, isAdding });
    setIsTransModalOpen(true);
  };

  const rekeningList = accounts?.filter(acc => acc.type === 'rekening') || [];
  const tabunganList = accounts?.filter(acc => acc.type === 'tabungan') || [];
  const totalRekening = rekeningList.reduce((acc: number, curr: any) => acc + curr.balance, 0);
  const totalTabungan = tabunganList.reduce((acc: number, curr: any) => acc + (curr.balance || 0), 0);
  const netWorth = totalRekening + totalTabungan;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6 text-left p-4">
      {/* HEADER STATS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 border-b border-slate-800/50 pb-6 gap-4">
        <div className="text-left">
          <h1 className="font-pixel text-[10px] text-white tracking-wide mb-1 uppercase">Credit Vault</h1>
          <p className="text-[10px] text-slate-500 font-pixel uppercase tracking-widest mb-1">Total_Net_Worth</p>
          <p className="text-3xl font-bold text-white font-mono italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            Rp {netWorth.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-4 font-mono italic w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-slate-900/80 border-b-2 border-emerald-500 px-6 py-3 rounded-t-md">
            <p className="text-[9px] text-slate-500 font-pixel mb-1 uppercase">Main_Saldo</p>
            <p className="text-lg font-bold text-emerald-400">Rp {totalRekening.toLocaleString()}</p>
          </div>
          <div className="flex-1 md:flex-none bg-slate-900/80 border-b-2 border-cyan-500 px-6 py-3 rounded-t-md">
            <p className="text-[9px] text-slate-500 font-pixel mb-1 uppercase">Saving_Pool</p>
            <p className="text-lg font-bold text-cyan-400">Rp {totalTabungan.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 items-start">
        {/* KOLOM 1: REKENING */}
        <div className="bg-slate-900/40 border-t-2 border-emerald-500 rounded-b-lg flex flex-col min-h-[450px]">
          <div className="p-4 border-b border-slate-800/50 flex items-center gap-2 text-emerald-400">
            <CreditCard size={18} />
            <h2 className="text-[10px] font-pixel uppercase font-bold">Rekening_Aktif</h2>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto">
            <button onClick={() => openModal('rekening')} className="w-full bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-emerald-500/50 text-slate-500 p-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-pixel transition-all uppercase">
               <Plus size={14} /> Tambah Rekening
            </button>
            {rekeningList.map(acc => (
              <div key={acc.id} className="group bg-slate-800 border border-slate-700 p-3 rounded-lg flex justify-between items-center transition-all hover:border-emerald-500/50 shadow-md">
                <div className="flex-1 text-left">
                  <span className="text-xs font-bold text-slate-200">{acc.name}</span>
                  <p className="text-sm font-bold text-emerald-400 font-mono italic">Rp {acc.balance.toLocaleString()}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <button onClick={() => deleteAccount(acc.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-pink-500 transition-all"><X size={14}/></button>
                  <button onClick={() => openTransModal(acc.id, acc.name, acc.balance, true)} className="w-7 h-7 bg-slate-900 text-emerald-500 rounded border border-slate-700 hover:bg-emerald-500/10 transition-colors flex items-center justify-center"><Plus size={14}/></button>
                  <button onClick={() => openTransModal(acc.id, acc.name, acc.balance, false)} className="w-7 h-7 bg-slate-900 text-pink-500 rounded border border-slate-700 hover:bg-pink-500/10 transition-colors flex items-center justify-center"><Minus size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM 2: ASSET & EMAS */}
        <div className="bg-slate-900/40 border-t-2 border-cyan-500 rounded-b-lg flex flex-col min-h-[450px]">
          <div className="p-4 border-b border-slate-800/50 flex items-center gap-2 text-cyan-400">
            <PiggyBank size={18} />
            <h2 className="text-[10px] font-pixel uppercase font-bold">Simpanan_&_Asset</h2>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto">
            <button onClick={() => openModal('tabungan')} className="w-full bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-cyan-500/50 text-slate-500 p-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-pixel transition-all uppercase">
               <Plus size={14} /> Tambah Asset
            </button>
            {tabunganList.map(acc => {
              const isGold = acc.name.toLowerCase().includes('emas') || acc.name.toLowerCase().includes('gold');
              const progress = Math.min(((acc.balance || 0) / (acc.target || 1)) * 100, 100);
              return (
                <div key={acc.id} className={`group bg-slate-800 border ${isGold ? 'border-yellow-500/30 hover:border-yellow-500/60' : 'border-slate-700 hover:border-cyan-500/50'} p-4 rounded-lg flex flex-col gap-2 transition-all`}>
                  <div className="flex justify-between items-center text-left">
                    <div className="flex items-center gap-2">
                      {isGold ? <Coins size={14} className="text-yellow-500" /> : <PiggyBank size={14} className="text-cyan-400" />}
                      <span className={`text-[10px] font-pixel ${isGold ? 'text-yellow-500' : 'text-slate-200'} uppercase`}>{acc.name}</span>
                    </div>
                    {isGold && <span className="text-[9px] font-mono text-yellow-500 bg-yellow-500/10 px-1 rounded">{(acc.weight || 0).toFixed(2)} GR</span>}
                  </div>
                  <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${isGold ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]'}`} style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] font-mono text-slate-400">Rp {(acc.balance || 0).toLocaleString()}</span>
                    <div className="flex gap-1">
                      <button onClick={() => deleteAccount(acc.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-pink-500 transition-all"><X size={12}/></button>
                      <button onClick={() => openTransModal(acc.id, acc.name, acc.balance, false)} className="w-6 h-6 bg-slate-900 text-pink-500 rounded border border-slate-700 flex items-center justify-center transition-all"><Minus size={12}/></button>
                      <button onClick={() => openTransModal(acc.id, acc.name, acc.balance, true)} className={`px-2 py-0.5 rounded text-[8px] font-pixel font-bold transition-all ${isGold ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}`}>+ STAKE</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KOLOM 3: LOGS */}
        <div className="bg-slate-900/40 border-t-2 border-pink-500 rounded-b-lg flex flex-col h-[450px]">
          <div className="p-4 border-b border-slate-800/50 flex items-center gap-2 text-pink-400">
            <History size={18} />
            <h2 className="text-[10px] font-pixel uppercase font-bold">History_Logs</h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-950/20">
            {transactions?.length > 0 ? transactions.map((log: any) => (
              <div key={log.id} className="p-3 border-b border-slate-800/30 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-200 font-bold uppercase tracking-tighter">{log.accountName}</span>
                  <span className="text-[8px] text-slate-500 font-mono italic">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className={`font-mono font-bold text-xs ${log.type === 'income' ? 'text-emerald-400' : 'text-pink-500'}`}>
                  {log.type === 'income' ? '+' : '-'} Rp {log.amount.toLocaleString()}
                  {log.type === 'income' ? <ArrowUpRight size={12} className="inline ml-1"/> : <ArrowDownRight size={12} className="inline ml-1"/>}
                </div>
              </div>
            )) : <div className="p-10 text-center text-[10px] font-pixel text-slate-600 uppercase">No_Logs_Found</div>}
          </div>
        </div>
      </div>

      <FinanceFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      
      <TransactionModal 
        isOpen={isTransModalOpen} 
        onClose={() => setIsTransModalOpen(false)} 
        accountId={transData.id} 
        accountName={transData.name} 
        currentBalance={transData.balance} 
        isAdding={transData.isAdding} 
      />
    </div>
  );
}

// ==========================================
// 2. TRANSACTION MODAL COMPONENT
// ==========================================
function TransactionModal({ isOpen, onClose, accountId, accountName, currentBalance, isAdding }: any) {
  const { updateBalance, showAlert, accounts } = useStore();
  
  const [money, setMoney] = useState<number>(0);
  const [gram, setGram] = useState<number>(0);

  // Harga Emas 1 gram = 2.800.000
  const GOLD_PRICE_PER_GRAM = 2800000; 
  const isGold = accountName.toLowerCase().includes('emas') || accountName.toLowerCase().includes('gold');

  useEffect(() => {
    if (isOpen) {
      setMoney(0);
      setGram(0);
    }
  }, [isOpen]);

  const handleMoneyChange = (val: number) => {
    setMoney(val);
    if (isGold) {
      setGram(Number((val / GOLD_PRICE_PER_GRAM).toFixed(4)));
    }
  };

  const handleGramChangeLocal = (val: number) => {
    setGram(val);
    if (isGold) {
      setMoney(Math.round(val * GOLD_PRICE_PER_GRAM));
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (money <= 0) return;
    
    const acc = accounts.find(a => a.id === accountId);
    if (!acc) return;

    // Proteksi penarikan berlebih
    if (!isAdding) {
      if (acc.balance < money) {
        showAlert("VAULT_ERROR", "DANA TIDAK MENCUKUPI.", "danger");
        return;
      }
    }

    // Eksekusi update ke Store
    updateBalance(
      accountId, 
      isAdding ? money : -money, 
      isGold ? (isAdding ? gram : -gram) : 0
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4">
      <div className={`bg-[#020617] border-2 rounded-lg w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200 ${isAdding ? 'border-emerald-500' : 'border-pink-500'}`}>
        <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="font-pixel text-[8px] text-white uppercase tracking-widest">
            {isAdding ? 'Deposit_Resource' : 'Withdraw_Resource'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={18}/>
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4 text-left">
          <p className="text-[8px] font-pixel text-slate-500 uppercase text-center italic tracking-widest">
            Target: {accountName}
          </p>
          
          <div className="relative">
            <label className="text-[7px] font-pixel text-slate-500 mb-1 block uppercase tracking-tighter">Amount_IDR (Rp)</label>
            <input 
              type="number" autoFocus value={money || ""} 
              onChange={(e) => handleMoneyChange(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 h-12 px-4 font-mono text-white text-lg outline-none focus:border-emerald-500 transition-all"
              placeholder="0"
            />
          </div>

          {isGold && (
            <div className="relative">
              <label className="text-[7px] font-pixel text-yellow-500 mb-1 block uppercase tracking-tighter">Gold_Weight (Gr)</label>
              <input 
                type="number" value={gram || ""} 
                onChange={(e) => handleGramChangeLocal(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 h-12 px-4 font-mono text-white text-lg outline-none focus:border-yellow-500 transition-all"
                placeholder="0.0000"
              />
              <p className="text-[6px] font-pixel text-slate-600 mt-1 uppercase italic text-right">Rate: 2.800.000 / Gr</p>
            </div>
          )}

          {!isAdding && (
            <button 
              onClick={() => handleMoneyChange(currentBalance)}
              className="text-[8px] font-pixel text-pink-500 border border-pink-500/20 py-1 hover:bg-pink-500 hover:text-white transition-all uppercase"
            >
              Use_Max_Available
            </button>
          )}
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 font-pixel">
          <button onClick={onClose} className="flex-1 py-3 text-[8px] text-slate-500 hover:text-white transition-colors uppercase">Batal</button>
          <button 
            onClick={handleConfirm} 
            className={`flex-1 py-3 text-white text-[8px] rounded transition-all uppercase font-bold ${isAdding ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-pink-600 hover:bg-pink-500'}`}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}