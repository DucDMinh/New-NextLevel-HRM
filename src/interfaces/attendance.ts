export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut: string | null;
}

export type TodayAttendanceStatus = "notCheckedIn" | "working" | "done";
