import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { AdminUrl } from "@/consts/baseUrl";
import ProtectedLayout from "./ProtectedLayout";

const Homepage = lazy(() => import("@/pages/admin/Homepage"));
const Employee = lazy(() => import("@/pages/admin/Employee"));
const Attendance = lazy(() => import("@/pages/admin/Attendance"))
const LeaveRequest = lazy(() => import("@/pages/admin/LeaveRequest"))

const adminRoutes: RouteObject = {
  path: AdminUrl.Homepage,
  element: <ProtectedLayout variant="admin" />,
  children: [
    { index: true, element: <Homepage /> },
    { path: AdminUrl.Employee, element: <Employee /> },
    { path: AdminUrl.Attendance, element: <Attendance /> },
    { path: AdminUrl.Leave_Request, element: <LeaveRequest /> },
    { path: AdminUrl.Payroll, element: <></> }
  ],
};

export default adminRoutes;
