# Preview para revisão — Pedro Sodré

Data: 05/10/2026. **Entrega de produção ainda não concluída.**

- Preview: https://portifolio-pedro-sodre-h3yjn51ze-pedrosodrr10s-projects.vercel.app
- Demonstração: https://portifolio-pedro-sodre-h3yjn51ze-pedrosodrr10s-projects.vercel.app/preview/projetos
- Deployment: `dpl_CVkjrkLCWJAnYR6KqB6eaknAdgJo`, target `preview`, estado `READY`.
- Commit da aplicação: `8c1e1f3` (implementação em `1acc884`). Branch `feat/portfolio`.
- Framework: Next.js 16.3.8 / React 19.3.0 / Node 22. Build Vercel: 23 segundos.
- A preview tem autenticação Vercel. Pedro pode acessá-la com a conta usada para conectar a CLI.

## Verificado

- TypeScript e ESLint sem erros; build local e build Vercel aprovados.
- Nove testes Node do endpoint: válido, inválidos, payload grande, honeypot, injeção de destinatário, indisponibilidade de configuração/proteção, limite, SMTP incerto, submissão duplicada/concomitante, conflito de conteúdo, origem e escape HTML. SMTP e armazenamento simulados somente nos testes unitários.
- Auditoria npm: nenhuma vulnerabilidade em dependências de produção. Cinco alertas de desenvolvimento transitivos ligados a `braces` no ESLint/Next; a correção automática sugeria downgrade incompatível de Next ESLint e não foi aplicada. Nenhuma exposição desse código no endpoint.
- Capturas locais inspecionadas em 375, 768 e 1440 px; verificado também reflow em 320 e 720 px, sem overflow horizontal relevante. Capturas em `qa/` (locais, não publicadas).
- Menu mobile, fechamento por Escape, foco ciano, navegação por âncoras e formulário por teclado. Campos obrigatórios produzem mensagens associadas. Dados preservados em indisponibilidade.
- Carrossel: três/duas/uma colunas; quantidades 1, 3 e 6; controles ocultos quando todos cabem; avanço de um card por teclado; simulações de imagem carregando/sucesso/erro. Sem autoplay. Preferência de movimento reduzido verificada.
- Home e demonstração remotas retornam HTTP 200 via acesso autenticado; um H1, idioma pt-BR e noindex. `robots.txt` da preview bloqueia indexação.
- Build local de produção retorna HTTP 404 para `/preview/projetos`.
- WhatsApp e e-mail confirmados configurados com destinos reais. Nenhuma mensagem enviada para teste de links.

## Limites da validação e próximos passos

- Revisão visual de Pedro pendente; incorporar ajustes antes da produção.
- Configurar Gmail App Password e Redis Upstash gratuito nos ambientes privados. Não enviar segredos no chat. Configuração em `.env.example` e `README.md`.
- Validar script Redis real, limite distribuído e recebimento de uma solicitação identificada no Gmail; conferir Reply-To com Pedro. Os testes locais não comprovam essas integrações reais.
- Zoom CSS 200% foi explorado, mas não equivale a zoom nativo do navegador; reflow equivalente em 720 px foi verificado. Zoom nativo e leitor de tela ainda não certificados.
- Domínio de produção reservado: `portifolio-pedro-sodre.vercel.app`. Configurar `SITE_URL` após revisão. Fazer novo build production; não promover artefato preview pois a rota de demonstração e indexação dependem do ambiente.
- A Vercel classificou os primeiros deploys de projeto vazio como produção, inclusive a primeira tentativa explícita de preview. Foi necessário criar o segundo deploy antes de retirar o primeiro para obter target preview. A publicação inicial de produção deve permanecer removida até a revisão.
- Sem produção anterior aprovada para rollback. Após produção validada, registrar seu deployment e usar Instant Rollback para a última produção aprovada quando houver histórico.
