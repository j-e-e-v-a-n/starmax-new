import React from 'react';
import {
  BadgeCheck,
  Server,
  Headset,
  ReceiptText,
  Cable,
  Layers,
} from 'lucide-react';

const ADVANTAGES = [
  {
    title: 'Certified integration teams',
    desc: 'Installs are carried out by our own trained technicians, not subcontractors.',
    icon: BadgeCheck,
  },
  {
    title: 'Enterprise-grade hardware',
    desc: 'Equipment selections built for reliable, long-term operation.',
    icon: Server,
  },
  {
    title: 'Rapid local support',
    desc: 'Maintenance and troubleshooting from four Kerala service points.',
    icon: Headset,
  },
  {
    title: 'Transparent, itemized quotes',
    desc: 'Clear proposals listing the exact equipment and costs involved.',
    icon: ReceiptText,
  },
  {
    title: 'Structured, tidy cabling',
    desc: 'Neat cable routing and rack management on every installation.',
    icon: Cable,
  },
  {
    title: 'One coordinated system',
    desc: 'Cameras, access control, gates and intercoms working together.',
    icon: Layers,
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="adv section-pad" id="advantage">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">The Starmax advantage · Reliable · Proven integration</p>
            <h2>Security solutions backed by certified service</h2>
          </div>
          <p className="sub">
            From the first site visit to ongoing maintenance, the same engineering
            standards apply &mdash; whether it is a single camera point or a full
            multi-system installation.
          </p>
        </div>

        <div className="adv-grid">
          {ADVANTAGES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="adv-card" key={item.title}>
                <div className="adv-top">
                  <span className="adv-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="adv-ico" aria-hidden="true">
                    <Icon strokeWidth={1.6} />
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
