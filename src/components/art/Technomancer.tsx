"use client";
import React from 'react';

interface TechnomancerProps {
  weaponId?: number;
  armorId?:  number;
  helmetId?: number;
  cloakId?: number;
  accessoryId?: number;
}

// ═══════════════════════════════════════════════════════════════
// WEAPON SPRITES  (rotate 135 → blade lower-right)
// ═══════════════════════════════════════════════════════════════

const CyanSword = () => (
  <g transform="rotate(135 22.5 22.5)">
    <rect x="21" y="9"  width="3" height="1" fill="#67e8f9" opacity="0.5"/>
    <rect x="22" y="10" width="1" height="12" fill="#22D3EE"/>
    <rect x="21" y="10" width="1" height="10" fill="#67e8f9" opacity="0.4"/>
    <rect x="20" y="22" width="5" height="1" fill="#94A3B8"/>
    <rect x="20" y="23" width="5" height="1" fill="#64748b"/>
    <rect x="22" y="24" width="1" height="3" fill="#475569"/>
    <rect x="21" y="27" width="3" height="1" fill="#475569"/>
    <rect x="22" y="27" width="1" height="1" fill="#22D3EE" opacity="0.7"/>
    <rect x="21" y="16" width="1" height="1" fill="white">
      <animate attributeName="opacity" values="1;0;1" dur="0.2s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
    <rect x="23" y="13" width="1" height="1" fill="#67e8f9">
      <animate attributeName="opacity" values="0;1;0" dur="0.2s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
  </g>
);

const DemonEdge = () => (
  <g transform="rotate(135 22.5 22.5)">
    <rect x="22" y="10" width="1" height="2" fill="#f1f5f9"/>
    <rect x="22" y="12" width="1" height="2" fill="#e2e8f0"/>
    <rect x="22" y="14" width="1" height="2" fill="#94a3b8"/>
    <rect x="22" y="16" width="1" height="2" fill="#64748b"/>
    <rect x="22" y="18" width="1" height="2" fill="#475569"/>
    <rect x="22" y="20" width="1" height="2" fill="#334155"/>
    <rect x="22" y="11" width="1" height="10" fill="#be123c" opacity="0.7"/>
    <rect x="21" y="12" width="1" height="8"  fill="#cbd5e1" opacity="0.25"/>
    <rect x="18" y="22" width="9" height="2"  fill="#1e293b"/>
    <rect x="18" y="22" width="9" height="1"  fill="#475569"/>
    <rect x="16" y="21" width="3" height="2"  fill="#0f172a"/>
    <rect x="15" y="20" width="2" height="2"  fill="#0f172a"/>
    <rect x="25" y="21" width="3" height="2"  fill="#0f172a"/>
    <rect x="27" y="20" width="2" height="2"  fill="#0f172a"/>
    <rect x="15" y="20" width="1" height="1"  fill="#e11d48">
      <animate attributeName="opacity" values="1;0.1;1" dur="0.4s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
    <rect x="28" y="20" width="1" height="1"  fill="#e11d48">
      <animate attributeName="opacity" values="0.1;1;0.1" dur="0.4s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
    <rect x="21" y="22" width="3" height="1"  fill="#e11d48" opacity="0.3"/>
    <rect x="21" y="24" width="3" height="2"  fill="#292524"/>
    <rect x="21" y="26" width="3" height="1"  fill="#1c1917"/>
    <rect x="21" y="27" width="3" height="1"  fill="#292524"/>
    <rect x="21" y="25" width="3" height="1"  fill="#44403c" opacity="0.6"/>
    <rect x="20" y="28" width="5" height="2"  fill="#0f172a"/>
    <rect x="22" y="28" width="1" height="2"  fill="#e11d48" opacity="0.8"/>
    <rect x="21" y="16" width="1" height="1"  fill="#fca5a5">
      <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
    <rect x="23" y="13" width="1" height="1"  fill="#fca5a5">
      <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
  </g>
);

const VoidBow = () => (
  <g>
    <rect x="8"  y="9"  width="2" height="2" fill="#1e1b4b"/>
    <rect x="7"  y="11" width="2" height="2" fill="#312e81"/>
    <rect x="7"  y="13" width="2" height="2" fill="#3730a3"/>
    <rect x="6"  y="15" width="2" height="2" fill="#4338ca"/>
    <rect x="6"  y="17" width="4" height="4" fill="#312e81"/>
    <rect x="7"  y="17" width="2" height="4" fill="#1e1b4b"/>
    <rect x="7"  y="18" width="2" height="2" fill="#818cf8"/>
    <rect x="6"  y="21" width="2" height="2" fill="#4338ca"/>
    <rect x="7"  y="23" width="2" height="2" fill="#3730a3"/>
    <rect x="7"  y="25" width="2" height="2" fill="#312e81"/>
    <rect x="8"  y="27" width="2" height="1" fill="#1e1b4b"/>
    <rect x="6"  y="13" width="1" height="2" fill="#6366f1" opacity="0.5"/>
    <rect x="5"  y="17" width="1" height="4" fill="#6366f1" opacity="0.4"/>
    <rect x="6"  y="21" width="1" height="2" fill="#6366f1" opacity="0.5"/>
    <rect x="10" y="10" width="1" height="2" fill="#818cf8" opacity="0.8"/>
    <rect x="11" y="12" width="1" height="2" fill="#a5b4fc"/>
    <rect x="12" y="14" width="1" height="2" fill="#c7d2fe"/>
    <rect x="12" y="16" width="1" height="3" fill="#e0e7ff"/>
    <rect x="12" y="19" width="1" height="3" fill="#e0e7ff"/>
    <rect x="12" y="22" width="1" height="2" fill="#c7d2fe"/>
    <rect x="11" y="24" width="1" height="2" fill="#a5b4fc"/>
    <rect x="10" y="26" width="1" height="2" fill="#818cf8" opacity="0.8"/>
    <rect x="13" y="18" width="10" height="1" fill="#c7d2fe" opacity="0.8"/>
    <rect x="13" y="19" width="10" height="1" fill="#818cf8" opacity="0.6"/>
    <rect x="22" y="17" width="2" height="1" fill="#a5b4fc"/>
    <rect x="23" y="18" width="2" height="1" fill="#6366f1"/>
    <rect x="22" y="19" width="2" height="1" fill="#a5b4fc"/>
    <rect x="13" y="17" width="2" height="1" fill="#6366f1"/>
    <rect x="13" y="20" width="2" height="1" fill="#6366f1"/>
    <rect x="16" y="17" width="1" height="1" fill="#818cf8">
      <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite" calcMode="discrete"/>
    </rect>
  </g>
);

