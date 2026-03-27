"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// MODAL & KONTEN KEBIJAKAN PRIVASI / SYARAT
// ─────────────────────────────────────────────────────────────
const PrivacyContent = () => (
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
);

const TermsContent = () => (
  <div className="space-y-4 text-zinc-300 text-sm">
    <p>Dengan menggunakan aplikasi Daily Dungeon, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut:</p>
    <h3 className="font-bold text-amber-400 pt-2">1. Penggunaan Akun</h3>
    <p>Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda. Jaga kerahasiaan kata sandi Anda dan jangan bagikan dengan siapa pun.</p>
    <h3 className="font-bold text-amber-400 pt-2">2. Perilaku Pengguna</h3>
    <p>Anda setuju untuk tidak menggunakan aplikasi ini untuk tujuan ilegal atau yang dilarang. Dilarang keras melakukan pelecehan, spam, atau mencoba merusak integritas sistem kami.</p>
    <h3 className="font-bold text-amber-400 pt-2">3. Pembatasan Tanggung Jawab</h3>
    <p>Aplikasi ini disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas kehilangan data atau kerusakan lain yang mungkin timbul dari penggunaan aplikasi ini.</p>
  </div>
);

const PolicyModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[10000] animate-in fade-in-50" onClick={onClose}>
      <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-zinc-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-amber-400">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">{children}</main>
        <footer className="p-4 border-t border-zinc-700 flex-shrink-0 text-right">
          <button onClick={onClose} className="bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2 rounded-lg font-bold text-sm transition-colors">
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// CONFUSED SPARTAN  — scratching head, question marks floating
// ─────────────────────────────────────────────────────────────
const ConfusedSpartan = () => (
  <svg viewBox="0 0 80 72" width="180" height="162" style={{ imageRendering: 'pixelated' }}>
    <text x="54" y="14" fontSize="8" fill="#fbbf24" fontFamily="monospace"
      style={{ imageRendering:'pixelated' }}>
      ?
      <animate attributeName="y" values="14;10;14" dur="1.4s" repeatCount="indefinite" calcMode="discrete"/>
      <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" calcMode="discrete"/>
    </text>
    <text x="62" y="8" fontSize="6" fill="#a855f7" fontFamily="monospace">
      ?
      <animate attributeName="y" values="8;5;8" dur="1.8s" repeatCount="indefinite" calcMode="discrete"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" calcMode="discrete"/>
    </text>
    <text x="58" y="20" fontSize="5" fill="#fbbf24" fontFamily="monospace">
      ?
      <animate attributeName="y" values="20;17;20" dur="1.1s" repeatCount="indefinite" calcMode="discrete"/>
      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.1s" repeatCount="indefinite" calcMode="discrete"/>
    </text>
    <g>
      <animateTransform attributeName="transform" type="translate"
        values="0,0; 0,1; 0,0" dur="0.9s" repeatCount="indefinite" calcMode="discrete"/>
      <rect x="27" y="14" width="4"  height="10" fill="#dc2626"/>
      <rect x="29" y="12" width="2"  height="4"  fill="#b91c1c"/>
      <rect x="27" y="18" width="6"  height="2"  fill="#ef4444" opacity="0.7"/>
      {/* Helm dome */}
      <rect x="22" y="22" width="20" height="12" fill="#334155"/>
      <rect x="22" y="22" width="20" height="2"  fill="#475569"/>
      <rect x="21" y="24" width="22" height="10" fill="#1e293b"/>
      <rect x="22" y="24" width="10" height="10" fill="#293548"/>
      <rect x="20" y="28" width="4"  height="8"  fill="#334155"/>
      <rect x="40" y="28" width="4"  height="8"  fill="#1e293b"/>
      <rect x="30" y="28" width="4"  height="8"  fill="#1e293b"/>
      <rect x="23" y="28" width="7"  height="3"  fill="#0f172a"/>
      <rect x="24" y="29" width="5"  height="1"  fill="#fef08a"/>
      <rect x="34" y="28" width="6"  height="2"  fill="#0f172a"/>
      <rect x="35" y="28" width="3"  height="1"  fill="#fef08a" opacity="0.5"/>
      <rect x="22" y="22" width="20" height="1"  fill="#fbbf24"/>
      <rect x="21" y="24" width="1"  height="10" fill="#fbbf24" opacity="0.6"/>
      <rect x="43" y="24" width="1"  height="10" fill="#fbbf24" opacity="0.6"/>
      <rect x="20" y="28" width="4"  height="1"  fill="#fbbf24"/>
      <rect x="40" y="28" width="4"  height="1"  fill="#fbbf24"/>
      <rect x="28" y="34" width="8"  height="4"  fill="#ffdbac"/>
      <rect x="20" y="38" width="24" height="16" fill="#92400e"/>
      <rect x="20" y="38" width="12" height="16" fill="#b45309"/>   {/* left sheen */}
      <rect x="22" y="40" width="20" height="1"  fill="#d97706" opacity="0.5"/>
      <rect x="22" y="44" width="20" height="1"  fill="#d97706" opacity="0.4"/>
      <rect x="22" y="48" width="20" height="1"  fill="#78350f" opacity="0.6"/>
      <rect x="20" y="38" width="24" height="2"  fill="#d97706"/>   {/* shoulder line */}
      <rect x="20" y="52" width="24" height="2"  fill="#78350f"/>   {/* bottom trim */}
      <rect x="30" y="41" width="4"  height="8"  fill="#78350f"/>
      <rect x="28" y="47" width="3"  height="2"  fill="#78350f"/>
      <rect x="33" y="47" width="3"  height="2"  fill="#78350f"/>
      <rect x="14" y="38" width="6"  height="14" fill="#92400e"/>
      <rect x="14" y="38" width="3"  height="14" fill="#b45309"/>
      <rect x="14" y="38" width="6"  height="2"  fill="#d97706"/>
      <rect x="12" y="52" width="8"  height="4"  fill="#ffdbac"/>   {/* left hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="-20 44 38; -10 44 38; -20 44 38" dur="0.7s" repeatCount="indefinite" calcMode="discrete"/>
        <rect x="44" y="36" width="6"  height="10" fill="#92400e"/>
        <rect x="44" y="36" width="3"  height="10" fill="#b45309"/>
        <rect x="44" y="36" width="6"  height="2"  fill="#d97706"/>
        <rect x="43" y="44" width="8"  height="4"  fill="#ffdbac"/>
        <rect x="44" y="46" width="6"  height="2"  fill="#f5c6a0"/>
        <rect x="43" y="30" width="2"  height="2"  fill="#ffdbac"/>
        <rect x="45" y="28" width="2"  height="2"  fill="#f5c6a0"/>
        <rect x="47" y="27" width="2"  height="2"  fill="#ffdbac"/>
      </g>

      {/* ── Shield (left side, tilted/lowered — confused stance) ── */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="10 14 52; 15 14 52; 10 14 52" dur="0.9s" repeatCount="indefinite" calcMode="discrete"/>
        <rect x="4"  y="42" width="12" height="16" fill="#1e40af"/>
        <rect x="4"  y="42" width="6"  height="16" fill="#1d4ed8"/>
        <rect x="4"  y="42" width="12" height="2"  fill="#fbbf24"/>
        <rect x="4"  y="42" width="2"  height="16" fill="#fbbf24"/>
        <rect x="14" y="42" width="2"  height="16" fill="#fbbf24"/>
        <rect x="4"  y="56" width="12" height="2"  fill="#fbbf24"/>
        <rect x="9"  y="42" width="2"  height="16" fill="#fbbf24" opacity="0.4"/>
        <rect x="4"  y="49" width="12" height="2"  fill="#fbbf24" opacity="0.4"/>
        <rect x="9"  y="44" width="2"  height="8"  fill="#93c5fd" opacity="0.6"/>
        <rect x="7"  y="50" width="3"  height="2"  fill="#93c5fd" opacity="0.6"/>
        <rect x="12" y="50" width="3"  height="2"  fill="#93c5fd" opacity="0.6"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="8 58 54; 12 58 54; 8 58 54" dur="0.9s" repeatCount="indefinite" calcMode="discrete"/>
        <rect x="57" y="24" width="4"  height="46" fill="#92400e"/>
        <rect x="57" y="24" width="2"  height="46" fill="#b45309" opacity="0.5"/>
        <rect x="55" y="20" width="8"  height="6"  fill="#94a3b8"/>
        <rect x="57" y="18" width="4"  height="4"  fill="#cbd5e1"/>
        <rect x="58" y="16" width="2"  height="4"  fill="#f8fafc"/>
        <rect x="56" y="22" width="2"  height="2"  fill="#64748b"/>
        <rect x="62" y="22" width="2"  height="2"  fill="#64748b"/>
        <rect x="57" y="68" width="4"  height="4"  fill="#64748b"/>
      </g>

      {/* ── Pteruges (skirt) ── */}
      {[20,24,28,32,36,40].map(x => (
        <rect key={x} x={x} y="54" width="3" height="8" fill="#b45309" opacity={0.8+x*0.002}/>
      ))}
      <rect x="21" y="62" width="8"  height="8"  fill="#334155"/>
      <rect x="21" y="62" width="4"  height="8"  fill="#475569"/>
      <rect x="21" y="62" width="8"  height="2"  fill="#fbbf24" opacity="0.5"/>
      <rect x="33" y="62" width="8"  height="8"  fill="#334155"/>
      <rect x="33" y="62" width="4"  height="8"  fill="#475569"/>
      <rect x="33" y="62" width="8"  height="2"  fill="#fbbf24" opacity="0.5"/>
      <rect x="14" y="70" width="36" height="2"  fill="#000" opacity="0.3"/>
    </g>
  </svg>
);

const SpartanArmy = () => (
    <svg viewBox="0 0 1000 250" width="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', minHeight: '200px', imageRendering: 'pixelated' }}>
      <path d="M0,250 L0,150 L100,100 L250,180 L400,80 L550,160 L700,90 L850,170 L1000,120 L1000,250 Z" fill="#18181b" opacity="0.6" />
      <path d="M0,250 L0,180 L150,130 L300,190 L450,140 L600,200 L750,120 L900,180 L1000,150 L1000,250 Z" fill="#27272a" opacity="0.8" />
      {/* Ground */}
      <rect x="0" y="210" width="1000" height="40" fill="#09090b" />
      <rect x="0" y="215" width="1000" height="5" fill="#18181b" />
      {/* Army */}
      {[...Array(15)].map((_, i) => (
        <g key={`soldier-${i}`} transform={`translate(${i * 70 - 20}, 115)`}>
          {/* Spear */}
          <rect x="25" y="10" width="3" height="90" fill="#3f3f46" />
          <polygon points="24,10 26.5,0 29,10" fill="#71717a" />
          {/* Plume */}
          <rect x="5" y="25" width="20" height="4" fill="#9f1239" />
          <rect x="3" y="29" width="24" height="6" fill="#be123c" />
          {/* Head */}
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

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const router  = useRouter();
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message,setMessage]= useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string, content: React.ReactNode } | null>(null);

  React.useEffect(() => setIsMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMessage('');
    try {
      const res  = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMessage(data.message); }
      else         { setStatus('error');   setMessage(data.message || 'Gagal mengirim email pemulihan.'); }
    } catch {
      setStatus('error');
      setMessage('Terjadi kesalahan jaringan. Coba lagi nanti.');
    }
  };

  const openModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setModalContent({ title: 'Kebijakan Privasi', content: <PrivacyContent /> });
    } else {
      setModalContent({ title: 'Syarat dan Ketentuan', content: <TermsContent /> });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center relative p-6 font-sans overflow-x-hidden overflow-y-auto">
      {isModalOpen && modalContent && (
        <PolicyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
          {modalContent.content}
        </PolicyModal>
      )}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute bg-amber-200 rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              } as React.CSSProperties}/>
          ))}
        </div>
      )}
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
      `}</style>

      <button onClick={() => router.push('/login')}
        className="absolute top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-amber-500 hover:border-amber-400 hover:text-zinc-900 rounded-full transition-all shadow-lg group">
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="w-full max-w-md z-10 relative pb-16 pt-8 flex flex-col items-center">
        <div className="mb-8"><ConfusedSpartan/></div>

        <div className="bg-zinc-800 border-[4px] border-zinc-950 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)] relative overflow-hidden w-full">
            {status === 'success' ? (
              <div className="text-center py-4">
                <h2 className="text-xl font-extrabold text-amber-400 mb-3">KUNCI DARURAT DIKIRIM!</h2>
                <p className="text-zinc-300 text-sm mb-6">{message || 'Cek emailmu — kami sudah mengirimkan tautan untuk membuka kembali akses ke dungeonmu.'}</p>
                <div className="bg-amber-900/20 border border-amber-700/40 px-4 py-3 w-full text-center mb-4 rounded-lg">
                  <p className="text-xs text-amber-400 uppercase tracking-wider font-bold">
                    ⏳ Tautan berlaku selama 15 menit
                  </p>
                </div>
                <button onClick={() => router.push('/login')}
                  className="w-full py-3 mt-2 bg-zinc-700 text-zinc-300 font-bold text-sm rounded-xl border-b-[4px] border-zinc-800 hover:bg-zinc-600 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px] transition-all uppercase">
                  Kembali ke Gerbang
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-center">
                  <h2 className="text-2xl font-extrabold text-white mb-2">Terkunci di Luar?</h2>
                  <p className="text-zinc-400 text-sm">Jangan panik, ksatria. Masukkan emailmu untuk mendapatkan kunci darurat.</p>
                </div>
                <div>
                  <input
                    type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="adventurer@dungeon.id"
                    className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500"
                  />
                </div>
                {status === 'error' && (
                  <div className="text-red-400 text-sm text-center font-bold bg-red-950/30 py-3 rounded-xl border border-red-900/50">
                    {message}
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="w-full py-4 bg-amber-500 text-zinc-950 font-black text-lg rounded-2xl border-b-[6px] border-amber-700 hover:bg-amber-400 hover:border-b-[4px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-70 disabled:pointer-events-none uppercase tracking-wide border-2 border-zinc-950">
                  {status === 'loading' ? 'MENCARI KUNCI...' : 'KIRIM TAUTAN'}
                </button>
              </form>
            )}
          </div>
        </div>

      <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none flex justify-center opacity-60">
        <SpartanArmy />
      </div>

      <footer className="absolute bottom-0 left-0 right-0 z-20 w-full pt-16 pb-8 px-6 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 pointer-events-auto">
          <p className="font-medium tracking-wide mb-4 md:mb-0 text-center md:text-left">
            © 2026 Daily Dungeon. All rights reserved.
          </p>
          <div className="flex gap-6 font-medium">
            <button onClick={() => openModal('privacy')} className="hover:text-amber-400 transition-colors">Kebijakan Privasi</button>
            <button onClick={() => openModal('terms')} className="hover:text-amber-400 transition-colors">Syarat dan Ketentuan</button>
          </div>
        </div>
      </footer>
    </div>
  );
}