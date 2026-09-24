import { Card, CardContent } from "@/components/ui/card";
import CommonIcons from "@/components/CommonIcons";
import { StandardWorkDaysCard } from "./StandardWorkDaysCard";

interface PayrollStatsCardsProps {
    total: number;
    meetsCount: number;
    missingCount: number;
    finalizedCount: number;
}

export const PayrollStatsCards = ({
    total,
    meetsCount,
    missingCount,
    finalizedCount,
}: PayrollStatsCardsProps) => {
    const items = [
        {
            label: "Đủ công",
            value: meetsCount,
            unit: "nhân viên",
            Icon: CommonIcons.UserCheck,
            className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
        {
            label: "Thiếu công",
            value: missingCount,
            unit: "nhân viên",
            Icon: CommonIcons.UserX,
            className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        },
        {
            label: "Đã chốt lương",
            value: `${finalizedCount}/${total}`,
            unit: "nhân viên",
            Icon: CommonIcons.Lock,
            className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StandardWorkDaysCard />
            {items.map(({ label, value, unit, Icon, className }) => (
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
                                {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