// ─── SENJATA BARU ──────────────

const EnmaKatana = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 2)">
    <rect x="15" y="4" width="2" height="16" fill="#1e1b4b"/>
    <rect x="14" y="5" width="1" height="14" fill="#a855f7"/> 
    <rect x="14" y="7" width="1" height="2" fill="#d946ef"/>
    <rect x="14" y="11" width="1" height="2" fill="#d946ef"/>
    <rect x="14" y="15" width="1" height="2" fill="#d946ef"/>
    <rect x="16" y="4" width="1" height="1" fill="#cbd5e1"/>
    <rect x="12" y="20" width="8" height="1" fill="#fbbf24"/>
    <rect x="13" y="21" width="6" height="1" fill="#b45309"/>
    <rect x="14" y="22" width="4" height="6" fill="#1e1b4b"/>
    <rect x="14" y="22" width="4" height="1" fill="#a855f7"/>
    <rect x="14" y="24" width="4" height="1" fill="#a855f7"/>
    <rect x="14" y="26" width="4" height="1" fill="#a855f7"/>
    <rect x="15" y="28" width="2" height="1" fill="#fbbf24"/>
  </g>
);

const KasakaFang = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 2)">
    <rect x="12" y="8" width="1" height="2" fill="#67e8f9" opacity="0.5"/>
    <rect x="19" y="14" width="1" height="2" fill="#67e8f9" opacity="0.5"/>
    <rect x="15" y="6" width="2" height="2" fill="#0891b2"/>
    <rect x="14" y="8" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="10" width="3" height="2" fill="#22d3ee"/>
    <rect x="15" y="12" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="14" width="3" height="2" fill="#22d3ee"/>
    <rect x="15" y="16" width="4" height="2" fill="#06b6d4"/>
    <rect x="14" y="18" width="3" height="2" fill="#0891b2"/>
    <rect x="15" y="8" width="1" height="10" fill="#cffafe"/>
    <rect x="13" y="20" width="6" height="2" fill="#1e1b4b"/>
    <rect x="14" y="22" width="4" height="4" fill="#312e81"/>
    <rect x="15" y="26" width="2" height="2" fill="#0f172a"/>
  </g>
);

const Elucidator = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 3)">
    <rect x="15" y="3" width="2" height="2" fill="#cbd5e1"/>
    <rect x="14" y="5" width="4" height="15" fill="#0f172a"/>
    <rect x="14" y="5" width="1" height="15" fill="#94a3b8"/> 
    <rect x="17" y="5" width="1" height="15" fill="#94a3b8"/> 
    <rect x="15" y="5" width="2" height="15" fill="#020617"/> 
    <rect x="11" y="19" width="10" height="2" fill="#475569"/>
    <rect x="10" y="20" width="12" height="1" fill="#94a3b8"/>
    <rect x="15" y="18" width="2" height="3" fill="#cbd5e1"/> 
    <rect x="14" y="21" width="4" height="5" fill="#1e293b"/>
    <rect x="14" y="26" width="4" height="2" fill="#94a3b8"/> 
    <rect x="15" y="27" width="2" height="2" fill="#475569"/>
  </g>
);

const BusterSword = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 0)">
    <rect x="13" y="4" width="6" height="18" fill="#64748b"/>
    <rect x="13" y="4" width="1" height="18" fill="#e2e8f0"/> 
    <rect x="15" y="16" width="2" height="2" fill="#0f172a"/>
    <rect x="15" y="12" width="2" height="2" fill="#0f172a"/>
    <rect x="11" y="22" width="10" height="2" fill="#b45309"/>
    <rect x="14" y="24" width="4" height="6" fill="#7f1d1d"/>
    <rect x="14" y="25" width="4" height="1" fill="#450a0a"/>
    <rect x="14" y="27" width="4" height="1" fill="#450a0a"/>
  </g>
);

const Zangetsu = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 2)">
    <rect x="12" y="2" width="6" height="20" fill="#cbd5e1"/>
    <rect x="11" y="4" width="1" height="16" fill="#f8fafc"/> 
    <rect x="17" y="2" width="1" height="20" fill="#0f172a"/> 
    <rect x="14" y="22" width="4" height="6" fill="#f8fafc"/>
    <rect x="14" y="23" width="4" height="1" fill="#0f172a"/>
    <rect x="14" y="25" width="4" height="1" fill="#0f172a"/>
    <rect x="14" y="27" width="4" height="1" fill="#0f172a"/>
    <rect x="15" y="28" width="2" height="3" fill="#f8fafc"/>
    <rect x="16" y="30" width="2" height="2" fill="#f8fafc"/>
  </g>
);

const Excalibur = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 1)">
    <rect x="15" y="3" width="2" height="18" fill="#f1f5f9"/>
    <rect x="14" y="5" width="1" height="16" fill="#94a3b8"/>
    <rect x="17" y="5" width="1" height="16" fill="#94a3b8"/>
    <rect x="15" y="3" width="2" height="18" fill="#fbbf24" opacity="0.4"/> 
    <rect x="10" y="21" width="12" height="2" fill="#fbbf24"/>
    <rect x="11" y="20" width="10" height="1" fill="#f59e0b"/>
    <rect x="14" y="21" width="4" height="2" fill="#1e3a8a"/> 
    <rect x="15" y="23" width="2" height="5" fill="#1e3a8a"/>
    <rect x="14" y="28" width="4" height="2" fill="#fbbf24"/>
  </g>
);

const DeathScythe = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 4)">
    <rect x="16" y="2" width="2" height="28" fill="#1c1917"/>
    <rect x="4" y="4" width="12" height="2" fill="#dc2626"/>
    <rect x="2" y="6" width="4" height="2" fill="#dc2626"/>
    <rect x="2" y="8" width="2" height="6" fill="#dc2626"/>
    <rect x="4" y="4" width="12" height="1" fill="#f8fafc"/>
    <rect x="2" y="6" width="2" height="8" fill="#f8fafc"/>
    <rect x="15" y="3" width="4" height="4" fill="#94a3b8"/>
    <rect x="15" y="7" width="2" height="2" fill="#fbbf24"/> 
  </g>
);

