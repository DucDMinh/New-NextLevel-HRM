import { useMemo } from "react"
import { useMe } from "@/api/me"
import { useFetchLeaveRequest } from "@/api/leave-request"
import { useFetchAttendanceData } from "@/api/attendance"
import { isToday } from "@/helpers/datetime"
import { TodayAttendanceStatus } from "@/interfaces/attendance"

export const useClientDashboard = () => {
    const { data: me } = useMe()
    const leaveRequestQuery = useFetchLeaveRequest()
    const attendanceQuery = useFetchAttendanceData()

    const pendingLeaveRequests = useMemo(
        () => leaveRequestQuery.data?.filter((lr) => lr.status === "pending").length ?? 0,
        [leaveRequestQuery.data]
    )

    const todayAttendance = useMemo(
        () => [...(attendanceQuery.data ?? [])].reverse().find((record) => isToday(record.checkIn)),
        [attendanceQuery.data]
    )

    const attendanceStatus: TodayAttendanceStatus = !todayAttendance
        ? "notCheckedIn"
        : todayAttendance.checkOut
            ? "done"
            : "working"

    const handleRefresh = () => {
        leaveRequestQuery.refetch()
        attendanceQuery.refetch()
    }

    return {
        employeeName: me?.fullName ?? "",
        pendingLeaveRequests,
        todayAttendance,
        attendanceStatus,
        isLoading: leaveRequestQuery.isLoading || attendanceQuery.isLoading,
        isRefreshing: leaveRequestQuery.isFetching || attendanceQuery.isFetching,
        updatedAt: Math.min(leaveRequestQuery.dataUpdatedAt, attendanceQuery.dataUpdatedAt),
        handleRefresh,
    }
}
