import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { AdminUrl } from "@/consts/baseUrl";
import ProtectedLayout from "./ProtectedLayout";

const Homepage = lazy(() => import("@/pages/admin/Homepage"));
const Employee = lazy(() => import("@/pages/admin/Employee"));

const adminRoutes: RouteObject = {
  path: AdminUrl.Homepage,
  element: <ProtectedLayout variant="admin" />,
  children: [
    { index: true, element: <Homepage /> },
    { path: AdminUrl.Employee, element: <Employee /> },
    { path: AdminUrl.Attendance, element: <></> },
    { path: AdminUrl.Leave_Request, element: <></> },
    { path: AdminUrl.Payroll, element: <></> }
  ],
};

export default adminRoutes;
