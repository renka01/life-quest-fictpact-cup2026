"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import Technomancer from "@/components/art/Technomancer";
import TechnomancerGirl from "@/components/art/TechnomancerGirl";
import { Sparkles, User, ArrowRight } from "lucide-react";

interface CharacterSelectionProps {
  onComplete: () => void;
}

export default function CharacterSelection({ onComplete }: CharacterSelectionProps) {
  const { setUserProfile, userProfile } = useStore();
  
  // State lokal untuk form
  const [characterNickname, setCharacterNickname] = useState("");
  const [selectedGender, setSelectedGender] = useState<"Pria" | "Wanita" | null>(null);

  const handleStartJourney = () => {
    if (selectedGender && characterNickname.trim() !== "") {
      // PERBAIKAN: Simpan ke Zustand dengan properti yang benar
      setUserProfile({
        // Tetap pertahankan accountName yang sudah diisi saat Login
        accountName: userProfile?.accountName || "Adventurer", 
        nickname: characterNickname, // Ini untuk nama karakter (Roleplay)
        gender: selectedGender,
        avatarId: 'default'
      });
      
      // Jalankan suara success (Opsional)
      const audio = new Audio('/sounds/start-game.mp3');
      audio.play().catch(() => {});

      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4 font-mono relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20"></div>

      <div className="bg-[#24283b] border-4 border-slate-700 shadow-[12px_12px_0_#000] p-6 md:p-10 max-w-3xl w-full relative z-10 animate-in zoom-in-95 duration-500">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="font-pixel text-[8px] text-cyan-400 tracking-widest mb-3 uppercase">
            Account: {userProfile?.accountName || "Guest"} Initialized
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest drop-shadow-[2px_2px_0_#000]">
            Buat Karaktermu
          </h1>
          <p className="text-slate-500 text-[10px] uppercase mt-2">Pilih identitas untuk petualanganmu</p>
        </div>

        {/* INPUT NICKNAME */}
        <div className="mb-8 max-w-md mx-auto">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <User size={14} className="text-emerald-400" />
            Nickname Karakter
          </label>
          <input
            type="text"
            maxLength={15}
            value={characterNickname}
            onChange={(e) => setCharacterNickname(e.target.value)}
            placeholder="Contoh: Micel, Kuro, dll..."
            className="w-full bg-[#1a1b26] border-4 border-slate-600 p-4 text-white text-lg font-bold outline-none focus:border-emerald-500 transition-colors shadow-[inset_4px_4px_0_rgba(0,0,0,0.5)] placeholder:text-slate-700 text-center"
          />
        </div>

        {/* PILIHAN GENDER / CLASS */}
        <div className="mb-10">
          <label className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Pilih Avatar Karakter
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPSI PRIA */}
            <button
              onClick={() => setSelectedGender("Pria")}
              className={`relative group flex flex-col items-center justify-center p-6 border-4 transition-all duration-200 ${
                selectedGender === "Pria"
                  ? "border-cyan-500 bg-[#1a1b26] shadow-[6px_6px_0_#06b6d4] -translate-y-1"
                  : "border-slate-700 bg-[#1a1b26]/50 hover:border-slate-500 hover:bg-[#1a1b26]"
              }`}
            >
              <div className="w-32 h-32 relative mb-4 transform group-hover:scale-110 transition-transform">
                <Technomancer />
              </div>
              <div className={`font-pixel text-[10px] px-4 py-2 border-2 ${selectedGender === "Pria" ? "border-cyan-500 text-cyan-400" : "border-slate-600 text-slate-500"}`}>
                MALE HERO
              </div>
            </button>

            {/* OPSI WANITA */}
            <button
              onClick={() => setSelectedGender("Wanita")}
              className={`relative group flex flex-col items-center justify-center p-6 border-4 transition-all duration-200 ${
                selectedGender === "Wanita"
                  ? "border-pink-500 bg-[#1a1b26] shadow-[6px_6px_0_#ec4899] -translate-y-1"
                  : "border-slate-700 bg-[#1a1b26]/50 hover:border-slate-500 hover:bg-[#1a1b26]"
              }`}
            >
              <div className="w-32 h-32 relative mb-4 transform group-hover:scale-110 transition-transform">
                <TechnomancerGirl />
              </div>
              <div className={`font-pixel text-[10px] px-4 py-2 border-2 ${selectedGender === "Wanita" ? "border-pink-500 text-pink-400" : "border-slate-600 text-slate-500"}`}>
                FEMALE HERO
              </div>
            </button>
          </div>
        </div>

        {/* TOMBOL START */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleStartJourney}
            disabled={!selectedGender || characterNickname.trim() === ""}
            className="group relative bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold px-10 py-4 uppercase tracking-widest transition-all border-4 border-emerald-400 disabled:border-slate-600 shadow-[8px_8px_0_#000] disabled:shadow-none hover:bg-emerald-400 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
          >
            <span className="flex items-center justify-center gap-3 font-pixel text-[10px]">
              <Sparkles size={16} className={(!selectedGender || characterNickname.trim() === "") ? "opacity-30" : "animate-pulse"} />
              Mulai Petualangan
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}