import moment from "moment"
import CommonIcons from "@/components/CommonIcons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PayrollRecord } from "@/interfaces/payroll"
import { DetailRow } from "./PayrollDetailCell"

interface PayrollSummaryProps {
    payroll: PayrollRecord
    employeeName: string
}

export const PayrollSummary = ({ payroll, employeeName }: PayrollSummaryProps) => {
    const { id, standardWorkDays, actualWorkDays, createdAt } = payroll

    const missingDays = standardWorkDays - actualWorkDays
    const progress = standardWorkDays > 0 ? Math.min(100, (actualWorkDays / standardWorkDays) * 100) : 0

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Ngày công</p>
                        {missingDays > 0 ? (
                            <Badge
                                variant="outline"
                                className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            >
                                Thiếu {missingDays} công
                            </Badge>
                        ) : (
                            <Badge
                                variant="outline"
                                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            >
                                Đủ công
                            </Badge>
                        )}
                    </div>
                    <p className="text-3xl font-semibold leading-tight">
                        {actualWorkDays}
                        <span className="text-base font-normal text-muted-foreground">/{standardWorkDays} ngày</span>
                    </p>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                        Được đếm tự động từ dữ liệu chấm công trong tháng
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col gap-3 p-5 text-sm">
                    <p className="font-medium text-muted-foreground">Thông tin chốt lương</p>
                    <DetailRow
                        title={
                            <span className="flex items-center gap-2">
                                <CommonIcons.CalendarCheck className="h-4 w-4" /> Ngày chốt
                            </span>
                        }
                        description={moment(createdAt).format("DD/MM/YYYY")}
                    />
                    <DetailRow
                        title={
                            <span className="flex items-center gap-2">
                                <CommonIcons.Hash className="h-4 w-4" /> Mã phiếu
                            </span>
                        }
                        description={`#${id}`}
                    />
                    <DetailRow
                        title={
                            <span className="flex items-center gap-2">
                                <CommonIcons.User className="h-4 w-4" /> Nhân viên
                            </span>
                        }
                        description={employeeName || "--"}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
