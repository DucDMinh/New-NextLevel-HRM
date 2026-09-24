import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/common";
import { PayrollDialogMode, PayrollRecord, PayrollSummary } from "@/interfaces/payroll";
import { AdjustmentText } from "./PayrollSummaryTableBody";
import { Button } from "@/components/ui/button";
import CommonIcons from "@/components/CommonIcons";

interface PayrollRecordTableProps {
    data: PayrollRecord[];
    summaryMap: Map<number, PayrollSummary>;
    onOpenDialog: (mode: PayrollDialogMode, payroll: PayrollSummary) => void;
}

export const PayrollRecordTable = ({ data, summaryMap, onOpenDialog }: PayrollRecordTableProps) => {
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
                            <TableHead className="text-right">Tổng lương</TableHead>
                            <TableHead>Ghi chú</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                                    Chưa có bản ghi lương nào được chốt
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((r, index) => {
                                const summary = summaryMap.get(r.employeeId);
                                const workDaysChanged = !!summary && summary.actualWorkDays !== r.actualWorkDays;

                                return (
                                    <TableRow key={r.id}>
                                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{summary?.fullName ?? `#${r.employeeId}`}</span>
                                                <span className="text-xs text-muted-foreground">#{r.employeeId}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col items-start gap-1 whitespace-nowrap">
                                                <span>
                                                    <b>{r.actualWorkDays}</b>
                                                    <span className="text-muted-foreground">/{r.standardWorkDays} ngày</span>
                                                </span>
                                                {workDaysChanged && (
                                                    <span
                                                        className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"
                                                        title="Dữ liệu chấm công đã thay đổi sau khi chốt"
                                                    >
                                                        <CommonIcons.AlertTriangle className="h-3 w-3" />
                                                        Hiện tại: {summary.actualWorkDays} ngày
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right">
                                            {formatCurrency(r.baseSalary)}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right">
                                            <AdjustmentText value={r.adjustment} />
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right font-semibold">
                                            {formatCurrency(r.totalPay)}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate" title={r.note}>
                                            {r.note || <span className="text-muted-foreground">--</span>}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2 whitespace-nowrap">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={!summary}
                                                    onClick={() => summary && onOpenDialog("editAfterfinalize", summary)}
                                                >
                                                    <CommonIcons.Pencil className="icon" /> Sửa
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={workDaysChanged ? "default" : "secondary"}
                                                    disabled={!summary}
                                                    onClick={() => summary && onOpenDialog("refinalize", summary)}
                                                >
                                                    <CommonIcons.RefreshCw className="icon" /> Chốt lại
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
