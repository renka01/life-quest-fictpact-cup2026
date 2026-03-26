"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Instagram, Twitter, Github, CheckCircle2, Coins, Flame } from 'lucide-react';
import { useStore } from '@/store/useStore';

// ═══════════════════════════════════════════════════════════
// PIXEL ART CHARACTER SPRITES (Karakter Diperbesar: 200x200)
// ═══════════════════════════════════════════════════════════

/** Shadow Knight */
const ShadowKnight = () => (
  <svg viewBox="-4 0 40 32" width="200" height="200" style={{ imageRendering: 'pixelated' }}>
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
  <svg viewBox="-4 0 40 32" width="200" height="200" style={{ imageRendering: 'pixelated' }}>
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
  <svg viewBox="-4 0 40 32" width="200" height="200" style={{ imageRendering: 'pixelated' }}>
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
  <div style={{
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
// FEATURE CARD
// ═══════════════════════════════════════════════════════════
const FeatureCard = ({ emoji, title, desc }: { emoji: string; title: string; desc: string }) => (
  <div className="flex items-start gap-4 bg-zinc-800/60 border border-amber-500/10 rounded-xl p-4">
    <span className="text-3xl flex-shrink-0">{emoji}</span>
    <div>
      <h3 className="text-white font-bold text-base mb-1">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const { setUserProfile } = useStore();
  const [tab,     setTab]     = useState<Tab>('register');
  const [email,   setEmail]   = useState('');
  const [pass,    setPass]    = useState('');
  const [pass2,   setPass2]   = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !pass) {
      setError('Email dan kata sandi wajib diisi.');
      setLoading(false);
      return;
    }

    if (tab === 'register') {
      if (pass !== pass2) {
        setError('Kata sandi tidak cocok!');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Terjadi kesalahan saat mendaftar.');
        }

        // Jika registrasi berhasil, langsung coba login
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password: pass,
        });

        if (result?.error) {
          setError(result.error);
          setLoading(false);
        } else if (result?.ok) {
          setShowTransition(true);
          setUserProfile({ accountName: email, nickname: email.split('@')[0] });
          router.push('/');
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    } else { // Logic untuk 'login'
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password: pass,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.ok) {
        setShowTransition(true);
        setUserProfile({ accountName: email, nickname: email.split('@')[0] });
        router.push('/');
      } else {
        setLoading(false);
      }
    }
  };

// ═══════════════════════════════════════════════════════════
// CUSTOM FEATURE ICONS (Pixel Art Mengikuti Referensi)
// ═══════════════════════════════════════════════════════════

