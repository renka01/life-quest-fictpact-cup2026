"use client";
import React from 'react';
import Technomancer from '@/components/art/Technomancer';
import TechnomancerGirl from '@/components/art/TechnomancerGirl';
import { Heart, Star, RefreshCw, Shield, Sword, Brain, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ITEMS } from '@/components/ShopBoard';

export default function StatusPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { stats, userProfile, equippedItems } = useStore();

  // ── Hitung bonus stats ──────────────────────────────────────
  const baseSTR = 10 + stats.level * 2;
  const baseDEF = 5  + stats.level;
  const baseINT = 8  + Math.floor(stats.level * 1.5);

  let bonusSTR = 0, bonusDEF = 0, bonusINT = 0;

  Object.values(equippedItems || {})
    .map(id => ITEMS.find(i => i.id === id))
    .filter(Boolean)
    .forEach(item => {
      if (!item) return;
      item.stat.toUpperCase().split('/').map(p => p.trim()).forEach(part => {
        const m = part.match(/(.+)\s+\+(\d+)/);
        if (!m) return;
        const [, name, raw] = m;
        const val = parseInt(raw);
        const n = name.trim();
        if (n === 'ALL STATS')                          { bonusSTR += val; bonusDEF += val; bonusINT += val; }
        else if (['ATK','STR','RANGE ATK'].includes(n)) bonusSTR += val;
        else if (['DEF','MAGIC DEF'].includes(n))       bonusDEF += val;
        else if (['MAGIC ATK','INT','SHADOW ATK'].includes(n)) bonusINT += val;
      });
    });

  const totalSTR = baseSTR + bonusSTR;
  const totalDEF = baseDEF + bonusDEF;
  const totalINT = baseINT + bonusINT;

  // ── Avatar renderer ─────────────────────────────────────────
  // weapon, armor, helmet → all passed as props into the SVG sprite.
  // The character redraws torso/arms/helmet internally.
  // Only CLOAK (background layer) and ACCESSORY (small neck piece)
  // remain as HTML overlays because they don't replace body parts.
  const renderAvatar = () => {
    const props = {
      weaponId: equippedItems?.weapon,   // sword / bow
      armorId:  equippedItems?.armor,    // changes torso + arm pixels
      helmetId: equippedItems?.helmet,   // changes head area pixels
    };

    if (userProfile?.gender === 'Wanita') return <TechnomancerGirl {...props}/>;
    if (userProfile?.gender === 'Pria')   return <Technomancer      {...props}/>;
    return <User size={48} className="text-slate-500"/>;
  };

  return (
    <aside
      className={`
        fixed top-0 right-0 h-full w-64 bg-[#1a1b26] border-l-4 border-slate-700
        p-6 flex-col gap-6 z-50 shadow-[-4px_0_0_rgba(0,0,0,0.5)] overflow-y-auto
        shrink-0 transition-transform duration-300 pb-24
        ${isOpen ? 'translate-x-0 flex' : 'translate-x-full hidden xl:flex'}
        xl:static xl:translate-x-0 xl:w-80
      `}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <h3 className="font-pixel text-[10px] text-cyan-400 tracking-widest">STATUS LOG</h3>
        <button className="text-slate-500 hover:text-white"><RefreshCw size={14}/></button>
      </div>

      {/* ── Avatar card ───────────────────────────────────── */}
      <div className="bg-[#24283b] p-3 rounded-none border-4 border-slate-700 shadow-[8px_8px_0_#000] flex flex-col gap-4">

        {userProfile?.nickname && (
          <div className="text-center mt-2">
            <h4 className="font-bold text-white uppercase tracking-wider">{userProfile.nickname}</h4>
            <p className="text-[10px] text-slate-400 uppercase font-pixel mt-1 mb-2">
              Lv. {stats.level} Adventurer
            </p>
            <button
              onClick={() => useStore.getState().setUserProfile({ nickname: '', gender: null, avatarId: null })}
              className="text-[8px] bg-red-500/20 text-red-400 px-2 py-1 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors font-pixel uppercase"
            >
              Reset Char
            </button>
          </div>
        )}

        {/* Character viewport */}
        <div className="w-full aspect-square bg-[#1a1b26] border-4 border-slate-700 rounded-none flex items-center justify-center relative overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-50"/>
          {/* Floor glow */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/40 to-transparent"/>

          <div className="transform scale-[1.2] relative z-10 mt-10 flex items-center justify-center">

            {/* ── LAYER 0: Cloak (behind sprite) ── */}
            {/* Cloak is a full-body overlay behind the character.
                It stays as an HTML layer because it wraps AROUND
                the sprite silhouette — it doesn't replace body pixels. */}
            {equippedItems?.cloak && (
              <div
                className="absolute top-[-10px] left-[50%] -translate-x-1/2 -z-10 pointer-events-none opacity-80"
                style={{ transform: 'translateX(-50%) scale(2)' }}
              >
                {ITEMS.find(i => i.id === equippedItems.cloak)?.icon}
              </div>
            )}

            {/* ── LAYER 1: Character sprite ──
                weapon  → drawn inside SVG at hand position
                armor   → torso + arm pixels replaced inside SVG
                helmet  → head pixels replaced inside SVG
                (no more overlay divs for these three)            */}
            {renderAvatar()}

            {/* ── LAYER 2: Accessory (neck amulet) ──
                Small icon floated at collar. Kept as overlay because
                it's a tiny decorative piece, not a body-shape change. */}
            {equippedItems?.accessory && (
              <div
                className="absolute top-[28px] left-[50%] -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                style={{ transform: 'translateX(-50%) scale(0.55)' }}
              >
                {ITEMS.find(i => i.id === equippedItems.accessory)?.icon}
              </div>
            )}

          </div>
        </div>

        {/* D-pad + buttons */}
        <div className="flex justify-between items-center px-2 pb-2">
          <div className="relative w-12 h-12">
            <div className="absolute top-[16px] left-0 w-12 h-[16px] bg-slate-900 shadow-[2px_2px_0_#000]"/>
            <div className="absolute left-[16px] top-0 w-[16px] h-12 bg-slate-900 shadow-[2px_2px_0_#000]"/>
            <div className="absolute left-[20px] top-[20px] w-2 h-2 bg-slate-700 rounded-full"/>
          </div>
          <div className="flex gap-3 rotate-[-15deg]">
            <div className="w-5 h-5 rounded-full bg-pink-500 shadow-[0_3px_0_#9d174d] mt-4 border border-pink-400"/>
            <div className="w-5 h-5 rounded-full bg-cyan-500 shadow-[0_3px_0_#0891b2] mb-4 border border-cyan-400"/>
          </div>
        </div>
      </div>

      {/* ── Stat bars ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* HP */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="font-pixel text-[8px] text-pink-500 flex items-center gap-1.5">
              <Heart size={10} className="fill-pink-500"/> NYAWA
            </span>
            <span className="font-pixel text-[8px] text-slate-400">{stats.hp}/{stats.maxHp}</span>
          </div>
          <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 overflow-hidden">
            <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}/>
          </div>
        </div>

        {/* EXP */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="font-pixel text-[8px] text-amber-400 flex items-center gap-1.5">
              <Star size={10} className="fill-amber-400"/> EXP (LVL. {stats.level})
            </span>
            <span className="font-pixel text-[8px] text-slate-400">{stats.exp}/{stats.maxExp}</span>
          </div>
          <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }}/>
          </div>
          <div className="flex justify-between text-[8px] text-slate-500 font-bold mt-1">
            <span>NEXT LVL</span>
            <span>{stats.maxExp - stats.exp} XP LEFT</span>
          </div>
        </div>

        {/* Attributes */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t-2 border-slate-700 border-dashed">
          <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
            <Sword size={12} className="text-pink-500"/>
            <span className="text-[8px] font-bold text-slate-400">STR</span>
            <span className="text-xs font-pixel text-white flex items-center">
              {totalSTR}{bonusSTR > 0 && <span className="text-[8px] text-emerald-400 ml-1">+{bonusSTR}</span>}
            </span>
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
            <Shield size={12} className="text-cyan-500"/>
            <span className="text-[8px] font-bold text-slate-400">DEF</span>
            <span className="text-xs font-pixel text-white flex items-center">
              {totalDEF}{bonusDEF > 0 && <span className="text-[8px] text-emerald-400 ml-1">+{bonusDEF}</span>}
            </span>
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center gap-1">
            <Brain size={12} className="text-amber-500"/>
            <span className="text-[8px] font-bold text-slate-400">INT</span>
            <span className="text-xs font-pixel text-white flex items-center">
              {totalINT}{bonusINT > 0 && <span className="text-[8px] text-emerald-400 ml-1">+{bonusINT}</span>}
            </span>
          </div>
        </div>

      </div>
    </aside>
  );
}
