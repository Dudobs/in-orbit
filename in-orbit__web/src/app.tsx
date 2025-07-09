import { useQuery } from '@tanstack/react-query'
import { EmptyGoals } from './components/empty-goals'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { getSummary } from './http/get-summary'
export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
    // Define o tempo de cache dos dados desta requisição. Durante os próximos 60 segundos (staleTime: 1000 * 60), caso a consulta seja refeita, os dados em cache serão usados em vez de realizar uma nova requisição.
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
