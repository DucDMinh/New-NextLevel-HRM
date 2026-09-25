import { useMemo } from "react"
import { useFetchEmpData } from "@/api/employee"
import { useFetchLeaveRequest } from "@/api/leave-request"

export const useAdminDashboard = () => {
    const employeeQuery = useFetchEmpData()
    const leaveRequestQuery = useFetchLeaveRequest()

    const totalEmployees = employeeQuery.data?.length ?? 0
    const pendingLeaveRequests = useMemo(
        () => leaveRequestQuery.data?.filter((lr) => lr.status === "pending").length ?? 0,
        [leaveRequestQuery.data]
    )

    const handleRefresh = () => {
        employeeQuery.refetch()
        leaveRequestQuery.refetch()
    }

    return {
        totalEmployees,
        pendingLeaveRequests,
        isLoading: employeeQuery.isLoading || leaveRequestQuery.isLoading,
        isRefreshing: employeeQuery.isFetching || leaveRequestQuery.isFetching,
        updatedAt: Math.min(employeeQuery.dataUpdatedAt, leaveRequestQuery.dataUpdatedAt),
        handleRefresh,
    }
}
