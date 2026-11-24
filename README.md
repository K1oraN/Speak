# SpeakUp 2.0 — Fase 2 (implementação para validação)

Projeto React/TypeScript/Vite/Tailwind baseado na entrega `SpeakUp_Fase1_React.zip`. Preserva CSS, ilustrações, cenários, navegação, componentes, landing, configuração e biblioteca; as telas anteriormente fictícias foram ligadas ao modelo de dados real e algumas foram adaptadas para eliminar números de exemplo. As nove referências estão em `referencias/`. O README original está em `README_FASE1.md` para histórico. Sem `.bat`, Python, VPS, API de IA paga ou gravação. Node é runtime de desenvolvimento/build; Supabase é o backend de autenticação e persistência, com regras transacionais em PostgreSQL (sem servidor Node permanente na Netlify).

**Estado:** implementação entregue para instalação e validação. Não publicada. O registro npm falhou com `EAI_AGAIN`; não foi possível resolver dependências transitivas, gerar lockfile genuíno, validar semanticamente o TypeScript, lint, Vitest, Playwright ou build. Não existe `package-lock.json` nesta entrega por esse motivo. Não use um lockfile fictício. Os testes Node independentes e a sintaxe foram verificados (veja `tests/RESULTADOS.md`). Não há credenciais Supabase nem testes reais de captura de áudio disponíveis neste ambiente.

## 1. Requisitos e execução (Windows, Chrome/Edge)

Node.js 22.16 ou superior na linha 22 LTS, npm, VS Code e conexão à internet para instalação. Use PowerShell ou terminal integrado na pasta que contém `package.json`.

```sh
npm install
```

A primeira instalação gera `package-lock.json`. Revise/versione esse arquivo. Nas instalações seguintes:

```sh
npm ci
npm run dev
```

Abra `http://localhost:5173`. Não abra index.html diretamente. Configure `.env` antes de usar as rotas protegidas. Comandos de verificação:

```sh
npm run typecheck
npm run lint
npm test
npm run test:smoke
npm run build
npm run preview
npx playwright install chromium
npm run test:e2e
```

`npm run build` gera `dist/` apenas se o typecheck passar; `npm run preview` serve o resultado. Nenhuma senha de conta é necessária para visitar a landing. Para o restante, configure uma conta real.

## 2. Supabase

1. Crie um projeto próprio no Supabase (plano gratuito pode ser usado, sujeito aos limites e políticas vigentes). Em um projeto novo e vazio, abra SQL Editor e execute integralmente, na ordem, `supabase/migrations/001_schema.sql`, `002_reports.sql`, `003_script_validation.sql`. Cada migração possui transação. Se falhar, pare e investigue o erro; não ignore erros ou aplique repetidamente em banco parcialmente configurado. Faça backup antes de migrar banco existente.
2. Em Authentication, habilite o provedor e-mail/senha; mantenha confirmação por e-mail conforme sua configuração. Configure Site URL para o domínio HTTPS de produção. Adicione `http://localhost:5173/**`, `http://localhost:4173/**` e as URLs autorizadas do seu domínio (`/dashboard`, `/nova-senha`) à lista de redirecionamento. Configure envio de e-mail/SMTP se necessário. Teste cadastro, confirmação, recuperação e logout.
3. Copie `.env.example` para `.env`. Preencha somente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (anon ou publishable key). Nunca use `service_role` ou credencial de banco no frontend. Essas duas variáveis são públicas no bundle. RLS é a barreira de acesso. Não comite `.env`.
4. Verifique RLS em `profiles`, `preferences`, `scripts`, `sessions`, `reports`, `xp_events`, `achievements`, `user_achievements`, `mutation_receipts`. Todas as tabelas privadas expõem SELECT apenas ao proprietário; alterações passam por RPCs com `auth.uid()`, `search_path` vazio e permissões restritas. `achievements` é catálogo comum. Ranking retorna apelido, posição, XP e indicação da própria conta; sem e-mail/ID público.
5. Use duas contas de teste confirmadas, em projeto descartável. No `.env` local informe `TEST_EMAIL_A`, `TEST_PASSWORD_A`, `TEST_EMAIL_B`, `TEST_PASSWORD_B` (não prefixe com VITE). Execute `npm run test:integration`. O teste cria registros temporários e os remove; não execute em conta de produção. Para Playwright com conta, exporte as variáveis de teste no terminal (PowerShell `$env:TEST_EMAIL_A = '...'`, `$env:TEST_PASSWORD_A = '...'`). A versão atual não automatiza confirmação por e-mail nem testa sincronização completa entre dispositivos.

### Modelo de dados

