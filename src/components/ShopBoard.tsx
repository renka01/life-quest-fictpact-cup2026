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

// ============================================================
// ITEM DATA
// ============================================================
export const ITEMS: ShopItem[] = [
  { id: 1, name: "Shadow Monarch's Cloak", price: 250, rarity: 'legendary', slot: 'cloak',     stat: 'SHADOW ATK +50 / MAGIC DEF +30', icon: <ShadowCloakIcon /> },
  { id: 2, name: "Demon's Edge",           price: 180, rarity: 'epic',      slot: 'weapon',    stat: 'ATK +80 / LIFESTEAL 5%',          icon: <DemonEdgeIcon /> },
  { id: 3, name: "Arcane Mage Robe",       price: 130, rarity: 'rare',      slot: 'armor',     stat: 'MAGIC ATK +60 / MP +20',          icon: <ArcaneMageRobeIcon /> },
  { id: 4, name: "Knight's Aegis",         price: 120, rarity: 'rare',      slot: 'armor',     stat: 'DEF +100 / HP +30',               icon: <KnightAegisIcon /> },
  { id: 5, name: "Dragon's Eye Amulet",    price: 300, rarity: 'legendary', slot: 'accessory', stat: 'ALL STATS +40 / FIRE IMMUNE',     icon: <DragonEyeAmuletIcon /> },
  { id: 6, name: "Soul Crystal",           price: 75,  rarity: 'uncommon',  slot: 'material',  stat: 'XP +15 / CRAFTING MAT',           icon: <SoulCrystalIcon /> },
  { id: 7, name: "Void Archer's Bow",      price: 200, rarity: 'epic',      slot: 'weapon',    stat: 'AGI +70 / RANGE ATK +50',         icon: <VoidBowIcon /> },
  { id: 8, name: "Phoenix Helm",           price: 160, rarity: 'rare',      slot: 'helmet',    stat: 'DEF +40 / REVIVE 1x/BATTLE',      icon: <PhoenixHelmIcon /> },
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
  helmet: '[ HEAD ]', cloak: '[ BACK ]', armor: '[ BODY ]',
  weapon: '[ WEAPON ]', accessory: '[ NECK ]', material: '[ BAG ]',
};

// ============================================================
// EQUIPMENT PANEL — shows what's currently worn
// ============================================================
interface EquipmentPanelProps {
  equippedItems: Partial<Record<EquipSlot, number>>;
  onUnequip: (slot: EquipSlot) => void;
}

