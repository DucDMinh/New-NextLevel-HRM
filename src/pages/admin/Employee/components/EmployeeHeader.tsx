import CommonIcons from "@/components/CommonIcons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Employee } from "@/interfaces/employee"
import { Dispatch, SetStateAction } from "react"

export const EmployeeHeader = ({ setOpenForm, employees }: { employees: Employee[], setOpenForm: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Quản lý nhân viên
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Danh sách toàn bộ nhân viên trong công ty
                    </p>
                </div>
                <Button onClick={() => setOpenForm(true)}>
                    <CommonIcons.Plus className="icon" /> Thêm nhân viên
                </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full max-w-sm">
                    <CommonIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        className="pl-9"
                        placeholder="Tìm theo tên, tên đăng nhập, email..."
                    />
                </div>
                <span className="ml-auto text-sm text-muted-foreground">
                    Tổng: <b className="text-foreground">{employees.length}</b> nhân
                    viên
                </span>
            </div>
        </>
    )
}