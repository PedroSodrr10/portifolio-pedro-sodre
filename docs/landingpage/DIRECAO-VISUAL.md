# Pedro Sodré — direção visual

Data: 05/10/2026. Estado: direção revisada acolhida pelo usuário e autorizada para implementação em nova thread. Seguir também `PLANO-DESENVOLVIMENTO.md`.

## Intenção

Portfólio com linguagem visual de painéis cyberpunk, inspirado nas duas imagens fornecidas por Pedro em 05/10/2026. Identidade expressiva e reconhecível: preto com amarelo elétrico, seleção azul-ciano, molduras angulares, filetes interrompidos e geometria de fundo. A assinatura Pedro Sodré, a tipografia e os trabalhos continuam como elementos principais. A presença do tema deve ser perceptível mesmo em uma captura estática, sem depender das animações. Criar desenhos e composição próprios para a marca Pedro Sodré.

A referência de Ian Dunkerley inspira hierarquia e simplicidade. A preferência atual de Pedro por dark substitui a sugestão anterior de alternância entre seção escura e branca. Não reproduzir a ilustração do laptop nem os assets da referência.

## Novas referências e prioridade

- Imagem 1, `codex-clipboard-abc578c9-6773-4f88-beaf-fb162da06ac8.png`: painel de mapa Cyberpunk. Referência principal de interface: preto, títulos amarelos condensados, categorias, linhas horizontais interrompidas, controles retangulares e detalhes azulados.
- Imagem 2, `codex-clipboard-ca325698-b15c-4d42-90e6-87a51e08a4c5.png`: prancha de painéis futuristas com marca-d'água Shutterstock. Referência de vocabulário gráfico: cantos chanfrados, segmentos amarelos, grades em perspectiva e volumes em arame azul-ciano. Não é asset licenciado do site; desenvolver geometrias próprias em SVG/CSS, sem remover marcas-d'água nem reutilizar a imagem publicada.
- Instrução confirmada de Pedro: fundo com geometrias e detalhes, amarelo como identidade e azul na seleção; um visual diferente do habitual que expresse sua relação com tecnologia.
- Esta revisão prevalece sobre cores, tipografia e arte da abertura descritas no plano anterior. O plano funcional permanece válido; as decisões de publicação e Gmail tomadas na conversa também prevalecem sobre versões antigas.

## Regras de composição do tema

- Bordas retas, recortes de 8–14 px nos cantos e linhas finas com pequenos segmentos sólidos. Evitar cartões arredondados e grandes halos difusos.
- Amarelo em títulos, assinatura, molduras importantes e CTA. Não contornar toda informação com o mesmo peso; cabeçalho, seção e card devem ter hierarquias distintas.
- Azul-ciano em item de navegação ativo, seleção de texto, foco de teclado e interação. Combinar cor com sublinhado, contorno ou indicador de posição. Seleção de texto com fundo ciano e texto quase preto.
- CTA principal amarelo com texto preto; em hover, usar detalhe de borda/canto azul. Foco tem contorno azul externo com separação escura para se distinguir do botão amarelo.
- Cabeçalhos de seção com numeração real, por exemplo `01 / SERVIÇOS`, e linha amarela recortada. Microtipografia decorativa deve ser curta e ter significado; não inventar telemetria, métricas ou status de sistema.
- Preservar áreas livres ao redor de títulos, descrições e botões. Não reproduzir a densidade inteira da segunda referência em cada seção.

## Paleta proposta

| Papel | Cor | Uso |
|---|---|---|
| Fundo | `#080A0B` | Preto quase neutro |
| Superfície | `#111518` | Painéis e campos sobre o fundo |
| Texto principal | `#F4F4EC` | Corpo e textos sobre superfícies escuras |
| Texto secundário | `#B5B9B8` | Legendas e conteúdo auxiliar |
| Amarelo elétrico | `#FCEE09` | Títulos, molduras, assinatura e CTA |
| Azul-ciano | `#00D9F5` | Seleção, foco, item ativo e detalhes geométricos |

Contrastes calculados pela luminância relativa das cores sólidas:

| Par | Razão aproximada |
|---|---|
| Texto principal / fundo | 17,95:1 |
| Texto secundário / superfície | 9,26:1 |
| Texto quase preto / botão amarelo | 16,41:1 |
| Texto quase preto / seleção azul | 11,57:1 |
| Azul / superfície | 10,70:1 |
| Amarelo / superfície | 15,18:1 |

Esses cálculos não validam o site pronto. Conferir estados, transparências e tamanhos reais na implementação. Usar texto escuro nos botões amarelos; não usar branco sobre amarelo.

## Tipografia proposta

