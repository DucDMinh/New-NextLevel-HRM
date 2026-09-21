import { Suspense } from "react";
import {
    BrowserRouter as Router,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import { lazy } from 'react';
import { AdminUrl, AuthUrl, EmpUrl } from "@/consts/baseUrl";
const Login = lazy(() => import('../pages/Login'));
import ForgotPassword from "@/pages/ForgotPassword";
import DefaultLayout from "@/layouts/DefaultLayout";
import Homepage from "@/pages/Homepage";
import Loading from "@/components/ui/loading";
import Page404 from "@/pages/Page404";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@/components/PrivateRoute";
const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};

export const RenderContent = () => {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path={AuthUrl.Login} element={<Login />} />
                    <Route path={AuthUrl.ForgotPassword} element={<ForgotPassword />} />
                </Route>

                <Route
                    path={AdminUrl.Homepage}
                    element={
                        <Suspense fallback={<div className="p-2"><Loading /></div>}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <PrivateRoute>
                                    <DefaultLayout>
                                        <Outlet />
                                    </DefaultLayout>
                                </PrivateRoute>
                            </ErrorBoundary>
                        </Suspense>
                    }
                >
                    <Route index element={<Homepage />} />
                    <Route path={AdminUrl.Error} element={<Page404 />} />
                    <Route path={AdminUrl.Employee} element={<></>} />
                    <Route path={AdminUrl.Attendance} element={<></>} />
                    <Route path={AdminUrl.Leave_Request} element={<></>} />
                    <Route path={AdminUrl.Payroll} element={<></>} />
                </Route>

                <Route
                    path={EmpUrl.Homepage}
                    element={
                        <Suspense fallback={<div className="p-2"><Loading /></div>}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <PrivateRoute>
                                    <DefaultLayout>
                                        <Outlet />
                                    </DefaultLayout>
                                </PrivateRoute>
                            </ErrorBoundary>
                        </Suspense>
                    }
                >
                    <Route index element={<Homepage />} />
                    <Route path={EmpUrl.Error} element={<Page404 />} />
                    <Route path={EmpUrl.Attendance} element={<></>} />
                    <Route path={EmpUrl.Leave_Request} element={<></>} />
                    <Route path={EmpUrl.Payroll} element={<></>} />
                </Route>
            </Routes>
        </Router>
    );
};
