import moment from "moment"
import CommonIcons from "@/components/CommonIcons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RefreshButtonProps {
    onRefresh: () => void
    isRefreshing: boolean
    updatedAt?: number
}

export const RefreshButton = ({ onRefresh, isRefreshing, updatedAt }: RefreshButtonProps) => {
    return (
        <div className="flex items-center gap-3">
            {!!updatedAt && (
                <span className="text-xs text-muted-foreground">
                    Cập nhật lúc {moment(updatedAt).format("HH:mm:ss")}
                </span>
            )}
            <Button variant="outline" onClick={onRefresh} disabled={isRefreshing}>
                <CommonIcons.RefreshCw className={cn("icon", isRefreshing && "animate-spin")} />
                {isRefreshing ? "Đang làm mới..." : "Làm mới"}
            </Button>
        </div>
    )
}
