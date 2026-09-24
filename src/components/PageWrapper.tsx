import { SkeletonPage } from "./SkeletonPage";

const PageWrapper = ({ children, isFetching }: { children: React.ReactNode, isFetching?: boolean }) => {
  if (isFetching) {
    return (
      <SkeletonPage />
    )
  }
  return (
    <div className="component:PageWrapper content-container">{children}</div>
  );
};

export default PageWrapper;
