"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Swords, Flame, Calendar as CalIcon, X, CheckCircle2, CircleDashed } from 'lucide-react';
import { useStore } from '@/store/useStore'; 
import { ExtendedTask } from './TaskModals';
import { translations } from '@/utils/translations';

export default function CalendarBoard() {
  const { tasks, playSound, settings } = useStore(); 
  const t = translations[settings?.language || 'id']?.calendar || translations['id'].calendar;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State untuk menyimpan data hari yang sedang di-klik
  const [selectedDayTasks, setSelectedDayTasks] = useState<{ date: number, month: number, year: number, tasks: ExtendedTask[] } | null>(null);

  const prevMonth = () => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); playSound('click'); };
  const nextMonth = () => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); playSound('click'); };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;

  const monthNames = t.months;
  const daysInWeek = t.days;

  const calendarGrid = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startDayIndex + 1;
    return (dayNumber > 0 && dayNumber <= daysInMonth) ? dayNumber : null;
  });

  const getTasksForDate = (dayNum: number | null) => {
    if (!dayNum) return [];
    
    // Set jam ke 00:00:00 agar perbandingan tanggal murni angka hari
    const currentCalDate = new Date(year, month, dayNum);
    currentCalDate.setHours(0, 0, 0, 0);

    return tasks.filter((task: ExtendedTask) => {
      // 1. Logika TARGET UTAMA (type: 'todo')
      if (task.type === 'todo' && task.dueDate) {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        return due.getTime() === currentCalDate.getTime();
      }

      // 2. Logika OPERASI HARIAN (type: 'daily')
      if (task.type === 'daily' && task.startDate && task.repeatEvery) {
        const start = new Date(task.startDate);
        start.setHours(0, 0, 0, 0);

        if (currentCalDate < start) return false;

        const diffTime = currentCalDate.getTime() - start.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (task.repeatUnit === 'Hari') {
          return diffDays % task.repeatEvery === 0;
        } else if (task.repeatUnit === 'Minggu') {
          return diffDays % (task.repeatEvery * 7) === 0;
        } else if (task.repeatUnit === 'Bulan') {
          const monthDiff = (currentCalDate.getFullYear() - start.getFullYear()) * 12 + (currentCalDate.getMonth() - start.getMonth());
          return currentCalDate.getDate() === start.getDate() && monthDiff % task.repeatEvery === 0;
        }
      }
      return false;
    });
  };

  const handleDayClick = (dayNum: number | null, dayTasks: ExtendedTask[]) => {
    if (!dayNum) return;
    setSelectedDayTasks({
      date: dayNum,
      month: month,
      year: year,
      tasks: dayTasks
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 shrink-0 border-b border-zinc-700/50 pb-6">
        <div className="flex flex-col gap-3 text-left">
          <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000]">
            <span className="text-emerald-500"><CalIcon size={18} /></span>
            {t.title}
          </h1>
          <p className="font-pixel text-[7px] md:text-[8px] text-zinc-400 uppercase leading-relaxed tracking-widest">
            {t.desc}
          </p>
        </div>

        {/* Navigator Bulan */}
        <div className="flex items-center gap-4 bg-zinc-800 border-2 border-emerald-500 px-4 py-2 shadow-[4px_4px_0_#000] shrink-0 w-full md:w-auto justify-between md:justify-center">
          <button onClick={prevMonth} className="text-emerald-500 hover:text-white transition-colors active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <span className="font-pixel text-[10px] md:text-xs text-emerald-400 w-32 text-center drop-shadow-[1px_1px_0_#000]">
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} className="text-emerald-500 hover:text-white transition-colors active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-zinc-800 border-4 border-zinc-700 p-4 shadow-[8px_8px_0_#000] flex flex-col">
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 shrink-0">
          {daysInWeek.map((day: string, index: number) => (
            <div key={day} className="text-center font-bold text-zinc-500 text-xs py-2 border-b-2 border-zinc-700">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 md:gap-2 flex-1 auto-rows-[minmax(0,1fr)]">
          {calendarGrid.map((dayNum, idx) => {
            const dayTasks = getTasksForDate(dayNum);
            const isToday = dayNum === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const hasTasks = dayTasks.length > 0;

            return (
              <div 
                key={idx} 
                onClick={() => handleDayClick(dayNum, dayTasks)}
                className={`border-2 p-1 md:p-2 relative group transition-colors flex flex-col overflow-hidden ${
                  dayNum 
                    ? `cursor-pointer hover:border-amber-500 hover:bg-zinc-900/80 ${isToday ? 'border-amber-700 bg-zinc-900 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'border-zinc-700 bg-zinc-900'}`
                    : 'border-transparent bg-transparent opacity-30 pointer-events-none'
                }`}
              >
                {/* Header Tanggal & Info Klik */}
                <div className="flex justify-between items-start shrink-0">
                  <span className={`text-xs md:text-sm font-bold ${isToday ? 'text-cyan-400' : hasTasks ? 'text-zinc-200' : 'text-zinc-500'}`}>
                    {dayNum || ''}
                  </span>
                  {dayNum && (
                    <span className="hidden md:inline text-[7px] text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-tighter mt-0.5">
                      {t.detail} {'>'}
                    </span>
                  )}
                </div>

                {/* List Misi Terbatas (Max 2) */}
                <div className="mt-1 flex flex-col gap-1 overflow-hidden pb-1 pointer-events-none">
                  {dayTasks.slice(0, 2).map((task: ExtendedTask) => {
                    const isTodo = task.type === 'todo';
                    const themeColor = isTodo ? 'pink' : 'cyan';
                    const Icon = isTodo ? (task.isBoss ? Flame : CalIcon) : Swords;

                    return (
                      <div 
                        key={task.id} 
                        className={`p-0.5 md:p-1 flex items-center justify-center md:justify-start gap-1.5 overflow-hidden border ${
                          task.done 
                            ? 'bg-emerald-900/30 border-emerald-800/50' 
                            : `bg-zinc-800 border-zinc-600 md:border-l-2 md:border-l-${themeColor}-500`
                        }`}
                      >
                        <Icon size={10} className={task.done ? 'text-emerald-500 shrink-0' : `text-${themeColor}-400 shrink-0`} />
                        <span className={`hidden md:inline text-[9px] truncate tracking-wide ${
                          task.done ? 'text-emerald-500/70 line-through' : 'text-zinc-300'
                        }`}>
                          {task.title}
                        </span>
                      </div>
                    );
                  })}

                  {/* Indikator Jika Lebih dari 2 */}
                  {dayTasks.length > 2 && (
                    <div className="text-[7px] md:text-[8px] font-bold text-zinc-400 text-center mt-0.5 bg-zinc-900 border border-zinc-700 py-0.5">
                      +{dayTasks.length - 2} <span className="hidden md:inline">{t.others}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL / POP-UP DETAIL HARI */}
      {selectedDayTasks && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedDayTasks(null)}>
          <div className="w-full max-w-md bg-zinc-900 border-4 border-zinc-600 flex flex-col shadow-[8px_8px_0_#000] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            
            {/* Header Pop-up */}
            <div className="bg-zinc-800 border-b-4 border-zinc-600 p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[10px] text-white tracking-widest uppercase flex items-center gap-2">
                <CalIcon size={14} className="text-cyan-400" />
                {selectedDayTasks.date} {monthNames[selectedDayTasks.month]} {selectedDayTasks.year}
              </h3>
              <button onClick={() => setSelectedDayTasks(null)} className="text-zinc-400 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            {/* List Misi */}
            <div className="p-5 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {selectedDayTasks.tasks.length > 0 ? (
                selectedDayTasks.tasks.map((task: ExtendedTask) => {
                  const isTodo = task.type === 'todo';
                  return (
                    <div key={task.id} className={`p-3 border-2 flex items-center justify-between transition-colors ${task.done ? 'bg-emerald-950/40 border-emerald-800/50' : 'bg-zinc-800 border-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        {task.done ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <CircleDashed size={18} className="text-zinc-500 shrink-0" />}
                        <div className="flex flex-col overflow-hidden">
                          <span className={`text-sm font-bold truncate ${task.done ? 'text-emerald-500/70 line-through' : 'text-zinc-200'}`}>
                            {task.title}
                          </span>
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${isTodo ? 'text-pink-400' : 'text-cyan-400'}`}>
                            {isTodo ? t.todo : t.daily}
                          </span>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="shrink-0 ml-2">
                        {task.done ? (
                          <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 border border-emerald-500/50">{t.done}</span>
                        ) : (
                          <span className="text-[9px] font-bold bg-amber-500/20 text-amber-400 px-2 py-1 border border-amber-500/50">{t.pending}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-zinc-500 gap-2">
                  <Swords size={32} className="opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-wider">{t.empty}</p>
                  <p className="text-[10px] text-center">{t.emptyDesc}</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}