"use client";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from "@/store/useStore";
import {
  User,
  Mail,
  Edit3,
  Key,
  RefreshCw,
  Trash2,
  Globe,
  Calendar,
  Clock,
  Music,
  ShieldAlert,
  Swords,
  Smartphone,
  Settings,
  ChevronRight,
  MonitorPlay,
  X,
  MessageSquare,
  Info,
  Users,
  Github,
  Instagram,
  AlertTriangle,
  CheckCircle // Ikon baru untuk modal sukses
} from "lucide-react";
import { translations } from "@/utils/translations";

export default function SettingsBoard() {
  const { userProfile, setUserProfile, settings, updateSetting, playSound, showAlert } = useStore();
  const t = translations[settings?.language || 'id']?.settings || translations['id'].settings;
  const tUi = translations[settings?.language || 'id']?.ui || translations['id'].ui;
  const { data: session } = useSession();
  const router = useRouter();

  const [editModal, setEditModal] = useState<{isOpen: boolean, field: 'accountName' | 'nickname' | 'bio', title: string, value: string}>({ isOpen: false, field: 'accountName', title: '', value: '' });
  const [infoModal, setInfoModal] = useState<{isOpen: boolean, type: 'social' | 'team'}>({ isOpen: false, type: 'team' });
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE UNTUK MODAL KONFIRMASI DANGER ---
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'reset' | 'delete' | null;
    title: string;
    message: string;
    actionText: string;
    isDangerAction: boolean; 
  }>({ isOpen: false, type: null, title: '', message: '', actionText: '', isDangerAction: false });

  // --- STATE UNTUK MODAL SUKSES ---
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    type: 'reset' | 'delete' | null;
    title: string;
    message: string;
  }>({ isOpen: false, type: null, title: '', message: '' });

  // --- TRIGGER MODAL KONFIRMASI ---
  const triggerResetConfirm = () => {
    playSound('error');
    setConfirmModal({
      isOpen: true,
      type: 'reset',
      title: 'RESET AKUN?',
      message: 'PERINGATAN! Semua progres, gold, level, dan misimu akan kembali ke 0. Data akun (email & password) tetap aman. Lanjutkan?',
      actionText: 'YA, RESET PROGRES',
      isDangerAction: false 
    });
  };

  const triggerDeleteConfirm = () => {
    playSound('error');
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      title: 'HAPUS PERMANEN?',
      message: 'DANGER ZONE! Akunmu akan dihapus permanen dari database. Tindakan ini tidak bisa dibatalkan! Lanjutkan?',
      actionText: 'MUSNAHKAN AKUN',
      isDangerAction: true 
    });
  };

  // --- FUNGSI EKSEKUSI KE BACKEND ---
  const executeDangerAction = async () => {
    if (!confirmModal.type) return;
    
    setIsLoading(true);
    const userEmail = session?.user?.email || userProfile?.accountName; 
    const endpoint = confirmModal.type === 'reset' ? '/api/user/reset' : '/api/user/delete';

    try {
      const response = await fetch(endpoint, {
        method: confirmModal.type === 'reset' ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        playSound('success');
        // Tampilkan Modal Sukses sebagai pengganti alert bawaan
        if (confirmModal.type === 'reset') {
          setSuccessModal({
            isOpen: true,
            type: 'reset',
            title: 'RESET BERHASIL',
            message: 'Progres akunmu telah dikosongkan. Siap untuk memulai petualangan baru?',
          });
        } else {
          setSuccessModal({
            isOpen: true,
            type: 'delete',
            title: 'AKUN MUSNAH',
            message: 'Seluruh jejakmu di dimensi ini telah dihapus. Sampai jumpa lagi, Pahlawan!',
          });
        }
      } else {
        alert(`Gagal memproses permintaan (${response.status})`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setIsLoading(false);
      setConfirmModal({ ...confirmModal, isOpen: false });
    }
  };

  // --- FUNGSI TUTUP MODAL SUKSES & REDIRECT ---
  const handleSuccessClose = () => {
    if (successModal.type === 'reset') {
      window.location.reload(); 
    } else if (successModal.type === 'delete') {
      setUserProfile({ accountName: "", nickname: "", gender: null, avatarId: null });
      router.push('/login');
    }
    setSuccessModal({ ...successModal, isOpen: false });
  };


  // Komponen Baris Tombol Aksi (Untuk Ubah Nama, dll)
  const SettingAction = ({ label, value, actionText, onClick, danger = false, disabled = false, icon: Icon }: any) => (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#24283b] border-2 border-slate-700 transition-colors group gap-3 sm:gap-0 ${disabled ? 'opacity-50 pointer-events-none' : 'hover:border-amber-500'}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#1a1b26] border border-slate-600 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors">
          {Icon && <Icon size={16} />}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-slate-200">{label}</span>
          {value && <span className="text-xs text-slate-500 font-mono">{value}</span>}
        </div>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all shadow-[2px_2px_0_#000] flex items-center justify-center gap-2 ${
          danger
            ? "bg-pink-500/10 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white active:translate-y-[2px] active:shadow-none"
            : "bg-slate-900 border-slate-600 text-amber-400 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-900 active:translate-y-[2px] active:shadow-none"
        }`}
      >
        {actionText} <ChevronRight size={14} />
      </button>
    </div>
  );

  // Komponen Baris Dropdown (Select)
  const SettingSelect = ({ label, value, options, onChange, icon: Icon }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#24283b] border-2 border-slate-700 hover:border-amber-500 transition-colors group gap-3 sm:gap-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#1a1b26] border border-slate-600 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors">
          {Icon && <Icon size={16} />}
        </div>
        <span className="text-sm font-bold text-slate-200">{label}</span>
      </div>
      <select
        value={value}
        onChange={(e) => { onChange(e.target.value); playSound('click'); }}
        className="bg-slate-900 border-2 border-slate-600 text-amber-400 text-xs font-bold uppercase tracking-widest p-2 outline-none focus:border-amber-400 cursor-pointer shadow-[2px_2px_0_#000] min-w-[150px]"
      >
        {options.map((opt: any) => <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">{opt.label}</option>)}
      </select>
    </div>
  );

  // Komponen Baris Toggle (Switch)
  const SettingToggle = ({ label, checked, onChange, icon: Icon, description }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#24283b] border-2 border-slate-700 hover:border-amber-500 transition-colors group gap-3 sm:gap-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#1a1b26] border border-slate-600 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors">
          {Icon && <Icon size={16} />}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-slate-200">{label}</span>
          {description && <span className="text-xs text-slate-500 font-mono">{description}</span>}
        </div>
      </div>
      <button onClick={() => { onChange(!checked); playSound('click'); }} className={`relative w-14 h-7 border-2 transition-colors flex items-center shrink-0 shadow-[2px_2px_0_#000] ${checked ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-900 border-slate-600'}`}>
        <div className={`absolute left-1 w-4 h-4 transition-transform duration-200 ${checked ? 'translate-x-7 bg-emerald-400' : 'translate-x-0 bg-slate-500'}`} />
      </button>
    </div>
  );

  const handleEditClick = (field: 'accountName' | 'nickname' | 'bio', title: string) => {
    setEditModal({ isOpen: true, field, title, value: userProfile[field] || '' });
    playSound('click');
  };

  const handleSaveEdit = () => {
    if (editModal.value.trim() !== "") {
      setUserProfile({ [editModal.field]: editModal.value.trim() });
      playSound('success');
      setEditModal({ ...editModal, isOpen: false });
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      {/* HEADER */}
      <div className="flex flex-col gap-3 text-left border-b border-slate-700/50 pb-6">
        <h1 className="font-pixel text-sm md:text-base text-white flex items-center gap-3 drop-shadow-[2px_2px_0_#000]">
          <span className="text-amber-500">
            <Settings size={18} />
          </span>
          {t.title}
        </h1>
        <p className="font-pixel text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* SECTION: AKUN */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <User size={14} /> {t.profSec}
        </h2>
        <div className="flex flex-col gap-2">
          <SettingAction icon={User} label={t.username} value={userProfile?.accountName || "DoremiFa"} actionText={t.change} onClick={() => handleEditClick('accountName', t.username)} />
          <SettingAction icon={Mail} label={t.email} value={session?.user?.email || "Email tidak ditemukan"} actionText={t.change} onClick={() => { showAlert("LOCKED", t.alertEmail, "info"); playSound('error'); }} />
          <SettingAction icon={Edit3} label={t.displayName} value={userProfile?.nickname || "Tuyul BisVy"} actionText={t.change} onClick={() => handleEditClick('nickname', t.displayName)} />
          <SettingAction icon={MessageSquare} label={t.aboutMe} value={userProfile?.bio ? `"${userProfile.bio.substring(0, 30)}${userProfile.bio.length > 30 ? '...' : ''}"` : "-"} actionText={t.change} onClick={() => handleEditClick('bio', t.aboutMe)} />
          <SettingAction icon={Key} label={t.password} value="********" actionText={t.change} onClick={() => { showAlert("SECURITY", t.alertPass, "info"); playSound('error'); }} />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <SettingAction icon={RefreshCw} label={t.resetAcc} value={t.resetDesc} actionText={isLoading ? "PROSES..." : "RESET"} onClick={triggerResetConfirm} danger disabled={isLoading} />
          <SettingAction icon={Trash2} label={t.delAcc} value={t.delDesc} actionText={isLoading ? "PROSES..." : "HAPUS"} onClick={triggerDeleteConfirm} danger disabled={isLoading} />
        </div>
      </section>

      {/* SECTION: METODE MASUK AKUN */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <Smartphone size={14} /> {t.loginMethod}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#24283b] border-2 border-slate-700 p-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200">Apple</span>
            <button className="text-[10px] font-bold uppercase border-2 border-slate-600 px-3 py-1.5 text-slate-400 hover:text-white hover:border-white transition-colors">
              Connect
            </button>
          </div>
          <div className="bg-[#24283b] border-2 border-emerald-500/50 p-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full" />
            <span className="text-sm font-bold text-emerald-400">Google</span>
            <span className="text-[10px] font-bold uppercase bg-emerald-500 text-slate-900 px-3 py-1.5 shadow-[2px_2px_0_#000]">
              Connected
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: SITUS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <MonitorPlay size={14} /> {t.sitePref}
        </h2>
        <div className="flex flex-col gap-2">
          <SettingSelect icon={Globe} label={t.sysLang} value={settings.language} onChange={(val: string) => updateSetting('language', val)} options={[{label: 'Bahasa Indonesia', value: 'id'}, {label: 'English (US)', value: 'en'}]} />
          <SettingSelect icon={Calendar} label={t.dateFmt} value={settings.dateFormat} onChange={(val: string) => updateSetting('dateFormat', val)} options={[{label: 'DD/MM/YYYY', value: 'DD/MM/YYYY'}, {label: 'MM/DD/YYYY', value: 'MM/DD/YYYY'}, {label: 'YYYY-MM-DD', value: 'YYYY-MM-DD'}]} />
          <SettingSelect icon={Clock} label={t.startDay} value={settings.startOfDay} onChange={(val: string) => updateSetting('startOfDay', val)} options={[{label: 'Default (00:00)', value: '00:00'}, {label: 'Subuh (04:00)', value: '04:00'}, {label: 'Pagi (06:00)', value: '06:00'}]} />
          <SettingSelect icon={Music} label={t.audioTheme} value={settings.audioTheme} onChange={(val: string) => updateSetting('audioTheme', val)} options={[{label: 'Retro Arcade', value: 'retro'}, {label: 'Mute (Hening)', value: 'mute'}]} />
          <SettingToggle icon={ShieldAlert} label={t.holiday} description={t.holidayDesc} checked={settings.holidayMode} onChange={(val: boolean) => { updateSetting('holidayMode', val); if(val) showAlert("HOLIDAY MODE ON", t.holidayDesc, "info"); }} />
        </div>
      </section>

      {/* SECTION: KARAKTER */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <Swords size={14} /> {t.char}
        </h2>
        <div className="flex flex-col gap-2">
          <SettingAction icon={User} label={t.setStats} value={t.resetStats} actionText={t.reset} onClick={() => { showAlert("RESET STATUS", t.alertStats, "warning"); playSound('error'); }} />
        </div>
      </section>

      {/* SECTION BARU: TENTANG LIFEQUEST */}
      <section className="flex flex-col gap-3 mt-4 pt-8 border-t-2 border-slate-700/50">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <Info size={14} /> Tentang Daily Dungeon
        </h2>
        <div className="flex flex-col gap-2">
          <SettingAction icon={Globe} label="Sosial" value="Instagram & GitHub" actionText="Lihat" onClick={() => { setInfoModal({ isOpen: true, type: 'social' }); playSound('click'); }} />
          <SettingAction icon={Users} label="Tim Developer" value="Kenali pembuat di balik layar" actionText="Lihat" onClick={() => { setInfoModal({ isOpen: true, type: 'team' }); playSound('click'); }} />
        </div>
      </section>

      {/* EDIT MODAL */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-[#1a1b26] border-4 border-amber-500 shadow-[8px_8px_0_#000] flex flex-col animate-in zoom-in duration-200">
            <div className="bg-[#24283b] border-b-4 border-amber-500 p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">{t.change} {editModal.title}</h3>
              <button onClick={() => setEditModal({...editModal, isOpen: false})} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6">
              {editModal.field === 'bio' ? (
                <textarea value={editModal.value} onChange={e => setEditModal({...editModal, value: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-600 p-3 text-white outline-none focus:border-amber-400 min-h-[100px] resize-none" placeholder="Tuliskan tentang dirimu..." autoFocus />
              ) : (
                <input type="text" value={editModal.value} onChange={e => setEditModal({...editModal, value: e.target.value})} className="w-full bg-slate-900 border-2 border-slate-600 p-3 text-white outline-none focus:border-amber-400" autoFocus />
              )}
            </div>
            <div className="p-4 border-t-2 border-slate-700 bg-[#24283b] flex justify-end gap-3">
              <button onClick={() => setEditModal({...editModal, isOpen: false})} className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase">{tUi.cancel}</button>
              <button onClick={handleSaveEdit} className="px-6 py-2 bg-amber-500 text-amber-950 text-xs font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none hover:bg-amber-400">{t.save}</button>
            </div>
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      {infoModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          {/* ... (Konten modal info tidak diubah, persis seperti sebelumnya) ... */}
          <div className="w-full max-w-md bg-[#1a1b26] border-4 border-amber-500 shadow-[8px_8px_0_#000] flex flex-col animate-in zoom-in duration-200">
            <div className="bg-[#24283b] border-b-4 border-amber-500 p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest flex items-center gap-2">
                {infoModal.type === 'team' ? <><Users size={14} /> Tim Developer</> : <><Globe size={14} /> Sosial</>}
              </h3>
              <button onClick={() => setInfoModal({ ...infoModal, isOpen: false })} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            
            <div className="p-6 text-slate-300">
              {infoModal.type === 'team' ? (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-slate-400 mb-2 text-center uppercase tracking-widest">Tim Di Balik Daily Dungeon</p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <a href="https://instagram.com/renhapiz" target="_blank" rel="noreferrer" className="bg-[#24283b] border-2 border-slate-700 p-3 text-center shadow-[4px_4px_0_#0f172a] hover:border-emerald-500 hover:-translate-y-1 transition-all active:translate-y-[2px] active:shadow-none block group">
                      <p className="font-bold text-emerald-400 text-sm group-hover:text-emerald-300">Faren Hafiza Afanda</p>
                      <p className="text-[8px] text-slate-500 font-pixel uppercase mt-2">@renhapiz</p>
                    </a>
                    <a href="https://instagram.com/wldnxd" target="_blank" rel="noreferrer" className="bg-[#24283b] border-2 border-slate-700 p-3 text-center shadow-[4px_4px_0_#0f172a] hover:border-cyan-500 hover:-translate-y-1 transition-all active:translate-y-[2px] active:shadow-none block group">
                      <p className="font-bold text-cyan-400 text-sm group-hover:text-cyan-300">Wildan Ramadhani Akbar</p>
                      <p className="text-[8px] text-slate-500 font-pixel uppercase mt-2">@wldnxd</p>
                    </a>
                    <a href="https://www.instagram.com/rappizr" target="_blank" rel="noreferrer" className="bg-[#24283b] border-2 border-slate-700 p-3 text-center shadow-[4px_4px_0_#0f172a] hover:border-pink-500 hover:-translate-y-1 transition-all active:translate-y-[2px] active:shadow-none block group">
                      <p className="font-bold text-pink-400 text-sm group-hover:text-pink-300">Mukhammad Raffi Zabra</p>
                      <p className="text-[8px] text-slate-500 font-pixel uppercase mt-2">@rappizr</p>
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 text-center italic border-t border-slate-700 pt-4">Dikembangkan untuk FICPACT CUP 2026</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-slate-400 mb-2 text-center uppercase tracking-widest">Ikuti Petualangan Kami</p>
                  
                  <a href="https://www.instagram.com/renhapiz" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#24283b] border-2 border-pink-600 hover:bg-pink-600/20 transition-colors p-4 shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none group">
                    <div className="p-2 bg-pink-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <Instagram className="text-pink-500" size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm tracking-wide">Instagram</span>
                      <span className="text-[10px] text-slate-400">@renhapiz</span>
                    </div>
                  </a>

                  <a href="https://github.com/renka01/life-quest-fictpact-cup2026" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#24283b] border-2 border-slate-500 hover:bg-slate-500/20 transition-colors p-4 shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none group">
                    <div className="p-2 bg-slate-500/10 rounded-full group-hover:scale-110 transition-transform">
                      <Github className="text-slate-300" size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm tracking-wide">GitHub Repository</span>
                      <span className="text-[10px] text-slate-400">Bjorbun Team</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t-2 border-slate-700 bg-[#24283b] flex justify-center">
              <button onClick={() => setInfoModal({ ...infoModal, isOpen: false })} className="px-8 py-2 bg-slate-700 text-white text-xs font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none hover:bg-slate-600 transition-colors">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL KONFIRMASI DANGER --- */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex justify-center items-center p-4">
          <div className={`w-full max-w-sm bg-[#1a1b26] border-4 ${confirmModal.isDangerAction ? 'border-red-500' : 'border-orange-500'} shadow-[8px_8px_0_#000] flex flex-col animate-in zoom-in-95 duration-200`}>
            
            {/* Header Modal */}
            <div className={`bg-[#24283b] border-b-4 ${confirmModal.isDangerAction ? 'border-red-500' : 'border-orange-500'} p-4 flex justify-between items-center`}>
              <h3 className={`font-pixel text-[10px] ${confirmModal.isDangerAction ? 'text-red-500' : 'text-orange-500'} uppercase tracking-widest flex items-center gap-2`}>
                <AlertTriangle size={16} /> {confirmModal.title}
              </h3>
              <button 
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} 
                disabled={isLoading}
                className="text-slate-400 hover:text-white disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Body Text */}
            <div className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 border-2 flex items-center justify-center animate-pulse ${
                confirmModal.isDangerAction 
                  ? 'bg-red-500/10 border-red-500 text-red-500' 
                  : 'bg-orange-500/10 border-orange-500 text-orange-500'
              }`}>
                {confirmModal.isDangerAction ? <Trash2 size={32} /> : <RefreshCw size={32} />}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {confirmModal.message}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="p-4 border-t-2 border-slate-700 bg-[#24283b] flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} 
                disabled={isLoading}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white uppercase transition-colors disabled:opacity-50 w-full sm:w-auto"
              >
                BATAL
              </button>
              <button 
                onClick={executeDangerAction} 
                disabled={isLoading}
                className={`px-6 py-2 text-xs font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all w-full sm:w-auto ${
                  confirmModal.isDangerAction
                    ? 'bg-red-500 text-white hover:bg-red-400'
                    : 'bg-orange-500 text-orange-950 hover:bg-orange-400'
                } disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    MEMPROSES...
                  </>
                ) : (
                  confirmModal.actionText
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- MODAL SUKSES (BARU) --- */}
      {successModal.isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex justify-center items-center p-4">
          <div className="w-full max-w-sm bg-[#1a1b26] border-4 border-emerald-500 shadow-[8px_8px_0_#000] flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Header Modal */}
            <div className="bg-[#24283b] border-b-4 border-emerald-500 p-4 flex justify-between items-center">
              <h3 className="font-pixel text-[10px] text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle size={16} /> {successModal.title}
              </h3>
            </div>
            
            {/* Body Text */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 flex items-center justify-center bg-emerald-500/10 border-emerald-500 text-emerald-500 animate-bounce">
                <CheckCircle size={32} />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-bold">
                {successModal.message}
              </p>
            </div>
            
            {/* Action Button */}
            <div className="p-4 border-t-2 border-slate-700 bg-[#24283b] flex justify-center">
              <button 
                onClick={handleSuccessClose} 
                className="px-8 py-2 text-xs font-bold uppercase shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all w-full bg-emerald-500 text-slate-900 hover:bg-emerald-400"
              >
                LANJUTKAN
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}