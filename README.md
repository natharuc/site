# 💻 Terminal Portfolio

Um portfolio interativo e moderno em formato de terminal, construído com Next.js, TypeScript e Tailwind CSS.

## ✨ Características

- 🎨 **8 Temas Diferentes**: Matrix, Dracula, Hacker, Ocean, Cyberpunk, Terminal Clássico, Monokai e Nord
- 🎯 **20+ Comandos Interativos**: Comandos divertidos e informativos
- ⌨️ **Autocompletar**: Pressione TAB para autocompletar comandos
- 📜 **Histórico de Comandos**: Use ↑↓ para navegar pelo histórico
- 🎭 **Easter Eggs**: Descubra comandos secretos!
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🚀 Começando

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 🎮 Comandos Disponíveis

Digite `help` ou `man` no terminal para ver todos os comandos disponíveis!

### Comandos Principais

- `help` / `man` - Lista todos os comandos disponíveis
- `about` / `whoami` - Informações sobre mim
- `contact` - Informações de contato
- `skills` - Habilidades e tecnologias
- `projects` - Projetos destacados
- `theme <nome>` - Muda o tema do terminal
- `clear` / `cls` - Limpa a tela

### Comandos Divertidos

- `joke` - Conta uma piada de programador
- `matrix` - Entre na Matrix 🐰
- `hack` - Simula um "hack" (totalmente fake)
- `sudo` - Tenta executar como superusuário
- `coffee` - Faz um café ☕
- `quote` - Citação inspiradora
- `ascii` - Arte ASCII
- `exit` - Tenta sair (spoiler: não vai conseguir 😈)

## 🎨 Temas Disponíveis

1. **Matrix** - O clássico verde Matrix
2. **Dracula** - Tema escuro popular
3. **Hacker** - Verde neon sobre preto
4. **Ocean** - Tons de azul oceano
5. **Cyberpunk** - Roxo e rosa neon
6. **Terminal** - Terminal Ubuntu clássico
7. **Monokai** - Tema Monokai do Sublime
8. **Nord** - Paleta Nord suave

Para mudar o tema, use: `theme <nome>`

## ⌨️ Atalhos de Teclado

- `Enter` - Executa o comando
- `Tab` - Autocompletar comando
- `↑` / `↓` - Navegar pelo histórico de comandos
- `ESC` - Limpar input atual

## 🛠️ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 Personalização

### Adicionando Novos Comandos

Edite o arquivo `app/config/commands.ts` e adicione seu comando:

```typescript
mycommand: {
  name: 'mycommand',
  description: 'Descrição do comando',
  aliases: ['alias1', 'alias2'],
  execute: (args) => [
    createOutput('Seu output aqui!', 'success')
  ],
}
```

### Criando Novos Temas

Edite o arquivo `app/config/themes.ts`:

```typescript
meutema: {
  name: 'Meu Tema',
  bg: '#000000',
  text: '#ffffff',
  prompt: '#00ff00',
  input: '#ffffff',
  error: '#ff0000',
  success: '#00ff00',
  info: '#0000ff',
  border: '#00ff00',
}
```

### Personalizando Informações

Edite os comandos `about`, `contact`, `skills` e `projects` em `app/config/commands.ts` com suas informações pessoais.

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar!

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Feito com ❤️ e muito ☕**
