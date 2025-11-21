export interface IWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

export type CommandAction = () => void | Promise<void>;

export interface Command {
  id: string;
  phrases: string[];
  action: CommandAction;
  description?: string;
}

export interface DevosaurusConfig {
  language?: string;
  activationKey?: string;
  showUI?: boolean;
}
