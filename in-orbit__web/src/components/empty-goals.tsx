import logo from '../assets/logo-in-orbit.svg'
import lestStart from '../assets/lets-start-illustrator.svg'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="InOrbit" />
      <img src={lestStart} alt="Lets start" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      {/* O DialogTrigger cria um botão automaticamente, para que não tenhamos dois botões no nosso HTML passamos a propriedade 'asChild' para que ele use o botão que está dentro dele */}
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
