'use client'

import { Trash, DotsThree, Spinner } from '@phosphor-icons/react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { getUserSpaces } from '@/lib/api'
import { useAuth } from '@/providers/auth'
import { useQuery } from '@tanstack/react-query'

export function SidebarSpaces() {
  const { isMobile } = useSidebar()
  const { user } = useAuth()

  const { data: spaces, isPending: isFetchingSpaces } = useQuery({
    queryKey: getUserSpaces.key,
    queryFn: () => getUserSpaces.fn(user?.auth_id!),
  })

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel className='text-base'>your spaces</SidebarGroupLabel>
      <SidebarMenu>
        {isFetchingSpaces && (
          <SidebarMenuItem>
            <Spinner size={16} weight='duotone' className='animate-spin mx-2' />
          </SidebarMenuItem>
        )}

        {spaces &&
          spaces.length > 0 &&
          spaces.map((space) => (
            <SidebarMenuItem key={space.name}>
              <SidebarMenuButton asChild>
                <Link href={`/spaces/${space.id}`}>
                  <span>{space.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <DotsThree weight='duotone' />
                    <span className='sr-only'>More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-48 rounded-lg'
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem>
                    <Trash weight='duotone' color='crimson' />
                    <span>delete space</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
