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
  const [currentTheme, setCurrentTheme] = useState('dracula');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
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
      { type: 'success', content: 'Olá! Eu sou um desenvolvedor apaixonado por tecnologia.' },
      { type: 'output', content: '' },
      { type: 'info', content: 'Digite "help" ou "man" para ver todos os comandos disponíveis.' },
      { type: 'info', content: 'Digite "theme" para ver temas disponíveis.' },
      { type: 'output', content: '' },
    ];
    setHistory(welcomeMessages);
  }, []);

  useEffect(() => {
    // Auto-scroll para o final
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, suggestions, input]);

  useEffect(() => {
    // Focus no input ao carregar
    inputRef.current?.focus();
  }, []);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd || isProcessing) return;

    // Adiciona comando ao histórico
    const newHistory = [...commandHistory, trimmedCmd];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    // Adiciona comando à tela
    setHistory(prev => [...prev, { type: 'input', content: `> ${trimmedCmd}` }]);

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
        setHistory(prev => [...prev, { type: 'success', content: `Tema "${themeName}" aplicado!` }]);
        return;
      } else {
        setHistory(prev => [...prev, { type: 'error', content: `Tema "${themeName}" não encontrado!` }]);
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

      // Comandos com loading animado
      if (commandName === 'hack' || commandName === 'hacker') {
        setIsProcessing(true);
        await executeHackCommand();
        setIsProcessing(false);
      } else {
        const output = command.execute(args);
        setHistory(prev => [...prev, ...output]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Comando não encontrado: ${commandName}` },
        { type: 'info', content: 'Digite "help" para ver os comandos disponíveis.' },
      ]);
    }
  };

  const executeHackCommand = async () => {
    const addLine = (content: string, type: TerminalLine['type'] = 'output', delay = 100) => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type, content }]);
          resolve();
        }, delay);
      });
    };

    // Início
    await addLine('', 'output', 200);
    await addLine('═══════════════════════════════════════════════════════════', 'info', 100);
    await addLine('  INICIANDO PROTOCOLO DE ACESSO NÃO AUTORIZADO', 'error', 100);
    await addLine('═══════════════════════════════════════════════════════════', 'info', 100);
    await addLine('', 'output', 300);
    
    // Fase 1: Scanning
    await addLine('[SCANNING] Procurando vulnerabilidades...', 'info', 200);
    await addLine('  ▓░░░░░░░░░ 10%', 'output', 300);
    await addLine('  ▓▓░░░░░░░░ 25%', 'output', 300);
    await addLine('  ▓▓▓▓░░░░░░ 45%', 'output', 300);
    await addLine('  ▓▓▓▓▓▓░░░░ 65%', 'output', 300);
    await addLine('  ▓▓▓▓▓▓▓▓░░ 85%', 'output', 300);
    await addLine('  ▓▓▓▓▓▓▓▓▓▓ 100%', 'success', 300);
    await addLine('', 'output', 200);
    await addLine('[SUCCESS] 3 vulnerabilidades encontradas!', 'success', 100);
    await addLine('  └─ Port 22: SSH (OpenSSH 7.4)', 'output', 150);
    await addLine('  └─ Port 80: HTTP (Apache 2.4.29)', 'output', 150);
    await addLine('  └─ Port 443: HTTPS (SSL/TLS)', 'output', 150);
    await addLine('', 'output', 400);
    
    // Fase 2: Exploiting
    await addLine('[EXPLOIT] Tentando explorar Port 22...', 'info', 200);
    await addLine('  ▓▓▓░░░░░░░ 30%', 'output', 500);
    await addLine('[ERROR] Conexão recusada!', 'error', 100);
    await addLine('[RETRY] Tentando exploit alternativo...', 'info', 300);
    await addLine('  ▓▓▓▓▓▓░░░░ 60%', 'output', 600);
    await addLine('[ERROR] Timeout na conexão!', 'error', 100);
    await addLine('', 'output', 300);
    
    await addLine('[EXPLOIT] Mudando estratégia... Port 443', 'info', 200);
    await addLine('  ▓▓░░░░░░░░ 20%', 'output', 400);
    await addLine('  ▓▓▓▓▓░░░░░ 50%', 'output', 400);
    await addLine('[WARNING] Firewall detectado!', 'error', 100);
    await addLine('[BYPASS] Aplicando técnica de evasão...', 'info', 300);
    await addLine('  ▓▓▓▓▓▓▓▓░░ 80%', 'output', 500);
    await addLine('  ▓▓▓▓▓▓▓▓▓▓ 100%', 'success', 400);
    await addLine('[SUCCESS] Firewall bypassado!', 'success', 100);
    await addLine('', 'output', 400);
    
    // Fase 3: Brute Force
    await addLine('[BRUTE FORCE] Iniciando ataque de força bruta...', 'info', 200);
    await addLine('  Tentando: admin:admin123 ✗', 'output', 250);
    await addLine('  Tentando: root:password ✗', 'output', 250);
    await addLine('  Tentando: user:12345678 ✗', 'output', 250);
    await addLine('  Tentando: admin:qwerty ✗', 'output', 250);
    await addLine('  Tentando: root:toor ✗', 'output', 250);
    await addLine('[ERROR] Rate limit detectado!', 'error', 100);
    await addLine('[WAIT] Aguardando 3 segundos...', 'info', 800);
    await addLine('  Tentando: sysadmin:P@ssw0rd ✗', 'output', 300);
    await addLine('  Tentando: root:r00t2023 ✓', 'success', 400);
    await addLine('[SUCCESS] Credenciais encontradas!', 'success', 100);
    await addLine('', 'output', 400);
    
    // Fase 4: Access
    await addLine('[ACCESS] Estabelecendo conexão segura...', 'info', 200);
    await addLine('  ▓▓▓▓▓▓▓▓▓▓ 100%', 'success', 600);
    await addLine('[SUCCESS] Conexão estabelecida!', 'success', 100);
    await addLine('', 'output', 400);
    
    // Fase 5: Privilege Escalation
    await addLine('[ESCALATION] Escalando privilégios...', 'info', 200);
    await addLine('  └─ Verificando sudo permissions...', 'output', 300);
    await addLine('  └─ Procurando SUID binaries...', 'output', 300);
    await addLine('  └─ Analisando cron jobs...', 'output', 300);
    await addLine('[SUCCESS] Root access obtido!', 'success', 100);
    await addLine('', 'output', 500);
    
    // Fase 6: Final
    await addLine('', 'output', 300);
    await addLine('═══════════════════════════════════════════════════════════', 'success', 100);
    await addLine('', 'output', 150);
    await addLine('  ███████ ██    ██ ███████ ████████ ███████ ███    ███', 'success', 100);
    await addLine('  ██       ██  ██  ██         ██    ██      ████  ████', 'success', 100);
    await addLine('  ███████   ████   ███████    ██    █████   ██ ████ ██', 'success', 100);
    await addLine('       ██    ██         ██    ██    ██      ██  ██  ██', 'success', 100);
    await addLine('  ███████    ██    ███████    ██    ███████ ██      ██', 'success', 100);
    await addLine('', 'output', 200);
    await addLine('  ██    ██ ███    ██ ██       ██████   ██████ ██   ██', 'success', 100);
    await addLine('  ██    ██ ████   ██ ██      ██    ██ ██      ██  ██ ', 'success', 100);
    await addLine('  ██    ██ ██ ██  ██ ██      ██    ██ ██      █████  ', 'success', 100);
    await addLine('  ██    ██ ██  ██ ██ ██      ██    ██ ██      ██  ██ ', 'success', 100);
    await addLine('   ██████  ██   ████ ███████  ██████   ██████ ██   ██', 'success', 100);
    await addLine('', 'output', 150);
    await addLine('═══════════════════════════════════════════════════════════', 'success', 100);
    await addLine('', 'output', 400);
    await addLine('[INFO] Apenas brincando! Você não hackeou nada de verdade.', 'info', 100);
    await addLine('[TIP] Mas que tal aprender segurança cibernética de verdade?', 'info', 100);
    await addLine('', 'output', 200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;
    
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
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      e.stopPropagation();
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
          className="p-4 h-[70vh] min-h-[500px] max-h-[700px] overflow-y-auto custom-scrollbar"
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
              &gt;
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
              disabled={isProcessing}
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && input && (
            <div className="mt-2 text-sm opacity-60" style={{ color: theme.info }}>
              Sugestões: {suggestions.join(', ')}
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
