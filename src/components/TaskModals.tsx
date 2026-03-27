"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore, TaskType, Task as StoreTask } from "@/store/useStore";
import { 
  Plus, Minus, Star, Flame, X, FileText, Trash2, 
  CalendarDays, RotateCcw, Hash, AlertTriangle, Trophy, Skull, Repeat, Menu
} from "lucide-react";
import { translations } from "@/utils/translations";

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
                      type === 'todo' ? "fill-pink-400 text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" : "fill-zinc-400 text-zinc-400";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4].map(star => <Star key={star} size={10} className={star <= difficulty ? activeColor : "fill-zinc-800 text-zinc-700"} />)}
    </div>
  );
};

// ==========================================
// 1. KOMPONEN MODAL: FORM TAMBAH TUGAS
// ==========================================
export const TaskFormModal = ({ isOpen, onClose, initialType, isFixed }: { isOpen: boolean, onClose: () => void, initialType: TaskType | null, isFixed: boolean }) => {
  const { addTask, showAlert, settings } = useStore();
  const t = translations[useStore().settings?.language || 'id']?.ui || translations['id'].ui;
  const tForm = translations[settings?.language || 'id']?.taskForm || translations['id'].taskForm;
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [newTaskType, setNewTaskType] = useState<TaskType | null>(initialType);
  const [newTaskCategory, setNewTaskCategory] = useState(""); 
  const [customCategory, setCustomCategory] = useState(""); 
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(2); 
  const [isBossTask, setIsBossTask] = useState(false);
  const [resetCounter, setResetCounter] = useState("Harian");
  const [habitCount, setHabitCount] = useState<number | string>(0);
  const [startDate, setStartDate] = useState("");
  const [repeatEvery, setRepeatEvery] = useState<number | string>(1);
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

    if (newTaskType === 'habit') { taskPayload.resetCounter = resetCounter; taskPayload.habitCount = Number(habitCount) || 0; } 
    else if (newTaskType === 'daily') { taskPayload.startDate = startDate; taskPayload.repeatEvery = Number(repeatEvery) || 1; taskPayload.repeatUnit = repeatUnit; } 
    else if (newTaskType === 'todo') { taskPayload.dueDate = dueDate; }

    addTask(taskPayload);
    onClose();
  };

  // PERBAIKAN NAMA TEMA MODAL
  const themeColors = {
    habit: { border: "border-amber-500", shadow: "shadow-[8px_8px_0_#000]", headerBg: "bg-zinc-800", headerBorder: "border-amber-500", text: "text-amber-400", hover: "hover:text-amber-300", focus: "focus:border-amber-400", button: "bg-amber-500 hover:bg-amber-400 text-zinc-950", title: tForm.habitTitle },
    daily: { border: "border-cyan-500", shadow: "shadow-[8px_8px_0_#000]", headerBg: "bg-zinc-800", headerBorder: "border-cyan-500", text: "text-cyan-400", hover: "hover:text-cyan-300", focus: "focus:border-cyan-400", button: "bg-cyan-500 hover:bg-cyan-400 text-zinc-950", title: tForm.dailyTitle },
    todo:  { border: "border-pink-500", shadow: "shadow-[8px_8px_0_#000]", headerBg: "bg-zinc-800", headerBorder: "border-pink-500", text: "text-pink-400", hover: "hover:text-pink-300", focus: "focus:border-pink-400", button: "bg-pink-500 hover:bg-pink-400 text-white", title: tForm.todoTitle },
    neutral: { border: "border-zinc-600", shadow: "shadow-[8px_8px_0_#000]", headerBg: "bg-zinc-800", headerBorder: "border-zinc-600", text: "text-zinc-300", hover: "hover:text-white", focus: "focus:border-zinc-400", button: "bg-zinc-700 text-zinc-400 cursor-not-allowed", title: tForm.newTitle }
  };
  const mTheme = newTaskType ? themeColors[newTaskType] : themeColors.neutral;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
      <div className={`w-full max-w-md bg-zinc-900 border-4 rounded-none flex flex-col overflow-hidden transition-all duration-300 ${mTheme.border} ${mTheme.shadow}`}>
        <div className={`${mTheme.headerBg} border-b-4 ${mTheme.headerBorder} p-4 flex justify-between items-center`}>
          <h3 className={`font-pixel text-[10px] uppercase tracking-widest ${mTheme.text}`}>{isFixed ? mTheme.title : tForm.newTitle}</h3>
          <button onClick={onClose} className={`${mTheme.text} ${mTheme.hover} transition-colors`}><X size={18} /></button>
        </div>
        
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{tForm.taskName}</label>
            <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder={tForm.taskNamePh} className={`bg-zinc-800 border-2 border-zinc-600 rounded-none p-3 text-sm text-zinc-200 outline-none transition-colors w-full ${mTheme.focus}`} autoFocus/>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{tForm.notes}</label>
            <textarea value={newTaskNotes} onChange={(e) => setNewTaskNotes(e.target.value)} placeholder={tForm.notesPh} className={`bg-zinc-800 border-2 border-zinc-600 rounded-none p-3 text-sm text-zinc-200 outline-none transition-colors w-full min-h-[80px] resize-none ${mTheme.focus}`}/>
          </div>

          {!isFixed && (
            <div className="flex flex-col gap-1.5 mt-2 bg-zinc-800 border-2 border-zinc-700 p-3 rounded-none">
              <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Tipe Misi*</label>
              <div className="grid grid-cols-3 gap-3">
                {/* PERBAIKAN NAMA TOMBOL */}
                <button onClick={() => setNewTaskType('habit')} className={`py-2 text-xs font-bold rounded-none border-2 transition-all ${newTaskType === 'habit' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-zinc-900 border-zinc-600 text-zinc-400 hover:bg-zinc-700'}`}>Siklus Misi</button>
                <button onClick={() => setNewTaskType('daily')} className={`py-2 text-xs font-bold rounded-none border-2 transition-all ${newTaskType === 'daily' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-zinc-900 border-zinc-600 text-zinc-400 hover:bg-zinc-700'}`}>Operasi Harian</button>
                <button onClick={() => setNewTaskType('todo')} className={`py-2 text-xs font-bold rounded-none border-2 transition-all ${newTaskType === 'todo' ? 'bg-pink-500/20 border-pink-500 text-pink-400' : 'bg-zinc-900 border-zinc-600 text-zinc-400 hover:bg-zinc-700'}`}>Target Utama</button>
              </div>
            </div>
          )}

          {newTaskType && (
            <div className="p-4 bg-zinc-800 border-2 border-zinc-700 rounded-none flex flex-col gap-4 animate-in fade-in duration-300">
              {newTaskType === 'habit' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-amber-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><RotateCcw size={12}/> {tForm.resetCounter}</label>
                    <select value={resetCounter} onChange={(e) => setResetCounter(e.target.value)} className="bg-zinc-900 border-2 border-zinc-600 rounded-none p-2 text-sm text-zinc-200 outline-none focus:border-amber-400 transition-colors w-full cursor-pointer appearance-none">
                      <option value="Harian">{tForm.dailyReset}</option><option value="Mingguan">{tForm.weeklyReset}</option><option value="Bulanan">{tForm.monthlyReset}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-amber-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><Hash size={12}/> {tForm.setInitial}</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setHabitCount((Number(habitCount) || 0) - 1)} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-600 hover:border-amber-500 rounded-none flex items-center justify-center text-zinc-400 hover:text-amber-500 transition-colors"><Minus size={16}/></button>
                      <input type="number" value={habitCount} onChange={(e) => setHabitCount(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 h-10 bg-zinc-900 border-2 border-zinc-600 rounded-none text-center text-sm font-bold text-zinc-200 outline-none focus:border-amber-400" />
                      <button onClick={() => setHabitCount((Number(habitCount) || 0) + 1)} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-600 hover:border-amber-500 rounded-none flex items-center justify-center text-zinc-400 hover:text-amber-500 transition-colors"><Plus size={16}/></button>
                    </div>
                  </div>
                </>
              )}
              {newTaskType === 'daily' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><CalendarDays size={12}/> {tForm.startDate}</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-zinc-900 border-2 border-zinc-600 rounded-none p-2 text-sm text-zinc-200 outline-none focus:border-cyan-400 transition-colors w-full [color-scheme:dark] cursor-pointer" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><Repeat size={12}/> {tForm.repeatEvery}</label>
                    <div className="flex gap-2">
                      <input type="number" min="1" value={repeatEvery} onChange={(e) => setRepeatEvery(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 bg-zinc-900 border-2 border-zinc-600 rounded-none p-2 text-center text-sm text-zinc-200 outline-none focus:border-cyan-400" />
                      <select value={repeatUnit} onChange={(e) => setRepeatUnit(e.target.value)} className="flex-1 bg-zinc-900 border-2 border-zinc-600 rounded-none p-2 text-sm text-zinc-200 outline-none focus:border-cyan-400 cursor-pointer appearance-none">
                        <option value="Hari">{tForm.day}</option><option value="Minggu">{tForm.week}</option><option value="Bulan">{tForm.month}</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {newTaskType === 'todo' && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-pink-500/70 font-bold uppercase tracking-wider flex items-center gap-1"><CalendarDays size={12}/> {tForm.dueDate}</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-zinc-900 border-2 border-zinc-600 rounded-none p-2 text-sm text-zinc-200 outline-none focus:border-pink-400 transition-colors w-full [color-scheme:dark] cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="bossMode" checked={isBossTask} onChange={() => setIsBossTask(!isBossTask)} className="w-4 h-4 accent-pink-500 cursor-pointer" />
                    <label htmlFor="bossMode" className="text-xs text-zinc-300 font-bold cursor-pointer flex items-center gap-1">{tForm.makeBoss} <span title="Boss Task"><Flame size={14} className="text-pink-500"/></span> Boss Task</label>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{tForm.difficulty}</label>
              <span className="text-[8px] text-emerald-400/80 italic">{tForm.diffNote}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[{ level: 1, label: tForm.trivial }, { level: 2, label: tForm.easy }, { level: 3, label: tForm.medium }, { level: 4, label: tForm.hard }].map(diff => (
                <button key={diff.level} onClick={() => setNewTaskDifficulty(diff.level)} className={`flex flex-col items-center gap-1.5 p-2 rounded-none border-2 transition-all ${newTaskDifficulty === diff.level ? `${mTheme.headerBg} ${mTheme.border} ${mTheme.text}` : 'bg-zinc-900 border-zinc-600 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300'}`}>
                  {renderStars(diff.level, newTaskType)}
                  <span className="text-[10px] font-bold">{diff.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{tForm.category}</label>
            <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} className={`bg-zinc-800 border-2 border-zinc-600 rounded-none p-3 text-sm text-zinc-200 outline-none transition-colors w-full cursor-pointer appearance-none ${mTheme.focus}`}>
              <option value="" disabled hidden>{tForm.catPh}</option>
              <option value="Kesehatan">Kesehatan</option><option value="Pendidikan">Pendidikan</option>
              <option value="Pekerjaan">Pekerjaan</option><option value="Proyek">Proyek</option>
              <option value="Lainnya">{tForm.catCustom}</option>
            </select>
            {newTaskCategory === "Lainnya" && (
              <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder={tForm.catCustomPh} className={`bg-zinc-900 border-b-2 p-2 text-sm outline-none w-full mt-2 ${mTheme.border} ${mTheme.text}`} autoFocus/>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-zinc-800 border-t-4 border-zinc-700 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase">{t.cancel}</button>
          <button onClick={submitNewTask} disabled={!newTaskType} className={`px-8 py-2 rounded-none text-xs font-bold shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all uppercase ${newTaskType ? mTheme.button : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>{t.add}</button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. KOMPONEN MODAL: DETAIL TUGAS
// ==========================================
export const TaskDetailModal = ({ task, onClose }: { task: ExtendedTask | null, onClose: () => void }) => {
  const { deleteTask, settings } = useStore();
  const t = translations[useStore().settings?.language || 'id']?.ui || translations['id'].ui;
  const tForm = translations[settings?.language || 'id']?.taskForm || translations['id'].taskForm;

  if (!task) return null;

  const triggerDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-zinc-900 border-2 border-zinc-600 rounded-lg shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-zinc-800 flex justify-between items-start bg-zinc-950">
          <div className="flex flex-col gap-2">
            {/* PERBAIKAN LABEL TIPE TUGAS */}
            <span className={`text-[10px] font-pixel tracking-widest flex items-center gap-2 ${task.type === 'habit' ? 'text-amber-400' : task.type === 'daily' ? 'text-cyan-400' : 'text-pink-400'}`}>
              {task.type === 'habit' ? 'SIKLUS MISI' : task.type === 'daily' ? 'OPERASI HARIAN' : 'TARGET UTAMA'} {renderStars(task.difficulty, task.type)}
            </span>
            <h2 className="text-xl font-bold text-white leading-tight">{task.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-1 rounded border border-zinc-700">{task.category}</span>
              {task.isBoss && <span className="bg-pink-500/10 text-pink-500 text-[10px] px-2 py-1 rounded border border-pink-500/30 flex items-center gap-1"><Flame size={12}/> BOSS</span>}
              {task.type === 'habit' && <span className="text-[10px] text-amber-500 border border-amber-500/30 px-2 py-1 rounded">Reset: {task.resetCounter}</span>}
              {task.type === 'daily' && <span className="text-[10px] text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded">Tiap {task.repeatEvery} {task.repeatUnit}</span>}
              {task.type === 'todo' && task.dueDate && <span className="text-[10px] text-pink-500 border border-pink-500/30 px-2 py-1 rounded">Tenggat: {task.dueDate}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white bg-zinc-800 p-1.5 rounded-full"><X size={16} /></button>
        </div>
        <div className="p-6 min-h-[150px]">
          <h4 className="text-xs font-bold text-zinc-400 flex items-center gap-2 mb-3"><FileText size={14}/> {tForm.details}</h4>
          <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{task.notes ? task.notes : <span className="italic text-zinc-600">{tForm.noNotes}</span>}</p>
        </div>
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
          <button onClick={triggerDelete} className="flex items-center gap-2 text-xs font-bold text-pink-500 hover:text-white hover:bg-pink-500 px-4 py-2 rounded transition-colors"><Trash2 size={14}/> {tForm.delete}</button>
          <button onClick={onClose} className="text-xs text-zinc-400 hover:text-white px-4 py-2 border border-zinc-700 rounded transition-colors uppercase">{t.close}</button>
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
  const t = translations[useStore().settings?.language || 'id']?.ui || translations['id'].ui;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <>
      {alertDialog.isOpen && alertDialog.type === 'levelup' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex justify-center items-center p-4" onClick={closeAlert}>
          <div className="relative w-full max-w-sm bg-zinc-900 border-4 border-yellow-400 p-8 flex flex-col items-center text-center shadow-[0_0_40px_rgba(250,204,21,0.4)] animate-in zoom-in-75 duration-500" onClick={e => e.stopPropagation()}>
            <div className="absolute -top-12">
              <div className="relative flex items-center justify-center">
                <Star size={80} className="text-yellow-400 animate-[spin_4s_linear_infinite] drop-shadow-[0_0_15px_#facc15]" />
                <Star size={40} className="text-white absolute animate-pulse" />
              </div>
            </div>
            <h2 className="font-pixel text-xl text-yellow-400 tracking-[0.1em] mt-8 mb-3 drop-shadow-[3px_3px_0_#000] animate-bounce">LEVEL UP!</h2>
            <p className="text-sm text-zinc-200 mb-8 font-mono leading-relaxed">{alertDialog.message}</p>
            <button onClick={closeAlert} className="px-8 py-3 bg-yellow-400 text-yellow-950 font-pixel text-[10px] uppercase shadow-[4px_4px_0_#000] hover:bg-yellow-300 active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all w-full">{t.continue}</button>
          </div>
        </div>
      )}

      {alertDialog.isOpen && alertDialog.type !== 'levelup' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex justify-center items-center p-4" onClick={closeAlert}>
          <div className={`w-full max-w-sm bg-zinc-900 border-4 rounded-none flex flex-col items-center text-center p-6 shadow-[8px_8px_0_#000] animate-in zoom-in-95 duration-200 ${alertDialog.type === 'success' ? 'border-amber-400' : alertDialog.type === 'danger' ? 'border-pink-500' : alertDialog.type === 'warning' ? 'border-orange-500' : 'border-cyan-500'}`} onClick={e => e.stopPropagation()}>
            <div className={`p-4 rounded-none mb-4 border-2 ${alertDialog.type === 'success' ? 'bg-amber-400/20 border-amber-400' : alertDialog.type === 'danger' ? 'bg-pink-500/20 border-pink-500' : alertDialog.type === 'warning' ? 'bg-orange-500/20 border-orange-500' : 'bg-cyan-500/20 border-cyan-500'}`}>
              {alertDialog.type === 'success' && <Trophy size={40} className="text-amber-400 animate-bounce" />}
              {alertDialog.type === 'danger' && <Skull size={40} className="text-pink-500 animate-pulse" />}
              {alertDialog.type === 'warning' && <AlertTriangle size={40} className="text-orange-500" />}
              {alertDialog.type === 'info' && <FileText size={40} className="text-cyan-500" />}
            </div>
            <h2 className={`font-pixel text-[10px] tracking-widest mb-3 uppercase ${alertDialog.type === 'success' ? 'text-amber-400' : alertDialog.type === 'danger' ? 'text-pink-500' : alertDialog.type === 'warning' ? 'text-orange-500' : 'text-cyan-400'}`}>{alertDialog.title}</h2>
            <p className="text-xs text-zinc-300 mb-6 leading-relaxed font-mono px-4">{alertDialog.message}</p>
            <button onClick={closeAlert} className={`px-8 py-3 rounded-none text-[10px] font-pixel transition-all uppercase w-full shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] ${alertDialog.type === 'success' ? 'bg-amber-400 text-amber-950 hover:bg-amber-300' : alertDialog.type === 'danger' ? 'bg-pink-500 text-white hover:bg-pink-400' : alertDialog.type === 'warning' ? 'bg-orange-500 text-white hover:bg-orange-400' : 'bg-cyan-500 text-cyan-950 hover:bg-cyan-400'}`}>{t.closeContinue}</button>
          </div>
        </div>
      )}

      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-zinc-900 border-4 border-cyan-500 p-6 shadow-[8px_8px_0_#000] text-center animate-in zoom-in-95 duration-200">
            <div className="bg-zinc-800 w-16 h-16 mx-auto rounded-none flex items-center justify-center mb-4 border-2 border-cyan-500/50 shadow-inner">
              <AlertTriangle size={32} className="text-cyan-400 animate-pulse" />
            </div>
            <h2 className="font-pixel text-[10px] text-cyan-400 tracking-widest mb-3 uppercase">Sistem Konfirmasi</h2>
            <p className="text-xs text-zinc-300 mb-6 font-mono leading-relaxed">{confirmDialog.message}</p>
            <div className="flex gap-3 justify-center w-full">
              <button onClick={closeConfirm} className="flex-1 bg-zinc-800 border-2 border-zinc-600 hover:border-zinc-400 text-zinc-300 px-4 py-3 text-[10px] font-pixel transition-all uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]">{t.cancel}</button>
              <button onClick={() => { confirmDialog.onConfirm(); closeConfirm(); }} className="flex-1 bg-cyan-500 border-2 border-cyan-400 text-cyan-950 hover:bg-cyan-400 px-4 py-3 text-[10px] font-pixel transition-all uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]">{t.continue}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
};

// ==========================================
// 4. KOMPONEN TOMBOL TOGGLE STATUS PANEL
// ==========================================
export const ToggleStatusPanelButton = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  return (
    <button 
      onClick={onToggle} 
      className="text-zinc-400 hover:text-white transition-colors xl:hidden p-2 rounded-none bg-zinc-800 border-2 border-zinc-600 shadow-[4px_4px_0_#000]"
      title="Toggle Status Log"
    >
      <Menu size={20} />
    </button>
  );
};