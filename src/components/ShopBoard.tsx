"use client";
import React, { useState } from 'react';
import { useStore, EquipSlot } from '@/store/useStore';
import { Coins, ShoppingBag } from 'lucide-react';

// ============================================================
// TYPES
// ============================================================
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  rarity: Rarity;
  slot: EquipSlot;
  stat: string;
  icon: React.ReactNode;
}

// ============================================================
// PIXEL ART SVG ICONS (pure <rect> pixel grid, image-rendering: pixelated)
// ============================================================

const ShadowCloakIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="9"  y="4"  width="2" height="2" fill="#6d28d9" opacity="0.5"/>
    <rect x="21" y="4"  width="2" height="2" fill="#6d28d9" opacity="0.5"/>
    <rect x="7"  y="6"  width="2" height="2" fill="#6d28d9" opacity="0.4"/>
    <rect x="23" y="6"  width="2" height="2" fill="#6d28d9" opacity="0.4"/>
    <rect x="12" y="4"  width="8" height="2" fill="#4c1d95"/>
    <rect x="11" y="6"  width="10" height="2" fill="#5b21b6"/>
    <rect x="15" y="6"  width="2" height="2" fill="#c4b5fd"/>
    <rect x="9"  y="8"  width="4" height="2" fill="#4c1d95"/>
    <rect x="8"  y="10" width="4" height="2" fill="#3b0764"/>
    <rect x="19" y="8"  width="4" height="2" fill="#4c1d95"/>
    <rect x="20" y="10" width="4" height="2" fill="#3b0764"/>
    <rect x="10" y="8"  width="12" height="2" fill="#5b21b6"/>
    <rect x="9"  y="10" width="14" height="2" fill="#4c1d95"/>
    <rect x="8"  y="12" width="16" height="2" fill="#3b0764"/>
    <rect x="7"  y="14" width="18" height="2" fill="#2e1065"/>
    <rect x="7"  y="16" width="18" height="2" fill="#3b0764"/>
    <rect x="6"  y="18" width="20" height="2" fill="#2e1065"/>
    <rect x="6"  y="20" width="20" height="2" fill="#3b0764"/>
    <rect x="7"  y="22" width="18" height="2" fill="#2e1065"/>
    <rect x="7"  y="24" width="7"  height="2" fill="#3b0764"/>
    <rect x="18" y="24" width="7"  height="2" fill="#3b0764"/>
    <rect x="8"  y="26" width="5"  height="2" fill="#2e1065"/>
    <rect x="19" y="26" width="5"  height="2" fill="#2e1065"/>
    <rect x="15" y="16" width="2"  height="2" fill="#7c3aed"/>
    <rect x="14" y="17" width="4"  height="1" fill="#6d28d9"/>
    <rect x="6"  y="18" width="1"  height="6" fill="#7c3aed" opacity="0.6"/>
    <rect x="25" y="18" width="1"  height="6" fill="#7c3aed" opacity="0.6"/>
    <rect x="4"  y="14" width="1"  height="1" fill="#a78bfa" opacity="0.7"/>
    <rect x="27" y="12" width="1"  height="1" fill="#a78bfa" opacity="0.6"/>
    <rect x="3"  y="22" width="1"  height="1" fill="#7c3aed" opacity="0.8"/>
    <rect x="28" y="20" width="1"  height="1" fill="#7c3aed" opacity="0.7"/>
  </svg>
);

const DemonEdgeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="15" y="2"  width="2" height="2" fill="#f1f5f9"/>
    <rect x="14" y="4"  width="4" height="2" fill="#e2e8f0"/>
    <rect x="14" y="6"  width="4" height="2" fill="#cbd5e1"/>
    <rect x="13" y="8"  width="6" height="2" fill="#94a3b8"/>
    <rect x="13" y="10" width="6" height="2" fill="#64748b"/>
    <rect x="13" y="12" width="6" height="2" fill="#475569"/>
    <rect x="13" y="14" width="6" height="2" fill="#334155"/>
    <rect x="15" y="4"  width="1" height="12" fill="#be123c"/>
    <rect x="14" y="4"  width="1" height="10" fill="#9f1239" opacity="0.5"/>
    <rect x="8"  y="16" width="16" height="3" fill="#1e293b"/>
    <rect x="8"  y="16" width="16" height="1" fill="#475569"/>
    <rect x="6"  y="15" width="3"  height="2" fill="#0f172a"/>
    <rect x="5"  y="14" width="2"  height="2" fill="#e11d48"/>
    <rect x="23" y="15" width="3"  height="2" fill="#0f172a"/>
    <rect x="25" y="14" width="2"  height="2" fill="#e11d48"/>
    <rect x="9"  y="17" width="2"  height="1" fill="#e11d48"/>
    <rect x="21" y="17" width="2"  height="1" fill="#e11d48"/>
    <rect x="14" y="19" width="4"  height="2" fill="#292524"/>
    <rect x="14" y="21" width="4"  height="2" fill="#1c1917"/>
    <rect x="14" y="23" width="4"  height="2" fill="#292524"/>
    <rect x="14" y="25" width="4"  height="2" fill="#1c1917"/>
    <rect x="14" y="20" width="4"  height="1" fill="#44403c" opacity="0.6"/>
    <rect x="14" y="22" width="4"  height="1" fill="#44403c" opacity="0.6"/>
    <rect x="14" y="24" width="4"  height="1" fill="#44403c" opacity="0.6"/>
    <rect x="13" y="27" width="6"  height="3" fill="#0f172a"/>
    <rect x="14" y="27" width="4"  height="1" fill="#e11d48"/>
    <rect x="15" y="28" width="2"  height="2" fill="#be123c"/>
  </svg>
);

const ArcaneMageRobeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="3"  width="8"  height="2" fill="#164e63"/>
    <rect x="11" y="5"  width="10" height="2" fill="#0c4a6e"/>
    <rect x="13" y="5"  width="6"  height="2" fill="#1e3a5f"/>
    <rect x="15" y="5"  width="2"  height="1" fill="#fbbf24"/>
    <rect x="14" y="6"  width="1"  height="1" fill="#fbbf24"/>
    <rect x="9"  y="7"  width="5"  height="2" fill="#1e3a5f"/>
    <rect x="18" y="7"  width="5"  height="2" fill="#1e3a5f"/>
    <rect x="10" y="7"  width="12" height="2" fill="#1e3a5f"/>
    <rect x="9"  y="9"  width="14" height="2" fill="#1e3a5f"/>
    <rect x="9"  y="11" width="14" height="2" fill="#0c1a2e"/>
    <rect x="8"  y="13" width="16" height="2" fill="#0c1a2e"/>
    <rect x="8"  y="15" width="16" height="2" fill="#1e3a5f"/>
    <rect x="8"  y="17" width="16" height="2" fill="#0c1a2e"/>
    <rect x="7"  y="19" width="18" height="2" fill="#0c1a2e"/>
    <rect x="7"  y="21" width="18" height="2" fill="#1e3a5f"/>
    <rect x="7"  y="23" width="18" height="2" fill="#0c1a2e"/>
    <rect x="6"  y="25" width="20" height="2" fill="#0c1a2e"/>
    <rect x="6"  y="27" width="20" height="2" fill="#0c2233"/>
    <rect x="5"  y="9"  width="4"  height="6" fill="#1e3a5f"/>
    <rect x="23" y="9"  width="4"  height="6" fill="#1e3a5f"/>
    <rect x="5"  y="14" width="2"  height="2" fill="#38bdf8"/>
    <rect x="25" y="14" width="2"  height="2" fill="#38bdf8"/>
    <rect x="8"  y="14" width="16" height="1" fill="#fbbf24" opacity="0.6"/>
    <rect x="7"  y="20" width="18" height="1" fill="#fbbf24" opacity="0.4"/>
    <rect x="15" y="16" width="2"  height="1" fill="#7dd3fc"/>
    <rect x="14" y="17" width="1"  height="1" fill="#7dd3fc"/>
    <rect x="17" y="17" width="1"  height="1" fill="#7dd3fc"/>
    <rect x="15" y="18" width="2"  height="1" fill="#7dd3fc"/>
    <rect x="11" y="20" width="1"  height="1" fill="#7dd3fc" opacity="0.6"/>
    <rect x="20" y="22" width="1"  height="1" fill="#7dd3fc" opacity="0.5"/>
    <rect x="10" y="26" width="1"  height="1" fill="#7dd3fc" opacity="0.4"/>
    <rect x="21" y="24" width="1"  height="1" fill="#7dd3fc" opacity="0.4"/>
  </svg>
);

const KnightAegisIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="13" y="2"  width="6"  height="1" fill="#fef08a" opacity="0.4"/>
    <rect x="12" y="3"  width="8"  height="2" fill="#94a3b8"/>
    <rect x="11" y="5"  width="10" height="2" fill="#cbd5e1"/>
    <rect x="11" y="5"  width="10" height="1" fill="#fbbf24"/>
    <rect x="11" y="7"  width="10" height="4" fill="#64748b"/>
    <rect x="12" y="8"  width="3"  height="2" fill="#1e293b"/>
    <rect x="17" y="8"  width="3"  height="2" fill="#1e293b"/>
    <rect x="12" y="9"  width="3"  height="1" fill="#fbbf24" opacity="0.6"/>
    <rect x="17" y="9"  width="3"  height="1" fill="#fbbf24" opacity="0.6"/>
    <rect x="9"  y="11" width="14" height="2" fill="#cbd5e1"/>
    <rect x="9"  y="11" width="14" height="1" fill="#fbbf24"/>
    <rect x="8"  y="13" width="16" height="2" fill="#94a3b8"/>
    <rect x="8"  y="15" width="16" height="2" fill="#cbd5e1"/>
    <rect x="8"  y="17" width="16" height="2" fill="#94a3b8"/>
    <rect x="8"  y="19" width="16" height="2" fill="#cbd5e1"/>
    <rect x="15" y="12" width="1"  height="10" fill="#64748b" opacity="0.5"/>
    <rect x="15" y="13" width="2"  height="6" fill="#fbbf24"/>
    <rect x="13" y="15" width="6"  height="2" fill="#fbbf24"/>
    <rect x="15" y="15" width="2"  height="2" fill="#fef08a"/>
    <rect x="4"  y="11" width="5"  height="6" fill="#94a3b8"/>
    <rect x="4"  y="11" width="5"  height="1" fill="#fbbf24"/>
    <rect x="4"  y="16" width="5"  height="1" fill="#fbbf24"/>
    <rect x="23" y="11" width="5"  height="6" fill="#94a3b8"/>
    <rect x="23" y="11" width="5"  height="1" fill="#fbbf24"/>
    <rect x="23" y="16" width="5"  height="1" fill="#fbbf24"/>
    <rect x="9"  y="21" width="14" height="2" fill="#64748b"/>
    <rect x="9"  y="21" width="14" height="1" fill="#fbbf24"/>
    <rect x="10" y="23" width="5"  height="5" fill="#94a3b8"/>
    <rect x="17" y="23" width="5"  height="5" fill="#94a3b8"/>
    <rect x="10" y="23" width="5"  height="1" fill="#fbbf24"/>
    <rect x="17" y="23" width="5"  height="1" fill="#fbbf24"/>
  </svg>
);

const DragonEyeAmuletIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="14" y="2"  width="4"  height="1" fill="#d4af37"/>
    <rect x="13" y="3"  width="2"  height="1" fill="#b8860b"/>
    <rect x="17" y="3"  width="2"  height="1" fill="#b8860b"/>
    <rect x="15" y="2"  width="2"  height="2" fill="#d4af37"/>
    <rect x="13" y="5"  width="6"  height="1" fill="#d4af37"/>
    <rect x="11" y="6"  width="10" height="1" fill="#d4af37"/>
    <rect x="10" y="7"  width="12" height="14" fill="#92400e"/>
    <rect x="10" y="7"  width="1"  height="14" fill="#d4af37"/>
    <rect x="21" y="7"  width="1"  height="14" fill="#d4af37"/>
    <rect x="9"  y="8"  width="1"  height="12" fill="#d4af37"/>
    <rect x="22" y="8"  width="1"  height="12" fill="#d4af37"/>
    <rect x="10" y="7"  width="2"  height="2" fill="#fbbf24"/>
    <rect x="20" y="7"  width="2"  height="2" fill="#fbbf24"/>
    <rect x="10" y="19" width="2"  height="2" fill="#fbbf24"/>
    <rect x="20" y="19" width="2"  height="2" fill="#fbbf24"/>
    <rect x="12" y="8"  width="8"  height="12" fill="#dc2626"/>
    <rect x="13" y="7"  width="6"  height="14" fill="#dc2626"/>
    <rect x="12" y="9"  width="8"  height="10" fill="#ef4444"/>
    <rect x="15" y="8"  width="2"  height="12" fill="#1c0a00"/>
    <rect x="15" y="9"  width="2"  height="10" fill="#0c0000"/>
    <rect x="14" y="10" width="4"  height="8" fill="#b91c1c" opacity="0.6"/>
    <rect x="12" y="9"  width="2"  height="3" fill="#fca5a5" opacity="0.5"/>
    <rect x="14" y="8"  width="2"  height="2" fill="#fca5a5" opacity="0.3"/>
    <rect x="8"  y="10" width="1"  height="8" fill="#dc2626" opacity="0.3"/>
    <rect x="23" y="10" width="1"  height="8" fill="#dc2626" opacity="0.3"/>
    <rect x="11" y="21" width="10" height="1" fill="#d4af37"/>
    <rect x="13" y="22" width="6"  height="1" fill="#d4af37"/>
  </svg>
);

const SoulCrystalIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="15" y="2"  width="2"  height="1" fill="#f5f3ff"/>
    <rect x="12" y="3"  width="1"  height="1" fill="#c4b5fd" opacity="0.7"/>
    <rect x="19" y="3"  width="1"  height="1" fill="#c4b5fd" opacity="0.7"/>
    <rect x="15" y="4"  width="2"  height="2" fill="#ddd6fe"/>
    <rect x="13" y="6"  width="6"  height="2" fill="#c4b5fd"/>
    <rect x="14" y="6"  width="4"  height="2" fill="#ede9fe"/>
    <rect x="12" y="8"  width="8"  height="2" fill="#a78bfa"/>
    <rect x="13" y="8"  width="6"  height="2" fill="#c4b5fd"/>
    <rect x="11" y="10" width="10" height="2" fill="#7c3aed"/>
    <rect x="12" y="10" width="8"  height="2" fill="#a78bfa"/>
    <rect x="11" y="12" width="10" height="2" fill="#6d28d9"/>
    <rect x="12" y="12" width="8"  height="2" fill="#7c3aed"/>
    <rect x="11" y="14" width="10" height="2" fill="#5b21b6"/>
    <rect x="12" y="14" width="8"  height="2" fill="#6d28d9"/>
    <rect x="11" y="16" width="10" height="2" fill="#4c1d95"/>
    <rect x="12" y="16" width="8"  height="2" fill="#5b21b6"/>
    <rect x="12" y="18" width="8"  height="2" fill="#4c1d95"/>
    <rect x="13" y="20" width="6"  height="2" fill="#3b0764"/>
    <rect x="14" y="22" width="4"  height="2" fill="#2e1065"/>
    <rect x="15" y="24" width="2"  height="2" fill="#1e0a3c"/>
    <rect x="15" y="6"  width="1"  height="18" fill="#ddd6fe" opacity="0.25"/>
    <rect x="13" y="10" width="1"  height="12" fill="#a78bfa" opacity="0.2"/>
    <rect x="14" y="13" width="4"  height="4" fill="#8b5cf6" opacity="0.4"/>
    <rect x="11" y="10" width="1"  height="4" fill="#c4b5fd" opacity="0.5"/>
    <rect x="13" y="25" width="6"  height="1" fill="#7c3aed" opacity="0.4"/>
    <rect x="12" y="26" width="8"  height="1" fill="#7c3aed" opacity="0.2"/>
    <rect x="8"  y="15" width="1"  height="1" fill="#a78bfa" opacity="0.6"/>
    <rect x="23" y="12" width="1"  height="1" fill="#c4b5fd" opacity="0.5"/>
    <rect x="7"  y="20" width="1"  height="1" fill="#7c3aed" opacity="0.7"/>
  </svg>
);

const VoidBowIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="9"  y="2"  width="2"  height="2" fill="#1e1b4b"/>
    <rect x="8"  y="4"  width="2"  height="2" fill="#312e81"/>
    <rect x="7"  y="6"  width="2"  height="2" fill="#3730a3"/>
    <rect x="6"  y="8"  width="2"  height="4" fill="#4338ca"/>
    <rect x="7"  y="12" width="2"  height="2" fill="#4338ca"/>
    <rect x="7"  y="14" width="4"  height="4" fill="#312e81"/>
    <rect x="8"  y="14" width="2"  height="4" fill="#1e1b4b"/>
    <rect x="8"  y="15" width="2"  height="2" fill="#818cf8"/>
    <rect x="7"  y="18" width="2"  height="2" fill="#4338ca"/>
    <rect x="6"  y="20" width="2"  height="4" fill="#3730a3"/>
    <rect x="7"  y="24" width="2"  height="2" fill="#312e81"/>
    <rect x="8"  y="26" width="2"  height="2" fill="#1e1b4b"/>
    <rect x="6"  y="6"  width="1"  height="2" fill="#6366f1" opacity="0.6"/>
    <rect x="5"  y="10" width="1"  height="8" fill="#6366f1" opacity="0.4"/>
    <rect x="6"  y="20" width="1"  height="4" fill="#6366f1" opacity="0.6"/>
    <rect x="11" y="3"  width="1"  height="2" fill="#818cf8" opacity="0.8"/>
    <rect x="12" y="5"  width="1"  height="2" fill="#818cf8" opacity="0.8"/>
    <rect x="13" y="7"  width="1"  height="2" fill="#a5b4fc" opacity="0.9"/>
    <rect x="14" y="9"  width="1"  height="2" fill="#c7d2fe"/>
    <rect x="14" y="11" width="1"  height="2" fill="#c7d2fe"/>
    <rect x="14" y="13" width="1"  height="2" fill="#e0e7ff"/>
    <rect x="14" y="17" width="1"  height="2" fill="#e0e7ff"/>
    <rect x="14" y="19" width="1"  height="2" fill="#c7d2fe"/>
    <rect x="14" y="21" width="1"  height="2" fill="#c7d2fe"/>
    <rect x="13" y="23" width="1"  height="2" fill="#a5b4fc" opacity="0.9"/>
    <rect x="12" y="25" width="1"  height="2" fill="#818cf8" opacity="0.8"/>
    <rect x="11" y="27" width="1"  height="2" fill="#818cf8" opacity="0.7"/>
    <rect x="15" y="14" width="14" height="1" fill="#c7d2fe" opacity="0.8"/>
    <rect x="15" y="15" width="14" height="1" fill="#818cf8" opacity="0.6"/>
    <rect x="27" y="13" width="2"  height="1" fill="#a5b4fc"/>
    <rect x="28" y="14" width="2"  height="1" fill="#818cf8"/>
    <rect x="29" y="15" width="1"  height="1" fill="#6366f1"/>
    <rect x="28" y="16" width="2"  height="1" fill="#818cf8"/>
    <rect x="27" y="17" width="2"  height="1" fill="#a5b4fc"/>
    <rect x="15" y="12" width="3"  height="1" fill="#6366f1"/>
    <rect x="15" y="17" width="3"  height="1" fill="#6366f1"/>
    <rect x="20" y="11" width="1"  height="1" fill="#818cf8" opacity="0.5"/>
    <rect x="24" y="18" width="1"  height="1" fill="#818cf8" opacity="0.5"/>
  </svg>
);

const PhoenixHelmIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}>
    <rect x="15" y="1"  width="2"  height="2" fill="#fef08a"/>
    <rect x="14" y="3"  width="4"  height="2" fill="#fde047"/>
    <rect x="13" y="3"  width="1"  height="2" fill="#fbbf24" opacity="0.7"/>
    <rect x="18" y="3"  width="1"  height="2" fill="#fbbf24" opacity="0.7"/>
    <rect x="13" y="5"  width="6"  height="2" fill="#f97316"/>
    <rect x="12" y="5"  width="1"  height="2" fill="#ea580c" opacity="0.7"/>
    <rect x="19" y="5"  width="1"  height="2" fill="#ea580c" opacity="0.7"/>
    <rect x="12" y="7"  width="8"  height="2" fill="#dc2626"/>
    <rect x="11" y="7"  width="1"  height="2" fill="#b91c1c" opacity="0.6"/>
    <rect x="20" y="7"  width="1"  height="2" fill="#b91c1c" opacity="0.6"/>
    <rect x="15" y="2"  width="2"  height="4" fill="#fff7ed" opacity="0.8"/>
    <rect x="14" y="4"  width="4"  height="3" fill="#fef08a" opacity="0.6"/>
    <rect x="10" y="9"  width="12" height="2" fill="#78350f"/>
    <rect x="9"  y="11" width="14" height="2" fill="#92400e"/>
    <rect x="9"  y="11" width="14" height="1" fill="#fbbf24"/>
    <rect x="10" y="9"  width="12" height="1" fill="#fbbf24"/>
    <rect x="8"  y="13" width="16" height="2" fill="#78350f"/>
    <rect x="8"  y="15" width="16" height="2" fill="#92400e"/>
    <rect x="9"  y="17" width="14" height="3" fill="#451a03"/>
    <rect x="10" y="18" width="4"  height="1" fill="#f97316"/>
    <rect x="18" y="18" width="4"  height="1" fill="#f97316"/>
    <rect x="11" y="19" width="3"  height="1" fill="#f97316" opacity="0.5"/>
    <rect x="18" y="19" width="3"  height="1" fill="#f97316" opacity="0.5"/>
    <rect x="13" y="14" width="2"  height="2" fill="#f97316"/>
    <rect x="17" y="14" width="2"  height="2" fill="#f97316"/>
    <rect x="15" y="13" width="2"  height="4" fill="#fbbf24"/>
    <rect x="15" y="13" width="2"  height="2" fill="#fef08a"/>
    <rect x="7"  y="19" width="3"  height="4" fill="#78350f"/>
    <rect x="22" y="19" width="3"  height="4" fill="#78350f"/>
    <rect x="7"  y="19" width="1"  height="4" fill="#fbbf24" opacity="0.5"/>
    <rect x="24" y="19" width="1"  height="4" fill="#fbbf24" opacity="0.5"/>
    <rect x="9"  y="20" width="14" height="3" fill="#451a03"/>
    <rect x="9"  y="20" width="14" height="1" fill="#fbbf24" opacity="0.6"/>
  </svg>
);

// weapon baru

const EnmaKatanaIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Blade Core */}
    <rect x="15" y="4" width="2" height="16" fill="#1e1b4b"/>
    {/* Purple/Pink Aura (Hamon) */}
    <rect x="14" y="5" width="1" height="14" fill="#a855f7"/> 
    <rect x="14" y="7" width="1" height="2" fill="#d946ef"/>
    <rect x="14" y="11" width="1" height="2" fill="#d946ef"/>
    <rect x="14" y="15" width="1" height="2" fill="#d946ef"/>
    <rect x="16" y="4" width="1" height="1" fill="#cbd5e1"/> {/* Tip */}
    {/* Guard (Tsuba) */}
    <rect x="12" y="20" width="8" height="1" fill="#fbbf24"/>
    <rect x="13" y="21" width="6" height="1" fill="#b45309"/>
    {/* Handle (Tsuka) with wrapping */}
    <rect x="14" y="22" width="4" height="6" fill="#1e1b4b"/>
    <rect x="14" y="22" width="4" height="1" fill="#a855f7"/>
    <rect x="14" y="24" width="4" height="1" fill="#a855f7"/>
    <rect x="14" y="26" width="4" height="1" fill="#a855f7"/>
    <rect x="15" y="28" width="2" height="1" fill="#fbbf24"/>
  </svg>
);

const KasakaFangIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Venom Aura Particles */}
    <rect x="12" y="8" width="1" height="2" fill="#67e8f9" opacity="0.5"/>
    <rect x="19" y="14" width="1" height="2" fill="#67e8f9" opacity="0.5"/>
    {/* Jagged Glowing Blade */}
    <rect x="15" y="6" width="2" height="2" fill="#0891b2"/>
    <rect x="14" y="8" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="10" width="3" height="2" fill="#22d3ee"/>
    <rect x="15" y="12" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="14" width="3" height="2" fill="#22d3ee"/>
    <rect x="15" y="16" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="18" width="3" height="2" fill="#0891b2"/>
    {/* Bone/Core line */}
    <rect x="15" y="8" width="1" height="10" fill="#cffafe"/>
    {/* Guard & Handle */}
    <rect x="13" y="20" width="6" height="2" fill="#1e1b4b"/>
    <rect x="14" y="22" width="4" height="4" fill="#312e81"/>
    <rect x="15" y="26" width="2" height="2" fill="#0f172a"/>
  </svg>
);

const ElucidatorIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Black Blade with silver edges */}
    <rect x="15" y="3" width="2" height="2" fill="#cbd5e1"/>
    <rect x="14" y="5" width="4" height="15" fill="#0f172a"/>
    <rect x="14" y="5" width="1" height="15" fill="#94a3b8"/> 
    <rect x="17" y="5" width="1" height="15" fill="#94a3b8"/> 
    <rect x="15" y="5" width="2" height="15" fill="#020617"/> 
    {/* Cylinder Crossguard */}
    <rect x="11" y="19" width="10" height="2" fill="#475569"/>
    <rect x="10" y="20" width="12" height="1" fill="#94a3b8"/>
    <rect x="15" y="18" width="2" height="3" fill="#cbd5e1"/> 
    {/* Handle */}
    <rect x="14" y="21" width="4" height="5" fill="#1e293b"/>
    <rect x="14" y="26" width="4" height="2" fill="#94a3b8"/> 
    <rect x="15" y="27" width="2" height="2" fill="#475569"/>
  </svg>
);

const BusterSwordIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Blade */}
    <rect x="13" y="4" width="6" height="18" fill="#64748b"/>
    <rect x="13" y="4" width="1" height="18" fill="#e2e8f0"/> {/* Sharp Edge */}
    {/* Materia Holes */}
    <rect x="15" y="16" width="2" height="2" fill="#0f172a"/>
    <rect x="15" y="12" width="2" height="2" fill="#0f172a"/>
    {/* Guard & Handle */}
    <rect x="11" y="22" width="10" height="2" fill="#b45309"/>
    <rect x="14" y="24" width="4" height="6" fill="#7f1d1d"/>
    <rect x="14" y="25" width="4" height="1" fill="#450a0a"/>
    <rect x="14" y="27" width="4" height="1" fill="#450a0a"/>
  </svg>
);

const ZangetsuIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Giant Cleaver Blade */}
    <rect x="12" y="2" width="6" height="20" fill="#cbd5e1"/>
    <rect x="11" y="4" width="1" height="16" fill="#f8fafc"/> {/* Curved Edge */}
    <rect x="17" y="2" width="1" height="20" fill="#0f172a"/> {/* Flat Back */}
    {/* Cloth Wrapped Handle */}
    <rect x="14" y="22" width="4" height="6" fill="#f8fafc"/>
    <rect x="14" y="23" width="4" height="1" fill="#0f172a"/>
    <rect x="14" y="25" width="4" height="1" fill="#0f172a"/>
    <rect x="14" y="27" width="4" height="1" fill="#0f172a"/>
    {/* Flowing Cloth Tail */}
    <rect x="15" y="28" width="2" height="3" fill="#f8fafc"/>
    <rect x="16" y="30" width="2" height="2" fill="#f8fafc"/>
  </svg>
);

const ExcaliburIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Holy Blade */}
    <rect x="15" y="3" width="2" height="18" fill="#f1f5f9"/>
    <rect x="14" y="5" width="1" height="16" fill="#94a3b8"/>
    <rect x="17" y="5" width="1" height="16" fill="#94a3b8"/>
    <rect x="15" y="3" width="2" height="18" fill="#fbbf24" opacity="0.4"/> {/* Holy Glow */}
    {/* Guard (Gold & Blue) */}
    <rect x="10" y="21" width="12" height="2" fill="#fbbf24"/>
    <rect x="11" y="20" width="10" height="1" fill="#f59e0b"/>
    <rect x="14" y="21" width="4" height="2" fill="#1e3a8a"/> 
    {/* Blue Handle & Pommel */}
    <rect x="15" y="23" width="2" height="5" fill="#1e3a8a"/>
    <rect x="14" y="28" width="4" height="2" fill="#fbbf24"/>
  </svg>
);

const DeathScytheIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Long Pole */}
    <rect x="16" y="2" width="2" height="28" fill="#1c1917"/>
    {/* Giant Blade */}
    <rect x="4" y="4" width="12" height="2" fill="#dc2626"/>
    <rect x="2" y="6" width="4" height="2" fill="#dc2626"/>
    <rect x="2" y="8" width="2" height="6" fill="#dc2626"/>
    {/* Silver Edge */}
    <rect x="4" y="4" width="12" height="1" fill="#f8fafc"/>
    <rect x="2" y="6" width="2" height="8" fill="#f8fafc"/>
    {/* Mount & Eye Detail */}
    <rect x="15" y="3" width="4" height="4" fill="#94a3b8"/>
    <rect x="15" y="7" width="2" height="2" fill="#fbbf24"/> 
  </svg>
);

const LeviathanAxeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Axe Handle */}
    <rect x="14" y="6" width="2" height="22" fill="#78350f"/>
    <rect x="13" y="18" width="4" height="6" fill="#451a03"/> {/* Wrap */}
    <rect x="13" y="28" width="4" height="2" fill="#fbbf24"/> {/* Pommel */}
    {/* Axe Head (Right) */}
    <rect x="16" y="8" width="6" height="8" fill="#94a3b8"/>
    <rect x="22" y="6" width="2" height="12" fill="#e2e8f0"/> {/* Sharp Edge */}
    {/* Glowing Frost Runes */}
    <rect x="17" y="10" width="2" height="2" fill="#38bdf8"/>
    <rect x="19" y="12" width="2" height="2" fill="#38bdf8"/>
    {/* Back Spike (Left) */}
    <rect x="10" y="10" width="4" height="3" fill="#94a3b8"/>
  </svg>
);

// armor baru

const TurtleGiIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="16" fill="#ea580c"/>
    <rect x="13" y="8" width="6" height="4" fill="#1e3a8a"/> {/* Blue undershirt */}
    <rect x="10" y="20" width="12" height="4" fill="#1e3a8a"/> {/* Blue belt */}
    <rect x="8" y="10" width="2" height="6" fill="#ea580c"/> {/* Sleeves */}
    <rect x="22" y="10" width="2" height="6" fill="#ea580c"/>
    <rect x="18" y="12" width="3" height="3" fill="#fef08a"/> {/* Turtle Logo hint */}
  </svg>
);

const SurveyCorpsIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="8" width="10" height="16" fill="#f8fafc"/> {/* White shirt */}
    <rect x="10" y="8" width="12" height="8" fill="#78350f"/> {/* Brown Jacket */}
    <rect x="13" y="8" width="6" height="8" fill="#f8fafc"/> {/* Jacket open */}
    <rect x="10" y="20" width="12" height="2" fill="#451a03"/> {/* Belt */}
    <rect x="8" y="10" width="2" height="10" fill="#78350f"/> {/* Sleeves */}
    <rect x="22" y="10" width="2" height="10" fill="#78350f"/>
    <rect x="11" y="14" width="1" height="8" fill="#0f172a"/> {/* Straps */}
    <rect x="20" y="14" width="1" height="8" fill="#0f172a"/>
  </svg>
);

const AkatsukiIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="18" fill="#0f172a"/> {/* Black robe */}
    <rect x="8" y="10" width="16" height="14" fill="#0f172a"/> {/* Wide sleeves */}
    <rect x="12" y="8" width="8" height="2" fill="#dc2626"/> {/* Red collar inside */}
    <rect x="13" y="14" width="3" height="2" fill="#dc2626"/> {/* Red Cloud 1 */}
    <rect x="18" y="20" width="3" height="2" fill="#dc2626"/> {/* Red Cloud 2 */}
    <rect x="12" y="14" width="1" height="1" fill="#f8fafc"/> {/* White outline hint */}
    <rect x="17" y="20" width="1" height="1" fill="#f8fafc"/>
  </svg>
);

const IronArmorIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="16" fill="#dc2626"/> {/* Red suit */}
    <rect x="12" y="10" width="8" height="12" fill="#b91c1c"/> {/* Shading */}
    <rect x="8" y="10" width="2" height="14" fill="#dc2626"/> {/* Arms */}
    <rect x="22" y="10" width="2" height="14" fill="#dc2626"/>
    <rect x="14" y="12" width="4" height="4" fill="#22d3ee"/> {/* Arc Reactor */}
    <rect x="15" y="13" width="2" height="2" fill="#f8fafc"/> {/* Reactor core */}
    <rect x="11" y="18" width="2" height="6" fill="#fbbf24"/> {/* Gold plates */}
    <rect x="19" y="18" width="2" height="6" fill="#fbbf24"/>
    <rect x="8" y="14" width="2" height="4" fill="#fbbf24"/> {/* Arm gold */}
    <rect x="22" y="14" width="2" height="4" fill="#fbbf24"/>
  </svg>
);

const N7SuitIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="16" fill="#1e293b"/> {/* Carbon black */}
    <rect x="12" y="10" width="8" height="12" fill="#334155"/> {/* Shading */}
    <rect x="18" y="10" width="2" height="14" fill="#dc2626"/> {/* N7 Red Stripe */}
    <rect x="20" y="10" width="1" height="14" fill="#f8fafc"/> {/* N7 White Stripe */}
    <rect x="8" y="10" width="2" height="14" fill="#1e293b"/> {/* Left arm */}
    <rect x="22" y="10" width="2" height="14" fill="#1e293b"/> {/* Right arm */}
    <rect x="13" y="12" width="6" height="4" fill="#0f172a"/> {/* Chest plate indent */}
  </svg>
);

const DemonSlayerIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="8" width="10" height="16" fill="#0f172a"/> {/* Black Uniform */}
    <rect x="14" y="10" width="1" height="10" fill="#94a3b8"/> {/* Silver buttons */}
    <rect x="11" y="18" width="10" height="2" fill="#f8fafc"/> {/* White belt */}
    <rect x="8" y="10" width="4" height="12" fill="#166534"/> {/* Haori Green */}
    <rect x="20" y="10" width="4" height="12" fill="#166534"/> 
    <rect x="8" y="12" width="4" height="2" fill="#0f172a"/> {/* Haori Black Checkers */}
    <rect x="8" y="16" width="4" height="2" fill="#0f172a"/>
    <rect x="20" y="12" width="4" height="2" fill="#0f172a"/>
    <rect x="20" y="16" width="4" height="2" fill="#0f172a"/>
  </svg>
);

const JediRobeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="18" fill="#d6d3d1"/> {/* Beige Tunic */}
    <rect x="14" y="8" width="4" height="6" fill="#a8a29e"/> {/* V-Neck Fold */}
    <rect x="10" y="18" width="12" height="3" fill="#451a03"/> {/* Brown Belt */}
    <rect x="15" y="18" width="2" height="3" fill="#94a3b8"/> {/* Belt Buckle */}
    <rect x="7" y="10" width="3" height="12" fill="#78350f"/> {/* Brown Outer Robe Sleeve */}
    <rect x="22" y="10" width="3" height="12" fill="#78350f"/>
  </svg>
);

const HevSuitIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="16" fill="#0f172a"/> {/* Black undersuit */}
    <rect x="11" y="10" width="10" height="8" fill="#f97316"/> {/* Orange chest plate */}
    <rect x="14" y="12" width="4" height="4" fill="#fbbf24"/> {/* Lambda BG (Gold) */}
    <rect x="15" y="13" width="2" height="2" fill="#1e293b"/> {/* Lambda hint */}
    <rect x="11" y="20" width="10" height="4" fill="#f97316"/> {/* Orange belt/pelvis */}
    <rect x="8" y="10" width="2" height="6" fill="#f97316"/> {/* Shoulders */}
    <rect x="22" y="10" width="2" height="6" fill="#f97316"/>
    <rect x="8" y="16" width="2" height="8" fill="#0f172a"/> {/* Lower arms black */}
    <rect x="22" y="16" width="2" height="8" fill="#0f172a"/>
  </svg>
);

// helmet baru

const IronHelmIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="8" width="10" height="12" fill="#dc2626"/> {/* Red Base */}
    <rect x="13" y="10" width="6" height="8" fill="#fbbf24"/> {/* Gold Faceplate */}
    <rect x="14" y="12" width="1" height="1" fill="#22d3ee"/> {/* Eye L */}
    <rect x="17" y="12" width="1" height="1" fill="#22d3ee"/> {/* Eye R */}
  </svg>
);

const StrawHatIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="12" width="12" height="4" fill="#fde047"/> {/* Yellow Base */}
    <rect x="8" y="16" width="16" height="2" fill="#fde047"/> {/* Brim */}
    <rect x="10" y="14" width="12" height="2" fill="#dc2626"/> {/* Red Band */}
  </svg>
);

const HiddenLeafIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="12" width="12" height="4" fill="#1e293b"/> {/* Dark Blue cloth */}
    <rect x="12" y="13" width="8" height="2" fill="#94a3b8"/> {/* Metal plate */}
    <rect x="15" y="13" width="2" height="1" fill="#0f172a"/> {/* Symbol hint */}
  </svg>
);

const InosukeHelmIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="8" width="12" height="12" fill="#a8a29e"/> {/* Boar Fur */}
    <rect x="13" y="14" width="2" height="2" fill="#334155"/> {/* Nose */}
    <rect x="11" y="11" width="2" height="2" fill="#38bdf8"/> {/* Blue Eye L */}
    <rect x="19" y="11" width="2" height="2" fill="#38bdf8"/> {/* Blue Eye R */}
    <rect x="11" y="6" width="2" height="3" fill="#fb7185"/> {/* Ear L */}
    <rect x="19" y="6" width="2" height="3" fill="#fb7185"/> {/* Ear R */}
  </svg>
);

const VaderHelmIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="8" width="10" height="12" fill="#0f172a"/> {/* Black Mask */}
    <rect x="13" y="12" width="2" height="2" fill="#1e293b"/> {/* Eye L */}
    <rect x="17" y="12" width="2" height="2" fill="#1e293b"/> {/* Eye R */}
    <rect x="15" y="15" width="2" height="3" fill="#334155"/> {/* Grill */}
  </svg>
);

const SpartanHelmIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="10" width="10" height="10" fill="#1e293b"/> {/* Green Base */}
    <rect x="12" y="12" width="8" height="4" fill="#fbbf24"/> {/* Gold Visor */}
    <rect x="13" y="13" width="6" height="1" fill="#22d3ee" opacity="0.6"/> {/* Visor Glow */}
  </svg>
);

const SaitamaBaldIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="10" width="10" height="10" fill="#ffdbac" rx="5"/> {/* Skin/Bald head */}
    <rect x="13" y="14" width="1" height="1" fill="#000"/> {/* Dot eye L */}
    <rect x="18" y="14" width="1" height="1" fill="#000"/> {/* Dot eye R */}
  </svg>
);

const HollowMaskIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="8" width="10" height="12" fill="#f8fafc"/> {/* White Mask */}
    <rect x="13" y="11" width="2" height="2" fill="#0f172a"/> {/* Eye L */}
    <rect x="17" y="11" width="2" height="2" fill="#0f172a"/> {/* Eye R */}
    <rect x="11" y="8" width="3" height="1" fill="#dc2626"/>
    <rect x="11" y="10" width="2" height="1" fill="#dc2626"/>
    <rect x="11" y="12" width="1" height="3" fill="#dc2626"/>
    <rect x="14" y="16" width="4" height="1" fill="#94a3b8"/>
  </svg>
);
const GordonGlassesIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="11" y="10" width="10" height="4" fill="#451a03"/> {/* Brown Hair */}
    <rect x="12" y="13" width="3" height="2" fill="#000"/> {/* Lens L */}
    <rect x="17" y="13" width="3" height="2" fill="#000"/> {/* Lens R */}
    <rect x="15" y="13" width="2" height="1" fill="#000"/> {/* Bridge */}
  </svg>
);

// cloak baru

const SurveyCapeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="6" width="16" height="18" fill="#166534"/>
    <rect x="10" y="8" width="12" height="14" fill="#14532d"/> {/* Folds */}
  </svg>
);

const HokageCloakIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="6" width="16" height="14" fill="#f8fafc"/>
    <rect x="8" y="20" width="16" height="4" fill="#ef4444"/> {/* Red Flames */}
    <rect x="10" y="18" width="2" height="2" fill="#ef4444"/>
    <rect x="14" y="18" width="4" height="2" fill="#ef4444"/>
    <rect x="20" y="18" width="2" height="2" fill="#ef4444"/>
  </svg>
);

const LevitationCloakIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="10" width="16" height="14" fill="#b91c1c"/>
    <rect x="6" y="6" width="20" height="4" fill="#dc2626"/> {/* High Collar */}
    <rect x="6" y="6" width="20" height="1" fill="#fbbf24"/> {/* Gold Trim */}
  </svg>
);

const DarkCapeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="6" y="6" width="20" height="16" fill="#0f172a"/>
    <rect x="6" y="22" width="3" height="2" fill="#0f172a"/> {/* Scalloped edges */}
    <rect x="11" y="22" width="4" height="2" fill="#0f172a"/>
    <rect x="17" y="22" width="4" height="2" fill="#0f172a"/>
    <rect x="23" y="22" width="3" height="2" fill="#0f172a"/>
  </svg>
);

const SaitamaCapeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="9" y="6" width="14" height="18" fill="#f1f5f9"/>
    <rect x="10" y="8" width="12" height="14" fill="#e2e8f0"/> {/* Shadows */}
    <rect x="11" y="6" width="2" height="2" fill="#0f172a"/> {/* Buttons */}
    <rect x="19" y="6" width="2" height="2" fill="#0f172a"/>
  </svg>
);

const GutsCapeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="7" y="6" width="18" height="14" fill="#1e293b"/>
    <rect x="7" y="20" width="2" height="4" fill="#1e293b"/> {/* Ragged edges */}
    <rect x="11" y="20" width="3" height="2" fill="#1e293b"/>
    <rect x="16" y="20" width="2" height="3" fill="#1e293b"/>
    <rect x="21" y="20" width="4" height="2" fill="#1e293b"/>
    <rect x="14" y="6" width="4" height="2" fill="#94a3b8"/> {/* Silver Clasp */}
  </svg>
);

const CrimsonCapeIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="8" width="16" height="16" fill="#dc2626"/>
    <rect x="6" y="6" width="4" height="4" fill="#ef4444"/> {/* Pointy Shoulder L */}
    <rect x="22" y="6" width="4" height="4" fill="#ef4444"/> {/* Pointy Shoulder R */}
  </svg>
);

const VampireMantleIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="6" y="6" width="20" height="18" fill="#020617"/> {/* Black outer */}
    <rect x="8" y="6" width="16" height="2" fill="#9f1239"/> {/* Red inner collar */}
    <rect x="14" y="8" width="4" height="2" fill="#fbbf24"/> {/* Gold chain */}
  </svg>
);

const WinterWolfIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="10" width="16" height="14" fill="#292524"/> {/* Brown leather/cloth */}
    <rect x="6" y="6" width="20" height="6" fill="#94a3b8"/> {/* Grey Fur Collar */}
    <rect x="8" y="12" width="16" height="2" fill="#475569"/> {/* Fur trim */}
  </svg>
);

// amulet baru

const OneRingIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="14" width="12" height="4" fill="#fbbf24"/>
    <rect x="12" y="12" width="8" height="2" fill="#fbbf24"/>
    <rect x="12" y="18" width="8" height="2" fill="#fbbf24"/>
    <rect x="12" y="14" width="8" height="4" fill="#0f172a"/> {/* Hole */}
    <rect x="14" y="12" width="4" height="1" fill="#fef08a"/> {/* Shine */}
  </svg>
);

const MillenniumPuzzleIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="10" width="12" height="2" fill="#fbbf24"/>
    <rect x="12" y="12" width="8" height="2" fill="#f59e0b"/>
    <rect x="14" y="14" width="4" height="2" fill="#d97706"/>
    <rect x="15" y="16" width="2" height="2" fill="#b45309"/>
    <rect x="14" y="10" width="4" height="2" fill="#1e293b"/> {/* Eye slot */}
    <rect x="15" y="10" width="2" height="2" fill="#fef08a"/> {/* Eye */}
    <rect x="15" y="6" width="2" height="4" fill="#94a3b8"/> {/* Chain */}
  </svg>
);

const EyeAgamottoIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="12" width="12" height="8" fill="#d4af37"/>
    <rect x="12" y="14" width="8" height="4" fill="#1e293b"/> {/* Inner shadow */}
    <rect x="14" y="14" width="4" height="4" fill="#22c55e"/> {/* Time Stone */}
    <rect x="15" y="15" width="2" height="2" fill="#86efac"/> {/* Glow */}
    <rect x="15" y="8" width="2" height="4" fill="#94a3b8"/> {/* String */}
  </svg>
);

const PhilosopherStoneIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="10" width="8" height="12" fill="#dc2626"/>
    <rect x="10" y="12" width="2" height="8" fill="#b91c1c"/>
    <rect x="20" y="12" width="2" height="8" fill="#b91c1c"/>
    <rect x="14" y="12" width="2" height="4" fill="#fca5a5"/> {/* Shine */}
  </svg>
);

const WolfMedallionIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="10" width="12" height="12" fill="#94a3b8"/> {/* Silver Base */}
    <rect x="12" y="12" width="2" height="2" fill="#dc2626"/> {/* Red Eye L */}
    <rect x="18" y="12" width="2" height="2" fill="#dc2626"/> {/* Red Eye R */}
    <rect x="14" y="16" width="4" height="4" fill="#475569"/> {/* Snout */}
    <rect x="12" y="8" width="2" height="2" fill="#e2e8f0"/> {/* Ear L */}
    <rect x="18" y="8" width="2" height="2" fill="#e2e8f0"/> {/* Ear R */}
  </svg>
);

const MaraAmuletIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="10" width="8" height="12" fill="#fbbf24"/> {/* Gold frame */}
    <rect x="14" y="12" width="4" height="8" fill="#0d9488"/> {/* Teal gem */}
    <rect x="15" y="14" width="2" height="2" fill="#5eead4"/> {/* Gem shine */}
  </svg>
);

const BehelitIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="10" width="8" height="12" fill="#b91c1c"/> {/* Fleshy red egg */}
    <rect x="13" y="12" width="2" height="2" fill="#0f172a"/> {/* Eye out of place */}
    <rect x="17" y="16" width="2" height="2" fill="#0f172a"/> {/* Eye out of place */}
    <rect x="14" y="18" width="2" height="2" fill="#0f172a"/> {/* Mouth */}
  </svg>
);

const CoreDrillIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="10" width="8" height="4" fill="#fbbf24"/>
    <rect x="14" y="14" width="4" height="4" fill="#f59e0b"/>
    <rect x="15" y="18" width="2" height="4" fill="#d97706"/>
    <rect x="14" y="12" width="4" height="2" fill="#22c55e"/> {/* Green glow core */}
  </svg>
);

const TriforceIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="14" y="10" width="4" height="4" fill="#fbbf24"/> {/* Top */}
    <rect x="10" y="16" width="4" height="4" fill="#fbbf24"/> {/* Bottom Left */}
    <rect x="18" y="16" width="4" height="4" fill="#fbbf24"/> {/* Bottom Right */}
  </svg>
);

