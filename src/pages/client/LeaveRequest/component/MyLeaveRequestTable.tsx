import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/interfaces/leaveRequest";

interface MyLeaveRequestTableProps {
    data: LeaveRequest[];
    onCancel: (id: string) => void;
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

const getLeaveDays = (fromDate: string, toDate: string) =>
    moment(toDate).diff(moment(fromDate), "days") + 1;

export const MyLeaveRequestTable = ({ data }: MyLeaveRequestTableProps) => {
    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Từ ngày</TableHead>
                            <TableHead>Đến ngày</TableHead>
                            <TableHead>Số ngày</TableHead>
                            <TableHead>Lý do</TableHead>
                            <TableHead>Ngày tạo</TableHead>
                            <TableHead>Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>

                    {data.length === 0 ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                                    Bạn chưa có đơn nghỉ phép nào
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {data.map((lr, index) => {

                                return (
                                    <TableRow key={lr.id}>
                                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                                        <TableCell>{moment(lr.fromDate).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell>{moment(lr.toDate).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell>{getLeaveDays(lr.fromDate, lr.toDate)} ngày</TableCell>
                                        <TableCell className="max-w-[240px] truncate" title={lr.reason}>
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
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}
                </Table>
            </CardContent>
        </Card>
    );
};
