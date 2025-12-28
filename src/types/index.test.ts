/**
 * Unit tests for types barrel exports
 * Verifies that all type exports are accessible and correctly defined
 */

import { describe, it, expect } from 'vitest';

// Import all types from barrel export
import * as Types from './index';

describe('Types Barrel Export', () => {
  describe('Blog Types', () => {
    it('should export FAQ interface', () => {
      const faq: Types.FAQ = {
        question: 'Test question',
        answer: 'Test answer',
      };
      expect(faq.question).toBe('Test question');
      expect(faq.answer).toBe('Test answer');
    });

    it('should export BlogPostTranslation interface', () => {
      const translation: Types.BlogPostTranslation = {
        title: 'Test Title',
        excerpt: 'Test excerpt',
        seo: {
          title: 'SEO Title',
          description: 'SEO Description',
          keywords: ['keyword1', 'keyword2'],
        },
        tags: ['tag1', 'tag2'],
      };
      expect(translation.title).toBe('Test Title');
      expect(translation.seo.keywords).toHaveLength(2);
    });

    it('should export BlogPost interface', () => {
      const post: Types.BlogPost = {
        slug: 'test-post',
        category: 'students',
        date: '2024-01-01',
        author: 'Test Author',
        image: '/test.jpg',
        readTime: 5,
        content: 'test-content',
        translations: {
          it: {
            title: 'Titolo',
            excerpt: 'Estratto',
            seo: { title: '', description: '', keywords: [] },
            tags: [],
          },
          en: {
            title: 'Title',
            excerpt: 'Excerpt',
            seo: { title: '', description: '', keywords: [] },
            tags: [],
          },
        },
      };
      expect(post.slug).toBe('test-post');
      expect(post.category).toBe('students');
    });

    it('should export BlogCategory type', () => {
      const categories: Types.BlogCategory[] = ['all', 'students', 'investors', 'sellers', 'turisti', 'societa'];
      expect(categories).toHaveLength(6);
    });
  });

  describe('AI Testing Types', () => {
    it('should export AITestQuery interface', () => {
      const query: Types.AITestQuery = {
        id: 'test-1',
        category: 'general',
        query: 'Test query',
        language: 'it',
        priority: 'high',
      };
      expect(query.id).toBe('test-1');
      expect(query.language).toBe('it');
    });

    it('should export AIEngineResult interface', () => {
      const result: Types.AIEngineResult = {
        cited: true,
        context: 'Test context',
        position: 1,
      };
      expect(result.cited).toBe(true);
      expect(result.position).toBe(1);
    });

    it('should export TestResult interface', () => {
      const testResult: Types.TestResult = {
        queryId: 'q1',
        date: '2024-01-01',
        chatgpt: { cited: true, context: '' },
        claude: { cited: false, context: '' },
        perplexity: { cited: true, context: '' },
        notes: 'Test notes',
      };
      expect(testResult.queryId).toBe('q1');
    });
  });

  describe('Study Spaces Types', () => {
    it('should export StudySpaceCategory type', () => {
      const categories: Types.StudySpaceCategory[] = [
        'bar', 'biblioteca_nazionale', 'biblioteche_civiche', 
        'edisu', 'politecnico', 'unito', 'campus_diffuso', 
        'coworking', 'parchi', 'polo900'
      ];
      expect(categories).toContain('biblioteca_nazionale');
    });

    it('should export StudySpace interface', () => {
      const space: Types.StudySpace = {
        id: 1,
        category: 'bar',
        name: 'Test Space',
        address: 'Test Address',
        capacity: '50',
        hours: '9-18',
        features: 'wifi, outlets',
      };
      expect(space.name).toBe('Test Space');
    });

    it('should export DetailedStudySpace interface', () => {
      const space: Types.DetailedStudySpace = {
        id: 1,
        name: 'Test Space',
        category: 'biblioteca_nazionale',
        address: 'Test Address',
        coordinates: { lat: 45.0, lng: 7.0 },
        hours: '9-18',
        capacity: '100',
        features: ['wifi', 'outlets'],
        accessibility: true,
        wifi: true,
        powerOutlets: true,
        quietLevel: 'silenzio',
        bookingRequired: false,
      };
      expect(space.coordinates.lat).toBe(45.0);
      expect(space.quietLevel).toBe('silenzio');
    });
  });

  describe('Forms Types', () => {
    it('should export FormSubmitOptions interface', () => {
      const options: Types.FormSubmitOptions = {
        successMessage: 'Success!',
        errorMessage: 'Error!',
        redirectTo: '/thank-you',
      };
      expect(options.successMessage).toBe('Success!');
    });

    it('should export ContactFormData interface', () => {
      const data: Types.ContactFormData = {
        email: 'test@example.com',
        name: 'Test User',
      };
      expect(data.email).toBe('test@example.com');
    });

    it('should export SellerLeadFormData interface', () => {
      const data: Types.SellerLeadFormData = {
        email: 'seller@example.com',
        property_zone: 'centro',
        property_sqm: 100,
        num_rooms: 3,
      };
      expect(data.property_sqm).toBe(100);
    });

    it('should export InvestorLeadFormData interface', () => {
      const data: Types.InvestorLeadFormData = {
        full_name: 'Test Investor',
        email: 'investor@example.com',
        phone: '+39123456789',
        country: 'IT',
        investor_type: 'individual',
        investment_amount_range: '100k-250k',
        investment_timeline: '6-12 months',
        accredited_investor: 'yes',
        areas_of_interest: ['residential', 'commercial'],
      };
      expect(data.areas_of_interest).toContain('residential');
    });

    it('should export WaitlistFormData interface', () => {
      const data: Types.WaitlistFormData = {
        email: 'user@example.com',
        type: 'student',
        language: 'it',
      };
      expect(data.type).toBe('student');
    });
  });

  describe('Analytics Types', () => {
    it('should export AnalyticsEvent interface', () => {
      const event: Types.AnalyticsEvent = {
        event_type: 'page_view',
        page_url: '/test',
        session_id: 'session-123',
      };
      expect(event.event_type).toBe('page_view');
    });

    it('should export ABTestEvent interface', () => {
      const event: Types.ABTestEvent = {
        variation: 'A',
        cta_type: 'button',
        event_type: 'click',
        session_id: 'session-123',
      };
      expect(event.event_type).toBe('click');
    });

    it('should export ABTestResult interface', () => {
      const result: Types.ABTestResult = {
        variation: 'A',
        cta_type: 'button',
        impressions: 100,
        clicks: 10,
        ctr_percentage: 10,
      };
      expect(result.ctr_percentage).toBe(10);
    });

    it('should export ScrollDepthData interface', () => {
      const data: Types.ScrollDepthData = {
        depth: 50,
        page_url: '/test',
        timestamp: Date.now(),
      };
      expect(data.depth).toBe(50);
    });

    it('should export PageViewData interface', () => {
      const data: Types.PageViewData = {
        page_url: '/test',
        page_title: 'Test Page',
        session_id: 'session-123',
      };
      expect(data.page_title).toBe('Test Page');
    });
  });
});