// material baru

const MithrilIngotIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="14" width="12" height="8" fill="#94a3b8"/> {/* Base silver */}
    <rect x="12" y="12" width="8" height="2" fill="#cbd5e1"/> {/* Top face */}
    <rect x="12" y="14" width="8" height="2" fill="#f8fafc"/> {/* Shine */}
    <rect x="8" y="20" width="16" height="2" fill="#475569"/> {/* Shadow */}
  </svg>
);

const BeskarIngotIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="12" width="12" height="10" fill="#334155"/> {/* Dark grey */}
    <rect x="11" y="14" width="10" height="1" fill="#1e293b"/> {/* Damascus pattern */}
    <rect x="11" y="16" width="10" height="1" fill="#0f172a"/>
    <rect x="11" y="18" width="10" height="1" fill="#1e293b"/>
    <rect x="10" y="22" width="12" height="2" fill="#0f172a"/> {/* Shadow */}
  </svg>
);

const VibraniumOreIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="12" width="12" height="10" fill="#1e1b4b"/> {/* Dark rock */}
    <rect x="12" y="10" width="6" height="2" fill="#1e1b4b"/>
    <rect x="13" y="14" width="2" height="4" fill="#a855f7"/> {/* Purple glow */}
    <rect x="16" y="16" width="4" height="2" fill="#a855f7"/>
    <rect x="14" y="15" width="2" height="2" fill="#d946ef"/> {/* Core glow */}
  </svg>
);

const SenzuBeanIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="14" width="8" height="8" fill="#b45309"/> {/* Brown pouch */}
    <rect x="14" y="10" width="4" height="4" fill="#78350f"/> {/* Pouch tie */}
    <rect x="10" y="20" width="12" height="2" fill="#78350f"/> {/* Pouch bottom */}
    <rect x="14" y="16" width="4" height="2" fill="#4ade80"/> {/* Green bean peeking */}
    <rect x="13" y="12" width="6" height="2" fill="#fbbf24"/> {/* Rope */}
  </svg>
);

const SlimeJellyIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="16" width="12" height="6" fill="#38bdf8"/> {/* Blue blob base */}
    <rect x="12" y="12" width="8" height="4" fill="#38bdf8"/>
    <rect x="14" y="10" width="4" height="2" fill="#38bdf8"/> {/* Blob tip */}
    <rect x="12" y="14" width="2" height="2" fill="#bae6fd"/> {/* Shine */}
  </svg>
);

const DragonScaleIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="14" y="8" width="4" height="4" fill="#dc2626"/> {/* Top point */}
    <rect x="12" y="12" width="8" height="8" fill="#b91c1c"/> {/* Middle wide */}
    <rect x="14" y="20" width="4" height="4" fill="#991b1b"/> {/* Bottom point */}
    <rect x="16" y="12" width="2" height="8" fill="#fca5a5" opacity="0.3"/> {/* Shine */}
    <rect x="10" y="14" width="12" height="2" fill="#7f1d1d"/> {/* Texture lines */}
    <rect x="12" y="18" width="8" height="2" fill="#7f1d1d"/>
  </svg>
);

const DemonHornIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="12" y="20" width="6" height="4" fill="#dc2626"/> {/* Red base */}
    <rect x="12" y="16" width="4" height="4" fill="#1e293b"/> {/* Black curve */}
    <rect x="14" y="12" width="4" height="4" fill="#1e293b"/>
    <rect x="16" y="8" width="2" height="4" fill="#0f172a"/> {/* Tip */}
    <rect x="12" y="22" width="6" height="1" fill="#7f1d1d"/> {/* Base shadow */}
  </svg>
);

const KryptoniteIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="14" y="8" width="4" height="16" fill="#22c55e"/> {/* Main crystal */}
    <rect x="12" y="12" width="2" height="10" fill="#16a34a"/> {/* Side cluster L */}
    <rect x="18" y="14" width="2" height="8" fill="#16a34a"/> {/* Side cluster R */}
    <rect x="15" y="10" width="2" height="12" fill="#86efac"/> {/* Inner glow */}
    <rect x="14" y="6" width="2" height="2" fill="#22c55e"/> {/* Sharp tip */}
  </svg>
);

const StarFragmentIcon = () => (
  <svg viewBox="0 0 32 32" width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="14" y="10" width="4" height="12" fill="#fef08a"/> {/* Vertical beam */}
    <rect x="10" y="14" width="12" height="4" fill="#fef08a"/> {/* Horizontal beam */}
    <rect x="12" y="12" width="8" height="8" fill="#fde047"/> {/* Core */}
    <rect x="14" y="14" width="4" height="4" fill="#ca8a04"/> {/* Inner core */}
    <rect x="15" y="15" width="2" height="2" fill="#fff"/> {/* Sparkle */}
  </svg>
);

