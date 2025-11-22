# 🔐 Guia Completo de Configuração OAuth

Este guia mostra como configurar **gratuitamente** o Google OAuth e Microsoft OAuth para seu projeto.

---

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com) (gratuito)
2. Conta Google (Gmail)
3. Conta Microsoft (Outlook/Hotmail ou conta corporativa)

---

## 🔵 PARTE 1: Configurando Google OAuth (GRATUITO)

### Passo 1: Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Faça login com sua conta Google
3. Aceite os termos de serviço se for a primeira vez

### Passo 2: Criar um Novo Projeto

1. Clique no seletor de projeto no topo (ao lado de "Google Cloud")
2. Clique em **"Novo Projeto"**
3. Preencha:
   - **Nome do projeto**: `FabCaq Marketplace` (ou qualquer nome)
   - **Organização**: Deixe como está (No organization)
4. Clique em **"Criar"**
5. Aguarde alguns segundos e selecione o projeto criado

### Passo 3: Configurar a Tela de Consentimento OAuth

1. No menu lateral, vá em **"APIs e serviços"** → **"Tela de consentimento OAuth"**
2. Selecione **"Externo"** (permite qualquer usuário Google)
3. Clique em **"Criar"**

4. Preencha as informações obrigatórias:
   - **Nome do app**: `FabCaq Marketplace`
   - **E-mail de suporte ao usuário**: Seu email
   - **Domínios autorizados**: (deixe vazio por enquanto)
   - **Informações de contato do desenvolvedor**: Seu email
5. Clique em **"Salvar e continuar"**

6. Na tela **"Escopos"**:
   - Clique em **"Adicionar ou remover escopos"**
   - Marque: `../auth/userinfo.email` e `../auth/userinfo.profile`
   - Clique em **"Atualizar"**
   - Clique em **"Salvar e continuar"**

7. Em **"Usuários de teste"** (opcional):
   - Adicione seu email se quiser testar
   - Clique em **"Salvar e continuar"**

8. Revise e clique em **"Voltar ao painel"**

### Passo 4: Criar Credenciais OAuth

1. Vá em **"APIs e serviços"** → **"Credenciais"**
2. Clique em **"+ Criar credenciais"** → **"ID do cliente OAuth"**
3. Configure:
   - **Tipo de aplicativo**: **"Aplicativo da Web"**
   - **Nome**: `FabCaq Web Client`
   
4. Em **"Origens JavaScript autorizadas"**, adicione:
   ```
   http://localhost:3000
   ```

5. Em **"URIs de redirecionamento autorizados"**, adicione:
   ```
   http://localhost:3000/auth/callback
   https://[SEU-PROJETO].supabase.co/auth/v1/callback
   ```
   
   ⚠️ **IMPORTANTE**: Substitua `[SEU-PROJETO]` pela URL do seu projeto Supabase
   - Para encontrar: Vá no Supabase → Settings → API → Project URL
   - Exemplo: `https://abcdefghijk.supabase.co/auth/v1/callback`

6. Clique em **"Criar"**

### Passo 5: Copiar as Credenciais

Uma janela aparecerá com:
- **ID do cliente**: `123456789-abc123.apps.googleusercontent.com`
- **Chave secreta do cliente**: `GOCSPX-abc123xyz789`

⚠️ **GUARDE ESSAS INFORMAÇÕES** - você precisará delas no Supabase!

---

## 🟦 PARTE 2: Configurando Microsoft OAuth (GRATUITO)

### Passo 1: Acessar Azure Portal

1. Acesse: https://portal.azure.com
2. Faça login com sua conta Microsoft
3. Se não tiver, crie uma conta gratuita

### Passo 2: Acessar Microsoft Entra ID (antigo Azure AD)

1. No campo de busca no topo, digite: **"Microsoft Entra ID"**
2. Clique no serviço **"Microsoft Entra ID"**
3. No menu lateral, vá em **"Registros de aplicativo"** (App registrations)

### Passo 3: Registrar um Novo Aplicativo

1. Clique em **"+ Novo registro"**
2. Preencha:
   - **Nome**: `FabCaq Marketplace`
   - **Tipos de conta com suporte**: Selecione:
     - **"Contas em qualquer diretório organizacional (Qualquer locatário do Microsoft Entra ID - Multilocatário) e contas Microsoft pessoais (por exemplo, Skype, Xbox)"**
     - (Isso permite login com contas pessoais e corporativas)
   
   - **URI de Redirecionamento**:
     - Tipo: **"Web"**
     - URI: `https://[SEU-PROJETO].supabase.co/auth/v1/callback`
     - ⚠️ Substitua `[SEU-PROJETO]` pela URL do seu projeto Supabase

3. Clique em **"Registrar"**

### Passo 4: Copiar o Application (client) ID

1. Na página do aplicativo, você verá:
   - **ID do Aplicativo (cliente)**: `12345678-1234-1234-1234-123456789abc`
   
⚠️ **GUARDE ESTE ID** - você precisará dele no Supabase!

### Passo 5: Criar um Client Secret

1. No menu lateral do aplicativo, vá em **"Certificados e segredos"** (Certificates & secrets)
2. Clique em **"+ Novo segredo do cliente"**
3. Configure:
   - **Descrição**: `FabCaq Client Secret`
   - **Expiração**: Escolha **"730 dias (24 meses)"** (ou o período que preferir)
4. Clique em **"Adicionar"**

5. **IMPORTANTE**: Uma janela mostrará o **"Valor"** do segredo:
   - Exemplo: `abc123~xyz789.abcdefghijklmnop`
   - ⚠️ **COPIE AGORA** - ele não será mostrado novamente!

