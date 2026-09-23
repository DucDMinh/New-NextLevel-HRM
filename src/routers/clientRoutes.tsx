import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { EmpUrl } from "@/consts/baseUrl";
import ProtectedLayout from "./ProtectedLayout";

const Homepage = lazy(() => import("@/pages/client/HomePage"));
const Attendance = lazy(() => import("@/pages/client/Attendance"));

const clientRoutes: RouteObject = {
  path: EmpUrl.Homepage,
  element: <ProtectedLayout variant="client" />,
  children: [
    { index: true, element: <Homepage /> },
    { path: EmpUrl.Attendance, element: <Attendance /> },
    { path: EmpUrl.Leave_Request, element: <></> },
    { path: EmpUrl.Payroll, element: <></> }
  ],
};

export default clientRoutes;
