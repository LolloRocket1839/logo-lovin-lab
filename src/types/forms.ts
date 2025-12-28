export interface FormSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormData {
  email: string;
  name?: string;
  phone?: string;
  message?: string;
}

export interface SellerLeadFormData {
  email: string;
  phone?: string;
  property_zone?: string;
  property_sqm?: number;
  num_rooms?: number;
  num_bathrooms?: number;
  has_terrace?: boolean;
  has_cellar?: boolean;
  property_condition?: string;
  estimated_value?: number;
  property_address?: string;
}

export interface InvestorLeadFormData {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  investor_type: string;
  investment_amount_range: string;
  investment_timeline: string;
  accredited_investor: string;
  areas_of_interest: string[];
  investment_experience?: string;
  heard_about?: string;
  additional_comments?: string;
  consents_to_contact?: boolean;
  consents_to_data_processing?: boolean;
  consents_to_fadp?: boolean;
  understands_no_commitment?: boolean;
}

export interface WaitlistFormData {
  email: string;
  type: 'student' | 'investor' | 'general';
  language?: string;
}
