import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { AuthUrl } from "@/consts/baseUrl";
import Loading from "@/components/ui/loading";

const Login = lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const Page404 = lazy(() => import("@/pages/Page404"));
const authRoutes: RouteObject = {
  element: (
    <Suspense fallback={<div className="p-2"><Loading /></div>}>
      <Outlet />
    </Suspense>
  ),
  children: [
    { path: AuthUrl.Login, element: <Login /> },
    { path: AuthUrl.ForgotPassword, element: <ForgotPassword /> },
    { path: AuthUrl.Error, element: <Page404 /> },
  ],
};

export default authRoutes;
