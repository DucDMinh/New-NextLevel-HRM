import moment from "moment"
import { MonthPicker } from "@/components/filters/MonthPicker"

interface PayrollHeaderProps {
    month: string
    onMonthChange: (month: string) => void
}

export const PayrollHeader = ({ month, onMonthChange }: PayrollHeaderProps) => {
    return (
        <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Lương thưởng
                </h1>
                <div className="text-sm text-muted-foreground">
                    Xem lịch sử lương của bạn theo từng tháng
                </div>
            </div>
            <MonthPicker
                className="ml-auto"
                value={month}
                onChange={onMonthChange}
                max={moment().format("YYYY-MM")}
            />
        </div>
    )
}
