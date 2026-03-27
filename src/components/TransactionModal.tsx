"use client";
import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function TransactionModal({
  isOpen,
  onClose,
  accountId,
  accountName,
  isAdding,
}: any) {
  const { updateBalance, showAlert, accounts } = useStore();

  const [gramInput, setGramInput] = useState<string>("");
  const [rupiahInput, setRupiahInput] = useState<string>("");

  const GOLD_PRICE_PER_GRAM = 2800000;
  const isGold =
    accountName.toLowerCase().includes("emas") ||
    accountName.toLowerCase().includes("gold");

  useEffect(() => {
    if (isOpen) {
      setGramInput("");
      setRupiahInput("");
    }
  }, [isOpen]);

  const handleGramChange = (val: string) => {
    let cleaned = val.replace(/,/g, ".").replace(/[^\d.]/g, "");

    const firstDotIndex = cleaned.indexOf(".");
    if (firstDotIndex !== -1) {
      cleaned =
        cleaned.slice(0, firstDotIndex + 1) +
        cleaned.slice(firstDotIndex + 1).replace(/\./g, "");
    }

    setGramInput(cleaned);

    if (cleaned === "" || cleaned === ".") {
      setRupiahInput("");
      return;
    }

    const num = Number(cleaned);
    if (!Number.isNaN(num)) {
      setRupiahInput(Math.round(num * GOLD_PRICE_PER_GRAM).toString());
    } else {
      setRupiahInput("");
    }
  };

  const handleRupiahChange = (val: string) => {
    const sanitized = val.replace(/[^0-9]/g, "");
    setRupiahInput(sanitized);

    if (sanitized === "") {
      setGramInput("");
      return;
    }

    const num = parseFloat(sanitized);
    if (!isNaN(num) && isGold) {
      const calc = (num / GOLD_PRICE_PER_GRAM).toFixed(4);
      setGramInput(parseFloat(calc).toString());
    } else if (!isGold) {
      setGramInput("");
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    const inputGram = parseFloat((gramInput || "0").replace(",", ".")) || 0;
    const inputRupiah = parseFloat(rupiahInput || "0") || 0;

    if (inputRupiah <= 0 && inputGram <= 0) return;

    const currentAccount = accounts.find((a: any) => a.id === accountId);
    if (!currentAccount) return;

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

    const expGain = isAdding
      ? isGold
        ? Math.max(1, Math.floor(inputGram * 5))
        : Math.max(1, Math.floor(inputRupiah / 50000))
      : 0;

    const goldGain = isAdding
      ? isGold
        ? Math.max(1, Math.floor(inputGram * 2))
        : Math.min(20, Math.max(1, Math.floor(inputRupiah / 100000)))
      : 0;

    updateBalance(
      accountId,
      isAdding ? inputRupiah : -inputRupiah,
      isGold ? (isAdding ? inputGram : -inputGram) : 0,
      {
        exp: expGain,
        gold: goldGain,
        gram: isGold ? inputGram : undefined,
      }
    );

    onClose();
  };

  const borderCol = isAdding ? "border-emerald-500" : "border-pink-500";
  const btnCol = isAdding ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950" : "bg-pink-500 hover:bg-pink-400 text-zinc-950";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div
        className={`bg-zinc-900 border-4 ${borderCol} rounded-none w-full max-w-sm overflow-hidden shadow-[8px_8px_0_#000] animate-in zoom-in duration-200`}
      >
        <div className="p-4 border-b-4 border-zinc-700 flex justify-between items-center bg-zinc-800">
          <h2 className="font-pixel text-[10px] text-white tracking-widest uppercase flex items-center gap-2">
            {isAdding ? "DEPOSIT SYNC" : "WITHDRAW SYNC"}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 text-left">
          <div className="text-center bg-zinc-800 p-3 rounded-none border-2 border-zinc-600">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              SOURCE: <span className="text-white">{accountName}</span>
            </p>
          </div>

          {isGold && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-yellow-500 uppercase">
                Input Gram
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={gramInput}
                  onChange={(e) => handleGramChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-zinc-800 border-2 border-zinc-600 p-3 pl-10 text-white font-mono text-lg focus:border-yellow-500 outline-none transition-colors rounded-none"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 font-bold text-xs">
                  Gr
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-zinc-400 uppercase">
              Credits Value (IDR)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={rupiahInput}
                onChange={(e) => handleRupiahChange(e.target.value)}
                placeholder="0"
                className="w-full bg-zinc-800 border-2 border-zinc-600 p-3 pl-10 text-white font-mono text-lg outline-none focus:border-emerald-500 transition-colors rounded-none"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-emerald-500">
                Rp
              </span>
            </div>
          </div>

          {isGold && (
            <div className="bg-zinc-800 border-2 border-dashed border-zinc-700 p-3 text-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">
                // Rate: 1 Gr = 2.800.000
              </p>
              <p className="text-xl font-bold text-white font-mono italic">
                Rp {parseInt(rupiahInput || "0").toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t-2 border-zinc-700 bg-zinc-800 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-[10px] font-bold text-zinc-400 hover:text-white uppercase transition-colors">
            BATAL
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-3 ${btnCol} text-[10px] font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all`}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}