"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { ITEMS } from '@/components/ShopBoard';
import Technomancer from '@/components/art/Technomancer';
import TechnomancerGirl from '@/components/art/TechnomancerGirl';
import { Swords, Heart, Star, Shield, Trophy, SkipForward, RefreshCw, FlaskConical, Zap, Timer, Play, Square, Skull, Coins } from 'lucide-react';
import { translations } from '@/utils/translations';

// ═══════════════════════════════════════════════════════════════════════
// BOSS SPRITES (pixel art)
// ═══════════════════════════════════════════════════════════════════════

const GoblinSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes g-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.gi{animation:g-idle 0.6s steps(2) infinite}`}</style>
    <g className="gi">
      <rect x="11" y="5"  width="10" height="8"  fill="#4ade80"/>
      <rect x="10" y="6"  width="12" height="6"  fill="#22c55e"/>
      <rect x="9"  y="7"  width="2"  height="3"  fill="#fef08a"/>
      <rect x="21" y="7"  width="2"  height="3"  fill="#fef08a"/>
      <rect x="9"  y="8"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="22" y="8"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="13" y="11" width="6"  height="1"  fill="#15803d"/>
      <rect x="14" y="11" width="1"  height="1"  fill="#f8fafc"/>
      <rect x="17" y="11" width="1"  height="1"  fill="#f8fafc"/>
      <rect x="12" y="4"  width="8"  height="2"  fill="#15803d"/>
      <rect x="11" y="5"  width="2"  height="2"  fill="#15803d"/>
      <rect x="19" y="5"  width="2"  height="2"  fill="#15803d"/>
      <rect x="11" y="13" width="10" height="8"  fill="#15803d"/>
      <rect x="12" y="14" width="8"  height="6"  fill="#166534"/>
      <rect x="9"  y="13" width="3"  height="6"  fill="#22c55e"/>
      <rect x="20" y="13" width="3"  height="6"  fill="#22c55e"/>
      <rect x="23" y="13" width="4"  height="2"  fill="#94a3b8"/>
      <rect x="25" y="11" width="2"  height="2"  fill="#cbd5e1"/>
      <rect x="12" y="21" width="3"  height="4"  fill="#15803d"/>
      <rect x="17" y="21" width="3"  height="4"  fill="#166534"/>
    </g>
  </svg>
);

const OrcWarriorSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes o-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.oi{animation:o-idle 0.7s steps(2) infinite}`}</style>
    <g className="oi">
      <rect x="10" y="4"  width="12" height="9"  fill="#84cc16"/>
      <rect x="9"  y="5"  width="14" height="7"  fill="#65a30d"/>
      <rect x="8"  y="6"  width="2"  height="4"  fill="#4d7c0f"/>
      <rect x="22" y="6"  width="2"  height="4"  fill="#4d7c0f"/>
      <rect x="8"  y="7"  width="2"  height="2"  fill="#fef9c3"/>
      <rect x="22" y="7"  width="2"  height="2"  fill="#fef9c3"/>
      <rect x="8"  y="8"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="23" y="8"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="12" y="10" width="8"  height="1"  fill="#4d7c0f"/>
      <rect x="13" y="10" width="2"  height="1"  fill="#f8fafc"/>
      <rect x="17" y="10" width="2"  height="1"  fill="#f8fafc"/>
      <rect x="11" y="3"  width="10" height="2"  fill="#292524"/>
      <rect x="10" y="13" width="12" height="9"  fill="#78350f"/>
      <rect x="11" y="14" width="10" height="7"  fill="#92400e"/>
      <rect x="7"  y="13" width="4"  height="7"  fill="#65a30d"/>
      <rect x="21" y="13" width="4"  height="7"  fill="#65a30d"/>
      <rect x="5"  y="15" width="3"  height="5"  fill="#84cc16"/>
      <rect x="24" y="13" width="6"  height="2"  fill="#94a3b8"/>
      <rect x="28" y="11" width="2"  height="4"  fill="#cbd5e1"/>
      <rect x="11" y="22" width="4"  height="5"  fill="#65a30d"/>
      <rect x="17" y="22" width="4"  height="5"  fill="#4d7c0f"/>
    </g>
  </svg>
);

const DragonSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`
      @keyframes d-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
      @keyframes d-fire{0%,100%{opacity:1}50%{opacity:0.3}}
      .di{animation:d-idle 0.9s steps(2) infinite}
      .df{animation:d-fire 0.2s steps(2) infinite}
    `}</style>
    <g className="di">
      <rect x="7"  y="2"  width="4"  height="4"  fill="#dc2626"/>
      <rect x="21" y="2"  width="4"  height="4"  fill="#dc2626"/>
      <rect x="9"  y="5"  width="14" height="10" fill="#b91c1c"/>
      <rect x="10" y="6"  width="12" height="8"  fill="#dc2626"/>
      <rect x="8"  y="7"  width="3"  height="5"  fill="#991b1b"/>
      <rect x="21" y="7"  width="3"  height="5"  fill="#991b1b"/>
      <rect x="8"  y="8"  width="2"  height="2"  fill="#fef08a"/>
      <rect x="22" y="8"  width="2"  height="2"  fill="#fef08a"/>
      <rect x="8"  y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="23" y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="12" y="12" width="8"  height="1"  fill="#991b1b"/>
      <rect x="21" y="12" width="7"  height="3"  fill="#f97316" className="df"/>
      <rect x="24" y="11" width="5"  height="2"  fill="#fbbf24" className="df"/>
      <rect x="9"  y="15" width="14" height="8"  fill="#991b1b"/>
      <rect x="5"  y="13" width="5"  height="6"  fill="#b91c1c"/>
      <rect x="22" y="13" width="5"  height="6"  fill="#991b1b"/>
      <rect x="3"  y="11" width="4"  height="8"  fill="#dc2626"/>
      <rect x="25" y="11" width="4"  height="8"  fill="#b91c1c"/>
      <rect x="12" y="23" width="4"  height="4"  fill="#b91c1c"/>
      <rect x="16" y="23" width="4"  height="4"  fill="#991b1b"/>
      <rect x="19" y="21" width="9"  height="2"  fill="#7f1d1d"/>
    </g>
  </svg>
);

const DemonKingSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`
      @keyframes dk-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}
      @keyframes dk-aura{0%,100%{opacity:0.5}50%{opacity:1}}
      .dki{animation:dk-idle 1s steps(2) infinite}
      .dka{animation:dk-aura 0.5s steps(2) infinite}
    `}</style>
    <g className="dki">
      <rect x="5"  y="2"  width="2"  height="2"  fill="#a855f7" className="dka"/>
      <rect x="25" y="2"  width="2"  height="2"  fill="#a855f7" className="dka"/>
      <rect x="11" y="1"  width="2"  height="5"  fill="#1e293b"/>
      <rect x="19" y="1"  width="2"  height="5"  fill="#1e293b"/>
      <rect x="10" y="2"  width="2"  height="3"  fill="#334155"/>
      <rect x="20" y="2"  width="2"  height="3"  fill="#334155"/>
      <rect x="10" y="5"  width="12" height="9"  fill="#1e1b2e"/>
      <rect x="11" y="6"  width="10" height="7"  fill="#2d2b3d"/>
      <rect x="9"  y="7"  width="2"  height="5"  fill="#1e1b2e"/>
      <rect x="21" y="7"  width="2"  height="5"  fill="#1e1b2e"/>
      <rect x="10" y="8"  width="3"  height="2"  fill="#a855f7" className="dka"/>
      <rect x="19" y="8"  width="3"  height="2"  fill="#a855f7" className="dka"/>
      <rect x="11" y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="20" y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="13" y="12" width="6"  height="1"  fill="#1e1b2e"/>
      <rect x="14" y="12" width="1"  height="1"  fill="#f8fafc"/>
      <rect x="17" y="12" width="1"  height="1"  fill="#f8fafc"/>
      <rect x="11" y="5"  width="10" height="1"  fill="#fbbf24"/>
      <rect x="12" y="4"  width="2"  height="2"  fill="#fbbf24"/>
      <rect x="15" y="3"  width="2"  height="3"  fill="#fbbf24"/>
      <rect x="18" y="4"  width="2"  height="2"  fill="#fbbf24"/>
      <rect x="13" y="4"  width="1"  height="1"  fill="#dc2626"/>
      <rect x="15" y="3"  width="2"  height="1"  fill="#dc2626"/>
      <rect x="18" y="4"  width="1"  height="1"  fill="#dc2626"/>
      <rect x="9"  y="14" width="14" height="10" fill="#1e1b2e"/>
      <rect x="10" y="15" width="12" height="8"  fill="#2d2b3d"/>
      <rect x="7"  y="14" width="3"  height="8"  fill="#1e1b2e"/>
      <rect x="22" y="14" width="3"  height="8"  fill="#1e1b2e"/>
      <rect x="15" y="16" width="2"  height="6"  fill="#a855f7" opacity="0.3"/>
      <rect x="23" y="7"  width="2"  height="14" fill="#0f172a"/>
      <rect x="23" y="7"  width="2"  height="1"  fill="#475569"/>
      <rect x="21" y="19" width="6"  height="1"  fill="#1e293b"/>
      <rect x="11" y="24" width="4"  height="5"  fill="#1e1b2e"/>
      <rect x="17" y="24" width="4"  height="5"  fill="#2d2b3d"/>
    </g>
  </svg>
);

const ShadowMonarchSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`
      @keyframes sm-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}
      @keyframes sm-aura{0%,100%{opacity:0.6}50%{opacity:1}}
      @keyframes sm-eye{0%,100%{opacity:1}50%{opacity:0.2}}
      .smi{animation:sm-idle 1.2s steps(2) infinite}
      .sma{animation:sm-aura 0.4s steps(2) infinite}
      .sme{animation:sm-eye 0.3s steps(2) infinite}
    `}</style>
    <g className="smi">
      <rect x="2"  y="8"  width="2"  height="2"  fill="#4c1d95" className="sma"/>
      <rect x="28" y="6"  width="2"  height="2"  fill="#4c1d95" className="sma"/>
      <rect x="1"  y="18" width="2"  height="4"  fill="#6d28d9" opacity="0.4" className="sma"/>
      <rect x="29" y="16" width="2"  height="4"  fill="#6d28d9" opacity="0.4" className="sma"/>
      <rect x="10" y="0"  width="2"  height="5"  fill="#1e293b"/>
      <rect x="15" y="-1" width="2"  height="6"  fill="#0f172a"/>
      <rect x="20" y="0"  width="2"  height="5"  fill="#1e293b"/>
      <rect x="11" y="3"  width="10" height="2"  fill="#2d2b3d"/>
      <rect x="10" y="5"  width="12" height="9"  fill="#1a0533"/>
      <rect x="11" y="6"  width="10" height="7"  fill="#2e1065"/>
      <rect x="9"  y="7"  width="2"  height="5"  fill="#1a0533"/>
      <rect x="21" y="7"  width="2"  height="5"  fill="#1a0533"/>
      <rect x="10" y="8"  width="3"  height="2"  fill="#3b82f6" className="sme"/>
      <rect x="19" y="8"  width="3"  height="2"  fill="#3b82f6" className="sme"/>
      <rect x="11" y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="20" y="9"  width="1"  height="1"  fill="#1e293b"/>
      <rect x="12" y="5"  width="8"  height="1"  fill="#7c3aed" opacity="0.5"/>
      <rect x="9"  y="14" width="14" height="12" fill="#1a0533"/>
      <rect x="10" y="15" width="12" height="10" fill="#2e1065"/>
      <rect x="6"  y="14" width="4"  height="10" fill="#1a0533"/>
      <rect x="22" y="14" width="4"  height="10" fill="#2e1065"/>
      <rect x="4"  y="16" width="3"  height="8"  fill="#2e1065"/>
      <rect x="25" y="16" width="3"  height="8"  fill="#1a0533"/>
      <rect x="3"  y="20" width="2"  height="6"  fill="#3b0764"/>
      <rect x="27" y="20" width="2"  height="6"  fill="#3b0764"/>
      <rect x="15" y="17" width="2"  height="4"  fill="#7c3aed" opacity="0.7"/>
      <rect x="14" y="19" width="4"  height="1"  fill="#7c3aed" opacity="0.7"/>
      <rect x="22" y="4"  width="2"  height="18" fill="#0f172a"/>
      <rect x="22" y="4"  width="1"  height="16" fill="#4c1d95" opacity="0.4"/>
      <rect x="22" y="4"  width="2"  height="1"  fill="#7c3aed"/>
      <rect x="19" y="20" width="8"  height="1"  fill="#1a0533"/>
      <rect x="24" y="9"  width="1"  height="1"  fill="#a855f7" className="sma"/>
      <rect x="11" y="26" width="4"  height="4"  fill="#1a0533"/>
      <rect x="17" y="26" width="4"  height="4"  fill="#2e1065"/>
    </g>
  </svg>
);

