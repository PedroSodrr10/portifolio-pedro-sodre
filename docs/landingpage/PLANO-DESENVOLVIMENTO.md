# Pedro Sodré — plano consolidado de desenvolvimento e entrega

Atualizado em 05/10/2026. Planejamento autorizado para execução em uma nova thread limpa.

## 1. Objetivo e ordem de referência

Implementar o portfólio profissional de Pedro Sodré e entregá-lo em produção na Vercel, com revisão visual por Pedro e formulário enviando solicitações reais ao Gmail. Uma preview não encerra a entrega.

Ler, nesta ordem: este plano, `DIRECAO-VISUAL.md`, `BRIEFING.md` e `content/landing-content.json`. As decisões deste plano e a direção visual mais recente substituem sugestões históricas divergentes. `.design/checkup-report.md` é análise histórica da referência inicial, não a identidade final.

O usuário aprovou avançar com o visual expressivo das referências cyberpunk. Não reabrir decisões já tomadas; coletar somente dados efetivamente faltantes quando necessários e continuar o trabalho independente.

## 2. Ambiente e destinos

- Pasta de trabalho: `E:\Dev\portifolio-sodre`.
- GitHub: https://github.com/PedroSodrr10/portifolio-pedro-sodre (sem ponto final).
- Inspeção anterior: repositório público vazio e sem branches; metadata indicava default `123`, ainda sem ref. Pasta local sem Git e contendo apenas documentação e conteúdo. Revalidar antes de inicializar.
- Node local verificado: 22.20.0; npm 10.9.3. Git e GitHub CLI instalados. Há conectores GitHub e Vercel disponíveis; a CLI encontrou restrição de rede na inspeção, o conector GitHub funcionou.
- Equipe Vercel confirmada: `pedrosodrr10s-projects`, ID `team_FtaztvNNUBUZhtm52kEcV9pc`.
- Não havia projeto Vercel vinculado ao repositório. Criar/vincular `portifolio-pedro-sodre` após revalidar, evitando duplicatas.
- Primeira entrega em URL pública `vercel.app`, sem necessidade de domínio próprio.
- Criar `main` e defini-la como padrão no repositório vazio. Implementar em `feat/portfolio`, revisar preview e integrar à `main` para produção. Não sobrescrever alterações que tenham surgido desde a inspeção.

## 3. Base técnica

- Next.js App Router, React, TypeScript, runtime Node.js 22 e npm.
- Confirmar versões estáveis compatíveis no início e fixá-las no lockfile. Sem upgrades oportunistas posteriores.
- CSS Modules e variáveis CSS. Conteúdo em fonte única, reaproveitando o JSON existente com tipagem e validação compatíveis.
- Componentes de servidor para conteúdo; componentes de cliente somente onde houver interação.
- `next/image` para prévias reais com dimensões e tamanhos responsivos; fontes otimizadas via Next.
- Preservar documentação existente: o diretório não está vazio, portanto não executar um inicializador que exija pasta vazia ou sobrescreva artefatos.
- Sem blog, CMS, painel, login, pagamentos, analytics ou banco de solicitações nesta versão.
- Não criar subagentes por conta própria; esta nova thread é a responsável pela execução.

## 4. Direção visual definitiva para esta implementação

### Referências

Inspecionar as duas imagens locais em `.design/references/` antes de desenhar. Elas são apenas referência, não assets do site nem conteúdo a publicar no GitHub. A primeira orienta interface; a segunda orienta geometrias e molduras. Os detalhes estão em `DIRECAO-VISUAL.md`.

Criar identidade própria de Pedro Sodré: painéis cyberpunk, cantos chanfrados, linhas interrompidas, amarelo elétrico e seleção azul-ciano. A aparência deve ser reconhecível mesmo sem animação. Não reduzir o pedido a um template dark genérico com pequenos detalhes neon.

### Sistema visual

| Papel | Valor |
|---|---|
| Fundo | `#080A0B` |
| Painéis | `#111518` |
| Texto principal | `#F4F4EC` |
| Texto secundário | `#B5B9B8` |
| Amarelo elétrico | `#FCEE09` |
| Azul-ciano | `#00D9F5` |
| Títulos/assinatura | Rajdhani 600 e 700 |
| Corpo/navegação | system-ui / Segoe UI / sans-serif |

