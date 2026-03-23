"use client";
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, UserPlus, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { setUserProfile, userProfile } = useStore();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // State baru untuk membedakan Mode Login atau Register
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validatePassword = (pass: string) => {
    const hasCapital = /[A-Z]/.test(pass);
    const isLongEnough = pass.length >= 8;
    if (!isLongEnough) return "Password minimal 8 karakter!";
    if (!hasCapital) return "Password harus punya minimal 1 huruf kapital!";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegisterMode) {
      // --- LOGIKA REGISTER ---
      const validationError = validatePassword(password);
      if (validationError) {
        setError(validationError);
        return;
      }
      
      // Simpan data pendaftaran (Username & Password disimpan di store)
      // Kita asumsikan store punya field untuk password atau kita simpan ke profile sementara
      setUserProfile({ 
        accountName: email,
        // Kita simpan password ke store agar bisa dicheck saat login nanti
        // Catatan: Ini cara sederhana untuk local-app
        avatarId: password 
      });

      alert("Akun berhasil dibuat! Silakan login.");
      setIsRegisterMode(false); // Balik ke mode login
      setPassword(""); // Kosongkan password demi keamanan
    } else {
      // --- LOGIKA LOGIN ---
      // Cek apakah username cocok DAN password (yang kita simpan di avatarId tadi) cocok
      if (email === userProfile?.accountName && password === userProfile?.avatarId) {
        router.push('/');
      } else {
        setError("Username atau Password salah!");
        new Audio('/sounds/error.mp3').play().catch(() => {});
      }
    }
  };

  if (!isMounted) return null;

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden font-mono">
      
      {/* BACKGROUND */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl p-1 mx-4">
         <div className="bg-[#1a1b26]/90 backdrop-blur-xl border-2 border-slate-700 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 ${isRegisterMode ? 'border-emerald-500' : 'border-amber-500'}`} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-500" />

            {/* KOLOM KIRI: FORM */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="mb-8 text-left">
                <h2 className="text-4xl font-bold text-white tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {isRegisterMode ? "Create Account" : "Welcome Back!"}
                </h2>
                <p className="text-[10px] mt-2 uppercase tracking-[0.2em] font-pixel text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                  {isRegisterMode ? "Join the daily dungeon hunt" : "Secure your account to start hunting"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest text-left">Username</label>
                  <input 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/80 border-2 border-slate-700 p-3 text-white outline-none focus:border-amber-500 transition-all text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                    placeholder="Enter username..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Password</label>
                    {isRegisterMode && (
                      <span className={`text-[8px] uppercase font-bold flex items-center gap-1 ${password.length >= 8 && /[A-Z]/.test(password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {password.length >= 8 && /[A-Z]/.test(password) ? <ShieldCheck size={10}/> : <ShieldAlert size={10}/>}
                        Strength Check
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-slate-900/80 border-2 p-3 pr-12 text-white outline-none transition-all text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] ${
                        error ? 'border-pink-600 animate-shake' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                      placeholder={isRegisterMode ? "Min. 8 char + Capital" : "Enter password..."}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {error && <p className="text-[10px] text-pink-500 mt-2 font-bold uppercase animate-pulse">{error}</p>}
                </div>
                
                <button 
                  type="submit"
                          className={`w-full ${isRegisterMode ? 'bg-emerald-600 shadow-[0_4px_0_#065f46] text-white' : 'bg-amber-500 shadow-[0_4px_0_#b45309] text-amber-950'} font-bold py-4 uppercase tracking-[0.3em] active:translate-y-1 active:shadow-none transition-all text-xs mt-4 flex items-center justify-center gap-2`}
                >
                  {isRegisterMode ? <UserPlus size={16}/> : <LogIn size={16}/>}
                  {isRegisterMode ? "Register Account" : "Sign In"}
                </button>
              </form>

              {/* TOMBOL TOGGLE LOGIN/REGISTER */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => { setIsRegisterMode(!isRegisterMode); setError(""); }}
                  className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  {isRegisterMode ? "Already have an account? Login here" : "Don't have an account? Register here"}
                </button>
              </div>
            </div>

            {/* KOLOM KANAN: SOCIAL LOGIN */}
            <div className="flex flex-col justify-center border-l-0 md:border-l-2 border-slate-800 md:pl-12 space-y-4 animate-in fade-in slide-in-from-right-8 duration-700">
               <p className="text-center text-slate-500 text-[10px] font-bold uppercase mb-4 tracking-widest italic tracking-widest">
                 {isRegisterMode ? "Register Rules" : "Fast Access"}
               </p>
               
               {isRegisterMode ? (
                 <div className="p-4 bg-slate-900/50 border border-slate-800 space-y-3">
                    <p className="text-[9px] text-slate-400 leading-relaxed uppercase">
                      1. Password must be 8+ characters.<br/>
                      2. Include at least 1 Capital letter.<br/>
                      3. Remember your username!
                    </p>
                 </div>
               ) : (
                 <>
                   <button type="button" className="flex items-center gap-4 bg-slate-900/40 border-2 border-slate-700 p-3 hover:bg-slate-800 transition-all group hover:border-cyan-500">
                      <div className="w-8 h-8 bg-white/5 border border-slate-600 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase">G</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Google Auth</span>
                   </button>
                   <button type="button" className="flex items-center gap-4 bg-slate-900/40 border-2 border-slate-700 p-3 hover:bg-slate-800 transition-all group hover:border-blue-500">
                      <div className="w-8 h-8 bg-white/5 border border-slate-600 flex items-center justify-center text-blue-400 font-bold italic text-xs uppercase">S</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Steam Auth</span>
                   </button>
                 </>
               )}
            </div>
         </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </main>
  );
}