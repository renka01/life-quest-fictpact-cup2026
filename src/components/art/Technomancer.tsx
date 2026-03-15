"use client";
import React from 'react';

interface TechnomancerProps {
  weaponId?: number;
  armorId?:  number;
  helmetId?: number;
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

const RightHandWeapon = ({ weaponId }: { weaponId?: number }) => {
  switch (weaponId) {
    case 2:  return <DemonEdge />;
    default: return <CyanSword />;
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
  }
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function Technomancer({ weaponId, armorId, helmetId }: TechnomancerProps) {
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

          {/* ══ RIGHT ARM rotation (shoulder pivot 22,12) ══
               Weapon is a child → swings with the arm.
               We need to RE-DRAW the right arm pixels here
               so the rotation affects them. CharBody drew the
               "static rest" arm for reference shape only —
               we set it transparent-ish and let the animated
               group win visually.                             */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              values="-4 22 12; 3 22 12; -4 22 12"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            {/* Arm pixels matching current armor */}
            {armorId === 4 ? (
              // Knight plated arm
              <>
                <rect x="20" y="12" width="3" height="8" fill="#94a3b8"/>
                <rect x="21" y="12" width="2" height="8" fill="#b0bfcc"/>
                <rect x="21" y="20" width="3" height="3" fill="#64748b"/>
                <rect x="21" y="20" width="3" height="1" fill="#fbbf24"/>
              </>
            ) : armorId === 3 ? (
              // Mage robe sleeve
              <>
                <rect x="20" y="12" width="4" height="8" fill="#0c1a2e"/>
                <rect x="20" y="12" width="4" height="1" fill="#0c4a6e"/>
                <rect x="20" y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/>
                <rect x="20" y="20" width="4" height="3" fill="#0c1a2e"/>
                <rect x="21" y="21" width="2" height="1" fill="#38bdf8"/>
              </>
            ) : (
              // Default skin arm
              <>
                <rect x="20" y="12" width="3" height="8" fill="#ffdbac"/>
                <rect x="21" y="20" width="3" height="3" fill="#ffdbac"/>
              </>
            )}
            {/* Sword weapon in right hand */}
            {!hasBow && <RightHandWeapon weaponId={weaponId}/>}
          </g>

          {/* ══ LEFT ARM rotation (shoulder pivot 10,12) ══ */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              values="3 10 12; -4 10 12; 3 10 12"
              dur="0.8s" repeatCount="indefinite" calcMode="discrete"
            />
            {armorId === 4 ? (
              <>
                <rect x="9"  y="12" width="3" height="8" fill="#94a3b8"/>
                <rect x="9"  y="12" width="2" height="8" fill="#b0bfcc"/>
                <rect x="8"  y="20" width="3" height="3" fill="#64748b"/>
                <rect x="8"  y="20" width="3" height="1" fill="#fbbf24"/>
              </>
            ) : armorId === 3 ? (
              <>
                <rect x="8"  y="12" width="4" height="8" fill="#1e3a5f"/>
                <rect x="8"  y="12" width="4" height="1" fill="#0c4a6e"/>
                <rect x="8"  y="19" width="4" height="1" fill="#fbbf24" opacity="0.6"/>
                <rect x="8"  y="20" width="4" height="3" fill="#1e3a5f"/>
                <rect x="9"  y="21" width="2" height="1" fill="#38bdf8"/>
              </>
            ) : (
              <>
                <rect x="9"  y="12" width="3" height="8" fill="#ffdbac"/>
                <rect x="8"  y="20" width="3" height="3" fill="#ffdbac"/>
              </>
            )}
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

        </g>{/* end bounce group */}
      </svg>
    </div>
  );
}