- Títulos e assinatura: Rajdhani, pesos 600 e 700, substituindo Space Grotesk nesta revisão. Disponível no repositório oficial Google Fonts: https://github.com/google/fonts/tree/main/ofl/rajdhani. Preservar licença e carregar apenas os pesos utilizados.
- Usar caixa alta em rótulos de seção e assinatura; textos comerciais mantêm capitalização natural. Pequenos índices podem usar a pilha monospace do sistema.
- Texto e navegação: pilha de sistema `system-ui, Segoe UI, sans-serif`, com corpo entre 16 e 18 px.
- Título inicial: aproximadamente 64–88 px no desktop e 38–48 px no celular, usando escala fluida e ajuste às quebras reais.
- Títulos de seção: aproximadamente 32–48 px. Texto corrido com entrelinha de 1,5–1,65 e largura de leitura controlada.
- Evitar fontes de terminal em parágrafos e letras futuristas que dificultem a leitura. Identidade tecnológica vem da composição, dos detalhes e da paleta.

## Composição desktop

- Conteúdo centralizado em um contêiner de aproximadamente 1120–1200 px; texto alinhado à esquerda.
- Cabeçalho como faixa de navegação técnica, assinatura amarela, divisor segmentado e indicação azul da seção ativa. Navegação permanece convencional e curta.
- Abertura em duas colunas: proposta de valor à esquerda; composição original de geometria em arame e moldura angular à direita. O grafismo pode se estender às bordas da seção, mantendo área limpa atrás do texto.
- Serviços como três itens numerados, com separadores e descrições curtas; evitar repetição de caixas decorativas.
- Projetos em carrossel horizontal com três cards visíveis no desktop; título da seção, setas e indicador de posição. Cada card tem moldura amarela com cantos chanfrados e índices `01`, `02`, `03`. Interação e foco acrescentam indicadores cianos. A imagem ocupa a maior parte do card, sem sobreposição de grade/glitch que esconda o site; abaixo ficam nome, tipo de trabalho e link externo com ícone e nome acessível “Visitar [projeto]”.
- Sobre com título expressivo e parágrafo curto, sem foto.
- Fechamento com formulário de orçamento, convite claro e alternativas de contato. Campos legíveis em superfícies grafite, sem glitch durante preenchimento.

## Composição mobile

- Uma coluna e margens laterais de aproximadamente 20 px.
- Apresentação e CTA antes da composição gráfica; arte menor ou simplificada.
- Serviços empilhados; carrossel de projetos com dois cards em telas intermediárias e um no celular. Mostrar parte do próximo card quando houver espaço e outro projeto. Setas e teclado complementam o gesto de deslizar, permitindo acesso sem arrastar.
- Controles confortáveis para toque, com alvo proposto de pelo menos 44 px.
- Evitar elementos fixos que cubram texto ou rodapé.
- Validar quebras com o texto em português, larguras pequenas e zoom de 200%.

## Imagem principal e movimento

Proposta: composição gráfica original em SVG/CSS, com um volume geométrico em arame ciano, grades parciais em perspectiva e traçados angulares amarelos. O volume da abertura é o principal elemento decorativo e pode ter contraste maior que o restante do fundo. Deve ser decorativo e não representar um trabalho entregue.

O fundo terá três camadas: preto base, grade muito tênue e traçados técnicos posicionados nas laterais/divisões. Opacidade inicial de 4–8% para grades e 8–16% para traçados decorativos; ajustar na revisão visual. Usar máscaras para desaparecer sob áreas de leitura. Não transformar todas as seções em um papel de parede igualmente denso. Serviços e formulário usam fundo mais calmo; abertura e projetos concentram os detalhes.

Criar molduras e traçados com SVG/CSS responsivos, sem canvas/WebGL ou vídeo para essa composição. No celular, simplificar geometrias e reduzir sua quantidade. Elementos decorativos não recebem foco nem eventos de ponteiro e ficam ocultos de leitores de tela.

Brilho restrito a pequenos detalhes; corpo do texto sem glow. Evitar fundo animado contínuo, partículas, cursor personalizado e efeitos que competem com o portfólio. Transições breves em links e botões; respeitar `prefers-reduced-motion`.

## Boas-vindas com glitch

- Requisito confirmado: exibir “Bem-vindo” com animação de glitch cibernético ao carregar o portfólio.
- Proposta: inserir a saudação na abertura com duração aproximada de 700–1000 ms, na primeira entrada da sessão. Usar deslocamento curto de camadas em azul/amarelo e recortes horizontais; terminar com texto legível.
- O restante da página já deve estar disponível. Não criar espera artificial, tela bloqueante, som ou exigir clique para entrar.
- Sem flashes rápidos de tela inteira; movimento limitado à saudação. Camadas decorativas ocultas da árvore de acessibilidade para que a frase seja lida apenas uma vez.
- Com movimento reduzido, JavaScript indisponível ou armazenamento de sessão bloqueado, manter saudação estática e página utilizável.

## Cards e comportamento do carrossel

