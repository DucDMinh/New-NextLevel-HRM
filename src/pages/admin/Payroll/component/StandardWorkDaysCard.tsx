import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonIcons from "@/components/CommonIcons";
import { useStandardWorkDays } from "../hook/useStandardWorkDays";

const isValidWorkDays = (value: number) => Number.isInteger(value) && value >= 1 && value <= 31;

export const StandardWorkDaysCard = () => {
    const { standardWorkDays, handleChangeStandardWorkDays, isSaving } = useStandardWorkDays();
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const newValue = Number(inputValue);
    const canSave = inputValue !== "" && isValidWorkDays(newValue) && newValue !== standardWorkDays;

    const handleStartEdit = () => {
        setInputValue(String(standardWorkDays));
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!canSave) return;
        const success = await handleChangeStandardWorkDays(newValue);
        if (success) setIsEditing(false);
    };

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
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSave();
                                    if (e.key === "Escape") setIsEditing(false);
                                }}
                                className="h-8 w-20"
                                autoFocus
                            />
                            <Button
                                type="button"
                                size="sm"
                                className="h-8 w-8 p-0"
                                disabled={!canSave}
                                isLoading={isSaving}
                                onClick={handleSave}
                                title="Lưu"
                            >
                                <CommonIcons.Check className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                disabled={isSaving}
                                onClick={() => setIsEditing(false)}
                                title="Hủy"
                            >
                                <CommonIcons.X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <p className="text-2xl font-semibold leading-tight">
                                {standardWorkDays} <span className="text-sm font-normal text-muted-foreground">ngày/tháng</span>
                            </p>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground"
                                onClick={handleStartEdit}
                                title="Chỉnh sửa ngày công chuẩn"
                            >
                                <CommonIcons.Pencil className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}
                    {isEditing && inputValue !== "" && !isValidWorkDays(newValue) && (
                        <p className="mt-1 text-xs text-destructive">Nhập số nguyên từ 1 đến 31</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
