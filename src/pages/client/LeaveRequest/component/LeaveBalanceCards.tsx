import { Card, CardContent } from "@/components/ui/card";
import CommonIcons from "@/components/CommonIcons";
import { LeaveBalanceCardsProps } from "@/interfaces/leaveRequest";

const buildItems = ({ total, used, remaining, pending }: LeaveBalanceCardsProps) => [
    {
        label: "Tổng phép năm",
        value: total,
        Icon: CommonIcons.CalendarDays,
        className: "bg-primary/10 text-primary",
    },
    {
        label: "Đã dùng",
        value: used,
        Icon: CommonIcons.CalendarCheck,
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        label: "Còn lại",
        value: remaining,
        Icon: CommonIcons.CalendarRange,
        className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
        label: "Đang chờ duyệt",
        value: pending,
        Icon: CommonIcons.Hourglass,
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
];

export const LeaveBalanceCards = (props: LeaveBalanceCardsProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {buildItems(props).map(({ label, value, Icon, className }) => (
                <Card key={label}>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${className}`}
                        >
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <p className="text-2xl font-semibold leading-tight">
                                {value} <span className="text-sm font-normal text-muted-foreground">ngày</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
