import moment from "moment"
import CommonIcons from "@/components/CommonIcons"
import { Card, CardContent } from "@/components/ui/card"

export const PayrollEmpty = ({ month }: { month: string }) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CommonIcons.Hourglass className="h-6 w-6" />
                </div>
                <p className="font-semibold">
                    Tháng {moment(month, "YYYY-MM").format("MM/YYYY")} chưa được chốt lương
                </p>
                <p className="max-w-md text-sm text-muted-foreground">
                    Phiếu lương sẽ hiển thị tại đây sau khi quản lý chốt lương cho tháng này.
                </p>
            </CardContent>
        </Card>
    )
}
