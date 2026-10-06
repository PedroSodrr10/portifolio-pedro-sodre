# Pedro Sodré — portfólio

Next.js App Router, React, TypeScript, CSS Modules e Node.js 22. Conteúdo em `content/landing-content.json`.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

## Contatos e projetos

Edite os contatos públicos no JSON. WhatsApp usa somente dígitos, com código do país. Não coloque segredos no conteúdo.

Os três espaços iniciais não representam trabalhos realizados. Para substituí-los, preencha `sections[id=projetos].items` com `id`, `name`, `category`, `description`, `image`, `alt` e `url` (HTTPS). Coloque imagens reais autorizadas em `public/projects/` e use caminhos `/projects/arquivo.webp`. As imagens são renderizadas com Next Image e proporção reservada. Atualize também o texto de apresentação da seção quando houver trabalhos reais.

`/preview/projetos` oferece 0, 1, 3 e 6 exemplos e simulações de imagem. Só funciona em `next dev` ou com `VERCEL_ENV=preview`; retorna 404 em produção. Não promover um artefato de preview diretamente para produção: fazer novo build no ambiente production para remover a rota e configurar indexação.

## Configuração privada do formulário

Use `.env.local` localmente e Environment Variables no projeto Vercel. Configure Preview e Production conforme necessário. O arquivo `.env.example` registra os nomes, sem segredos.

- `GMAIL_USER`: conta Gmail de Pedro.
- `GMAIL_APP_PASSWORD`: senha de app Google; configurar diretamente no ambiente. Nunca a senha pessoal e nunca no chat/Git.
- `CONTACT_TO_EMAIL`: destinatário fixo, o Gmail de Pedro.
- `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`: banco Redis Upstash; escolher opção gratuita, sem contratar plano pago automaticamente.
- `RATE_LIMIT_SECRET`: segredo aleatório de pelo menos 32 caracteres, estável entre instâncias.
- `SITE_URL`: URL HTTPS de produção confirmada, sem barra final.

O endpoint Node `POST /api/orcamento` exige JSON com até 16 KiB, valida campos com Zod e rejeita campos adicionais. Gmail SMTP TLS em 465, remetente autenticado e Reply-To do visitante. O servidor aguarda aceitação SMTP; isso não comprova chegada à caixa de entrada.

Proteção: honeypot, HMAC da origem fornecida pela Vercel, cinco tentativas em janela de 15 minutos, cem reservas de envio por janela de 24 horas, e reserva atômica por identificador de submissão. Redis guarda somente contadores e hashes temporários, nunca conteúdo de leads ou IP bruto. SMTP incerto bloqueia reenvio do mesmo identificador por 24 horas. Não há garantia de entrega exatamente uma vez. Sem credenciais/proteção, o envio falha de forma explícita.

## Deploy

Repositório: https://github.com/PedroSodrr10/portifolio-pedro-sodre. `main` é produção e `feat/portfolio` é implementação/revisão. Projeto Vercel `portifolio-pedro-sodre`, equipe `pedrosodrr10s-projects`.

Antes de produção: revisão visual de Pedro, credenciais configuradas, teste real identificado recebido no Gmail e Reply-To conferido. Depois de deploy: confirmar READY, testar URL, contatos, `/preview/projetos` com 404 e metadados. Registrar em `docs/landingpage/ENTREGA.md`.

Com histórico de produção, restaurar pelo painel Vercel > Deployments > versão anterior de produção > Instant Rollback. Não usar preview como rollback de produção.

## Licenças e referência

GlitchText adaptado de [React Bits](https://github.com/DavidHDev/react-bits), com execução limitada a 900 ms por sessão e movimento reduzido. Licença preservada em `licenses/React-Bits-LICENSE.txt`. Rajdhani auto-hospedada com licença OFL em `licenses/Rajdhani-OFL.txt`. Geometrias e favicon próprios. `.design/references/` é consulta local e está excluída do Git e deploy.
