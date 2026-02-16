"use client";
import React, { useState, useEffect } from 'react';
import { useStore, TaskType, Task as StoreTask } from "@/store/useStore";
import { 
  Plus, Minus, Star, Flame, X, FileText, Trash2, 
  CalendarDays, RotateCcw, Hash, AlertTriangle, Trophy, Skull, Repeat
} from "lucide-react";

export interface ExtendedTask extends StoreTask {
  resetCounter?: string;
  habitCount?: number;
  startDate?: string;
  repeatEvery?: number;
  repeatUnit?: string;
  dueDate?: string;
}

const renderStars = (difficulty: number, type: TaskType | null) => {
  const activeColor = type === 'habit' ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : 
                      type === 'daily' ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" : 
                      type === 'todo' ? "fill-pink-400 text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" : "fill-slate-400 text-slate-400";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4].map(star => <Star key={star} size={10} className={star <= difficulty ? activeColor : "fill-slate-800 text-slate-700"} />)}
    </div>
  );
};

// ==========================================
// 1. KOMPONEN MODAL: FORM TAMBAH TUGAS
// ==========================================
export const TaskFormModal = ({ isOpen, onClose, initialType, isFixed }: { isOpen: boolean, onClose: () => void, initialType: TaskType | null, isFixed: boolean }) => {
  const { addTask, showAlert } = useStore();
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [newTaskType, setNewTaskType] = useState<TaskType | null>(initialType);
  const [newTaskCategory, setNewTaskCategory] = useState(""); 
  const [customCategory, setCustomCategory] = useState(""); 
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(2); 
  const [isBossTask, setIsBossTask] = useState(false);
  const [resetCounter, setResetCounter] = useState("Harian");
  const [habitCount, setHabitCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [repeatEvery, setRepeatEvery] = useState(1);
  const [repeatUnit, setRepeatUnit] = useState("Hari");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewTaskType(initialType);
      setNewTaskTitle(""); setNewTaskNotes(""); setNewTaskCategory(""); setCustomCategory("");
      setNewTaskDifficulty(2); setIsBossTask(false); setResetCounter("Harian"); setHabitCount(0);
      setStartDate(new Date().toISOString().split('T')[0]); setRepeatEvery(1); setRepeatUnit("Hari"); setDueDate("");
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const submitNewTask = () => {
    if (!newTaskTitle.trim()) { showAlert("Judul Kosong", "Misi harus memiliki judul agar bisa dilacak!", "warning"); return; }
    if (!newTaskType) { showAlert("Tipe Misi Belum Dipilih", "Tentukan tipe misi terlebih dahulu.", "warning"); return; }

    const finalCategory = newTaskCategory === "Lainnya" ? (customCategory.trim() || "Umum") : (newTaskCategory || "Umum");
    const taskPayload: any = {
      type: newTaskType, title: newTaskTitle, notes: newTaskNotes,
      category: finalCategory, difficulty: newTaskDifficulty, done: false, isBoss: newTaskType === 'todo' ? isBossTask : false
    };

    if (newTaskType === 'habit') { taskPayload.resetCounter = resetCounter; taskPayload.habitCount = habitCount; } 
    else if (newTaskType === 'daily') { taskPayload.startDate = startDate; taskPayload.repeatEvery = repeatEvery; taskPayload.repeatUnit = repeatUnit; } 
    else if (newTaskType === 'todo') { taskPayload.dueDate = dueDate; }

    addTask(taskPayload);
    onClose();
  };

  // PERBAIKAN NAMA TEMA MODAL
  const themeColors = {
    habit: { border: "border-amber-500", shadow: "shadow-[0_0_30px_rgba(251,191,36,0.2)]", headerBg: "bg-amber-500/10", headerBorder: "border-amber-500/30", text: "text-amber-400", hover: "hover:text-amber-300", focus: "focus:border-amber-400", button: "bg-amber-500 hover:bg-amber-400 text-slate-950", title: "Buat Siklus Misi" },
    daily: { border: "border-cyan-500", shadow: "shadow-[0_0_30px_rgba(34,211,238,0.2)]", headerBg: "bg-cyan-500/10", headerBorder: "border-cyan-500/30", text: "text-cyan-400", hover: "hover:text-cyan-300", focus: "focus:border-cyan-400", button: "bg-cyan-500 hover:bg-cyan-400 text-slate-950", title: "Buat Operasi Harian" },
    todo:  { border: "border-pink-500", shadow: "shadow-[0_0_30px_rgba(236,72,153,0.2)]", headerBg: "bg-pink-500/10", headerBorder: "border-pink-500/30", text: "text-pink-400", hover: "hover:text-pink-300", focus: "focus:border-pink-400", button: "bg-pink-500 hover:bg-pink-400 text-white", title: "Buat Target Utama" },
    neutral: { border: "border-slate-600", shadow: "shadow-[0_0_30px_rgba(100,116,139,0.2)]", headerBg: "bg-slate-800/50", headerBorder: "border-slate-700", text: "text-slate-300", hover: "hover:text-white", focus: "focus:border-slate-400", button: "bg-slate-700 text-slate-400 cursor-not-allowed", title: "Buat Misi Baru" }
  };
  const mTheme = newTaskType ? themeColors[newTaskType] : themeColors.neutral;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      <div className={`w-full max-w-md bg-slate-900 border-2 rounded-lg flex flex-col overflow-hidden transition-all duration-300 ${mTheme.border} ${mTheme.shadow}`}>
        <div className={`${mTheme.headerBg} border-b ${mTheme.headerBorder} p-4 flex justify-between items-center`}>
          <h3 className={`font-pixel text-[10px] uppercase tracking-widest ${mTheme.text}`}>{isFixed ? mTheme.title : "Buat Misi Baru"}</h3>
          <button onClick={onClose} className={`${mTheme.text} ${mTheme.hover} transition-colors`}><X size={18} /></button>
        </div>
        
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Judul Misi*</label>
            <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Contoh: Olahraga, Belajar Koding..." className={`bg-slate-950 border border-slate-700 rounded p-3 text-sm text-slate-200 outline-none transition-colors w-full ${mTheme.focus}`} autoFocus/>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Detail / Catatan</label>
            <textarea value={newTaskNotes} onChange={(e) => setNewTaskNotes(e.target.value)} placeholder="Tambahkan penjelasan, link, atau instruksi..." className={`bg-slate-950 border border-slate-700 rounded p-3 text-sm text-slate-200 outline-none transition-colors w-full min-h-[80px] resize-none ${mTheme.focus}`}/>
          </div>

          {!isFixed && (
            <div className="flex flex-col gap-1.5 mt-2 bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Tipe Misi*</label>
              <div className="grid grid-cols-3 gap-3">
                {/* PERBAIKAN NAMA TOMBOL */}
                <button onClick={() => setNewTaskType('habit')} className={`py-2 text-xs font-bold rounded border transition-all ${newTaskType === 'habit' ? 'bg-amber-500/20 border-amber-500 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>Siklus Misi</button>
                <button onClick={() => setNewTaskType('daily')} className={`py-2 text-xs font-bold rounded border transition-all ${newTaskType === 'daily' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>Operasi Harian</button>
                <button onClick={() => setNewTaskType('todo')} className={`py-2 text-xs font-bold rounded border transition-all ${newTaskType === 'todo' ? 'bg-pink-500/20 border-pink-500 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>Target Utama</button>
              </div>
            </div>
          )}

          {newTaskType && (
            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-lg flex flex-col gap-4 animate-in fade-in duration-300">
              {newTaskType === 'habit' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-amber-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><RotateCcw size={12}/> Ulang Hitungan</label>
                    <select value={resetCounter} onChange={(e) => setResetCounter(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 outline-none focus:border-amber-400 transition-colors w-full cursor-pointer appearance-none">
                      <option value="Harian">Harian (Reset tiap hari)</option><option value="Mingguan">Mingguan (Reset tiap minggu)</option><option value="Bulanan">Bulanan (Reset tiap bulan)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-amber-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><Hash size={12}/> Atur Hitungan Awal (+ / -)</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setHabitCount(habitCount - 1)} className="w-10 h-10 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded flex items-center justify-center text-slate-400 hover:text-amber-500 transition-colors"><Minus size={16}/></button>
                      <input type="number" value={habitCount} onChange={(e) => setHabitCount(Number(e.target.value))} className="w-16 h-10 bg-slate-900 border border-slate-700 rounded text-center text-sm font-bold text-slate-200 outline-none focus:border-amber-400" />
                      <button onClick={() => setHabitCount(habitCount + 1)} className="w-10 h-10 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded flex items-center justify-center text-slate-400 hover:text-amber-500 transition-colors"><Plus size={16}/></button>
                    </div>
                  </div>
                </>
              )}
              {newTaskType === 'daily' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><CalendarDays size={12}/> Tanggal Mulai Pengulangan</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 outline-none focus:border-cyan-400 transition-colors w-full [color-scheme:dark]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><Repeat size={12}/> Ulangi Setiap...</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" value={repeatEvery} onChange={(e) => setRepeatEvery(Number(e.target.value))} className="w-20 bg-slate-900 border border-slate-700 rounded p-2 text-center text-sm text-slate-200 outline-none focus:border-cyan-400" />
                      <select value={repeatUnit} onChange={(e) => setRepeatUnit(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 outline-none focus:border-cyan-400 cursor-pointer appearance-none">
                        <option value="Hari">Hari</option><option value="Minggu">Minggu</option><option value="Bulan">Bulan</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {newTaskType === 'todo' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-pink-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><CalendarDays size={12}/> Tenggat Waktu (Due Date)</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 outline-none focus:border-pink-400 transition-colors w-full [color-scheme:dark]" />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="bossMode" checked={isBossTask} onChange={() => setIsBossTask(!isBossTask)} className="w-4 h-4 accent-pink-500 cursor-pointer" />
                    <label htmlFor="bossMode" className="text-xs text-slate-300 font-bold cursor-pointer flex items-center gap-1">Jadikan ini <span title="Boss Task"><Flame size={14} className="text-pink-500"/></span> Boss Task</label>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tingkat Kesulitan</label>
              <span className="text-[8px] text-emerald-400/80 italic">*Kesulitan tinggi = EXP & Gold lebih besar!</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[{ level: 1, label: "Remeh" }, { level: 2, label: "Mudah" }, { level: 3, label: "Sedang" }, { level: 4, label: "Susah" }].map(diff => (
                <button key={diff.level} onClick={() => setNewTaskDifficulty(diff.level)} className={`flex flex-col items-center gap-1.5 p-2 rounded border transition-all ${newTaskDifficulty === diff.level ? `${mTheme.headerBg} ${mTheme.border} ${mTheme.text}` : 'bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300'}`}>
                  {renderStars(diff.level, newTaskType)}
                  <span className="text-[10px] font-bold">{diff.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kategori / Label</label>
            <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} className={`bg-slate-950 border border-slate-700 rounded p-3 text-sm text-slate-200 outline-none transition-colors w-full cursor-pointer appearance-none ${mTheme.focus}`}>
              <option value="" disabled hidden>Tambahkan tanda...</option>
              <option value="Kesehatan">Kesehatan</option><option value="Pendidikan">Pendidikan</option>
              <option value="Pekerjaan">Pekerjaan</option><option value="Proyek">Proyek</option>
              <option value="Lainnya">Lainnya... (Ketik Sendiri)</option>
            </select>
            {newTaskCategory === "Lainnya" && (
              <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder="Masukkan nama kategori baru..." className={`bg-slate-900 border-b-2 p-2 text-sm outline-none w-full mt-2 ${mTheme.border} ${mTheme.text}`} autoFocus/>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">Batal</button>
          <button onClick={submitNewTask} disabled={!newTaskType} className={`px-8 py-2 rounded text-xs font-bold shadow-lg transition-all ${newTaskType ? mTheme.button : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Tambah</button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. KOMPONEN MODAL: DETAIL TUGAS
// ==========================================
export const TaskDetailModal = ({ task, onClose }: { task: ExtendedTask | null, onClose: () => void }) => {
  const { deleteTask } = useStore();
  if (!task) return null;

  const triggerDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-slate-900 border-2 border-slate-600 rounded-lg shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-800 flex justify-between items-start bg-slate-950">
          <div className="flex flex-col gap-2">
            {/* PERBAIKAN LABEL TIPE TUGAS */}
            <span className={`text-[10px] font-pixel tracking-widest flex items-center gap-2 ${task.type === 'habit' ? 'text-amber-400' : task.type === 'daily' ? 'text-cyan-400' : 'text-pink-400'}`}>
              {task.type === 'habit' ? 'SIKLUS MISI' : task.type === 'daily' ? 'OPERASI HARIAN' : 'TARGET UTAMA'} {renderStars(task.difficulty, task.type)}
            </span>
            <h2 className="text-xl font-bold text-white leading-tight">{task.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-700">{task.category}</span>
              {task.isBoss && <span className="bg-pink-500/10 text-pink-500 text-[10px] px-2 py-1 rounded border border-pink-500/30 flex items-center gap-1"><Flame size={12}/> BOSS</span>}
              {task.type === 'habit' && <span className="text-[10px] text-amber-500 border border-amber-500/30 px-2 py-1 rounded">Reset: {task.resetCounter}</span>}
              {task.type === 'daily' && <span className="text-[10px] text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded">Tiap {task.repeatEvery} {task.repeatUnit}</span>}
              {task.type === 'todo' && task.dueDate && <span className="text-[10px] text-pink-500 border border-pink-500/30 px-2 py-1 rounded">Tenggat: {task.dueDate}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white bg-slate-800 p-1.5 rounded-full"><X size={16} /></button>
        </div>
        <div className="p-6 min-h-[150px]">
          <h4 className="text-xs font-bold text-slate-400 flex items-center gap-2 mb-3"><FileText size={14}/> Detail & Catatan:</h4>
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{task.notes ? task.notes : <span className="italic text-slate-600">Tidak ada catatan untuk misi ini.</span>}</p>
        </div>
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <button onClick={triggerDelete} className="flex items-center gap-2 text-xs font-bold text-pink-500 hover:text-white hover:bg-pink-500 px-4 py-2 rounded transition-colors"><Trash2 size={14}/> Hapus Misi</button>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-4 py-2 border border-slate-700 rounded transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. KOMPONEN MODAL: GLOBAL ALERTS
// ==========================================
export const GlobalAlerts = () => {
  const { alertDialog, confirmDialog, closeAlert, closeConfirm } = useStore();

  return (
    <>
      {alertDialog.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex justify-center items-center p-4" onClick={closeAlert}>
          <div className={`w-full max-w-sm bg-slate-900 border-2 rounded-lg flex flex-col items-center text-center p-6 shadow-2xl animate-in zoom-in duration-200 ${alertDialog.type === 'success' ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : alertDialog.type === 'danger' ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : alertDialog.type === 'warning' ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]'}`} onClick={e => e.stopPropagation()}>
            {alertDialog.type === 'success' && <Trophy size={48} className="text-amber-400 mb-4 animate-bounce" />}
            {alertDialog.type === 'danger' && <Skull size={48} className="text-pink-500 mb-4 animate-pulse" />}
            {alertDialog.type === 'warning' && <AlertTriangle size={48} className="text-orange-500 mb-4" />}
            <h2 className={`font-pixel text-xs tracking-widest mb-3 ${alertDialog.type === 'success' ? 'text-amber-400' : alertDialog.type === 'danger' ? 'text-pink-500' : alertDialog.type === 'warning' ? 'text-orange-500' : 'text-cyan-400'}`}>{alertDialog.title}</h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">{alertDialog.message}</p>
            <button onClick={closeAlert} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-2 rounded-full text-xs font-bold transition-colors w-full">Lanjutkan</button>
          </div>
        </div>
      )}

      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-pink-500 rounded-lg p-6 shadow-[0_0_30px_rgba(236,72,153,0.3)] text-center animate-in zoom-in duration-200">
            <AlertTriangle size={40} className="text-pink-500 mx-auto mb-4" />
            <h2 className="font-pixel text-[10px] text-pink-500 tracking-widest mb-3">PERINGATAN</h2>
            <p className="text-sm text-slate-300 mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={closeConfirm} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded text-xs font-bold transition-colors">Batal</button>
              <button onClick={() => { confirmDialog.onConfirm(); closeConfirm(); }} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2.5 rounded text-xs font-bold transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};