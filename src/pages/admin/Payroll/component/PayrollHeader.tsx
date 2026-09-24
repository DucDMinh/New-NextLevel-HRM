import moment from "moment";
import { MonthPicker } from "@/components/filters/MonthPicker";

interface PayrollHeaderProps {
    month: string;
    onMonthChange: (month: string) => void;
}

export const PayrollHeader = ({ month, onMonthChange }: PayrollHeaderProps) => {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Bảng lương
                </h1>
                <p className="text-sm text-muted-foreground">
                    Tổng hợp ngày công, chốt và điều chỉnh lương của toàn bộ nhân viên theo tháng
                </p>
            </div>
            <MonthPicker
                value={month}
                onChange={onMonthChange}
                max={moment().format("YYYY-MM")}
            />
        </div>
    )
}
