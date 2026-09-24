import { useFetchRecordPayroll, useFetchSummaryPayroll } from "@/api/payroll"
import { PayrollAdjustFormValues, PayrollDialogMode, PayrollRecord, PayrollSummary } from "@/interfaces/payroll";
import { useMemo, useState } from "react"

export const usePayroll = () => {
    const [month, setMonth] = useState("2026-09");
    const { data: sumData, isFetching } = useFetchSummaryPayroll(month)
    const payrollSummary = useMemo<PayrollSummary[]>(
        () => sumData ?? [],
        [sumData]
    );
    const { data: reData } = useFetchRecordPayroll()
    const payrollRecords = useMemo<PayrollRecord[]>(
        () => reData ?? [],
        [reData]
    )

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<PayrollDialogMode>("finalize");
    const [selectedPayroll, setSelectedPayroll] = useState<PayrollSummary | null>(null);

    const [drafts, setDrafts] = useState<Record<number, PayrollAdjustFormValues>>({});

    const handleChangeMonth = (value: string) => {
        setMonth(value);
        setDrafts({});
    };

    const handleOpenDialog = (mode: PayrollDialogMode, payroll: PayrollSummary) => {
        setDialogMode(mode);
        setSelectedPayroll(payroll);
        setOpenDialog(true);
    };

    const handleSubmitPayroll = (values: PayrollAdjustFormValues) => {
        if (!selectedPayroll) return;

        switch (dialogMode) {
            case "edit":
                setDrafts((prev) => ({
                    ...prev,
                    [selectedPayroll.employeeId]: {
                        adjustment: Number(values.adjustment),
                        note: values.note.trim(),
                    },
                }));
                setOpenDialog(false);
                break;
        }
    };

    return {
        month, setMonth: handleChangeMonth,
        payrollSummary, payrollRecords,
        drafts,
        openDialog, setOpenDialog, dialogMode, selectedPayroll,
        handleOpenDialog, handleSubmitPayroll, isFetching
    }
}
