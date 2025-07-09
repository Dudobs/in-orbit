import { CheckCircle2, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'

// Mostra as datas em português
dayjs.locale(ptBR)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  })

  if (!data) {
    return null
  }

  // Formata as datas para mostrarem um digito do dia e as 3 primeiras letras do mês da semana atual
  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  // Porcentagem das metas concluidas
  const completedPercentage = Math.round((data?.completed * 100) / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {/* A classe 'capitalize' deixa todas as palavras com a primeira letra maiúscula */}
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          {/* O atributo 'width' mostra como juntar variáveis e string em um valor */}
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay || {}).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const monthDay = dayjs(date).format('D[ de ]MMMM')

          return (
            // O primeiro elemento retornado em uma estrutura de repetição no react precisa de uma propriedade 'key' que irá indentificar cada item dentro do objeto
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span>{' '}
                <span className="text-zinc-400 text-xs">({monthDay})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const completedAtTime = dayjs(goal.completedAt).format(
                    'HH:mm'
                  )

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" ás{' '}
                        <span className="text-zinc-100">
                          {completedAtTime}h
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
