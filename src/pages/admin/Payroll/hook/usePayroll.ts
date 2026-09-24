import { useCreatePayroll, useFetchRecordPayroll, useFetchSummaryPayroll, useUpdatePayroll } from "@/api/payroll"
import { PayrollAdjustFormValues, PayrollDialogMode, PayrollRecord, PayrollSummary } from "@/interfaces/payroll";
import { useMemo, useState } from "react"
import { toast } from "@/components/ui/use-toast";

export const usePayroll = () => {
    const [month, setMonth] = useState("2026-09");
    const { data: sumData, isLoading } = useFetchSummaryPayroll(month)
    const payrollSummary = useMemo<PayrollSummary[]>(
        () => sumData ?? [],
        [sumData]
    );
    const { data: reData } = useFetchRecordPayroll(month)
    const payrollRecords = useMemo<PayrollRecord[]>(
        () => reData ?? [],
        [reData]
    )
    const createPayroll = useCreatePayroll()
    const updatePayroll = useUpdatePayroll()

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

    const handleSubmitPayroll = async (values: PayrollAdjustFormValues) => {
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
            case "finalize":
                try {
                    await createPayroll.mutateAsync({
                        adjustment: Number(values.adjustment),
                        note: values.note.trim(),
                        employeeId: selectedPayroll.employeeId,
                        month,
                    })
                    setDrafts(({ [selectedPayroll.employeeId]: _, ...rest }) => rest);
                    setOpenDialog(false);
                } catch (error: any) {
                    toast(error.message)
                }
                break;
            case "editAfterfinalize":
                if (selectedPayroll.existingRecordId === null) return;
                try {
                    await updatePayroll.mutateAsync({
                        id: selectedPayroll.existingRecordId,
                        adjustment: Number(values.adjustment),
                        note: values.note.trim(),
                    })
                    setOpenDialog(false);
                } catch (error: any) {
                    toast(error.message)
                }
                break;
        }
    };

    return {
        month, setMonth: handleChangeMonth,
        payrollSummary, payrollRecords,
        drafts,
        openDialog, setOpenDialog, dialogMode, selectedPayroll,
        handleOpenDialog, handleSubmitPayroll, isLoading
    }
}
