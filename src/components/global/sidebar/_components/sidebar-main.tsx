'use client'

import Link from 'next/link'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'

export function SidebarMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: any
  }[]
}) {
  const activePath = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu className='gap-4'>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={cn(
              activePath === item.url && 'border border-sidebar-border rounded-md bg-gray-200'
            )}
          >
            <Link href={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon weight='fill' color='gray' />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarRail />
    </SidebarGroup>
  )
}
