import React, { useState } from 'react';
import { Activity, Camera, CheckCircle2, Eye, Sliders } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

type ChannelKey = 'cctv' | 'gate' | 'biometric';

interface ChannelData {
  id: ChannelKey;
  channelTag: string;
  title: string;
  hardware: string;
  image: string;
  status: 'ONLINE' | 'ARMED';
  metrics: {
    label: string;
    value: string;
  }[];
  notes: string;
}

const CHANNELS: ChannelData[] = [
  {
    id: 'cctv',
    channelTag: 'CH-01',
    title: '4K IP Ultra-HD Surveillance',
    hardware: 'Uniview / Hikvision 8MP ColorVu Turret',
    image: '/src/assets/images/hero_security_cctv_1791638420546.jpg',
    status: 'ONLINE',
    metrics: [
      { label: 'RESOLUTION', value: '3840×2160 (8MP)' },
      { label: 'FRAME RATE', value: '25.0 FPS / H.265+' },
      { label: 'BITRATE', value: '6,144 kbps' },
      { label: 'NIGHT VISION', value: '0.0005 Lux Color' },
      { label: 'BACKBONE', value: 'Armored Single-Mode Fiber' },
      { label: 'SURGE ISOLATION', value: '10kA Lightning Arrester' }
    ],
    notes: 'Configured for Kerala coastal salt-fog & heavy monsoon downpours.'
  },
  {
    id: 'gate',
    channelTag: 'CH-02',
    title: 'Heavy-Duty Motorized Gate Relay',
    hardware: 'Roger Technology (Italy) Brushless 24V',
    image: '/src/assets/images/automatic_sliding_gate_1791638440556.jpg',
    status: 'ARMED',
    metrics: [
      { label: 'CAPACITY RATING', value: '1,400 kg Leaf Capacity' },
      { label: 'RELAY STATUS', value: 'Latched & Secured' },
      { label: 'SAFETY PHOTOCELLS', value: 'Dual Infrared Beam Active' },
      { label: 'OBSTACLE BRAKE', value: '0.1s Instant Reverse' },
      { label: 'CYCLE COUNT', value: '142 / 1,200 Daily Max' },
      { label: 'FAIL-SAFE BACKUP', value: 'Manual Mechanical Key' }
    ],
    notes: 'Continuous commercial duty cycle with anti-corrosion gear rack.'
  },
  {
    id: 'biometric',
    channelTag: 'CH-03',
    title: 'Biometric Access & Time-Attendance',
    hardware: 'eSSL Multi-Biometric Face & Fingerprint Terminal',
    image: '/src/assets/images/access_control_biometric_1791638461654.jpg',
    status: 'ONLINE',
    metrics: [
      { label: 'SCAN LATENCY', value: '0.18 sec Facial Match' },
      { label: 'EM LOCK FORCE', value: '600 lbs Holding Force' },
      { label: 'FIRE INTERLOCK', value: 'Emergency Release Armed' },
      { label: 'COMM PROTOCOL', value: 'TCP/IP Wiegand Out' },
      { label: 'ENROLLMENT', value: '3,000 Verified Profiles' },
      { label: 'LOG SYNC', value: 'Automated Payroll Export' }
    ],
    notes: 'Tamper-proof physical access barrier with synchronized audit logs.'
  }
];

