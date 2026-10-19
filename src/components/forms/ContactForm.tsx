import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/button';
import { submitContactRequest } from '../../lib/api';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'General Enquiry',
    subject: '',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const serviceOptions = [
    { value: 'General Corporate Enquiry', label: 'General Corporate Enquiry' },
    { value: 'IP CCTV Systems', label: 'IP CCTV Systems' },
    { value: 'GPS Tracking Systems', label: 'GPS Tracking Systems' },
    { value: 'Access Control Systems', label: 'Access Control Systems' },
    { value: 'Video Door Phone Systems', label: 'Video Door Phone Systems' },
    { value: 'Automatic Gate Systems', label: 'Automatic Gate Systems' },
    { value: 'Intercom and EPABX Systems', label: 'Intercom and EPABX Systems' },
    { value: 'Time and Attendance Systems', label: 'Time and Attendance Systems' },
    { value: 'Home Automation Systems', label: 'Home Automation Systems' },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide your message details';
    }
    if (!formData.consent) {
      errs.consent = 'Consent is required to submit this form';
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
      const res = await submitContactRequest(formData);
      setStatusMessage({ type: 'success', text: res.message });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: 'General Enquiry',
        subject: '',
        message: '',
        consent: false
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while sending your message. Please try again.';
      setStatusMessage({ type: 'error', text: msg });
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
          label="Email Address"
          type="email"
          required
          placeholder="e.g. eldho@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          required
          placeholder="+91 99954 33366"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
        />

        <Input
          label="Company / Organization (Optional)"
          placeholder="e.g. Skyline Builders"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Service Interested In"
          options={serviceOptions}
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        />

        <Input
          label="Subject"
          required
          placeholder="e.g. CCTV & Access Control for Kochi Facility"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          error={errors.subject}
        />
      </div>

      <Textarea
        label="Message"
        required
        rows={4}
        placeholder="Please detail your site location, scope of security requirement, or questions..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
      />

      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="contact-consent"
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded-[2px] border-rule text-blue accent-[#1a3bb0] focus:ring-blue"
        />
        <label htmlFor="contact-consent" className="text-xs text-muted leading-relaxed">
          I consent to Starmax Systems processing my contact information to respond to this commercial enquiry.
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
          className="w-full sm:w-auto"
          isLoading={isLoading}
          icon={<Send className="w-4 h-4" />}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};
