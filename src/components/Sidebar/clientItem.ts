import { SidebarItem } from '@/interfaces/sidebar'
import { Boxes, ClipboardCheck, LayoutDashboard, List, Users } from 'lucide-react'


export const ClientItems: SidebarItem[] = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Task", href: "/task", icon: ClipboardCheck },
    { label: "Todos", href: "/todos", icon: List },
    { label: "Apps", href: "/apps", icon: Boxes },
    { label: "Users", href: "/users", icon: Users },
]