const LeviathanAxe = () => (
  <g transform="rotate(135 22.5 22.5) translate(7, 4)">
    <rect x="14" y="6" width="2" height="22" fill="#78350f"/>
    <rect x="13" y="18" width="4" height="6" fill="#451a03"/> 
    <rect x="13" y="28" width="4" height="2" fill="#fbbf24"/> 
    <rect x="16" y="8" width="6" height="8" fill="#94a3b8"/>
    <rect x="22" y="6" width="2" height="12" fill="#e2e8f0"/> 
    <rect x="17" y="10" width="2" height="2" fill="#38bdf8"/>
    <rect x="19" y="12" width="2" height="2" fill="#38bdf8"/>
    <rect x="10" y="10" width="4" height="3" fill="#94a3b8"/>
  </g>
);

// ─── ARMOR BARU ─────────────────────────────────────

const BodyTurtleGi = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#ea580c"/>
    <rect x="14" y="10" width="4" height="3" fill="#1e3a8a"/> {/* Blue chest */}
    <rect x="12" y="17" width="8" height="3" fill="#1e3a8a"/> {/* Blue belt */}
    <rect x="9" y="12" width="3" height="3" fill="#ea580c"/> {/* Left sleeve */}
    <rect x="9" y="15" width="3" height="5" fill="#ffdbac"/> {/* Skin */}
    <rect x="20" y="12" width="3" height="3" fill="#ea580c"/> {/* Right sleeve */}
    <rect x="20" y="15" width="3" height="5" fill="#ffdbac"/> {/* Skin */}
    <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
  </>
);

const BodySurveyCorps = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#f8fafc"/> {/* White shirt */}
    <rect x="12" y="10" width="3" height="6" fill="#78350f"/> {/* Jacket L */}
    <rect x="17" y="10" width="3" height="6" fill="#78350f"/> {/* Jacket R */}
    <rect x="12" y="18" width="8" height="2" fill="#451a03"/> {/* Belt */}
    <rect x="13" y="12" width="1" height="8" fill="#0f172a"/> {/* Strap */}
    <rect x="18" y="12" width="1" height="8" fill="#0f172a"/> {/* Strap */}
    <rect x="9" y="12" width="3" height="8" fill="#78350f"/> {/* L arm */}
    <rect x="20" y="12" width="3" height="8" fill="#78350f"/> {/* R arm */}
    <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
  </>
);

const BodyAkatsuki = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#0f172a"/>
    <rect x="14" y="13" width="2" height="1" fill="#dc2626"/> {/* Cloud */}
    <rect x="16" y="17" width="2" height="1" fill="#dc2626"/> {/* Cloud */}
    <rect x="9" y="12" width="3" height="8" fill="#0f172a"/>
    <rect x="20" y="12" width="3" height="8" fill="#0f172a"/>
    <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
  </>
);

const BodyIronArmor = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#dc2626"/>
    <rect x="15" y="12" width="2" height="2" fill="#22d3ee"/> {/* Reactor */}
    <rect x="12" y="16" width="2" height="4" fill="#fbbf24"/> {/* Gold Plate L */}
    <rect x="18" y="16" width="2" height="4" fill="#fbbf24"/> {/* Gold Plate R */}
    <rect x="9" y="12" width="3" height="8" fill="#dc2626"/>
    <rect x="9" y="14" width="3" height="2" fill="#fbbf24"/>
    <rect x="20" y="12" width="3" height="8" fill="#dc2626"/>
    <rect x="20" y="14" width="3" height="2" fill="#fbbf24"/>
    <rect x="8" y="20" width="3" height="3" fill="#b91c1c"/> {/* Gloves */}
    <rect x="21" y="20" width="3" height="3" fill="#b91c1c"/>
  </>
);

const BodyN7Suit = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#1e293b"/>
    <rect x="12" y="12" width="8" height="3" fill="#0f172a"/> {/* Chest indent */}
    <rect x="18" y="10" width="1" height="10" fill="#dc2626"/> {/* Red stripe */}
    <rect x="19" y="10" width="1" height="10" fill="#f8fafc"/> {/* White stripe */}
    <rect x="9" y="12" width="3" height="8" fill="#1e293b"/>
    <rect x="20" y="12" width="3" height="8" fill="#1e293b"/>
    <rect x="8" y="20" width="3" height="3" fill="#334155"/>
    <rect x="21" y="20" width="3" height="3" fill="#334155"/>
  </>
);

const BodyDemonSlayer = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#0f172a"/> {/* Uniform */}
    <rect x="15" y="11" width="1" height="6" fill="#94a3b8"/> {/* Buttons */}
    <rect x="12" y="18" width="8" height="2" fill="#f8fafc"/> {/* Belt */}
    <rect x="9" y="12" width="3" height="8" fill="#166534"/> {/* Haori L */}
    <rect x="9" y="14" width="3" height="2" fill="#0f172a"/> {/* Checkers */}
    <rect x="9" y="18" width="3" height="2" fill="#0f172a"/>
    <rect x="20" y="12" width="3" height="8" fill="#166534"/> {/* Haori R */}
    <rect x="20" y="14" width="3" height="2" fill="#0f172a"/>
    <rect x="20" y="18" width="3" height="2" fill="#0f172a"/>
    <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
  </>
);

const BodyJedi = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#d6d3d1"/> {/* Tunic */}
    <rect x="14" y="10" width="2" height="4" fill="#a8a29e"/> {/* V-neck */}
    <rect x="12" y="17" width="8" height="3" fill="#451a03"/> {/* Belt */}
    <rect x="15" y="17" width="2" height="3" fill="#94a3b8"/> {/* Buckle */}
    <rect x="9" y="12" width="3" height="8" fill="#78350f"/> {/* Robe L */}
    <rect x="20" y="12" width="3" height="8" fill="#78350f"/> {/* Robe R */}
    <rect x="8" y="20" width="3" height="3" fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
  </>
);

const BodyHevSuit = () => (
  <>
    <rect x="12" y="10" width="8" height="10" fill="#0f172a"/> {/* Undersuit */}
    <rect x="12" y="11" width="8" height="5" fill="#f97316"/> {/* Orange Chest */}
    <rect x="15" y="12" width="2" height="2" fill="#fbbf24"/> {/* Lambda BG */}
    <rect x="12" y="18" width="8" height="2" fill="#f97316"/> {/* Orange Belt */}
    <rect x="9" y="12" width="3" height="3" fill="#f97316"/> {/* Shoulder L */}
    <rect x="9" y="15" width="3" height="5" fill="#0f172a"/> {/* Arm L */}
    <rect x="20" y="12" width="3" height="3" fill="#f97316"/> {/* Shoulder R */}
    <rect x="20" y="15" width="3" height="5" fill="#0f172a"/> {/* Arm R */}
    <rect x="8" y="20" width="3" height="3" fill="#334155"/>
    <rect x="21" y="20" width="3" height="3" fill="#334155"/>
  </>
);

