import React from 'react';

export const HeroIntro: React.FC = () => {
  return (
    <div className="hi" aria-hidden="true">
      <div className="hi-stage">
        <div className="hi-logo">
          <img src="/src/assets/icon/logo.png" alt="" draggable={false} />
          <span className="hi-glare" />
          <span className="hi-shine" />
        </div>
        <div className="hi-tag">Security &amp; Network Systems</div>
      </div>
    </div>
  );
};
