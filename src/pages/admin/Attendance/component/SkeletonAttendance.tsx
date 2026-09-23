import PageWrapper from "@/components/PageWrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { TableBody, TableHeader } from "react-stately"

export const SkeletonAttendance = () => {
    return (
        <PageWrapper>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-9 w-full max-w-sm" />
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-9 w-40" />
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">#</TableHead>
                                    <TableHead>Nhân viên</TableHead>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Giờ vào</TableHead>
                                    <TableHead>Giờ ra</TableHead>
                                    <TableHead>Thời gian làm</TableHead>
                                    <TableHead className="text-right">Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell>
                                            <div className="flex justify-end">
                                                <Skeleton className="h-5 w-20 rounded-full" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    )
}