import React from 'react';
import { Link } from '../../router';
import { DomeIcon, TerminalIcon, GateIcon } from '../common/AppIcons';

export const FeaturedSection: React.FC = () => {
  return (
    <section className="featured section-pad" id="featured">
      <div className="container-x">
        <div className="head">
          <div>
            <p className="label">
              Integrated architectures · Hardware excellence · Lifetime support
            </p>
            <h2>Featured security and automation systems</h2>
          </div>
          <p className="sub">
            A closer look at the systems we design, install and support across Kerala.
          </p>
        </div>

        <article className="feat">
          <div>
            <p className="label">Visual oversight across critical premises</p>
            <h3>High-definition IP CCTV and video intelligence</h3>
            <p className="sub">
              Dome and bullet cameras with night vision, remote viewing and reliable
              recording, planned around the entry points and sight lines of your site.
            </p>
            <Link to="/services/ip-cctv-systems" className="btn ghost">
              Explore IP CCTV
            </Link>
          </div>
          <div className="panel" role="img" aria-label="Illustration of a dome CCTV camera">
            <DomeIcon />
          </div>
        </article>

        <article className="feat flip">
          <div>
            <p className="label">Controlled access and attendance</p>
            <h3>Biometric access control and time attendance</h3>
            <p className="sub">
              Fingerprint and card readers that control entry, track staff attendance and
              keep secure rooms restricted to authorised personnel.
            </p>
            <Link to="/services/access-control-systems" className="btn ghost">
              Explore access control
            </Link>
          </div>
          <div className="panel" role="img" aria-label="Illustration of a biometric access terminal">
            <TerminalIcon />
          </div>
        </article>

        <article className="feat">
          <div>
            <p className="label">Automated entry and perimeter control</p>
            <h3>Automatic gates and barrier systems</h3>
            <p className="sub">
              Motorised sliding and swing gates with safety sensors and remote control,
              integrated with intercoms and video door phones for complete entry control.
            </p>
            <Link to="/services/automatic-gates" className="btn ghost">
              Explore automated gates
            </Link>
          </div>
          <div className="panel" role="img" aria-label="Illustration of an automatic gate">
            <GateIcon />
          </div>
        </article>
      </div>
    </section>
  );
};
