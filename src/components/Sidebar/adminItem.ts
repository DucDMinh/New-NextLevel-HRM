import { SidebarItem } from "@/interfaces/sidebar";
import { AdminUrl } from "@/consts/baseUrl";
import { LayoutDashboard, Boxes, CalendarCheck, User, Wallet } from "lucide-react";

const AdminItems: SidebarItem[] = [
    { label: "Trang chủ", href: "/", icon: LayoutDashboard },
    { label: "Quản lý nhân viên", href: AdminUrl.Employee, icon: User },
    { label: "Chấm công", href: AdminUrl.Attendance, icon: CalendarCheck },
    { label: "Đơn từ", href: AdminUrl.Leave_Request, icon: Boxes },
    { label: "Bảng lương", href: AdminUrl.Payroll, icon: Wallet }
];

export default AdminItems;