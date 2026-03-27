"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Instagram, Twitter, Github, Eye, EyeOff, X, Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

// ═══════════════════════════════════════════════════════════
// PIXEL ART CHARACTER SPRITES (Dibuat Full Responsive)
// ═══════════════════════════════════════════════════════════

/** Shadow Knight */
const ShadowKnight = () => (
  <svg viewBox="-4 0 40 32" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes sk{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.skc{animation:sk 0.9s steps(2) infinite}`}</style>
    <g className="skc">
      <path d="M11 5 H21 V10 H22 V12 H24 V20 H25 V23 H23 V20 H22 V28 H18 V24 H14 V28 H10 V20 H9 V23 H7 V20 H8 V12 H10 V10 H11 V5 Z M8 20 H11 V24 H8 V20 Z" fill="black"/>
      <rect x="12" y="10" width="8" height="10" fill="#1e293b"/>
      <rect x="12" y="10" width="4" height="10" fill="#334155"/>
      <rect x="12" y="10" width="8" height="1" fill="#7c3aed"/>
      <rect x="12" y="19" width="8" height="1" fill="#7c3aed"/>
      <rect x="15" y="11" width="2" height="7" fill="#7c3aed" opacity="0.6"/>
      <rect x="13" y="14" width="6" height="1" fill="#7c3aed" opacity="0.4"/>
      <rect x="9" y="10" width="4" height="3" fill="#334155"/>
      <rect x="9" y="10" width="4" height="1" fill="#7c3aed"/>
      <rect x="19" y="10" width="4" height="3" fill="#334155"/>
      <rect x="19" y="10" width="4" height="1" fill="#7c3aed"/>
      <rect x="11" y="5" width="10" height="5" fill="#1e293b"/>
      <rect x="11" y="5" width="10" height="1" fill="#7c3aed"/>
      <rect x="12" y="6" width="8" height="4" fill="#334155"/>
      <rect x="13" y="8" width="3" height="1" fill="#a855f7"/>
      <rect x="16" y="8" width="3" height="1" fill="#a855f7"/>
      <rect x="12" y="6" width="8" height="5" fill="#ffdbac"/>
      <rect x="11" y="5" width="10" height="5" fill="#1e293b"/>
      <rect x="12" y="6" width="8" height="4" fill="#334155"/>
      <rect x="13" y="8" width="2" height="1" fill="#a855f7"/>
      <rect x="17" y="8" width="2" height="1" fill="#a855f7"/>
      <rect x="9" y="13" width="3" height="7" fill="#334155"/>
      <rect x="20" y="13" width="3" height="7" fill="#334155"/>
      <rect x="8" y="20" width="3" height="3" fill="#1e293b"/>
      <rect x="21" y="20" width="3" height="3" fill="#1e293b"/>
      <g transform="rotate(135 22.5 22.5)">
        <rect x="22" y="11" width="1" height="11" fill="#1e293b"/>
        <rect x="22" y="11" width="1" height="10" fill="#be123c" opacity="0.7"/>
        <rect x="19" y="22" width="7" height="1" fill="#334155"/>
        <rect x="22" y="23" width="1" height="4" fill="#292524"/>
        <rect x="21" y="27" width="3" height="1" fill="#1e293b"/>
        <rect x="22" y="11" width="1" height="1" fill="#f8fafc"/>
        <rect x="21" y="15" width="1" height="1" fill="#e11d48">
          <animate attributeName="opacity" values="1;0;1" dur="0.4s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>
      <rect x="18" y="20" width="3" height="4" fill="#1e293b"/>
      <rect x="11" y="20" width="3" height="4" fill="#334155"/>
    </g>
  </svg>
);

/** Arcane Mage */
const ArcaneMage = () => (
  <svg viewBox="-4 0 40 32" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes am{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.amc{animation:am 1s steps(2) infinite}`}</style>
    <g className="amc">
      <path d="M11 5 H21 V10 H22 V12 H24 V20 H25 V23 H23 V20 H22 V28 H18 V24 H14 V28 H10 V20 H9 V23 H7 V20 H8 V12 H10 V10 H11 V5 Z M8 20 H11 V24 H8 V20 Z" fill="black"/>
      <rect x="11" y="10" width="10" height="10" fill="#1e3a5f"/>
      <rect x="16" y="10" width="4" height="10" fill="#0c1a2e"/>
      <rect x="11" y="10" width="10" height="1" fill="#fbbf24"/>
      <rect x="11" y="19" width="10" height="1" fill="#fbbf24"/>
      <rect x="15" y="11" width="2" height="1" fill="#fbbf24"/>
      <rect x="15" y="13" width="2" height="1" fill="#7dd3fc"/>
      <rect x="14" y="14" width="4" height="1" fill="#7dd3fc" opacity="0.6"/>
      <rect x="8" y="12" width="4" height="8" fill="#1e3a5f"/>
      <rect x="8" y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/>
      <rect x="20" y="12" width="4" height="8" fill="#0c1a2e"/>
      <rect x="20" y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/>
      <rect x="8" y="20" width="4" height="3" fill="#1e3a5f"/>
      <rect x="9" y="21" width="2" height="1" fill="#38bdf8"/>
      <rect x="20" y="20" width="4" height="3" fill="#0c1a2e"/>
      <rect x="21" y="21" width="2" height="1" fill="#38bdf8"/>
      <rect x="12" y="6" width="8" height="5" fill="#ffdbac"/>
      <rect x="13" y="8" width="2" height="1" fill="black"/>
      <rect x="17" y="8" width="2" height="1" fill="black"/>
      <rect x="10" y="3" width="12" height="3" fill="#1e3a5f"/>
      <rect x="11" y="2" width="10" height="2" fill="#164e63"/>
      <rect x="13" y="1" width="6" height="2" fill="#0c4a6e"/>
      <rect x="15" y="0" width="2" height="2" fill="#fbbf24"/>
      <rect x="10" y="3" width="12" height="1" fill="#fbbf24"/>
      <rect x="9" y="4" width="2" height="16" fill="#92400e"/>
      <rect x="9" y="4" width="1" height="16" fill="#b45309" opacity="0.5"/>
      <rect x="8" y="11" width="4" height="1" fill="#fbbf24"/>
      <rect x="7" y="1" width="6" height="5" fill="#4c1d95"/>
      <rect x="8" y="2" width="4" height="3" fill="#7c3aed"/>
      <rect x="9" y="2" width="2" height="3" fill="#a78bfa"/>
      <rect x="8" y="2" width="4" height="3" fill="#a78bfa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="0.8s" repeatCount="indefinite" calcMode="discrete"/>
      </rect>
      <rect x="18" y="20" width="3" height="4" fill="#1e3a5f"/>
      <rect x="11" y="20" width="3" height="4" fill="#0c1a2e"/>
    </g>
  </svg>
);

