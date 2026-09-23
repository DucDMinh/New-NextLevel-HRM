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

// Chỉ 2 trạng thái này là kết quả của hành động duyệt/từ chối
// ("pending" là trạng thái ban đầu, không phải thứ admin set được).
export type LeaveRequestAction = Extract<LeaveRequestStatus, "approved" | "rejected">;

export type UpdateLeaveRequest = {
  id: string,
  status: LeaveRequestAction
}
