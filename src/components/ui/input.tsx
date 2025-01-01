import * as React from 'react'

import { cn } from '@/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'> & { error?: string }>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
            error && 'border-[crimson] focus-visible:ring-2 focus-visible:ring-[crimson] focus-visible:ring-offset-2 '
          )}
          ref={ref}
          {...props}
        />
        {error && <p className='text-[crimson] text-sm'>{error}</p>}
      </>
    )
  }
)
Input.displayName = 'Input'

export { Input }
