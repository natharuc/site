# Mega Sena da Virada - Sistema de Votação

Sistema completo para administrar números da Mega Sena da Virada com votação colaborativa, **sistema de bolões** e geração automática de jogos.

## 🎯 Funcionalidades

### 🎯 Sistema de Bolões (NOVO!)
- **Criar Bolões**: Crie grupos privados com nome e senha
- **Entrar em Bolões**: Participe de bolões usando nome e senha
- **Modo Individual**: Participe sem bolão
- Estatísticas separadas por bolão
- Jogos gerados por bolão
- Ver mais em [BOLAO_README.md](BOLAO_README.md)

### ✅ Votação
- Interface intuitiva para seleção de 6 números (1-60)
- Validação em tempo real
- Armazenamento no MongoDB
- Registro de nome do votante

### 📊 Estatísticas
- Números mais votados em tempo real
- Ranking com percentuais
- Histórico dos últimos votos
- Total de participantes
- **Filtrado por bolão** quando aplicável

### 🎲 Gerador de Jogos
- Geração automática baseada nos números mais votados
- Configuração flexível de jogos:
  - Padrão: 1 jogo de 9 números, 2 jogos de 8 números, 2 jogos de 6 números
  - Personalizável através da interface
- Visualização clara dos números com quantidade de votos
- Função de copiar números
- **Jogos específicos por bolão**

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar MongoDB

Crie um arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=sua_connection_string_aqui
MONGODB_DB=megasena
```

**Exemplos de Connection String:**

- **MongoDB Local:**
  ```
  mongodb://localhost:27017
  ```

- **MongoDB Atlas (Cloud):**
  ```
  mongodb+srv://usuario:senha@cluster.mongodb.net
  ```

### 3. Executar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000/mega-da-virada](http://localhost:3000/mega-da-virada)

## 📁 Estrutura de Arquivos

```
app/
├── mega-da-virada/
│   ├── page.tsx                 # Página principal
│   └── components/
│       ├── NumberSelector.tsx   # Seletor de números
│       ├── Statistics.tsx       # Estatísticas e ranking
│       └── GameGenerator.tsx    # Gerador de jogos
└── api/
    └── mega-sena/
        └── route.ts             # API endpoints (GET, POST, DELETE)
```

## 🗄️ Estrutura do Banco de Dados

**Collection:** `votes`

```javascript
{
  _id: ObjectId,
  name: String,           // Nome do votante
  numbers: [Number],      // Array com 6 números (1-60)
  createdAt: String       // Data/hora do voto (ISO)
}
```

## 🔧 Configuração de Jogos

A configuração padrão pode ser alterada diretamente na interface:

- **Tamanho do jogo:** 6 a 15 números
- **Quantidade:** 1 a 10 jogos
- Adicionar/remover configurações conforme necessário

## 🎨 Recursos da Interface

- **Design Responsivo:** Funciona em desktop, tablet e mobile
- **Gradientes Temáticos:** Verde e amarelo (Mega Sena)
- **Feedback Visual:** Animações e confirmações
- **Tooltip de Votos:** Mostra quantidade de votos ao passar o mouse
- **Copiar Números:** Botão para copiar sequência de números

## 📝 API Endpoints

### GET /api/mega-sena
Retorna todos os votos ordenados por data (mais recentes primeiro)

**Response:**
```json
{
  "success": true,
  "votes": [
    {
      "id": "...",
      "name": "João Silva",
      "numbers": [5, 12, 23, 34, 45, 56],
      "createdAt": "2025-12-29T..."
    }
  ]
}
```

### POST /api/mega-sena
Cria um novo voto

**Request:**
```json
{
  "name": "João Silva",
  "numbers": [5, 12, 23, 34, 45, 56]
}
```

**Response:**
```json
{
  "success": true,
  "vote": {
    "id": "...",
    "name": "João Silva",
    "numbers": [5, 12, 23, 34, 45, 56],
    "createdAt": "2025-12-29T..."
  }
}
```

### DELETE /api/mega-sena?id={id}
Remove um voto específico (útil para administração)

**Response:**
```json
{
  "success": true,
  "message": "Voto deletado com sucesso"
}
```

## 🔒 Validações

- Nome obrigatório (não pode ser vazio)
- Exatamente 6 números devem ser selecionados
- Números devem estar entre 1 e 60
- Não pode haver números duplicados

## 💡 Dicas

1. **Backup:** Faça backup regular do banco de dados
2. **Autenticação:** Para produção, considere adicionar autenticação na API
3. **Rate Limiting:** Implemente limite de votos por IP/usuário
4. **Analytics:** Adicione tracking para entender padrões de votação

## 🐛 Troubleshooting

**Erro de conexão com MongoDB:**
- Verifique se a string de conexão está correta no `.env.local`
- Confirme se o IP está liberado no MongoDB Atlas (se usando)
- Teste a conexão usando MongoDB Compass

**Números não aparecem:**
- Verifique o console do navegador
- Confirme se a API está respondendo (Network tab)
- Verifique se há dados no banco

## 📦 Dependências

- **next**: Framework React
- **react**: Biblioteca UI
- **mongodb**: Driver oficial MongoDB para Node.js
- **typescript**: Type safety

## 🎉 Boa Sorte!

Que os números mais votados sejam os sorteados! 🍀