const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ equippedItems, onUnequip }) => {
  const slots: EquipSlot[] = ['helmet', 'cloak', 'armor', 'weapon', 'accessory', 'material'];
  const equippedList = slots.map(slot => ITEMS.find(i => i.id === equippedItems[slot])).filter(Boolean) as ShopItem[];

  return (
    <div className="mt-8 border-t-2 border-slate-700 pt-6" style={{ fontFamily: "'Courier New', monospace" }}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        ▸ EQUIPPED ITEMS
      </h3>

      {/* Slot grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
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
              title={item ? `Click to unequip ${item.name}` : 'Empty slot'}
              style={{ imageRendering: 'pixelated' }}
            >
              {item ? (
                <>
                  {/* unequip X on hover */}
                  <span className="absolute top-1 right-1 text-[8px] text-red-400 opacity-0 group-hover:opacity-100 z-10">✕</span>
                  <div style={{ imageRendering: 'pixelated', transform: 'scale(0.7)' }}>
                    {item.icon}
                  </div>
                  <span className={`text-[6px] font-bold mt-0.5 ${rs!.labelClass} text-center leading-tight px-1`}>
                    {item.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-700 text-base">+</span>
                  <span className="text-[6px] text-slate-600 text-center">{SLOT_LABELS[slot]}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Active stat bonuses */}
      {equippedList.length > 0 && (
        <div className="p-3 bg-slate-900 border-2 border-slate-700">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-2">▸ ACTIVE BONUSES</p>
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
export default function ShopBoard() {
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
      showToast(`Unequipped: ${item.name}`);
    } else if (ownedCount > 0) {
      if (item.slot === 'material') {
        showToast(`You have ${ownedCount}x ${item.name}`);
      } else {
        equipItem(item.slot, item.id);
        showToast(`Equipped: ${item.name}!`);
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

  return (
    <div className="p-6" style={{ fontFamily: "'Courier New', monospace" }}>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-8 right-8 z-[100] bg-[#020617] border-l-4 border-amber-400 p-4
          text-amber-400 text-xs font-pixel uppercase tracking-widest shadow-[8px_8px_0_rgba(0,0,0,0.5)] animate-in slide-in-from-top-5 fade-in duration-300 flex items-center gap-3">
          <ShoppingBag size={16} className="text-amber-400" />
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-slate-700 pb-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-3 tracking-widest uppercase">
          <ShoppingBag className="text-cyan-400" size={16} />
          [ TOKO &amp; LOOT ]
        </h2>
        <div className="bg-slate-800 px-4 py-2 border-2 border-amber-500 flex items-center gap-2">
          <Coins size={12} className="text-amber-400" />
          <span className="text-xs text-amber-400 font-bold tracking-widest">{stats.gold} G</span>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-colors uppercase tracking-widest ${activeFilter === 'all' ? 'border-amber-400 text-amber-400 bg-slate-800 shadow-[2px_2px_0_#fbbf24]' : 'border-slate-700 text-slate-500 hover:border-slate-500 bg-slate-900'}`}>ALL</button>
        {['weapon', 'armor', 'helmet', 'cloak', 'accessory', 'material'].map(slot => (
          <button key={slot} onClick={() => setActiveFilter(slot as EquipSlot)} className={`px-3 py-1.5 text-[10px] font-bold border-2 transition-colors uppercase tracking-widest ${activeFilter === slot ? 'border-amber-400 text-amber-400 bg-slate-800 shadow-[2px_2px_0_#fbbf24]' : 'border-slate-700 text-slate-500 hover:border-slate-500 bg-slate-900'}`}>{slot}</button>
        ))}
      </div>

      {/* ITEM GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ITEMS.filter(item => activeFilter === 'all' || item.slot === activeFilter).map((item) => {
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
              <div className="flex justify-between items-center px-2 py-1 border-b border-slate-800">
                <span className={`text-[7px] font-bold tracking-widest ${rs.labelClass}`}>{rs.label}</span>
                <div className={`w-2 h-2 ${rs.dot}`} />
              </div>

              {/* EQUIPPED badge */}
              {isEquipped && (
                <div className="absolute top-2 right-2 z-10 pointer-events-none">
                  <div className="bg-amber-400 text-amber-950 text-[8px] font-pixel px-2 py-1 tracking-widest border-2 border-amber-950 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    EQUIPPED
                  </div>
                </div>
              )}

              {/* OWNED BADGE (Muncul jika punya tapi sedang tidak dipakai) */}
              {!isEquipped && ownedCount > 0 && (
                <div className="absolute top-2 right-2 z-10 pointer-events-none">
                  <div className="bg-emerald-500 text-emerald-950 text-[8px] font-pixel px-2 py-1 tracking-widest border-2 border-emerald-950 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                    OWNED: {ownedCount}
                  </div>
                </div>
              )}

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
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight text-center leading-tight drop-shadow-md px-1">
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
                      <p key={i} className="text-[9px] text-emerald-400 font-mono leading-loose">{s.trim()}</p>
                    ))}
                  </div>
                  <p className="text-[7px] text-slate-500 font-mono mt-1 uppercase">SLOT: {item.slot}</p>
                  <p className="text-[8px] font-mono mt-2 text-amber-400">
                    {isEquipped ? '▸ UNEQUIP' : ownedCount > 0 ? (item.slot === 'material' ? `▸ OWNED: ${ownedCount}` : '▸ EQUIP') : `▸ BUY (${item.price} G)`}
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
