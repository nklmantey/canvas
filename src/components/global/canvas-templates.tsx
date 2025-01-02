import { templates } from '@/constants'
import { Button } from '../ui/button'

function CanvasTemplate({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col border border-border rounded-md w-60'>
      <div className='bg-gray-200 rounded-t-md p-2 h-40 w-full' />

      <div className='flex flex-col space-y-2 p-4'>
        <p className='text-base font-semibold font-recoleta-bold'>{title}</p>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  )
}

export default function CanvasTemplates() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <p className='text-2xl font-semibold font-recoleta-bold'>templates</p>

        <Button size='default'>explore templates</Button>
      </div>

      <div className='mt-8 flex gap-8'>
        {templates.map((template) => (
          <CanvasTemplate {...template} />
        ))}
      </div>
    </div>
  )
}