- Interpretar “três contêineres” como três projetos por vista no desktop, não um limite de três projetos no cadastro. Dados podem conter mais trabalhos.
- Conforme decisão posterior de Pedro: primeira publicação com três espaços explicitamente identificados como projetos em preparação, sem links fictícios. Vista de revisão exclusiva de desenvolvimento/preview com seis exemplos para testar navegação e loading. Com trabalhos reais, substituir os espaços pela lista publicada.
- Cards têm proporção estável para a imagem e breve efeito de entrada, como um filete de varredura ou revelação de borda. A entrada acontece uma vez quando a seção entra em vista.
- Enquanto uma imagem realmente carrega, mostrar placeholder grafite com varredura azul discreta. Encerrar ao carregar ou falhar; não manter carregamento infinito nem atrasar imagem pronta para mostrar o efeito. Em falha, exibir alternativa clara e preservar nome e link do projeto.
- Navegação manual sem autoplay e sem loop infinito. Setas desabilitadas nos limites; controles omitidos quando todo o conteúdo couber. Cada avanço move um card, com ajuste à largura da tela.
- Cards são acessíveis por Tab; elementos focados devem entrar em vista. Não interceptar setas fora do carrossel; anunciar mudanças de posição sem interromper a leitura.
- Respeitar movimento reduzido também no scroll suave, na entrada dos cards e no placeholder. Swipe e arraste não são a única forma de navegação.

## Formulário

- Rótulos persistentes, foco azul visível, mensagens de erro em texto associadas ao campo e indicação textual de obrigatoriedade.
- Botão de envio amarelo com texto escuro. Estado de envio discreto, sem deslocar o layout; feedback de sucesso/erro acessível.
- Em celular, campos em uma coluna e texto de entrada de pelo menos 16 px. Preservar conteúdo digitado em caso de erro.
- Manter termos claros: “Nome”, “E-mail”, “Serviço desejado”, “Enviar solicitação de orçamento”. A temática não deve transformar o formulário em um terminal fictício.

## React Bits — seleção inicial

Sugestão recebida de Pedro e catálogo oficial consultado em 05/10/2026. O plano consolidado escolhe Glitch Text como componente a incorporar; entrada de cards e carrossel serão implementados em CSS/IntersectionObserver e React/CSS Scroll Snap. A tabela abaixo registra candidatos e referências iniciais. Nenhum componente foi instalado ou validado neste projeto ainda.

| Componente | Aplicação proposta | Adaptação necessária |
|---|---|---|
| [Glitch Text](https://reactbits.dev/text-animations/glitch-text) | Saudação “Bem-vindo” | Cores amarelo/azul, duração limitada à entrada, versão estática e texto acessível |
| [Animated Content](https://reactbits.dev/animations/animated-content) | Entrada discreta dos cards ao aparecerem | Movimento curto, execução única e respeito a movimento reduzido |
| [Carousel](https://reactbits.dev/components/carousel) | Referência ou base para navegação dos projetos | Validar/adaptar três cards por vista no desktop, teclado, setas, toque e ausência de autoplay |

O carregamento real de imagens continua separado da animação decorativa de entrada: skeleton/varredura vinculado a load/error, sem espera artificial. Incorporar apenas componentes escolhidos. Evitar importar todo o catálogo ou adicionar fundos pesados sem necessidade.

Referência técnica: https://github.com/DavidHDev/react-bits. Conferir o código de cada componente, dependências e licença antes de incorporá-lo; a inspeção do catálogo não comprova acessibilidade, desempenho ou integração com Next.js.

## Inventário de assets

| Asset | Origem / estado | Uso |
|---|---|---|
| Nome Pedro Sodré | Confirmado pelo usuário | Assinatura tipográfica, sem logo existente |
| Foto pessoal | Excluída por preferência do usuário | Não utilizar |
| Geometrias, grades e molduras | A criar originalmente em SVG/CSS | Abertura, fundo e painéis |
| Duas imagens de referência enviadas | Inspiração visual fornecida por Pedro | Consulta de direção; não publicar como assets do site |
| Capturas de projetos | A fornecer por Pedro após revisões | Evidência de trabalhos reais |
| Fonte dos títulos | Proposta, arquivos ainda não obtidos | Confirmar licença e carregar apenas pesos necessários |
| Ícones de contato | A definir na stack, com licença compatível | Apoiar rótulos textuais de WhatsApp e e-mail |
| Favicon e imagem social | A criar com identidade tipográfica | Identificação e compartilhamento |

## Tratamento provisório

Primeira publicação terá três espaços de projetos explicitamente marcados como pendentes, conforme decisão de Pedro no planejamento. A demonstração com seis exemplos e simulação de loading não fica acessível em produção. Contatos sem destinos reais não devem produzir links ativos falsos. Não usar logos de supostos clientes, selos ou contadores inventados.

## Handoff

Ler `BRIEFING.md`, esta direção e `content/landing-content.json` antes de implementar. Os arquivos registram escopo e conteúdo proposto, não comprovam responsividade, acessibilidade ou desempenho de uma interface ainda inexistente.
