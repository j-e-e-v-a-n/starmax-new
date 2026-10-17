import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/button';
import { submitServiceEnquiry } from '../../lib/api';

interface ServiceEnquiryFormProps {
  serviceTitle: string;
}

export const ServiceEnquiryForm: React.FC<ServiceEnquiryFormProps> = ({ serviceTitle }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    service: serviceTitle,
    location: '',
    message: '',
    consent: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.location.trim()) {
      errs.location = 'Project area / site location is required';
    }
    if (!formData.consent) {
      errs.consent = 'You must agree to the processing of your enquiry details';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await submitServiceEnquiry({
        ...formData,
        service: serviceTitle
      });
      setStatusMessage({ type: 'success', text: res.message });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        service: serviceTitle,
        location: '',
        message: '',
        consent: true
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit enquiry. Please try again.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2px] border border-rule p-6 lg:p-8">
      <div className="mb-6">
        <div className="font-tech text-[12px] font-semibold uppercase tracking-[0.14em] text-blue mb-2">
          Direct Consultation
        </div>
        <h3 className="text-xl font-normal text-navy font-display">
          Enquire About {serviceTitle}
        </h3>
        <p className="text-[13px] text-muted mt-2">
          Share your premises specifications or project scope for technical guidance and quotations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {statusMessage && (
          <div
            className={`p-4 rounded-[2px] flex items-start gap-3 text-sm ${
              statusMessage.type === 'success'
                ? 'bg-[#eef8f1] text-[#1f6b45] border border-[#cfe9d8]'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
            role="alert"
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Selected Service readonly field to ensure clarity */}
        <div>
          <label className="block text-[13px] font-semibold text-navy mb-1.5">
            Service Required
          </label>
          <input
            type="text"
            readOnly
            value={serviceTitle}
            className="w-full px-3.5 py-3 text-[15px] bg-mist text-navy font-semibold rounded-[2px] border border-rule cursor-not-allowed select-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
          />

          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="+91 99954 33366"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="name@organization.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Input
            label="Company / Establishment (Optional)"
            placeholder="e.g. Skyline Apartments"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <Input
          label="Location / Project Area"
          required
          placeholder="e.g. Kadavanthra, Kochi / Calicut / Haripad"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          error={errors.location}
          helperText="Specify the city or district where installation is needed."
        />

        <Textarea
          label="Project Requirements / Notes"
          rows={3}
          placeholder="Provide preliminary details (number of cameras, gate length, vehicle fleet size, etc.)..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />

        <div className="flex items-start gap-2.5 pt-1">
          <input
            id={`enquiry-consent-${serviceTitle.replace(/\s+/g, '-').toLowerCase()}`}
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded-[2px] border-rule text-blue accent-[#1a3bb0] focus:ring-blue"
          />
          <label
            htmlFor={`enquiry-consent-${serviceTitle.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xs text-muted leading-relaxed"
          >
            I consent to Starmax Systems reviewing these details to provide a technical proposal or consultation.
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-red-600 font-medium">{errors.consent}</p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            icon={<Send className="w-4 h-4" />}
          >
            Send Enquiry
          </Button>
        </div>
      </form>
    </div>
  );
};
