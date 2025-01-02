'use client'

import { Chalkboard, Clock, HouseLine, Sparkle } from '@phosphor-icons/react'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { SidebarMain } from './_components/sidebar-main'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'home',
      url: '/dashboard',
      icon: HouseLine,
    },
    {
      title: 'recents',
      url: '/recents',
      icon: Clock,
    },
    {
      title: 'starred',
      url: '/starred',
      icon: Sparkle,
    },
    {
      title: 'canvases',
      url: '/canvases',
      icon: Chalkboard,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
