import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import CommonIcons from "@/components/CommonIcons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmpUrl } from "@/consts/baseUrl"
import { formatDuration, formatTime } from "@/helpers/datetime"
import { Attendance, TodayAttendanceStatus } from "@/interfaces/attendance"
import { cn } from "@/lib/utils"

interface TodayAttendanceCardProps {
    status: TodayAttendanceStatus
    attendance?: Attendance
}

const STATUS_CONTENT: Record<TodayAttendanceStatus, {
    title: string
    badge: string
    icon: LucideIcon
    className: string
}> = {
    notCheckedIn: {
        title: "Chưa vào ca",
        badge: "Chưa chấm công",
        icon: CommonIcons.LogIn,
        className: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    working: {
        title: "Đang trong ca",
        badge: "Đang làm",
        icon: CommonIcons.Timer,
        className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    done: {
        title: "Đã kết thúc ca",
        badge: "Đã hoàn thành",
        icon: CommonIcons.CheckCircle2,
        className: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
}

const getDescription = (status: TodayAttendanceStatus, attendance?: Attendance) => {
    if (status === "notCheckedIn" || !attendance) return "Bạn chưa chấm công vào ca hôm nay"
    if (status === "working") {
        return `Vào ca lúc ${formatTime(attendance.checkIn)} · đã làm ${formatDuration(attendance.checkIn, new Date())}`
    }
    return `${formatTime(attendance.checkIn)} — ${formatTime(attendance.checkOut)} · tổng ${formatDuration(attendance.checkIn, attendance.checkOut)}`
}

export const TodayAttendanceCard = ({ status, attendance }: TodayAttendanceCardProps) => {
    const { title, badge, icon: Icon, className } = STATUS_CONTENT[status]

    return (
        <Card>
            <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">Chấm công hôm nay</p>
                    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", className)}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-3xl font-semibold tracking-tight">{title}</p>
                        <Badge variant="outline" className={className}>{badge}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{getDescription(status, attendance)}</p>
                </div>
                {status === "notCheckedIn" ? (
                    <Button asChild className="mt-auto w-fit">
                        <Link to={EmpUrl.Attendance}>
                            <CommonIcons.LogIn className="icon" /> Chấm công ngay
                        </Link>
                    </Button>
                ) : (
                    <Button asChild variant="link" className="mt-auto h-auto justify-start p-0">
                        <Link to={EmpUrl.Attendance}>
                            Xem lịch sử chấm công <CommonIcons.ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
