import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdminItems from "@/components/Sidebar/adminItem";
import { ClientItems } from "@/components/Sidebar/clientItem";
import { LayoutVariant, SidebarItem } from "@/interfaces/sidebar";

interface DefaultLayoutProps {
  variant: LayoutVariant;
  children: React.ReactNode;
}

interface LayoutConfig {
  items: SidebarItem[];
  namespace: string;
  home: string;
}

const layoutConfig: Record<LayoutVariant, LayoutConfig> = {
  admin: { items: AdminItems, namespace: "admin/dashboard/sidebar", home: "/admin" },
  client: { items: ClientItems, namespace: "client/sidebar/sidebar", home: "/" },
};
const DefaultLayout = (props: DefaultLayoutProps) => {
  const config = layoutConfig[props.variant];

  return (
    <div className="component:DefaultLayout flex min-h-[100vh]">
      <Sidebar items={config.items} />
      <div className="layout-wrapper w-full p-3 md:w-[calc(100%-var(--sidebar-width))] md:pl-10">
        <Navbar items={config.items} />
        <main className="flex w-full">{props.children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout
