import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PERMISSION_ENUM } from "@/consts/common";
import httpService from "@/services/httpService";
import { api } from "@/api/global";
import { useMe } from "@/api/me";
import { User } from "@/interfaces/common";
import { toast } from "react-toastify";

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: User | null;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
  isAdmin: boolean;
  isAppManager: boolean;
  isUser: boolean;
  isFetchingUser: boolean
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  login: () => { },
  logout: () => { },
  isAdmin: false,
  isAppManager: false,
  isUser: false,
  isFetchingUser: false
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [token, setToken] = useState(httpService.getTokenStorage());
  const [user, setUser] = useState(httpService.getUserStorage())
  const [isLogging, setIsLogging] = useState(false);

  //! Effect

  const meQuery = useMe(!!token)
  const isFetchingUser = !!token && meQuery.isPending

  useEffect(() => {
    if (token && meQuery.data) {
      setUser(meQuery.data)
      httpService.saveUserStorage(meQuery.data)
    }
  }, [token, meQuery.data])

  //! Function
  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      try {
        setIsLogging(true);
        const { token } = await api<{ token: string }>(
          httpService.post('/login', { username, password })
        )
        httpService.saveTokenStorage(token)
        setToken(token)
      } catch (error: any) {
        if (error?.response?.status === 401) {
          toast.error(error?.response?.data?.message ?? "Invalid username or password")
        }
      } finally {
        setIsLogging(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    httpService.clearStorage();
    window.sessionStorage.clear();
    window.location.reload();
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isLogging,
      isLogged: !!user && !!token,
      user,
      logout,
      login,
      isAdmin: !!user?.role?.includes(PERMISSION_ENUM.ADMIN),
      isAppManager: !!user?.role?.includes(PERMISSION_ENUM.APP_MANAGER),
      isUser: !!user?.role?.includes(PERMISSION_ENUM.USER),
      isFetchingUser
    };
  }, [login, logout, user, token, isLogging, isFetchingUser]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
