import React from 'react';

interface StarmaxLogoProps {
  className?: string;
}

export const StarmaxLogo: React.FC<StarmaxLogoProps> = ({ className = '' }) => {
  return (
    <img
      src="/src/assets/icon/logo.png"
      alt="Starmax Systems"
      className={`starmax-logo ${className}`.trim()}
    />
  );
};
