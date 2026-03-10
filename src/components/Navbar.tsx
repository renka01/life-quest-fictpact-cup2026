"use client";
import React from 'react';
import Technomancer from './art/Technomancer';
import { LayoutDashboard, Calendar, Timer, BarChart2, ShoppingCart, ChevronRight, Wallet } from 'lucide-react';

// 1. Terima props dari page.tsx
export default function Navbar({ activeMenu, setActiveMenu }: { activeMenu: string, setActiveMenu: (name: string) => void }) {
  return (
    <aside className="w-20 lg:w-64 bg-[#1a1b26] border-r-4 border-slate-700 flex flex-col z-20 shadow-[4px_0_0_rgba(0,0,0,0.5)]">
      <div className="h-20 w-full flex items-center justify-center border-b-4 border-slate-700 shrink-0 bg-[#24283b]">
        <img 
          src="/logo.png"
          alt="Daily Dungeon" 
          className="w-[85%] max-h-full object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,1)] transform -translate-x-1" 
        />
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-3 px-3 overflow-y-auto">
        {[
          { name: "Dashboard", icon: LayoutDashboard },
          { name: "Keuangan", icon: Wallet },
          { name: "Kalender", icon: Calendar },
          { name: "Focus Arena", icon: Timer },
          { name: "Statistik", icon: BarChart2 },
          { name: "Toko & Loot", icon: ShoppingCart },
        ].map((item, idx) => {
          // 2. Cek apakah menu ini sedang aktif berdasarkan state global
          const isActive = activeMenu === item.name;

          return (
            <button 
              key={idx} 
              // 3. Jalankan fungsi ganti halaman saat diklik
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-4 px-4 py-3 border-2 transition-all group rounded-none ${
                isActive 
                  ? 'bg-[#24283b] border-cyan-500 text-cyan-400 shadow-[4px_4px_0_#000] translate-x-[-2px] translate-y-[-2px]' 
                  : 'border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-cyan-400' : ''} />
              <span className="hidden lg:block text-sm font-bold tracking-wider">{item.name}</span>
              {isActive && <ChevronRight size={16} className="hidden lg:block ml-auto opacity-50" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t-4 border-slate-700 flex items-center justify-center lg:justify-start gap-3 cursor-pointer hover:bg-slate-800 transition-colors shrink-0 bg-[#24283b]">
        <div className="w-10 h-10 bg-slate-800 rounded-none border-2 border-slate-600 flex items-center justify-center overflow-hidden shadow-[2px_2px_0_#000]">
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