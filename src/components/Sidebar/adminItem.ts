import { SidebarItem } from "@/interfaces/sidebar";
import { AdminUrl } from "@/consts/baseUrl";
import { LayoutDashboard, ClipboardCheck, List, Boxes, Users } from "lucide-react";

const AdminItems: SidebarItem[] = [
    { label: "Trang chủ", href: "/", icon: LayoutDashboard },
    { label: "Quản lý nhân viên", href: AdminUrl.Employee, icon: ClipboardCheck },
    { label: "Todos", href: "/todos", icon: List },
    { label: "Apps", href: "/apps", icon: Boxes },
    { label: "Users", href: "/users", icon: Users },
];

export default AdminItems;