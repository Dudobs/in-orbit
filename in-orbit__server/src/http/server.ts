import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider, // Importação feita com o 'type' já que o 'ZodTypeProvider' é apenas uma tipagem
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionsRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

// Inicializa o servidor Fastify com suporte ao ZodTypeProvider
const app = fastify().withTypeProvider<ZodTypeProvider>()

// Adiciona o compilador de validadores e serializadores utilizando Zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Permite que a API seja acessada por qualquer front-end (OBS: Mudar em ambiente de produção)
app.register(fastifyCors, {
  origin: '*',
})

// As rotas da aplicação foram organizadas em arquivos separados dentro da pasta [routes].
// Cada arquivo contém a lógica de uma rota específica.
// Abaixo, as rotas são registradas no aplicativo Fastify usando o método 'register'.
app.register(createGoalRoute)
app.register(createCompletionsRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

// Inicia o servidor escutando na porta 3333.
// O método 'listen' retorna uma promessa, e quando resolvida, o servidor está pronto para aceitar requisições.
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
