"use client";
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function TransactionModal({ isOpen, onClose, accountId, accountName, isAdding }: any) {
  const { updateBalance, showAlert, accounts } = useStore();
  
  const [gramInput, setGramInput] = useState<string>("0");
  const [rupiahInput, setRupiahInput] = useState<string>("0");

  const GOLD_PRICE_PER_GRAM = 2800000;
  const isGold = accountName.toLowerCase().includes('emas') || accountName.toLowerCase().includes('gold');

  useEffect(() => {
    if (isOpen) {
      setGramInput("0");
      setRupiahInput("0");
    }
  }, [isOpen]);

  const handleGramChange = (val: string) => {
    const sanitized = val.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    setGramInput(sanitized);

    const num = parseFloat(sanitized);
    if (!isNaN(num)) {
      setRupiahInput(Math.round(num * GOLD_PRICE_PER_GRAM).toString());
    } else {
      setRupiahInput("0");
    }
  };

  const handleRupiahChange = (val: string) => {
    const sanitized = val.replace(/[^0-9]/g, '');
    setRupiahInput(sanitized);

    const num = parseFloat(sanitized);
    if (!isNaN(num) && isGold) {
      const calc = (num / GOLD_PRICE_PER_GRAM).toFixed(4);
      setGramInput(parseFloat(calc).toString());
    } else {
      setGramInput("0");
    }
  };

  if (!isOpen) return null;

const handleConfirm = () => {
  const inputGram = parseFloat(gramInput) || 0;
  const inputRupiah = parseFloat(rupiahInput) || 0;

  if (inputRupiah <= 0 && inputGram <= 0) return;

  const currentAccount = accounts.find((a: any) => a.id === accountId);
  if (!currentAccount) return;

  // --- 1. LOGIKA TARIK SALDO (WITHDRAW) ---
  if (!isAdding) {
    if (currentAccount.balance < inputRupiah) {
      showAlert("INSUFFICIENT_FUNDS", "Saldo tidak cukup!", "danger");
      return;
    }
    if (isGold && (currentAccount.weight || 0) < inputGram) {
      showAlert("INSUFFICIENT_ASSET", "Stok Gram tidak cukup!", "danger");
      return;
    }
  }

  // --- 2. EKSEKUSI KE STORE ---
  // Kita kirim nilai murni, biarkan Store yang memproses limit target
  updateBalance(
    accountId, 
    isAdding ? inputRupiah : -inputRupiah, 
    isGold ? (isAdding ? inputGram : -inputGram) : 0
  );
  
  onClose();
};

  const borderCol = isAdding ? "border-emerald-500" : "border-pink-500";
  const btnCol = isAdding ? "bg-emerald-600 hover:bg-emerald-500" : "bg-pink-600 hover:bg-pink-500";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className={`bg-[#020617] border-2 ${borderCol} rounded-lg w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200`}>
        
        <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <h2 className="font-pixel text-[8px] text-white tracking-widest uppercase italic">
            {isAdding ? 'DEPOSIT_SYNC' : 'WITHDRAW_SYNC'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={18}/></button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-left">
          <p className="text-[8px] font-pixel text-slate-500 uppercase tracking-tighter italic">Source: {accountName}</p>
          
          {isGold && (
            <div className="flex flex-col gap-1">
              <label className="text-[7px] font-pixel text-yellow-500 uppercase italic">Input_Gram (Gunakan ".")</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={gramInput === "0" ? "" : gramInput}
                  onChange={(e) => handleGramChange(e.target.value)}
                  placeholder="0.5"
                  className="w-full bg-slate-950 border border-slate-800 p-3 pl-10 text-white font-mono text-lg focus:border-yellow-500 outline-none transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 font-bold text-xs">Gr</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[7px] font-pixel text-slate-500 uppercase italic">Credits_Value (IDR)</label>
            <div className="relative">
              <input 
                type="text"
                value={rupiahInput === "0" ? "" : rupiahInput}
                onChange={(e) => handleRupiahChange(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-950 border border-slate-800 p-3 pl-10 text-white font-mono text-lg outline-none focus:border-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-blue-500">Rp</span>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-dashed border-slate-700 p-3 rounded text-center">
            <p className="text-[7px] font-pixel text-slate-500 uppercase mb-1 italic">// Rate: 1 Gr = 2.800.000</p>
            <p className="text-xl font-bold text-white font-mono italic">
              Rp {parseInt(rupiahInput || "0").toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 font-pixel">
          <button onClick={onClose} className="flex-1 py-3 text-[8px] text-slate-500 uppercase">Batal</button>
          <button onClick={handleConfirm} className={`flex-1 py-3 ${btnCol} text-white text-[8px] rounded uppercase`}>
            Confirm_Transaction
          </button>
        </div>
      </div>
    </div>
  );
}