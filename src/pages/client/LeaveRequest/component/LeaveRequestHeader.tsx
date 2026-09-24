import { Button } from "@/components/ui/button";
import CommonIcons from "@/components/CommonIcons";

interface LeaveRequestHeaderProps {
    onCreate: () => void;
}

export const LeaveRequestHeader = ({ onCreate }: LeaveRequestHeaderProps) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Nghỉ phép
                </h1>
                <p className="text-sm text-muted-foreground">
                    Tạo đơn nghỉ phép và theo dõi tình trạng duyệt đơn của bạn
                </p>
            </div>
            <Button onClick={onCreate}>
                <CommonIcons.CalendarPlus className="icon" /> Tạo đơn nghỉ phép
            </Button>
        </div>
    )
}