// --- 5 MONSTER BARU ---

const SkeletonSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes skel-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.skeli{animation:skel-idle 0.8s steps(2) infinite}`}</style>
    <g className="skeli">
      <rect x="12" y="4" width="8" height="7" fill="#f8fafc"/>
      <rect x="13" y="7" width="2" height="2" fill="#0f172a"/>
      <rect x="17" y="7" width="2" height="2" fill="#0f172a"/>
      <rect x="14" y="8" width="1" height="1" fill="#38bdf8"/>
      <rect x="18" y="8" width="1" height="1" fill="#38bdf8"/>
      <rect x="15" y="11" width="2" height="8" fill="#e2e8f0"/>
      <rect x="12" y="13" width="8" height="1" fill="#cbd5e1"/>
      <rect x="13" y="15" width="6" height="1" fill="#cbd5e1"/>
      <rect x="14" y="17" width="4" height="1" fill="#cbd5e1"/>
      <rect x="10" y="13" width="2" height="7" fill="#e2e8f0"/>
      <rect x="20" y="13" width="2" height="7" fill="#e2e8f0"/>
      <rect x="8" y="18" width="2" height="4" fill="#94a3b8"/>
      <rect x="13" y="19" width="2" height="7" fill="#e2e8f0"/>
      <rect x="17" y="19" width="2" height="7" fill="#e2e8f0"/>
      <rect x="12" y="26" width="3" height="2" fill="#94a3b8"/>
      <rect x="17" y="26" width="3" height="2" fill="#94a3b8"/>
    </g>
  </svg>
);

const DireWolfSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes wolf-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.wolfi{animation:wolf-idle 0.6s steps(2) infinite}`}</style>
    <g className="wolfi">
      <rect x="10" y="12" width="16" height="10" fill="#334155"/>
      <rect x="12" y="14" width="12" height="8" fill="#1e293b"/>
      <rect x="4" y="8" width="8" height="8" fill="#475569"/>
      <rect x="5" y="5" width="2" height="3" fill="#334155"/>
      <rect x="9" y="5" width="2" height="3" fill="#334155"/>
      <rect x="2" y="12" width="4" height="4" fill="#1e293b"/>
      <rect x="7" y="11" width="1" height="1" fill="#ef4444"/>
      <rect x="10" y="11" width="1" height="1" fill="#ef4444"/>
      <rect x="26" y="13" width="4" height="3" fill="#334155"/>
      <rect x="28" y="16" width="2" height="3" fill="#1e293b"/>
      <rect x="10" y="22" width="3" height="6" fill="#0f172a"/>
      <rect x="21" y="22" width="3" height="6" fill="#0f172a"/>
      <rect x="6" y="22" width="2" height="4" fill="#1e293b"/>
      <rect x="17" y="22" width="2" height="4" fill="#1e293b"/>
    </g>
  </svg>
);

const MinotaurSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes mino-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.minoi{animation:mino-idle 0.8s steps(2) infinite}`}</style>
    <g className="minoi">
      <rect x="10" y="10" width="12" height="12" fill="#78350f"/>
      <rect x="12" y="4" width="8" height="6" fill="#451a03"/>
      <rect x="6" y="2" width="6" height="2" fill="#fef08a"/>
      <rect x="20" y="2" width="6" height="2" fill="#fef08a"/>
      <rect x="6" y="0" width="2" height="2" fill="#fde047"/>
      <rect x="24" y="0" width="2" height="2" fill="#fde047"/>
      <rect x="14" y="8" width="4" height="2" fill="#9ca3af"/>
      <rect x="13" y="6" width="2" height="1" fill="#ef4444"/>
      <rect x="17" y="6" width="2" height="1" fill="#ef4444"/>
      <rect x="7" y="10" width="3" height="8" fill="#92400e"/>
      <rect x="22" y="10" width="3" height="8" fill="#92400e"/>
      <rect x="11" y="22" width="4" height="6" fill="#451a03"/>
      <rect x="17" y="22" width="4" height="6" fill="#451a03"/>
      <rect x="25" y="8" width="2" height="20" fill="#292524"/>
      <rect x="26" y="6" width="6" height="8" fill="#94a3b8"/>
      <rect x="28" y="4" width="2" height="12" fill="#cbd5e1"/>
    </g>
  </svg>
);

const VampireLordSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes vamp-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.vampi{animation:vamp-idle 1s steps(2) infinite}`}</style>
    <g className="vampi">
      <rect x="6" y="6" width="20" height="22" fill="#0f172a"/>
      <rect x="8" y="8" width="16" height="20" fill="#9f1239"/>
      <rect x="14" y="4" width="4" height="4" fill="#f8fafc"/>
      <rect x="13" y="2" width="6" height="2" fill="#0f172a"/>
      <rect x="14" y="6" width="1" height="1" fill="#dc2626"/>
      <rect x="17" y="6" width="1" height="1" fill="#dc2626"/>
      <rect x="14" y="8" width="1" height="1" fill="#f8fafc"/>
      <rect x="17" y="8" width="1" height="1" fill="#f8fafc"/>
      <rect x="12" y="10" width="8" height="10" fill="#1e293b"/>
      <rect x="14" y="10" width="4" height="4" fill="#f8fafc"/>
      <rect x="15" y="10" width="2" height="8" fill="#dc2626"/>
      <rect x="8" y="20" width="4" height="2" fill="#0f172a"/>
      <rect x="20" y="20" width="4" height="2" fill="#0f172a"/>
      <rect x="4" y="4" width="4" height="8" fill="#1e293b"/>
      <rect x="24" y="4" width="4" height="8" fill="#1e293b"/>
      <rect x="4" y="2" width="2" height="2" fill="#0f172a"/>
      <rect x="26" y="2" width="2" height="2" fill="#0f172a"/>
    </g>
  </svg>
);

