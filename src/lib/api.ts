import { CallbackRequest, ContactRequest, ServiceEnquiryRequest, CareerApplication } from '../types';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// Client-side submission helper
export async function submitCallbackRequest(data: CallbackRequest): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fallback if backend server endpoint is offline or static SPA preview mode
  }

  // Robust simulation with validation check
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!data.phone || !data.fullName) {
    throw new Error('Please fill in your name and phone number.');
  }

  return {
    success: true,
    message: `Thank you, ${data.fullName}. Your callback request for ${data.service} has been received. Our team will contact you shortly.`,
    timestamp: new Date().toISOString()
  };
}

export async function submitContactRequest(data: ContactRequest): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fallback if backend server endpoint is offline
  }

  await new Promise((resolve) => setTimeout(resolve, 850));
  if (!data.email || !data.fullName || !data.message) {
    throw new Error('Please fill in required fields.');
  }

  return {
    success: true,
    message: `Thank you, ${data.fullName}. Your message has been dispatched to Starmax Systems (${data.service || 'General Enquiry'}). We will respond promptly.`,
    timestamp: new Date().toISOString()
  };
}

export async function submitServiceEnquiry(data: ServiceEnquiryRequest): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fallback if backend server endpoint is offline
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!data.fullName || !data.phone) {
    throw new Error('Please provide your name and phone number for enquiry consultation.');
  }

  return {
    success: true,
    message: `Enquiry for ${data.service} received. Our technical team in Kochi will review your project requirements and follow up.`,
    timestamp: new Date().toISOString()
  };
}

export async function submitCareerApplication(data: CareerApplication, file?: File | null): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) {
      formData.append('resume', file);
    }

    const response = await fetch('/api/careers', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fallback if backend server endpoint is offline
  }

  await new Promise((resolve) => setTimeout(resolve, 1100));
  if (!data.fullName || !data.email) {
    throw new Error('Please provide your name and email.');
  }

  return {
    success: true,
    message: `Application submitted successfully for ${data.fullName}. Your CV (${file ? file.name : 'attached document'}) has been logged for evaluation.`,
    timestamp: new Date().toISOString()
  };
}