### Passo 6: Adicionar URIs de Redirecionamento Adicionais

1. No menu lateral, vá em **"Autenticação"** (Authentication)
2. Em **"URIs de redirecionamento"**, clique em **"+ Adicionar uma plataforma"**
3. Selecione **"Web"**
4. Adicione também:
   ```
   http://localhost:3000/auth/callback
   ```
5. Clique em **"Configurar"**
6. Role até o final e clique em **"Salvar"**

### Passo 7: Configurar Permissões (Opcional mas Recomendado)

1. No menu lateral, vá em **"Permissões de API"** (API permissions)
2. Certifique-se de que estas permissões estão presentes:
   - `User.Read` (já vem por padrão)
   - `email`
   - `openid`
   - `profile`

3. Se precisar adicionar:
   - Clique em **"+ Adicionar uma permissão"**
   - Escolha **"Microsoft Graph"**
   - Selecione **"Permissões delegadas"**
   - Adicione as permissões necessárias

---

## 🟢 PARTE 3: Configurando no Supabase

### Passo 1: Acessar Configurações de Auth

1. Acesse seu projeto no Supabase: https://supabase.com/dashboard
2. Vá em **"Authentication"** → **"Providers"**

### Passo 2: Configurar Google Provider

1. Encontre **"Google"** na lista de providers
2. Ative o toggle (switch)
3. Cole as credenciais do Google:
   - **Client ID**: Cole o ID que você copiou do Google Cloud Console
   - **Client Secret**: Cole o Secret que você copiou
4. Clique em **"Save"**

### Passo 3: Configurar Azure (Microsoft) Provider

1. Encontre **"Azure"** na lista de providers
2. Ative o toggle (switch)
3. Cole as credenciais da Microsoft:
   - **Client ID**: Cole o Application (client) ID do Azure
   - **Client Secret**: Cole o Secret que você copiou
   - **Azure Tenant**: Digite `common` (permite contas pessoais e corporativas)
4. Clique em **"Save"**

---

## 🔗 PARTE 4: Configurar Variáveis de Ambiente

### Passo 1: Obter Credenciais do Supabase

1. No Supabase, vá em **"Settings"** → **"API"**
2. Copie:
   - **Project URL**: `https://[seu-projeto].supabase.co`
   - **anon public key**: Uma chave longa começando com `eyJ...`

### Passo 2: Criar arquivo .env.local

1. No seu projeto, copie o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://[seu-projeto].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## ✅ PARTE 5: Testando a Configuração

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse: http://localhost:3000/login

3. Teste o login com Google:
   - Clique em **"Entrar com Google"**
   - Selecione sua conta Google
   - Autorize o aplicativo
   - Você será redirecionado para `/dashboard`

4. Teste o login com Microsoft:
   - Faça logout primeiro (botão no dashboard)
   - Clique em **"Entrar com Microsoft"**
   - Entre com sua conta Microsoft
   - Autorize o aplicativo
   - Você será redirecionado para `/dashboard`

---

## 🐛 Troubleshooting (Resolução de Problemas)

### Erro: "redirect_uri_mismatch" (Google)

**Solução:**
1. Volte ao Google Cloud Console
2. Vá em Credenciais → Edite o OAuth Client
3. Verifique se as URIs de redirecionamento estão **exatamente** como:
   - `http://localhost:3000/auth/callback`
   - `https://[seu-projeto].supabase.co/auth/v1/callback`
4. Salve e aguarde alguns minutos

### Erro: "invalid_client" (Microsoft)

**Solução:**
1. Volte ao Azure Portal
2. Verifique se o Client Secret não expirou
3. Crie um novo secret se necessário
4. Atualize no Supabase

### Erro: "Email not allowed"

**Solução:**
1. No Google Cloud Console, adicione seu email em "Usuários de teste"
2. Ou publique o aplicativo (mude de "Testing" para "Production")

### Nenhum provider aparece no Supabase

**Solução:**
1. Verifique se salvou as configurações no Supabase
2. Limpe o cache do navegador
3. Reinicie o servidor de desenvolvimento

---

## 📊 Limites do Plano Gratuito

### Google Cloud (Gratuito para sempre)
- ✅ OAuth ilimitado
- ✅ 100 usuários simultâneos
- ✅ Sem limite de autenticações

### Microsoft Azure (Gratuito)
- ✅ OAuth ilimitado
- ✅ Sem custo para autenticação básica
- ⚠️ Algumas features avançadas podem ter limite

### Supabase (Plano Free)
- ✅ 50.000 usuários ativos mensais
- ✅ Autenticação ilimitada
- ✅ Social OAuth incluído
- ⚠️ 500 MB de armazenamento de banco de dados

---

## 📝 Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] Projeto criado no Google Cloud Console
- [ ] Credenciais OAuth do Google copiadas
- [ ] Aplicativo registrado no Azure Portal
- [ ] Credenciais OAuth da Microsoft copiadas
- [ ] Providers configurados no Supabase
- [ ] Arquivo `.env.local` criado e preenchido
- [ ] Servidor rodando com `npm run dev`
- [ ] Login com Google testado e funcionando
- [ ] Login com Microsoft testado e funcionando
- [ ] Redirect para dashboard funcionando
- [ ] Logout funcionando corretamente

---

## 🎯 Pronto!

Sua autenticação OAuth está configurada e funcionando! 🎉

Qualquer dúvida, consulte a documentação oficial:
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)