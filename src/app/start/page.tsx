"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/useStore';

type Tab = 'login' | 'register';

// ═══════════════════════════════════════════════════════════
// NEW PIXEL LANDSCAPE: SPARTAN ARMY MARCHING
// ═══════════════════════════════════════════════════════════
const SpartanArmy = () => (
  <svg viewBox="0 0 1000 250" width="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', minHeight: '200px', imageRendering: 'pixelated' }}>
    {/* Night Mountains/Hills */}
    <path d="M0,250 L0,150 L100,100 L250,180 L400,80 L550,160 L700,90 L850,170 L1000,120 L1000,250 Z" fill="#18181b" opacity="0.6"/>
    <path d="M0,250 L0,180 L150,130 L300,190 L450,140 L600,200 L750,120 L900,180 L1000,150 L1000,250 Z" fill="#27272a" opacity="0.8"/>

    {/* Ground */}
    <rect x="0" y="210" width="1000" height="40" fill="#09090b" />
    <rect x="0" y="215" width="1000" height="5" fill="#18181b" />

    {/* Soldiers */}
    {[...Array(15)].map((_, i) => (
      <g key={`soldier-${i}`} transform={`translate(${i * 70 - 20}, 115)`}>
        {/* Spear */}
        <rect x="25" y="10" width="3" height="90" fill="#3f3f46" />
        <polygon points="24,10 26.5,0 29,10" fill="#71717a" />
        {/* Plume */}
        <rect x="5" y="25" width="20" height="4" fill="#9f1239" />
        <rect x="3" y="29" width="24" height="6" fill="#be123c" />
        {/* Helmet */}
        <rect x="8" y="35" width="14" height="12" fill="#b45309" />
        <rect x="10" y="39" width="4" height="4" fill="#000" />
        {/* Body */}
        <rect x="8" y="47" width="16" height="30" fill="#7f1d1d" />
        {/* Shield */}
        <circle cx="12" cy="65" r="16" fill="#78350f" />
        <circle cx="12" cy="65" r="12" fill="#92400e" />
        <circle cx="12" cy="65" r="4" fill="#fcd34d" opacity="0.8" />
        {/* Legs */}
        <rect x="10" y="77" width="4" height="20" fill="#b45309" />
        <rect x="18" y="77" width="4" height="20" fill="#b45309" />
      </g>
    ))}
  </svg>
);

export default function StartPage() {
  const router = useRouter();
  const { setUserProfile } = useStore();
  const [tab, setTab] = useState<Tab>('register');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

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
        if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan saat mendaftar.');

        const result = await signIn('credentials', { redirect: false, email, password: pass });
        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          setUserProfile({ accountName: email, nickname: email.split('@')[0] });
          router.push('/');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      const result = await signIn('credentials', { redirect: false, email, password: pass });
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setUserProfile({ accountName: email, nickname: email.split('@')[0] });
        router.push('/');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center relative p-6 font-sans overflow-x-hidden overflow-y-auto">
      
      {/* Latar Belakang Bintang */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute bg-amber-200 rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%', left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              }} 
            />
          ))}
        </div>
      )}
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
      `}</style>

      {/* Tombol Kembali Floating Keren */}
      <button onClick={() => router.push('/login')} className="absolute top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-amber-500 hover:border-amber-400 hover:text-zinc-900 rounded-full transition-all shadow-lg group">
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="w-full max-w-md z-10 relative pb-16 pt-8">
        
        <div className="flex justify-center mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
          <img src="/logo.png" alt="Logo" className="h-16 md:h-24" style={{ imageRendering: 'pixelated' }} />
        </div>

        {/* Habitica-style Solid Card */}
        <div className="bg-zinc-800 border-[4px] border-zinc-950 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <div className="flex bg-zinc-900 p-1.5 rounded-2xl mb-8 border-2 border-zinc-950">
            <button onClick={() => setTab('register')} className={`flex-1 py-3 text-sm md:text-base font-extrabold rounded-xl transition-all ${tab === 'register' ? 'bg-amber-500 text-zinc-950 shadow-[0_3px_0_#b45309]' : 'text-zinc-400 hover:text-white'}`}>
              DAFTAR BARU
            </button>
            <button onClick={() => setTab('login')} className={`flex-1 py-3 text-sm md:text-base font-extrabold rounded-xl transition-all ${tab === 'login' ? 'bg-amber-500 text-zinc-950 shadow-[0_3px_0_#b45309]' : 'text-zinc-400 hover:text-white'}`}>
              MASUK
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Alamat Email" className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500" />
            
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="Kata Sandi" className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500 pr-12" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors">
                {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {tab === 'register' && (
              <div className="relative">
                <input type={showPass2 ? "text" : "password"} value={pass2} onChange={e => setPass2(e.target.value)} placeholder="Konfirmasi Kata Sandi" className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500 pr-12" />
                <button type="button" onClick={() => setShowPass2(!showPass2)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors">
                  {showPass2 ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            )}

            {error && <div className="text-red-400 text-sm text-center font-bold bg-red-950/30 py-3 rounded-xl border border-red-900/50">{error}</div>}

            {/* Gamified 3D Button */}
            <button type="submit" disabled={loading} className="w-full py-4 mt-2 bg-amber-500 text-zinc-950 font-black text-lg rounded-2xl border-b-[6px] border-amber-700 hover:bg-amber-400 hover:border-b-[4px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-70 disabled:pointer-events-none uppercase tracking-wide border-2 border-zinc-950">
              {loading ? 'MEMPROSES...' : tab === 'login' ? 'MULAI PETUALANGAN' : 'BUAT KARAKTER'}
            </button>

            <div className="flex items-center gap-4 my-2 opacity-60">
              <div className="flex-1 h-px bg-zinc-500"/>
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Atau</span>
              <div className="flex-1 h-px bg-zinc-500"/>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })} className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-950 text-zinc-300 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors border-b-[4px] hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]">
                <svg viewBox="0 0 20 20" width="20" height="20"><path d="M19.6 10.2c0-.6-.1-1.3-.2-1.9H10v3.6h5.4c-.2 1.2-1 2.3-2.1 3v2.5h3.4c2-1.8 3.1-4.5 3.1-7.2z" fill="#4285F4"/><path d="M10 20c2.7 0 5-.9 6.7-2.4l-3.4-2.5c-.9.6-2 1-3.3 1-2.5 0-4.7-1.7-5.5-4H1v2.6C2.7 17.8 6.2 20 10 20z" fill="#34A853"/><path d="M4.5 12.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V5.3H1C.4 6.6 0 8.2 0 10s.4 3.4 1 4.7l3.5-2.6z" fill="#FBBC05"/><path d="M10 4c1.4 0 2.7.5 3.7 1.4l2.8-2.8C14.9.9 12.7 0 10 0 6.2 0 2.7 2.2 1 5.3l3.5 2.6C5.3 5.7 7.5 4 10 4z" fill="#EA4335"/></svg>
              </button>
              <button type="button" onClick={() => signIn('github', { callbackUrl: '/' })} className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-950 text-zinc-300 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors border-b-[4px] hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Army Landscape */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none flex justify-center opacity-60">
        <SpartanArmy />
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 w-full pt-16 pb-8 px-6 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 pointer-events-auto">
          <p className="font-medium tracking-wide mb-4 md:mb-0 text-center md:text-left">© 2026 Daily Dungeon. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Syarat dan Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
