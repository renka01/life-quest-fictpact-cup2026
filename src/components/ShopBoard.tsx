"use client";
import React from 'react';
import { useStore } from '@/store/useStore';
import { 
  Coins, 
  ShoppingBag, 
  Sword, 
  Shield, 
  FlaskConical, 
  Package 
} from 'lucide-react';

export default function ShopBoard() {
  const { stats } = useStore();

  // Data barang dengan tambahan properti Icon
  const items = [
    { id: 1, name: "Wooden Sword", price: 1, rarity: "common", icon: <Sword size={32} className="text-slate-400" /> },
    { id: 2, name: "Iron Helmet", price: 15, rarity: "uncommon", icon: <Shield size={32} className="text-slate-500" /> },
    { id: 3, name: "Health Potion", price: 25, rarity: "rare", icon: <FlaskConical size={32} className="text-pink-500" /> },
    { id: 4, name: "Mystery Chest", price: 100, rarity: "legendary", icon: <Package size={32} className="text-amber-500" /> },
  ];

  return (
    <div className="p-6">
      {/* HEADER TOKO */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-slate-700 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <ShoppingBag className="text-cyan-400" /> TOKO & LOOT
        </h2>
        <div className="bg-slate-800 px-4 py-2 border-2 border-amber-500 flex items-center gap-2">
          <Coins size={16} className="text-amber-400" />
          <span className="font-pixel text-xs text-amber-400">{stats.gold}</span>
        </div>
      </div>

      {/* GRID AREA */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <button 
            key={item.id} 
            className="relative flex flex-col w-full aspect-[3/4] bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all overflow-hidden group text-left"
          >
            {/* Langkah A: Titik Rarity di pojok kanan atas */}
            <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.1)] ${
              item.rarity === 'legendary' ? 'bg-amber-400' : 
              item.rarity === 'rare' ? 'bg-blue-500' : 
              item.rarity === 'uncommon' ? 'bg-emerald-500' :
              'bg-purple-500'
            }`} />

            {/* Langkah B: Area Gambar (Tengah) */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 gap-3">
              <div className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center leading-none">
                {item.name}
              </span>
            </div>

            {/* Langkah C: Baris Harga (Bawah) */}
            <div className="bg-[#fff9e6] border-t border-slate-100 py-3 flex items-center justify-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center border border-amber-600">
                <Coins size={10} className="text-amber-900" />
              </div>
              <span className="font-bold text-slate-700 text-xs">{item.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}