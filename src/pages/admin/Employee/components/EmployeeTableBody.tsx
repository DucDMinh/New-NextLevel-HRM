import CommonIcons from "@/components/CommonIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User } from "@/interfaces/common";
import { Employee } from "@/interfaces/employee";
import { Dispatch, SetStateAction } from "react";

export const EmployeeTableBody = ({
    employees,
    user,
    setOpenForm,
    setSelected,
    setOpenDelete
}: {
    employees: Employee[],
    user: User | null,
    setOpenForm: Dispatch<SetStateAction<boolean>>,
    setOpenDelete: Dispatch<SetStateAction<boolean>>,
    setSelected: Dispatch<SetStateAction<Employee | null>>
}) => {
    if (!employees) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                        Chưa có nhân viên nào
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }
    return (
        <TableBody>
            {employees.map((emp, index) => {
                const isSelf = emp.username === user?.username;
                return (
                    <TableRow key={emp.id}>
                        <TableCell className="text-muted-foreground">
                            {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                {emp.username}
                                {isSelf && (
                                    <Badge variant="outline" className="font-normal">
                                        Bạn
                                    </Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span>{emp.fullName}</span>
                                <span className="text-xs text-muted-foreground">
                                    {emp.position}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {emp.email}
                        </TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    emp.role === "admin" ? "default" : "secondary"
                                }
                            >
                                {emp.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-1">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setOpenForm(true)
                                                setSelected(emp)
                                            }}
                                        >
                                            <CommonIcons.Pencil className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Sửa</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                disabled={isSelf}
                                                onClick={() => {
                                                    setOpenDelete(true)
                                                    setSelected(emp)
                                                }}
                                            >
                                                <CommonIcons.Trash2 className="h-4 w-4" />
                                            </Button>
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {isSelf
                                            ? "Không thể xóa tài khoản đang đăng nhập"
                                            : "Xóa"}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            })}

            {employees.length === 0 && (
                <TableRow>
                    <TableCell
                        colSpan={7}
                        className="h-32 text-center text-muted-foreground"
                    >
                        Chưa có nhân viên nào
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}