/** Void Ranger */
const VoidRanger = () => (
  <svg viewBox="-4 0 40 32" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <style>{`@keyframes vr{0%,100%{transform:translateY(0)}50%{transform:translateY(1px)}}.vrc{animation:vr 0.8s steps(2) infinite}`}</style>
    <g className="vrc">
      <path d="M11 5 H21 V10 H22 V12 H24 V20 H25 V23 H23 V20 H22 V28 H18 V24 H14 V28 H10 V20 H9 V23 H7 V20 H8 V12 H10 V10 H11 V5 Z M8 20 H11 V24 H8 V20 Z" fill="black"/>
      <rect x="12" y="10" width="8" height="10" fill="#065f46"/>
      <rect x="13" y="11" width="6" height="8" fill="#047857"/>
      <rect x="14" y="12" width="4" height="6" fill="#059669" opacity="0.5"/>
      <rect x="12" y="10" width="8" height="1" fill="#34d399" opacity="0.4"/>
      <rect x="9" y="10" width="4" height="3" fill="#065f46"/>
      <rect x="19" y="10" width="4" height="3" fill="#065f46"/>
      <rect x="9" y="13" width="3" height="7" fill="#065f46"/>
      <rect x="20" y="13" width="3" height="7" fill="#047857"/>
      <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
      <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
      <rect x="12" y="6" width="8" height="5" fill="#ffdbac"/>
      <rect x="13" y="8" width="2" height="1" fill="black"/>
      <rect x="17" y="8" width="2" height="1" fill="black"/>
      <rect x="11" y="5" width="10" height="2" fill="#065f46"/>
      <rect x="10" y="6" width="2" height="3" fill="#065f46"/>
      <rect x="20" y="6" width="2" height="3" fill="#065f46"/>
      <rect x="8"  y="9"  width="2" height="2" fill="#1e1b4b"/>
      <rect x="7"  y="11" width="2" height="4" fill="#312e81"/>
      <rect x="6"  y="15" width="2" height="2" fill="#4338ca"/>
      <rect x="6"  y="17" width="4" height="4" fill="#312e81"/>
      <rect x="7"  y="18" width="2" height="2" fill="#818cf8"/>
      <rect x="6"  y="21" width="2" height="2" fill="#4338ca"/>
      <rect x="7"  y="23" width="2" height="4" fill="#312e81"/>
      <rect x="10" y="10" width="1" height="2" fill="#818cf8" opacity="0.8"/>
      <rect x="11" y="12" width="1" height="2" fill="#a5b4fc"/>
      <rect x="12" y="14" width="1" height="3" fill="#e0e7ff"/>
      <rect x="12" y="17" width="1" height="3" fill="#e0e7ff"/>
      <rect x="11" y="20" width="1" height="2" fill="#a5b4fc"/>
      <rect x="10" y="22" width="1" height="2" fill="#818cf8" opacity="0.8"/>
      <rect x="18" y="20" width="3" height="4" fill="#065f46"/>
      <rect x="11" y="20" width="3" height="4" fill="#047857"/>
    </g>
  </svg>
);