const CosmicBehemothSprite = () => (
  <svg viewBox="0 0 32 32" width="100" height="100" style={{ imageRendering: 'pixelated' }}>
    <style>{`
      @keyframes cos-idle{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
      @keyframes cos-glow{0%,100%{opacity:0.6}50%{opacity:1}}
      .cosi{animation:cos-idle 1.5s steps(2) infinite}
      .cosg{animation:cos-glow 0.8s steps(2) infinite}
    `}</style>
    <g className="cosi">
      <rect x="4" y="6" width="24" height="20" fill="#0f172a"/>
      <rect x="6" y="8" width="20" height="16" fill="#1e1b4b"/>
      <rect x="8" y="10" width="16" height="12" fill="#312e81"/>
      <rect x="12" y="12" width="8" height="8" fill="#86198f"/>
      <rect x="14" y="14" width="4" height="4" fill="#22d3ee" className="cosg"/>
      <rect x="15" y="15" width="2" height="2" fill="#cffafe"/>
      <rect x="8" y="8" width="2" height="2" fill="#22d3ee" className="cosg"/>
      <rect x="22" y="8" width="2" height="2" fill="#22d3ee" className="cosg"/>
      <rect x="2" y="12" width="4" height="8" fill="#312e81"/>
      <rect x="26" y="12" width="4" height="8" fill="#312e81"/>
      <rect x="0" y="14" width="2" height="4" fill="#22d3ee" className="cosg"/>
      <rect x="30" y="14" width="2" height="4" fill="#22d3ee" className="cosg"/>
      <rect x="10" y="26" width="4" height="4" fill="#1e1b4b"/>
      <rect x="18" y="26" width="4" height="4" fill="#1e1b4b"/>
      <rect x="11" y="28" width="2" height="2" fill="#22d3ee" className="cosg"/>
      <rect x="19" y="28" width="2" height="2" fill="#22d3ee" className="cosg"/>
      <rect x="6" y="2" width="2" height="4" fill="#86198f"/>
      <rect x="24" y="2" width="2" height="4" fill="#86198f"/>
    </g>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════
// BOSS DATA
// ═══════════════════════════════════════════════════════════════════════

interface Boss {
  id: number; name: string; title: string;
  maxHp: number; atk: number;
  gold: number; exp: number;
  rarity: 'common'|'uncommon'|'rare'|'epic'|'legendary';
  barColor: string; aura: string; border: string;
  sprite: React.ReactNode;
}

const BOSSES: Boss[] = [
  // --- EXISTING MONSTERS ---
  {
    id:1, name:'Goblin Scout',      title:'The Weakling',
    maxHp:120,  atk:6,  gold:15,  exp:20,
    rarity:'common',    barColor:'bg-green-500',  aura:'#22c55e', border:'border-green-600',
    sprite:<GoblinSprite/>,
  },
  {
    id:2, name:'Orc Warrior',       title:'Berserker of the East',
    maxHp:280,  atk:12, gold:40,  exp:60,
    rarity:'uncommon',  barColor:'bg-lime-500',   aura:'#84cc16', border:'border-lime-600',
    sprite:<OrcWarriorSprite/>,
  },
  {
    id:3, name:'Ancient Dragon',    title:'Keeper of the Flame',
    maxHp:550,  atk:22, gold:80,  exp:120,
    rarity:'rare',      barColor:'bg-red-500',    aura:'#ef4444', border:'border-red-600',
    sprite:<DragonSprite/>,
  },
  {
    id:4, name:'Demon King',        title:'Ruler of the Abyss',
    maxHp:900,  atk:35, gold:150, exp:220,
    rarity:'epic',      barColor:'bg-purple-500', aura:'#a855f7', border:'border-purple-600',
    sprite:<DemonKingSprite/>,
  },
  {
    id:5, name:'Shadow Monarch',    title:'Sung Jin-Woo',
    maxHp:1200, atk:50, gold:250, exp:380,
    rarity:'legendary', barColor:'bg-violet-500', aura:'#7c3aed', border:'border-violet-500',
    sprite:<ShadowMonarchSprite/>,
  },

  // --- NEW MONSTERS ---
  {
    id:6, name:'Undead Skeleton',   title:'Restless Bones',
    maxHp:150,  atk:8,  gold:18,  exp:25,
    rarity:'common',    barColor:'bg-zinc-400',  aura:'#cbd5e1', border:'border-zinc-500',
    sprite:<SkeletonSprite/>,
  },
  {
    id:7, name:'Dire Wolf',         title:'Beast of the Woods',
    maxHp:320,  atk:15, gold:45,  exp:70,
    rarity:'uncommon',  barColor:'bg-zinc-600',  aura:'#475569', border:'border-zinc-700',
    sprite:<DireWolfSprite/>,
  },
  {
    id:8, name:'Iron Minotaur',     title:'Labyrinth Guard',
    maxHp:600,  atk:25, gold:90,  exp:140,
    rarity:'rare',      barColor:'bg-orange-700', aura:'#c2410c', border:'border-orange-800',
    sprite:<MinotaurSprite/>,
  },
  {
    id:9, name:'Vampire Lord',      title:'Night Stalker',
    maxHp:950,  atk:40, gold:170, exp:250,
    rarity:'epic',      barColor:'bg-rose-700',   aura:'#be123c', border:'border-rose-800',
    sprite:<VampireLordSprite/>,
  },
  {
    id:10, name:'Cosmic Behemoth',  title:'Eater of Stars',
    maxHp:1500, atk:60, gold:300, exp:450,
    rarity:'legendary', barColor:'bg-cyan-500',   aura:'#06b6d4', border:'border-cyan-600',
    sprite:<CosmicBehemothSprite/>,
  },
];

const RARITY_LABEL: Record<string,string> = {
  common:'text-zinc-400', uncommon:'text-emerald-400',
  rare:'text-blue-400', epic:'text-purple-400', legendary:'text-amber-400',
};

// ═══════════════════════════════════════════════════════════════════════
// CONSUMABLES  (material items yang bisa dikonsumsi)
// ═══════════════════════════════════════════════════════════════════════

const CONSUMABLES: Record<number, { heal: number; label: string; color: string }> = {
  6:  { heal: 15,   label: 'Soul Crystal',  color: 'bg-purple-500'  },
  52: { heal: 30,   label: 'Mithril Ingot', color: 'bg-zinc-400'   },
  53: { heal: 40,   label: 'Beskar Ingot',  color: 'bg-zinc-600'   },
  54: { heal: 60,   label: 'Vibranium Ore', color: 'bg-indigo-500'  },
  55: { heal: 9999, label: 'Senzu Bean',    color: 'bg-emerald-500' }, // Full heal
  56: { heal: 20,   label: 'Slime Jelly',   color: 'bg-sky-500'     },
  57: { heal: 35,   label: 'Dragon Scale',  color: 'bg-red-500'     },
  58: { heal: 25,   label: 'Demon Horn',    color: 'bg-rose-700'    },
  59: { heal: 45,   label: 'Kryptonite',    color: 'bg-green-500'   },
  60: { heal: 50,   label: 'Star Fragment', color: 'bg-amber-400'   },
};

// ═══════════════════════════════════════════════════════════════════════
// DAMAGE NUMBER
// ═══════════════════════════════════════════════════════════════════════

interface DmgNum { id:number; val:number; crit:boolean; x:number; }

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

type Phase = 'select' | 'battle' | 'victory' | 'defeat';

export default function FocusArena() {
  const {
    stats, equippedItems, inventory, userProfile,
    _applyReward, takeDamage, healPlayer, consumeItem, recordBossDefeated
  } = useStore();

  const [phase,       setPhase]       = useState<Phase>('select');
  const [boss,        setBoss]        = useState<Boss | null>(null);
  const [bossHp,      setBossHp]      = useState(0);
  const [localHp,     setLocalHp]     = useState(stats.hp);  // local copy for battle
  const [isAttacking, setIsAttacking] = useState(false);
  const [bossHit,     setBossHit]     = useState(false);
  const [playerHit,   setPlayerHit]   = useState(false);
  const [battleLog,   setBattleLog]   = useState<string[]>([]);
  const [dmgNums,     setDmgNums]     = useState<DmgNum[]>([]);
  const [combo,       setCombo]       = useState(0);
  const { settings } = useStore();
  const tFocus = translations[settings?.language || 'id']?.focus || translations['id'].focus;

  // Pomodoro States
  const [focusMinutes, setFocusMinutes] = useState<number | string>(25);
  const [timeLeft,     setTimeLeft]     = useState(0);
  const [isFocusing,   setIsFocusing]   = useState(false);
  const [canAttack,    setCanAttack]    = useState(false);

  const dmgIdRef    = useRef(0);

  // ── Pomodoro Timer countdown ─────────────────────────────────────
  useEffect(() => {
    if (!isFocusing || timeLeft <= 0) {
      if (isFocusing && timeLeft === 0) {
        setIsFocusing(false);
        setCanAttack(true);
        new Audio('/sounds/success.mp3').play().catch(() => {}); // Bunyi timer selesai
        addLog(`[TIME] Waktu fokus selesai! SEKARANG SERANG!`);
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isFocusing, timeLeft]);

  // ── Win / lose checks ──────────────────────────────────────
  useEffect(() => {
    if (phase !== 'battle' || !boss) return;
    if (bossHp <= 0) {
      _applyReward(boss.exp, boss.gold, 1);
      if (stats.hp > localHp) {
        takeDamage(stats.hp - localHp);
      }
      if (recordBossDefeated) recordBossDefeated();
      addLog(`[WIN] VICTORY! ${boss.name} defeated! +${boss.gold}G +${boss.exp}XP`);
      setTimeout(() => setPhase('victory'), 600);
    }
  }, [bossHp, phase, boss]);

  useEffect(() => {
    if (phase !== 'battle') return;
    if (localHp <= 0) {
      if (takeDamage) takeDamage(Math.floor(stats.maxHp * 0.3)); // penalty 30% HP
      addLog(`[DEFEAT] You have fallen... HP penalty applied.`);
      setTimeout(() => setPhase('defeat'), 600);
    }
  }, [localHp, phase]);

  // ── Calc player stats from equipment ───────────────────────
  const calcStats = useCallback(() => {
    const baseATK = 10 + stats.level * 3;
    const baseDEF = 5  + stats.level;
    const baseINT = 8  + Math.floor(stats.level * 1.5);
    let bATK = 0, bDEF = 0, bINT = 0;

    Object.values(equippedItems || {})
      .map((id: any) => ITEMS.find(i => i.id === id))
      .filter(Boolean)
      .forEach((item: any) => {
        if (!item) return;
        item.stat.toUpperCase().split('/').map((p: string) => p.trim()).forEach((part: string) => {
          const m = part.match(/(.+?)\s*\+(\d+)/);
          if (!m) return;
          const n = m[1].trim(); const v = parseInt(m[2]);
          if (n === 'ALL STATS') { bATK += v; bDEF += v; bINT += v; return; }
          if (['ATK','STR','RANGE ATK','MAGIC ATK'].some(s => n.includes(s))) bATK += v;
          else if (['DEF','MAGIC DEF'].some(s => n.includes(s))) bDEF += v;
          else if (n.includes('INT')) bINT += v;
        });
      });

    return { atk: baseATK + bATK, def: baseDEF + bDEF, int: baseINT + bINT };
  }, [equippedItems, stats.level]);

  const pStats = calcStats();

  // ── Helpers ────────────────────────────────────────────────
  const addLog = (msg: string) => setBattleLog(prev => [msg, ...prev].slice(0, 25));

  const spawnDmg = (val: number, crit: boolean) => {
    const id = ++dmgIdRef.current;
    const x  = 30 + Math.random() * 40;
    setDmgNums(prev => [...prev, { id, val, crit, x }]);
    setTimeout(() => setDmgNums(prev => prev.filter(d => d.id !== id)), 900);
  };

  // Format Waktu
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── Player attacks ─────────────────────────────────────────
  const doAttack = useCallback(() => {
    if (!boss || phase !== 'battle' || !canAttack || bossHp <= 0) return;

    const newCombo = combo + 1;
    setCombo(newCombo);

    const comboBonus = Math.floor(newCombo / 3) * 5;
    const isCrit     = Math.random() < 0.15 + pStats.int * 0.001;
    const raw        = pStats.atk + comboBonus + Math.floor(Math.random() * 8);
    const dmg        = Math.round(raw * (isCrit ? 2 : 1));

    // Attack animation
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 350);
    new Audio('/sounds/hit.mp3').play().catch(() => {}); // Suara player memukul

    // Boss flash
    setTimeout(() => { setBossHit(true); setTimeout(() => setBossHit(false), 200); }, 200);

    setBossHp(hp => Math.max(0, hp - dmg));
    spawnDmg(dmg, isCrit);

    if (isCrit) addLog(`[CRIT] CRITICAL! ${dmg} damage! (Combo x${newCombo})`);
    else if (newCombo % 3 === 0) addLog(`[COMBO] Combo x${newCombo}! +${comboBonus} bonus — ${dmg} dmg`);
    else addLog(`[ATK] You deal ${dmg} damage to ${boss.name}!`);

    setCanAttack(false); // Reset timer
    
    // Counter attack dari boss setelah diserang
    setTimeout(() => doBossAttack(), 1000);

  }, [boss, phase, canAttack, bossHp, combo, pStats]);

  // ── Boss attacks ───────────────────────────────────────────
  const doBossAttack = useCallback((isPenalty = false) => {
    if (!boss) return;
    const raw  = boss.atk + Math.floor(Math.random() * 8) + (isPenalty ? 10 : 0);
    const def  = pStats.def;
    const dmg  = Math.max(1, raw - Math.floor(def * 0.4));

    setPlayerHit(true);
    setTimeout(() => setPlayerHit(false), 300);
    new Audio('/sounds/hurt.mp3').play().catch(() => {}); // Suara player terkena hit

    setLocalHp(hp => Math.max(0, hp - dmg));
    
    if (isPenalty) addLog(`[WARN] PENALTY! Boss marah karena kamu menyerah!`);
    addLog(`[DMG] ${boss.name} memukulmu sebesar ${dmg} damage!`);
  }, [boss, pStats.def]);

  // ── Start battle ───────────────────────────────────────────
  const startBattle = (b: Boss) => {
    setBoss(b);
    setBossHp(b.maxHp);
    setLocalHp(stats.hp);
    setCombo(0);
    setBattleLog([]);
    setIsFocusing(false);
    setCanAttack(false);
    setTimeLeft(0);
    setPhase('battle');
    addLog(`[START] Battle started! Defeat ${b.name}!`);
    addLog(`[STAT] ATK: ${calcStats().atk} | DEF: ${calcStats().def} | INT: ${calcStats().int}`);
  };

  // ── Use potion ─────────────────────────────────────────────
  const usePotion = (itemId: number) => {
    const pot = CONSUMABLES[itemId];
    if (!pot) return;
    const owned = inventory?.find((i: any) => i.id === itemId)?.quantity || 0;
    if (owned <= 0) return;

    const healAmt = pot.heal >= 9999 ? stats.maxHp : Math.round(pot.heal + pot.heal * pStats.int * 0.01);
    setLocalHp(hp => Math.min(stats.maxHp, hp + healAmt));
    if (healPlayer) healPlayer(healAmt);
    if (consumeItem) consumeItem(itemId);

    addLog(`[ITEM] Used ${pot.label}! Restored ${Math.min(healAmt, stats.maxHp - localHp)} HP.`);
  };

  // ── Flee ───────────────────────────────────────────────────
  const flee = () => {
    if (isFocusing) {
      doBossAttack(true); // Kena hit karena kabur saat fokus
    }
    addLog('[FLEE] You fled the battle...');
    setPhase('select');
  };

  // ── Character render ───────────────────────────────────────
  const renderChar = () => {
    const props = {
      weaponId:    equippedItems?.weapon,
      armorId:     equippedItems?.armor,
      helmetId:    equippedItems?.helmet,
      cloakId:     equippedItems?.cloak,
      accessoryId: equippedItems?.accessory,
    };
    if (userProfile?.gender === 'Wanita') return <TechnomancerGirl {...props}/>;
    return <Technomancer {...props}/>;
  };

  // ── Inventory potions ──────────────────────────────────────
  const potions = (inventory || [])
    .filter((i: any) => CONSUMABLES[i.id] && i.quantity > 0)
    .map((i: any) => ({ ...CONSUMABLES[i.id], id: i.id, qty: i.quantity }));

  const bossHpPct   = boss ? (bossHp / boss.maxHp) * 100 : 0;
  const playerHpPct = (localHp / stats.maxHp) * 100;

  // ════════════════════════════════════════════════════════════
  // RENDER: SELECT SCREEN
  // ════════════════════════════════════════════════════════════
  if (phase === 'select') return (
    <div className="p-6 min-h-full" style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 shrink-0 border-b border-zinc-700/50 pb-6">
        <div className="flex flex-col gap-3 text-left">
          <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000]">
            <span className="text-red-500"><Swords size={18} /></span>
            {tFocus.title}
          </h1>
          <p className="font-pixel text-[7px] md:text-[8px] text-zinc-400 uppercase tracking-widest leading-relaxed">
            {tFocus.desc}
          </p>
        </div>
      </div>

      {/* Stats preview */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          { label:'ATK', val: calcStats().atk, icon: <Swords size={12} className="text-pink-400"/>, col:'text-pink-400' },
          { label:'DEF', val: calcStats().def, icon: <Shield size={12} className="text-cyan-400"/>, col:'text-cyan-400' },
          { label:'INT', val: calcStats().int, icon: <Star size={12} className="text-amber-400"/>, col:'text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-zinc-800 border border-zinc-700 px-4 py-2 flex items-center gap-2">
            {s.icon}
            <span className="text-[9px] text-zinc-400 uppercase">{s.label}</span>
            <span className={`text-sm font-bold ${s.col}`}>{s.val}</span>
          </div>
        ))}
        <div className="bg-zinc-800 border border-zinc-700 px-4 py-2 flex items-center gap-2">
          <Heart size={12} className="text-pink-400"/>
          <span className="text-[9px] text-zinc-400 uppercase">HP</span>
          <span className="text-sm font-bold text-pink-400">{stats.hp}/{stats.maxHp}</span>
        </div>
      </div>

      {/* Boss grid (Sekarang nampilin 10 Monster) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {BOSSES.map(b => (
          <button key={b.id} onClick={() => startBattle(b)}
            className={`flex flex-col bg-zinc-800 border-2 ${b.border} overflow-hidden
              hover:-translate-y-1 hover:shadow-lg transition-all text-left group`}>
            <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-700">
              <span className={`text-[7px] font-bold tracking-widest uppercase ${RARITY_LABEL[b.rarity]}`}>{b.rarity}</span>
              <span className="text-[7px] text-zinc-500">HP {b.maxHp}</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-4"
              style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize:'4px 4px' }}>
              <div style={{ filter:`drop-shadow(0 0 8px ${b.aura}55)` }}
                className="group-hover:scale-105 transition-transform">
                {b.sprite}
              </div>
            </div>
            <div className="px-3 py-2 border-t border-zinc-700 bg-zinc-900">
              <p className={`text-[10px] font-bold uppercase ${RARITY_LABEL[b.rarity]}`}>{b.name}</p>
              <p className="text-[8px] text-zinc-500 italic mb-1">"{b.title}"</p>
              <div className="flex gap-3 text-[8px] items-center">
                <span className="text-amber-400 flex items-center gap-0.5"><Coins size={10}/> {b.gold}G</span>
                <span className="text-cyan-400 flex items-center gap-0.5"><Star size={10}/> {b.exp}XP</span>
                <span className="text-red-400 flex items-center gap-0.5"><Swords size={10}/> {b.atk}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════
  // RENDER: VICTORY
  // ════════════════════════════════════════════════════════════
  if (phase === 'victory' && boss) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
      style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <Trophy size={48} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        </div>
        <h2 className="text-2xl font-bold text-amber-400 uppercase tracking-widest">{tFocus.victory}</h2>
        <p className="text-zinc-400 text-[11px] uppercase tracking-widest mt-1">{boss.name} has been defeated</p>
      </div>
      <div className="flex gap-8 text-center">
        <div><p className="text-amber-400 text-2xl font-bold">+{boss.gold}</p><p className="text-[9px] text-zinc-500 uppercase">Gold</p></div>
        <div><p className="text-cyan-400 text-2xl font-bold">+{boss.exp}</p><p className="text-[9px] text-zinc-500 uppercase">EXP</p></div>
        <div><p className="text-pink-400 text-2xl font-bold">x{combo}</p><p className="text-[9px] text-zinc-500 uppercase">{tFocus.combo}</p></div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setPhase('select')}
          className="px-6 py-2 bg-amber-400 text-amber-900 text-[11px] font-bold uppercase tracking-widest border-2 border-amber-600 hover:bg-amber-300">
          {tFocus.chooseNext}
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════
  // RENDER: DEFEAT
  // ════════════════════════════════════════════════════════════
  if (phase === 'defeat' && boss) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
      style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <Skull size={48} className="text-zinc-400 drop-shadow-[0_0_15px_rgba(148,163,184,0.5)]" />
        </div>
        <h2 className="text-2xl font-bold text-red-400 uppercase tracking-widest">{tFocus.defeated}</h2>
        <p className="text-zinc-400 text-[11px] uppercase tracking-widest mt-1">{boss.name} was too powerful</p>
      </div>
      <p className="text-[10px] text-zinc-500 text-center max-w-xs">
        Dealt <span className="text-white">{boss.maxHp - bossHp}</span> / <span className="text-white">{boss.maxHp}</span> HP.
        Equip better gear and try again!
      </p>
      <div className="flex gap-3">
        <button onClick={() => startBattle(boss)}
          className="px-5 py-2 bg-red-500 text-white text-[11px] font-bold uppercase tracking-widest border-2 border-red-700 hover:bg-red-400 flex items-center gap-1">
          <RefreshCw size={12}/> {tFocus.retry}
        </button>
        <button onClick={() => setPhase('select')}
          className="px-5 py-2 bg-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-widest border-2 border-zinc-600 hover:bg-zinc-700">
          {tFocus.selectBoss}
        </button>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════
  // RENDER: BATTLE
  // ════════════════════════════════════════════════════════════
  if (!boss) return null;

  return (
    <div className="p-4 min-h-full flex flex-col gap-4" style={{ fontFamily: "'Courier New', monospace" }}>

      {/* ── Header ── */}
      <div className="flex justify-between items-center border-b-2 border-zinc-700 pb-3">
        <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <Swords size={14} className="text-red-400"/> [ {tFocus.title} ]
        </span>
        <div className="flex items-center gap-3">
          {combo > 0 && (
            <span className={`text-[9px] font-bold px-2 py-0.5 border border-zinc-600 ${combo >= 9 ? 'bg-amber-400 text-amber-900' : 'bg-zinc-800 text-zinc-300'}`}>
              {tFocus.combo} x{combo}
            </span>
          )}
          <button onClick={flee}
            className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[9px] font-bold uppercase border border-zinc-600 hover:border-red-500 hover:text-red-400 flex items-center gap-1">
            <SkipForward size={10}/> {tFocus.back}
          </button>
        </div>
      </div>

      {/* ── Main battle grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

        {/* ─── LEFT: Player character ─── */}
        <div className="flex flex-col gap-3">
          {/* Player HP */}
          <div className="bg-zinc-800 border-2 border-zinc-700 p-3">
            <div className="flex justify-between mb-1">
              <span className="text-[9px] text-pink-400 flex items-center gap-1"><Heart size={10}/> {tFocus.yourHp}</span>
              <span className="text-[9px] text-zinc-400">{localHp}/{stats.maxHp}</span>
            </div>
            <div className="h-3 bg-zinc-900 border border-zinc-700 overflow-hidden">
              <div className={`h-full bg-pink-500 transition-all duration-300 ${playerHit ? 'opacity-40' : ''}`}
                style={{ width:`${playerHpPct}%` }}/>
            </div>
          </div>

          {/* Character sprite */}
          <div className={`relative bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-center justify-center`}
            style={{ minHeight:200,
              backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
              backgroundSize:'8px 8px' }}>
            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-zinc-800 border-t border-zinc-700"/>
            {/* Player hit flash */}
            {playerHit && <div className="absolute inset-0 bg-red-500 opacity-25 pointer-events-none z-20"/>}
            {/* Character with attack animation */}
            <div className={`transition-transform duration-[200ms] ${isAttacking ? 'translate-x-8' : 'translate-x-0'}`}
              style={{ transform: isAttacking ? 'translateX(32px)' : 'translateX(0px)', transition:'transform 0.2s' }}>
              <div style={{ transform:'scale(1.4)' }}>
                {renderChar()}
              </div>
            </div>
          </div>

          {/* Player stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label:'ATK', val:pStats.atk, col:'text-pink-400' },
              { label:'DEF', val:pStats.def, col:'text-cyan-400' },
              { label:'INT', val:pStats.int, col:'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-zinc-900 border border-zinc-700 p-2 text-center">
                <p className="text-[7px] text-zinc-500 uppercase">{s.label}</p>
                <p className={`text-[11px] font-bold ${s.col}`}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── CENTER: Controls + log ─── */}
        <div className="flex flex-col gap-3">
          {/* ATTACK BUTTON */}
          <div className="bg-zinc-800 border-2 border-zinc-700 p-4 flex flex-col gap-3">
            <p className="text-[10px] text-zinc-400 font-bold uppercase text-center flex items-center justify-center gap-2">
              <Timer size={14} className="text-cyan-400"/> {tFocus.pomodoro}
            </p>
            
            {!isFocusing && !canAttack && (
              <div className="flex flex-col gap-2">
                <label className="text-[9px] text-zinc-500 uppercase">{tFocus.setMins}</label>
                <input type="number" min="1" max="120" value={focusMinutes} onChange={e => setFocusMinutes(e.target.value === '' ? '' : Number(e.target.value))} 
                  className="bg-zinc-900 border border-zinc-700 p-2 text-white font-mono text-center outline-none focus:border-cyan-500"/>
                <button onClick={() => { const mins = Number(focusMinutes) || 1; setTimeLeft(mins * 60); setIsFocusing(true); addLog(`[TIME] Memulai sesi fokus ${mins} menit. JANGAN MENYERAH!`); }}
                  className="mt-2 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-widest border-2 border-cyan-400 shadow-[0_4px_0_#0891b2] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2">
                  <Play size={14}/> {tFocus.start}
                </button>
              </div>
            )}

            {isFocusing && (
              <div className="flex flex-col items-center gap-3">
                <div className="text-3xl font-bold font-pixel text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {formatTime(timeLeft)}
                </div>
                <button onClick={() => { setIsFocusing(false); setTimeLeft(0); doBossAttack(true); }}
                  className="w-full py-2 bg-zinc-800 text-zinc-400 hover:bg-red-950 hover:text-red-400 border border-zinc-700 hover:border-red-500 text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2">
                  <Square size={12}/> {tFocus.giveUp}
                </button>
              </div>
            )}

            {canAttack && (
              <button onClick={doAttack} disabled={bossHp <= 0}
                className={`py-4 text-sm font-bold uppercase tracking-widest border-2 transition-all flex items-center justify-center gap-2
                  ${bossHp <= 0 ? 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
                    : 'bg-red-600 border-red-400 text-white hover:bg-red-500 shadow-[0_4px_0_#7f1d1d] active:translate-y-[4px] active:shadow-none animate-bounce'}`}>
                <Swords size={18}/> {tFocus.attack}
              </button>
            )}
          </div>

          {/* Potion buttons */}
          {potions.length > 0 && (
            <div className="bg-zinc-800 border-2 border-zinc-700 p-3">
              <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <FlaskConical size={10}/> {tFocus.potions}
              </p>
              <div className="flex flex-wrap gap-2">
                {potions.map((pot: any) => (
                  <button key={pot.id} onClick={() => usePotion(pot.id)}
                    disabled={localHp >= stats.maxHp}
                    className={`px-2 py-1 ${pot.color} text-white text-[8px] font-bold uppercase tracking-wide border-2 border-black/20
                      hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1`}>
                    <FlaskConical size={10}/> {pot.label} <span className="opacity-70">x{pot.qty}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Battle log */}
          <div className="flex-1 bg-zinc-900 border-2 border-zinc-700 flex flex-col overflow-hidden">
            <div className="px-3 py-1.5 border-b border-zinc-800">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{tFocus.battleLog}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5" style={{ maxHeight:200 }}>
              {battleLog.map((log, i) => (
                <p key={i} className={`text-[9px] font-mono leading-relaxed ${i === 0 ? 'text-white' : 'text-zinc-500'}`}>{log}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Boss ─── */}
        <div className="flex flex-col gap-3">
          {/* Boss HP */}
          <div className={`bg-zinc-800 border-2 ${boss.border} p-3`}>
            <div className="flex justify-between mb-1">
              <span className={`text-[9px] font-bold uppercase ${RARITY_LABEL[boss.rarity]}`}>{boss.name}</span>
              <span className="text-[9px] text-zinc-400">{bossHp}/{boss.maxHp}</span>
            </div>
            <div className="h-3 bg-zinc-900 border border-zinc-700 overflow-hidden">
              <div className={`h-full ${boss.barColor} transition-all duration-300 ${bossHit ? 'opacity-40' : ''}`}
                style={{ width:`${bossHpPct}%` }}/>
            </div>
          </div>

          {/* Boss arena */}
          <div className="relative bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-center justify-center"
            style={{ minHeight:200,
              backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
              backgroundSize:'8px 8px' }}>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-zinc-800 border-t border-zinc-700"/>
            {/* Boss hit flash */}
            {bossHit && <div className="absolute inset-0 bg-red-500 opacity-30 pointer-events-none z-20"/>}
            {/* Boss sprite */}
            <div style={{ filter:`drop-shadow(0 0 12px ${boss.aura}66)` }}
              className={`transition-transform duration-100 ${bossHit ? 'translate-x-1' : 'translate-x-0'}`}>
              <div style={{ transform:'scale(1.4)' }}>
                {boss.sprite}
              </div>
            </div>
            {/* Damage numbers */}
            {dmgNums.map(d => (
              <div key={d.id}
                className={`absolute top-4 pointer-events-none font-bold text-[14px] z-30
                  ${d.crit ? 'text-yellow-300' : 'text-white'}`}
                style={{ left:`${d.x}%`, transform:'translateX(-50%)', animation:'float-up 0.9s ease-out forwards' }}>
                {d.crit ? '★ ' : ''}{d.val}
              </div>
            ))}
          </div>

          {/* Boss info */}
          <div className={`bg-zinc-800 border-2 ${boss.border} p-3`}>
            <p className={`text-[8px] font-bold uppercase ${RARITY_LABEL[boss.rarity]}`}>{boss.rarity}</p>
            <p className="text-[10px] text-white font-bold uppercase mt-0.5">{boss.name}</p>
            <p className="text-[8px] text-zinc-500 italic mt-0.5">"{boss.title}"</p>
            <div className="flex gap-3 mt-2 text-[8px]">
              <span className="text-amber-400">{tFocus.reward}: {boss.gold}G / {boss.exp}XP</span>
            </div>
            <div className="flex gap-3 text-[8px] mt-1">
              <span className="text-red-400">ATK: {boss.atk} → ~{Math.max(1, boss.atk - Math.floor(pStats.def * 0.4))} after DEF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Float-up animation */}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateX(-50%) translateY(0px); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}