// ─── HELMET BARU ────────────────────────────────────

const IronHelm = () => (
  <><rect x="11" y="6" width="10" height="5" fill="#dc2626"/><rect x="13" y="7" width="6" height="4" fill="#fbbf24"/><rect x="14" y="8" width="1" height="1" fill="#22d3ee"/><rect x="17" y="8" width="1" height="1" fill="#22d3ee"/></>
);
const StrawHat = () => (
  <><rect x="10" y="3" width="12" height="3" fill="#fde047"/><rect x="10" y="4" width="12" height="1" fill="#dc2626"/><rect x="8" y="6" width="16" height="1" fill="#fde047"/></>
);
const HiddenLeaf = () => (
  <><rect x="11" y="6" width="10" height="2" fill="#1e293b"/><rect x="12" y="6" width="8" height="2" fill="#94a3b8"/><rect x="15" y="6" width="2" height="1" fill="#0f172a"/></>
);
const InosukeHelm = () => (
  <><rect x="11" y="4" width="10" height="7" fill="#a8a29e"/><rect x="14" y="9" width="4" height="2" fill="#334155"/><rect x="12" y="7" width="2" height="2" fill="#38bdf8"/><rect x="18" y="7" width="2" height="2" fill="#38bdf8"/><rect x="11" y="3" width="2" height="2" fill="#fb7185"/><rect x="19" y="3" width="2" height="2" fill="#fb7185"/></>
);
const VaderHelm = () => (
  <><rect x="11" y="5" width="10" height="7" fill="#0f172a"/><rect x="10" y="10" width="12" height="2" fill="#0f172a"/><rect x="13" y="7" width="2" height="2" fill="#1e293b"/><rect x="17" y="7" width="2" height="2" fill="#1e293b"/><rect x="15" y="9" width="2" height="2" fill="#334155"/></>
);
const SpartanHelm = () => (
  <><rect x="11" y="5" width="10" height="6" fill="#166534"/><rect x="12" y="7" width="8" height="3" fill="#fbbf24"/><rect x="13" y="7" width="6" height="1" fill="#22d3ee" opacity="0.6"/></>
);
const SaitamaBald = () => (
  <><rect x="12" y="6" width="8" height="5" fill="#ffdbac"/></> // Replaces hair area
);
const HollowMaskIcon = () => (
  <><rect x="11" y="5" width="10" height="7" fill="#f8fafc"/><rect x="13" y="7" width="2" height="2" fill="#000"/><rect x="17" y="7" width="2" height="2" fill="#000"/><rect x="11" y="5" width="3" height="1" fill="#dc2626"/><rect x="11" y="7" width="1" height="3" fill="#dc2626"/><rect x="14" y="11" width="4" height="1" fill="#94a3b8"/></>
);
const GordonGlasses = () => (
  <><rect x="12" y="7" width="3" height="2" fill="#000" opacity="0.8"/><rect x="17" y="7" width="3" height="2" fill="#000" opacity="0.8"/><rect x="15" y="7" width="2" height="1" fill="#000"/></>
);

// ─── CLOAK BARU ────────────────────────

const SurveyCape = () => (
  <><rect x="8" y="10" width="16" height="16" fill="#166534"/><rect x="10" y="26" width="12" height="2" fill="#15803d"/></>
);
const HokageCloak = () => (
  <><rect x="8" y="10" width="16" height="14" fill="#f8fafc"/><rect x="8" y="24" width="16" height="4" fill="#ef4444"/><rect x="10" y="22" width="2" height="2" fill="#ef4444"/><rect x="14" y="22" width="4" height="2" fill="#ef4444"/><rect x="20" y="22" width="2" height="2" fill="#ef4444"/></>
);
const LevitationCloak = () => (
  <><rect x="8" y="10" width="16" height="16" fill="#b91c1c"/><rect x="6" y="8" width="20" height="4" fill="#dc2626"/><rect x="6" y="8" width="20" height="1" fill="#fbbf24"/></>
);
const DarkCape = () => (
  <><rect x="6" y="10" width="20" height="16" fill="#0f172a"/><rect x="6" y="26" width="3" height="2" fill="#0f172a"/><rect x="11" y="26" width="4" height="2" fill="#0f172a"/><rect x="17" y="26" width="4" height="2" fill="#0f172a"/><rect x="23" y="26" width="3" height="2" fill="#0f172a"/></>
);
const SaitamaCape = () => (
  <><rect x="9" y="10" width="14" height="16" fill="#f1f5f9"/><rect x="10" y="26" width="12" height="2" fill="#e2e8f0"/></>
);
const GutsCape = () => (
  <><rect x="7" y="10" width="18" height="14" fill="#1e293b"/><rect x="7" y="24" width="2" height="4" fill="#1e293b"/><rect x="11" y="24" width="3" height="2" fill="#1e293b"/><rect x="16" y="24" width="2" height="3" fill="#1e293b"/><rect x="21" y="24" width="4" height="2" fill="#1e293b"/></>
);
const CrimsonCape = () => (
  <><rect x="8" y="10" width="16" height="16" fill="#dc2626"/><rect x="6" y="10" width="4" height="4" fill="#ef4444"/><rect x="22" y="10" width="4" height="4" fill="#ef4444"/></>
);
const VampireMantle = () => (
  <><rect x="6" y="8" width="20" height="18" fill="#020617"/><rect x="8" y="8" width="16" height="2" fill="#9f1239"/></>
);
const WinterWolf = () => (
  <><rect x="8" y="10" width="16" height="16" fill="#292524"/><rect x="6" y="10" width="20" height="4" fill="#94a3b8"/><rect x="8" y="14" width="16" height="2" fill="#475569"/></>
);

// ─── AMULET BARU ────────────────────────

