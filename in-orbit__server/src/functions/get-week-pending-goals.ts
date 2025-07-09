import dayjs from 'dayjs'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, count, eq, gte, lt, lte, sql } from 'drizzle-orm'

// Função para obter as metas pendentes na semana atual
export async function getWeekPendingGoals() {
  // Define o primeiro e o último dia da semana atual usando a biblioteca dayjs
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  // CTE (Common Table Expression) que busca todas as metas criadas até o final da semana atual
  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals) // Tabela de metas
      .where(lte(goals.createdAt, lastDayOfWeek)) // Condição: metas criadas até o último dia da semana atual
  )

  // CTE que conta o número de vezes que a meta foi completada durante a semana atual
  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'), // Conta o número de completions para a meta
      })
      .from(goalCompletions) // Tabela de goal completions (completude das metas)
      .where(
        // Condições: completions dentro da semana atual
        and(
          lte(goalCompletions.createdAt, lastDayOfWeek), // Completions até o último dia da semana
          gte(goalCompletions.createdAt, firstDayOfWeek) // Completions a partir do primeiro dia da semana
        )
      )
      .groupBy(goalCompletions.goalId) // Agrupa pelo ID da meta para contar as completions por meta
  )

  // Faz a consulta final combinando as duas CTEs para obter as metas com suas contagens de completions
  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletionCounts) // Usa as CTEs definidas anteriormente
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number), // Se não houver completions, retorna 0 (usando COALESCE)
    })
    .from(goalsCreatedUpToWeek) // Baseia-se nas metas criadas até a semana atual
    .leftJoin(
      goalCompletionCounts, // Faz um left join para combinar com as contagens de completions
      eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id) // Combina os IDs de metas
    )

  // Retorna as metas pendentes com suas respectivas contagens de completions
  return { pendingGoals }
}
