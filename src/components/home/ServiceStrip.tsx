import React from 'react';
import { Camera, Radar, Cpu, Volume2 } from 'lucide-react';

const PILLARS = [
  {
    title: 'Surveillance & Security',
    desc: 'CCTV and IP camera surveillance, with maintenance.',
    icon: Camera,
  },
  {
    title: 'Access Control & Attendance',
    desc: 'Biometric entry and attendance management.',
    icon: Radar,
  },
  {
    title: 'Automation & Infrastructure',
    desc: 'Home automation and network infrastructure.',
    icon: Cpu,
  },
  {
    title: 'Audio Systems',
    desc: 'Commercial sound and speaker integration.',
    icon: Volume2,
  },
];

export const ServiceStrip: React.FC = () => {
  return (
    <div className="pillars" id="pillars">
      <div className="container-x pillars-inner">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div className="pillar" key={p.title}>
              <span className="p-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
