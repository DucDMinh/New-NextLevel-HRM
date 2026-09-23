import { useState } from "react";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CommonIcons from "@/components/CommonIcons";
import { Attendance } from "@/interfaces/attendance";
import { useCheckIn, useCheckOut } from "@/api/attendance";

interface CheckInOutCardProp {
    currentLogin: Attendance | undefined
    todayRecord: Attendance | undefined
}

export const CheckInOutCard = ({ currentLogin, todayRecord }: CheckInOutCardProp) => {
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const checkIn = useCheckIn()
    const checkOut = useCheckOut()

    const handleCheckIn = async () => {
        if (!currentLogin?.checkIn)
            await checkIn.mutateAsync()
        setCheckInTime(moment().format("HH:mm:ss"));
    };

    const handleCheckOut = async () => {
        if (!currentLogin?.checkOut)
            await checkOut.mutateAsync()
        setCheckOutTime(moment().format("HH:mm:ss"));
    };

    return (
        <Card>
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CommonIcons.CalendarClock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {moment().format("dddd, DD/MM/YYYY")}
                        </p>
                        {!todayRecord && (
                            <p className="text-base font-medium">
                                Bạn chưa chấm công hôm nay
                            </p>
                        )}
                        {(currentLogin?.checkIn && !currentLogin.checkOut) && (
                            <div className="flex items-center gap-2">
                                <p className="text-base font-medium">
                                    Đã chấm công vào lúc {checkInTime}
                                </p>
                                <Badge>Đang làm</Badge>
                            </div>
                        )}
                        {currentLogin?.checkOut && (
                            <div className="flex items-center gap-2">
                                <p className="text-base font-medium">
                                    Ca làm: {checkInTime} — {checkOutTime}
                                </p>
                                <Badge variant="secondary">Đã hoàn thành</Badge>
                            </div>
                        )}
                        {!currentLogin && (
                            <p className="text-sm text-muted-foreground">
                                Bạn đã hoàn thành ca làm hôm nay. Hẹn gặp lại ngày mai!
                            </p>
                        )}
                    </div>
                </div>
                {(!todayRecord) && (
                    <Button
                        className="w-full sm:w-auto"
                        onClick={handleCheckIn}
                        isLoading={checkIn.isPending}
                    >
                        <CommonIcons.LogIn className="icon" /> Chấm công vào
                    </Button>
                )}
                {(currentLogin?.checkIn && !currentLogin.checkOut) && (
                    <Button
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={handleCheckOut}
                        isLoading={checkOut.isPending}
                    >
                        <CommonIcons.LogOut className="icon" /> Chấm công ra
                    </Button>
                )}
                {(todayRecord && !currentLogin) && (
                    <Button variant="outline" className="w-full sm:w-auto" disabled>
                        <CommonIcons.CheckCircle2 className="icon" /> Đã chấm công đủ hôm nay
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
