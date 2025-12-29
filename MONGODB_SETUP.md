# Configuração do MongoDB para Mega Sena da Virada

## Opção 1: MongoDB Local

### 1. Instalar MongoDB Community Server
Baixe em: https://www.mongodb.com/try/download/community

### 2. Iniciar o MongoDB
```bash
mongod
```

### 3. Configurar o .env.local
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=megasena
```

---

## Opção 2: MongoDB Atlas (Cloud - Recomendado)

### 1. Criar Conta no MongoDB Atlas
- Acesse: https://www.mongodb.com/cloud/atlas/register
- Crie uma conta gratuita

### 2. Criar um Cluster
- Clique em "Build a Database"
- Escolha a opção **FREE** (M0)
- Selecione a região mais próxima
- Clique em "Create Cluster"

### 3. Configurar Acesso ao Banco

#### a) Criar Usuário do Banco
- No menu lateral, clique em "Database Access"
- Clique em "Add New Database User"
- Escolha "Password" como método de autenticação
- Defina um **username** e **senha forte**
- Em "Database User Privileges", selecione "Read and write to any database"
- Clique em "Add User"

#### b) Configurar IP Whitelist
- No menu lateral, clique em "Network Access"
- Clique em "Add IP Address"
- Para desenvolvimento: Clique em "Allow Access from Anywhere" (0.0.0.0/0)
- Para produção: Adicione o IP específico do seu servidor
- Clique em "Confirm"

### 4. Obter a Connection String
- Volte para "Database" no menu lateral
- Clique em "Connect" no seu cluster
- Escolha "Connect your application"
- Selecione "Node.js" como driver
- Copie a connection string (algo como):
  ```
  mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
  ```

### 5. Configurar o .env.local
Crie o arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=mongodb+srv://seuUsuario:suaSenha@cluster0.xxxxx.mongodb.net/
MONGODB_DB=megasena
```

**IMPORTANTE:** Substitua:
- `seuUsuario` pelo username criado no passo 3a
- `suaSenha` pela senha criada no passo 3a
- `cluster0.xxxxx` pelo endereço do seu cluster

**Exemplo real:**
```env
MONGODB_URI=mongodb+srv://megasena:Senha123@cluster0.abc123.mongodb.net/
MONGODB_DB=megasena
```

---

## Testar a Conexão

### 1. Reiniciar o Servidor
Após criar o `.env.local`, reinicie o servidor Next.js:

```bash
# Parar o servidor (Ctrl+C)
npm run dev
```

### 2. Testar a Aplicação
- Acesse: http://localhost:3000/mega-da-virada
- Preencha seu nome e selecione 6 números
- Clique em "Confirmar Números"
- Se aparecer "Números enviados com sucesso!", está funcionando!

### 3. Verificar os Dados no MongoDB Atlas
- Acesse o MongoDB Atlas
- Vá em "Database" > "Browse Collections"
- Você verá o database `megasena` e a collection `votes`
- Clique para visualizar os documentos salvos

---

## Solução de Problemas

### Erro: "MONGODB_URI não está configurado"
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Certifique-se de que a variável `MONGODB_URI` está definida
- Reinicie o servidor após criar o arquivo

### Erro: "Authentication failed"
- Verifique se o username e senha estão corretos
- Certifique-se de não ter caracteres especiais na senha que precisem ser URL-encoded
- Se a senha tiver caracteres especiais, codifique-os:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - etc.

### Erro: "Connection timeout"
- Verifique se o IP foi adicionado no Network Access
- Tente usar "Allow Access from Anywhere" para desenvolvimento
- Verifique sua conexão com a internet

### Erro: "Cannot find module 'mongodb'"
Execute:
```bash
npm install mongodb
```

---

## Segurança - IMPORTANTE! 🔒

### NÃO COMMITE O .env.local
O arquivo `.env.local` contém informações sensíveis e NÃO deve ser enviado para o Git!

Já existe um `.gitignore` que ignora esse arquivo, mas certifique-se:

```bash
# Verificar se está no .gitignore
cat .gitignore | grep .env.local
```

### Para Produção (Vercel, por exemplo)
1. Não use `.env.local`
2. Configure as variáveis de ambiente no painel de controle:
   - Vercel: Project Settings > Environment Variables
   - Adicione `MONGODB_URI` e `MONGODB_DB`

---

## Exemplo Completo

**.env.local** (na raiz do projeto):
```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://megasena_admin:MinhaSenhaForte123@cluster0.abc123.mongodb.net/
MONGODB_DB=megasena
```

**Estrutura do Projeto:**
```
c:\nac\site\
├── .env.local           ← Criar este arquivo
├── .env.example         ← Template (já existe)
├── package.json
├── next.config.ts
└── app/
    ├── mega-da-virada/
    └── api/
        └── mega-sena/
```

---

## Dicas Finais

1. **Backup:** O MongoDB Atlas faz backup automático
2. **Monitoramento:** Use o painel do Atlas para ver métricas
3. **Logs:** Veja logs de erro no console do navegador (F12)
4. **Performance:** O plano gratuito do Atlas é suficiente para até 100 usuários simultâneos
