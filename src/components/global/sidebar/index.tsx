'use client'

import { SelectionPlus } from '@phosphor-icons/react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar'
import { SidebarUser } from './_components/sidebar-user'
import { SidebarMain } from './_components/sidebar-main'
import { SidebarSpaces } from './_components/sidebar-spaces'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'new space',
      url: '/spaces/new',
      icon: SelectionPlus,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
        <SidebarSpaces />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
