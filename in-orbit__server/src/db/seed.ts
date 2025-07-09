// O arquivo seed.ts serve para pre-popular o banco de dados com informações fictícias.
// Para executa-lo, siga o script feito no arquivio [package.json] de nome "seed".

import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  // Apaga os dados das tabelas abaixo toda vez que a seed é executada para que não tenha dados repetidos. Tabelas que tem chaves estrangeiras devem ser apagadas primeiro afim de evitar erros de referência.
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning() // Faz com que a função retorne um array com os dados da inserção
  // result[0].<nome_da_coluna> --> Retorna o valor da coluna especificada da inserção na posição 0

  const startOfWeek = dayjs().startOf('week') // Retorna o dia do começo da semana atual, no caso, o ultimo dia de domingo

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() }, // Funções que retornam datas com o DayJs devem ser convertidas para data no JS
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() }, // Adiciona um dia além do dia retornado
  ])
}

// Após a execução do arquivo fecha a conexão com o banco de dados
seed().finally(() => {
  client.end()
})
