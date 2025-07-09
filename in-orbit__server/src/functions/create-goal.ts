import { db } from '../db'
import { goals } from '../db/schema'

// Define uma interface TypeScript para garantir que a função receba os campos corretos ao criar uma nova meta
interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  // Desestrutura os parâmetros da interface, permitindo o uso direto de 'title' e 'desiredWeeklyFrequency'
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  // Realiza a inserção no banco de dados usando o objeto 'goals' que representa a tabela no banco
  const result = await db
    .insert(goals)
    .values({
      // Passa os valores da meta que serão inseridos na tabela, o Fastify garante que eles foram validados previamente
      title,
      desiredWeeklyFrequency,
    })
    // Retorna o registro inserido como resultado da operação
    .returning()

  // Como estamos retornando o primeiro registro, obtemos o valor da primeira linha do resultado
  const goal = result[0]

  // Retorna a meta recém-criada, encapsulada em um objeto
  return {
    goal,
  }
}
