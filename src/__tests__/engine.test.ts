/**
 * @jest-environment jsdom
 */

import { DevosaurusEngine } from '../core/engine';

describe('DevosaurusEngine', () => {
  const mockStart = jest.fn();
  const mockStop = jest.fn();
  
  const mockSpeechRecognition = jest.fn().mockImplementation(() => {
    return {
      continuous: false,
      lang: '',
      interimResults: false,
      maxAlternatives: 1,
      start: mockStart,
      stop: mockStop,
      onstart: null,
      onend: null,
      onresult: null,
      onerror: null,
    };
  });

  beforeAll(() => {
    // Mock window.SpeechRecognition
    Object.defineProperty(window, 'SpeechRecognition', {
      writable: true,
      value: mockSpeechRecognition,
    });
    
    Object.defineProperty(window, 'webkitSpeechRecognition', {
      writable: true,
      value: mockSpeechRecognition,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    const engine = new DevosaurusEngine();
    expect(engine).toBeInstanceOf(DevosaurusEngine);
  });

  it('should accept configuration options', () => {
    const config = {
      language: 'en-US',
      showUI: false,
    };
    
    const engine = new DevosaurusEngine(config);
    expect(mockSpeechRecognition).toHaveBeenCalled();
  });

  it('should register commands', () => {
    const engine = new DevosaurusEngine();
    
    const testAction = jest.fn();
    engine.addCommand('test', ['test phrase'], testAction);
    
    const commands = engine.getCommands();
    expect(commands).toHaveLength(1);
    expect(commands[0]).toEqual({
      id: 'test',
      phrases: ['test phrase'],
      action: testAction,
    });
  });

  it('should start listening when toggleListening is called with true', () => {
    const engine = new DevosaurusEngine();
    
    // Start listening
    engine.toggleListening(true);
    expect(mockStart).toHaveBeenCalled();
  });

  it('should stop listening when toggleListening is called with false', () => {
    const engine = new DevosaurusEngine();
    
    // Manually set the isListening state to true to simulate that listening has started
    // This simulates what happens when onstart event is fired
    (engine as any).isListening = true;
    
    // Stop listening
    engine.toggleListening(false);
    expect(mockStop).toHaveBeenCalled();
  });
});