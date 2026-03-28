"use client";
import React, { useState } from 'react';
import { X, CreditCard, PiggyBank, Landmark, Wallet, Coins } from "lucide-react";
import { useStore } from "@/store/useStore";

interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'rekening' | 'tabungan';
}

const PROVIDERS = {
  rekening: [
    { id: 'mandiri', name: 'Mandiri', category: 'bank', icon: Landmark },
    { id: 'bca', name: 'BCA', category: 'bank', icon: Landmark },
    { id: 'bni', name: 'BNI', category: 'bank', icon: Landmark },
    { id: 'bri', name: 'BRI', category: 'bank', icon: Landmark },
    { id: 'gopay', name: 'GoPay', category: 'wallet', icon: Wallet },
    { id: 'dana', name: 'DANA', category: 'wallet', icon: Wallet },
    { id: 'ovo', name: 'OVO', category: 'wallet', icon: Wallet },
    { id: 'shopeepay', name: 'ShopeePay', category: 'wallet', icon: Wallet },
  ],
  tabungan: [
    { id: 'emas_digital', name: 'Emas Digital', category: 'invest', icon: Coins },
    { id: 'reksadana', name: 'Reksadana', category: 'invest', icon: PiggyBank },
    { id: 'physical_gold', name: 'Emas Fisik', category: 'invest', icon: Coins },
  ]
};

