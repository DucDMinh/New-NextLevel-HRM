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
import { Attendance } from "@/interfaces/attendance";
import { getWorkedDuration } from "@/helpers/common";

interface AttendanceHistoryTableProps {
    data: Attendance[];
}
export const AttendanceHistoryTable = ({ data }: AttendanceHistoryTableProps) => {
    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Giờ vào</TableHead>
                            <TableHead>Giờ ra</TableHead>
                            <TableHead>Thời gian làm</TableHead>
                            <TableHead className="text-right">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    {data.length === 0 ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    Chưa có lịch sử chấm công
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {data.map((att, index) => {
                                const isWorking = !att.checkOut;
                                return (
                                    <TableRow key={att.id}>
                                        <TableCell className="text-muted-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{moment(att.date).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell>{moment(att.checkIn).format("HH:mm:ss")}</TableCell>
                                        <TableCell>
                                            {att.checkOut ? moment(att.checkOut).format("HH:mm:ss") : "—"}
                                        </TableCell>
                                        <TableCell>{getWorkedDuration(att.checkIn, att.checkOut)}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={isWorking ? "default" : "secondary"}>
                                                {isWorking ? "Đang làm" : "Đã hoàn thành"}
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