// ═══════════════════════════════════════════════════════════
// NEW PIXEL LANDSCAPE: GRAND SPARTAN EMPIRE
// ═══════════════════════════════════════════════════════════
const GrandSpartanLandscape = () => (
  <svg viewBox="0 0 800 150" width="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block', height: '180px' }}>
    <path d="M0,150 L0,80 L80,50 L150,90 L250,40 L380,100 L500,60 L650,110 L800,30 L800,150 Z" fill="#27272a" opacity="0.5"/>
    <path d="M0,150 L0,100 L120,60 L280,110 L450,70 L600,100 L800,60 L800,150 Z" fill="#3f3f46" opacity="0.3"/>
    <rect x="30" y="130" width="240" height="5" fill="#78350f" />
    <rect x="40" y="125" width="220" height="5" fill="#92400e" />
    <rect x="50" y="120" width="200" height="5" fill="#b45309" />
    {[...Array(7)].map((_, i) => (
      <g key={`col-${i}`}>
        <rect x={60 + i * 30} y="60" width="10" height="60" fill="#fcd34d" />
        <rect x={66 + i * 30} y="60" width="4" height="60" fill="#f59e0b" />
      </g>
    ))}
    <rect x="45" y="50" width="210" height="10" fill="#f59e0b" />
    <polygon points="40,50 150,15 260,50" fill="#991b1b" />
    <polygon points="40,50 150,15 150,50" fill="#b91c1c" opacity="0.6"/>
    <rect x="500" y="75" width="260" height="60" fill="#92400e" />
    <rect x="520" y="55" width="220" height="20" fill="#78350f" />
    <rect x="500" y="75" width="260" height="4" fill="#f59e0b" />
    {[...Array(6)].map((_, i) => (
      <path key={`arch1-${i}`} d={`M${520 + i*40},135 L${520 + i*40},100 A10,10 0 0,1 ${540 + i*40},100 L${540 + i*40},135 Z`} fill="#18181b" />
    ))}
    {[...Array(5)].map((_, i) => (
      <path key={`arch2-${i}`} d={`M${540 + i*40},75 L${540 + i*40},62 A8,8 0 0,1 ${556 + i*40},62 L${556 + i*40},75 Z`} fill="#18181b" />
    ))}
    <rect x="510" y="75" width="8" height="35" fill="#dc2626" />
    <polygon points="510,110 514,118 518,110" fill="#dc2626" />
    <rect x="740" y="75" width="8" height="35" fill="#dc2626" />
    <polygon points="740,110 744,118 748,110" fill="#dc2626" />
    <rect x="350" y="95" width="16" height="40" fill="#d97706" />
    <rect x="345" y="130" width="26" height="5" fill="#92400e" />
    <polygon points="350,95 366,95 366,85" fill="#d97706" />
    <rect x="420" y="115" width="14" height="20" fill="#b45309" />
    <rect x="415" y="130" width="24" height="5" fill="#78350f" />
    <rect x="380" y="125" width="3" height="10" fill="#fcd34d" transform="rotate(15 380 125)"/>
    <rect x="0" y="135" width="800" height="15" fill="#18181b" />
  </svg>
);

