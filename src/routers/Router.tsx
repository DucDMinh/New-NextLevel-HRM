import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import clientRoute from "./clientRoutes";

const router = createBrowserRouter([authRoutes, adminRoutes, clientRoute]);

export const RenderContent = () => {
  return <RouterProvider router={router} />;
};
