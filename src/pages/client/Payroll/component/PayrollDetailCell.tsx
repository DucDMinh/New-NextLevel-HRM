import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DetailRowProp {
    title: ReactNode
    description: ReactNode
    className?: string,
    titleClassName?: string
    descriptionClassName?: string
}

export const DetailRow = ({ title, description, className, titleClassName, descriptionClassName }: DetailRowProp) => {
    return (
        <div className={cn("flex items-center justify-between gap-4", className)}>
            <div className={cn("text-muted-foreground", titleClassName)}>{title}</div>
            <div className={cn("font-medium", descriptionClassName)}>{description}</div>
        </div>
    )
}
