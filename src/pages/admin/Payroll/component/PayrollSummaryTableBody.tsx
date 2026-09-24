import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CommonIcons from "@/components/CommonIcons";
import { formatCurrency } from "@/helpers/common";
import { PayrollAdjustFormValues, PayrollDialogMode, PayrollSummary } from "@/interfaces/payroll";
import { Card, CardContent } from "@/components/ui/card";

interface PayrollSummaryTableBodyProps {
    data: PayrollSummary[];
    drafts: Record<number, PayrollAdjustFormValues>;
    onOpenDialog: (mode: PayrollDialogMode, payroll: PayrollSummary) => void;
}

export const AdjustmentText = ({ value }: { value: number | null }) => {
    if (value === null) return <span className="text-muted-foreground">--</span>;
    if (value === 0) return <span className="text-muted-foreground">0 ₫</span>;

    return (
        <span className={value > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}>
            {value > 0 ? "+" : ""}{formatCurrency(value)}
        </span>
    )
}

export const WorkDaysBadge = ({ meets }: { meets: boolean }) => (
    <Badge
        variant="outline"
        className={
            meets
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
        }
    >
        {meets ? "Đủ công" : "Thiếu công"}
    </Badge>
)

export const PayrollSummaryTableBody = ({ data, drafts, onOpenDialog }: PayrollSummaryTableBodyProps) => {
    const unfinalized = data.filter((emp) => emp.existingRecordId == null);

    return (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Nhân viên</TableHead>
                            <TableHead>Ngày công</TableHead>
                            <TableHead className="text-right">Lương cơ bản</TableHead>
                            <TableHead className="text-right">Thưởng/Phạt</TableHead>
                            <TableHead className="text-right">Lương dự kiến</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {unfinalized.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    Tất cả nhân viên đã được chốt lương trong tháng này
                                </TableCell>
                            </TableRow>
                        ) : (
                            unfinalized.map((p, index) => {
                                const draft = drafts[p.employeeId];

                                return (
                                    <TableRow key={p.employeeId}>
                                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{p.fullName}</span>
                                                <span className="text-xs text-muted-foreground">#{p.employeeId}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 whitespace-nowrap">
                                                <span>
                                                    <b>{p.actualWorkDays}</b>
                                                    <span className="text-muted-foreground">/{p.standardWorkDays} ngày</span>
                                                </span>
                                                <WorkDaysBadge meets={p.meetsRequirement} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right">
                                            {formatCurrency(p.baseSalary)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {draft ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="whitespace-nowrap">
                                                        <AdjustmentText value={draft.adjustment} />
                                                    </span>
                                                    {draft.note && (
                                                        <span
                                                            className="max-w-[180px] truncate text-xs text-muted-foreground"
                                                            title={draft.note}
                                                        >
                                                            {draft.note}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">--</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right font-semibold">
                                            {formatCurrency(p.estimatedPay + (draft?.adjustment ?? 0))}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2 whitespace-nowrap">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => onOpenDialog("edit", p)}
                                                >
                                                    <CommonIcons.Pencil className="icon" /> Sửa
                                                </Button>
                                                <Button size="sm" onClick={() => onOpenDialog("finalize", p)}>
                                                    <CommonIcons.Lock className="icon" /> Chốt lương
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