- Amarelo para assinatura, títulos, segmentos de molduras e CTA. Texto escuro sobre botões amarelos.
- Ciano para seleção, foco, indicação de seção ativa e interação. Seleção de texto com fundo ciano e texto preto. Estados distinguíveis também por contorno/sublinhado.
- Geometrias originais em SVG/CSS: volume em arame, grades parciais em perspectiva, traçados angulares nas laterais. Fundos mascarados sob áreas de leitura.
- Bordas retas e recortes de 8–14 px; evitar cards arredondados, grandes halos e gradientes genéricos.
- Mais expressão na abertura e projetos; mais calma nos serviços e formulário. Sem telemetria, gráficos ou métricas fictícias como prova profissional.
- Sem fotografia de Pedro, assets do jogo ou imagem Shutterstock reutilizada. A segunda referência mantém suas marcas-d'água e serve somente à consulta.
- Desktop com largura de conteúdo aproximadamente 1120–1200 px. Mobile com coluna única, margens de 20 px e grafismo simplificado.

### Estrutura e textos

Cabeçalho → abertura → serviços → projetos → sobre → contato/formulário → rodapé.

Usar os textos já preparados no JSON e briefing, incluindo “Seu negócio merece um site à altura.” e a apresentação de mais de cinco anos de experiência. Serviços: sites, landing pages e reformulação. Público sem nicho obrigatório. Não inventar clientes, depoimentos, tecnologias dominadas ou resultados.

Cabeçalho com navegação por âncoras e “Solicitar orçamento”. Abertura com CTA para WhatsApp quando configurado e link para serviços. Enquanto faltar o número, a preview usa um CTA real para o formulário; não criar WhatsApp fictício.

## 5. Animações e projetos

### Boas-vindas

- Incorporar Glitch Text do React Bits na variante TypeScript/CSS, preservando licença e adequando sua execução.
- Saudação “Bem-vindo” com glitch por aproximadamente 900 ms, uma vez por sessão, sem bloquear conteúdo nem exigir clique.
- Sem flashes de tela inteira, sons, autoplay de vídeo ou cursor personalizado.
- Saudação estática com movimento reduzido, sem JavaScript ou se não for possível usar armazenamento de sessão com segurança.
- Entrada dos cards via CSS e IntersectionObserver, uma vez ao entrar em vista. Não incluir bibliotecas de animação adicionais só para esse efeito.

### Carrossel

- Implementar com React e CSS Scroll Snap, sem depender de adaptação incerta de um carrossel de item único. React Bits Carousel pode servir de referência, mas o contrato abaixo prevalece.
- Três cards a partir de 1024 px, dois entre 640–1023 px e um abaixo de 640 px.
- Setas, swipe e teclado; um card por avanço, sem autoplay ou loop infinito.
- Setas desativadas nos limites; controles omitidos quando todos os itens couberem. Foco deve trazer o card para a área visível.
- Card real: identificação estável, imagem, texto alternativo, nome, categoria, descrição curta e URL. Moldura amarela angular; interação/foco ciano; link com ícone e nome acessível “Visitar [projeto]”.
- Imagem com espaço reservado, skeleton de varredura durante carregamento verdadeiro e fallback em erro. Não atrasar imagem pronta para mostrar efeito.

### Sem projetos reais

Pedro escolheu publicar inicialmente três espaços “Projeto em preparação”, sem links falsos. Os espaços terão revelação visual curta e terminarão estáticos, sem loading infinito.

Criar `/preview/projetos` somente para desenvolvimento/preview, com seis exemplos de demonstração e controles para simular carregamento, sucesso e erro. Em produção, essa rota retorna 404. As simulações são claramente identificadas; não são trabalhos de Pedro.

Os projetos reais serão adicionados depois, sem impedir a entrega desta versão. Documentar a inclusão no JSON e nas imagens locais.

## 6. Formulário e e-mail

### Contrato funcional

Campos obrigatórios: nome, e-mail, serviço desejado e descrição do projeto. Opcionais: WhatsApp, site atual e prazo desejado. Opções de serviço: Site, Landing page, Reformulação de site, Preciso de orientação.

- Validar com Zod no servidor e compartilhar regras apropriadas com o cliente.
- Rótulos visíveis, mensagens associadas aos campos, estado “Enviando…” e bloqueio de duplo clique.
- Preservar dados em erro; oferecer alternativa de contato somente quando configurada.
- Sem anexos, cadastro, inscrição em marketing ou resposta automática ao visitante.
- Informar uso dos dados para responder à solicitação.

### Endpoint e integração

`POST /api/orcamento`, runtime Node.js. Receber somente campos previstos, identificador de submissão e honeypot. Responder com sucesso, erros de validação, limite de tentativas ou indisponibilidade.

Nodemailer + Gmail SMTP `smtp.gmail.com:465`, TLS. Aguardar aceitação SMTP antes de responder; não enviar em background após a resposta.

