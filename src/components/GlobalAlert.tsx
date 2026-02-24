"use client";
import { useStore } from "@/store/useStore";
import { X, CheckCircle2, AlertCircle, Info, Skull, Trophy } from "lucide-react";

export default function GlobalAlert() {
  const { alertDialog, closeAlert } = useStore();

  // Jika isOpen false, jangan gambar apapun
  if (!alertDialog.isOpen) return null;

  const themes = {
    success: "border-emerald-500 bg-[#020617] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    danger: "border-pink-600 bg-[#020617] text-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.2)]",
    warning: "border-yellow-500 bg-[#020617] text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]",
    info: "border-cyan-500 bg-[#020617] text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
  };

  const icons = {
    success: <Trophy size={28} className="animate-bounce" />,
    danger: <Skull size={28} />,
    warning: <AlertCircle size={28} />,
    info: <Info size={28} />,
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-sm border-2 rounded-lg overflow-hidden animate-in zoom-in duration-200 ${themes[alertDialog.type]}`}>
        {/* Header Dekoratif */}
        <div className="h-1 w-full bg-current opacity-20" />
        
        <div className="p-8 flex flex-col items-center text-center gap-4">
          <div className="p-3 rounded-full bg-current/10">
            {icons[alertDialog.type]}
          </div>
          
          <div className="space-y-1">
            <h2 className="font-pixel text-[12px] uppercase tracking-[0.2em] font-bold">
              {alertDialog.title}
            </h2>
            <div className="h-[2px] w-12 bg-current mx-auto opacity-30" />
          </div>

          <p className="text-xs font-mono italic leading-relaxed opacity-90 whitespace-pre-line px-2">
            {alertDialog.message}
          </p>

          <button 
            onClick={closeAlert}
            className="mt-4 w-full py-3 border border-current hover:bg-current hover:text-black transition-all duration-300 font-pixel text-[8px] uppercase tracking-widest group relative overflow-hidden"
          >
            <span className="relative z-10">Diterima / Close_Log</span>
          </button>
        </div>
        
        {/* Footer Dekoratif */}
        <div className="flex justify-between px-2 pb-1 opacity-20 font-mono text-[6px]">
          <span>SYS_MSG_v1.0</span>
          <span>STABLE_CONNECTION</span>
        </div>
      </div>
    </div>
  );
}