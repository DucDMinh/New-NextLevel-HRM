import PageWrapper from "@/components/PageWrapper";
import { CheckInOutCard } from "./component/CheckInOutCard";
import { AttendanceHistoryTable } from "./component/AttendanceHistoryTable";
import { useClientAttendance } from "./hook/useClientAttendance";
import { SkeletonPage } from "@/components/SkeletonPage";

const AttendancePage = () => {
    const {
        myAttendanceData, currentLogin, todayRecord, isLoading
    } = useClientAttendance()

    if (isLoading) {
        return (
            <SkeletonPage />
        )
    }

    return (
        <PageWrapper>
            <div className="component:Attendance flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Chấm công
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Chấm công vào/ra và xem lại lịch sử chấm công của bạn
                    </p>
                </div>
                <CheckInOutCard
                    currentLogin={currentLogin}
                    todayRecord={todayRecord}
                />
                <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                        Lịch sử chấm công
                    </p>
                    <AttendanceHistoryTable data={myAttendanceData} />
                </div>
            </div>
        </PageWrapper>
    );
};

export default AttendancePage;