Variáveis privadas: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`. Remetente igual à conta autenticada, destinatário fixo e Reply-To igual ao e-mail validado do visitante. O cliente não controla remetente, destinatário, HTML ou assunto arbitrário.

Pedro fornecerá o Gmail e configurará a senha de app diretamente no ambiente. Não pedir senha pessoal, não expor credenciais no chat, Git ou JSON. Documentar as variáveis sem valores secretos.

Se a conta não permitir senha de app ou rejeitar autenticação, declarar a pendência e continuar tarefas independentes. Não simular sucesso nem trocar provedor silenciosamente. Sucesso SMTP não comprova recebimento em caixa de entrada; a entrega final exige teste real confirmado.

### Proteção e falhas

- Limitar tamanho da requisição e campos, validar URL/e-mail e escapar textos do template.
- Honeypot e limite distribuído via Upstash Redis: cinco tentativas por 15 minutos por origem e teto inicial de cem envios/dia.
- Identificadores de origem derivados por hash com segredo do servidor, sem persistir IP bruto. Guardar apenas chaves temporárias de controle, não conteúdo de leads.
- Reduzir duplicações por identificador de submissão e estado temporário; não prometer entrega exatamente uma vez por SMTP.
- Não reenviar automaticamente após timeout de resultado incerto. Não registrar mensagem do cliente nem segredos nos logs.
- Falta de configuração/proteção ou falha do serviço deve impedir envio e mostrar erro honesto; nenhum fallback de sucesso fictício.
- Prever `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` e segredo de hash apenas no servidor. Usar opção gratuita se disponível; não contratar plano pago automaticamente.

## 7. Execução, revisão e deploy

1. Ler referências e instruções aplicáveis; verificar estado atual, preservar arquivos e inicializar a base.
2. Implementar a página e o sistema visual completo, com conteúdo canônico e responsividade.
3. Implementar glitch, carrossel, skeleton e vista de demonstração.
4. Implementar formulário, testes de servidor e integração preparada para credenciais.
5. Criar/vincular projeto Vercel ao GitHub, configurar branch de produção `main` e publicar preview da branch de desenvolvimento.
6. Entregar preview a Pedro para a revisão visual combinada. A falta de contatos/credenciais não impede chegar a essa etapa; manter pendências explícitas.
7. Incorporar ajustes, configurar contatos/serviços e validar envio real de solicitação de teste identificada ao Gmail de Pedro.
8. Após a revisão combinada, integrar à `main` e publicar produção na Vercel. O usuário já definiu deploy como parte da tarefa; não reabrir autorização genérica de publicação.
9. Verificar URL pública, deployment READY, logs, contatos e formulário. Registrar commit, URL e verificações.

Se criar PR, anexá-la à thread pelo recurso do app. Não publicar comentários externos desnecessários. Em falhas de deploy, diagnosticar e corrigir antes de concluir.

## 8. Verificação e critérios de conclusão

- Executar TypeScript, lint, build e testes pertinentes do endpoint com envio simulado apenas nos testes automatizados.
- Testar dados válidos/inválidos, limites, proteção antispam, falha de SMTP, repetição de submissão e tentativa de alterar destinatário.
- Inspecionar screenshots em 375, 768 e 1440 px; verificar também zoom 200%, foco, teclado, movimento reduzido, navegação e menu mobile.
- Exercitar carrossel com um, três e seis itens; carregamento, erro de imagem e navegação até limites.
- Verificar console/hidratação, imagens, fontes, ausência de overflow indevido, metadados, um H1, idioma pt-BR e links reais.
- Criar favicon/imagem social próprios; canonical e sitemap usam URL de produção confirmada. Previews fora da indexação.
- Validar build de produção e navegação na URL publicada. `/preview/projetos` não pode estar disponível em produção.
- Testar pedido real identificado para Pedro, confirmar recebimento e Reply-To, sem enviar mensagens a terceiros.

Concluído somente após: revisão visual de Pedro e ajustes acordados; produção pública HTTPS em estado READY; contatos reais; teste real do Gmail; código e lockfile no GitHub; três cards provisórios claramente identificados; documentação de manutenção e resultado das verificações.

Registrar como restaurar deploy anterior quando houver histórico. Não inventar resultado de teste, aprovação ou pontuação Lighthouse.

## 9. Pendências conhecidas e retomada

- WhatsApp com país/DDD e endereço Gmail: Pedro fornecerá durante o desenvolvimento.
- Senha de app Google e credenciais de proteção: configuração no ambiente antes da entrega final.
- Revisão visual: solicitação na nova thread depois que a preview estiver concreta e verificável.
- Projetos reais: posterior à primeira entrega, conforme decisão do usuário.

Atualizar `ESTADO.md` e registrar o resultado final em `ENTREGA.md`. A nova thread deve começar a implementar imediatamente com os dados disponíveis; não gastar outro turno apenas repetindo o plano.
