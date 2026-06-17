# Conexao Residuos

Site interativo para classificacao, consulta e treinamento sobre Residuos de Servicos de Saude (RSS), com conteudo baseado na RDC 222/2018.

## Recursos

- Classificacao dos grupos A, B, C, D e E.
- Consulta por cenarios praticos.
- Biblioteca de manuais.
- Quiz com participantes, ranking, estatisticas e certificado.
- Integracao com Supabase para perguntas, participantes e tentativas.
- Interface em portugues, espanhol e ingles.

## Requisitos

- Node.js 20 ou superior.
- Projeto Supabase configurado.

## Configuracao local

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env.local` e preencha:

```bash
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_ANON_KEY="sua-chave-anon-publica"
```

Use apenas a chave `anon public`. Nunca coloque `service_role` ou chaves privadas no frontend.

3. Rode o projeto:

```bash
npm run dev
```

## Banco de dados

Os scripts SQL ficam em `supabase/sql` e o arquivo consolidado fica em `supabase/schema.sql`.

Execute no Supabase SQL Editor, na ordem:

```text
001_create_rss_history.sql
002_create_questions.sql
003_seed_questions.sql
004_create_quiz_participants_attempts.sql
005_create_quiz_public_stats_function.sql
006_harden_quiz_data_access.sql
007_create_admin_access.sql
```

## Area administrativa

A area `Admin` usa login real pelo Supabase Auth e valida permissao pela tabela `public.admin_users`.

Passos basicos:

1. Crie o usuario administrador em `Authentication > Users`.
2. Execute o SQL `007_create_admin_access.sql`.
3. Cadastre o usuario como admin:

```sql
insert into public.admin_users (user_id, email)
values ('UUID_DO_USUARIO_AUTH', 'seu-email@exemplo.com');
```

## Validacao

Antes de publicar:

```bash
npm run lint
npm run build
```

## Deploy

Para Vercel, configure as variaveis de ambiente:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

O arquivo `vercel.json` inclui cabecalhos basicos de seguranca.