const CharOneRing = () => (
  <><rect x="15" y="11" width="2" height="2" fill="#fbbf24"/><rect x="15" y="11" width="1" height="1" fill="#fef08a"/></>
);
const CharMillennium = () => (
  <><rect x="14" y="11" width="4" height="1" fill="#fbbf24"/><rect x="15" y="12" width="2" height="1" fill="#f59e0b"/><rect x="15" y="11" width="1" height="1" fill="#1e293b"/></>
);
const CharAgamotto = () => (
  <><rect x="14" y="11" width="4" height="2" fill="#d4af37"/><rect x="15" y="11" width="2" height="2" fill="#22c55e"/></>
);
const CharPhilosopher = () => (
  <><rect x="15" y="11" width="2" height="3" fill="#dc2626"/><rect x="15" y="12" width="1" height="1" fill="#fca5a5"/></>
);
const CharWolfMedal = () => (
  <><rect x="15" y="11" width="2" height="2" fill="#94a3b8"/><rect x="15" y="11" width="1" height="1" fill="#dc2626"/></>
);
const CharMara = () => (
  <><rect x="15" y="11" width="2" height="3" fill="#fbbf24"/><rect x="15" y="12" width="2" height="1" fill="#0d9488"/></>
);
const CharBehelit = () => (
  <><rect x="15" y="11" width="2" height="3" fill="#b91c1c"/><rect x="15" y="12" width="1" height="1" fill="#0f172a"/></>
);
const CharCoreDrill = () => (
  <><rect x="15" y="11" width="2" height="1" fill="#fbbf24"/><rect x="15" y="12" width="2" height="2" fill="#d97706"/><rect x="15" y="11" width="1" height="1" fill="#22c55e"/></>
);
const CharTriforce = () => (
  <><rect x="15" y="11" width="2" height="1" fill="#fbbf24"/><rect x="14" y="12" width="4" height="1" fill="#fbbf24"/></>
);

// ═══════════════════════════════════════════════════════════════
// CLOAK & ACCESSORY SPRITES
// ═══════════════════════════════════════════════════════════════

const ShadowCloak = () => (
  <g transform="translate(3, 1) scale(0.8)">
    <rect x="9"  y="4"  width="2" height="2" fill="#6d28d9" opacity="0.5"/>
    <rect x="21" y="4"  width="2" height="2" fill="#6d28d9" opacity="0.5"/>
    <rect x="7"  y="6"  width="2" height="2" fill="#6d28d9" opacity="0.4"/>
    <rect x="23" y="6"  width="2" height="2" fill="#6d28d9" opacity="0.4"/>
    <rect x="12" y="4"  width="8" height="2" fill="#4c1d95"/>
    <rect x="11" y="6"  width="10" height="2" fill="#5b21b6"/>
    <rect x="15" y="6"  width="2" height="2" fill="#c4b5fd"/>
    <rect x="9"  y="8"  width="4" height="2" fill="#4c1d95"/>
    <rect x="8"  y="10" width="4" height="2" fill="#3b0764"/>
    <rect x="19" y="8"  width="4" height="2" fill="#4c1d95"/>
    <rect x="20" y="10" width="4" height="2" fill="#3b0764"/>
    <rect x="10" y="8"  width="12" height="2" fill="#5b21b6"/>
    <rect x="9"  y="10" width="14" height="2" fill="#4c1d95"/>
    <rect x="8"  y="12" width="16" height="2" fill="#3b0764"/>
    <rect x="7"  y="14" width="18" height="2" fill="#2e1065"/>
    <rect x="7"  y="16" width="18" height="2" fill="#3b0764"/>
    <rect x="6"  y="18" width="20" height="2" fill="#2e1065"/>
    <rect x="6"  y="20" width="20" height="2" fill="#3b0764"/>
    <rect x="7"  y="22" width="18" height="2" fill="#2e1065"/>
    <rect x="7"  y="24" width="7"  height="2" fill="#3b0764"/>
    <rect x="18" y="24" width="7"  height="2" fill="#3b0764"/>
    <rect x="8"  y="26" width="5"  height="2" fill="#2e1065"/>
    <rect x="19" y="26" width="5"  height="2" fill="#2e1065"/>
    <rect x="15" y="16" width="2"  height="2" fill="#7c3aed"/>
    <rect x="14" y="17" width="4"  height="1" fill="#6d28d9"/>
  </g>
);

const DragonAmulet = () => (
  <g transform="translate(14.45, 9.8) scale(0.1)">
    <rect x="14" y="2"  width="4"  height="1" fill="#d4af37"/>
    <rect x="13" y="3"  width="2"  height="1" fill="#b8860b"/>
    <rect x="17" y="3"  width="2"  height="1" fill="#b8860b"/>
    <rect x="15" y="2"  width="2"  height="2" fill="#d4af37"/>
    <rect x="13" y="5"  width="6"  height="1" fill="#d4af37"/>
    <rect x="11" y="6"  width="10" height="1" fill="#d4af37"/>
    <rect x="10" y="7"  width="12" height="14" fill="#92400e"/>
    <rect x="10" y="7"  width="1"  height="14" fill="#d4af37"/>
    <rect x="21" y="7"  width="1"  height="14" fill="#d4af37"/>
    <rect x="9"  y="8"  width="1"  height="12" fill="#d4af37"/>
    <rect x="22" y="8"  width="1"  height="12" fill="#d4af37"/>
    <rect x="10" y="7"  width="2"  height="2" fill="#fbbf24"/>
    <rect x="20" y="7"  width="2"  height="2" fill="#fbbf24"/>
    <rect x="10" y="19" width="2"  height="2" fill="#fbbf24"/>
    <rect x="20" y="19" width="2"  height="2" fill="#fbbf24"/>
    <rect x="12" y="8"  width="8"  height="12" fill="#dc2626"/>
    <rect x="13" y="7"  width="6"  height="14" fill="#dc2626"/>
    <rect x="12" y="9"  width="8"  height="10" fill="#ef4444"/>
    <rect x="15" y="8"  width="2"  height="12" fill="#1c0a00"/>
    <rect x="15" y="9"  width="2"  height="10" fill="#0c0000"/>
  </g>
);

const CharCloak = ({ cloakId }: { cloakId?: number }) => {
  switch (cloakId) {
    case 1:  return <ShadowCloak />; // Cloak Lama
    case 34: return <SurveyCape />;
    case 35: return <HokageCloak />;
    case 36: return <LevitationCloak />;
    case 37: return <DarkCape />;
    case 38: return <SaitamaCape />;
    case 39: return <GutsCape />;
    case 40: return <CrimsonCape />;
    case 41: return <VampireMantle />;
    case 42: return <WinterWolf />;
    default: return null;
  }
};

const CharAccessory = ({ accessoryId }: { accessoryId?: number }) => {
  switch (accessoryId) {
    case 5:  return <DragonAmulet />; // Amulet Lama
    case 43: return <CharOneRing />;
    case 44: return <CharMillennium />;
    case 45: return <CharAgamotto />;
    case 56: return <CharPhilosopher />;
    case 47: return <CharWolfMedal />;
    case 48: return <CharMara />;
    case 49: return <CharBehelit />;
    case 50: return <CharCoreDrill />;
    case 51: return <CharTriforce />;
    default: return null;
  }
};

