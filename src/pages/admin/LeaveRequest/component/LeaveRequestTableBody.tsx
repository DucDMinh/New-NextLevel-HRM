import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Employee } from "@/interfaces/employee";
import { LeaveRequest, LeaveRequestAction } from "@/interfaces/leaveRequest";
import CommonIcons from "@/components/CommonIcons";

interface LeaveRequestTableBodyProps {
    filteredLeaveRequests: LeaveRequest[];
    employeeMap: Map<number, Employee>;
    handleAction: (id: string, action: LeaveRequestAction) => void
    updatingId?: string
}

const STATUS_LABEL: Record<LeaveRequest["status"], string> = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Đã từ chối",
};

const STATUS_VARIANT: Record<LeaveRequest["status"], "default" | "outline" | "destructive"> = {
    pending: "outline",
    approved: "default",
    rejected: "destructive",
};

const getLeaveDays = (fromDate: string, toDate: string) => {
    return moment(toDate).diff(moment(fromDate), "days") + 1;
};

export const LeaveRequestTableBody = ({
    filteredLeaveRequests,
    employeeMap,
    handleAction,
    updatingId,
}: LeaveRequestTableBodyProps) => {
    if (filteredLeaveRequests.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                        Không có đơn nghỉ phép nào
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    return (
        <TableBody>
            {filteredLeaveRequests.map((lr, index) => {
                const employee = employeeMap.get(lr.employeeId);
                const isPending = lr.status === "pending";
                const isUpdating = updatingId === lr.id;

                return (
                    <TableRow key={lr.id}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-col">
                                <span>{employee?.fullName ?? `#${lr.employeeId}`}</span>
                                {employee?.username && (
                                    <span className="text-xs text-muted-foreground">
                                        {employee.username}
                                    </span>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{moment(lr.fromDate).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{moment(lr.toDate).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{getLeaveDays(lr.fromDate, lr.toDate)} ngày</TableCell>
                        <TableCell className="max-w-[220px] truncate" title={lr.reason}>
                            {lr.reason}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {moment(lr.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                            <Badge variant={STATUS_VARIANT[lr.status]}>
                                {STATUS_LABEL[lr.status]}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {isPending ? (
                                <div className="flex justify-end gap-1">
                                    <Button
                                        size="sm"
                                        onClick={() => handleAction(lr.id, 'approved')}
                                        disabled={isUpdating}
                                        isLoading={isUpdating}
                                    >
                                        <CommonIcons.Check className="icon" /> Duyệt
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleAction(lr.id, 'rejected')}
                                        disabled={isUpdating}
                                        isLoading={isUpdating}
                                    >
                                        <CommonIcons.X className="icon" /> Từ chối
                                    </Button>
                                </div>
                            ) : (
                                <span className="text-sm text-muted-foreground">—</span>
                            )}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    )
}
