import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import empRoutes from "./empRoutes";

const router = createBrowserRouter([authRoutes, adminRoutes, empRoutes]);

export const RenderContent = () => {
  return <RouterProvider router={router} />;
};
