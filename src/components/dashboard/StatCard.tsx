import { ReactNode } from "react"
import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import CommonIcons from "@/components/CommonIcons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
    label: string
    value: ReactNode
    unit?: string
    description?: ReactNode
    icon: LucideIcon
    iconClassName?: string
    href?: string
    linkLabel?: string
}

export const StatCard = ({
    label,
    value,
    unit,
    description,
    icon: Icon,
    iconClassName,
    href,
    linkLabel = "Xem chi tiết",
}: StatCardProps) => {
    return (
        <Card>
            <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <div
                        className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
                            iconClassName
                        )}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-semibold tracking-tight">
                        {value}
                        {unit && <span className="ml-1.5 text-base font-normal text-muted-foreground">{unit}</span>}
                    </p>
                    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                </div>
                {href && (
                    <Button asChild variant="link" className="mt-auto h-auto justify-start p-0">
                        <Link to={href}>
                            {linkLabel} <CommonIcons.ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
