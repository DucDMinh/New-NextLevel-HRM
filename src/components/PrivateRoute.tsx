import { Navigate } from "react-router-dom";
import { AuthUrl } from "@/consts/baseUrl";
import { useAuth } from "@/providers/AuthenticationProvider";
import Loading from "./ui/loading";

const PrivateRoute = (props: { children: any }) => {
  const auth = useAuth();

  //! Render
  if (auth.isLogged) {
    return props.children;
  }

  if (auth.isFetchingUser) {
    return <Loading />
  }

  return <Navigate to={AuthUrl.Login} replace />;
};

export default PrivateRoute;
