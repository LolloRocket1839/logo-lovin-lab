/**
 * Unit tests for constants barrel exports
 * Verifies that all constant exports are accessible and correctly defined
 */

import { describe, it, expect } from 'vitest';

// Import all constants from barrel export
import * as Constants from './index';

describe('Constants Barrel Export', () => {
  describe('Contacts', () => {
    it('should export CONTACTS object', () => {
      expect(Constants.CONTACTS).toBeDefined();
      expect(Constants.CONTACTS.lorenzo).toBeDefined();
      expect(Constants.CONTACTS.lorenzo.phone).toBe('+393319053037');
      expect(Constants.CONTACTS.lorenzo.name).toBe('Lorenzo');
      expect(Constants.CONTACTS.email).toBe('junglerententeprise@gmail.com');
    });

    it('should export MESSAGES object with all categories', () => {
      expect(Constants.MESSAGES).toBeDefined();
      expect(Constants.MESSAGES.student).toBeDefined();
      expect(Constants.MESSAGES.investor).toBeDefined();
      expect(Constants.MESSAGES.general).toBeDefined();
      expect(Constants.MESSAGES.tourist).toBeDefined();
      expect(Constants.MESSAGES.quickContact).toBeDefined();
    });

    it('should have working message generators', () => {
      const studentMessage = Constants.MESSAGES.student.whatsapp.it('Lorenzo');
      expect(studentMessage).toContain('Lorenzo');
      expect(studentMessage).toContain('JungleRent');

      const quickMessage = Constants.MESSAGES.quickContact.whatsapp.en('Lorenzo');
      expect(quickMessage).toContain('Jungle Rent');
    });

    it('should export helper functions', () => {
      expect(typeof Constants.openWhatsApp).toBe('function');
      expect(typeof Constants.openEmail).toBe('function');
      expect(typeof Constants.openGeneralEmail).toBe('function');
      expect(typeof Constants.openQuickContact).toBe('function');
      expect(typeof Constants.openSMS).toBe('function');
      expect(typeof Constants.openQuickContactWithFallback).toBe('function');
    });

    it('should export SupportedLanguage type', () => {
      const langs: Constants.SupportedLanguage[] = ['it', 'en', 'es', 'fr', 'de'];
      expect(langs).toHaveLength(5);
    });
  });

  describe('Turin Areas', () => {
    it('should export turinAreas array', () => {
      expect(Constants.turinAreas).toBeDefined();
      expect(Array.isArray(Constants.turinAreas)).toBe(true);
      expect(Constants.turinAreas.length).toBeGreaterThan(0);
    });

    it('should have correct structure for each area', () => {
      const area = Constants.turinAreas[0];
      expect(area.name).toBeDefined();
      expect(area.keywords).toBeDefined();
      expect(Array.isArray(area.keywords)).toBe(true);
      expect(area.distance).toBeDefined();
      expect(area.distance.polito).toBeDefined();
      expect(area.distance.unito).toBeDefined();
      expect(area.characteristics).toBeDefined();
      expect(area.avgRent).toBeDefined();
      expect(area.transport).toBeDefined();
      expect(area.description.it).toBeDefined();
      expect(area.description.en).toBeDefined();
    });

    it('should include key Turin neighborhoods', () => {
      const areaNames = Constants.turinAreas.map(a => a.name);
      expect(areaNames).toContain('San Salvario');
      expect(areaNames).toContain('Crocetta');
      expect(areaNames).toContain('Centro');
      expect(areaNames).toContain('Vanchiglia');
    });

    it('should export detectArea function', () => {
      expect(typeof Constants.detectArea).toBe('function');
    });

    it('detectArea should find correct area by keyword', () => {
      const result = Constants.detectArea('vorrei vivere a san salvario');
      expect(result).not.toBeNull();
      expect(result?.name).toBe('San Salvario');
    });

    it('detectArea should return null for unknown area', () => {
      const result = Constants.detectArea('random text without area');
      expect(result).toBeNull();
    });

    it('should export AreaInfo interface', () => {
      const area: Constants.AreaInfo = {
        name: 'Test',
        keywords: ['test'],
        distance: { polito: '10 min', unito: '15 min' },
        characteristics: ['test'],
        avgRent: '400€',
        transport: 'Bus',
        description: { it: 'Test IT', en: 'Test EN' },
      };
      expect(area.name).toBe('Test');
    });
  });

  describe('Formspree Endpoints', () => {
    it('should export FORMSPREE_ENDPOINTS object', () => {
      expect(Constants.FORMSPREE_ENDPOINTS).toBeDefined();
    });

    it('should have all required endpoints', () => {
      expect(Constants.FORMSPREE_ENDPOINTS.main).toBeDefined();
      expect(Constants.FORMSPREE_ENDPOINTS.exitIntent).toBeDefined();
      expect(Constants.FORMSPREE_ENDPOINTS.waitlist).toBeDefined();
      expect(Constants.FORMSPREE_ENDPOINTS.quickSeller).toBeDefined();
      expect(Constants.FORMSPREE_ENDPOINTS.quickInvestor).toBeDefined();
      expect(Constants.FORMSPREE_ENDPOINTS.student).toBeDefined();
    });

    it('should have valid formspree URLs', () => {
      const endpoints = Object.values(Constants.FORMSPREE_ENDPOINTS);
      endpoints.forEach(endpoint => {
        expect(endpoint).toMatch(/^https:\/\/formspree\.io\/f\//);
      });
    });

    it('main and alias endpoints should be consistent', () => {
      expect(Constants.FORMSPREE_ENDPOINTS.waitlist).toBe(Constants.FORMSPREE_ENDPOINTS.main);
      expect(Constants.FORMSPREE_ENDPOINTS.quickSeller).toBe(Constants.FORMSPREE_ENDPOINTS.main);
      expect(Constants.FORMSPREE_ENDPOINTS.quickInvestor).toBe(Constants.FORMSPREE_ENDPOINTS.main);
      expect(Constants.FORMSPREE_ENDPOINTS.student).toBe(Constants.FORMSPREE_ENDPOINTS.main);
    });

    it('exitIntent should have different endpoint', () => {
      expect(Constants.FORMSPREE_ENDPOINTS.exitIntent).not.toBe(Constants.FORMSPREE_ENDPOINTS.main);
    });
  });
});
