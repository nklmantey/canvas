'use client'

import Link from 'next/link'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function SidebarMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: any
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu className='gap-4'>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon weight='duotone' color='crimson' />}
              <Link href={item.url}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
