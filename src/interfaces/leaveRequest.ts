import moment from 'moment';
import * as yup from 'yup'

export type LeaveRequestStatus = "pending" | "approved" | "rejected";

export interface LeaveRequest {
  id: string;
  employeeId: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveRequestStatus;
  createdAt: string;
}

export type LeaveRequestAction = Extract<LeaveRequestStatus, "approved" | "rejected">;

export type UpdateLeaveRequest = {
  id: string,
  status: LeaveRequestAction
}
export interface LeaveBalanceCardsProps {
  total: number;
  used: number;
  remaining: number;
  pending: number;
}
export type LeaveRequestFormValues = Pick<LeaveRequest, "fromDate" | "toDate" | "reason">;

export const leaveRequestSchema = yup.object({
  fromDate: yup.string().required("Vui lòng chọn ngày bắt đầu nghỉ"),
  toDate: yup
    .string()
    .required("Vui lòng chọn ngày kết thúc")
    .test(
      "after-from-date",
      "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
      (value, context) => {
        const { fromDate } = context.parent;
        if (!value || !fromDate) return true;
        return moment(new Date(value)).isSameOrAfter(moment(new Date(fromDate)), "day");
      }
    ),
  reason: yup
    .string()
    .trim()
    .min(5, "Lý do tối thiểu 5 ký tự")
    .required("Vui lòng nhập lý do nghỉ"),
});
