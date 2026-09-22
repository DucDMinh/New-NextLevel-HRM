import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
}
export type LayoutVariant = "admin" | "client";