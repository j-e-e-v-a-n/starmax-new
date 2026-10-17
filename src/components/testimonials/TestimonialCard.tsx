import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, User } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`bg-white rounded-[2px] p-6 border border-rule hover:border-blue transition-colors duration-300 flex flex-col justify-between relative overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="text-[12px] font-semibold text-navy ml-1">5.0</span>
          </div>

          <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1f8a4c] bg-[#eef8f1] border border-[#cfe9d8] px-2 py-0.5 rounded-[2px]">
            <ShieldCheck className="w-3 h-3 shrink-0" />
            <span>Verified</span>
          </div>
        </div>

        <blockquote className="text-[15.5px] text-navy leading-[1.6] font-display">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <div className="pt-5 mt-5 border-t border-rule flex items-center gap-3">
        <div className="relative shrink-0">
          {!imgError && testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name || 'Client photo'}
              onError={() => setImgError(true)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[2px] object-cover bg-mist border border-rule"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[2px] bg-navy text-white flex items-center justify-center font-semibold text-sm">
              {testimonial.name ? getInitials(testimonial.name) : <User className="w-4 h-4 text-white" />}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-sans font-semibold text-navy text-[15px] tracking-normal leading-snug truncate">
            {testimonial.name || 'Verified Client'}
          </h3>
          {testimonial.clientReference && (
            <div className="text-[12px] font-medium text-blue truncate">
              {testimonial.clientReference}
            </div>
          )}
          {testimonial.context && (
            <div className="text-[11px] text-muted flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-2.5 h-2.5 text-muted shrink-0" />
              <span className="truncate">{testimonial.context}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
