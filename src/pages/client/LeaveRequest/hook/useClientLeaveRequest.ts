import moment from "moment";
import { useMemo, useState } from "react"
import { useCreateLeaveRequest, useFetchLeaveRequest } from "@/api/leave-request"
import { LeaveBalanceCardsProps, LeaveRequest, LeaveRequestFormValues, LeaveRequestStatus } from "@/interfaces/leaveRequest";
import { toast } from "@/components/ui/use-toast";

const TOTAL_LEAVE_DAYS = 12;

const getLeaveDays = (lr: LeaveRequest) =>
    moment(lr.toDate).diff(moment(lr.fromDate), "days") + 1;

export const useClientLeaveRequest = () => {
    const [openForm, setOpenForm] = useState(false);
    const { data } = useFetchLeaveRequest()
    const myLeaveRequests = useMemo(() => data ? [...data].reverse() : [], [data])
    const createLeaveRequest = useCreateLeaveRequest()

    const handleCreateLR = async (values: LeaveRequestFormValues) => {
        try {
            await createLeaveRequest.mutateAsync({
                fromDate: moment(values.fromDate).format("YYYY-MM-DD"),
                toDate: moment(values.toDate).format("YYYY-MM-DD"),
                reason: values.reason.trim(),
            });
            setOpenForm(false);
        } catch (error: any) {
            toast(error.message)
        }
    };

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
        myLeaveRequests, leaveBalance, handleCreateLR
    }
}
