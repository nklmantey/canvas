import { ChalkboardSimple } from '@phosphor-icons/react/dist/ssr'

export default function Logo() {
  return (
    <div className='flex items-center justify-center gap-1'>
      <p className='text-2xl font-recoleta-bold mb-1'>canvas</p>
      <ChalkboardSimple size={20} weight='duotone' color='crimson' />
    </div>
  )
}
