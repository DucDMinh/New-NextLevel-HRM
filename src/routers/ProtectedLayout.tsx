import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@/components/PrivateRoute";
import DefaultLayout from "@/layouts/DefaultLayout";
import Loading from "@/components/ui/loading";
import { LayoutVariant } from "@/interfaces/sidebar";


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
          <DefaultLayout variant={variant}>
            <Outlet />
          </DefaultLayout>
        </PrivateRoute>
      </ErrorBoundary>
    </Suspense>
  );
};

export default ProtectedLayout;
