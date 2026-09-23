import { useFetchAttendanceData } from "@/api/attendance";
import { useFetchEmpData } from "@/api/employee";
import { STATUS_ALL, STATUS_DONE, STATUS_WORKING } from "@/consts/common";
import { Employee } from "@/interfaces/employee";
import { useMemo, useState } from "react";

export const useAttendance = () => {
    const [search, setSearch] = useState("");
    const [employeeFilter, setEmployeeFilter] = useState<string>(STATUS_ALL);
    const [statusFilter, setStatusFilter] = useState<string>(STATUS_ALL);
    const { data: attendanceData, isFetching: isFetchingAttendance } =
        useFetchAttendanceData();
    const { data: employeeData } = useFetchEmpData();
    const attendances = useMemo(() => attendanceData ?? [], [attendanceData]);
    const employees = useMemo(() => employeeData ?? [], [employeeData]);
    const employeeMap = useMemo(() => {
        const map = new Map<number, Employee>();
        employees.forEach((emp) => map.set(emp.id, emp));
        return map;
    }, [employees]);

    const filteredAttendances = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        return [...attendances].reverse().filter((att) => {
            const employee = employeeMap.get(att.employeeId);
            const isWorking = !att.checkOut;
            if (statusFilter === STATUS_WORKING && !isWorking) return false;
            if (statusFilter === STATUS_DONE && isWorking) return false;
            if (employeeFilter !== STATUS_ALL && `${att.employeeId}` !== employeeFilter) {
                return false;
            }
            if (keyword) {
                const haystack = [
                    employee?.fullName,
                    employee?.username,
                    att.date,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!haystack.includes(keyword)) return false;
            }

            return true;
        });
    }, [attendances, employeeMap, search, employeeFilter, statusFilter]);



    const isFetching = isFetchingAttendance;
    return {
        search, setSearch,
        employeeFilter, setEmployeeFilter,
        statusFilter, setStatusFilter,
        employees, employeeMap,
        filteredAttendances,
        isFetching
    }
}