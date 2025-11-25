export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp?: Date;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => TerminalLine[];
  aliases?: string[];
}

export interface Theme {
  name: string;
  bg: string;
  text: string;
  prompt: string;
  input: string;
  error: string;
  success: string;
  info: string;
  border: string;
}
