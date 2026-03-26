"use client";
import React from 'react';
import { Trophy, Star, Shield, Zap, Lock, Medal } from 'lucide-react';

const MOCK_ACHIEVEMENTS = [
  { id: 1, title: "Langkah Pertama", desc: "Selesaikan misi pertamamu.", icon: Star, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500", unlocked: true, progress: 1, max: 1 },
  { id: 2, title: "Pekerja Keras", desc: "Selesaikan 50 misi.", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500", unlocked: false, progress: 24, max: 50 },
  { id: 3, title: "Sultan Dungeon", desc: "Kumpulkan total 10.000 Gold.", icon: Medal, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500", unlocked: false, progress: 4500, max: 10000 },
  { id: 4, title: "Pelindung Desa", desc: "Kalahkan Boss pertama.", icon: Shield, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500", unlocked: true, progress: 1, max: 1 },
];

export default function AchievementBoard() {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="font-pixel text-xl md:text-2xl text-white flex items-center gap-4 drop-shadow-[2px_2px_0_#000] uppercase mb-2">
          <Trophy className="text-amber-400" size={28} /> HALL OF FAME
        </h1>
        <p className="font-pixel text-[10px] text-slate-400 uppercase tracking-widest">
          Rekam Jejak Kejayaan dan Perjuanganmu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_ACHIEVEMENTS.map((ach) => {
          const Icon = ach.icon;
          const isDone = ach.unlocked || ach.progress >= ach.max;
          
          return (
            <div 
              key={ach.id} 
              className={`p-4 border-2 shadow-[4px_4px_0_#000] flex items-start gap-4 transition-all duration-300 ${
                isDone ? `bg-[#24283b] ${ach.border}` : 'bg-[#1a1b26] border-slate-700 opacity-70 grayscale'
              }`}
            >
              <div className={`w-12 h-12 shrink-0 border-2 rounded-none flex items-center justify-center ${
                isDone ? `${ach.bg} ${ach.border} ${ach.color}` : 'bg-slate-800 border-slate-600 text-slate-500'
              }`}>
                {isDone ? <Icon size={24} /> : <Lock size={20} />}
              </div>
              
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm uppercase tracking-wide ${isDone ? 'text-white' : 'text-slate-400'}`}>
                    {ach.title}
                  </h3>
                  <span className="font-pixel text-[8px] text-slate-500 mt-1">
                    {ach.progress}/{ach.max}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-3">{ach.desc}</p>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-900 border border-slate-700 rounded-none overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${isDone ? 'bg-amber-400' : 'bg-slate-500'}`}
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