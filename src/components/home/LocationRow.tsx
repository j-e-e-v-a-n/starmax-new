import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationRow: React.FC = () => {
  const locations = ['Kochi'];

  return (
    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-sm sm:text-[15px] pt-1">
      {/* Map Pin & Label */}
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#0b63d6] shrink-0" fill="#0b63d6" />
        <span className="font-semibold text-[#10264D] whitespace-nowrap">
          Our Presence
        </span>
      </div>

      {/* Locations with subtle separators */}
      <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-3.5 text-[#4f6072]">
        {locations.map((loc, idx) => (
          <React.Fragment key={loc}>
            <span className="font-normal whitespace-nowrap hover:text-[#0b63d6] transition-colors">
              {loc}
            </span>
            {idx < locations.length - 1 && (
              <span className="text-[#dde5ee] select-none" aria-hidden="true">
                |
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
