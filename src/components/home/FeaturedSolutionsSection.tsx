import React from 'react';
import { motion } from 'framer-motion';

import { ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { Link } from '../../router';


export const FeaturedSolutionsSection: React.FC = () => {
  const highlights = [
    {
      title: 'High-Definition IP CCTV & Video Intelligence',
      subtitle: 'Visual oversight across critical premises',
      desc: 'High-definition IP dome and bullet camera architectures with dedicated Network Video Recorders (NVR), night-vision illumination, and coverage configured for commercial and residential safety.',
      image: '/src/assets/images/cctv_ip_systems_1791638488951.jpg',
      link: '/services/ip-cctv-systems',
      linkText: 'Explore IP CCTV Systems'
    },
    {
      title: 'Access Control & Biometric Attendance Terminals',
      subtitle: 'Regulated physical entry & verifiable attendance',
      desc: 'Eliminate mechanical key vulnerabilities with optical biometric fingerprint readers, smart card credentials, EM door locks, and synchronized time-and-attendance clocking systems.',
      image: '/src/assets/images/access_control_biometric_1791638461654.jpg',
      link: '/services/access-control-systems',
      linkText: 'Explore Access Control & Attendance'
    },
    {
      title: 'Motorized Automatic Gates & Perimeter Automation',
      subtitle: 'Motorized perimeter vehicular & pedestrian control',
      desc: 'Heavy-duty electromechanical sliding and swing gate motors, safety photo-beams, boom barriers, and video door phone integration for seamless perimeter security management.',
      image: '/src/assets/images/automatic_sliding_gate_1791638440556.jpg',
      link: '/services/automatic-gates',
      linkText: 'Explore Automatic Gates'
    }
  ];

  return (
    <section
      className="cv-auto py-16 sm:py-24 lg:py-28 relative overflow-hidden border-b border-[#dde5ee]/80"
      style={{
        background: 'linear-gradient(180deg, #EDF7FF 0%, #FFFFFF 50%, #F8FBFF 100%)',
      }}
    >
      {/* Background Micro-Dots & Ambient Glow */}

      <div
        className="blob-soft top-10 left-10 w-96 h-96 z-0"
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#10264D] tracking-[-0.03em] leading-[1.12] font-sans text-balance">
            Featured Security &amp; Automation Systems
          </h2>

          <p className="mt-3 text-base sm:text-[18px] text-[#4f6072] leading-[1.7] font-normal">
            Key solution categories engineered for continuous durability, intuitive operation, and technical longevity across Kerala.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {highlights.map((item, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 bg-white border border-[#dde5ee] shadow-[0_4px_20px_rgba(11,99,214,0.04)] hover:border-[#0b63d6] hover:shadow-[0_16px_36px_rgba(11,99,214,0.12)] transition-all duration-300 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#dde5ee] shadow-xs bg-slate-100 h-48 sm:h-64 lg:h-80 group relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3 bg-[#10264D]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-white font-bold border border-white/20">
                      SOLUTION 0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-3 sm:space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#0b63d6] uppercase tracking-[0.16em]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0b63d6]" />
                    <span>{item.subtitle}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#10264D] font-sans tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-base text-[#4f6072] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-2">
                    <Link to={item.link}>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2.5 h-[48px] px-6 rounded-full bg-[#0b63d6] hover:bg-[#0754b8] text-white text-[14px] font-semibold transition-all shadow-[0_4px_14px_rgba(11,99,214,0.25)] hover:shadow-[0_6px_20px_rgba(11,99,214,0.35)] cursor-pointer"
                      >
                        <span>{item.linkText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
