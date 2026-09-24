import { SidebarItem } from '@/interfaces/sidebar'
import { Boxes, ClipboardCheck, LayoutDashboard, List } from 'lucide-react'


export const ClientItems: SidebarItem[] = [
    { label: "Trang chủ", href: "/", icon: LayoutDashboard },
    { label: "Chấm công", href: "/attendances", icon: ClipboardCheck },
    { label: "Nghỉ phép", href: "/leave-requests", icon: List },
    { label: "Lương thưởng", href: "/payrolls", icon: Boxes }
]