interface createGoalRequst {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: createGoalRequst) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      // Define o cabeçalho da requisição, indicando que o corpo será no formato JSON
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Converte o objeto com o 'goalId' para uma string JSON e o envia no corpo da requisição
      title,
      desiredWeeklyFrequency,
    }),
  })
}
