/**
 * Unit tests for hooks barrel exports
 * Verifies that all hook exports are accessible
 */

import { describe, it, expect } from 'vitest';

// Import all hooks from barrel export
import * as Hooks from './index';

describe('Hooks Barrel Export', () => {
  it('should export useIsMobile hook', () => {
    expect(Hooks.useIsMobile).toBeDefined();
    expect(typeof Hooks.useIsMobile).toBe('function');
  });

  it('should export useToast hook and toast function', () => {
    expect(Hooks.useToast).toBeDefined();
    expect(typeof Hooks.useToast).toBe('function');
    expect(Hooks.toast).toBeDefined();
    expect(typeof Hooks.toast).toBe('function');
  });

  it('should export useABTest hook', () => {
    expect(Hooks.useABTest).toBeDefined();
    expect(typeof Hooks.useABTest).toBe('function');
  });

  it('should export useAnalytics hook', () => {
    expect(Hooks.useAnalytics).toBeDefined();
    expect(typeof Hooks.useAnalytics).toBe('function');
  });

  it('should export usePageViewTracking hook', () => {
    expect(Hooks.usePageViewTracking).toBeDefined();
    expect(typeof Hooks.usePageViewTracking).toBe('function');
  });

  it('should export useBlogLanguage hook', () => {
    expect(Hooks.useBlogLanguage).toBeDefined();
    expect(typeof Hooks.useBlogLanguage).toBe('function');
  });

  it('should export useLocalStorage hook', () => {
    expect(Hooks.useLocalStorage).toBeDefined();
    expect(typeof Hooks.useLocalStorage).toBe('function');
  });

  it('should export useReducedMotion hook', () => {
    expect(Hooks.useReducedMotion).toBeDefined();
    expect(typeof Hooks.useReducedMotion).toBe('function');
  });

  it('should export useScrollDepth hook', () => {
    expect(Hooks.useScrollDepth).toBeDefined();
    expect(typeof Hooks.useScrollDepth).toBe('function');
  });

  it('should export useToolLanguage hook', () => {
    expect(Hooks.useToolLanguage).toBeDefined();
    expect(typeof Hooks.useToolLanguage).toBe('function');
  });

  it('should export useUTMTracking hook and getUTMParams', () => {
    expect(Hooks.useUTMTracking).toBeDefined();
    expect(typeof Hooks.useUTMTracking).toBe('function');
    expect(Hooks.getUTMParams).toBeDefined();
    expect(typeof Hooks.getUTMParams).toBe('function');
  });

  it('should export useValuationCount hook', () => {
    expect(Hooks.useValuationCount).toBeDefined();
    expect(typeof Hooks.useValuationCount).toBe('function');
  });

  it('should export useWaitlistCounter hook', () => {
    expect(Hooks.useWaitlistCounter).toBeDefined();
    expect(typeof Hooks.useWaitlistCounter).toBe('function');
  });

  it('should have exactly 13 exported members', () => {
    const exportedMembers = Object.keys(Hooks);
    expect(exportedMembers).toHaveLength(13);
  });
});
