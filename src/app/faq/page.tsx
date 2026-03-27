"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, ArrowLeft, BookOpen, Swords, ShieldAlert, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

// ═══════════════════════════════════════════════════════════
// PIXEL ART REUSABLES
// ═══════════════════════════════════════════════════════════
const FloatingCoin = ({ x, y, delay }: { x: number | string; y: number | string; delay: number }) => (
  <div style={{
    position: 'absolute', left: x, top: y,
    animation: `float ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
    opacity: 0.5, pointerEvents: 'none',
  }}>
    <svg viewBox="0 0 12 12" width="24" height="24" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="1" width="4" height="1" fill="#f59e0b"/>
      <rect x="3" y="2" width="6" height="8" fill="#fbbf24"/>
      <rect x="2" y="3" width="8" height="6" fill="#fcd34d"/>
      <rect x="5" y="3" width="2" height="6" fill="#f59e0b" opacity="0.4"/>
      <rect x="4" y="10" width="4" height="1" fill="#d97706"/>
    </svg>
  </div>
);

const GrandSpartanLandscape = () => (
  <svg viewBox="0 0 800 150" width="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block', height: '180px' }}>
    <path d="M0,150 L0,80 L80,50 L150,90 L250,40 L380,100 L500,60 L650,110 L800,30 L800,150 Z" fill="#27272a" opacity="0.5"/>
    <path d="M0,150 L0,100 L120,60 L280,110 L450,70 L600,100 L800,60 L800,150 Z" fill="#3f3f46" opacity="0.3"/>
    <rect x="30" y="130" width="240" height="5" fill="#78350f" />
    <rect x="40" y="125" width="220" height="5" fill="#92400e" />
    <rect x="50" y="120" width="200" height="5" fill="#b45309" />
    {[...Array(7)].map((_, i) => (
      <g key={`col-${i}`}>
        <rect x={60 + i * 30} y="60" width="10" height="60" fill="#fcd34d" />
        <rect x={66 + i * 30} y="60" width="4" height="60" fill="#f59e0b" />
      </g>
    ))}
    <rect x="45" y="50" width="210" height="10" fill="#f59e0b" />
    <polygon points="40,50 150,15 260,50" fill="#991b1b" />
    <polygon points="40,50 150,15 150,50" fill="#b91c1c" opacity="0.6"/>
    <rect x="500" y="75" width="260" height="60" fill="#92400e" />
    <rect x="520" y="55" width="220" height="20" fill="#78350f" />
    <rect x="500" y="75" width="260" height="4" fill="#f59e0b" />
    {[...Array(6)].map((_, i) => (
      <path key={`arch1-${i}`} d={`M${520 + i*40},135 L${520 + i*40},100 A10,10 0 0,1 ${540 + i*40},100 L${540 + i*40},135 Z`} fill="#18181b" />
    ))}
    {[...Array(5)].map((_, i) => (
      <path key={`arch2-${i}`} d={`M${540 + i*40},75 L${540 + i*40},62 A8,8 0 0,1 ${556 + i*40},62 L${556 + i*40},75 Z`} fill="#18181b" />
    ))}
    <rect x="510" y="75" width="8" height="35" fill="#dc2626" />
    <polygon points="510,110 514,118 518,110" fill="#dc2626" />
    <rect x="740" y="75" width="8" height="35" fill="#dc2626" />
    <polygon points="740,110 744,118 748,110" fill="#dc2626" />
    <rect x="350" y="95" width="16" height="40" fill="#d97706" />
    <rect x="345" y="130" width="26" height="5" fill="#92400e" />
    <polygon points="350,95 366,95 366,85" fill="#d97706" />
    <rect x="420" y="115" width="14" height="20" fill="#b45309" />
    <rect x="415" y="130" width="24" height="5" fill="#78350f" />
    <rect x="380" y="125" width="3" height="10" fill="#fcd34d" transform="rotate(15 380 125)"/>
    <rect x="0" y="135" width="800" height="15" fill="#18181b" />
  </svg>
);

// ═══════════════════════════════════════════════════════════
// MODAL & KONTEN KEBIJAKAN PRIVASI / SYARAT
// ═══════════════════════════════════════════════════════════
const PrivacyContent = ({ lang = 'id' }: { lang?: string }) => (
  lang === 'id' ? (
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
  ) : (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>Last updated: March 26, 2026</p>
      <p>The Daily Dungeon application ("we") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our application.</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Information We Collect</h3>
      <p>We only collect essential information for the app's functionality, namely: your email address for account authentication purposes. We do not collect other sensitive personal data.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. Use of Information</h3>
      <p>Your email address is strictly used to: create and manage your account, reset passwords, and other authentication processes. We will never send promotional emails or share your email with third parties.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Data Security</h3>
      <p>We use industry-standard security measures to protect your data from unauthorized access. Your passwords are hashed and cannot be seen by us.</p>
    </div>
  )
);

const TermsContent = ({ lang = 'id' }: { lang?: string }) => (
  lang === 'id' ? (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>Dengan menggunakan aplikasi Daily Dungeon, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut:</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Penggunaan Akun</h3>
      <p>Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda. Jaga kerahasiaan kata sandi Anda dan jangan bagikan dengan siapa pun.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. Perilaku Pengguna</h3>
      <p>Anda setuju untuk tidak menggunakan aplikasi ini untuk tujuan ilegal atau yang dilarang. Dilarang keras melakukan pelecehan, spam, atau mencoba merusak integritas sistem kami.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Pembatasan Tanggung Jawab</h3>
      <p>Aplikasi ini disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas kehilangan data atau kerusakan lain yang mungkin timbul dari penggunaan aplikasi ini.</p>
    </div>
  ) : (
    <div className="space-y-4 text-zinc-300 text-sm">
      <p>By using the Daily Dungeon application, you agree to be bound by the following Terms and Conditions:</p>
      <h3 className="font-bold text-amber-400 pt-2">1. Account Usage</h3>
      <p>You are fully responsible for all activities that occur under your account. Keep your password confidential and do not share it with anyone.</p>
      <h3 className="font-bold text-amber-400 pt-2">2. User Conduct</h3>
      <p>You agree not to use this application for illegal or prohibited purposes. Harassment, spamming, or attempting to compromise the integrity of our system is strictly prohibited.</p>
      <h3 className="font-bold text-amber-400 pt-2">3. Limitation of Liability</h3>
      <p>This application is provided "as is". We are not responsible for data loss or other damages that may arise from the use of this application.</p>
    </div>
  )
);

const PolicyModal = ({ isOpen, onClose, title, children, lang = 'id' }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; lang?: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[10000] animate-in fade-in-50" onClick={onClose}>
      <div 
        className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-zinc-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-amber-400">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 border-t border-zinc-700 flex-shrink-0 text-right">
          <button 
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 px-6 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </footer>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// KOMPONEN ACCORDION FAQ
// ═══════════════════════════════════════════════════════════
const FaqItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-zinc-800 bg-zinc-900/60 rounded-2xl mb-4 overflow-hidden transition-all duration-300 hover:border-amber-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 md:p-6 text-left flex justify-between items-center text-white font-bold hover:bg-zinc-800/50 transition-colors"
      >
        <span className="pr-4 leading-relaxed text-base md:text-lg">{question}</span>
        <span className="text-amber-500 flex-shrink-0 bg-amber-500/10 p-2 rounded-xl">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="p-5 md:p-6 pt-0 text-zinc-300 text-sm md:text-base leading-relaxed mt-1 border-t border-zinc-800/80 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// MAIN FAQ PAGE
// ═══════════════════════════════════════════════════════════
export default function FaqPage() {
  const router = useRouter();
  const { settings, updateSetting } = useStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  
  React.useEffect(() => setIsMounted(true), []);

  const lang = settings?.language || 'id';
  const t = {
    title: lang === 'id' ? 'Pusat Pengetahuan' : 'Knowledge Center',
    desc: lang === 'id' ? 'Pelajari semua mekanisme bertahan hidup, strategi berpetualang, dan cara memaksimalkan potensimu di Daily Dungeon.' : 'Learn all survival mechanics, adventuring strategies, and how to maximize your potential in Daily Dungeon.',
    f1Title: lang === 'id' ? '1. Buat Misi' : '1. Create Quests',
    f1Desc: lang === 'id' ? 'Pindahkan tugas, jadwal, dan target dunia nyatamu ke dalam sistem Log Misi kami.' : 'Move your real-world tasks, schedules, and goals into our Quest Log system.',
    f2Title: lang === 'id' ? '2. Mulai Grinding' : '2. Start Grinding',
    f2Desc: lang === 'id' ? 'Kerjakan misi untuk mendapatkan EXP dan Gold, gunakan Focus Arena untuk membunuh Boss.' : 'Complete quests to earn EXP and Gold, use Focus Arena to slay Bosses.',
    f3Title: lang === 'id' ? '3. Bertahan Hidup' : '3. Survive',
    f3Desc: lang === 'id' ? 'Setiap kemalasan ada harganya. Misi yang tidak selesai akan menyerap HP karaktermu setiap malam.' : 'Every laziness has a price. Uncompleted quests will drain your character\'s HP every night.',
    faqTitle: lang === 'id' ? 'Pertanyaan Umum (FAQ)' : 'Frequently Asked Questions (FAQ)',
    privacyTitle: lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy',
    termsTitle: lang === 'id' ? 'Syarat dan Ketentuan' : 'Terms and Conditions',
    rights: lang === 'id' ? '© 2026 Daily Dungeon. Hak Cipta Dilindungi.' : '© 2026 Daily Dungeon. All rights reserved.'
  };

  const faqs = lang === 'id' ? [
    { q: "Apa itu Daily Dungeon?", a: "Daily Dungeon adalah aplikasi produktivitas (To-Do List & Habit Tracker) yang mengubah kewajiban dunia nyatamu menjadi petualangan RPG epik. Dengan menyelesaikan tugas, kamu akan mendapatkan EXP dan Gold untuk memperkuat karaktermu." },
    { q: "Apa bedanya Siklus Misi (Habit), Operasi Harian (Daily), dan Target (Todo)?", a: <ul className="list-disc pl-5 space-y-2"><li><b>Habit (Siklus Misi):</b> Kebiasaan baik/buruk yang bisa ditekan berkali-kali tanpa jadwal ketat.</li><li><b>Daily (Operasi Harian):</b> Tugas rutin terjadwal yang otomatis me-reset di hari berikutnya.</li><li><b>Todo (Target Utama):</b> Misi sekali jalan yang akan hilang dari daftar setelah diselesaikan.</li></ul> },
    { q: "Apa yang terjadi jika saya tidak mengerjakan Operasi Harian (Daily)?", a: "Hati-hati! Di penghujung hari, monster kemalasan akan menyerang. Karaktermu akan menerima Damage (kehilangan HP) untuk setiap tugas harian (Daily) atau kebiasaan buruk yang kamu abaikan. Jika HP kamu habis, kamu mungkin akan menerima penalti kehilangan level atau Gold." },
    { q: "Bagaimana cara kerja Focus Arena?", a: "Focus Arena menggunakan teknik Pomodoro. Pilih satu monster/boss, atur durasi fokus (misal 25 menit), lalu mulai bekerja tanpa gangguan. Jika timer selesai tanpa kamu batalkan, karaktermu akan melancarkan serangan kritikal (Critical Hit) ke Boss dan memberimu Loot langka!" },
    { q: "Apakah aplikasi ini gratis dimainkan?", a: "Ya! Petualangan inti, pelacakan misi, dan fitur RPG 100% gratis untuk semua pejuang. Kami berencana untuk menghadirkan kosmetik premium opsional di masa depan untuk mendukung pengembangan server." },
    { q: "Bagaimana cara mendapatkan Equipment (Senjata & Armor) baru?", a: "Kumpulkan Gold dengan menyelesaikan misi-misi yang kamu buat. Setelah Gold terkumpul, kamu bisa membeli berbagai perlengkapan di Toko & Loot untuk meningkatkan status kekuatan karaktermu." },
    { q: "Apa fungsi dari Login Streak?", a: "Login Streak melacak seberapa konsisten kamu masuk ke Daily Dungeon setiap harinya. Semakin panjang Streak yang kamu capai, semakin besar bonus EXP dan Gold yang akan kamu terima dari Daily Reward." },
    { q: "Apakah karakter saya bisa mati?", a: "Jika HP karaktermu mencapai 0 karena terlalu banyak misi harian yang terlewat atau terlalu sering menekan Habit buruk, karaktermu akan 'pingsan'. Kamu mungkin akan kehilangan sebagian Gold atau level sebagai penalti. Jangan lupa persiapkan Potion Kesehatan di Toko!" },
    { q: "Bisakah saya mereset ulang progress (ulang dari awal)?", a: "Tentu, bagi kamu yang ingin memulai petualangan baru, tersedia opsi untuk mereset atribut maupun keseluruhan akun di dalam menu Pengaturan Sistem (Settings)." }
  ] : [
    { q: "What is Daily Dungeon?", a: "Daily Dungeon is a productivity app (To-Do List & Habit Tracker) that turns your real-world obligations into an epic RPG adventure. By completing tasks, you'll earn EXP and Gold to strengthen your character." },
    { q: "What is the difference between Habit, Daily, and Todo?", a: <ul className="list-disc pl-5 space-y-2"><li><b>Habit:</b> Good/bad habits that can be pressed multiple times without a strict schedule.</li><li><b>Daily:</b> Scheduled routine tasks that reset automatically the next day.</li><li><b>Todo:</b> One-time missions that disappear from the list once completed.</li></ul> },
    { q: "What happens if I don't complete a Daily?", a: "Beware! At the end of the day, the laziness monster will attack. Your character will take Damage (lose HP) for every Daily or bad habit you missed. If your HP reaches zero, you might receive a penalty like losing a level or Gold." },
    { q: "How does the Focus Arena work?", a: "Focus Arena uses the Pomodoro technique. Choose a monster/boss, set a focus duration (e.g., 25 minutes), and start working without distractions. If the timer finishes without being canceled, your character will land a Critical Hit on the Boss and grant you rare Loot!" },
    { q: "Is this app free to play?", a: "Yes! The core adventure, quest tracking, and RPG features are 100% free for all warriors. We plan to introduce optional premium cosmetics in the future to support server development." },
    { q: "How do I get new Equipment (Weapons & Armor)?", a: "Collect Gold by completing the quests you create. Once you have enough Gold, you can buy various gear in the Shop & Loot to increase your character's combat stats." },
    { q: "What is the purpose of the Login Streak?", a: "The Login Streak tracks how consistently you enter Daily Dungeon every day. The longer your Streak, the bigger the EXP and Gold bonus you'll receive from the Daily Reward." },
    { q: "Can my character die?", a: "If your character's HP reaches 0 due to too many missed Dailies or too many bad Habits, your character will 'faint'. You might lose some Gold or a level as a penalty. Don't forget to stock up on Health Potions in the Shop!" },
    { q: "Can I reset my progress (start over)?", a: "Sure, for those who want to start a new adventure, there is an option to reset stats or the entire account in the System Settings menu." }
  ];

  const openModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setModalContent({ title: t.privacyTitle, content: <PrivacyContent lang={lang} /> });
    } else {
      setModalContent({ title: t.termsTitle, content: <TermsContent lang={lang} /> });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col relative overflow-hidden font-sans">
      
      {isModalOpen && modalContent && (
        <PolicyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title} lang={lang}>{modalContent.content}</PolicyModal>
      )}

      {/* Latar Belakang Bintang */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute bg-amber-200 rounded-full"
              style={{
                width:  Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top:    Math.random() * 100 + '%',
                left:   Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              }} 
            />
          ))}
        </div>
      )}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 100%{ transform: translateY(-12px) rotate(5deg); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
        .scroll-left::-webkit-scrollbar { display: none; }
        .scroll-left { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Koin Melayang */}
      <div className="z-0"><FloatingCoin x="15%" y="15%" delay={0}/></div>
      <div className="z-0"><FloatingCoin x="85%" y="30%" delay={1.5}/></div>
      <div className="z-0"><FloatingCoin x="10%" y="70%" delay={2}/></div>
      <div className="z-0"><FloatingCoin x="50%" y="10%" delay={0.5}/></div>
      <div className="z-0"><FloatingCoin x="90%" y="50%" delay={1.5}/></div>

      {/* Tombol Kembali Floating Keren */}
      <button 
        onClick={() => router.push('/login')} 
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-amber-500 hover:border-amber-400 hover:text-zinc-900 rounded-full transition-all shadow-lg group"
        title="Kembali ke Halaman Utama"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* TOMBOL GANTI BAHASA */}
      {isMounted && (
        <button 
          onClick={() => updateSetting('language', settings.language === 'id' ? 'en' : 'id')} 
          className="absolute top-6 right-6 z-50 flex items-center justify-center h-12 px-4 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-amber-500 hover:border-amber-400 hover:text-zinc-900 rounded-xl transition-all shadow-lg font-bold group"
        >
          {settings.language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
        </button>
      )}

      {/* Scrollable Content */}
      <div className="scroll-left flex-1 overflow-y-auto h-full z-10 relative px-4 md:px-6">
        <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col pt-12 md:pt-16 min-h-full">
          
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
              <img src="/logo.png" alt="Logo" className="h-24 md:h-32 hover:scale-105 transition-transform duration-500" style={{ imageRendering: 'pixelated' }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {t.title}
            </h1>
            <p className="text-zinc-400 font-medium text-base md:text-lg max-w-xl mx-auto">
              {t.desc}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
            <div className="bg-zinc-800/40 border border-amber-500/20 p-6 rounded-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <BookOpen size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">{t.f1Title}</h3>
              <p className="text-sm text-zinc-400">{t.f1Desc}</p>
            </div>
            
            <div className="bg-zinc-800/40 border border-amber-500/20 p-6 rounded-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 mb-4 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Swords size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">{t.f2Title}</h3>
              <p className="text-sm text-zinc-400">{t.f2Desc}</p>
            </div>

            <div className="bg-zinc-800/40 border border-amber-500/20 p-6 rounded-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mb-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">{t.f3Title}</h3>
              <p className="text-sm text-zinc-400">{t.f3Desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">{t.faqTitle}</h2>
            <div className="h-px bg-amber-500/30 flex-1 ml-4" />
          </div>

          <div className="w-full">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
          
          {/* Spacer untuk memastikan scroll tidak terhalang Kuil Spartan & Footer */}
          <div className="h-32 md:h-40 flex-shrink-0" />
        </main>
      </div>

      {/* FOOTER & LANDSCAPE */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none opacity-80">
        <GrandSpartanLandscape />
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 w-full pt-16 pb-8 px-6 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 pointer-events-auto">
          <p className="font-medium tracking-wide mb-4 md:mb-0 text-center md:text-left">{t.rights}</p>
          <div className="flex gap-6 font-medium">
            <button onClick={() => openModal('privacy')} className="hover:text-amber-400 transition-colors">{t.privacyTitle}</button>
            <button onClick={() => openModal('terms')} className="hover:text-amber-400 transition-colors">{t.termsTitle}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}