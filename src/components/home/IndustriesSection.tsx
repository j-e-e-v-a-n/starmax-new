import React from 'react';
import {
  Building2,
  Store,
  HeartPulse,
  Warehouse,
  Landmark,
  GraduationCap,
  Building,
  Factory,
} from 'lucide-react';

const ENVIRONMENTS = [
  {
    title: 'Offices & business centres',
    desc: 'Access-controlled entries, visitor oversight and continuous CCTV coverage.',
    icon: Building2,
  },
  {
    title: 'Retail stores & showrooms',
    desc: 'Counter surveillance and coverage of display and storage areas.',
    icon: Store,
  },
  {
    title: 'Clinics & healthcare',
    desc: 'Reception and ward monitoring, restricted access to stores and records.',
    icon: HeartPulse,
  },
  {
    title: 'Logistics & warehouses',
    desc: 'Perimeter and loading-bay coverage with controlled access.',
    icon: Warehouse,
  },
  {
    title: 'Banks & financial premises',
    desc: 'Cash-counter coverage and controlled access to secure rooms.',
    icon: Landmark,
  },
  {
    title: 'Schools & campuses',
    desc: 'Boundary monitoring and controlled access at gates and blocks.',
    icon: GraduationCap,
  },
  {
    title: 'Apartments & villas',
    desc: 'Video door phones, gates and shared-area surveillance.',
    icon: Building,
  },
  {
    title: 'Industrial & factories',
    desc: 'Perimeter gates, high-duty barriers and entry recording.',
    icon: Factory,
  },
];

export const IndustriesSection: React.FC = () => {
  return (
    <section className="section-pad" id="sectors">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">Sector specializations · Proven integrations</p>
            <h2>Security across diverse operating environments</h2>
          </div>
          <p className="sub">
            The same engineering approach applies whether the site is a small office, a
            residence or a working factory floor.
          </p>
        </div>

        <ul className="sector-grid">
          {ENVIRONMENTS.map((env) => {
            const Icon = env.icon;
            return (
              <li className="sector-card" key={env.title}>
                <span className="sector-icon" aria-hidden="true">
                  <Icon strokeWidth={1.6} />
                </span>
                <h3>{env.title}</h3>
                <p>{env.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