const RightHandWeapon = ({ weaponId }: { weaponId?: number }) => {
  switch (weaponId) {
    case 2:  return <DemonEdge />;
    default: return <CyanSword />;
    case 9:  return <EnmaKatana />;

    case 10: return <KasakaFang />;
    case 11: return <Elucidator />;
    case 12: return <BusterSword />;
    case 13: return <Zangetsu />;
    case 14: return <Excalibur />;
    case 15: return <DeathScythe />;   // <--- Sabit Soul Eater
    case 16: return <LeviathanAxe />;
  }
};

// ═══════════════════════════════════════════════════════════════
// BODY PARTS — torso + arms rendered per armorId
//
// viewBox: "-4 0 40 32"
// Torso block:  x=12–20  y=10–20
// Left arm:     x=9–12   y=12–20   hand x=8–11  y=20–23
// Right arm:    x=20–23  y=12–20   hand x=21–24 y=20–23
// ═══════════════════════════════════════════════════════════════

/** Default blue tech shirt */
const BodyDefault = () => (
  <>
    {/* Torso */}
    <rect x="12" y="10" width="8" height="10" fill="#2563EB"/>
    <rect x="13" y="11" width="2" height="6"  fill="#60A5FA"/>
    {/* Arms (skin) */}
    <rect x="9"  y="12" width="3" height="8"  fill="#ffdbac"/>
    <rect x="20" y="12" width="3" height="8"  fill="#ffdbac"/>
    {/* Hands */}
    <rect x="8"  y="20" width="3" height="3"  fill="#ffdbac"/>
    <rect x="21" y="20" width="3" height="3"  fill="#ffdbac"/>
  </>
);

/**
 * Knight's Aegis (id=4)
 * Silver plate, gold cross emblem, shoulder pauldrons, plated arms.
 */
const BodyKnightAegis = () => (
  <>
    {/* ── Chest plate ── */}
    <rect x="12" y="10" width="8" height="10" fill="#94a3b8"/>
    {/* Plate shading panels */}
    <rect x="12" y="10" width="4" height="10" fill="#cbd5e1"/>
    <rect x="16" y="10" width="4" height="10" fill="#94a3b8"/>
    {/* Horizontal rib lines */}
    <rect x="12" y="14" width="8" height="1"  fill="#64748b" opacity="0.5"/>
    <rect x="12" y="17" width="8" height="1"  fill="#64748b" opacity="0.4"/>
    {/* Gold top trim */}
    <rect x="12" y="10" width="8" height="1"  fill="#fbbf24"/>
    {/* Gold bottom trim */}
    <rect x="12" y="19" width="8" height="1"  fill="#fbbf24"/>
    {/* Gold center line */}
    <rect x="15" y="10" width="2" height="10" fill="#fbbf24" opacity="0.3"/>
    {/* Gold cross emblem */}
    <rect x="15" y="11" width="2" height="7"  fill="#fbbf24"/>
    <rect x="13" y="13" width="6" height="2"  fill="#fbbf24"/>
    {/* Cross gem center */}
    <rect x="15" y="13" width="2" height="2"  fill="#fef08a"/>

    {/* ── Shoulder pauldrons ── */}
    {/* Left pauldron */}
    <rect x="9"  y="10" width="4" height="3"  fill="#cbd5e1"/>
    <rect x="9"  y="10" width="4" height="1"  fill="#fbbf24"/>
    <rect x="9"  y="12" width="4" height="1"  fill="#fbbf24"/>
    {/* Right pauldron */}
    <rect x="19" y="10" width="4" height="3"  fill="#cbd5e1"/>
    <rect x="19" y="10" width="4" height="1"  fill="#fbbf24"/>
    <rect x="19" y="12" width="4" height="1"  fill="#fbbf24"/>

    {/* ── Plated arms ── */}
    <rect x="9"  y="13" width="3" height="7"  fill="#94a3b8"/>
    <rect x="9"  y="13" width="2" height="7"  fill="#b0bfcc"/>
    <rect x="20" y="13" width="3" height="7"  fill="#94a3b8"/>
    <rect x="21" y="13" width="2" height="7"  fill="#b0bfcc"/>

    {/* ── Gauntlets (hands) ── */}
    <rect x="8"  y="20" width="3" height="3"  fill="#64748b"/>
    <rect x="8"  y="20" width="3" height="1"  fill="#fbbf24"/>
    <rect x="21" y="20" width="3" height="3"  fill="#64748b"/>
    <rect x="21" y="20" width="3" height="1"  fill="#fbbf24"/>
  </>
);

/**
 * Arcane Mage Robe (id=3)
 * Dark navy robe, gold trim bands, star pattern, wide sleeves.
 */
const BodyArcaneRobe = () => (
  <>
    {/* ── Robe body ── */}
    <rect x="11" y="10" width="10" height="10" fill="#1e3a5f"/>
    {/* Robe shading panels */}
    <rect x="12" y="10" width="4" height="10" fill="#1e3a5f"/>
    <rect x="16" y="10" width="4" height="10" fill="#0c1a2e"/>
    {/* Gold trim top */}
    <rect x="11" y="10" width="10" height="1"  fill="#fbbf24"/>
    {/* Gold trim mid band */}
    <rect x="11" y="15" width="10" height="1"  fill="#fbbf24" opacity="0.5"/>
    {/* Gold trim bottom */}
    <rect x="11" y="19" width="10" height="1"  fill="#fbbf24"/>
    {/* Moon brooch */}
    <rect x="15" y="11" width="2" height="1"   fill="#fbbf24"/>
    <rect x="14" y="12" width="1" height="1"   fill="#fbbf24"/>
    {/* Star pattern on robe */}
    <rect x="15" y="13" width="2" height="1"   fill="#7dd3fc"/>
    <rect x="14" y="14" width="1" height="1"   fill="#7dd3fc"/>
    <rect x="17" y="14" width="1" height="1"   fill="#7dd3fc"/>
    <rect x="15" y="15" width="2" height="1"   fill="#7dd3fc"/>
    <rect x="13" y="17" width="1" height="1"   fill="#7dd3fc" opacity="0.5"/>
    <rect x="18" y="17" width="1" height="1"   fill="#7dd3fc" opacity="0.5"/>

    {/* ── Wide robe sleeves ── */}
    {/* Left sleeve */}
    <rect x="8"  y="12" width="4" height="8"  fill="#1e3a5f"/>
    <rect x="8"  y="12" width="4" height="1"  fill="#0c4a6e"/>
    <rect x="8"  y="19" width="4" height="1"  fill="#fbbf24" opacity="0.6"/>
    {/* Right sleeve */}
    <rect x="20" y="12" width="4" height="8"  fill="#0c1a2e"/>
    <rect x="20" y="12" width="4" height="1"  fill="#0c4a6e"/>
    <rect x="20" y="19" width="4" height="1"  fill="#fbbf24" opacity="0.6"/>

    {/* ── Cuff gems ── */}
    <rect x="8"  y="20" width="4" height="3"  fill="#1e3a5f"/>
    <rect x="9"  y="21" width="2" height="1"  fill="#38bdf8"/>
    <rect x="20" y="20" width="4" height="3"  fill="#0c1a2e"/>
    <rect x="21" y="21" width="2" height="1"  fill="#38bdf8"/>
  </>
);