`profiles` apelido/privacidade; `preferences` JSONB; `scripts` JSONB e favorito; `sessions` dados relacionais; `reports` JSON original e JSONB; `xp_events` XP único por sessão; `achievements` catálogo; `user_achievements` conquistas persistidas; `mutation_receipts` recibos idempotentes da fila. O roteiro usa chave composta `(id,user_id)`: um mesmo exemplo pode ser importado por contas diferentes. `sessions.script_id` é um identificador histórico sem FK para roteiro, para não apagar histórico ao remover roteiros; criação valida propriedade. Relatórios e XP usam FKs compostas com cascata. Índices por proprietário e data. Não existe API própria obrigatória; as RPCs são o backend. O limite diário é calculado em transação por conta, com bloqueio consultivo. Valide SQL e isolamento no ambiente real antes de publicação.

## 3. Netlify

1. Gere o lockfile com `npm install`, execute todos os testes e build. Suba os fontes, `package-lock.json` e `netlify.toml` a um repositório Git; não suba `.env`, node_modules ou dados de teste.
2. Na Netlify, importe o repositório. Build `npm run build`, diretório de publicação `dist`, Node 22. `netlify.toml` já define SPA fallback `/* -> /index.html` status 200. Cadastre as duas variáveis VITE em Environment variables e faça deploy. HTTPS é necessário para captura fora de localhost. Alternativamente, com env configurado localmente, faça deploy manual da pasta `dist` gerada (a configuração de fallback deve acompanhar o build; veja `public/_redirects`).
3. Atualize Site URL e redirects no Supabase com o domínio Netlify. Valide acesso direto a `/dashboard`, `/nova-senha`, login/logout, atualização da página, dados de duas contas e áudio. Não há deploy ou conta externa já configurada neste ZIP.

## 4. Uso real em duas abas

Entre em sua conta. Em Biblioteca, adicione os três exemplos de restaurante (inglês, francês e espanhol A2), importe um JSON por arquivo ou colagem ou edite um roteiro. Para outros cenários ou níveis, gere roteiro próprio com `docs/PROMPT_ROTEIRO.md` ou use o modo livre. Selecione o roteiro, configure idioma, nível, personagem, voz preferida e legendas/tradução/pronúncia. Clique em iniciar prática; o identificador real da sessão é criado. Copie as instruções da tela de prática (ou selecione o texto manualmente se a área de transferência for negada). Abra ChatGPT em outra aba, cole instruções e inicie voz manualmente. Escolha a voz no próprio ChatGPT. SpeakUp não automatiza login, clique ou comando no ChatGPT.

Para áudio, clique em Microfone e autorize se desejar. Clique em Áudio da aba, escolha a aba específica do ChatGPT e marque compartilhar áudio. O navegador exige uma ação de usuário. Não compartilhe outras janelas ou dados sensíveis. `getDisplayMedia` pode exigir faixa de vídeo para a escolha da aba; a imagem não é gravada, renderizada nem enviada. Se a faixa de áudio faltar ou for encerrada, o estado mostra a falha; reconecte ou siga manualmente. O Web Audio usa dois contextos/analisadores independentes, sem conexão à saída de áudio. Não existe gravação ou envio de áudio. Ao encerrar, desmontar ou perder a faixa, tracks e contextos são liberados.

A detecção RMS suavizada usa limiar configurável, histerese de 65%, debounce de início de 100 ms, silêncio inicial contínuo de 1,2 s (ajustável de 0,5 a 3 s) e janela mínima de resposta de 350 ms antes de novo turno válido. A primeira fala inicia etapa zero. Apenas retorno da atividade do tutor pode avançar; microfone só anima aluno. Explicação e livre não avançam por som; congelamento mantém etapa. Ressincronizar limpa a memória de turno preservando etapa. A pausa manual suspende relógio ativo e avanço. Em explicação, diga “próxima etapa” ao ChatGPT após avançar localmente; a transição para conversa cria outra sessão. Ajuda/repetição dão instruções de fala ao aluno, não comandos automáticos. A boca é animação CSS, não lip-sync fonético.

Limitações: RMS não distingue significado, interrupção, correção ou repetição longa de novo turno. Ruído persistente, aba em segundo plano com timers limitados, fala sobreposta e pausas do tutor podem causar descompasso; não existe sincronização semântica. Use fones, ajuste limiar/delay, congele ou avance/volte manualmente. A fala do usuário capturada indiretamente no áudio da aba pode parecer fala do tutor. Captura universal de áudio do sistema não é garantida. Modo manual não exige nenhuma permissão. Se o navegador fechar antes de encerrar, sessão fica incompleta; não há recuperação exata do relógio não salvo. Evite sair da prática sem encerrá-la.

## 5. Relatórios, histórico, XP

Ao terminar, diga “encerramos por aqui” ao ChatGPT, copie o JSON escrito, encerre a sessão no SpeakUp e importe. A prévia valida versão/estrutura/UUID e correspondência de sessão, idioma, nível, roteiro e cenário. Confirmação exige conexão com Supabase e sessão sincronizada. Em falha, mantenha o texto, copie-o para arquivo e tente novamente. Relatório não fica na fila automática; a sessão e alterações comuns ficam. A revisão é explícita; excluir relatório remove XP, mas preserva sessão. Excluir sessão remove relatório e XP. Métricas nulas aparecem como não avaliadas e médias ignoram nulos. A cobertura de turnos e limitações aparecem no relatório. Os exemplos são apenas estrutura; não representam resultados de usuário.

