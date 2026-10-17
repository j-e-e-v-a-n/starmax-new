import React from 'react';

/**
 * Small interface/service icons used across the site.
 * Kept in a dedicated module so edits to Icons.tsx (hero artwork) cannot
 * remove them. All glyphs inherit currentColor.
 */

export const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DomeIcon: React.FC = () => (
  <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <path d="M34 78a46 46 0 0 1 92 0" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 78h108" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="80" cy="70" r="15" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="80" cy="70" r="5" fill="currentColor" />
    <path d="M40 78v7M120 78v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const TerminalIcon: React.FC = () => (
  <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <rect x="56" y="14" width="48" height="92" rx="9" stroke="currentColor" strokeWidth="2.5" />
    <path d="M66 70V62a14 14 0 0 1 28 0v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M73 70V63a7 7 0 0 1 14 0v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="80" cy="70" r="2.2" fill="currentColor" />
    <path d="M68 92h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const GateIcon: React.FC = () => (
  <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <path
      d="M22 96h112M30 96V50M46 96V50M62 96V50M78 96V50M94 96V50M110 96V50M126 96V50"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M26 62h100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M134 30h18M146 23l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RackIcon: React.FC = () => (
  <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <rect x="52" y="12" width="56" height="96" rx="6" stroke="currentColor" strokeWidth="2.5" />
    <path d="M52 36h56M52 60h56M52 84h56" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="64" cy="24" r="2.2" fill="currentColor" />
    <circle cx="64" cy="48" r="2.2" fill="currentColor" />
    <circle cx="64" cy="72" r="2.2" fill="currentColor" />
    <circle cx="64" cy="96" r="2.2" fill="currentColor" />
    <path
      d="M78 24h22M78 48h22M78 72h22M78 96h22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
