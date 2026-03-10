"use client";
import React from 'react';
import Technomancer from '@/components/art/Technomancer';
import { LayoutDashboard, Calendar, Timer, BarChart2, ShoppingCart, ChevronRight, Wallet, ListTodo } from 'lucide-react';

// 1. Terima props dari page.tsx
export default function Navbar({ activeMenu, setActiveMenu }: { activeMenu: string, setActiveMenu: (name: string) => void }) {
  return (
    <aside className="fixed bottom-0 left-0 w-full h-16 bg-[#1a1b26] border-t-4 border-slate-700 flex flex-row z-50 shadow-[0_-4px_0_rgba(0,0,0,0.5)] md:static md:h-screen md:w-20 lg:w-64 md:flex-col md:border-t-0 md:border-r-4 md:shadow-[4px_0_0_rgba(0,0,0,0.5)]">
      <div className="hidden md:flex h-20 w-full items-center justify-center border-b-4 border-slate-700 shrink-0 bg-[#24283b]">
        <img 
          src="/logo.png"
          alt="Daily Dungeon" 
          className="w-[85%] max-h-full object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,1)] transform -translate-x-1" 
        />
      </div>

      <nav className="flex-1 flex flex-row items-center justify-around w-full px-1 overflow-x-auto md:flex-col md:justify-start md:items-stretch md:py-6 md:gap-3 md:px-3 md:overflow-y-auto no-scrollbar">
        {[
          { name: "Dashboard", icon: LayoutDashboard },
          { name: "Misi", icon: ListTodo },
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
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 px-1 py-1 md:px-4 md:py-3 border-0 md:border-2 transition-all group rounded-none flex-1 md:flex-none w-full ${
                isActive 
                  ? 'text-cyan-400 md:bg-[#24283b] md:border-cyan-500 md:shadow-[4px_4px_0_#000] md:translate-x-[-2px] md:translate-y-[-2px]' 
                  : 'text-slate-500 hover:text-slate-300 md:border-transparent md:hover:bg-slate-800 md:hover:border-slate-600'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : ''} />
              <span className="text-[9px] md:hidden lg:block md:text-sm md:font-bold tracking-wider">{item.name}</span>
              {isActive && <ChevronRight size={16} className="hidden lg:block ml-auto opacity-50" />}
            </button>
          );
        })}
      </nav>

      <div className="hidden md:flex p-4 border-t-4 border-slate-700 items-center justify-center lg:justify-start gap-3 cursor-pointer hover:bg-slate-800 transition-colors shrink-0 bg-[#24283b]">
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