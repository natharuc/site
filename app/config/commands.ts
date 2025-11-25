import { Command, TerminalLine } from '../types/terminal';
import { themes, themeNames } from './themes';

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

      lines.push(createOutput('💡 Dica: Use TAB para autocompletar comandos', 'info'));
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
      createOutput('👤 Nome: [SEU NOME AQUI]', 'success'),
      createOutput('💼 Profissão: Desenvolvedor Full Stack', 'output'),
      createOutput('🎯 Especialidade: TypeScript, React, Node.js', 'output'),
      createOutput('🚀 Status: Codando e criando coisas incríveis!', 'output'),
      createOutput(''),
      createOutput('📝 "Code is poetry, bugs are just unexpected features."', 'info'),
    ],
  },

  contact: {
    name: 'contact',
    description: 'Informações de contato',
    aliases: ['email', 'phone', 'contato'],
    execute: () => [
      createOutput('╔════════════════════════════════════════════════════════════╗', 'info'),
      createOutput('║                    CONTATO                                  ║', 'info'),
      createOutput('╚════════════════════════════════════════════════════════════╝', 'info'),
      createOutput(''),
      createOutput('📧 Email: [seu-email@exemplo.com]', 'success'),
      createOutput('📱 Telefone: [+55 11 99999-9999]', 'success'),
      createOutput('🔗 GitHub: [github.com/seu-usuario]', 'output'),
      createOutput('💼 LinkedIn: [linkedin.com/in/seu-perfil]', 'output'),
      createOutput('🐦 Twitter: [@seu_usuario]', 'output'),
      createOutput(''),
      createOutput('💬 Sempre aberto para novas oportunidades e projetos!', 'info'),
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
      createOutput('🎨 Frontend:', 'success'),
      createOutput('  ├─ React.js / Next.js ████████████ 95%', 'output'),
      createOutput('  ├─ TypeScript      ████████████ 90%', 'output'),
      createOutput('  ├─ Tailwind CSS    ███████████░ 85%', 'output'),
      createOutput('  └─ HTML/CSS        ████████████ 95%', 'output'),
      createOutput(''),
      createOutput('⚙️  Backend:', 'success'),
      createOutput('  ├─ Node.js         ████████████ 90%', 'output'),
      createOutput('  ├─ Python          ███████████░ 85%', 'output'),
      createOutput('  ├─ PostgreSQL      ██████████░░ 80%', 'output'),
      createOutput('  └─ REST APIs       ████████████ 95%', 'output'),
      createOutput(''),
      createOutput('🛠️  Ferramentas:', 'success'),
      createOutput('  ├─ Git             ████████████ 95%', 'output'),
      createOutput('  ├─ Docker          ██████████░░ 75%', 'output'),
      createOutput('  ├─ Linux           ███████████░ 85%', 'output'),
      createOutput('  └─ VS Code         ████████████ 100%', 'output'),
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
      createOutput('🚀 Projeto 1: Terminal Portfolio', 'success'),
      createOutput('   └─ Um portfolio interativo em formato de terminal', 'output'),
      createOutput('   └─ Tech: Next.js, TypeScript, Tailwind', 'output'),
      createOutput(''),
      createOutput('💼 Projeto 2: [Seu Projeto]', 'success'),
      createOutput('   └─ Descrição do seu projeto incrível', 'output'),
      createOutput('   └─ Tech: [Tecnologias usadas]', 'output'),
      createOutput(''),
      createOutput('🎮 Projeto 3: [Outro Projeto]', 'success'),
      createOutput('   └─ Mais um projeto interessante', 'output'),
      createOutput('   └─ Tech: [Stack utilizada]', 'output'),
      createOutput(''),
      createOutput('💡 Use "github" para ver mais projetos!', 'info'),
    ],
  },

  theme: {
    name: 'theme',
    description: 'Altera o tema do terminal (use: theme <nome>)',
    aliases: ['color', 'cores'],
    execute: (args) => {
      if (args.length === 0) {
        const lines: TerminalLine[] = [
          createOutput('🎨 Temas disponíveis:', 'info'),
          createOutput(''),
        ];
        themeNames.forEach((theme) => {
          lines.push(createOutput(`  • ${theme}`, 'success'));
        });
        lines.push(createOutput(''));
        lines.push(createOutput('💡 Use: theme <nome> para mudar o tema', 'info'));
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
        createOutput('📅 Data e Hora:', 'info'),
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
        '😄 Por que programadores preferem o escuro?\nPorque light theme atrai bugs! 🐛',
        '😄 Qual é o comando favorito do procrastinador?\ngit commit -m "later"',
        '😄 Por que o programador foi preso?\nPorque matou um processo! 💀',
        '😄 Como você chama 8 hobbits?\nUm hobbyte! 📦',
        '😄 Por que Java developers usam óculos?\nPorque eles não C# 👓',
        '😄 Um SQL query entra num bar, se aproxima de duas tabelas e pergunta:\n"Posso fazer um JOIN com vocês?" 🍺',
        '😄 Existem 10 tipos de pessoas no mundo:\nAs que entendem binário e as que não entendem. 01',
        '😄 Café: O combustível que transforma código em software ☕',
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
      createOutput('Follow the white rabbit. 🐰', 'success'),
      createOutput('', 'output'),
      createOutput('Knock, knock, Neo.', 'info'),
      createOutput('', 'output'),
      createOutput('💊 Tema Matrix ativado!', 'success'),
    ],
  },

  hack: {
    name: 'hack',
    description: 'Simula um "hack" (totalmente fake)',
    aliases: ['hacker'],
    execute: () => [
      createOutput('🔐 Iniciando sequência de hack...', 'info'),
      createOutput('', 'output'),
      createOutput('[████████████] 100% - Conectando ao mainframe...', 'success'),
      createOutput('[████████████] 100% - Bypassando firewall...', 'success'),
      createOutput('[████████████] 100% - Descriptografando senhas...', 'success'),
      createOutput('[████████████] 100% - Acesso concedido!', 'success'),
      createOutput('', 'output'),
      createOutput('😎 Apenas brincando! Você não hackeou nada.', 'info'),
      createOutput('💡 Mas que tal aprender programação de verdade?', 'info'),
    ],
  },

  sudo: {
    name: 'sudo',
    description: 'Tenta executar comando como superusuário',
    execute: (args) => {
      if (args.join(' ') === 'make me a sandwich') {
        return [createOutput('🥪 Okay, here\'s your sandwich!', 'success')];
      }
      return [
        createOutput('🔒 Permission denied!', 'error'),
        createOutput('💡 Você não está no arquivo sudoers. Este incidente será reportado.', 'info'),
      ];
    },
  },

  quote: {
    name: 'quote',
    description: 'Mostra uma citação inspiradora sobre programação',
    aliases: ['inspiration', 'citacao'],
    execute: () => {
      const quotes = [
        '💭 "Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '💭 "First, solve the problem. Then, write the code." - John Johnson',
        '💭 "Experience is the name everyone gives to their mistakes." - Oscar Wilde',
        '💭 "In order to be irreplaceable, one must always be different." - Coco Chanel',
        '💭 "Java is to JavaScript what car is to Carpet." - Chris Heilmann',
        '💭 "Knowledge is power." - Francis Bacon',
        '💭 "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." - Dan Salomon',
        '💭 "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away." - Antoine de Saint-Exupery',
        '💭 "Code never lies, comments sometimes do." - Ron Jeffries',
        '💭 "Simplicity is the soul of efficiency." - Austin Freeman',
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
      createOutput('🐙 GitHub:', 'info'),
      createOutput(''),
      createOutput('  github.com/[seu-usuario]', 'success'),
      createOutput(''),
      createOutput('💡 Confira meus repositórios!', 'info'),
    ],
  },

  coffee: {
    name: 'coffee',
    description: 'Faz um café ☕',
    aliases: ['cafe'],
    execute: () => [
      createOutput('☕ Preparando café...', 'info'),
      createOutput(''),
      createOutput('  [██████████] 100%', 'success'),
      createOutput(''),
      createOutput('✨ Seu café está pronto!', 'success'),
      createOutput('💡 Agora você está 100% mais produtivo!', 'info'),
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
      createOutput('👋 Você não pode sair...', 'error'),
      createOutput('😈 Você está preso aqui PARA SEMPRE!', 'error'),
      createOutput('', 'output'),
      createOutput('😄 Brincadeira! Mas por que sair? Fique mais um pouco!', 'info'),
    ],
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
