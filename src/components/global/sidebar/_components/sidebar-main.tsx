'use client'

import { CaretRight } from '@phosphor-icons/react'
import Link from 'next/link'

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export function SidebarMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: any
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <Link href={item.url} className='flex items-center justify-between w-full'>
                <span>{item.title}</span>
                <CaretRight
                  weight='duotone'
                  className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
