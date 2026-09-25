import moment from "moment"
import CommonIcons from "@/components/CommonIcons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatNumber } from "@/helpers/common"
import { PayrollRecord } from "@/interfaces/payroll"
import { DetailRow } from "./PayrollDetailCell"

interface PayrollDetailProps {
    payroll: PayrollRecord
}

export const PayrollDetail = ({ payroll }: PayrollDetailProps) => {
    const { month, baseSalary, standardWorkDays, actualWorkDays, adjustment, note, totalPay } = payroll

    const dailyRate = standardWorkDays > 0 ? Math.round(baseSalary / standardWorkDays) : 0
    const payByWorkDays = totalPay - adjustment

    const adjustmentText = `${adjustment > 0 ? "+" : ""}${formatCurrency(adjustment)}`
    const adjustmentClassName = adjustment > 0
        ? "text-emerald-600 dark:text-emerald-400"
        : adjustment < 0
            ? "text-destructive"
            : "text-muted-foreground"
    const formula = `${formatNumber(baseSalary)} ÷ ${standardWorkDays} × ${actualWorkDays} ${adjustment < 0 ? "−" : "+"} ${formatNumber(Math.abs(adjustment))}`

    return (
        <Card className="overflow-hidden lg:col-span-2">
            <CardContent className="p-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b px-6 py-4">
                    <div className="flex items-center gap-2">
                        <CommonIcons.Receipt className="h-5 w-5 text-muted-foreground" />
                        <p className="font-semibold">
                            Phiếu lương tháng {moment(month, "YYYY-MM").format("MM/YYYY")}
                        </p>
                    </div>
                    <Badge className="gap-1">
                        <CommonIcons.Lock className="h-3 w-3" /> Đã chốt
                    </Badge>
                </div>

                <div className="flex flex-col gap-3 px-6 py-5 text-sm">
                    <DetailRow title="Lương cơ bản" description={formatCurrency(baseSalary)} />
                    <DetailRow title="Ngày công chuẩn" description={`${standardWorkDays} ngày`} />
                    <DetailRow title="Đơn giá 1 ngày công" description={formatCurrency(dailyRate)} />
                    <DetailRow title="Ngày công thực tế" description={`× ${actualWorkDays} ngày`} />
                    <Separator />
                    <DetailRow title="Lương theo ngày công" description={formatCurrency(payByWorkDays)} />
                    <DetailRow
                        className="items-start"
                        title={
                            <div className="flex flex-col">
                                <span>Thưởng/Phạt</span>
                                {note && <span className="text-xs">{note}</span>}
                            </div>
                        }
                        description={adjustmentText}
                        descriptionClassName={adjustmentClassName}
                    />
                </div>

                <DetailRow
                    className="flex-wrap items-end gap-2 bg-primary/5 px-6 py-5"
                    title={
                        <div>
                            <p className="text-sm font-medium">Thực nhận</p>
                            <p className="mt-1 font-mono text-xs">{formula}</p>
                        </div>
                    }
                    description={formatCurrency(totalPay)}
                    descriptionClassName="text-3xl font-bold tracking-tight text-primary"
                />
            </CardContent>
        </Card>
    )
}
