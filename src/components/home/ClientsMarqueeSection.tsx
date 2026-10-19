import React from 'react';
import { Link } from '../../router';
import { CLIENTS } from '../../data/clients';
import { ClientItem } from '../../types';
import { useSiteContent } from '../../lib/content';

const renderCell = (client: ClientItem, key: string) => {
  const src = client.logo || client.image;
  return (
    <div className="logo-cell" key={key} title={client.name}>
      {src ? (
        <img src={src} alt={client.name} loading="lazy" decoding="async" />
      ) : (
        <span className="logo-name">{client.name}</span>
      )}
    </div>
  );
};

export const ClientsMarqueeSection: React.FC = () => {
  const clients = useSiteContent('clients', CLIENTS);
  const rowA = clients.filter((_, i) => i % 2 === 0);
  const rowB = clients.filter((_, i) => i % 2 === 1);
  const top = [...rowA, ...rowA];
  const bottom = [...rowB, ...rowB];

  return (
    <section className="section-pad" id="clients">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">
              Enterprise clients · Corporate trusts · Kerala installations
            </p>
            <h2>Trusted by top establishments across Kerala</h2>
          </div>
          <div className="side">
            <p className="sub">
              Organisations across healthcare, hospitality, logistics, education and
              retail rely on Starmax Systems for their security and network infrastructure.
            </p>
            <Link to="/clients" className="tlink">
              View client directory
            </Link>
          </div>
        </div>
      </div>

      <div className="logos-marquee" aria-label="Client logos">
        <div className="logos-row">
          <div className="logos-track left">
            {top.map((client, idx) => renderCell(client, `t-${client.id}-${idx}`))}
          </div>
        </div>
        <div className="logos-row">
          <div className="logos-track right">
            {bottom.map((client, idx) => renderCell(client, `b-${client.id}-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
};
