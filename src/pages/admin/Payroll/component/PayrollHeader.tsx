import CommonIcons from "@/components/CommonIcons";
import { Input } from "@/components/ui/input";

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
            <div className="relative w-[180px]">
                <CommonIcons.CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="month"
                    className="pl-9"
                    value={month}
                    onChange={(e) => onMonthChange(e.target.value)}
                />
            </div>
        </div>
    )
}
