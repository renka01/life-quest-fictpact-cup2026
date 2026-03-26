"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center relative p-6">
      <div className="w-full max-w-md bg-zinc-800/50 p-8 rounded-xl border border-zinc-700/50 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">Lupa Kata Sandi?</h2>
          <p className="text-zinc-400 text-sm">Masukkan email yang terdaftar untuk menerima tautan pemulihan.</p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400 mb-6">
              {message}
            </div>
            <button onClick={() => router.push('/login')} className="text-amber-500 hover:underline">
              Kembali ke Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Alamat Email"
              className="w-full px-4 py-3 bg-zinc-900/50 border border-amber-500/20 text-white rounded text-sm focus:outline-none focus:border-amber-500/80"
            />
            {status === 'error' && <p className="text-red-400 text-xs text-center">{message}</p>}
            
            <button type="submit" disabled={status === 'loading'} className="w-full py-3 mt-2 bg-amber-500 text-zinc-900 font-bold rounded shadow-lg hover:bg-amber-400 transition-colors disabled:opacity-50">
              {status === 'loading' ? 'Mengirim...' : 'Kirim Tautan Reset'}
            </button>
            <button type="button" onClick={() => router.push('/login')} className="text-sm text-zinc-400 hover:text-amber-400 mt-4">
              Kembali
            </button>
          </form>
        )}
      </div>
    </div>
  );
}