import { IWindow, Command, DevosaurusConfig } from './types';
import { Overlay } from '../ui/overlay';

export class DevosaurusEngine {
  private recognition: any;
  private isListening: boolean = false;
  private commands: Command[] = [];
  private overlay?: Overlay;
  private config: DevosaurusConfig;

  constructor(config: DevosaurusConfig = {}) {
    this.config = config;
    const win = window as unknown as IWindow;
    
    // 1. Configuración Cross-Browser
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('%c🦖 Devosaurus: Tu navegador no soporta Speech API.', 'color: red; font-weight: bold');
      return;
    }

    // 2. Inicialización del Reconocimiento
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false; // Se detiene al detectar una frase completa
    this.recognition.lang = config.language || 'es-ES';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    // 3. Setup
    this.setupEvents();

    if (config.showUI !== false) {
      this.overlay = new Overlay(() => this.toggleListening());
    }
    
    console.log('%c🦖 Devosaurus Inicializado', 'color: #4caf50; font-weight: bold');
  }

  /**
   * Configura los listeners de la API nativa de voz
   */
  private setupEvents() {
    this.recognition.onstart = () => {
      this.isListening = true;
      this.overlay?.setListening(true);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.overlay?.setListening(false);
    };

    this.recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log(`%c🦖 Oído: "${transcript}"`, 'color: #2196f3');
      
      await this.processCommand(transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.warn('🦖 Error de reconocimiento:', event.error);
      
      if (event.error === 'no-speech') {
        this.overlay?.showFeedback('🔇 No te oí');
      } else if (event.error === 'not-allowed') {
        this.overlay?.showFeedback('🚫 Micrófono bloqueado');
      } else {
        this.overlay?.showFeedback('❌ Error');
      }
      
      this.toggleListening(false);
    };
  }

  /**
   * Procesa el texto recibido y busca coincidencias en el registro
   */
  private async processCommand(transcript: string) {
    // Buscamos el comando que contenga alguna de las frases activadoras
    const command = this.commands.find(cmd => 
      cmd.phrases.some(phrase => transcript.includes(phrase.toLowerCase()))
    );

    if (command) {
      await this.executeAction(command);
    } else {
      this.overlay?.showFeedback('❓ No entendido');
    }
  }

  /**
   * Ejecuta la acción del comando controlando asincronía y errores
   */
  private async executeAction(command: Command) {
    this.overlay?.showFeedback(`✅ ${command.id}`);
    
    try {
      // Soportamos tanto funciones síncronas como Promesas (async)
      const result = command.action();
      
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error(`🦖 Error ejecutando comando "${command.id}":`, error);
      this.overlay?.showFeedback('⚠️ Falló la acción');
      alert(`Error en comando [${command.id}]: Ver consola.`);
    }
  }

  // --- API PÚBLICA ---

  /**
   * Inicia o detiene la escucha
   */
  public toggleListening(forceState?: boolean) {
    const newState = forceState !== undefined ? forceState : !this.isListening;
    
    if (newState === this.isListening) return;

    if (newState) {
      try {
        this.recognition.start();
      } catch (e) {
        // Ignorar error si ya estaba iniciado
      }
    } else {
      this.recognition.stop();
    }
  }

  /**
   * Registra un nuevo comando en el motor
   * @param id Nombre identificativo del comando (para feedback visual)
   * @param phrases Array de frases que activan el comando
   * @param action Función a ejecutar (puede ser async o venir de un Preset)
   */
  public addCommand(id: string, phrases: string[], action: () => void | Promise<void>) {
    this.commands.push({ id, phrases, action });
  }

  /**
   * Retorna la lista de comandos registrados (útil para debugging o UI de ayuda)
   */
  public getCommands() {
    return this.commands;
  }
}