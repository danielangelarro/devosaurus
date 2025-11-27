/**
 * @jest-environment jsdom
 */

import { Actions } from '../presets';

describe('Devosaurus Presets', () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
  });

  describe('DOM Actions', () => {
    it('should create a click action function', () => {
      const clickAction = Actions.click('.test-button');
      expect(typeof clickAction).toBe('function');
    });

    it('should create a type action function', () => {
      const typeAction = Actions.type('#test-input', 'test value');
      expect(typeof typeAction).toBe('function');
    });

    it('should create a toggleBodyClass action function', () => {
      const toggleAction = Actions.toggleBodyClass('test-class');
      expect(typeof toggleAction).toBe('function');
    });
  });

  describe('Navigation Actions', () => {
    it('should create a goTo action function', () => {
      const goToAction = Actions.goTo('/test');
      expect(typeof goToAction).toBe('function');
    });

    it('should create a reload action function', () => {
      const reloadAction = Actions.reload();
      expect(typeof reloadAction).toBe('function');
    });

    it('should create a goBack action function', () => {
      const goBackAction = Actions.goBack();
      expect(typeof goBackAction).toBe('function');
    });
  });

  describe('Storage Actions', () => {
    it('should create a clear action function', () => {
      const clearAction = Actions.clear();
      expect(typeof clearAction).toBe('function');
    });

    it('should create a logItem action function', () => {
      const logAction = Actions.logItem('test-key');
      expect(typeof logAction).toBe('function');
    });
  });
});