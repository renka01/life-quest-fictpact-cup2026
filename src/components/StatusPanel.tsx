"use client";
import React from 'react';
import Technomancer from '@/components/art/Technomancer';
import { Heart, Star, Zap, RefreshCw, Shield, Sword, Brain } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function StatusPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { stats } = useStore();

  return ( // Added conditional class for transform based on isOpen
    <aside className={`fixed top-0 right-0 h-full w-64 bg-[#1a1b26] border-l-4 border-slate-700 p-6 flex-col gap-6 z-50 shadow-[-4px_0_0_rgba(0,0,0,0.5)] overflow-y-auto shrink-0 transition-transform duration-300 pb-24 ${isOpen ? 'translate-x-0 flex' : 'translate-x-full hidden xl:flex'} xl:static xl:translate-x-0 xl:w-80`}>
      <div className="flex justify-between items-center">
        <h3 className="font-pixel text-[10px] text-cyan-400 tracking-widest">STATUS LOG</h3>
        <button className="text-slate-500 hover:text-white"><RefreshCw size={14} /></button>
      </div>

      <div className="bg-[#24283b] p-3 rounded-none border-4 border-slate-700 shadow-[8px_8px_0_#000] flex flex-col gap-4">
        <div className="w-full aspect-square bg-[#1a1b26] border-4 border-slate-700 rounded-none flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-50"></div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
          <div className="transform scale-[1.2] relative z-10 mt-10"><Technomancer /></div>
        </div>
        <div className="flex justify-between items-center px-2 pb-2">
          <div className="relative w-12 h-12">
            <div className="absolute top-[16px] left-0 w-12 h-[16px] bg-slate-900 rounded-none shadow-[2px_2px_0_#000]"></div>
            <div className="absolute left-[16px] top-0 w-[16px] h-12 bg-slate-900 rounded-none shadow-[2px_2px_0_#000]"></div>
            <div className="absolute left-[20px] top-[20px] w-2 h-2 bg-slate-700 rounded-full"></div>
          </div>
          <div className="flex gap-3 rotate-[-15deg]">
            <div className="w-5 h-5 rounded-full bg-pink-500 shadow-[0_3px_0_#9d174d] mt-4 border border-pink-400"></div>
            <div className="w-5 h-5 rounded-full bg-cyan-500 shadow-[0_3px_0_#0891b2] mb-4 border border-cyan-400"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="font-pixel text-[8px] text-pink-500 flex items-center gap-1.5"><Heart size={10} className="fill-pink-500"/> NYAWA</span>
            <span className="font-pixel text-[8px] text-slate-400">{stats.hp}/{stats.maxHp}</span>
          </div>
          <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 rounded-none overflow-hidden">
            <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="font-pixel text-[8px] text-cyan-400 flex items-center gap-1.5"><Zap size={10} className="fill-cyan-400"/> ENERGI</span>
            <span className="font-pixel text-[8px] text-slate-400">{stats.energy}/{stats.maxEnergy}</span>
          </div>
          <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 rounded-none overflow-hidden relative">
            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(stats.energy / stats.maxEnergy) * 100}%` }}></div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="font-pixel text-[8px] text-amber-400 flex items-center gap-1.5"><Star size={10} className="fill-amber-400"/> EXP (LVL. {stats.level})</span>
            <span className="font-pixel text-[8px] text-slate-400">{stats.exp}/{stats.maxExp}</span>
          </div>
          <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 rounded-none overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }}></div>
          </div>
          <div className="flex justify-between text-[8px] text-slate-500 font-bold mt-1">
            <span>NEXT LVL</span>
            <span>{stats.maxExp - stats.exp} XP LEFT</span>
          </div>
        </div>

        {/* ATTRIBUTES GRID */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t-2 border-slate-700 border-dashed">
           <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
              <Sword size={12} className="text-pink-500"/>
              <span className="text-[8px] font-bold text-slate-400">STR</span>
              <span className="text-xs font-pixel text-white">{10 + stats.level * 2}</span>
           </div>
           <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
              <Shield size={12} className="text-cyan-500"/>
              <span className="text-[8px] font-bold text-slate-400">DEF</span>
              <span className="text-xs font-pixel text-white">{5 + stats.level}</span>
           </div>
           <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
              <Brain size={12} className="text-amber-500"/>
              <span className="text-[8px] font-bold text-slate-400">INT</span>
              <span className="text-xs font-pixel text-white">{8 + Math.floor(stats.level * 1.5)}</span>
           </div>
        </div>
      </div>
    </aside>
  );
}