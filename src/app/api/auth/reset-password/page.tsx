"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token reset tidak ditemukan atau tidak valid.');
      return;
    }
    if (pass.length < 6) {
      setError('Kata sandi minimal harus 6 karakter.');
      return;
    }
    if (pass !== pass2) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: pass }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal mengubah kata sandi');

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-black text-amber-500 mb-4 tracking-wide uppercase">Berhasil!</h2>
        <p className="text-zinc-300 font-medium mb-6">Kata sandi Anda telah diperbarui dan siap digunakan.</p>
        <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-amber-500 animate-[fillBar_3s_linear_forwards]"></div>
        </div>
        <p className="text-zinc-500 text-sm font-bold">Mengarahkan ke halaman login...</p>
        <style>{`@keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="text-center mb-2">
        <h2 className="text-white text-2xl font-black tracking-wide uppercase">Kata Sandi Baru</h2>
        <p className="text-zinc-400 text-sm mt-2 font-medium">Tempa ulang perlindungan akunmu.</p>
      </div>

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          value={pass} onChange={e => setPass(e.target.value)}
          placeholder="Kata Sandi Baru"
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500 pr-12"
        />
        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors">
          {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>

      <div className="relative">
        <input
          type={showPass2 ? "text" : "password"}
          value={pass2} onChange={e => setPass2(e.target.value)}
          placeholder="Konfirmasi Kata Sandi Baru"
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white font-medium px-5 py-3.5 rounded-2xl text-base focus:outline-none focus:border-amber-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-500 pr-12"
        />
        <button type="button" onClick={() => setShowPass2(!showPass2)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-500 transition-colors">
          {showPass2 ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>

      {error && <div className="text-red-400 text-sm text-center font-bold bg-red-950/30 py-3 rounded-xl border border-red-900/50">{error}</div>}

      <button type="submit" disabled={loading} className="w-full py-4 mt-2 bg-amber-500 text-zinc-950 font-black text-lg rounded-2xl border-b-[6px] border-amber-700 hover:bg-amber-400 hover:border-b-[4px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-70 disabled:pointer-events-none uppercase tracking-wide border-2 border-zinc-950">
        {loading ? 'MEMPROSES...' : 'SIMPAN KATA SANDI'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center relative p-6 font-sans overflow-x-hidden overflow-y-auto">
      {/* Latar Belakang Bintang */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute bg-amber-200 rounded-full" style={{ width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s` }} />
        ))}
      </div>
      <style>{`@keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }`}</style>

      {/* Tombol Kembali */}
      <Link href="/login" className="absolute top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-amber-500 hover:border-amber-400 hover:text-zinc-900 rounded-full transition-all shadow-lg group">
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      <div className="w-full max-w-md z-10 relative pb-16 pt-8">
        <div className="flex justify-center mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
          <img src="/logo.png" alt="Logo" className="h-16 md:h-24" style={{ imageRendering: 'pixelated' }} />
        </div>
        <div className="bg-zinc-800 border-[4px] border-zinc-950 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_rgba(0,0,0,0.5)] relative overflow-hidden">
          <Suspense fallback={<div className="text-amber-500 text-center font-bold">Memuat...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
