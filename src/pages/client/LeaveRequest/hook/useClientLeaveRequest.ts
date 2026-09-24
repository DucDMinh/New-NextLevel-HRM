import moment from "moment";
import { useMemo, useState } from "react"
import { useFetchLeaveRequest } from "@/api/leave-request"
import { LeaveBalanceCardsProps, LeaveRequest, LeaveRequestStatus } from "@/interfaces/leaveRequest";

const TOTAL_LEAVE_DAYS = 12;

const getLeaveDays = (lr: LeaveRequest) =>
    moment(lr.toDate).diff(moment(lr.fromDate), "days") + 1;

export const useClientLeaveRequest = () => {
    const [openForm, setOpenForm] = useState(false);
    const { data } = useFetchLeaveRequest()
    const myLeaveRequests = useMemo(() => data ? [...data].reverse() : [], [data])
    const leaveBalance = useMemo<LeaveBalanceCardsProps>(() => {
        const sumDays = (status: LeaveRequestStatus) =>
            myLeaveRequests
                .filter((lr) => lr.status === status)
                .reduce((total, lr) => total + getLeaveDays(lr), 0);

        const used = sumDays("approved");
        return {
            total: TOTAL_LEAVE_DAYS,
            used,
            remaining: Math.max(0, TOTAL_LEAVE_DAYS - used),
            pending: sumDays("pending"),
        };
    }, [myLeaveRequests]);

    return {
        openForm, setOpenForm,
        myLeaveRequests, leaveBalance
    }
}
