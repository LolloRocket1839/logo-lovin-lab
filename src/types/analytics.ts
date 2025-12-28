export interface AnalyticsEvent {
  event_type: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  session_id: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
}

export interface ABTestEvent {
  variation: string;
  cta_type: string;
  event_type: 'impression' | 'click';
  session_id: string;
  page_url?: string;
  user_agent?: string;
}

export interface ABTestResult {
  variation: string;
  cta_type: string;
  impressions: number;
  clicks: number;
  ctr_percentage: number;
}

export interface ScrollDepthData {
  depth: number;
  page_url: string;
  timestamp: number;
}

export interface PageViewData {
  page_url: string;
  page_title: string;
  referrer?: string;
  session_id: string;
}
