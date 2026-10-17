import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, UploadCloud, FileText, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/button';
import { submitCareerApplication } from '../../lib/api';

export const CareerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nationality: 'Indian',
    presentAddress: '',
    dateOfBirth: '',
    maritalStatus: 'Single',
    educationalQualification: '',
    consent: true
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const maritalOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Restrict formats: PDF, DOC, DOCX
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      setFileError('Invalid file type. Please upload a PDF or Word document (.pdf, .doc, .docx).');
      setSelectedFile(null);
      return;
    }

    // Restrict size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('File size exceeds the 5MB limit. Please upload a smaller file.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.educationalQualification.trim()) {
      errs.educationalQualification = 'Educational qualification is required';
    }
    if (!selectedFile) {
      errs.resume = 'Please attach your Resume/CV (PDF or DOC format)';
    }
    if (!formData.consent) {
      errs.consent = 'You must give consent to process your application details';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0 && !fileError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await submitCareerApplication(
        {
          ...formData,
          resumeFileName: selectedFile?.name
        },
        selectedFile
      );
      setStatusMessage({ type: 'success', text: res.message });
      setFormData({
        fullName: '',
        email: '',
        nationality: 'Indian',
        presentAddress: '',
        dateOfBirth: '',
        maritalStatus: 'Single',
        educationalQualification: '',
        consent: true
      });
      removeFile();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please check your information and try again.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
          placeholder="e.g. Anand Varghese"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
        />

        <Input
          label="Email Address"
          type="email"
          required
          placeholder="e.g. anand@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Nationality"
          placeholder="e.g. Indian"
          value={formData.nationality}
          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />

        <Select
          label="Marital Status"
          options={maritalOptions}
          value={formData.maritalStatus}
          onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
        />
      </div>

      <Input
        label="Educational Qualification"
        required
        placeholder="e.g. B.Tech in Electronics / Diploma in Electrical / ITI"
        value={formData.educationalQualification}
        onChange={(e) => setFormData({ ...formData, educationalQualification: e.target.value })}
        error={errors.educationalQualification}
      />

      <Textarea
        label="Present Address"
        rows={3}
        placeholder="City, District, State, Pincode"
        value={formData.presentAddress}
        onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
      />

      {/* CV / Resume Upload */}
      <div>
        <label className="block text-[13px] font-semibold text-navy mb-1.5">
          Resume / CV Document <span className="text-red-500">*</span>
        </label>
        
        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-[2px] p-6 text-center cursor-pointer transition-colors ${
              errors.resume || fileError
                ? 'border-red-300 bg-red-50/40'
                : 'border-rule hover:border-blue bg-mist'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <UploadCloud className="w-8 h-8 text-blue mx-auto mb-2" />
            <p className="text-sm font-semibold text-navy">
              Click to upload your CV
            </p>
            <p className="text-xs text-muted mt-1">
              Supports PDF, DOC, or DOCX (Max 5 MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-mist border border-rule rounded-[2px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-blue text-white flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1.5 rounded-[2px] text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {(errors.resume || fileError) && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">
            {fileError || errors.resume}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="career-consent"
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded-[2px] border-rule text-blue accent-[#1a3bb0] focus:ring-blue"
        />
        <label htmlFor="career-consent" className="text-xs text-muted leading-relaxed">
          I consent to Starmax Systems retaining and processing my educational qualifications and CV document for evaluating prospective employment opportunities.
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
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
};
