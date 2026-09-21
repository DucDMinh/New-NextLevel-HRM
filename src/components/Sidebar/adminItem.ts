import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, ClipboardCheck, List, Boxes, Users } from "lucide-react";

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

const AdminItem: SidebarItem[] = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Task", href: "/task", icon: ClipboardCheck },
    { label: "Todos", href: "/todos", icon: List },
    { label: "Apps", href: "/apps", icon: Boxes },
    { label: "Users", href: "/users", icon: Users },
];

export default AdminItem;