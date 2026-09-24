import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonIcons from "@/components/CommonIcons";

interface PayrollStatsCardsProps {
    standardWorkDays: number;
    total: number;
    meetsCount: number;
    missingCount: number;
    finalizedCount: number;
}

const StandardWorkDaysCard = ({ value }: { value: number }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CommonIcons.CalendarClock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Ngày công chuẩn</p>
                    {isEditing ? (
                        <div className="mt-1 flex items-center gap-1">
                            <Input
                                type="number"
                                min={1}
                                max={31}
                                defaultValue={value}
                                className="h-8 w-20"
                                autoFocus
                            />
                            <Button type="button" size="sm" className="h-8 w-8 p-0">
                                <CommonIcons.Check className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => setIsEditing(false)}
                            >
                                <CommonIcons.X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <p className="text-2xl font-semibold leading-tight">
                                {value} <span className="text-sm font-normal text-muted-foreground">ngày/tháng</span>
                            </p>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground"
                                onClick={() => setIsEditing(true)}
                                title="Chỉnh sửa ngày công chuẩn"
                            >
                                <CommonIcons.Pencil className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export const PayrollStatsCards = ({
    standardWorkDays,
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
            <StandardWorkDaysCard value={standardWorkDays} />
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
