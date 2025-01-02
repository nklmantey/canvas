import { Spinner } from '@phosphor-icons/react/dist/ssr'

export default function Loader({ message }: { message?: string }) {
  return (
    <div className='fixed inset-0 bg-background backdrop-blur-sm z-80 flex flex-col gap-2 items-center justify-center'>
      <Spinner className='animate-spin' size={32} weight='duotone' color='orange' />
      {message && <p className='text-sm text-muted-foreground'>{message}</p>}
    </div>
  )
}
