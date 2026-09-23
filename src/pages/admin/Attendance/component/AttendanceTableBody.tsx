import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Attendance } from "@/interfaces/attendance";
import { Employee } from "@/interfaces/employee";
import moment from "moment";

export const AttendanceTableBody = ({
    filteredAttendances,
    employeeMap,
    getWorkedDuration
}: {
    filteredAttendances: Attendance[],
    employeeMap: Map<number, Employee>,
    getWorkedDuration: (checkIn: string, checkOut: string | null) => string
}) => {
    if (filteredAttendances.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={7}
                        className="h-32 text-center text-muted-foreground"
                    >
                        Không có dữ liệu chấm công
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    return (
        <TableBody>
            {filteredAttendances.map((att, index) => {
                const employee = employeeMap.get(att.employeeId);
                const isWorking = !att.checkOut;

                return (
                    <TableRow key={att.id}>
                        <TableCell className="text-muted-foreground">
                            {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-col">
                                <span>{employee?.fullName ?? `#${att.employeeId}`}</span>
                                {employee?.username && (
                                    <span className="text-xs text-muted-foreground">
                                        {employee.username}
                                    </span>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            {moment(att.date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                            {moment(att.checkIn).format("HH:mm:ss")}
                        </TableCell>
                        <TableCell>
                            {att.checkOut
                                ? moment(att.checkOut).format("HH:mm:ss")
                                : "—"}
                        </TableCell>
                        <TableCell>
                            {getWorkedDuration(att.checkIn, att.checkOut)}
                        </TableCell>
                        <TableCell className="text-right">
                            <Badge variant={isWorking ? "default" : "secondary"}>
                                {isWorking ? "Đang làm" : "Đã check-out"}
                            </Badge>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    )
}