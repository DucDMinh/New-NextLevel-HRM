import { useMemo, useState } from "react";
import { useFetchEmpData } from "@/api/employee";
import { Employee } from "@/interfaces/employee";
import { STATUS_ALL } from "@/consts/common";
import { LeaveRequestAction } from "@/interfaces/leaveRequest";
import { useFetchLeaveRequest, useUpdateLeaveRequest } from "@/api/leave-request";

export const useLeaveRequest = () => {
    const { data: employeeData } = useFetchEmpData();
    const employees = useMemo(() => employeeData ?? [], [employeeData]);
    const employeeMap = useMemo(() => {
        const map = new Map<number, Employee>();
        employees.forEach((emp) => map.set(emp.id, emp));
        return map;
    }, [employees]);
    const { data } = useFetchLeaveRequest()
    const [search, setSearch] = useState("");
    const [employeeFilter, setEmployeeFilter] = useState<string>(STATUS_ALL);
    const [statusFilter, setStatusFilter] = useState<string>(STATUS_ALL);

    const leaveRequests = useMemo(() => data ?? [], [data])

    const filteredLeaveRequests = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        return [...leaveRequests].reverse().filter((lr) => {
            const employee = employeeMap.get(lr.employeeId);
            if (statusFilter !== STATUS_ALL && lr.status !== statusFilter) return false;
            if (employeeFilter !== STATUS_ALL && `${lr.employeeId}` !== employeeFilter) return false;
            if (keyword) {
                const haystack = [employee?.fullName, employee?.username, lr.reason]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(keyword)) return false;
            }

            return true;
        });
    }, [leaveRequests, employeeMap, search, employeeFilter, statusFilter]);
    const updateStatus = useUpdateLeaveRequest()
    const handleAction = async (id: string, action: LeaveRequestAction) => {
        await updateStatus.mutateAsync({ id, status: action });
    }
    const updatingId = updateStatus.isPending ? updateStatus.variables?.id : undefined;

    return {
        search, setSearch,
        employeeFilter, setEmployeeFilter,
        statusFilter, setStatusFilter,
        employees, employeeMap,
        filteredLeaveRequests,
        handleAction,
        updatingId,
    };
};
