import PageWrapper from "@/components/PageWrapper";
import CommonIcons from "@/components/CommonIcons";
import { StatCard } from "@/components/dashboard/StatCard";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { EmpUrl } from "@/consts/baseUrl";
import { formatLongDate } from "@/helpers/datetime";
import { TodayAttendanceCard } from "./component/TodayAttendanceCard";
import { useClientDashboard } from "./hook/useClientDashboard";

const Homepage = () => {
    const {
        employeeName,
        pendingLeaveRequests,
        todayAttendance,
        attendanceStatus,
        isLoading,
        isRefreshing,
        updatedAt,
        handleRefresh,
    } = useClientDashboard();

    return (
        <PageWrapper isFetching={isLoading}>
            <div className="component:Homepage flex flex-col gap-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {employeeName ? `Xin chào, ${employeeName}` : "Xin chào"}
                        </h1>
                        <p className="text-sm text-muted-foreground">{formatLongDate(new Date(), "vi-VN")}</p>
                    </div>
                    <RefreshButton
                        onRefresh={handleRefresh}
                        isRefreshing={isRefreshing}
                        updatedAt={updatedAt}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TodayAttendanceCard status={attendanceStatus} attendance={todayAttendance} />
                    <StatCard
                        label="Đơn nghỉ phép chờ duyệt"
                        value={pendingLeaveRequests}
                        unit="đơn"
                        description={
                            pendingLeaveRequests > 0
                                ? "Đang chờ quản lý phê duyệt"
                                : "Bạn không có đơn nào đang chờ duyệt"
                        }
                        icon={CommonIcons.Hourglass}
                        iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        href={EmpUrl.Leave_Request}
                        linkLabel="Xem đơn nghỉ phép"
                    />
                </div>
            </div>
        </PageWrapper>
    );
};

export default Homepage;
