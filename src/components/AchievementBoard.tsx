"use client";
import React from 'react';
import { 
  Trophy, Star, Shield, Zap, Lock, Medal, 
  Flame, Hourglass, Sword, Wallet, Crown, Activity 
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AchievementBoard() {
  // Ambil data real dari global state
  const { tasks, stats, dailyProgress, equippedItems } = useStore();

  // Hitung progress secara dinamis
  const completedTasksCount = tasks?.filter((t: any) => t.done).length || 0;
  const currentLevel = stats?.level || 1;
  const currentGold = stats?.gold || 0;
  const currentStreak = stats?.streak || 0; 
  const bossesDefeated = dailyProgress?.bossesDefeated || 0;
  
  // Asumsi untuk tabungan dan fokus jika belum ada state pastinya, kita set 0 dulu
  const currentSavings = 0; // Nanti bisa diganti: finance?.savings || 0
  const focusMinutes = 0; // Nanti bisa diganti: stats?.focusTime || 0
  
  // Hitung berapa item yang sedang dipakai (weapon, armor, dll)
  const equippedCount = Object.values(equippedItems || {}).filter(Boolean).length;

  const DYNAMIC_ACHIEVEMENTS = [
    // --- KATEGORI: MISI & LEVELING ---
    { id: 1, title: "Langkah Pertama", desc: "Selesaikan misi pertamamu di Daily Dungeon.", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500", progress: completedTasksCount, max: 1 },
    { id: 2, title: "Pekerja Keras", desc: "Selesaikan total 50 misi.", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500", progress: completedTasksCount, max: 50 },
    { id: 3, title: "Legenda Hidup", desc: "Capai Level 20.", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500", progress: currentLevel, max: 20 },
    
    // --- KATEGORI: KEUANGAN & TOKO ---
    { id: 4, title: "Sultan Dungeon", desc: "Kumpulkan total 10.000 Gold.", icon: Medal, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500", progress: currentGold, max: 10000 },
    { id: 5, title: "Investor Bijak", desc: "Simpan 5.000 Gold ke dalam Tabungan.", icon: Wallet, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500", progress: currentSavings, max: 5000 },
    { id: 6, title: "Kolektor Senjata", desc: "Gunakan 5 item equipment sekaligus.", icon: Sword, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500", progress: equippedCount, max: 5 },
    
    // --- KATEGORI: FOKUS & KONSISTENSI ---
    { id: 7, title: "Nyala Api Perjuangan", desc: "Pertahankan Streak Login 7 hari.", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500", progress: currentStreak, max: 7 },
    { id: 8, title: "Meditasi Mendalam", desc: "Gunakan Focus Arena selama 500 menit.", icon: Hourglass, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500", progress: focusMinutes, max: 500 },
    { id: 9, title: "Spesialis Rutinitas", desc: "Selesaikan 30 misi rutinitas harian.", icon: Activity, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500", progress: completedTasksCount, max: 30 }, // Sementara diproksikan ke total task
    
    // --- KATEGORI: COMBAT ---
    { id: 10, title: "Pelindung Desa", desc: "Kalahkan Boss pertamamu.", icon: Shield, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500", progress: bossesDefeated, max: 1 },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-700/50 pb-6">
        <div>
          <h1 className="font-pixel text-xl md:text-2xl text-white flex items-center gap-4 drop-shadow-[2px_2px_0_#000] uppercase mb-2">
            <Trophy className="text-amber-400" size={28} /> HALL OF FAME
          </h1>
          <p className="font-pixel text-[8px] md:text-[10px] text-zinc-400 uppercase tracking-widest">
            Rekam Jejak Kejayaan dan Perjuanganmu.
          </p>
        </div>
        
        {/* Indikator Total Pencapaian */}
        <div className="bg-zinc-800 border-2 border-zinc-600 px-4 py-2 flex items-center gap-3 shadow-[4px_4px_0_#000]">
          <span className="text-xs text-zinc-400 font-bold uppercase">Total Unlocked:</span>
          <span className="text-amber-400 font-pixel text-sm">
            {DYNAMIC_ACHIEVEMENTS.filter(a => a.progress >= a.max).length} / {DYNAMIC_ACHIEVEMENTS.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
        {DYNAMIC_ACHIEVEMENTS.map((ach) => {
          const Icon = ach.icon;
          const isDone = ach.progress >= ach.max;
          
          return (
            <div 
              key={ach.id} 
              className={`p-4 border-2 shadow-[4px_4px_0_#000] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] ${
                isDone ? `bg-zinc-800 ${ach.border}` : 'bg-zinc-900 border-zinc-700 opacity-80'
              }`}
            >
              <div className={`w-12 h-12 shrink-0 border-2 rounded-none flex items-center justify-center transition-colors ${
                isDone ? `${ach.bg} ${ach.border} ${ach.color}` : 'bg-zinc-800 border-zinc-600 text-zinc-500'
              }`}>
                {isDone ? <Icon size={24} className="animate-in zoom-in duration-300" /> : <Lock size={20} />}
              </div>
              
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm uppercase tracking-wide ${isDone ? 'text-white' : 'text-zinc-400'}`}>
                    {ach.title}
                  </h3>
                  <span className="font-pixel text-[8px] mt-1 shrink-0 ml-2">
                    {isDone ? (
                      <span className="text-emerald-400">DONE</span>
                    ) : (
                      <span className="text-zinc-500">{ach.progress}/{ach.max}</span>
                    )}
                  </span>
                </div>
                <p className={`text-[10px] mb-3 leading-relaxed ${isDone ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {ach.desc}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-zinc-950 border border-zinc-700 rounded-none overflow-hidden mt-auto">
                  <div 
                    className={`h-full transition-all duration-1000 ${isDone ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-zinc-600'}`}
                    style={{ width: `${Math.min(100, (ach.progress / ach.max) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}