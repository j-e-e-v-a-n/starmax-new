import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

export const QuickContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed right-4 sm:right-6 z-40 print:hidden"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {isOpen && (
        <div className="mb-3 w-72 bg-white border border-rule p-2 shadow-[0_24px_50px_-28px_rgba(10,35,66,0.5)]" style={{ borderRadius: 2 }}>
          <div className="flex items-center justify-between px-2.5 py-2 border-b border-rule">
            <span className="text-[13px] font-semibold text-navy">Quick Connect</span>
            <span className="text-[11px] text-blue font-medium">Starmax Systems</span>
          </div>

          <a
            href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}
            className="flex items-center gap-3 p-2.5 hover:bg-mist text-xs transition-colors"
            style={{ borderRadius: 2 }}
          >
            <span className="w-8 h-8 flex items-center justify-center shrink-0 bg-blue text-white" style={{ borderRadius: 2 }}>
              <Phone className="w-4 h-4" />
            </span>
            <span>
              <span className="block font-semibold text-navy">Call Starmax</span>
              <span className="text-[11px] text-muted">{COMPANY_INFO.contacts.primaryPhone}</span>
            </span>
          </a>

          <a
            href={`https://wa.me/919995433366?text=${encodeURIComponent("Hello Starmax Systems, I would like to enquire about your security and automation systems.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 hover:bg-mist text-xs transition-colors"
            style={{ borderRadius: 2 }}
          >
            <span className="w-8 h-8 flex items-center justify-center shrink-0 bg-[#1faf52] text-white" style={{ borderRadius: 2 }}>
              <MessageCircle className="w-4 h-4" />
            </span>
            <span>
              <span className="block font-semibold text-navy">WhatsApp Chat</span>
              <span className="text-[11px] text-muted">Instant message enquiry</span>
            </span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.contacts.generalEmail}`}
            className="flex items-center gap-3 p-2.5 hover:bg-mist text-xs transition-colors"
            style={{ borderRadius: 2 }}
          >
            <span className="w-8 h-8 flex items-center justify-center shrink-0 bg-navy text-white" style={{ borderRadius: 2 }}>
              <Mail className="w-4 h-4" />
            </span>
            <span>
              <span className="block font-semibold text-navy">Email Us</span>
              <span className="text-[11px] text-muted truncate block max-w-[150px]">
                {COMPANY_INFO.contacts.generalEmail}
              </span>
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 flex items-center justify-center bg-blue text-white border border-blue hover:bg-blue-dark transition-colors focus-visible:outline-none ml-auto"
        style={{ borderRadius: 2 }}
        aria-label={isOpen ? 'Close quick contact menu' : 'Open quick contact menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