// ============================================================
// ITEM DATA
// ============================================================
export const ITEMS: ShopItem[] = [
  { id: 1, name: "Shadow Monarch's Cloak", price: 300, rarity: 'legendary', slot: 'cloak',     stat: 'SHADOW ATK +50 / MAGIC DEF +30', icon: <ShadowCloakIcon /> },
  { id: 2, name: "Demon's Edge",           price: 150, rarity: 'epic',      slot: 'weapon',    stat: 'ATK +80 / LIFESTEAL 5%',         icon: <DemonEdgeIcon /> },
  { id: 3, name: "Arcane Mage Robe",       price: 80,  rarity: 'rare',      slot: 'armor',     stat: 'MAGIC ATK +60 / MP +20',         icon: <ArcaneMageRobeIcon /> },
  { id: 4, name: "Knight's Aegis",         price: 75,  rarity: 'rare',      slot: 'armor',     stat: 'DEF +100 / HP +30',              icon: <KnightAegisIcon /> },
  { id: 5, name: "Dragon's Eye Amulet",    price: 300, rarity: 'legendary', slot: 'accessory', stat: 'ALL STATS +40 / FIRE IMMUNE',    icon: <DragonEyeAmuletIcon /> },
  { id: 6, name: "Soul Crystal",           price: 15,  rarity: 'uncommon',  slot: 'potion',    stat: 'CONSUMABLE: 15 HP',              icon: <SoulCrystalIcon /> },
  { id: 7, name: "Void Archer's Bow",      price: 150, rarity: 'epic',      slot: 'weapon',    stat: 'AGI +70 / RANGE ATK +50',        icon: <VoidBowIcon /> },
  { id: 8, name: "Phoenix Helm",           price: 75,  rarity: 'rare',      slot: 'helmet',    stat: 'DEF +40 / REVIVE 1x/BATTLE',     icon: <PhoenixHelmIcon /> },
  // klo nyari senjata disini
  { id: 9,  name: "Cursed Katana 'Enma'",  price: 320, rarity: 'legendary', slot: 'weapon', stat: 'ATK +120 / HAKI DRAIN',  icon: <EnmaKatanaIcon /> },
  { id: 10, name: "Kasaka's Venom Fang",   price: 160, rarity: 'epic',      slot: 'weapon', stat: 'AGI +60 / POISON 10%',   icon: <KasakaFangIcon /> },
  { id: 11, name: "The Elucidator",        price: 300, rarity: 'legendary', slot: 'weapon', stat: 'STR +90 / DUAL WIELD',   icon: <ElucidatorIcon /> },
  { id: 12, name: "Buster Sword",          price: 175, rarity: 'epic',      slot: 'weapon', stat: 'STR +100 / HEAVY',       icon: <BusterSwordIcon /> },
  { id: 13, name: "Zangetsu (Shikai)",     price: 350, rarity: 'legendary', slot: 'weapon', stat: 'ATK +150 / GETSUGA',     icon: <ZangetsuIcon /> },
  { id: 14, name: "Holy Sword Excalibur",  price: 340, rarity: 'legendary', slot: 'weapon', stat: 'MAGIC ATK +120 / HOLY',  icon: <ExcaliburIcon /> },
  { id: 15, name: "Death Scythe",          price: 170, rarity: 'epic',      slot: 'weapon', stat: 'ATK +90 / SOUL STEAL',   icon: <DeathScytheIcon /> },
  { id: 16, name: "Leviathan Axe",         price: 325, rarity: 'legendary', slot: 'weapon', stat: 'STR +130 / FROSTBITE',   icon: <LeviathanAxeIcon /> },
  // klo nyari armor disini
  { id: 17, name: "Turtle School Gi",      price: 40,  rarity: 'uncommon',  slot: 'armor', stat: 'STR +30 / DEF +20',       icon: <TurtleGiIcon /> },
  { id: 18, name: "Survey Corps Jacket",   price: 80,  rarity: 'rare',      slot: 'armor', stat: 'AGI +40 / DEF +25',       icon: <SurveyCorpsIcon /> },
  { id: 19, name: "Akatsuki Robe",         price: 155, rarity: 'epic',      slot: 'armor', stat: 'MAGIC ATK +60 / DEF +30', icon: <AkatsukiIcon /> },
  { id: 20, name: "Iron Powered Suit",     price: 375, rarity: 'legendary', slot: 'armor', stat: 'DEF +120 / FLIGHT',       icon: <IronArmorIcon /> },
  { id: 21, name: "N7 Space Armor",        price: 165, rarity: 'epic',      slot: 'armor', stat: 'DEF +80 / SHIELD +50',    icon: <N7SuitIcon /> },
  { id: 22, name: "Demon Slayer Haori",    price: 75,  rarity: 'rare',      slot: 'armor', stat: 'ATK +50 / DEF +40',       icon: <DemonSlayerIcon /> },
  { id: 23, name: "Jedi Master Tunic",     price: 160, rarity: 'epic',      slot: 'armor', stat: 'INT +70 / EVASION +30',   icon: <JediRobeIcon /> },
  { id: 24, name: "HEV Hazard Suit",       price: 310, rarity: 'legendary', slot: 'armor', stat: 'DEF +100 / RAD RESIST',   icon: <HevSuitIcon /> },
  // klo nyari helmet disini
  { id: 25, name: "Mark 85 Helmet",        price: 300, rarity: 'legendary', slot: 'helmet', stat: 'DEF +40 / HUD SCAN',      icon: <IronHelmIcon /> },
  { id: 26, name: "Straw Hat",             price: 35,  rarity: 'uncommon',  slot: 'helmet', stat: 'LUCK +50 / WILLPOWER',    icon: <StrawHatIcon /> },
  { id: 27, name: "Hidden Leaf Headband",  price: 70,  rarity: 'rare',      slot: 'helmet', stat: 'AGI +20 / CHAKRA +10',    icon: <HiddenLeafIcon /> },
  { id: 28, name: "Boar Head Mask",        price: 80,  rarity: 'rare',      slot: 'helmet', stat: 'STR +30 / PERCEPTION',    icon: <InosukeHelmIcon /> },
  { id: 29, name: "Dark Lord Mask",        price: 175, rarity: 'epic',      slot: 'helmet', stat: 'DEF +60 / FEAR AURA',     icon: <VaderHelmIcon /> },
  { id: 30, name: "Spartan-117 Helmet",    price: 170, rarity: 'epic',      slot: 'helmet', stat: 'DEF +80 / SHIELD +20',    icon: <SpartanHelmIcon /> },
  { id: 31, name: "Hero's Baldness",       price: 400, rarity: 'legendary', slot: 'helmet', stat: 'ALL STATS +100',          icon: <SaitamaBaldIcon /> },
  { id: 32, name: "Vixard's Hollow Mask",  price: 325, rarity: 'legendary', slot: 'helmet', stat: 'DEF +100 / IMMUTABLE',    icon: <HollowMaskIcon /> },
  { id: 33, name: "Scientist Glasses",     price: 75,  rarity: 'rare',      slot: 'helmet', stat: 'INT +50 / HAZARD SENSE',  icon: <GordonGlassesIcon /> },
  // klo nyari cloak disini
  { id: 34, name: "Wings of Freedom Cape", price: 85,  rarity: 'rare',      slot: 'cloak', stat: 'AGI +40 / DODGE +10%',     icon: <SurveyCapeIcon /> },
  { id: 35, name: "Seventh Fire Cloak",    price: 170, rarity: 'epic',      slot: 'cloak', stat: 'MAGIC ATK +60 / WILL',     icon: <HokageCloakIcon /> },
  { id: 36, name: "Cloak of Levitation",   price: 300, rarity: 'legendary', slot: 'cloak', stat: 'AGI +100 / FLIGHT',        icon: <LevitationCloakIcon /> },
  { id: 37, name: "The Dark Cape",         price: 160, rarity: 'epic',      slot: 'cloak', stat: 'DEF +70 / STEALTH',        icon: <DarkCapeIcon /> },
  { id: 38, name: "Caped Baldy's Cape",    price: 400, rarity: 'legendary', slot: 'cloak', stat: 'ALL STATS +100',           icon: <SaitamaCapeIcon /> },
  { id: 39, name: "Black Swordsman Cape",  price: 165, rarity: 'epic',      slot: 'cloak', stat: 'STR +50 / GUTS',           icon: <GutsCapeIcon /> },
  { id: 40, name: "Crimson Lotus Cape",    price: 80,  rarity: 'rare',      slot: 'cloak', stat: 'STR +40 / SPIRIT +20',     icon: <CrimsonCapeIcon /> },
  { id: 41, name: "Vampire Lord Mantle",   price: 320, rarity: 'legendary', slot: 'cloak', stat: 'MAGIC DEF +90 / LIFESTEAL',icon: <VampireMantleIcon /> },
  { id: 42, name: "Winter Wolf Cloak",     price: 40,  rarity: 'uncommon',  slot: 'cloak', stat: 'DEF +40 / ICE RESIST',     icon: <WinterWolfIcon /> },
  // klo nyari amulet disini
  { id: 43, name: "The One Ring",          price: 380, rarity: 'legendary', slot: 'accessory', stat: 'ALL STATS +50 / INVISIBILITY', icon: <OneRingIcon /> },
  { id: 44, name: "Millennium Puzzle",     price: 180, rarity: 'epic',      slot: 'accessory', stat: 'INT +80 / DESTINY DRAW',       icon: <MillenniumPuzzleIcon /> },
  { id: 45, name: "Eye of Agamotto",       price: 375, rarity: 'legendary', slot: 'accessory', stat: 'MAGIC ATK +100 / TIME REWIND', icon: <EyeAgamottoIcon /> },
  { id: 46, name: "Philosopher's Stone",   price: 350, rarity: 'legendary', slot: 'accessory', stat: 'HP +500 / ALCHEMY',            icon: <PhilosopherStoneIcon /> },
  { id: 47, name: "Wolf Medallion",        price: 75,  rarity: 'rare',      slot: 'accessory', stat: 'PERCEPTION +50 / MAGIC SENSE', icon: <WolfMedallionIcon /> },
  { id: 48, name: "Amulet of Mara",        price: 45,  rarity: 'uncommon',  slot: 'accessory', stat: 'CHARISMA +50 / RESTORATION',   icon: <MaraAmuletIcon /> },
  { id: 49, name: "The Behelit",           price: 200, rarity: 'epic',      slot: 'accessory', stat: 'ATK +150 / CURSED',            icon: <BehelitIcon /> },
  { id: 50, name: "Core Drill",            price: 165, rarity: 'epic',      slot: 'accessory', stat: 'STR +80 / SPIRAL POWER',       icon: <CoreDrillIcon /> },
  { id: 51, name: "Triforce Relic",        price: 380, rarity: 'legendary', slot: 'accessory', stat: 'COURAGE / WISDOM / POWER',     icon: <TriforceIcon /> },
  // klo nyari potion disini
  { id: 52, name: "Mithril Ingot",         price: 25,  rarity: 'rare',      slot: 'potion', stat: 'CONSUMABLE: 30 HP',   icon: <MithrilIngotIcon /> },
  { id: 53, name: "Beskar Ingot",          price: 40,  rarity: 'epic',      slot: 'potion', stat: 'CONSUMABLE: 40 HP',   icon: <BeskarIngotIcon /> },
  { id: 54, name: "Vibranium Ore",         price: 60,  rarity: 'legendary', slot: 'potion', stat: 'CONSUMABLE: 60 HP',   icon: <VibraniumOreIcon /> },
  { id: 55, name: "Senzu Bean",            price: 100, rarity: 'uncommon',  slot: 'potion', stat: 'CONSUMABLE: FULL HP', icon: <SenzuBeanIcon /> },
  { id: 56, name: "Slime Jelly",           price: 10,  rarity: 'common',    slot: 'potion', stat: 'CONSUMABLE: 20 HP',   icon: <SlimeJellyIcon /> },
  { id: 57, name: "Dragon Scale",          price: 35,  rarity: 'epic',      slot: 'potion', stat: 'CONSUMABLE: 35 HP',   icon: <DragonScaleIcon /> },
  { id: 58, name: "Demon Horn",            price: 20,  rarity: 'rare',      slot: 'potion', stat: 'CONSUMABLE: 25 HP',   icon: <DemonHornIcon /> },
  { id: 59, name: "Kryptonite Shard",      price: 50,  rarity: 'legendary', slot: 'potion', stat: 'CONSUMABLE: 45 HP',   icon: <KryptoniteIcon /> },
  { id: 60, name: "Star Fragment",         price: 70,  rarity: 'legendary', slot: 'potion', stat: 'CONSUMABLE: 50 HP',   icon: <StarFragmentIcon /> },
];

// ============================================================
// RARITY CONFIG
// ============================================================
const RARITY_STYLE: Record<Rarity, {
  label: string; labelClass: string; border: string; dot: string; hoverShadow: string;
}> = {
  common:    { label: 'COMMON',    labelClass: 'text-slate-400',   border: 'border-slate-600',   dot: 'bg-slate-400',   hoverShadow: '' },
  uncommon:  { label: 'UNCOMMON',  labelClass: 'text-emerald-400', border: 'border-emerald-500', dot: 'bg-emerald-400', hoverShadow: 'hover:shadow-emerald-500/30' },
  rare:      { label: 'RARE',      labelClass: 'text-blue-400',    border: 'border-blue-500',    dot: 'bg-blue-400',    hoverShadow: 'hover:shadow-blue-500/30' },
  epic:      { label: 'EPIC',      labelClass: 'text-purple-400',  border: 'border-purple-500',  dot: 'bg-purple-400',  hoverShadow: 'hover:shadow-purple-500/40' },
  legendary: { label: 'LEGENDARY', labelClass: 'text-amber-400',   border: 'border-amber-400',   dot: 'bg-amber-400',   hoverShadow: 'hover:shadow-amber-400/40' },
};

const SLOT_LABELS: Record<EquipSlot, string> = {
  helmet: '[ HELM ]', cloak: '[ JUBAH ]', armor: '[ ARMOR ]',
  weapon: '[ SENJATA ]', accessory: '[ AKSESORIS ]', potion: '[ RAMUAN ]',
};

// ============================================================
// EQUIPMENT PANEL — shows what's currently worn
// ============================================================
interface EquipmentPanelProps {
  equippedItems: Partial<Record<EquipSlot, number>>;
  onUnequip: (slot: EquipSlot) => void;
}

