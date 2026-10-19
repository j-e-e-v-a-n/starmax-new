export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  whatIsIt: string;
  applications: string[];
  capabilities: string[];
  benefits: string[];
  relatedServices: string[];
  ctaText: string;
}

export interface ClientItem {
  id: string;
  name: string;
  industry?: string;
  logo?: string;
  image?: string;
  active?: boolean;
}

export interface TestimonialItem {
  id: string;
  name?: string;
  avatar?: string;
  quote: string;
  clientReference?: string;
  context?: string;
  rating?: number;
  active?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cctv' | 'gates' | 'access' | 'tracking' | 'equipment' | 'booster';
  categoryLabel: string;
  image: string;
  caption: string;
  active?: boolean;
}

export interface CallbackRequest {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredTime: string;
  message?: string;
  consent: boolean;
}

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface ServiceEnquiryRequest {
  fullName: string;
  phone: string;
  email: string;
  company?: string;
  service: string;
  location: string;
  message: string;
  consent: boolean;
}

export interface CareerApplication {
  fullName: string;
  email: string;
  educationalQualification: string;
  resumeFileName?: string;
  consent: boolean;
}
