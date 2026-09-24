import { useState } from "react";
import moment from "moment";
import CommonIcons from "@/components/CommonIcons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MonthPickerProps {
    value: string;
    onChange: (value: string) => void;
    max?: string;
    className?: string;
}

const MONTH_FORMAT = "YYYY-MM";
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const toMonthValue = (year: number, month: number) => `${year}-${String(month).padStart(2, "0")}`;
const shiftMonth = (value: string, amount: number) =>
    moment(value, MONTH_FORMAT).add(amount, "month").format(MONTH_FORMAT);

export const MonthPicker = ({ value, onChange, max, className }: MonthPickerProps) => {
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(() => moment(value, MONTH_FORMAT).year());

    const currentMonth = moment().format(MONTH_FORMAT);
    const maxYear = max ? moment(max, MONTH_FORMAT).year() : undefined;
    const isAfterMax = (month: string) => !!max && month > max;
    const nextMonth = shiftMonth(value, 1);

    const handleOpenChange = (nextOpen: boolean) => {
        if (nextOpen) setViewYear(moment(value, MONTH_FORMAT).year());
        setOpen(nextOpen);
    };

    const handleSelect = (month: string) => {
        onChange(month);
        setOpen(false);
    };

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => onChange(shiftMonth(value, -1))}
                title="Tháng trước"
            >
                <CommonIcons.ChevronLeft className="h-4 w-4" />
            </Button>

            <Popover open={open} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="min-w-[150px] justify-start gap-2">
                        <CommonIcons.CalendarDays className="h-4 w-4 text-muted-foreground" />
                        Tháng {moment(value, MONTH_FORMAT).format("MM/YYYY")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[260px] p-3">
                    <div className="mb-3 flex items-center justify-between">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setViewYear((y) => y - 1)}
                        >
                            <CommonIcons.ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-semibold">{viewYear}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            disabled={maxYear !== undefined && viewYear >= maxYear}
                            onClick={() => setViewYear((y) => y + 1)}
                        >
                            <CommonIcons.ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {MONTHS.map((m) => {
                            const monthValue = toMonthValue(viewYear, m);
                            const isSelected = monthValue === value;
                            const isCurrent = monthValue === currentMonth;

                            return (
                                <Button
                                    key={m}
                                    type="button"
                                    size="sm"
                                    variant={isSelected ? "default" : "ghost"}
                                    className={cn(isCurrent && !isSelected && "border border-primary text-primary")}
                                    disabled={isAfterMax(monthValue)}
                                    onClick={() => handleSelect(monthValue)}
                                >
                                    Th{m}
                                </Button>
                            );
                        })}
                    </div>

                    <div className="mt-3 border-t pt-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-full"
                            disabled={isAfterMax(currentMonth)}
                            onClick={() => handleSelect(currentMonth)}
                        >
                            Tháng này
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={isAfterMax(nextMonth)}
                onClick={() => onChange(nextMonth)}
                title="Tháng sau"
            >
                <CommonIcons.ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};
