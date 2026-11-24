# Verificações reais nesta entrega

Ambiente: Node 22.16.0 / npm 10.9.2, registro npm indisponível (DNS EAI_AGAIN). O arquivo `npm-install.log` contém o erro. Sem dependências instaladas ou credenciais externas.

- `npm run test:smoke`: 14 testes Node independentes, 14 passaram (RMS sintético por amostras de nível, estado de turno, limites XP, média e sequência). Não equivale a captura Web Audio real ou Vitest.
- Transpilação sintática TypeScript: 14 arquivos, zero diagnósticos de sintaxe (não typecheck).
- `npm run typecheck`: executado, falhou (código 2) sem módulos React, Supabase, Zod etc. Não foi possível separar eventuais erros semânticos reais da falta de dependências.
- `npm run lint`: executado, falhou (127), ESLint não instalado.
- `npm test`: executado, falhou (127), Vitest não instalado.
- `npm run build`: executado, falhou (2), typecheck bloqueado.
- `npm run test:e2e`: executado, falhou (1), Playwright não instalado.
- Teste de integração Supabase/duas contas, SQL, autenticação real, navegador, responsividade, tema, compartilhamento de áudio/microfone e publicação: não executados. Dependem de configuração, instalação e ambiente autorizado.

Os logs correspondem às tentativas nesta entrega; não representam testes aprovados. A suíte Vitest e Playwright incluída precisa ser executada após instalação. Não há lockfile genuíno, pois o registro não pôde ser consultado.
