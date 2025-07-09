import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 segundos
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    // Invalida (ou "marca como desatualizadas") as queries com a chave 'summary'.
    // Isso força o React Query a refazer a requisição para essa query na próxima vez que ela for acessada, garantindo que os dados sejam atualizados.
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            // O elemento fica desabilitado caso a condição seja verdadeira
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            // Quando a função possui parâmetros, passamos ela dentro de uma função anônima para que seja executada apenas no clique.
            // Caso contrário, se passássemos a função diretamente, ela seria executada imediatamente ao renderizar o componente.
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
