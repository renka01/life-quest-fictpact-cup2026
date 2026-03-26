"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import Technomancer from "@/components/art/Technomancer";
import TechnomancerGirl from "@/components/art/TechnomancerGirl";
import { Sparkles, User, ArrowRight } from "lucide-react";

interface CharacterSelectionProps {
  onComplete: () => void;
}

const characters = [
  {
    id: "Pria",
    className: "WARRIOR",
    borderColor: "#06b6d4",  // cyan
    Component: Technomancer,
  },
  {
    id: "Wanita",
    className: "VALKYRIE",
    borderColor: "#ec4899",  // pink
    Component: TechnomancerGirl,
  },
];

export default function CharacterSelection({ onComplete }: CharacterSelectionProps) {
  const { setUserProfile } = useStore();
  const [playerName, setPlayerName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isReady = selectedIndex !== null && playerName.trim() !== "";
  const selectedChar = selectedIndex !== null ? characters[selectedIndex] : null;

  const handleStartJourney = () => {
    if (isReady) {
      setUserProfile({
        nickname: playerName,
        gender: characters[selectedIndex!].id as "Pria" | "Wanita",
      });
      onComplete();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1b26] flex flex-col items-center justify-center p-8 font-mono relative overflow-x-hidden overflow-y-auto py-12 selection:bg-purple-500 selection:text-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,41,59,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(30,41,59,0.3) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Scanlines tipis */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 3px)" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

      {/* Dynamic glow behind cards */}
      {selectedChar && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 50% 72%, ${selectedChar.borderColor}12 0%, transparent 70%)`,
            transition: "background 0.5s ease",
          }}
        />
      )}

      {/* Container utama dengan jarak (gap) yang lega */}
      <div className="relative z-20 w-full max-w-3xl flex flex-col items-center gap-10">

        {/* ── HEADER ── */}
        <div className="text-center">
          <p className="font-pixel text-[10px] text-cyan-400 tracking-widest mb-3">SYSTEM INITIALIZATION</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest drop-shadow-[2px_2px_0_#000]">
            Pilih Karakter
          </h1>
        </div>

        {/* ── INPUT NAMA ── */}
        <div className="w-full max-w-sm">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <User size={14} className="text-emerald-400" />
            Nama Karakter
          </label>
          <input
            type="text"
            maxLength={15}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Masukkan namamu..."
            className="w-full bg-[#1a1b26] border-4 p-4 text-white text-lg font-bold outline-none transition-colors shadow-[inset_4px_4px_0_rgba(0,0,0,0.5)] placeholder:text-slate-600 text-center"
            style={{
              borderColor: playerName.trim()
                ? (selectedChar?.borderColor ?? "#10b981")
                : "#475569",
            }}
          />
        </div>

        {/* ── CHARACTER CARDS (LURUS) ── */}
        <div className="flex items-end justify-center gap-6 md:gap-10 w-full px-4 mt-6">
          {characters.map((char, i) => {
            const isSelected = selectedIndex === i;
            const CharComp = char.Component;

            return (
              <button
                key={char.id}
                onClick={() => setSelectedIndex(i)}
                className="relative cursor-pointer select-none focus:outline-none flex-1 group flex flex-col"
                style={{
                  maxWidth: "280px",
                  minWidth: "150px",
                  height: "clamp(350px, 60vw, 480px)",
                  transform: isSelected ? "translateY(-12px) scale(1.05)" : "translateY(4px) scale(0.95)",
                  transition: "all 0.3s cubic-bezier(0.34,1.4,0.64,1)",
                  border: `4px solid ${isSelected ? char.borderColor : "#334155"}`,
                  background: isSelected
                    ? `linear-gradient(170deg, ${char.borderColor}18 0%, #24283b 40%, #1a1b26 100%)`
                    : "#24283b",
                  boxShadow: isSelected
                    ? `${char.borderColor === "#06b6d4"
                        ? "8px 8px 0 #06b6d4"
                        : "8px 8px 0 #ec4899"}, inset 0 0 60px ${char.borderColor}15`
                    : "8px 8px 0 #000",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px] z-20"
                  style={{
                    background: isSelected
                      ? `linear-gradient(90deg, transparent, ${char.borderColor}, transparent)`
                      : "transparent",
                    transition: "background 0.3s",
                  }}
                />

                {/* ── CHARACTER ART ── */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ bottom: "100px" }}
                >
                  {/* Fade top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, #1a1b26 0%, transparent 100%)" }}
                  />
                  {/* Floor glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-36 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${char.borderColor}${isSelected ? "25" : "08"} 0%, transparent 100%)`,
                      transition: "background 0.4s",
                    }}
                  />
                  {/* Art — oversized & bottom-anchored agar memenuhi kotak */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-5%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "140%",
                      height: "120%",
                    }}
                  >
                    <CharComp />
                  </div>
                </div>

                {/* ── NAME BAR DENGAN PADDING LEGA ATAS-BAWAH ── */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-4 pt-8 pb-8 text-center"
                  style={{
                    background: isSelected
                      ? `linear-gradient(180deg, rgba(26,27,38,0) 0%, rgba(26,27,38,0.97) 20%)`
                      : "rgba(26,27,38,0.97)",
                    borderTop: `4px solid ${isSelected ? char.borderColor : "#334155"}`,
                  }}
                >
                  {/* Glow band */}
                  {isSelected && (
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${char.borderColor}, transparent)`,
                      }}
                    />
                  )}

                  {/* Teks Warrior/Valkyrie yang lega (my-3 py-2) */}
                  <p
                    className="relative text-xl md:text-2xl font-bold uppercase tracking-[0.12em] my-3 py-2"
                    style={{
                      color: isSelected ? "#ffffff" : "#64748b",
                      textShadow: isSelected
                        ? `0 0 20px ${char.borderColor}, 2px 2px 0 #000`
                        : "none",
                      transition: "color 0.3s, text-shadow 0.3s",
                    }}
                  >
                    {char.className}
                  </p>

                  {/* Indicator dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="rounded-full"
                        style={{
                          width: isSelected && d === 1 ? "24px" : "8px",
                          height: "6px",
                          background: isSelected ? char.borderColor : "#334155",
                          boxShadow: isSelected ? `0 0 10px ${char.borderColor}` : "none",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── TOMBOL SUBMIT ── */}
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={handleStartJourney}
            disabled={!isReady}
            className="group relative bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold px-10 py-5 uppercase tracking-widest transition-all border-4 border-transparent disabled:border-slate-600 shadow-[8px_8px_0_#000] disabled:shadow-none hover:bg-emerald-400 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none disabled:active:translate-y-0 disabled:active:translate-x-0"
          >
            <span className="flex items-center justify-center gap-3 font-pixel text-sm">
              <Sparkles size={18} className={!isReady ? "opacity-50" : "animate-pulse"} />
              Mulai Petualangan
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}