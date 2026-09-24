import { ReactNode } from "react";
import { Form, Formik } from "formik";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import TextareaField from "@/components/customFieldsFormik/TextareaField";
import CommonIcons from "@/components/CommonIcons";
import { formatCurrency } from "@/helpers/common";
import { DialogI } from "@/interfaces/common";
import {
    PayrollAdjustFormValues,
    PayrollDialogMode,
    PayrollSummary,
    buildPayrollAdjustSchema,
} from "@/interfaces/payroll";

interface DialogPayrollFormProps extends DialogI<PayrollAdjustFormValues> {
    mode: PayrollDialogMode;
    payroll: PayrollSummary | null;
    draft?: PayrollAdjustFormValues;
}

const DIALOG_CONTENT: Record<PayrollDialogMode, { title: string; description: string; submitLabel: string }> = {
    finalize: {
        title: "Chốt lương",
        description: "Kiểm tra ngày công, nhập thưởng/phạt và ghi chú trước khi chốt lương cho nhân viên.",
        submitLabel: "Chốt lương",
    },
    edit: {
        title: "Điều chỉnh",
        description: "Nhập trước thưởng/phạt và ghi chú. Thông tin được lưu tạm và gửi kèm khi chốt lương.",
        submitLabel: "Lưu tạm",
    },
    refinalize: {
        title: "Chốt lại lương",
        description: "Tính lại toàn bộ lương của nhân viên theo dữ liệu chấm công mới nhất.",
        submitLabel: "Chốt lại",
    },
    editAfterfinalize: {
        title: "Sửa lương đã chốt",
        description: "Chỉ chỉnh thưởng/phạt và ghi chú. Số ngày công đã ghi nhận lúc chốt được giữ nguyên.",
        submitLabel: "Lưu thay đổi",
    }
};

const InfoItem = ({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) => (
    <div className="rounded-md border bg-muted/40 p-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-semibold">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
);

export const DialogPayrollForm = ({ isOpen, toggle, onSubmit, mode, payroll, draft }: DialogPayrollFormProps) => {
    if (!payroll) return null;

    const { title, description, submitLabel } = DIALOG_CONTENT[mode];
    const isEdit = mode === "edit";
    const isRefinalize = mode === "refinalize";
    const isEditAfterFinalize = mode === "editAfterfinalize";

    const workDays = isEditAfterFinalize ? payroll.existingActualWorkDays : payroll.actualWorkDays;
    const basePay = isEditAfterFinalize
        ? (payroll.existingTotalPay ?? 0) - (payroll.existingAdjustment ?? 0)
        : payroll.estimatedPay;

    const initialValues: PayrollAdjustFormValues = draft ?? {
        adjustment: payroll.existingAdjustment ?? 0,
        note: payroll.existingNote ?? "",
    };

    return (
        <Dialog open={isOpen} onOpenChange={toggle} modal>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className="max-w-full md:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {title} — {payroll.fullName}
                        </DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={buildPayrollAdjustSchema(basePay)}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={onSubmit || (() => { })}
                    >
                        {({ values, isSubmitting }) => {
                            const adjustment = Number(values.adjustment) || 0;

                            return (
                                <Form>
                                    <div className="flex flex-col gap-4">
                                        {isRefinalize && (
                                            <div className="flex gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400">
                                                <CommonIcons.AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                                                <span>
                                                    Ngày công sẽ được cập nhật từ{" "}
                                                    <b>{payroll.existingActualWorkDays}</b> →{" "}
                                                    <b>{payroll.actualWorkDays}</b> ngày. Tổng lương đã chốt trước đó (
                                                    <b>{formatCurrency(payroll.existingTotalPay)}</b>) sẽ bị ghi đè.
                                                </span>
                                            </div>
                                        )}

                                        {!isEdit && (
                                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                                <InfoItem
                                                    label={isEditAfterFinalize ? "Ngày công đã chốt" : "Ngày công thực tế"}
                                                    value={
                                                        <>
                                                            {workDays}
                                                            <span className="font-normal text-muted-foreground">
                                                                /{payroll.standardWorkDays} ngày
                                                            </span>
                                                        </>
                                                    }
                                                    hint={
                                                        isEditAfterFinalize ? (
                                                            <span className="flex items-center gap-1">
                                                                <CommonIcons.Lock className="h-3 w-3" /> Không thay đổi
                                                            </span>
                                                        ) : undefined
                                                    }
                                                />
                                                <InfoItem label="Lương cơ bản" value={formatCurrency(payroll.baseSalary)} />
                                                <InfoItem label="Lương theo ngày công" value={formatCurrency(basePay)} />
                                            </div>
                                        )}

                                        <div className="grid w-full gap-1.5">
                                            <FormikField
                                                component={InputField}
                                                name="adjustment"
                                                label="Thưởng/Phạt (VNĐ)"
                                                type="number"
                                                step={1000}
                                                placeholder="vd: 500000 hoặc -200000"
                                                required
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Nhập số dương cho khoản thưởng, số âm cho khoản phạt
                                            </p>
                                        </div>

                                        <FormikField
                                            component={TextareaField}
                                            name="note"
                                            label="Ghi chú"
                                            placeholder="vd: Thưởng hoàn thành dự án"
                                            rows={3}
                                            required={adjustment !== 0}
                                        />

                                        {!isEdit && (
                                            <div className="flex items-center justify-between rounded-md bg-primary/5 px-4 py-3">
                                                <span className="text-sm text-muted-foreground">Tổng lương thực nhận</span>
                                                <span className="text-lg font-semibold text-primary">
                                                    {formatCurrency(basePay + adjustment)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <DialogFooter className="mt-6">
                                        <Button variant="ghost" type="button" onClick={toggle}>
                                            Hủy
                                        </Button>
                                        <Button type="submit" isLoading={isSubmitting}>
                                            {submitLabel}
                                        </Button>
                                    </DialogFooter>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
