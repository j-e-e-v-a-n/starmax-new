import React from 'react';

/**
 * Hero artwork: a house with several cameras, an automatic gate, a card reader,
 * a GPS-tracked vehicle, a network node and a speaker.
 * Numbers 1 to 4 match the four pillars (Surveillance, Access and Tracking,
 * Automation and Infrastructure, Audio). Styles are in hero-art.css.
 * The other icon components in your file are unchanged.
 */
export const HeroArt: React.FC = () => (
  <svg
    className="art"
    viewBox="0 120 820 340"
    role="img"
    aria-label="Line drawing of a modern house with several security cameras, an automatic sliding gate, a card reader, a GPS-tracked vehicle, a network node and a speaker"
  >
    <polygon className="cone fade" points="362,222 540,440 330,440" />
    <polygon className="cone fade" points="62,304 14,440 150,440" />
    <polygon className="cone fade" points="606,338 446,440 594,440" />

    <path className="ln draw" pathLength={1} d="M10 440H810" />
    <path className="ln draw heavy" pathLength={1} d="M100 210H372" />
    <path className="ln draw" pathLength={1} d="M60 440V300H330V440" />
    <path className="ln draw" pathLength={1} d="M110 300V210H360V300" />
    <path className="ln draw" pathLength={1} d="M135 232h92v46h-92zM247 232h92v46h-92zM181 232v46M293 232v46" />
    <path className="ln draw" pathLength={1} d="M82 328h120v112M142 328v112M82 384h120" />
    <path className="ln draw" pathLength={1} d="M232 340h46v100M255 340v100" />

    <path className="ln draw" pathLength={1} d="M602 340h12v100h-12zM754 340h12v100h-12z" />
    <path className="ln draw" pathLength={1} d="M618 352H750M618 424H750M618 352v72M750 352v72" />
    <path className="ln draw" pathLength={1} d="M632 352v72M648 352v72M664 352v72M680 352v72M696 352v72M712 352v72M728 352v72" />
    <path className="ln draw" pathLength={1} d="M766 440V396H812V440" />
    <path className="ln draw" pathLength={1} d="M559 388v52M547 440h24" />
    <path className="ln draw" pathLength={1} d="M783 336V396" />
    <path className="ln draw" pathLength={1} d="M374 432v-14c0-4 3-7 7-8l18-4 14-16c2-3 5-4 8-4h26c3 0 6 1 8 4l14 16 18 4c4 1 7 4 7 8v14zM405 406l10-13h40l10 13z" />

    <circle className="wh draw" pathLength={1} cx="403" cy="432" r="8" />
    <circle className="wh draw" pathLength={1} cx="465" cy="432" r="8" />

    <g className="fade">
      <circle className="solid" cx="360" cy="218" r="6" />
      <circle className="solid" cx="62" cy="302" r="6" />
      <circle className="solid" cx="608" cy="336" r="6" />

      <path className="dev" d="M288 372h10v16h-10z" />
      <path className="dev" d="M540 366h38v22h-38z" />
      <circle className="solid" cx="559" cy="377" r="3" />
      <path className="dev" d="M604 396h22v30h-22z" />

      <path className="dev" d="M434 372c-8-9-12-14-12-20a12 12 0 0 1 24 0c0 6-4 11-12 20z" />
      <circle className="solid" cx="434" cy="352" r="4.5" />
      <path className="bl op" d="M423 336a14 14 0 0 1 22 0M417 330a22 22 0 0 1 34 0" />

      <path className="bl" d="M236 210V187" />
      <circle className="solid" cx="236" cy="184" r="3" />
      <path className="bl" d="M229 177A10 10 0 0 1 243 177M223 171A18 18 0 0 1 249 171M218 166A26 26 0 0 1 254 166" />

      <path className="dev" d="M772 318h10l12-8v32l-12-8h-10z" />
      <path className="bl op" d="M800 322a8 8 0 0 1 0 12M806 318a14 14 0 0 1 0 20" />
    </g>
  </svg>
);