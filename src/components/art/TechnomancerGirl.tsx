import React from 'react';

export default function TechnomancerGirl() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg width="200" height="200" viewBox="-4 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <style>
          {`
            @keyframes bounce-8bit { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(1px); } }
            @keyframes flash { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
            @keyframes blink { 0%, 90% { height: 1px; } 95%, 100% { height: 0px; } }
            .char-group { animation: bounce-8bit 0.8s steps(2) infinite; }
            .zap-pixel { animation: flash 0.1s steps(2) infinite; }
            .eye-anim { animation: blink 4s steps(1) infinite; }
          `}
        </style>

        {/* Bayangan */}
        <rect x="8" y="29" width="16" height="2" fill="#000" fillOpacity="0.4" />

        <g className="char-group">
          {/* Outline Hitam Dasar */}
          <path d="M11 5 H21 V10 H22 V12 H24 V20 H25 V23 H23 V20 H22 V28 H18 V24 H14 V28 H10 V20 H9 V23 H7 V20 H8 V12 H10 V10 H11 V5 Z M8 20 H11 V24 H8 V20 Z" fill="black" />
          
          {/* Kuncir Rambut Belakang */}
          <rect x="10" y="7" width="2" height="6" fill="#BE185D" />
          <rect x="20" y="7" width="2" height="6" fill="#BE185D" />

          {/* Baju & Highlight (Ungu) */}
          <rect x="12" y="10" width="8" height="10" fill="#7C3AED" />
          <rect x="13" y="11" width="2" height="6" fill="#A78BFA" />
          
          {/* Wajah & Rambut Poni */}
          <rect x="12" y="6" width="8" height="5" fill="#ffdbac" />
          <path d="M12 5 H20 V7 H19 V8 H13 V7 H12 V5 Z" fill="#BE185D" />
          <rect x="11" y="6" width="1" height="3" fill="#BE185D" />
          <rect x="20" y="6" width="1" height="3" fill="#BE185D" />
          
          {/* Mata */}
          <rect x="13" y="8" width="2" height="1" fill="black" className="eye-anim" />
          <rect x="17" y="8" width="2" height="1" fill="black" className="eye-anim" />
          
          {/* Kaki */}
          <rect x="11" y="20" width="3" height="4" fill="#0f172a" />
          <rect x="18" y="20" width="3" height="4" fill="#0f172a" />
            
          {/* Lengan */}
          <rect x="9" y="12" width="3" height="8" fill="#ffdbac" /> 
          <rect x="20" y="12" width="3" height="8" fill="#ffdbac" /> 

          {/* Telapak Tangan */}
          <rect x="8" y="20" width="3" height="3" fill="#ffdbac" />
          <rect x="21" y="20" width="3" height="3" fill="#ffdbac" />

          {/* --- Posisi pusat rotasi pedang Energi (Emas/Kuning) --- */}
          <g transform="rotate(135 22.5 22.5)">
            <rect x="22" y="23" width="1" height="3" fill="#475569" />
            <rect x="21" y="22" width="3" height="1" fill="#94A3B8" />
            <rect x="22" y="11" width="1" height="11" fill="#FBBF24" />
            
            <rect x="21" y="18" width="1" height="1" fill="white" className="zap-pixel" />
            <rect x="23" y="14" width="1" height="1" fill="white" className="zap-pixel" style={{ animationDelay: '0.1s' }} />
          </g>
            
        </g>
      </svg>
    </div>
  );
}