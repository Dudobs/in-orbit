import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  // Define rota GET que retorna metas (goals) pendentes
  app.get('/summary', async () => {
    const { summary } = await getWeekSummary()

    return { summary }
  })
}
