# SpeakUp 2.0 — Fase 1: Interface visual

Protótipo navegável de uma plataforma de Speaking e Listening. Interface em português brasileiro, com referências visuais fornecidas pelo solicitante. **Não há integração real com ChatGPT, autenticação, captura de microfone/aba, sincronização, pagamento ou avaliação automática.** Não é necessário informar credenciais reais.

## Começar no Windows (ou Linux/macOS)

1. Extraia o ZIP e abra a pasta `SpeakUp_Fase1_React` no VS Code.
2. Use Node.js 22 LTS (22.12 ou superior), ou outra versão compatível indicada em `package.json`.
3. Abra o terminal integrado do VS Code (`Ctrl + '`) na pasta que contém `package.json`.
4. Execute os comandos abaixo, um de cada vez:

```sh
npm install
npm run dev
```

Acesse o endereço informado pelo Vite (normalmente `http://localhost:5173`). Para encerrar, pressione `Ctrl+C` no terminal. Não existem arquivos `.bat`, servidor de prévia alternativo ou bibliotecas React vendorizadas. O ponto de entrada é `index.html`, que carrega `src/main.tsx` pelo Vite; não abra o HTML diretamente por duplo clique.

### Comandos convencionais

```sh
npm install          # primeira instalação, gera package-lock.json
npm ci               # instalações seguintes, depois de gerar o lockfile
npm run dev          # desenvolvimento com Vite
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build        # gera dist/ para publicação
npm run preview      # serve o build de produção localmente
```

**Limitação da entrega:** o registro npm não está acessível neste ambiente, portanto não foi possível gerar um `package-lock.json` válido nem instalar as dependências. Execute `npm install` primeiro e versione o lockfile gerado. As versões diretas estão fixadas no manifesto. A validação completa do typecheck, lint e build deve ocorrer após a instalação.

## Netlify

Suba o código principal para um repositório Git, gere e versione `package-lock.json` localmente, conecte o repositório na Netlify. O `netlify.toml` configura Node 22, `npm run build`, pasta `dist` e fallback de rotas SPA. A publicação só deve ser considerada validada após build bem-sucedido; não foi feito deploy nesta fase. Nenhuma variável secreta é necessária.

## Mapa de rotas

| Caminho | Área |
|---|---|
| `/` | Landing |
| `/login`, `/cadastro`, `/recuperar` | Formulários demonstrativos |
| `/dashboard` | Painel de estudo |
| `/pratica` | Configurar prática |
| `/biblioteca` | Roteiros, filtros, favoritos e importação |
| `/explicacao` | Explicação guiada sem XP |
| `/conversacao` | Conversação imersiva manual |
| `/relatorio/importar` | Validação e prévia de JSON |
| `/resultados` | Relatório de exemplo ou importado |
| `/evolucao` | Progresso e gráficos de amostra |
| `/historico` | Histórico e remoção local |
| `/ranking`, `/conquistas` | Ranking e conquistas de amostra |
| `/perfil` | Preferências, aparência e privacidade |

## Organização

- `src/App.tsx`: estado, rotas, navegação, diálogos e persistência local.
- `src/components/ui.tsx`: componentes reutilizáveis, botões, navegação, gráficos, personagens e indicadores.
- `src/features/pages.tsx`, `settings.tsx`: páginas e configurações.
- `src/services/contracts.ts`: contratos tipados para serviços futuros.
- `src/services/data.ts`: dados fictícios e roteiros de demonstração.
- `src/services/validation.ts`: validação de JSON e persistência local.
- `src/styles.css`, `tailwind.config.cjs`: tokens, layout, temas, responsividade e redução de movimento.
- `public/assets/`: ilustrações e cenários locais derivados das referências fornecidas; exemplos de JSON.
- `examples/`: modelos editáveis de roteiro e relatório.
- `tests/`: registro de verificações desta revisão.

## Preparação da fase 2

Esta entrega é um projeto frontend convencional React/Vite. Node.js é utilizado como runtime de desenvolvimento, não como uma API ativa. Na fase 2, poderá ser adicionada uma API Node.js em pasta própria (por exemplo `server/`), preservando os contratos em `src/services/contracts.ts`. Não foram adicionados servidor backend, credenciais, captura de áudio nem autenticação real. A escolha de framework e arquitetura da API ficará para aprovação da fase 2.

## Decisões visuais e comportamento

Identidade lavanda/roxo, verde, creme, superfícies translúcidas, atmosfera escura de restaurante e personagens humanos das referências. Menu lateral no painel e menu superior para navegação geral; telas internas também mantêm navegação lateral para consistência. Tutor em roxo e aluno em verde, seguindo a instrução textual mais recente (invertida em algumas imagens). Personagens são recortes tratados das referências fornecidas com animação CSS de boca e movimento; não são um rig de animação facial completo. Cenários são recortes locais, não imagens remotas. A landing não reproduz avaliações nem quantidade fictícia de clientes da referência. Login e cadastro em rotas distintas, sem guardar senhas. Tema claro/escuro/sistema, controles com foco visível, rótulos e redução de animação. Cena de conversa permanece escura para manter imersão.

Roteiros de amostra têm conteúdo limitado: 24 roteiros em 3 idiomas, com restaurante mais detalhado; demais cenários têm exemplos curtos. Nível selecionado não altera automaticamente a complexidade das frases. Idiomas adicionais podem ser cadastrados, mas precisam de roteiros importados. Preferências e importações persistem localmente, sem conta real. Relatórios importados são dados fornecidos pelo usuário, não avaliações verificadas; métricas ausentes exibem “Não avaliada”. Dashboard, ranking, XP e evolução são exemplos estáticos identificados, não estatísticas reais. A captura de áudio, sincronização e preferência de voz só têm indicação visual. A dúvida em português é uma interação demonstrativa, sem resposta de IA.

## Testes e pendências

O arquivo `tests/resultado.txt` registra as verificações desta revisão. A prévia alternativa da entrega anterior foi removida; seus testes não equivalem ao build React/Vite atual. A verificação sintática não substitui typecheck semântico, lint ou testes em navegador. O design e as funcionalidades demonstrativas da fase 1 foram preservados; esta revisão muda a estrutura de execução e documentação, não recria as telas do zero.

Fase 2 — **não iniciada**: autenticação real, captura e sincronização de áudio/texto, alternância automática, integração conversacional, avaliação, sincronização de dados, rankings reais, expansão do conteúdo e animação facial refinada. Validar a stack completa e aprovar o visual antes de começar.
