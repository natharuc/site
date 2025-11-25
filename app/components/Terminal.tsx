'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { TerminalLine } from '../types/terminal';
import { commands, getCommand } from '../config/commands';
import { themes, themeNames } from '../config/themes';

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = themes[currentTheme];

  useEffect(() => {
    // Mensagem de boas-vindas
    const welcomeMessages: TerminalLine[] = [
      { type: 'output', content: '' },
      { type: 'info', content: '╔════════════════════════════════════════════════════════════╗' },
      { type: 'info', content: '║           BEM-VINDO AO TERMINAL PORTFOLIO                  ║' },
      { type: 'info', content: '╚════════════════════════════════════════════════════════════╝' },
      { type: 'output', content: '' },
      { type: 'success', content: '👋 Olá! Eu sou um desenvolvedor apaixonado por tecnologia.' },
      { type: 'output', content: '' },
      { type: 'info', content: '💡 Digite "help" ou "man" para ver todos os comandos disponíveis.' },
      { type: 'info', content: '🎨 Digite "theme" para ver temas disponíveis.' },
      { type: 'output', content: '' },
    ];
    setHistory(welcomeMessages);
  }, []);

  useEffect(() => {
    // Auto-scroll para o final
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus no input ao carregar
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Adiciona comando ao histórico
    const newHistory = [...commandHistory, trimmedCmd];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    // Adiciona comando à tela
    setHistory(prev => [...prev, { type: 'input', content: `$ ${trimmedCmd}` }]);

    // Parse comando e argumentos
    const parts = trimmedCmd.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Comandos especiais
    if (commandName === 'clear' || commandName === 'cls') {
      setHistory([]);
      return;
    }

    if (commandName === 'theme' && args.length > 0) {
      const themeName = args[0].toLowerCase();
      if (themeNames.includes(themeName)) {
        setCurrentTheme(themeName);
        setHistory(prev => [...prev, { type: 'success', content: `🎨 Tema "${themeName}" aplicado!` }]);
        return;
      } else {
        setHistory(prev => [...prev, { type: 'error', content: `❌ Tema "${themeName}" não encontrado!` }]);
        return;
      }
    }

    // Busca comando
    const command = getCommand(commandName);

    if (command) {
      // Comando especial para matrix
      if (commandName === 'matrix' || commandName === 'neo') {
        setCurrentTheme('matrix');
      }

      const output = command.execute(args);
      setHistory(prev => [...prev, ...output]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `❌ Comando não encontrado: ${commandName}` },
        { type: 'info', content: '💡 Digite "help" para ver os comandos disponíveis.' },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input && suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setInput('');
      setSuggestions([]);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    // Auto-complete
    if (value) {
      const matches = Object.keys(commands).filter(cmd =>
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return theme.input;
      case 'error':
        return theme.error;
      case 'success':
        return theme.success;
      case 'info':
        return theme.info;
      default:
        return theme.text;
    }
  };

  return (
    <div
      className="min-h-screen w-full p-4 font-mono flex items-center justify-center"
      style={{ backgroundColor: theme.bg }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden"
        style={{
          border: `2px solid ${theme.border}`,
          backgroundColor: theme.bg,
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: theme.text }}
          >
            terminal@portfolio:~$
          </div>
          <div
            className="text-xs"
            style={{ color: theme.info }}
          >
            {theme.name}
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-4 h-[600px] overflow-y-auto custom-scrollbar"
          style={{ backgroundColor: theme.bg }}
        >
          {/* History */}
          {history.map((line, index) => (
            <div
              key={index}
              className="mb-1 whitespace-pre-wrap break-words"
              style={{ color: getLineColor(line.type) }}
            >
              {line.content}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center gap-2">
            <span style={{ color: theme.prompt }} className="font-bold">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-white"
              style={{ color: theme.input }}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && input && (
            <div className="mt-2 text-sm opacity-60" style={{ color: theme.info }}>
              💡 Sugestões: {suggestions.join(', ')}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 text-xs border-t"
          style={{ borderColor: theme.border, color: theme.info }}
        >
          <div className="flex justify-between items-center">
            <span>Pressione TAB para autocompletar | ↑↓ para histórico</span>
            <span>ESC para limpar</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme.bg};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme.border};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme.prompt};
        }
      `}</style>
    </div>
  );
}