// ═══════════════════════════════════════════════════════════
// FLOATING GOLD COINS
// ═══════════════════════════════════════════════════════════
const FloatingCoin = ({ x, y, delay }: { x: number | string; y: number | string; delay: number }) => (
  <div className="hidden sm:block" style={{
    position: 'absolute', left: x, top: y,
    animation: `float ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
    opacity: 0.5, pointerEvents: 'none',
  }}>
    <svg viewBox="0 0 12 12" width="24" height="24" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="1" width="4" height="1" fill="#f59e0b"/>
      <rect x="3" y="2" width="6" height="8" fill="#fbbf24"/>
      <rect x="2" y="3" width="8" height="6" fill="#fcd34d"/>
      <rect x="5" y="3" width="2" height="6" fill="#f59e0b" opacity="0.4"/>
      <rect x="4" y="10" width="4" height="1" fill="#d97706"/>
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════════════
// CUSTOM FEATURE ICONS
// ═══════════════════════════════════════════════════════════
const HabitTrackerIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      <rect x="4" y="8" width="40" height="8" fill="#f8fafc" opacity="0.9"/>
      <rect x="4" y="8" width="8" height="8" fill="#4ade80"/>
      <rect x="6" y="11" width="4" height="2" fill="#ffffff"/>
      <rect x="7" y="10" width="2" height="4" fill="#ffffff"/>
      <rect x="14" y="11" width="12" height="2" fill="#cbd5e1"/>
      <rect x="10" y="20" width="38" height="8" fill="#f8fafc" opacity="0.9"/>
      <rect x="10" y="20" width="8" height="8" fill="#2dd4bf"/>
      <rect x="12" y="23" width="4" height="2" fill="#ffffff"/>
      <rect x="13" y="22" width="2" height="4" fill="#ffffff"/>
      <rect x="20" y="23" width="16" height="2" fill="#cbd5e1"/>
      <rect x="2" y="32" width="40" height="8" fill="#f8fafc" opacity="0.9"/>
      <rect x="2" y="32" width="8" height="8" fill="#38bdf8"/>
      <rect x="5" y="35" width="2" height="2" fill="#ffffff"/>
      <rect x="34" y="32" width="8" height="8" fill="#38bdf8"/>
      <rect x="36" y="35" width="4" height="2" fill="#ffffff"/>
      <rect x="37" y="34" width="2" height="4" fill="#ffffff"/>
      <rect x="12" y="35" width="14" height="2" fill="#cbd5e1"/>
    </g>
  </svg>
);

const LootRewardIcon = () => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      <rect x="36" y="6" width="4" height="4" fill="#fbbf24"/>
      <rect x="34" y="8" width="8" height="2" fill="#fde047"/>
      <rect x="36" y="4" width="2" height="8" fill="#fde047"/>
      <g transform="rotate(45 30 20)">
        <rect x="28" y="6" width="4" height="20" fill="#4ade80"/>
        <rect x="26" y="26" width="8" height="2" fill="#fbbf24"/>
        <rect x="28" y="28" width="4" height="6" fill="#78350f"/>
      </g>
      <rect x="6" y="14" width="4" height="4" fill="#38bdf8"/>
      <rect x="4" y="18" width="8" height="8" fill="#0ea5e9"/>
      <rect x="6" y="20" width="2" height="4" fill="#cffafe"/>
      <rect x="8" y="34" width="8" height="8" fill="#eab308"/>
      <rect x="10" y="32" width="4" height="12" fill="#facc15"/>
      <rect x="6" y="36" width="12" height="4" fill="#facc15"/>
      <rect x="10" y="36" width="4" height="4" fill="#ca8a04"/>
      <rect x="22" y="24" width="14" height="14" fill="#5b21b6"/>
      <rect x="20" y="28" width="18" height="10" fill="#7c3aed"/>
      <rect x="24" y="20" width="10" height="6" fill="#5b21b6"/>
      <rect x="22" y="26" width="14" height="2" fill="#a855f7"/>
      <rect x="26" y="26" width="2" height="2" fill="#fef08a"/>
      <rect x="30" y="26" width="2" height="2" fill="#fef08a"/>
      <rect x="28" y="28" width="2" height="2" fill="#f59e0b"/>
      <rect x="26" y="16" width="6" height="6" fill="#1e1b4b"/> 
      <rect x="22" y="22" width="14" height="2" fill="#312e81"/> 
    </g>
  </svg>
);

const SangarDragonIcon = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      <rect x="22" y="2" width="2" height="6" fill="#e2e8f0"/>
      <rect x="20" y="4" width="2" height="6" fill="#cbd5e1"/>
      <rect x="24" y="6" width="2" height="6" fill="#94a3b8"/>
      <rect x="26" y="10" width="2" height="6" fill="#64748b"/>
      <rect x="28" y="14" width="2" height="6" fill="#475569"/>
      <rect x="18" y="10" width="8" height="22" fill="#3f3f46"/>
      <rect x="16" y="14" width="2" height="18" fill="#27272a"/>
      <rect x="10" y="8" width="10" height="10" fill="#52525b"/>
      <rect x="6" y="12" width="4" height="4" fill="#52525b"/>
      <rect x="4" y="20" width="12" height="4" fill="#3f3f46"/>
      <rect x="2" y="22" width="2" height="2" fill="#27272a"/>
      <rect x="8" y="16" width="8" height="4" fill="#18181b"/>
      <rect x="10" y="16" width="6" height="2" fill="#9f1239"/>
      <rect x="6" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="8" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="10" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="5" y="19" width="1" height="1" fill="#f8fafc"/>
      <rect x="7" y="19" width="1" height="1" fill="#f8fafc"/>
      <rect x="9" y="19" width="1" height="1" fill="#f8fafc"/>
      <rect x="12" y="10" width="2" height="2" fill="#fef08a"/>
      <rect x="13" y="10" width="1" height="1" fill="#000000"/>
      <rect x="8" y="4" width="2" height="4" fill="#cbd5e1"/>
      <rect x="10" y="2" width="2" height="6" fill="#e2e8f0"/>
      <rect x="12" y="4" width="2" height="4" fill="#94a3b8"/>
      <rect x="14" y="0" width="2" height="8" fill="#f8fafc"/>
      <rect x="16" y="2" width="2" height="6" fill="#e2e8f0"/>
      <rect x="18" y="16" width="4" height="2" fill="#71717a"/>
      <rect x="20" y="20" width="4" height="2" fill="#71717a"/>
      <rect x="18" y="24" width="4" height="2" fill="#71717a"/>
      <rect x="20" y="28" width="4" height="2" fill="#71717a"/>
      <rect x="0" y="18" width="4" height="2" fill="#c084fc"/>
      <rect x="2" y="16" width="2" height="2" fill="#d8b4fe"/>
    </g>
  </svg>
);

// ═══════════════════════════════════════════════════════════
// MODAL & KONTEN KEBIJAKAN PRIVASI / SYARAT
// ═══════════════════════════════════════════════════════════
const PrivacyContent = ({ lang = 'id' }: { lang?: string }) => (
  lang === 'id' ? (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>Terakhir diperbarui: 26 Maret 2026</p>
      <p>Aplikasi Daily Dungeon ("kami") menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan aplikasi kami.</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Informasi yang Kami Kumpulkan</h3>
      <p>Kami hanya mengumpulkan informasi yang esensial untuk fungsionalitas aplikasi, yaitu: alamat email Anda untuk keperluan autentikasi akun. Kami tidak mengumpulkan data pribadi sensitif lainnya.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. Penggunaan Informasi</h3>
      <p>Alamat email Anda digunakan secara eksklusif untuk: membuat dan mengelola akun Anda, mereset kata sandi, dan proses autentikasi lainnya. Kami tidak akan pernah mengirimkan email promosi atau membagikan email Anda kepada pihak ketiga.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Keamanan Data</h3>
      <p>Kami menggunakan langkah-langkah keamanan standar industri untuk melindungi data Anda dari akses yang tidak sah. Kata sandi Anda di-hash dan tidak dapat kami lihat.</p>
    </div>
  ) : (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>Last updated: March 26, 2026</p>
      <p>The Daily Dungeon application ("we") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our application.</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Information We Collect</h3>
      <p>We only collect essential information for the app's functionality, namely: your email address for account authentication purposes. We do not collect other sensitive personal data.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. Use of Information</h3>
      <p>Your email address is strictly used to: create and manage your account, reset passwords, and other authentication processes. We will never send promotional emails or share your email with third parties.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Data Security</h3>
      <p>We use industry-standard security measures to protect your data from unauthorized access. Your passwords are hashed and cannot be seen by us.</p>
    </div>
  )
);

const TermsContent = ({ lang = 'id' }: { lang?: string }) => (
  lang === 'id' ? (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>Dengan menggunakan aplikasi Daily Dungeon, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut:</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Penggunaan Akun</h3>
      <p>Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda. Jaga kerahasiaan kata sandi Anda dan jangan bagikan dengan siapa pun.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. Perilaku Pengguna</h3>
      <p>Anda setuju untuk tidak menggunakan aplikasi ini untuk tujuan ilegal atau yang dilarang. Dilarang keras melakukan pelecehan, spam, atau mencoba merusak integritas sistem kami.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Pembatasan Tanggung Jawab</h3>
      <p>Aplikasi ini disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas kehilangan data atau kerusakan lain yang mungkin timbul dari penggunaan aplikasi ini.</p>
    </div>
  ) : (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>By using the Daily Dungeon application, you agree to be bound by the following Terms and Conditions:</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Account Usage</h3>
      <p>You are fully responsible for all activities that occur under your account. Keep your password confidential and do not share it with anyone.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. User Conduct</h3>
      <p>You agree not to use this application for illegal or prohibited purposes. Harassment, spamming, or attempting to compromise the integrity of our system is strictly prohibited.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Limitation of Liability</h3>
      <p>This application is provided "as is". We are not responsible for data loss or other damages that may arise from the use of this application.</p>
    </div>
  )
);

const PolicyModal = ({ isOpen, onClose, title, children, lang = 'id' }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; lang?: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[10000] p-4 animate-in fade-in-50" onClick={onClose}>
      <div 
        className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-zinc-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-amber-400">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 border-t border-zinc-700 flex-shrink-0 text-right">
          <button 
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </footer>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const { setUserProfile, settings, updateSetting } = useStore();
  
  const [tab,     setTab]    = useState<Tab>('login');
  const [email,   setEmail]  = useState('');
  const [pass,    setPass]   = useState('');
  const [pass2,   setPass2]  = useState('');
  const [error,   setError]  = useState('');
  const [loading, setLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showPass,  setShowPass]  = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const lang = settings?.language || 'id';
  const t = {
    start: lang === 'id' ? 'Ayo Mulai' : 'Start',
    langLabel: lang === 'id' ? 'ID' : 'EN',
    faq: lang === 'id' ? 'Pelajari Lebih Lanjut' : 'Learn More',
    registerBtn: lang === 'id' ? 'Daftar' : 'Register',
    loginBtn: lang === 'id' ? 'Masuk' : 'Login',
    titleLogin: lang === 'id' ? 'Masuk ke Arena' : 'Enter the Arena',
    titleRegister: lang === 'id' ? 'Daftar Sebagai Petarung' : 'Register as a Fighter',
    emailReq: lang === 'id' ? 'Email dan kata sandi wajib diisi.' : 'Email and password are required.',
    passMatch: lang === 'id' ? 'Kata sandi tidak cocok!' : 'Passwords do not match!',
    emailPlaceholder: 'Email',
    passPlaceholder: lang === 'id' ? 'Kata Sandi' : 'Password',
    confirmPassPlaceholder: lang === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm Password',
    loadingBtn: lang === 'id' ? 'Membuka Gerbang...' : 'Opening Gates...',
    forgotPass: lang === 'id' ? 'Lupa Kata Sandi?' : 'Forgot Password?',
    continueBtn: lang === 'id' ? 'Lanjutkan' : 'Continue',
    or: lang === 'id' ? 'ATAU' : 'OR',
    googleLogin: lang === 'id' ? 'Masuk dengan Google' : 'Login with Google',
    googleReg: lang === 'id' ? 'Daftar dengan Google' : 'Register with Google',
    githubLogin: lang === 'id' ? 'Masuk dengan Github' : 'Login with Github',
    githubReg: lang === 'id' ? 'Daftar dengan Github' : 'Register with Github',
    heroTitle: lang === 'id' ? 'Buat Hidupmu Menjadi Game' : 'Gamify Your Life',
    heroDesc: lang === 'id' 
      ? 'Daily Dungeon adalah aplikasi untuk membangun produktivitas dan kebiasaan baik dengan mengubah kehidupan nyata menjadi permainan. Dengan sistem imbalan dan leveling layaknya game RPG, aplikasi ini memotivasimu untuk mencapai target, bekerja keras, dan melawan kemalasan.'
      : 'Daily Dungeon is an app to build productivity and good habits by turning real life into a game. With a reward and leveling system like an RPG, it motivates you to achieve your goals, work hard, and fight laziness.',
    feat1Title: lang === 'id' ? 'Pantau Kebiasaan' : 'Track Habits',
    feat1Desc: lang === 'id' ? 'Tetap bertanggung jawab dengan memantau Habit, target Harian, dan daftar Todo-mu.' : 'Stay accountable by tracking Habits, Dailies, and your To-Do list.',
    feat2Title: lang === 'id' ? 'Dapatkan Hadiah' : 'Earn Rewards',
    feat2Desc: lang === 'id' ? 'Selesaikan tugas, raih Gold & EXP, lalu beli perlengkapan epik di Toko!' : 'Complete tasks, earn Gold & EXP, and buy epic gear in the Shop!',
    feat3Title: lang === 'id' ? 'Kalahkan Boss' : 'Defeat Bosses',
    feat3Desc: lang === 'id' ? 'Gunakan Focus Arena untuk bekerja fokus dan menyerang monster kemalasan.' : 'Use the Focus Arena to work focused and attack the monsters of laziness.',
    support: lang === 'id' ? 'Dukung' : 'Support',
    faqLink: lang === 'id' ? 'FAQ / Bantuan' : 'FAQ / Help',
    reportBug: lang === 'id' ? 'Laporkan Bug' : 'Report a Bug',
    suggestFeature: lang === 'id' ? 'Ajukan Fitur Baru' : 'Suggest a Feature',
    social: lang === 'id' ? 'Sosial Developer' : 'Developer Socials',
    rights: lang === 'id' ? '© 2026 Daily Dungeon. Hak Cipta Dilindungi.' : '© 2026 Daily Dungeon. All rights reserved.',
    privacyTitle: lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy',
    termsTitle: lang === 'id' ? 'Syarat dan Ketentuan' : 'Terms & Conditions',
    close: lang === 'id' ? 'Tutup' : 'Close'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !pass) {
      setError(t.emailReq);
      setLoading(false);
      return;
    }

    try {
      if (tab === 'register') {
        if (pass !== pass2) {
          setError(t.passMatch);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan saat mendaftar.');
      }

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password: pass,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        localStorage.removeItem('lifequest-storage');
        setShowTransition(true);

        try {
          const profileRes = await fetch('/api/user/profile');
          const profileData = await profileRes.json();

          if (profileRes.ok && profileData) {
            setUserProfile({
              accountName: profileData.accountName || email,
              nickname: profileData.nickname || email.split('@')[0],
              gender: profileData.gender, 
              avatarId: profileData.avatarId,
              level: profileData.level,
              gold: profileData.gold,
              exp: profileData.exp
            });
          } else {
            setUserProfile({ accountName: email, nickname: email.split('@')[0] });
          }
        } catch (err) {
          console.error("Gagal mengambil profil:", err);
          setUserProfile({ accountName: email, nickname: email.split('@')[0] });
        }

        setTimeout(() => {
          router.push('/');
        }, 1500); 
      }

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const openModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setModalContent({ title: t.privacyTitle, content: <PrivacyContent lang={lang} /> });
    } else {
      setModalContent({ title: t.termsTitle, content: <TermsContent lang={lang} /> });
    }
    setIsModalOpen(true);
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    localStorage.removeItem('lifequest-storage');
    setLoading(true);
    
    const options: Record<string, string> | undefined = 
      provider === 'google' ? { prompt: 'select_account' } : undefined;

    signIn(provider, { callbackUrl: '/' }, options).then(result => {
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        console.error("OAuth Login Error:", result.error);
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col relative w-full overflow-x-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      
      {isModalOpen && modalContent && (
        <PolicyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title} lang={lang}>
          {modalContent.content}
        </PolicyModal>
      )}

      <style>{`
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 100%{ transform: translateY(-12px) rotate(5deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
        .input-habitica {
          background: rgba(255,255,255,0.05);
          color: #ffffff;
          border: 1px solid rgba(251, 191, 36, 0.2);
          transition: all 0.2s;
        }
        .input-habitica:focus { background: rgba(255,255,255,0.1); outline: none; border-color: rgba(251, 191, 36, 0.8); }
        .input-habitica::placeholder { color: rgba(255,255,255,0.3); }
        .scroll-left::-webkit-scrollbar { display: none; }
        .scroll-left { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Latar Belakang Bintang */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute bg-amber-200 rounded-full"
              style={{
                width:  Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top:    Math.random() * 100 + '%',
                left:   Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              }} />
          ))}
        </div>
      )}

      {/* Koin Melayang */}
      <div className="z-0"><FloatingCoin x="15%" y="15%" delay={0}/></div>
      <div className="z-0"><FloatingCoin x="85%" y="30%" delay={1.5}/></div>
      <div className="z-0"><FloatingCoin x="10%" y="70%" delay={2}/></div>
      <div className="z-0"><FloatingCoin x="50%" y="10%" delay={0.5}/></div>
      <div className="z-0"><FloatingCoin x="90%" y="50%" delay={1.5}/></div>

      {/* HEADER TINGKAT TINGGI */}
      <header className="relative z-[999] flex items-center justify-between px-4 md:px-8 py-4 md:py-6 flex-shrink-0">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Daily Dungeon Logo"
            className="h-10 sm:h-16 md:h-24 relative z-[999]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <nav className="flex items-center gap-4 md:gap-6 relative z-[999]">
          
          {/* MENGGUNAKAN LINK BAWAAN NEXT.JS */}
          <Link href="/start" className="hidden sm:block text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold cursor-pointer relative z-[999]">
            {t.start}
          </Link>
          
          {/* LANGUAGE DROPDOWN */}
          {isMounted && (
            <div className="relative z-[999]">
              <button 
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold cursor-pointer"
              >
                <Globe size={16} />
                <span className="hidden sm:block">{t.langLabel}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full mt-4 right-0 w-36 bg-zinc-800 border-2 border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col z-[999] animate-in slide-in-from-top-2">
                  <button
                    type="button"
                    onClick={() => { updateSetting('language', 'id'); setIsLangOpen(false); }}
                    className={`px-4 py-3 text-left text-sm font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2 ${settings.language === 'id' ? 'text-amber-400 bg-zinc-900/50' : 'text-zinc-300'}`}
                  >
                    <span>🇮🇩</span> Indonesia
                  </button>
                  <button
                    type="button"
                    onClick={() => { updateSetting('language', 'en'); setIsLangOpen(false); }}
                    className={`px-4 py-3 text-left text-sm font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2 ${settings.language === 'en' ? 'text-amber-400 bg-zinc-900/50' : 'text-zinc-300'}`}
                  >
                    <span>🇬🇧</span> English
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MENGGUNAKAN LINK BAWAAN NEXT.JS UNTUK FAQ */}
          <Link href="/faq" className="hidden lg:block text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold cursor-pointer relative z-[999]">
            {t.faq}
          </Link>
          
          <button
            type="button"
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 px-4 md:px-6 py-2 rounded shadow-md font-bold text-xs md:text-sm transition-colors cursor-pointer relative z-[999]">
            {tab === 'login' ? t.registerBtn : t.loginBtn}
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 gap-8 lg:gap-24 lg:h-[calc(100vh-120px)] lg:overflow-hidden pointer-events-none">
        
        {/* KIRI: Area Penjelasan & Karakter */}
        <div className="scroll-left w-full lg:flex-1 lg:overflow-y-auto h-auto lg:h-full pb-8 lg:pb-32 flex flex-col items-center lg:items-start pointer-events-auto">
          <div className="flex flex-col items-center text-center pt-4 lg:pt-12 px-2 lg:px-8 w-full">
            
            {/* Karakter Berkumpul */}
            <div className="flex items-end justify-center gap-4 sm:gap-8 md:gap-12 mb-8 md:mb-12 h-32 sm:h-48 md:h-72 w-full">
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-56 md:h-56 shrink-0 transform transition-transform duration-500 hover:-translate-y-4">
                <ShadowKnight/>
              </div>
              <div className="w-25 h-25 sm:w-40 sm:h-40 md:w-72 md:h-72 shrink-0 transform -translate-y-4 md:-translate-y-8 z-10 transition-transform duration-500 hover:-translate-y-12">
                <VoidRanger/>
              </div>
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-56 md:h-56 shrink-0 transform transition-transform duration-500 hover:-translate-y-4">
                <ArcaneMage/>
              </div>
            </div>

            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 max-w-2xl tracking-tight px-2">
              {t.heroTitle}
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-medium mb-8 px-4">
              {t.heroDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl shrink-0 mt-6 md:mt-10 px-2 sm:px-4">
              <div className="flex flex-col items-center text-center px-2 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 md:mb-6 drop-shadow-2xl">
                  <HabitTrackerIcon />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2 leading-snug">{t.feat1Title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t.feat1Desc}</p>
              </div>

              <div className="flex flex-col items-center text-center px-2 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 md:mb-6 drop-shadow-2xl">
                  <LootRewardIcon />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2 leading-snug">{t.feat2Title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t.feat2Desc}</p>
              </div>

              <div className="flex flex-col items-center text-center px-2 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 md:mb-6 drop-shadow-2xl">
                  <SangarDragonIcon />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2 leading-snug">{t.feat3Title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{t.feat3Desc}</p>
              </div>
            </div>

            <div className="h-4 lg:h-24"/>
          </div>
        </div>

        {/* KANAN: Form */}
        <div className="w-full max-w-sm md:max-w-md flex-shrink-0 lg:sticky lg:top-0 pb-32 lg:pb-0 mx-auto px-4 sm:px-0 pointer-events-auto relative z-[50]">
          <div className="text-center mb-6 mt-0 lg:mt-24">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
              {tab === 'login' ? t.titleLogin : t.titleRegister}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-[50]">
            <input
              type="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="input-habitica w-full px-4 py-3 rounded text-sm relative z-10"
            />
            <div className="relative z-10">
              <input
                type={showPass ? "text" : "password"}
                value={pass} onChange={e => setPass(e.target.value)}
                placeholder={t.passPlaceholder}
                className="input-habitica w-full px-4 py-3 rounded text-sm pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 transition-colors"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {tab === 'login' && (
              <div className="flex justify-end mt-[-4px]">
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-500 hover:text-amber-400 transition-colors cursor-pointer relative z-[50]"
                >
                  {t.forgotPass}
                </Link>
              </div>
            )}

            {tab === 'register' && (
              <div className="relative z-10">
                <input
                  type={showPass2 ? "text" : "password"}
                  value={pass2} onChange={e => setPass2(e.target.value)}
                  placeholder={t.confirmPassPlaceholder}
                  className="input-habitica w-full px-4 py-3 rounded text-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 transition-colors"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  {showPass2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {error && <div className="text-red-400 text-xs text-center">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 text-zinc-900 font-bold rounded shadow-lg hover:bg-amber-400 transition-colors mt-2 cursor-pointer relative z-[50]">
              {loading ? t.loadingBtn : tab === 'login' ? t.loginBtn : t.continueBtn}
            </button>

            <div className="flex items-center gap-3 my-2 opacity-40">
              <div className="flex-1 h-px bg-amber-200"/>
              <span className="text-xs text-amber-200 uppercase tracking-widest">{t.or}</span>
              <div className="flex-1 h-px bg-amber-200"/>
            </div>

            <button type="button" onClick={() => handleOAuthLogin('google')} className="w-full py-3 bg-transparent border border-amber-500/30 text-zinc-300 rounded font-medium text-sm hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-3 cursor-pointer relative z-[50]">
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path d="M19.6 10.2c0-.6-.1-1.3-.2-1.9H10v3.6h5.4c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3.1-4.5 3.1-7.2z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 5-.9 6.7-2.4l-3.4-2.5c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.5-4H1v2.6C2.7 17.8 6.2 20 10 20z" fill="#34A853"/>
                <path d="M4.5 12.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V5.3H1C.4 6.6 0 8.2 0 10s.4 3.4 1 4.7l3.5-2.6z" fill="#FBBC05"/>
                <path d="M10 4c1.4 0 2.7.5 3.7 1.4l2.8-2.8C14.9.9 12.7 0 10 0 6.2 0 2.7 2.2 1 5.3l3.5 2.6C5.3 5.7 7.5 4 10 4z" fill="#EA4335"/>
              </svg>
              {tab === 'login' ? t.googleLogin : t.googleReg}
            </button>
            
            <button type="button" onClick={() => handleOAuthLogin('github')} className="w-full py-3 bg-transparent border border-amber-500/30 text-zinc-300 rounded font-medium text-sm hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-3 cursor-pointer relative z-[50]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              {tab === 'login' ? t.githubLogin : t.githubReg}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER & LANDSCAPE */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none opacity-80">
        <GrandSpartanLandscape />
      </div>

      {/* FULLSCREEN LOADING TRANSITION */}
      {showTransition && (
        <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center animate-in fade-in duration-500 pointer-events-auto">
          <div className="mb-12 relative flex justify-center items-center" style={{ animation: 'float 2s ease-in-out infinite alternate' }}>
            <div className="absolute inset-0 bg-amber-500/30 blur-[50px] rounded-full animate-pulse" />
            <img 
              src="/favicon.ico" 
              alt="Daily Dungeon Loading" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]" 
              style={{ imageRendering: 'pixelated' }} 
            />
          </div>
          <div className="w-56 sm:w-64 md:w-80 h-4 md:h-6 bg-zinc-900 border-4 border-zinc-700 p-0.5 relative overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <div className="h-full bg-amber-500 loading-bar" />
          </div>
          <style>{`
            .loading-bar { animation: fillBar 1.5s ease-out forwards; }
            @keyframes fillBar { 0% { width: 0%; } 30% { width: 35%; } 50% { width: 35%; } 70% { width: 80%; } 100% { width: 100%; } }
          `}</style>
        </div>
      )}
      
      <footer className="relative z-50 w-full mt-16 pt-12 pb-8 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-sm pb-12 text-center md:text-left pointer-events-auto">
          <div className="flex flex-col gap-4 items-center md:items-start relative z-50">
            <h4 className="text-amber-500 font-bold text-lg mb-2">{t.support}</h4>
            <Link href="/faq" className="text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer">{t.faqLink}</Link>
            <a href="mailto:dailydungeon268@gmail.com?subject=Laporan%20Bug%20-%20Daily%20Dungeon" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer">{t.reportBug}</a>
            <a href="mailto:dailydungeon268@gmail.com?subject=Saran%20Fitur%20Baru%20-%20Daily%20Dungeon" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer">{t.suggestFeature}</a>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start text-zinc-300 relative z-50">
            <h4 className="text-amber-500 font-bold text-lg mb-2">{t.social}</h4>
            <div className="flex items-center gap-2">
              <Instagram size={18}/>
              <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors cursor-pointer">renhapiz</a>,
              <a href="https://www.instagram.com/wldnxd" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors ml-1 cursor-pointer">wldnxd</a>,
              <a href="https://www.instagram.com/rappizr" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors ml-1 cursor-pointer">rappizr</a>
            </div>
            <div className="flex items-center gap-2">
              <Github size={18}/>
              <a href="https://github.com/renka01" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors cursor-pointer">renka01</a>,
              <a href="https://github.com/wldnxd" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors ml-1 cursor-pointer">wldnxd</a>,
              <a href="https://github.com/Rappizr" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors ml-1 cursor-pointer">Rappizr</a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 pt-6 border-t border-zinc-700/50 text-center gap-4 md:gap-0 pointer-events-auto relative z-50">
          <p className="font-medium tracking-wide">{t.rights}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-medium">
            <button onClick={() => openModal('privacy')} className="hover:text-amber-400 transition-colors cursor-pointer">{t.privacyTitle}</button>
            <button onClick={() => openModal('terms')} className="hover:text-amber-400 transition-colors cursor-pointer">{t.termsTitle}</button>
          </div>
        </div>
      </footer>

    </div>
  );
}