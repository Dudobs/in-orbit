import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  // Define rota POST para criar uma nova meta (goal)
  app.post(
    '/goals',
    {
      schema: {
        // Define o schema de validação com ZodTypeProvider e zod para o corpo (body) da requisição.
        // O campo 'title' deve ser uma string e 'desiredWeeklyFrequency' deve ser um número inteiro entre 1 e 7.
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      // Extrai os campos do corpo da requisição já validados pelo ZodTypeProvider
      const { title, desiredWeeklyFrequency } = request.body

      // Chama a função createGoal passando os dados validados do body
      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )
}
