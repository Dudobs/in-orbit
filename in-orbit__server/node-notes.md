# Iniciando o Projeto

(1) --> `$ npm init -y`
Cria um arquivo `package.json` com as configurações básicas do projeto.

## Dependências

(2) --> `$ npm i typescript -D`
Instala o TypeScript. A flag `-D` indica que ele será uma dependência de desenvolvimento, não sendo necessária em produção.

(3) --> `$ npx tsc --init`
Cria o arquivo de configuração do TypeScript (`tsconfig.json`). É possível otimizar esse arquivo com bases pré-configuradas da Microsoft, buscando uma que corresponda à versão do Node usada no projeto. (Repositório: [tsconfig bases](https://github.com/tsconfig/bases?tab=readme-ov-file)).

(4) --> `$ npm i @types/node tsx -D`
- `@types/node` adiciona as definições de tipos do Node.js para o TypeScript, permitindo que ele entenda APIs do Node.  
- `tsx` permite rodar arquivos TypeScript diretamente sem necessidade de transpilar para JavaScript previamente. Ele realiza a conversão e execução em uma única etapa.

(5) --> `$ npm run dev`
O script `dev` foi configurado no `package.json` para rodar o servidor usando `tsx`. O comando `tsx watch src/http/server.ts` monitora o arquivo e reinicia automaticamente a aplicação quando há mudanças.
A flag `--env-file .env` carrega variáveis de ambiente do arquivo especificado.

(6) --> `$ npm i fastify`
Instala o Fastify, o framework web utilizado para gerenciar as rotas e o servidor HTTP.

(7) --> `$ npm i -D --save-exact @biomejs/biome`
Biome é uma ferramenta de formatação de código semelhante ao ESLint, mas com foco em desempenho e produtividade. Após a instalação, configura-se o arquivo `biome.json` e a extensão do Biome no VS Code para que as configurações sejam específicas deste projeto. Essas configurações são salvas no arquivo `.vscode/settings.json`.

## Drizzle

(8) --> `$ npm i drizzle-orm`
Instala o Drizzle ORM, que será usado para fazer as consultas e operações no banco de dados.

(9) --> `$ npm i drizzle-kit -D`
O Drizzle Kit facilita a criação de migrations e o gerenciamento de versões do banco de dados. Ele foi escolhido por ser mais eficiente em consultas complexas comparado a outros ORMs, como Prisma. Seguindo a documentação oficial, um arquivo `drizzle.config.ts` foi configurado na raiz do projeto. (Documentação: [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)).

(10) --> `$ npx drizzle-kit generate`
Gera uma migration SQL baseada no código do esquema definido em `src/db/schema.ts`.

(11) --> `$ npx drizzle-kit migrate`
Aplica a migration gerada ao banco de dados.

(12) --> `$ npx drizzle-kit studio`
Abre uma interface visual para navegar e interagir com o banco de dados.

## Outras Dependências

(13) --> `$ npm i zod`
O Zod é uma biblioteca de validação de dados usada para validar o corpo das requisições e outros dados no projeto. Por exemplo, validamos a existência da variável de ambiente `DATABASE_URL` em `src/env.ts`.

(14) --> `$ npm i postgres`
Instala a biblioteca de cliente para PostgreSQL. Ela é necessária para conectar e interagir com o banco de dados.

(15) --> `$ npm i @paralleldrive/cuid2`
Gera IDs únicos no formato CUID2, que são usados como identificadores únicos nas tabelas do banco de dados.

(16) --> `$ npm i dayjs`
Instala a biblioteca `dayjs`, que facilita o trabalho com datas em JavaScript/TypeScript, oferecendo uma API simples e eficiente para manipulação de datas.

(18) --> `$ npm i fastify-type-provider-zod`
Esse é um plugin do Fastify que integra a biblioteca Zod para validação de tipos diretamente nas rotas da aplicação. Ele permite que o Fastify entenda e valide automaticamente o formato dos dados que são recebidos e enviados nas rotas. A documentação oficial foi seguida para a implementação. (Repositório: [Fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod))

(19) --> `$ npm i @fastify/cors`
Instala uma dependência do Fastify que lida com o CORS (Cross-Origin Resource Sharing), uma medida de segurança que define quais front-ends (ou origens) poderão fazer requisições para nossa API. Isso é importante para prevenir acessos não autorizados de diferentes domínios e melhorar a segurança da aplicação.

## Docker

(17) --> `$ docker compose up -d`
O Docker é usado para rodar o banco de dados PostgreSQL em um contêiner. O comando foi executado após a configuração do serviço no arquivo `docker-compose.yml`.
