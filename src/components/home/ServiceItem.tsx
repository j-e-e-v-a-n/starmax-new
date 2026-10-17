import React from 'react';

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  icon,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 py-4 sm:py-6 px-3 sm:px-4 lg:px-6 transition-colors group ${
        !isLast ? 'sm:border-r border-[#dde5ee]' : ''
      }`}
    >
      {/* Pale Blue Icon Box matching hero theme */}
      <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] lg:w-[62px] lg:h-[62px] rounded-[14px] sm:rounded-[18px] bg-[#eaf2fd] border border-[#dde5ee]/60 flex items-center justify-center text-[#0b63d6] shrink-0 group-hover:scale-105 group-hover:bg-[#0b63d6] group-hover:text-white transition-all duration-300 shadow-xs">
        {icon}
      </div>

      {/* Text Hierarchy */}
      <div className="min-w-0 flex-1">
        <h3 className="text-[13px] sm:text-[15px] lg:text-[16px] font-bold text-[#10264D] tracking-tight leading-snug group-hover:text-[#0b63d6] transition-colors">
          {title}
        </h3>
        <p className="text-[11px] sm:text-[12px] lg:text-[13px] text-[#4f6072] mt-0.5 sm:mt-1 leading-[1.4] font-normal line-clamp-2 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
};
