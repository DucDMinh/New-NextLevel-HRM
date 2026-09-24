import { Form, Formik } from "formik";
import moment from "moment";
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
import DateTimePickerField from "@/components/customFieldsFormik/DateTimePickerField";
import TextareaField from "@/components/customFieldsFormik/TextareaField";
import { DialogI } from "@/interfaces/common";
import { LeaveRequestFormValues, leaveRequestSchema } from "@/interfaces/leaveRequest";

const initialValues: LeaveRequestFormValues = {
    fromDate: "",
    toDate: "",
    reason: "",
};

const getLeaveDays = (fromDate: string, toDate: string) => {
    if (!fromDate || !toDate) return 0;
    const days = moment(toDate).diff(moment(fromDate), "days") + 1;
    return days > 0 ? days : 0;
};

export const DialogLeaveRequestForm = (props: DialogI<LeaveRequestFormValues>) => {
    const { isOpen, toggle, onSubmit } = props;

    return (
        <Dialog open={isOpen} onOpenChange={toggle} modal>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className="max-w-full md:max-w-[560px]">
                    <DialogHeader>
                        <DialogTitle>Tạo đơn nghỉ phép</DialogTitle>
                        <DialogDescription>
                            Điền thông tin ngày nghỉ và lý do. Đơn sẽ được gửi tới quản lý để duyệt.
                        </DialogDescription>
                    </DialogHeader>

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={leaveRequestSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={onSubmit || (() => { })}
                    >
                        {({ values, isSubmitting }) => {
                            const leaveDays = getLeaveDays(values.fromDate, values.toDate);

                            return (
                                <Form>
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <FormikField
                                                component={DateTimePickerField}
                                                name="fromDate"
                                                label="Từ ngày"
                                                hideTimePicker
                                                required
                                            />
                                            <FormikField
                                                component={DateTimePickerField}
                                                name="toDate"
                                                label="Đến ngày"
                                                hideTimePicker
                                                required
                                            />
                                        </div>

                                        {leaveDays > 0 && (
                                            <p className="text-sm text-muted-foreground">
                                                Số ngày nghỉ:{" "}
                                                <b className="text-foreground">{leaveDays} ngày</b>
                                            </p>
                                        )}

                                        <FormikField
                                            component={TextareaField}
                                            name="reason"
                                            label="Lý do nghỉ"
                                            placeholder="vd: Về quê có việc gia đình"
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <DialogFooter className="mt-6">
                                        <Button variant="ghost" type="button" onClick={toggle}>
                                            Hủy
                                        </Button>
                                        <Button type="submit" isLoading={isSubmitting}>
                                            Gửi đơn
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
