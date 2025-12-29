# 🎯 Sistema de Bolões - Mega Sena da Virada

## Como Funciona

O sistema de bolões permite que grupos de pessoas compartilhem suas escolhas de números da Mega Sena, criando estatísticas e jogos específicos para cada grupo.

## 📋 Modos de Participação

### 1. 🎲 Individual
- Participa sozinho
- Seus números entram nas estatísticas gerais
- Vê todos os votos de todas as pessoas

### 2. ➕ Criar Bolão
- Cria um novo bolão com nome e senha
- Define quem pode participar compartilhando a senha
- Vê apenas os números do seu bolão

### 3. 🤝 Entrar em Bolão
- Participa de um bolão já existente
- Precisa saber o nome exato e a senha do bolão
- Seus números aparecem apenas para quem está no bolão

## 🔧 Como Usar

### Criar um Bolão

1. Acesse `/mega-da-virada`
2. Clique em **"Criar Bolão"**
3. Preencha:
   - **Seu Nome**: Quem está criando o bolão
   - **Nome do Bolão**: Ex: "Bolão da Família Silva"
   - **Senha**: Mínimo 4 caracteres
4. Clique em **"Criar Bolão"**
5. Compartilhe o **nome** e **senha** com os participantes

### Entrar em um Bolão

1. Acesse `/mega-da-virada`
2. Clique em **"Entrar em Bolão"**
3. Digite:
   - **Nome do Bolão**: Nome exato que o criador definiu
   - **Senha do Bolão**: Senha fornecida pelo criador
4. Clique em **"Entrar no Bolão"**

### Votar em um Bolão

1. Após entrar no bolão, você verá um banner roxo/rosa no topo
2. Digite seu nome
3. Selecione seus 6 números
4. Clique em **"Confirmar Números"**
5. Seus números são salvos no bolão

### Sair de um Bolão

- Clique em **"Sair do Bolão"** no banner do topo
- Você voltará para o modo de seleção

## 📊 Estatísticas por Bolão

Quando você está em um bolão:
- **Estatísticas**: Mostram apenas os números votados pelos participantes do bolão
- **Últimos Votos**: Apenas votos do bolão
- **Gerador de Jogos**: Cria jogos baseados nos números mais votados do bolão
- **Contador de Participantes**: Quantas pessoas já votaram no bolão

## 🗄️ Estrutura do Banco de Dados

### Collection: `bolaos`

```javascript
{
  _id: ObjectId,
  name: String,              // Nome normalizado (lowercase)
  displayName: String,       // Nome original
  password: String,          // Senha do bolão
  createdBy: String,         // Nome do criador
  createdAt: String          // Data/hora de criação (ISO)
}
```

### Collection: `votes` (atualizada)

```javascript
{
  _id: ObjectId,
  name: String,              // Nome do votante
  numbers: [Number],         // Array com 6 números (1-60)
  createdAt: String,         // Data/hora do voto (ISO)
  bolaoId: String            // ID do bolão (opcional)
}
```

## 🔒 Segurança

### Nome do Bolão
- Armazenado em lowercase para evitar duplicatas
- Case-insensitive na busca
- Exemplo: "Família Silva" = "família silva" = "FAMÍLIA SILVA"

### Senha do Bolão
- Mínimo 4 caracteres
- Armazenada em texto plano (para facilitar compartilhamento)
- ⚠️ **Para produção**: Considere usar hash (bcrypt)

### Validações
- Nome do bolão deve ser único
- Senha obrigatória
- Nome do criador obrigatório
- Busca exige nome E senha corretos

## 🎮 Exemplos de Uso

### Exemplo 1: Bolão da Família

```
Criador: João Silva
Nome do Bolão: Família Silva 2025
Senha: silva123

Participantes podem entrar usando:
- Nome: "família silva 2025" (case-insensitive)
- Senha: "silva123" (case-sensitive)
```

### Exemplo 2: Bolão do Trabalho

```
Criador: Maria Santos
Nome do Bolão: Escritório XYZ
Senha: mega2025

Compartilhe no grupo:
"Pessoal, criei um bolão! 
Nome: Escritório XYZ
Senha: mega2025"
```

### Exemplo 3: Bolão de Amigos

```
Criador: Pedro Costa
Nome do Bolão: Amigos da Faculdade
Senha: sorte789

Cada amigo:
1. Clica em "Entrar em Bolão"
2. Digita: "Amigos da Faculdade"
3. Digita senha: "sorte789"
4. Escolhe seus números
```

## 📱 Interface Visual

### Banner do Bolão (quando conectado)
```
🎯 Bolão: Família Silva 2025
Criado por: João Silva
Participantes: 5
[Sair do Bolão]
```

### Cores por Modo
- **Individual**: Verde/Amarelo
- **Criar Bolão**: Roxo/Rosa
- **Entrar em Bolão**: Azul/Ciano
- **Dentro do Bolão**: Roxo/Rosa (banner)

## 🔄 Fluxo Completo

```
1. Usuário acessa /mega-da-virada
   ↓
2. Escolhe modo: Individual / Criar Bolão / Entrar em Bolão
   ↓
3a. Individual → Vota diretamente
3b. Criar Bolão → Preenche form → Cria → Compartilha credenciais
3c. Entrar em Bolão → Digita nome/senha → Entra
   ↓
4. Seleciona 6 números
   ↓
5. Confirma voto
   ↓
6. Voto salvo no MongoDB (com ou sem bolaoId)
   ↓
7. Estatísticas atualizadas (filtradas por bolão se aplicável)
   ↓
8. Jogos gerados baseados nos números do grupo
```

## 🎯 Casos de Uso

1. **Família**: Reunir palpites de toda a família
2. **Trabalho**: Criar bolão entre colegas
3. **Amigos**: Competir entre grupos de amigos
4. **Comunidade**: Bolão do bairro/condomínio
5. **Online**: Grupos de redes sociais

## 🛠️ API Endpoints

### POST /api/bolao
Cria um novo bolão

**Request:**
```json
{
  "name": "Família Silva 2025",
  "password": "senha123",
  "createdBy": "João Silva"
}
```

**Response (sucesso):**
```json
{
  "success": true,
  "bolao": {
    "id": "...",
    "name": "Família Silva 2025",
    "createdAt": "2025-12-29T...",
    "createdBy": "João Silva",
    "participants": 0
  }
}
```

**Response (erro):**
```json
{
  "success": false,
  "error": "Já existe um bolão com este nome"
}
```

### GET /api/bolao?name=X&password=Y
Busca/valida um bolão existente

**Response (sucesso):**
```json
{
  "success": true,
  "bolao": {
    "id": "...",
    "name": "Família Silva 2025",
    "createdAt": "2025-12-29T...",
    "createdBy": "João Silva",
    "participants": 5
  }
}
```

**Response (erro):**
```json
{
  "success": false,
  "error": "Bolão não encontrado"
}
// ou
{
  "success": false,
  "error": "Senha incorreta"
}
```

### POST /api/mega-sena (atualizado)
Cria voto (individual ou em bolão)

**Request:**
```json
{
  "name": "Maria Silva",
  "numbers": [5, 12, 23, 34, 45, 56],
  "bolaoId": "abc123..." // Opcional
}
```

### GET /api/mega-sena?bolaoId=X (atualizado)
Busca votos (todos ou de um bolão específico)

## 💡 Dicas

1. **Nome do Bolão**: Use nomes únicos e descritivos
2. **Senha**: Fácil de compartilhar mas não óbvia
3. **Comunicação**: Use WhatsApp/Telegram para compartilhar credenciais
4. **Privacidade**: Cada bolão vê apenas seus próprios números
5. **Backup**: Anote o nome e senha do seu bolão!

## 🚀 Melhorias Futuras (Sugestões)

- [ ] Lista de bolões públicos
- [ ] Recuperação de senha via email
- [ ] Dashboard do administrador do bolão
- [ ] Exportar estatísticas do bolão
- [ ] Chat entre participantes
- [ ] Notificações de novos votos
- [ ] QR Code para compartilhar bolão
- [ ] Limite de participantes
- [ ] Data de encerramento do bolão
