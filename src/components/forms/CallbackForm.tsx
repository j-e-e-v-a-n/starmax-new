import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/button';
import { SERVICES } from '../../data/services';
import { submitCallbackRequest } from '../../lib/api';

interface CallbackFormProps {
  onSuccess?: () => void;
  defaultService?: string;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({ onSuccess, defaultService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: defaultService || SERVICES[0].title,
    preferredTime: 'Morning (9:00 AM - 1:00 PM)',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const serviceOptions = SERVICES.map((s) => ({
    value: s.title,
    label: s.title
  }));

  const timeOptions = [
    { value: 'Morning (9:00 AM - 1:00 PM)', label: 'Morning (9:00 AM - 1:00 PM)' },
    { value: 'Afternoon (1:00 PM - 5:00 PM)', label: 'Afternoon (1:00 PM - 5:00 PM)' },
    { value: 'Evening (5:00 PM - 8:00 PM)', label: 'Evening (5:00 PM - 8:00 PM)' },
    { value: 'Any Time', label: 'Any Time during business hours' }
  ];

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
    if (!formData.consent) {
      errs.consent = 'You must acknowledge the contact request';
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
      const res = await submitCallbackRequest(formData);
      setStatusMessage({ type: 'success', text: res.message });
      if (onSuccess) {
        setTimeout(onSuccess, 2200);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit callback request. Please try again.';
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Eldho Mathew"
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
          placeholder="name@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Select
          label="Service Interested In"
          required
          options={serviceOptions}
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        />
      </div>

      <Select
        label="Preferred Contact Time"
        options={timeOptions}
        value={formData.preferredTime}
        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
      />

      <Textarea
        label="Message / Specific Requirements (Optional)"
        rows={3}
        placeholder="Tell us about your premises, gate type, or camera requirements..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="callback-consent"
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded-[2px] border-rule text-blue accent-[#1a3bb0] focus:ring-blue"
        />
        <label htmlFor="callback-consent" className="text-xs text-muted leading-relaxed">
          I consent to Starmax Systems contacting me by phone or email regarding this enquiry.
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
        >
          Request a Callback
        </Button>
      </div>
    </form>
  );
};