XP (regra inicial): `min(100, max(0, 200 - XP_do_dia), 5 × minutos_ativos_inteiros + 2 × turnos_avaliados)`; 0 para explicação, sessão sem tempo ativo ou sem turnos avaliados. Regra central no RPC `import_report`, espelho em `src/core/stats.ts`. Para configurar, altere os valores em uma nova migração e no espelho/testes. Pontos únicos por sessão, transação no banco. Revisão remove XP anterior e aplica o saldo diário restante; exclusão não redistribui automaticamente XP antigo limitado pelo teto. Nível de experiência sobe a cada 500 XP, não CEFR. Conquistas são persistidas por RPC e exibidas a partir de agregados locais. Metas e sequência usam o dia civil/fuso registrado no início da sessão. Dia de uma sessão que atravessa meia-noite é o dia de início. Ranking é opt-in, autodeclarado e não verificado; tempo/relatório pode ser manipulado pelo usuário, não serve como classificação competitiva certificada.

## 6. Offline, privacidade e sincronização

Cache IndexedDB separado por UUID da conta; fila persistente para perfil, preferências, roteiros e sessões, com recibos de operações e revisão otimista. Web Locks serializa operações entre abas compatíveis no mesmo navegador. Reconexão dispara sincronização; botão manual em Perfil. Conflitos bloqueiam fila e exibem erro, não sobrescrevem silenciosamente. Exporte o cache/fila antes de descartar mudanças e recarregar dados online. Resolução por mesclagem campo a campo não foi implementada. Não há service worker: o app já aberto funciona offline, mas recarregar o site offline não é garantido. Primeira autenticação requer rede; o cache não substitui autorização. Logout não apaga fila pendente da conta; evite computador compartilhado ou exporte/sincronize e limpe dados do navegador. Não há criptografia própria do IndexedDB. Exportar baixa snapshot e fila, que podem conter dados pessoais. Excluir dados de estudo remove registros online e cache local, não exclui a conta de autenticação; para excluir conta Auth, o proprietário deve usar suporte/console Supabase com autorização apropriada. Outros dispositivos podem ainda possuir cache local antigo até nova sincronização.

## 7. Solução de problemas e checklist

- npm EAI_AGAIN: confirme DNS/internet, execute `npm install` novamente e só use `npm ci` após lockfile real.
- Login sem configurar: confira `.env`, reinicie Vite e confira confirmação de e-mail/URL.
- RLS/RPC: confirme migrações, chaves públicas, duas contas de teste e políticas. Não desative RLS para resolver erro.
- Microfone/aba: Chrome ou Edge desktop, HTTPS/localhost, permissões do sistema, escolha aba ChatGPT com compartilhar áudio. Se não houver faixa, use manual. A preferência de voz não muda a voz do ChatGPT.
- JSON: copie objeto sem Markdown; respeite contrato v1, UUID e sessão encerrada. Não reutilize relatórios antigos.
- Offline: exporte fila antes de descartar; sincronize e revise erros. Relatório deve ser confirmado online.

Checklist antes de produção: [ ] instalar e gerar lockfile [ ] typecheck/lint/Vitest/build [ ] aplicar SQL em projeto de teste [ ] isolamento A/B [ ] cadastro, e-mail, recuperação, logout [ ] abrir segunda máquina e recuperar dados [ ] offline, reconexão e conflitos [ ] importar roteiro e relatório válido/inválido/duplicado [ ] revisar e excluir XP [ ] testar modo livre/explicação/manual [ ] Chrome/Edge: microfone negado/concedido, compartilhar aba com e sem faixa, parar compartilhamento, reconectar, ruído, silêncio, pausas, repetições, fala simultânea, liberação de tracks [ ] tema e responsividade desktop/tablet/mobile [ ] Netlify e rotas SPA.

## 8. Arquivos e decisões

`src/App.tsx`: rotas protegidas e telas de conta, painel, evolução, biblioteca, histórico, ranking, resultados e perfil. `src/components/ui.tsx`, `src/features/pages.tsx`, `styles.css`: base visual reaproveitada. `src/features/LiveSession.tsx`: experiência imersiva real. `src/core/contracts.ts`, `prompt.ts`, `stats.ts`, `turns.ts`, `audio.ts`, `store.ts`: contratos, prompt, métricas, estados, áudio e persistência. `examples/`, `docs/`, `supabase/migrations/`, `tests/`. A fase 1 tinha apenas dados e autenticação fictícios; não existe migração automática de estatísticas falsas. O aplicativo usa português como interface; preferências de idioma se referem à prática. A sincronização em tempo real por push, edição de conflitos por campo, seleção enumerada de microfones, persistência de rascunho de relatório offline e avaliação semântica não estão implementadas. Testes reais de navegação e fidelidade visual após alterações estão pendentes.
