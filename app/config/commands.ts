import { Command, TerminalLine } from '../types/terminal';
import { themeNames } from './themes';

const createOutput = (content: string, type: TerminalLine['type'] = 'output'): TerminalLine => ({
  type,
  content,
  timestamp: new Date(),
});

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Lista todos os comandos disponíveis',
    aliases: ['man', '?'],
    execute: () => {
      const lines: TerminalLine[] = [
        createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
        createOutput('║           COMANDOS DISPONÍVEIS                             ║', 'info'),
        createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
        createOutput(''),
      ];

      Object.values(commands).forEach((cmd) => {
        const aliases = cmd.aliases ? ` (${cmd.aliases.join(', ')})` : '';
        lines.push(createOutput(`  ${cmd.name}${aliases}`, 'success'));
        lines.push(createOutput(`    └─ ${cmd.description}`, 'output'));
        lines.push(createOutput(''));
      });

      lines.push(createOutput('Dica: Use TAB para autocompletar comandos', 'info'));
      return lines;
    },
  },

  about: {
    name: 'about',
    description: 'Informações sobre mim',
    aliases: ['whoami', 'eu'],
    execute: () => [
      createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
      createOutput('║                    SOBRE MIM                                ║', 'info'),
      createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
      createOutput(''),
      createOutput('> Nome: Nathan Arruda', 'success'),
      createOutput('> Cargo: Tech Lead', 'output'),
      createOutput('> Empresa: Grupo MAG', 'output'),
      createOutput('> Experiência: 10+ anos', 'output'),
      createOutput(''),
      createOutput('[Especialidades]', 'info'),
      createOutput('  • .NET Core / C#', 'output'),
      createOutput('  • Azure Cloud', 'output'),
      createOutput('  • Mensageria (Masstransit)', 'output'),
      createOutput('  • Arquitetura orientada a eventos', 'output'),
      createOutput('  • Clean Code & Boas práticas', 'output'),
      createOutput(''),
      createOutput('[Stack Completa]', 'info'),
      createOutput('  Backend: C#, .NET Core, PHP, Laravel', 'output'),
      createOutput('  Frontend: Vue.js, Bootstrap, Xamarin', 'output'),
      createOutput('  Cloud: Azure (Service Bus, Functions, etc)', 'output'),
      createOutput('  Database: SQL Server, MySQL', 'output'),
      createOutput(''),
      createOutput('"Codando para o futuro, sempre buscando performance e estabilidade."', 'success'),
    ],
  },

  contact: {
    name: 'contact',
    description: 'Informações de contato',
    aliases: ['email', 'phone', 'contato', 'zap', 'whatsapp', 'telefone', 'social', 'redes'],
    execute: () => [
      createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
      createOutput('║                    CONTATO                                  ║', 'info'),
      createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
      createOutput(''),
      createOutput('> GitHub: https://github.com/natharuc', 'success'),
      createOutput('> LinkedIn: https://linkedin.com/in/natharuc', 'success'),
      createOutput('> Twitter/X: https://twitter.com/natharuc', 'success'),
      createOutput('> Instagram: https://instagram.com/natharuc', 'success'),
      createOutput(''),
      createOutput('Todas as redes: @natharuc', 'info'),
      createOutput(''),
      createOutput('Sempre aberto para novas oportunidades e projetos!', 'info'),
    ],
  },

  skills: {
    name: 'skills',
    description: 'Lista de habilidades e tecnologias',
    aliases: ['tech', 'stack'],
    execute: () => [
      createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
      createOutput('║                 HABILIDADES TÉCNICAS                        ║', 'info'),
      createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
      createOutput(''),
      createOutput('[Backend]', 'success'),
      createOutput('  ├─ C# / .NET Core  ████████████ 95%', 'output'),
      createOutput('  ├─ Azure Cloud     ████████████ 90%', 'output'),
      createOutput('  ├─ Masstransit     ███████████░ 85%', 'output'),
      createOutput('  ├─ PHP / Laravel   ██████████░░ 80%', 'output'),
      createOutput('  └─ REST APIs       ████████████ 95%', 'output'),
      createOutput(''),
      createOutput('[Frontend]', 'success'),
      createOutput('  ├─ Vue.js          ██████████░░ 75%', 'output'),
      createOutput('  ├─ Bootstrap       ███████████░ 85%', 'output'),
      createOutput('  ├─ Xamarin         ██████████░░ 75%', 'output'),
      createOutput('  └─ HTML/CSS        ████████████ 90%', 'output'),
      createOutput(''),
      createOutput('[Database]', 'success'),
      createOutput('  ├─ SQL Server      ████████████ 95%', 'output'),
      createOutput('  ├─ MySQL           ████████████ 90%', 'output'),
      createOutput('  └─ NoSQL           ██████████░░ 75%', 'output'),
      createOutput(''),
      createOutput('[Cloud & DevOps]', 'success'),
      createOutput('  ├─ Azure           ████████████ 90%', 'output'),
      createOutput('  ├─ Service Bus     ███████████░ 85%', 'output'),
      createOutput('  ├─ Functions       ███████████░ 85%', 'output'),
      createOutput('  └─ CI/CD           ██████████░░ 80%', 'output'),
      createOutput(''),
      createOutput('[Outros]', 'success'),
      createOutput('  ├─ Arquitetura orientada a eventos', 'output'),
      createOutput('  ├─ Clean Code & SOLID', 'output'),
      createOutput('  ├─ Liderança técnica', 'output'),
      createOutput('  └─ Mentoria de times', 'output'),
    ],
  },

  projects: {
    name: 'projects',
    description: 'Projetos destacados',
    aliases: ['portfolio', 'work'],
    execute: () => [
      createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
      createOutput('║                    PROJETOS                                 ║', 'info'),
      createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
      createOutput(''),
      createOutput('[1] Projeto: Terminal Portfolio', 'success'),
      createOutput('   └─ Um portfolio interativo em formato de terminal', 'output'),
      createOutput('   └─ Tech: Next.js, TypeScript, Tailwind', 'output'),
      createOutput(''),
      createOutput('[2] Projeto: [Seu Projeto]', 'success'),
      createOutput('   └─ Descrição do seu projeto incrível', 'output'),
      createOutput('   └─ Tech: [Tecnologias usadas]', 'output'),
      createOutput(''),
      createOutput('[3] Projeto: [Outro Projeto]', 'success'),
      createOutput('   └─ Mais um projeto interessante', 'output'),
      createOutput('   └─ Tech: [Stack utilizada]', 'output'),
      createOutput(''),
      createOutput('Use "github" para ver mais projetos!', 'info'),
    ],
  },

  theme: {
    name: 'theme',
    description: 'Altera o tema do terminal (use: theme <nome>)',
    aliases: ['color', 'cores'],
    execute: (args) => {
      if (args.length === 0) {
        const lines: TerminalLine[] = [
          createOutput('Temas disponíveis:', 'info'),
          createOutput(''),
        ];
        themeNames.forEach((theme) => {
          lines.push(createOutput(`  • ${theme}`, 'success'));
        });
        lines.push(createOutput(''));
        lines.push(createOutput('Use: theme <nome> para mudar o tema', 'info'));
        return lines;
      }
      return [createOutput(`Tema "${args[0]}" aplicado!`, 'success')];
    },
  },

  clear: {
    name: 'clear',
    description: 'Limpa a tela do terminal',
    aliases: ['cls', 'limpar'],
    execute: () => [],
  },

  date: {
    name: 'date',
    description: 'Mostra a data e hora atual',
    aliases: ['time', 'hora'],
    execute: () => {
      const now = new Date();
      return [
        createOutput('[Data e Hora]', 'info'),
        createOutput(''),
        createOutput(`  ${now.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}`, 'success'),
        createOutput(`  ${now.toLocaleTimeString('pt-BR')}`, 'output'),
      ];
    },
  },

  joke: {
    name: 'joke',
    description: 'Conta uma piada de programador',
    aliases: ['piada', 'fun'],
    execute: () => {
      const jokes = [
        'Por que programadores preferem o escuro?\nPorque light theme atrai bugs!',
        'Qual é o comando favorito do procrastinador?\ngit commit -m "later"',
        'Por que o programador foi preso?\nPorque matou um processo!',
        'Como você chama 8 hobbits?\nUm hobbyte!',
        'Por que Java developers usam óculos?\nPorque eles não C#',
        'Um SQL query entra num bar, se aproxima de duas tabelas e pergunta:\n"Posso fazer um JOIN com vocês?"',
        'Existem 10 tipos de pessoas no mundo:\nAs que entendem binário e as que não entendem.',
        'Café: O combustível que transforma código em software',
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      return [createOutput(joke, 'success')];
    },
  },

  matrix: {
    name: 'matrix',
    description: 'Easter egg: Entre na Matrix',
    aliases: ['neo'],
    execute: () => [
      createOutput('', 'output'),
      createOutput('Wake up, Neo...', 'success'),
      createOutput('The Matrix has you...', 'success'),
      createOutput('Follow the white rabbit.', 'success'),
      createOutput('', 'output'),
      createOutput('Knock, knock, Neo.', 'info'),
      createOutput('', 'output'),
      createOutput('> Tema Matrix ativado!', 'success'),
    ],
  },

  hack: {
    name: 'hack',
    description: 'Simula um "hack" (totalmente fake)',
    aliases: ['hacker'],
    execute: () => [],
  },

  sudo: {
    name: 'sudo',
    description: 'Tenta executar comando como superusuário',
    execute: (args) => {
      if (args.join(' ') === 'make me a sandwich') {
        return [createOutput('> Okay, here\'s your sandwich!', 'success')];
      }
      return [
        createOutput('[ERROR] Permission denied!', 'error'),
        createOutput('Você não está no arquivo sudoers. Este incidente será reportado.', 'info'),
      ];
    },
  },

  quote: {
    name: 'quote',
    description: 'Mostra uma citação inspiradora sobre programação',
    aliases: ['inspiration', 'citacao'],
    execute: () => {
      const quotes = [
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
        '"In order to be irreplaceable, one must always be different." - Coco Chanel',
        '"Java is to JavaScript what car is to Carpet." - Chris Heilmann',
        '"Knowledge is power." - Francis Bacon',
        '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." - Dan Salomon',
        '"Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away." - Antoine de Saint-Exupery',
        '"Code never lies, comments sometimes do." - Ron Jeffries',
        '"Simplicity is the soul of efficiency." - Austin Freeman',
      ];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      return [
        createOutput('', 'output'),
        createOutput(quote, 'info'),
        createOutput('', 'output'),
      ];
    },
  },

  github: {
    name: 'github',
    description: 'Abre o GitHub (ou mostra link)',
    aliases: ['git', 'repo'],
    execute: () => [
      createOutput('[GitHub]', 'info'),
      createOutput(''),
      createOutput('  https://github.com/natharuc', 'success'),
      createOutput(''),
      createOutput('Confira meus repositórios!', 'info'),
    ],
  },

  coffee: {
    name: 'coffee',
    description: 'Faz um café',
    aliases: ['cafe'],
    execute: () => [
      createOutput('> Preparando café...', 'info'),
      createOutput(''),
      createOutput('  [██████████] 100%', 'success'),
      createOutput(''),
      createOutput('> Seu café está pronto!', 'success'),
      createOutput('Agora você está 100% mais produtivo!', 'info'),
    ],
  },

  ascii: {
    name: 'ascii',
    description: 'Mostra arte ASCII',
    execute: () => [
      createOutput('', 'output'),
      createOutput('    ____  ___________    ____', 'info'),
      createOutput('   / __ \\/ ____/ __ \\  / __ \\', 'info'),
      createOutput('  / / / / __/ / / / / / / / /', 'info'),
      createOutput(' / /_/ / /___/ /_/ / / /_/ /', 'info'),
      createOutput('/_____/_____/\\____/  \\____/', 'info'),
      createOutput('', 'output'),
      createOutput('  Welcome to my Terminal Portfolio!', 'success'),
      createOutput('', 'output'),
    ],
  },

  exit: {
    name: 'exit',
    description: 'Sai do terminal (ou não)',
    aliases: ['quit', 'sair'],
    execute: () => [
      createOutput('[AVISO] Você não pode sair...', 'error'),
      createOutput('Você está preso aqui PARA SEMPRE!', 'error'),
      createOutput('', 'output'),
      createOutput('Brincadeira! Mas por que sair? Fique mais um pouco!', 'info'),
    ],
  },

  open: {
    name: 'open',
    description: 'Abre um link em nova aba (ex: open github, open linkedin)',
    aliases: ['abrir', 'link'],
    execute: (args) => {
      if (args.length === 0) {
        return [
          createOutput('[OPEN] Uso: open <site>', 'info'),
          createOutput(''),
          createOutput('Sites disponíveis:', 'output'),
          createOutput('  • github    - Abre meu GitHub', 'output'),
          createOutput('  • linkedin  - Abre meu LinkedIn', 'output'),
          createOutput('  • twitter   - Abre meu Twitter/X', 'output'),
          createOutput('  • instagram - Abre meu Instagram', 'output'),
          createOutput(''),
          createOutput('Você também pode usar URLs diretas:', 'info'),
          createOutput('  Ex: open https://google.com', 'output'),
        ];
      }

      const target = args[0].toLowerCase();
      const urls: Record<string, string> = {
        'github': 'https://github.com/natharuc',
        'git': 'https://github.com/natharuc',
        'linkedin': 'https://linkedin.com/in/natharuc',
        'twitter': 'https://twitter.com/natharuc',
        'x': 'https://twitter.com/natharuc',
        'instagram': 'https://instagram.com/natharuc',
        'insta': 'https://instagram.com/natharuc',
      };

      let url = urls[target];
      
      // Se não encontrou nos atalhos, verifica se é uma URL
      if (!url) {
        if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
          url = args[0];
        } else if (args[0].includes('.')) {
          // Se contém ponto, assume que é um domínio e adiciona https://
          url = `https://${args[0]}`;
        } else {
          return [
            createOutput(`[ERROR] Site "${target}" não encontrado!`, 'error'),
            createOutput('Digite "open" sem argumentos para ver os sites disponíveis.', 'info'),
          ];
        }
      }

      // Abre em nova aba
      window.open(url, '_blank');

      return [
        createOutput(`[SUCCESS] Abrindo ${target}...`, 'success'),
        createOutput(`  ${url}`, 'output'),
      ];
    },
  },
};

export const getCommand = (input: string): Command | null => {
  const cmdName = input.toLowerCase();

  // Procura por nome exato
  if (commands[cmdName]) {
    return commands[cmdName];
  }

  // Procura por alias
  for (const cmd of Object.values(commands)) {
    if (cmd.aliases?.includes(cmdName)) {
      return cmd;
    }
  }

  return null;
};
