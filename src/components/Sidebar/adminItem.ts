import { SidebarItem } from "@/interfaces/sidebar";
import { AdminUrl } from "@/consts/baseUrl";
import { LayoutDashboard, Boxes, Users, CalendarCheck, User } from "lucide-react";

const AdminItems: SidebarItem[] = [
    { label: "Trang chủ", href: "/", icon: LayoutDashboard },
    { label: "Quản lý nhân viên", href: AdminUrl.Employee, icon: User },
    { label: "Chấm công", href: AdminUrl.Attendance, icon: CalendarCheck },
    { label: "Apps", href: "/apps", icon: Boxes },
    { label: "Users", href: "/users", icon: Users },
];

export default AdminItems;