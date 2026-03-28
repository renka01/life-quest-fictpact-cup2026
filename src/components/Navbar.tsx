"use client";
import React from 'react';
import Technomancer from '@/components/art/Technomancer';
import { useStore } from '@/store/useStore'; // <-- Tambahan import store
import { 
  LayoutDashboard, 
  Calendar, 
  Timer, 
  BarChart2, 
  ShoppingCart, 
  ChevronRight, 
  Wallet, 
  ListTodo,
  User 
} from 'lucide-react';
import { translations } from '@/utils/translations';

export default function Navbar({ activeMenu, setActiveMenu }: { activeMenu: string, setActiveMenu: (name: string) => void }) {
  const { userProfile, stats, settings } = useStore();
  const t = translations[settings?.language || 'id']?.nav || translations['id'].nav;

  return (
    <aside className="fixed bottom-0 left-0 w-full h-16 bg-zinc-900 border-t-4 border-zinc-700 flex flex-row z-50 shadow-[0_-4px_0_rgba(0,0,0,0.5)] md:static md:h-screen md:w-20 lg:w-64 md:flex-col md:border-t-0 md:border-r-4 md:shadow-[4px_0_0_rgba(0,0,0,0.5)]">
      
      {/* Logo Section */}
      <div className="hidden md:flex h-20 w-full items-center justify-center border-b-4 border-zinc-700 shrink-0 bg-zinc-800">
        <img 
          src="/logo.png"
          alt="Daily Dungeon" 
          className="w-[85%] max-h-full object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,1)] transform -translate-x-1" 
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-row items-center justify-start sm:justify-around w-full px-2 overflow-x-auto md:flex-col md:justify-start md:items-stretch md:py-6 md:gap-3 md:px-3 md:overflow-y-auto no-scrollbar scroll-smooth">
        {[
          { id: "Dashboard", name: t.Dashboard, icon: LayoutDashboard },
          { id: "Misi", name: t.Misi, icon: ListTodo },
          { id: "Keuangan", name: t.Keuangan, icon: Wallet },
          { id: "Kalender", name: t.Kalender, icon: Calendar },
          { id: "Focus Arena", name: t.FocusArena, icon: Timer },
          { id: "Statistik", name: t.Statistik, icon: BarChart2 },
          { id: "Toko & Loot", name: t.TokoLoot, icon: ShoppingCart },
        ].map((item, idx) => {
          const isActive = activeMenu === item.id;

          return (
            <button 
              key={idx} 
              onClick={() => setActiveMenu(item.id)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 px-2 py-2 md:px-4 md:py-3 border-0 md:border-2 transition-all group rounded-none shrink-0 min-w-[64px] sm:min-w-0 sm:flex-1 md:flex-none w-auto md:w-full ${
                isActive 
                  ? 'text-amber-400 md:bg-zinc-800 md:border-amber-500 md:shadow-[4px_4px_0_#000] md:translate-x-[-2px] md:translate-y-[-2px]' 
                  : 'text-zinc-500 hover:text-zinc-300 md:border-transparent md:hover:bg-zinc-800 md:hover:border-zinc-600'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''} />
              <span className="text-[9px] md:hidden lg:block md:text-sm md:font-bold tracking-wider">{item.name}</span>
              {isActive && <ChevronRight size={16} className="hidden lg:block ml-auto opacity-50" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}