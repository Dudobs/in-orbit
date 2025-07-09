import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { CreateGoalCompletion } from '../../functions/cretae-goal-completion'

export const createCompletionsRoute: FastifyPluginAsyncZod = async app => {
  // Define rota POST para resgistrar uma conclusão de meta
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      await CreateGoalCompletion({
        goalId,
      })
    }
  )
}