const HabitTrackerIcon = () => (
  <svg viewBox="0 0 48 48" width="120" height="120" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      {/* Box 1 (Green) */}
      <rect x="4" y="8" width="40" height="8" fill="#f8fafc" opacity="0.9"/>
      <rect x="4" y="8" width="8" height="8" fill="#4ade80"/>
      <rect x="6" y="11" width="4" height="2" fill="#ffffff"/>
      <rect x="7" y="10" width="2" height="4" fill="#ffffff"/>
      <rect x="14" y="11" width="12" height="2" fill="#cbd5e1"/>
      
      {/* Box 2 (Teal) */}
      <rect x="10" y="20" width="38" height="8" fill="#f8fafc" opacity="0.9"/>
      <rect x="10" y="20" width="8" height="8" fill="#2dd4bf"/>
      <rect x="12" y="23" width="4" height="2" fill="#ffffff"/>
      <rect x="13" y="22" width="2" height="4" fill="#ffffff"/>
      <rect x="20" y="23" width="16" height="2" fill="#cbd5e1"/>

      {/* Box 3 (Blue) */}
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
  <svg viewBox="0 0 48 48" width="120" height="120" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      {/* Star 1 */}
      <rect x="36" y="6" width="4" height="4" fill="#fbbf24"/>
      <rect x="34" y="8" width="8" height="2" fill="#fde047"/>
      <rect x="36" y="4" width="2" height="8" fill="#fde047"/>

      {/* Sword */}
      <g transform="rotate(45 30 20)">
        <rect x="28" y="6" width="4" height="20" fill="#4ade80"/>
        <rect x="26" y="26" width="8" height="2" fill="#fbbf24"/>
        <rect x="28" y="28" width="4" height="6" fill="#78350f"/>
      </g>

      {/* Potion */}
      <rect x="6" y="14" width="4" height="4" fill="#38bdf8"/>
      <rect x="4" y="18" width="8" height="8" fill="#0ea5e9"/>
      <rect x="6" y="20" width="2" height="4" fill="#cffafe"/>

      {/* Coin */}
      <rect x="8" y="34" width="8" height="8" fill="#eab308"/>
      <rect x="10" y="32" width="4" height="12" fill="#facc15"/>
      <rect x="6" y="36" width="12" height="4" fill="#facc15"/>
      <rect x="10" y="36" width="4" height="4" fill="#ca8a04"/>

      {/* Mini Pet Mage Owl */}
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
  <svg viewBox="0 0 32 32" width="120" height="120" style={{ imageRendering: 'pixelated' }}>
    <g className="hover:-translate-y-2 transition-transform duration-500">
      {/* Back Spikes */}
      <rect x="22" y="2" width="2" height="6" fill="#e2e8f0"/>
      <rect x="20" y="4" width="2" height="6" fill="#cbd5e1"/>
      <rect x="24" y="6" width="2" height="6" fill="#94a3b8"/>
      <rect x="26" y="10" width="2" height="6" fill="#64748b"/>
      <rect x="28" y="14" width="2" height="6" fill="#475569"/>
      {/* Neck */}
      <rect x="18" y="10" width="8" height="22" fill="#3f3f46"/>
      <rect x="16" y="14" width="2" height="18" fill="#27272a"/>
      {/* Head Base */}
      <rect x="10" y="8" width="10" height="10" fill="#52525b"/>
      <rect x="6" y="12" width="4" height="4" fill="#52525b"/>
      {/* Jaw */}
      <rect x="4" y="20" width="12" height="4" fill="#3f3f46"/>
      <rect x="2" y="22" width="2" height="2" fill="#27272a"/>
      {/* Inside Mouth */}
      <rect x="8" y="16" width="8" height="4" fill="#18181b"/>
      <rect x="10" y="16" width="6" height="2" fill="#9f1239"/>
      {/* Teeth */}
      <rect x="6" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="8" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="10" y="16" width="1" height="2" fill="#f8fafc"/>
      <rect x="5" y="19" width="1" height="1" fill="#f8fafc"/>
      <rect x="7" y="19" width="1" height="1" fill="#f8fafc"/>
      <rect x="9" y="19" width="1" height="1" fill="#f8fafc"/>
      {/* Eye */}
      <rect x="12" y="10" width="2" height="2" fill="#fef08a"/>
      <rect x="13" y="10" width="1" height="1" fill="#000000"/>
      {/* Horns */}
      <rect x="8" y="4" width="2" height="4" fill="#cbd5e1"/>
      <rect x="10" y="2" width="2" height="6" fill="#e2e8f0"/>
      <rect x="12" y="4" width="2" height="4" fill="#94a3b8"/>
      <rect x="14" y="0" width="2" height="8" fill="#f8fafc"/>
      <rect x="16" y="2" width="2" height="6" fill="#e2e8f0"/>
      {/* Scales */}
      <rect x="18" y="16" width="4" height="2" fill="#71717a"/>
      <rect x="20" y="20" width="4" height="2" fill="#71717a"/>
      <rect x="18" y="24" width="4" height="2" fill="#71717a"/>
      <rect x="20" y="28" width="4" height="2" fill="#71717a"/>
      {/* Magic Breath */}
      <rect x="0" y="18" width="4" height="2" fill="#c084fc"/>
      <rect x="2" y="16" width="2" height="2" fill="#d8b4fe"/>
    </g>
  </svg>
);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col relative overflow-hidden"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      <style>{`
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 100%{ transform: translateY(-12px) rotate(5deg); } }
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

      {/* Bintang/Debu Latar Belakang */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute bg-amber-200 rounded-full"
              style={{
                width:  Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top:    Math.random() * 100 + '%',
                left:   Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2,
              }} />
          ))}
        </div>
      )}

      <FloatingCoin x="10%" y="20%" delay={0}/>
      <FloatingCoin x="85%" y="15%" delay={1.2}/>
      <FloatingCoin x="50%" y="10%" delay={0.5}/>
      <FloatingCoin x="5%"  y="60%" delay={2}/>
      <FloatingCoin x="90%" y="50%" delay={1.5}/>

      {/* ── Header ── */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 flex-shrink-0">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Daily Dungeon Logo"
            className="h-16 md:h-24"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <nav className="flex items-center gap-6">
          <button className="hidden md:block text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold">Ayo Mulai</button>
          <button className="hidden md:block text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold">Bahasa ▾</button>
          <button className="hidden md:block text-sm text-amber-200/70 hover:text-amber-400 transition-colors font-semibold">Pelajari Lebih Lanjut ▾</button>
          <button
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2 rounded shadow-md font-bold text-sm transition-colors">
            {tab === 'login' ? 'Daftar' : 'Masuk'}
          </button>
        </nav>
      </header>

      {/* ── Main Content Area ── */}
      <main
        className="relative z-20 flex flex-col lg:flex-row items-start justify-center max-w-6xl mx-auto w-full px-6 gap-12 lg:gap-24"
        style={{ height: 'calc(100vh - 120px)', overflow: 'hidden' }}>

        {/* KIRI: Scrollable (Dirombak rata tengah seperti referensi Habitica) */}
        <div className="scroll-left flex-1 overflow-y-auto h-full pb-32">
          <div className="flex flex-col items-center text-center pt-8 lg:pt-12 px-2 lg:px-8">
            
            {/* Karakter */}
            <div className="flex items-end justify-center gap-2 mb-8 h-48">
              <div className="transform translate-y-4 hover:-translate-y-2 transition-transform duration-500"><ShadowKnight/></div>
              <div className="transform -translate-y-2 scale-110 z-10 hover:-translate-y-6 transition-transform duration-500"><VoidRanger/></div>
              <div className="transform translate-y-4 hover:-translate-y-2 transition-transform duration-500"><ArcaneMage/></div>
            </div>

            <h1 className="text-white text-4xl lg:text-5xl font-extrabold leading-tight mb-4 max-w-2xl tracking-tight">
              Buat Hidupmu Menjadi Game
            </h1>
            <p className="text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed font-medium mb-12">
              Daily Dungeon adalah aplikasi untuk membangun produktivitas dan kebiasaan baik dengan mengubah kehidupan nyata menjadi permainan. Dengan sistem imbalan dan leveling layaknya game RPG, aplikasi ini memotivasimu untuk mencapai target, bekerja keras, dan melawan kemalasan.
            </p>

          {/* === FITUR DESKRIPSI (Tanpa box pelindung, Gambar Melayang) === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl shrink-0 mt-8">
            
            <div className="flex flex-col items-center text-center px-2 group">
              <div className="mb-6 drop-shadow-2xl">
                <HabitTrackerIcon />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 leading-snug">Pantau Kebiasaan</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tetap bertanggung jawab dengan memantau Habit, target Harian, dan daftar Todo-mu.
              </p>
            </div>

            <div className="flex flex-col items-center text-center px-2 group">
              <div className="mb-6 drop-shadow-2xl">
                <LootRewardIcon />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 leading-snug">Dapatkan Hadiah</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Selesaikan tugas, raih Gold & EXP, lalu beli perlengkapan epik di Toko!
              </p>
            </div>

            <div className="flex flex-col items-center text-center px-2 group">
              <div className="mb-6 drop-shadow-2xl">
                <SangarDragonIcon />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 leading-snug">Kalahkan Boss</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Gunakan Focus Arena untuk bekerja fokus dan menyerang monster kemalasan.
              </p>
            </div>

          </div>

            {/* Spacer bawah */}
            <div className="h-24"/>
          </div>
        </div>

        {/* KANAN: Form (Sticky) */}
        <div className="w-full max-w-md lg:w-[400px] flex-shrink-0 lg:sticky lg:top-0 pt-8 lg:pt-12 pb-16 lg:pb-0">
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl font-bold">
              {tab === 'login' ? 'Masuk ke Arena' : 'Daftar Sebagai Petarung'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="input-habitica w-full px-4 py-3 rounded text-sm"
            />
            <input
              type="password"
              value={pass} onChange={e => setPass(e.target.value)}
              placeholder="Kata sandi"
              className="input-habitica w-full px-4 py-3 rounded text-sm"
            />
            {tab === 'register' && (
              <input
                type="password"
                value={pass2} onChange={e => setPass2(e.target.value)}
                placeholder="Konfirmasi Kata Sandi"
                className="input-habitica w-full px-4 py-3 rounded text-sm"
              />
            )}

            {error && <div className="text-red-400 text-xs text-center">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 text-zinc-900 font-bold rounded shadow-lg hover:bg-amber-400 transition-colors mt-2">
              {loading ? 'Membuka Gerbang...' : tab === 'login' ? 'Masuk' : 'Lanjutkan'}
            </button>

            <div className="flex items-center gap-3 my-2 opacity-40">
              <div className="flex-1 h-px bg-amber-200"/>
              <span className="text-xs text-amber-200 uppercase tracking-widest">ATAU</span>
              <div className="flex-1 h-px bg-amber-200"/>
            </div>

            <button type="button" className="w-full py-3 bg-transparent border border-amber-500/30 text-zinc-300 rounded font-medium text-sm hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-3">
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path d="M19.6 10.2c0-.6-.1-1.3-.2-1.9H10v3.6h5.4c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3.1-4.5 3.1-7.2z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 5-.9 6.7-2.4l-3.4-2.5c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.5-4H1v2.6C2.7 17.8 6.2 20 10 20z" fill="#34A853"/>
                <path d="M4.5 12.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V5.3H1C.4 6.6 0 8.2 0 10s.4 3.4 1 4.7l3.5-2.6z" fill="#FBBC05"/>
                <path d="M10 4c1.4 0 2.7.5 3.7 1.4l2.8-2.8C14.9.9 12.7 0 10 0 6.2 0 2.7 2.2 1 5.3l3.5 2.6C5.3 5.7 7.5 4 10 4z" fill="#EA4335"/>
              </svg>
              Daftar dengan Google
            </button>
            <button type="button" className="w-full py-3 bg-transparent border border-amber-500/30 text-zinc-300 rounded font-medium text-sm hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              Daftar dengan Github
            </button>
          </form>
        </div>
      </main>

      {/* ── Landscape ── */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none opacity-80">
        <GrandSpartanLandscape />
      </div>

{/* ═══════════════════════════════════════════════════════════ */}
      {/* FULLSCREEN LOADING TRANSITION (Muncul saat tombol Masuk diklik) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {showTransition && (
        <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center animate-in fade-in duration-500">
          
          {/* Animasi Logo Web Melayang & Bercahaya */}
          <div 
            className="mb-12 relative flex justify-center items-center" 
            style={{ animation: 'float 2s ease-in-out infinite alternate' }}
          >
            {/* Efek Cahaya (Glow) Aura di belakang logo */}
            <div className="absolute inset-0 bg-amber-500/30 blur-[50px] rounded-full animate-pulse" />
            
            {/* Gambar Logo 1:1 (Favicon) */}
            <img 
              src="/favicon.ico" 
              alt="Daily Dungeon Loading" 
              className="w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]" 
              style={{ imageRendering: 'pixelated' }} 
            />
          </div>


          {/* Pixelated Progress Bar */}
          <div className="w-64 md:w-80 h-6 bg-zinc-900 border-4 border-zinc-700 p-0.5 relative overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <div className="h-full bg-amber-500 loading-bar" />
          </div>

          {/* Keyframes khusus Loading Bar yang agak tersendat ala game retro */}
          <style>{`
            .loading-bar {
              animation: fillBar 1.5s ease-out forwards;
            }
            @keyframes fillBar {
              0% { width: 0%; }
              30% { width: 35%; }
              50% { width: 35%; } /* Efek lag/tersendat sedikit */
              70% { width: 80%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}
{/* ── Footer ── */}
      <footer className="relative z-20 w-full mt-16 pt-12 pb-8 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent">
        <div className="max-w-3xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-sm pb-12 text-center md:text-left">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-amber-500 font-bold text-lg mb-2">Dukung</h4>
            <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors">FAQ / Bantuan</a>
            <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors">Laporkan Bug</a>
            <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors">Ajukan Fitur Baru</a>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-amber-500 font-bold text-lg mb-2">Sosial</h4>
            <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-3"><Instagram size={18}/> Instagram</a>
            <a href="https://github.com/renka01/life-quest-fictpact-cup2026" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-3"><Github size={18}/> GitHub</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 pt-6 border-t border-zinc-700/50">
          <p className="font-medium tracking-wide">© 2026 Daily Dungeon. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Syarat dan Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}