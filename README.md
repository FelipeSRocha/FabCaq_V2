# FabCaq V2 - B2B Marketplace

Marketplace B2B (vitrine de fornecedores) focado em simplicidade e entrega rápida.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Estilização**: Tailwind CSS
- **UI Kit**: Shadcn/ui
- **Backend/Auth**: Supabase (@supabase/ssr)
- **Ícones**: Lucide-react

## 📋 Sprint 1 - Concluída

✅ Setup do ambiente  
✅ Autenticação via SSO (Google e Microsoft)

## 🛠️ Setup e Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings** → **API** para obter suas credenciais
4. Copie o arquivo de exemplo:

```bash
cp .env.local.example .env.local
```

5. Edite o arquivo `.env.local` e adicione suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### 3. Configurar OAuth Providers no Supabase

#### Google OAuth

1. No painel do Supabase, vá em **Authentication** → **Providers**
2. Ative o provider **Google**
3. Configure as credenciais do Google Cloud Console:
   - Acesse o [Google Cloud Console](https://console.cloud.google.com)
   - Crie um novo projeto ou selecione um existente
   - Vá em **APIs & Services** → **Credentials**
   - Crie um **OAuth 2.0 Client ID**
   - Adicione as URLs de redirect autorizadas:
     - `http://localhost:3000/auth/callback` (desenvolvimento)
     - `https://seu-projeto.supabase.co/auth/v1/callback` (produção)
   - Copie o **Client ID** e **Client Secret** para o Supabase

#### Microsoft/Azure OAuth

1. No painel do Supabase, vá em **Authentication** → **Providers**
2. Ative o provider **Azure**
3. Configure no [Azure Portal](https://portal.azure.com):
   - Vá em **Microsoft Entra ID** → **App registrations**
   - Crie um novo registro
   - Adicione as URLs de redirect:
     - `http://localhost:3000/auth/callback`
     - `https://seu-projeto.supabase.co/auth/v1/callback`
   - Copie o **Application (client) ID** e crie um **Client Secret**
   - Cole as credenciais no Supabase

### 4. Executar o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
├── app/
│   ├── auth/
│   │   ├── callback/          # Callback OAuth
│   │   └── signout/           # Rota de logout
│   ├── dashboard/             # Dashboard protegido
│   ├── login/                 # Página de login
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/                    # Componentes Shadcn/ui
├── hooks/                     # React hooks
├── lib/                       # Utilitários
├── utils/
│   └── supabase/
│       ├── client.ts          # Cliente Supabase (browser)
│       ├── server.ts          # Cliente Supabase (server)
│       └── middleware.ts      # Lógica de middleware
└── middleware.ts              # Middleware de proteção de rotas
```

## 🔐 Fluxo de Autenticação

1. Usuário acessa `/login`
2. Clica em "Entrar com Google" ou "Entrar com Microsoft"
3. É redirecionado para o provider OAuth
4. Após autenticação, retorna para `/auth/callback`
5. O callback troca o código por uma sessão
6. Usuário é redirecionado para `/dashboard`
7. O middleware protege rotas que requerem autenticação

## 🛡️ Rotas Protegidas

- `/dashboard` - Requer autenticação
- Todas as outras rotas exceto `/login` e `/auth/*` redirecionam para login se não autenticado

## 📝 Próximos Passos

- [ ] Implementar perfil de empresas
- [ ] Criar catálogo de produtos/serviços
- [ ] Sistema de busca e filtros
- [ ] Sistema de favoritos
- [ ] Página de contato com fornecedores

## 🤝 Contribuindo

Este é um projeto pessoal em desenvolvimento.

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.