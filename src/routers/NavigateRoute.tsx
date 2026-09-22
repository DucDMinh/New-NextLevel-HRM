import { AdminUrl, EmpUrl } from "@/consts/baseUrl"
import { LayoutVariant } from "@/interfaces/sidebar"
import { useAuth } from "@/providers/AuthenticationProvider"
import { Navigate } from "react-router-dom"

const NavigateRoute = ({ variant, children }: { variant: LayoutVariant; children: React.ReactNode }) => {
    const { user } = useAuth();
    const isAdmin = user?.role == "admin";
    const userArea: LayoutVariant = isAdmin ? "admin" : "client";

    if (variant !== userArea) {
        return <Navigate to={isAdmin ? AdminUrl.Homepage : EmpUrl.Homepage} replace />;
    }
    return <>{children}</>;
};

export default NavigateRoute