const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ equippedItems, onUnequip }) => {
  const slots: EquipSlot[] = ['helmet', 'cloak', 'armor', 'weapon', 'accessory'];
  const equippedList = slots.map(slot => ITEMS.find(i => i.id === equippedItems[slot])).filter(Boolean) as ShopItem[];

  return (
    <div className="mt-8 border-t-2 border-slate-700 pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        ▸ ITEM DIGUNAKAN
      </h3>

      {/* Slot grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
        {slots.map((slot) => {
          const itemId = equippedItems[slot];
          const item = ITEMS.find(i => i.id === itemId);
          const rs = item ? RARITY_STYLE[item.rarity] : null;
          return (
            <div
              key={slot}
              className={`
                relative flex flex-col items-center justify-center aspect-square border-2 bg-slate-900
                ${item ? rs!.border + ' cursor-pointer hover:-translate-y-1' : 'border-slate-700 border-dashed'}
                transition-all duration-100 group
              `}
              onClick={() => item && onUnequip(slot)}
              title={item ? `Klik untuk melepas ${item.name}` : 'Slot kosong'}
              style={{ imageRendering: 'pixelated' }}
            >
              {item ? (
                <>
                  {/* unequip X on hover */}
                  <span className="absolute top-1 right-1 text-[8px] text-red-400 opacity-0 group-hover:opacity-100 z-10">✕</span>
                  <div style={{ imageRendering: 'pixelated', transform: 'scale(0.7)' }}>
                    {item.icon}
                  </div>
                  <span className={`text-[9px] font-bold mt-0.5 ${rs!.labelClass} text-center leading-tight px-1`}>
                    {item.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-700 text-base">+</span>
                  <span className="text-[8px] text-slate-500 text-center">{SLOT_LABELS[slot]}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Active stat bonuses */}
      {equippedList.length > 0 && (
        <div className="p-3 bg-slate-900 border-2 border-slate-700">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-2">▸ BONUS AKTIF</p>
          {equippedList.map((item) => (
            <p key={item.id} className="text-[9px] text-emerald-400 leading-loose">
              + {item.stat}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================
interface ShopBoardProps {
  searchQuery?: string;
}

export default function ShopBoard({ searchQuery = "" }: ShopBoardProps) {
  const { stats, inventory, equippedItems, buyItem, equipItem, unequipItem, showConfirm } = useStore();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<EquipSlot | 'all'>('all');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleItemClick = (item: ShopItem) => {
    const isEquipped = equippedItems[item.slot] === item.id;
    const ownedCount = inventory.find(i => i.id === item.id)?.quantity || 0;

    if (isEquipped) {
      unequipItem(item.slot);
      showToast(`Dilepas: ${item.name}`);
    } else if (ownedCount > 0) {
      if (item.slot === 'potion') {
        showToast(`Kamu memiliki ${ownedCount}x ${item.name}`);
      } else {
        equipItem(item.slot, item.id);
        showToast(`Digunakan: ${item.name}!`);
      }
    } else {
      // Buy
      showConfirm(`Apakah kamu yakin ingin membeli [${item.name}] seharga ${item.price} G?`, () => {
        const success = buyItem(item.id, item.price);
        if (success) {
          showToast(`Berhasil membeli ${item.name}!`);
        }
      });
    }
  };

  const categories = [
    { id: 'weapon', label: 'SENJATA' },
    { id: 'armor', label: 'ARMOR' },
    { id: 'helmet', label: 'HELM' },
    { id: 'cloak', label: 'JUBAH' },
    { id: 'accessory', label: 'AKSESORIS' },
    { id: 'potion', label: 'RAMUAN' }
  ];

  return (
    <div className="p-6" style={{ fontFamily: "'Courier New', monospace" }}>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] bg-[#020617] border-b-4 border-amber-500 px-6 py-4
          text-amber-400 text-xs font-pixel uppercase tracking-widest shadow-[0_8px_0_rgba(0,0,0,0.5)] animate-in slide-in-from-top-5 fade-in duration-300 flex items-center gap-3">
          <ShoppingBag size={16} className="text-amber-400" />
          {toast}
        </div>
      )}

      {/* --- HEADER TOKO & LOOT STYLE FOCUS ARENA --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 shrink-0 border-b border-slate-700/50 pb-6">
        <div className="flex flex-col gap-3 text-left">
          <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000]">
            <span className="text-amber-500"><ShoppingBag size={18} /></span>
            TOKO & LOOT
          </h1>
          <p className="font-pixel text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest leading-relaxed">
            BELI PERLENGKAPAN DAN TINGKATKAN KEKUATAN KARAKTERMU.
          </p>
        </div>

        <div className="bg-[#24283b] border-2 border-amber-500 px-6 py-3 flex items-center justify-center gap-3 shadow-[4px_4px_0_#000] shrink-0 w-full md:w-auto">
          <Coins size={16} className="text-amber-400 animate-bounce" />
          <span className="text-sm text-amber-400 font-pixel tracking-widest">{stats.gold} G</span>
        </div>
      </div>
      {/* ------------------------------------------- */}

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-colors uppercase tracking-widest ${activeFilter === 'all' ? 'border-amber-400 text-amber-400 bg-slate-800 shadow-[2px_2px_0_#fbbf24]' : 'border-slate-700 text-slate-500 hover:border-slate-500 bg-slate-900'}`}>SEMUA</button>
        {categories.map(slot => (
          <button key={slot.id} onClick={() => setActiveFilter(slot.id as EquipSlot)} className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-colors uppercase tracking-widest ${activeFilter === slot.id ? 'border-amber-400 text-amber-400 bg-slate-800 shadow-[2px_2px_0_#fbbf24]' : 'border-slate-700 text-slate-500 hover:border-slate-500 bg-slate-900'}`}>
            {slot.label}
          </button>
        ))}
      </div>

      {/* ITEM GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ITEMS.filter(item => 
          (activeFilter === 'all' || item.slot === activeFilter) && 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((item) => {
          const rs = RARITY_STYLE[item.rarity];
          const isEquipped = equippedItems[item.slot] === item.id;
          const ownedCount = inventory.find(i => i.id === item.id)?.quantity || 0;
          const isHovered = hoveredId === item.id;

          return (
            <button
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleItemClick(item)}
              style={{ imageRendering: 'pixelated' }}
              className={`
                relative flex flex-col w-full aspect-[3/4] bg-slate-900 border-2 overflow-hidden
                transition-all duration-100 text-left
                ${isEquipped ? rs.border + ' shadow-lg' : 'border-slate-700'}
                ${isHovered && !isEquipped ? '-translate-y-1 shadow-lg ' + rs.hoverShadow : ''}
                ${ownedCount > 0 && !isEquipped ? 'border-dashed border-emerald-500/50' : ''}
              `}
            >
              {/* Top bar */}
              <div className="flex justify-between items-center px-2 py-1 border-b border-slate-800 shrink-0">
                <span className={`text-[7px] font-bold tracking-widest ${rs.labelClass}`}>{rs.label}</span>
                <div className={`w-2 h-2 ${rs.dot}`} />
              </div>

              {/* Icon + name */}
              <div
                className="flex-1 flex flex-col items-center justify-center gap-2 px-2 relative"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              >
                {/* BADGE DIGUNAKAN */}
                {isEquipped && (
                  <div className="absolute top-2 right-2 z-10 pointer-events-none">
                    <div className="bg-amber-400 text-amber-950 text-[6px] font-pixel px-1.5 py-0.5 tracking-wider border border-amber-900 shadow-[1px_1px_0_#000]">
                      DIGUNAKAN
                    </div>
                  </div>
                )}

                {/* BADGE DIMILIKI */}
                {!isEquipped && ownedCount > 0 && (
                  <div className="absolute top-2 right-2 z-10 pointer-events-none">
                    <div className="bg-emerald-500 text-emerald-950 text-[6px] font-pixel px-1.5 py-0.5 tracking-wider border border-emerald-900 shadow-[1px_1px_0_#000]">
                      DIMILIKI
                    </div>
                  </div>
                )}

                <div
                  className="mt-5"
                  style={{
                    imageRendering: 'pixelated',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.1s',
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-tight text-center leading-tight drop-shadow-md px-2">
                  {item.name}
                </span>
              </div>

              {/* Icon + name */}
              <div
                className="flex-1 flex flex-col items-center justify-center gap-2 px-2 relative"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              >
                <div
                  style={{
                    imageRendering: 'pixelated',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.1s',
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-tight text-center leading-tight drop-shadow-md px-2">
                  {item.name}
                </span>
              </div>

              {/* Hover tooltip (scanline overlay) */}
              {isHovered && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center px-2 z-20"
                  style={{
                    background: 'rgba(10,6,30,0.93)',
                    backgroundImage:
                      'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)',
                  }}
                >
                  <div className="text-center">
                    {item.stat.split('/').map((s, i) => (
                      <p key={i} className="text-[10px] font-bold text-emerald-400 font-mono leading-loose">{s.trim()}</p>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-400 font-mono mt-2 uppercase">
                    SLOT: {categories.find(c => c.id === item.slot)?.label || item.slot}
                  </p>
                  <p className="text-[11px] font-bold mt-3 text-amber-400">
                    {isEquipped ? '▸ LEPAS' : ownedCount > 0 ? (item.slot === 'potion' ? `▸ DIMILIKI: ${ownedCount}` : '▸ GUNAKAN') : `▸ BELI (${item.price} G)`}
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="bg-slate-950 border-t-2 border-slate-800 py-2 flex items-center justify-center gap-1.5">
                <div
                  className="w-3 h-3 bg-amber-400"
                  style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }}
                />
                <span className="font-bold text-amber-400 text-[10px] tracking-widest">{item.price} G</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* EQUIPMENT PANEL */}
      <EquipmentPanel equippedItems={equippedItems} onUnequip={unequipItem} />
    </div>
  );
}