export const SecurityOperationsConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChannelKey>('cctv');
  const [nightVisionActive, setNightVisionActive] = useState(false);
  const [motionGridActive, setMotionGridActive] = useState(false);
  const [pingCount, setPingCount] = useState(1);

  const activeChannel = CHANNELS.find((c) => c.id === activeTab) || CHANNELS[0];

  const handleSimulateAction = () => {
    setPingCount((prev) => prev + 1);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xl overflow-hidden">
      {/* Console Header Bar */}
      <div className="bg-[#0B2545] text-white px-4 sm:px-5 py-3 border-b border-[#10264D] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold tracking-wider text-slate-100">
            STARMAX FIELD OPERATIONS CONSOLE
          </span>
          <span className="hidden sm:inline text-slate-400">·</span>
          <span className="hidden sm:inline text-slate-300 font-semibold">
            KADAVANTHRA HQ
          </span>
        </div>

        <div className="font-mono text-[11px] text-sky-200 flex items-center gap-3">
          <span className="bg-[#003865] px-2 py-0.5 rounded border border-[#0754b8]">
            GSTIN: {COMPANY_INFO.tax.gstin}
          </span>
        </div>
      </div>

      {/* Channel Switcher Tabs (Asymmetric Engineering Selector) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 bg-[#F1F5F9] border-b border-[#CBD5E1] text-xs">
        {CHANNELS.map((ch) => {
          const isActive = ch.id === activeTab;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveTab(ch.id)}
              className={`px-3 py-3 font-mono text-left transition-all cursor-pointer flex flex-col gap-0.5 border-r border-[#CBD5E1] last:border-r-0 ${
                isActive
                  ? 'bg-white text-[#0B2545] font-bold border-b-2 border-b-[#005A9E] shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className={isActive ? 'text-[#005A9E] font-bold' : 'text-slate-500'}>
                  {ch.channelTag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              </div>
              <span className="truncate font-sans font-semibold text-xs text-slate-800">
                {ch.id === 'cctv' && '4K IP CCTV'}
                {ch.id === 'gate' && 'Roger Auto Gate'}
                {ch.id === 'biometric' && 'Biometric Access'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Preview Screen */}
      <div className="relative bg-slate-900 aspect-16/10 sm:aspect-16/9 overflow-hidden">
        <img
          src={activeChannel.image}
          alt={activeChannel.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            nightVisionActive ? 'brightness-125 contrast-125 filter grayscale' : ''
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Motion Grid Overlay Simulation */}
        {motionGridActive && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to right, #00FF66 1px, transparent 1px), linear-gradient(to bottom, #00FF66 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        )}

        {/* Live Top HUD Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="bg-[#0B2545]/95 text-white text-[11px] font-mono px-2.5 py-1 rounded border border-white/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-bold tracking-wider">LIVE SYSTEM STATUS</span>
            <span className="text-slate-300">|</span>
            <span>{activeChannel.channelTag}</span>
          </div>

          <div className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            STATUS: {activeChannel.status}
          </div>
        </div>

        {/* Live Bottom HUD Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0B2545]/95 text-white p-2.5 rounded-lg border border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
          <div className="truncate">
            <span className="text-amber-400 font-bold">{activeChannel.hardware}</span>
          </div>
          <div className="text-slate-300 text-[10px] hidden sm:block">
            LATENCY: 14ms · PING #{pingCount}
          </div>
        </div>
      </div>

      {/* Interactive Hardware Diagnostics & Specs Strip */}
      <div className="p-4 sm:p-5 bg-white space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-[#0B2545] text-sm sm:text-base font-sans flex items-center gap-2">
              <span>{activeChannel.title}</span>
            </h3>
            <span className="text-[11px] font-mono text-[#005A9E] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#CBD5E1] font-semibold">
              FIELD VERIFIED
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {activeChannel.notes}
          </p>
        </div>

        {/* Metric Grid - High Contrast 3 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
          {activeChannel.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-2 rounded bg-[#f6f8fb] border border-[#E2E8F0] flex flex-col justify-between"
            >
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                {m.label}
              </span>
              <span className="font-bold text-[#0B2545] text-[11px] sm:text-xs truncate mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Live Interactive Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {activeTab === 'cctv' && (
              <>
                <button
                  type="button"
                  onClick={() => setNightVisionActive(!nightVisionActive)}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    nightVisionActive
                      ? 'bg-[#0B2545] text-white border-[#0B2545]'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{nightVisionActive ? 'Night Vision: ON' : 'Test Low-Light Mode'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMotionGridActive(!motionGridActive)}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    motionGridActive
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{motionGridActive ? 'Grid: ACTIVE' : 'Motion Zones'}</span>
                </button>
              </>
            )}

            {activeTab !== 'cctv' && (
              <button
                type="button"
                onClick={handleSimulateAction}
                className="px-3 py-1.5 rounded text-xs font-mono font-semibold bg-[#0B2545] text-white hover:bg-[#003865] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ping Device Status</span>
              </button>
            )}
          </div>

          <div className="text-[11px] font-sans text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#005A9E]" />
            <span>Kochi Local Field Support Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
