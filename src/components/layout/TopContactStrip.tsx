import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

export const TopContactStrip: React.FC = () => {
  return (
    <div className="hidden md:block bg-mist border-b border-rule text-muted text-[13px]">
      <div className="container-x">
        <div className="flex items-center justify-between h-10">
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue shrink-0" />
            <span>Kadavanthra, Kochi</span>
          </span>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_INFO.contacts.primaryPhoneRaw}`}
              className="flex items-center gap-2 font-medium text-navy hover:text-blue transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue shrink-0" />
              <span>{COMPANY_INFO.contacts.primaryPhone}</span>
            </a>
            <span className="text-rule">|</span>
            <a
              href={`mailto:${COMPANY_INFO.contacts.generalEmail}`}
              className="flex items-center gap-2 hover:text-blue transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue shrink-0" />
              <span>{COMPANY_INFO.contacts.generalEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
