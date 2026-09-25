import PageWrapper from "@/components/PageWrapper";
import CommonIcons from "@/components/CommonIcons";
import { StatCard } from "@/components/dashboard/StatCard";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { AdminUrl } from "@/consts/baseUrl";
import { formatLongDate } from "@/helpers/datetime";
import { useAdminDashboard } from "./hook/useAdminDashboard";

const Homepage = () => {
  const {
    totalEmployees,
    pendingLeaveRequests,
    isLoading,
    isRefreshing,
    updatedAt,
    handleRefresh,
  } = useAdminDashboard();

  return (
    <PageWrapper isFetching={isLoading}>
      <div className="component:Homepage flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Tổng quan</h1>
            <p className="text-sm text-muted-foreground">{formatLongDate(new Date(), "vi-VN")}</p>
          </div>
          <RefreshButton
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            updatedAt={updatedAt}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StatCard
            label="Tổng số nhân viên"
            value={totalEmployees}
            unit="nhân viên"
            description="Nhân viên đang có trong hệ thống"
            icon={CommonIcons.Users}
            href={AdminUrl.Employee}
            linkLabel="Quản lý nhân viên"
          />
          <StatCard
            label="Đơn nghỉ phép chờ duyệt"
            value={pendingLeaveRequests}
            unit="đơn"
            description={
              pendingLeaveRequests > 0
                ? "Đang chờ bạn xem xét và phê duyệt"
                : "Không có đơn nào cần duyệt"
            }
            icon={CommonIcons.Hourglass}
            iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            href={AdminUrl.Leave_Request}
            linkLabel="Đi tới duyệt đơn"
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Homepage;
