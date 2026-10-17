import React from 'react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[460px] lg:h-[520px] xl:h-[540px] select-none">
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#0E141E]/12 bg-[#0E141E] shadow-[0_12px_40px_-12px_rgba(14,20,30,0.2)] group">
        <img
          src="/src/assets/images/starmax_hero_security_1792150497189.jpg"
          alt="Starmax commercial facility security installation"
          className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-300 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
          decoding="async"
        />
      </div>
    </div>
  );
};
