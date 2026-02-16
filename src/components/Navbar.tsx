"use client";
import React from 'react';
import Technomancer from './art/Technomancer';
import { LayoutDashboard, Calendar, Timer, BarChart2, ShoppingCart, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return (
    <aside className="w-20 lg:w-64 bg-slate-950 border-r-2 border-slate-800 flex flex-col z-20 shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800 shrink-0">
        <div className="font-pixel text-cyan-400 text-sm lg:text-lg flex items-center gap-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          <span className="text-pink-500">L</span>Q
          <span className="hidden lg:inline text-xs mt-1">LifeQuest</span>
        </div>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
        {[
          { name: "Dashboard", icon: LayoutDashboard, active: true },
          { name: "Kalender", icon: Calendar },
          { name: "Focus Arena", icon: Timer },
          { name: "Statistik", icon: BarChart2 },
          { name: "Toko & Loot", icon: ShoppingCart },
        ].map((item, idx) => (
          <button key={idx} className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all group ${
            item.active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
          }`}>
            <item.icon size={20} className={item.active ? 'drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : ''} />
            <span className="hidden lg:block text-sm font-bold tracking-wider">{item.name}</span>
            {item.active && <ChevronRight size={16} className="hidden lg:block ml-auto opacity-50" />}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 flex items-center justify-center lg:justify-start gap-3 cursor-pointer hover:bg-slate-900 transition-colors shrink-0">
        <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center overflow-hidden">
          <div className="transform scale-[0.3] mt-2"><Technomancer /></div>
        </div>
        <div className="hidden lg:flex flex-col">
          <span className="text-xs font-bold text-white">RenHafiz</span>
          <span className="text-[10px] text-cyan-400">Lv. 1 Hacker</span>
        </div>
      </div>
    </aside>
  );
}