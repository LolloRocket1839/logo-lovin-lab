import { TFunction } from 'i18next';

// Shared type for translation function
export type TranslateFunction = TFunction<'translation', undefined>;

// Common form validation error messages
export interface FormValidationMessages {
  nameError: string;
  emailError: string;
  consentError: string;
}

// Analytics event types
export type AnalyticsEventType = 
  | 'page_view'
  | 'click'
  | 'form_submit'
  | 'scroll_depth'
  | 'ab_test_impression'
  | 'ab_test_click';

// Common dialog props
export interface DialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Investment budget ranges
export type InvestmentBudget = 
  | 'under_500'
  | '500_1000'
  | '1000_5000'
  | '5000_10000'
  | 'over_10000';

// University options
export type UniversityOption =
  | 'politecnico'
  | 'unito'
  | 'escp'
  | 'saa'
  | 'iaad'
  | 'conservatorio'
  | 'accademia'
  | 'other';
