import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@/components/PrivateRoute";
import DefaultLayout from "@/layouts/DefaultLayout";
import Loading from "@/components/ui/loading";
import { LayoutVariant } from "@/interfaces/sidebar";
import NavigateRoute from "./NavigateRoute";


const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>

    </div>
  );
};

const ProtectedLayout = ({ variant }: { variant: LayoutVariant }) => {
  return (
    <Suspense fallback={<div className="p-2"><Loading /></div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PrivateRoute>
          <NavigateRoute variant={variant}>
            <DefaultLayout variant={variant}>
              <Outlet />
            </DefaultLayout>
          </NavigateRoute>
        </PrivateRoute>
      </ErrorBoundary>
    </Suspense>
  );
};

export default ProtectedLayout;