// ─── Armor selector ──────────────────────────────────────────
const CharBody = ({ armorId }: { armorId?: number }) => {
  switch (armorId) {
    case 4:  return <BodyKnightAegis />;
    case 3:  return <BodyArcaneRobe />;
    default: return <BodyDefault />;

    case 17: return <BodyTurtleGi />;
    case 18: return <BodySurveyCorps />;
    case 19: return <BodyAkatsuki />;
    case 20: return <BodyIronArmor />;
    case 21: return <BodyN7Suit />;
    case 22: return <BodyDemonSlayer />;
    case 23: return <BodyJedi />;
    case 24: return <BodyHevSuit />;
  }
};

// ═══════════════════════════════════════════════════════════════
// HELMET SPRITES  (drawn over head, y=3–10)
// ═══════════════════════════════════════════════════════════════

/** Phoenix Helm (id=8) — drawn on head, replaces hair area */
const PhoenixHelm = () => (
  <>
    {/* Flame plume */}
    <rect x="15" y="1"  width="2" height="2" fill="#fef08a"/>
    <rect x="14" y="3"  width="4" height="2" fill="#fde047"/>
    <rect x="13" y="3"  width="1" height="2" fill="#fbbf24" opacity="0.7"/>
    <rect x="18" y="3"  width="1" height="2" fill="#fbbf24" opacity="0.7"/>
    <rect x="13" y="5"  width="6" height="2" fill="#f97316"/>
    <rect x="12" y="5"  width="1" height="2" fill="#ea580c" opacity="0.7"/>
    <rect x="19" y="5"  width="1" height="2" fill="#ea580c" opacity="0.7"/>
    {/* Inner flame bright */}
    <rect x="15" y="2"  width="2" height="4" fill="#fff7ed" opacity="0.7"/>
    {/* Helm dome — sits over hair (y=5–9) */}
    <rect x="11" y="5"  width="10" height="5" fill="#78350f"/>
    <rect x="11" y="5"  width="10" height="1" fill="#fbbf24"/>
    <rect x="12" y="6"  width="8"  height="4" fill="#92400e"/>
    {/* Visor slits */}
    <rect x="13" y="8"  width="3"  height="1" fill="#f97316"/>
    <rect x="16" y="8"  width="3"  height="1" fill="#f97316"/>
    {/* Phoenix wing emblem */}
    <rect x="13" y="6"  width="2"  height="2" fill="#f97316" opacity="0.7"/>
    <rect x="17" y="6"  width="2"  height="2" fill="#f97316" opacity="0.7"/>
    <rect x="15" y="6"  width="2"  height="3" fill="#fbbf24"/>
    {/* Gold trim bottom of helm */}
    <rect x="11" y="9"  width="10" height="1" fill="#fbbf24"/>
    {/* Cheek guards */}
    <rect x="10" y="9"  width="2"  height="3" fill="#78350f"/>
    <rect x="10" y="9"  width="1"  height="3" fill="#fbbf24" opacity="0.4"/>
    <rect x="20" y="9"  width="2"  height="3" fill="#78350f"/>
    <rect x="21" y="9"  width="1"  height="3" fill="#fbbf24" opacity="0.4"/>
  </>
);

