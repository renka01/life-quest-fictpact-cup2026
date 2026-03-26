"use client";
import React, { useState } from 'react';
import Technomancer from '@/components/art/Technomancer';
import TechnomancerGirl from '@/components/art/TechnomancerGirl';
import { Heart, Star, RefreshCw, Shield, Sword, Brain, User, X, Edit3 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ITEMS } from '@/components/ShopBoard';
import { translations } from '@/utils/translations';

export default function StatusPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { stats, userProfile, setUserProfile, equippedItems, playSound } = useStore();
  const tLog = translations[useStore().settings?.language || 'id']?.statusLog || translations['id'].statusLog;
  const tUi = translations[useStore().settings?.language || 'id']?.ui || translations['id'].ui;

  // State untuk Modal Edit Bio
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [bioInput, setBioInput] = useState('');

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
  const renderAvatar = () => {
    const props = {
      weaponId: equippedItems?.weapon,
      armorId:  equippedItems?.armor,
      helmetId: equippedItems?.helmet,
      cloakId:  equippedItems?.cloak,
      accessoryId: equippedItems?.accessory
    };

    if (userProfile?.gender === 'Wanita') return <TechnomancerGirl {...props}/>;
    if (userProfile?.gender === 'Pria')   return <Technomancer      {...props}/>;
    return <User size={48} className="text-slate-500"/>;
  };

  // ── Fungsi Simpan Bio ────────────────────────────────────────
  const handleSaveBio = () => {
    setUserProfile({ bio: bioInput.trim() });
    if (playSound) playSound('success');
    setIsBioModalOpen(false);
  };

  const handleOpenBioModal = () => {
    setBioInput(userProfile?.bio || '');
    setIsBioModalOpen(true);
    if (playSound) playSound('click');
  };

  return (
    <>
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-[#1a1b26] border-l-4 border-slate-700
          p-6 flex-col gap-6 z-40 shadow-[-4px_0_0_rgba(0,0,0,0.5)] overflow-y-auto
          shrink-0 transition-transform duration-300 pb-24
          ${isOpen ? 'translate-x-0 flex' : 'translate-x-full hidden xl:flex'}
          xl:static xl:translate-x-0 xl:w-80
        `}
      >
        {/* ── Header ────────────────────────────────────────── */}
        <div className="flex justify-between items-center">
          <h3 className="font-pixel text-[10px] text-amber-400 tracking-widest">{tLog.title}</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.reload()} className="text-slate-500 hover:text-white active:rotate-180 transition-transform duration-300">
              <RefreshCw size={14}/>
            </button>
            <button onClick={onClose} className="xl:hidden text-slate-500 hover:text-white transition-colors">
              <X size={20}/>
            </button>
          </div>
        </div>

        {/* ── Avatar card ───────────────────────────────────── */}
        <div className="bg-[#24283b] p-3 rounded-none border-4 border-slate-700 shadow-[8px_8px_0_#000] flex flex-col gap-4">

          {(userProfile?.nickname || userProfile?.accountName) && (
            <div className="text-center mt-2">
              <h4 className="font-bold text-white uppercase tracking-wider">{userProfile.nickname || userProfile.accountName}</h4>
              {userProfile.nickname && userProfile.accountName && (
                <p className="text-[10px] text-slate-500 font-bold mt-1">@{userProfile.accountName}</p>
              )}

              <p className="text-[10px] text-slate-400 uppercase font-pixel mt-3 mb-2">
                Lv. {stats.level} Adventurer
              </p>
              <button
                onClick={() => useStore.getState().setUserProfile({ nickname: '', gender: null, avatarId: null })}
                className="text-[8px] bg-red-500/20 text-red-400 px-2 py-1 border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors font-pixel uppercase"
              >
                {tLog.resetChar}
              </button>
            </div>
          )}

          {/* Character viewport */}
          <div className="w-full aspect-square bg-[#1a1b26] border-4 border-slate-700 rounded-none flex items-center justify-center relative overflow-hidden mt-2">
            {/* Grid bg */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-50"/>
            {/* Floor glow */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/40 to-transparent"/>

            <div className="transform scale-[0.75] relative z-10 mt-6 flex items-center justify-center [&_svg]:overflow-visible animate-[pulse_4s_ease-in-out_infinite]">
              {renderAvatar()}
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
                <Heart size={10} className="fill-pink-500"/> {tLog.hp}
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
                <Star size={10} className="fill-amber-400"/> {tLog.exp} (LVL. {stats.level})
              </span>
              <span className="font-pixel text-[8px] text-slate-400">{stats.exp}/{stats.maxExp}</span>
            </div>
            <div className="h-4 bg-[#1a1b26] border-2 border-slate-700 overflow-hidden">
              <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }}/>
            </div>
            <div className="flex justify-between text-[8px] text-slate-500 font-bold mt-1">
              <span>{tLog.nextLvl}</span>
              <span>{stats.maxExp - stats.exp} {tLog.xpLeft}</span>
            </div>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t-2 border-slate-700 border-dashed">
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center justify-center gap-1 min-w-0 shadow-md">
              <Sword size={12} className="text-pink-500 shrink-0"/>
              <span className="text-[8px] font-bold text-slate-400">STR</span>
              <span className="text-[10px] sm:text-xs font-pixel text-white flex flex-col sm:flex-row items-center sm:gap-1 text-center leading-tight">
                <span>{totalSTR}</span>{bonusSTR > 0 && <span className="text-[8px] text-emerald-400">+{bonusSTR}</span>}
              </span>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center justify-center gap-1 min-w-0 shadow-md">
              <Shield size={12} className="text-cyan-500 shrink-0"/>
              <span className="text-[8px] font-bold text-slate-400">DEF</span>
              <span className="text-[10px] sm:text-xs font-pixel text-white flex flex-col sm:flex-row items-center sm:gap-1 text-center leading-tight">
                <span>{totalDEF}</span>{bonusDEF > 0 && <span className="text-[8px] text-emerald-400">+{bonusDEF}</span>}
              </span>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-700 flex flex-col items-center justify-center gap-1 min-w-0 shadow-md">
              <Brain size={12} className="text-amber-500 shrink-0"/>
              <span className="text-[8px] font-bold text-slate-400">INT</span>
              <span className="text-[10px] sm:text-xs font-pixel text-white flex flex-col sm:flex-row items-center sm:gap-1 text-center leading-tight">
                <span>{totalINT}</span>{bonusINT > 0 && <span className="text-[8px] text-emerald-400">+{bonusINT}</span>}
              </span>
            </div>
          </div>

          {/* ── BIO / DESKRIPSI (CLICKABLE) ── */}
          <div 
            onClick={handleOpenBioModal}
            className="mt-2 bg-slate-900 border-2 border-slate-700 p-3 text-center shadow-[4px_4px_0_#000] cursor-pointer hover:border-amber-500 hover:shadow-[4px_4px_0_#f59e0b] group transition-all relative"
          >
            {/* Ikon Edit kecil yang muncul saat hover */}
            <div className="absolute top-2 right-2 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-opacity">
              <Edit3 size={12} />
            </div>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-2 font-bold group-hover:text-amber-500 transition-colors">
              {tLog.bio}
            </p>
            <p className="text-[11px] text-slate-300 italic px-1 font-mono break-words leading-relaxed group-hover:text-white transition-colors">
              {userProfile?.bio ? `"${userProfile.bio}"` : `"${tLog.bioPh}"`}
            </p>
          </div>

        </div>
      </aside>

      {/* ── MODAL EDIT BIO (Dari Settings) ── */}
      {isBioModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-[#1a1b26] border-4 border-amber-500 shadow-[8px_8px_0_#000] flex flex-col animate-in zoom-in duration-200">
            <div className="bg-[#24283b] border-b-4 border-amber-500 p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Edit3 size={14} /> Ubah {tLog.bio}
              </h3>
              <button onClick={() => setIsBioModalOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6">
              <textarea 
                value={bioInput} 
                onChange={e => setBioInput(e.target.value)} 
                className="w-full bg-slate-900 border-2 border-slate-600 p-3 text-white outline-none focus:border-amber-400 min-h-[120px] resize-none font-mono text-sm leading-relaxed" 
                placeholder="Tuliskan cerita singkat tentang petualanganmu..." 
                autoFocus 
              />
              <p className="text-[10px] text-slate-500 text-right mt-2 italic">
                Tips: Gunakan kata-kata penyemangat!
              </p>
            </div>
            <div className="p-4 border-t-2 border-slate-700 bg-[#24283b] flex justify-end gap-3">
              <button 
                onClick={() => setIsBioModalOpen(false)} 
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase transition-colors"
              >
                {tUi?.cancel || 'Batal'}
              </button>
              <button 
                onClick={handleSaveBio} 
                className="px-6 py-2 bg-amber-500 text-amber-950 text-xs font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none hover:bg-amber-400 transition-all"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}