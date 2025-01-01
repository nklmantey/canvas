import Navbar from '@/components/global/navbar'
import { DotPattern } from '@/components/ui/dot-pattern'
import { features } from '@/constants'
import { ChalkboardSimple } from '@phosphor-icons/react/dist/ssr'

export default async function Home() {
  return (
    <div className='relative w-full h-full overflow-auto'>
      <DotPattern />
      <Navbar />

      <div className='p-8 md:px-20 md:py-14 lg:px-40 lg:py-28 flex flex-col xl:flex-row items-center justify-between gap-12'>
        <div className='max-w-md md:max-w-2xl'>
          <span className='text-3xl md:text-5xl md:text-balance lg:text-6xl tracking-tight font-recoleta-bold grid'>
            simplify collaboration, amplify creativity.
          </span>
          <ChalkboardSimple
            color='crimson'
            weight='duotone'
            className='my-4 text-6xl'
          />
          <p className='text-base lg:text-lg text-[#404040] my-4'>
            effortlessly brainstorm, organize, and visualize. with intuitive
            tools for sketching, planning, and sharing, canvas brings clarity
            and precision to every workflow.
          </p>
          <p className='text-base lg:text-lg text-[#404040] my-4'>
            a smarter, faster, and more enjoyable way to work together. canvas
            removes barriers and empowers creativity, so you can focus on what
            matters most.
          </p>
        </div>

        <div className='flex flex-col items-start'>
          {features.map((feature) => (
            <div
              className='flex items-center justify-start gap-4 border-b border-border py-6 md:py-8 lg:py-12 border-dashed w-full'
              key={feature.title}
            >
              <div className='border border-[#d5d5d5] p-0.5 rounded-[14px]'>
                <div
                  className='rounded-[12px] flex items-center justify-center w-12 h-12'
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon weight='duotone' size={24} color='#fff' />
                </div>
              </div>
              <div>
                <p className='text-base lg:text-lg font-semibold'>
                  {feature.title}
                </p>
                <p className='text-base lg:text-lg text-[#404040]'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
