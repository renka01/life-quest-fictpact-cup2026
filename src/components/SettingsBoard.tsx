"use client";
import { useState } from 'react';
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
  MessageSquare
} from "lucide-react";
import { translations } from "@/utils/translations";

export default function SettingsBoard() {
  const { userProfile, setUserProfile, settings, updateSetting, playSound, showAlert } = useStore();
  const t = translations[settings?.language || 'id']?.settings || translations['id'].settings;
  const tUi = translations[settings?.language || 'id']?.ui || translations['id'].ui;

  const [editModal, setEditModal] = useState<{isOpen: boolean, field: 'accountName' | 'nickname' | 'bio', title: string, value: string}>({ isOpen: false, field: 'accountName', title: '', value: '' });

  // Komponen Baris Tombol Aksi (Untuk Ubah Nama, dll)
  const SettingAction = ({
    label,
    value,
    actionText,
    onClick,
    danger = false,
    icon: Icon,
  }: any) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#24283b] border-2 border-slate-700 hover:border-amber-500 transition-colors group gap-3 sm:gap-0">
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
        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all shadow-[2px_2px_0_#000] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 ${
          danger
            ? "bg-pink-500/10 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
            : "bg-slate-900 border-slate-600 text-amber-400 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-900"
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
          <SettingAction
            icon={User}
            label={t.username}
            value={userProfile?.accountName || "DoremiFa"}
            actionText={t.change}
            onClick={() => handleEditClick('accountName', t.username)}
          />
          <SettingAction
            icon={Mail}
            label={t.email}
            value="tuyulbisvy1@gmail.com"
            actionText={t.change}
            onClick={() => { showAlert("LOCKED", t.alertEmail, "info"); playSound('error'); }}
          />
          <SettingAction
            icon={Edit3}
            label={t.displayName}
            value={userProfile?.nickname || "Tuyul BisVy"}
            actionText={t.change}
            onClick={() => handleEditClick('nickname', t.displayName)}
          />
          <SettingAction
            icon={MessageSquare}
            label={t.aboutMe}
            value={userProfile?.bio ? `"${userProfile.bio.substring(0, 30)}${userProfile.bio.length > 30 ? '...' : ''}"` : "-"}
            actionText={t.change}
            onClick={() => handleEditClick('bio', t.aboutMe)}
          />
          <SettingAction icon={Key} label={t.password} value="********" actionText={t.change} onClick={() => { showAlert("SECURITY", t.alertPass, "info"); playSound('error'); }} />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <SettingAction
            icon={RefreshCw}
            label={t.resetAcc}
            value={t.resetDesc}
            actionText={t.learn}
            onClick={() => { showAlert("DANGER", t.alertReset, "warning"); playSound('error'); }}
            danger
          />
          <SettingAction
            icon={Trash2}
            label={t.delAcc}
            value={t.delDesc}
            actionText={t.learn}
            onClick={() => { showAlert("DANGER", t.alertDel, "warning"); playSound('error'); }}
            danger
          />
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
          <SettingSelect 
            icon={Globe} label={t.sysLang} value={settings.language} 
            onChange={(val: string) => updateSetting('language', val)}
            options={[{label: 'Bahasa Indonesia', value: 'id'}, {label: 'English (US)', value: 'en'}]} 
          />
          <SettingSelect 
            icon={Calendar} label={t.dateFmt} value={settings.dateFormat} 
            onChange={(val: string) => updateSetting('dateFormat', val)}
            options={[{label: 'DD/MM/YYYY', value: 'DD/MM/YYYY'}, {label: 'MM/DD/YYYY', value: 'MM/DD/YYYY'}, {label: 'YYYY-MM-DD', value: 'YYYY-MM-DD'}]} 
          />
          <SettingSelect 
            icon={Clock} label={t.startDay} value={settings.startOfDay} 
            onChange={(val: string) => updateSetting('startOfDay', val)}
            options={[{label: 'Default (00:00)', value: '00:00'}, {label: 'Subuh (04:00)', value: '04:00'}, {label: 'Pagi (06:00)', value: '06:00'}]} 
          />
          <SettingSelect 
            icon={Music} label={t.audioTheme} value={settings.audioTheme} 
            onChange={(val: string) => updateSetting('audioTheme', val)}
            options={[{label: 'Retro Arcade', value: 'retro'}, {label: 'Mute (Hening)', value: 'mute'}]} 
          />
          <SettingToggle
            icon={ShieldAlert}
            label={t.holiday}
            description={t.holidayDesc}
            checked={settings.holidayMode}
            onChange={(val: boolean) => { 
              updateSetting('holidayMode', val); 
              if(val) showAlert("HOLIDAY MODE ON", t.holidayDesc, "info"); 
            }}
          />
        </div>
      </section>

      {/* SECTION: KARAKTER */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2">
          <Swords size={14} /> {t.char}
        </h2>
        <div className="flex flex-col gap-2">
          <SettingAction 
            icon={User} label={t.setStats} value={t.resetStats} actionText={t.reset} 
            onClick={() => { showAlert("RESET STATUS", t.alertStats, "warning"); playSound('error'); }} 
          />
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
    </div>
  );
}