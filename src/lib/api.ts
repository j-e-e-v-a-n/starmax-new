import { CallbackRequest, ContactRequest, ServiceEnquiryRequest, CareerApplication } from '../types';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// Client-side submission helper
export async function submitCallbackRequest(data: CallbackRequest): Promise<ApiResponse> {
  let response: Response;
  try {
    response = await fetch('/api/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    throw new Error('Unable to submit your callback request. Please try again shortly.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Unable to save your callback request. Please try again.');
  return result;
}

export async function submitContactRequest(data: ContactRequest): Promise<ApiResponse> {
  let response: Response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    throw new Error('Unable to save your enquiry. Please try again shortly.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Unable to send your enquiry. Please try again.');
  return result;
}

export async function submitServiceEnquiry(data: ServiceEnquiryRequest): Promise<ApiResponse> {
  let response: Response;
  try {
    response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    throw new Error('Unable to submit your service enquiry. Please try again shortly.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Unable to save your service enquiry. Please try again.');
  return result;
}

export async function submitCareerApplication(data: CareerApplication, file?: File | null): Promise<ApiResponse> {
  if (!file) throw new Error('Attach your resume as a PDF, DOC, or DOCX file.');
  let response: Response;
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('resume', file);
    response = await fetch('/api/careers', {
      method: 'POST',
      body: formData
    });
  } catch {
    throw new Error('Unable to submit your application. Please try again shortly.');
  }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'The application could not be submitted. Please try again.');
  return result;
}