export default function FinanceFormModal({ isOpen, onClose, type }: FinanceModalProps) {
  // Tambahkan _applySimpleReward dari useStore
  const { addAccount, _applySimpleReward } = useStore();
  
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [balance, setBalance] = useState(0);
  const [target, setTarget] = useState(1000000);
  const [weight, setWeight] = useState(0);

  const GOLD_PRICE_PER_GRAM = 2800000;

  if (!isOpen) return null;

  const currentOptions = type === 'rekening' ? PROVIDERS.rekening : PROVIDERS.tabungan;
  const isGoldProvider = provider.toLowerCase().includes('emas') || provider.toLowerCase().includes('gold');

  const handleWeightChange = (val: number) => {
    setWeight(val);
    if (isGoldProvider) {
      setBalance(Math.round(val * GOLD_PRICE_PER_GRAM));
    }
  };

  const handleBalanceChange = (val: number) => {
    setBalance(val);
    if (isGoldProvider) {
      const calcWeight = val / GOLD_PRICE_PER_GRAM;
      setWeight(Number(calcWeight.toFixed(4)));
    }
  };

  const handleSubmit = () => {
    if (!name || !provider) return;

    const fullName = `${provider.toUpperCase()} - ${name}`;
    const existingAccounts = useStore.getState().accounts;
    const existingAccount = existingAccounts.find(acc => acc.name === fullName);
    const currentBalanceInCard = existingAccount ? existingAccount.balance : 0;
    const totalPotential = currentBalanceInCard + balance;

    let finalBalanceToStore = totalPotential;
    let isOverflow = false;
    let leftover = 0;

    if (type === 'tabungan' && totalPotential > target) {
      isOverflow = true;
      finalBalanceToStore = target;
      leftover = totalPotential - target;
    }

    // 1. EKSEKUSI KE STORE
    addAccount({
      id: existingAccount ? existingAccount.id : Date.now().toString(),
      name: fullName,
      balance: finalBalanceToStore,
      type,
      weight: isGoldProvider ? (finalBalanceToStore / GOLD_PRICE_PER_GRAM) : undefined,
      target: type === 'tabungan' ? target : undefined
    });

    // 🔥 2. LOGIKA REWARD EXP (Baru ditambahkan)
    // Jika user membuat akun/rekening baru (bukan update saldo lewat modal ini)
    if (!existingAccount) {
      if (type === 'rekening') {
        _applySimpleReward(10); // Reward buat rekening
      } else {
        _applySimpleReward(20); // Reward buat tabungan/asset
      }
    }

    // 3. NOTIFIKASI OVERFLOW
    if (isOverflow) {
      if (finalBalanceToStore === currentBalanceInCard && leftover > 0) {
         alert(`🎯 TARGET SUDAH PENUH!\nSaldo tidak ditambahkan karena sudah mencapai limit Rp ${target.toLocaleString()}.`);
      } else {
         alert(
           `⚠️ TARGET TERCAPAI!\n\n` +
           `Saldo Sebelumnya: Rp ${currentBalanceInCard.toLocaleString()}\n` +
           `Input Baru: Rp ${balance.toLocaleString()}\n` +
           `Sisa Rp ${leftover.toLocaleString()} dikembalikan ke Vault.`
         );
      }
    }

    // Reset form
    setName('');
    setProvider('');
    setBalance(0);
    setWeight(0);
    onClose();
  };

  const isRekening = type === 'rekening';
  const borderClass = isRekening ? 'border-emerald-500' : 'border-cyan-500';
  const textAccent = isRekening ? 'text-emerald-400' : 'text-cyan-400';
  const btnAccent = isRekening ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950' : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950';

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className={`bg-zinc-900 border-4 ${borderClass} rounded-none w-full max-w-md max-h-[80dvh] flex flex-col animate-in zoom-in duration-200 shadow-[8px_8px_0_#000] mb-4`}>
        
        {/* HEADER */}
        <div className="p-4 border-b-4 border-zinc-700 flex justify-between items-center bg-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            {isRekening ? <CreditCard size={16} className="text-emerald-400"/> : <PiggyBank size={16} className="text-cyan-400"/>}
            <h2 className="font-pixel text-[10px] text-white tracking-widest uppercase italic">
              {isRekening ? 'REGISTRASI VAULT AKUN' : 'SET INVESTMENT TARGET'}
            </h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-pink-500 transition-colors">
            <X size={20}/>
          </button>
        </div>

        <div className="p-6 flex-1 min-h-0 flex flex-col gap-5 overflow-y-auto custom-scrollbar text-left text-white">
          
          {/* 1. PILIH PROVIDER */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-pixel text-zinc-500 uppercase italic tracking-tighter">
              {isRekening ? 'Pilih Bank / E-Wallet*' : 'Pilih Instrumen Investasi*'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currentOptions.map((opt) => {
                const isActive = provider === opt.name;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProvider(opt.name)}
                    className={`p-2 border-2 rounded-none flex flex-col items-center justify-center gap-1 transition-all ${
                      isActive 
                      ? (isRekening ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-cyan-500 bg-cyan-500/10 text-cyan-400')
                      : 'border-zinc-700 bg-zinc-800 text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    <opt.icon size={14}/>
                    <span className="text-[8px] font-bold uppercase tracking-tighter text-center">{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. NAMA ASET */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-pixel text-zinc-500 uppercase italic tracking-tighter">Identitas Aset*</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder={isRekening ? "Contoh: Tabungan Utama" : "Contoh: Dana Haji"}
              className={`w-full bg-zinc-950 border-2 border-zinc-700 rounded-none p-3 text-sm text-zinc-200 outline-none transition-all font-mono ${isRekening ? 'focus:border-emerald-500' : 'focus:border-cyan-500'}`}
            />
          </div>

          {/* 3. INPUT VOLUME (KHUSUS EMAS) */}
          {isGoldProvider && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-pixel text-yellow-500 uppercase italic tracking-tighter">Volume Emas (Gram)</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01"
                  value={weight || ""} 
                  onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border-2 border-yellow-500/50 rounded-none p-3 text-sm text-yellow-500 outline-none focus:border-yellow-500 font-mono"
                  placeholder="0.00"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500/50 text-[10px] font-pixel uppercase">GR</div>
              </div>
            </div>
          )}

          {/* 4. SALDO AWAL */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-pixel text-zinc-500 uppercase italic tracking-tighter">Initial Credits (IDR)</label>
            <div className="relative group">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold z-10 ${textAccent}`}>Rp</div>
              <input 
                type="number"
                value={balance || ""}
                onChange={(e) => handleBalanceChange(parseInt(e.target.value) || 0)}
                placeholder="0"
                className={`w-full bg-zinc-950 border-2 border-zinc-700 h-14 pl-12 pr-4 font-mono font-bold text-white italic text-xl shadow-inner outline-none transition-all rounded-none ${isRekening ? 'focus:border-emerald-500' : 'focus:border-cyan-500'}`}
              />
            </div>
          </div>

          {/* 5. TARGET GOAL */}
          {!isRekening && (
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-pixel text-zinc-500 uppercase italic tracking-tighter">Target Goal (IDR)</label>
              <input 
                type="number" 
                value={target} 
                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-none p-3 text-sm text-cyan-400 outline-none focus:border-cyan-500 font-mono italic shadow-inner"
              />
            </div>
          )}
          {/* Spacer */}
          <div className="h-16 md:h-4 w-full shrink-0" />
        </div>

        {/* FOOTER */}
        <div className="px-4 pt-4 pb-6 bg-zinc-800 border-t-2 border-zinc-700 flex justify-end gap-3 font-pixel shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-[10px] font-bold text-zinc-400 hover:text-white uppercase italic transition-colors">Batal</button>
          <button 
            type="button"
            onClick={handleSubmit} 
            className={`px-6 py-2 ${btnAccent} text-[10px] font-bold rounded-none shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all uppercase italic`}
          >
            SINKRONISASI DATA
          </button>
        </div>
      </div>
    </div>
  );
}