// ─── Helmet selector ─────────────────────────────────────────
const CharHelmet = ({ helmetId }: { helmetId?: number }) => {
  switch (helmetId) {
    case 8:  return <PhoenixHelm />;
    default: return null; // no helmet → show normal hair (drawn in base head)

    case 25: return <IronHelm />;
    case 26: return <StrawHat />;
    case 27: return <HiddenLeaf />;
    case 28: return <InosukeHelm />;
    case 29: return <VaderHelm />;
    case 30: return <SpartanHelm />;
    case 31: return <SaitamaBald />;
    case 32: return <HollowMaskIcon />;
    case 33: return <GordonGlasses />;
  }
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

const RightArm = ({ armorId }: { armorId?: number }) => {
  switch (armorId) {
    default: return <><rect x="20" y="12" width="3" height="8" fill="#ffdbac"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 3: return <><rect x="20" y="12" width="4" height="8" fill="#0c1a2e"/><rect x="20" y="12" width="4" height="1" fill="#0c4a6e"/><rect x="20" y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/><rect x="20" y="20" width="4" height="3" fill="#0c1a2e"/><rect x="21" y="21" width="2" height="1" fill="#38bdf8"/></>;
    case 4: return <><rect x="20" y="12" width="3" height="8" fill="#94a3b8"/><rect x="21" y="12" width="2" height="8" fill="#b0bfcc"/><rect x="21" y="20" width="3" height="3" fill="#64748b"/><rect x="21" y="20" width="3" height="1" fill="#fbbf24"/></>;

    case 17: return <><rect x="20" y="12" width="3" height="3" fill="#ea580c"/><rect x="20" y="15" width="3" height="5" fill="#ffdbac"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 18: return <><rect x="20" y="12" width="3" height="8" fill="#78350f"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 19: return <><rect x="20" y="12" width="3" height="8" fill="#0f172a"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 10: return <><rect x="20" y="12" width="3" height="8" fill="#dc2626"/><rect x="20" y="14" width="3" height="2" fill="#fbbf24"/><rect x="21" y="20" width="3" height="3" fill="#b91c1c"/></>;
    case 21: return <><rect x="20" y="12" width="3" height="8" fill="#1e293b"/><rect x="21" y="20" width="3" height="3" fill="#334155"/></>;
    case 22: return <><rect x="20" y="12" width="3" height="8" fill="#166534"/><rect x="20" y="14" width="3" height="2" fill="#0f172a"/><rect x="20" y="18" width="3" height="2" fill="#0f172a"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 23: return <><rect x="20" y="12" width="3" height="8" fill="#78350f"/><rect x="21" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 24: return <><rect x="20" y="12" width="3" height="3" fill="#f97316"/><rect x="20" y="15" width="3" height="5" fill="#0f172a"/><rect x="21" y="20" width="3" height="3" fill="#334155"/></>;
  }
};

const LeftArm = ({ armorId }: { armorId?: number }) => {
  switch (armorId) {
    default: return <><rect x="9" y="12" width="3" height="8" fill="#ffdbac"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 4: return <><rect x="9" y="12" width="3" height="8" fill="#94a3b8"/><rect x="9" y="12" width="2" height="8" fill="#b0bfcc"/><rect x="8" y="20" width="3" height="3" fill="#64748b"/><rect x="8" y="20" width="3" height="1" fill="#fbbf24"/></>;
    case 3: return <><rect x="8" y="12" width="4" height="8" fill="#1e3a5f"/><rect x="8" y="12" width="4" height="1" fill="#0c4a6e"/><rect x="8" y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/><rect x="8" y="20" width="4" height="3" fill="#1e3a5f"/><rect x="9" y="21" width="2" height="1" fill="#38bdf8"/></>;

    case 17: return <><rect x="9" y="12" width="3" height="3" fill="#ea580c"/><rect x="9" y="15" width="3" height="5" fill="#ffdbac"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 18: return <><rect x="9" y="12" width="3" height="8" fill="#78350f"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 19: return <><rect x="9" y="12" width="3" height="8" fill="#0f172a"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 20: return <><rect x="9" y="12" width="3" height="8" fill="#dc2626"/><rect x="9" y="14" width="3" height="2" fill="#fbbf24"/><rect x="8" y="20" width="3" height="3" fill="#b91c1c"/></>;
    case 21: return <><rect x="9" y="12" width="3" height="8" fill="#1e293b"/><rect x="8" y="20" width="3" height="3" fill="#334155"/></>;
    case 22: return <><rect x="9" y="12" width="3" height="8" fill="#166534"/><rect x="9" y="14" width="3" height="2" fill="#0f172a"/><rect x="9" y="18" width="3" height="2" fill="#0f172a"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 23: return <><rect x="9" y="12" width="3" height="8" fill="#78350f"/><rect x="8" y="20" width="3" height="3" fill="#ffdbac"/></>;
    case 24: return <><rect x="9" y="12" width="3" height="3" fill="#f97316"/><rect x="9" y="15" width="3" height="5" fill="#0f172a"/><rect x="8" y="20" width="3" height="3" fill="#334155"/></>;
  }
};

export default function Technomancer({ weaponId, armorId, helmetId, cloakId, accessoryId }: TechnomancerProps) {
  const hasBow      = weaponId === 7;
  const hasHelmet   = !!helmetId;

  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg
        width="200" height="200"
        viewBox="-4 0 40 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Ground shadow */}
        <rect x="8" y="29" width="16" height="2" fill="#000" fillOpacity="0.4"/>

        {/* ══════════════════ BOUNCE GROUP ══════════════════ */}
        <g>
          <animateTransform
            attributeName="transform" type="translate"
            values="0,0; 0,1; 0,0"
            dur="0.8s" repeatCount="indefinite" calcMode="discrete"
          />

          {/* Character outline */}
          <path
            d="M11 5 H21 V10 H22 V12 H24 V20 H25 V23 H23 V20 H22 V28 H18 V24 H14 V28 H10 V20 H9 V23 H7 V20 H8 V12 H10 V10 H11 V5 Z M8 20 H11 V24 H8 V20 Z"
            fill="black"
          />

          {/* ── CLOAK ── */}
          <CharCloak cloakId={cloakId} />

          {/* ── HEAD ──────────────────────────────────────── */}
          {/* Face (always shown) */}
          <rect x="12" y="6" width="8" height="5" fill="#ffdbac"/>

          {/* Brown hair — hidden when helmet is on */}
          {!hasHelmet && (
            <>
              <path d="M12 5 H20 V7 H19 V8 H13 V7 H12 V5 Z" fill="#451A03"/>
              <rect x="11" y="6" width="1" height="3" fill="#451A03"/>
              <rect x="20" y="6" width="1" height="3" fill="#451A03"/>
            </>
          )}

          {/* Helmet sprite (drawn over head) */}
          <CharHelmet helmetId={helmetId}/>

          {/* Eyes — blink animation */}
          <rect x="13" y="8" width="2" height="1" fill="black">
            <animate attributeName="height" values="1;1;1;1;1;1;1;1;1;0;1;1" dur="4s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect x="17" y="8" width="2" height="1" fill="black">
            <animate attributeName="height" values="1;1;1;1;1;1;1;1;1;0;1;1" dur="4s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>

          {/* ── BODY (armor-aware) ────────────────────────── */}
          {/*
            CharBody renders: torso, both arms, both hands.
            Arms are included inside so Knight pauldrons /
            Robe sleeves sit correctly on the base geometry.
            The arm animation groups below only rotate
            the limbs — body pixels follow because they live
            inside the same bounce <g>.
          */}
          <CharBody armorId={armorId}/>

          {/* ══ RIGHT ARM rotation ══ */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              values="-4 22 12; 3 22 12; -4 22 12"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            <RightArm armorId={armorId} />
            {!hasBow && <RightHandWeapon weaponId={weaponId}/>}
          </g>

          {/* ══ LEFT ARM rotation ══ */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              values="3 10 12; -4 10 12; 3 10 12"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            <LeftArm armorId={armorId} />
            {hasBow && <VoidBow/>}
          </g>

          {/* ══ LEGS (alternating walk) ══ */}
          <g>
            <animateTransform
              attributeName="transform" type="translate"
              values="0,0; 0,-1; 0,0"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            <rect x="18" y="20" width="3" height="4" fill="#0f172a"/>
          </g>
          <g>
            <animateTransform
              attributeName="transform" type="translate"
              values="0,-1; 0,0; 0,-1"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            <rect x="11" y="20" width="3" height="4" fill="#0f172a"/>
          </g>

          {/* ── ACCESSORY ── */}
          <CharAccessory accessoryId={accessoryId} />

        </g>{/* end bounce group */}
      </svg>
    </div>
  );
}
