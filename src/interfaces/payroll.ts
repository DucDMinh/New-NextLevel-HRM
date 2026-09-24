import * as yup from "yup";
import { formatCurrency } from "@/helpers/common";

export interface PayrollSummary {
  employeeId: number;
  fullName: string;
  baseSalary: number;
  standardWorkDays: number;
  actualWorkDays: number;
  meetsRequirement: boolean;
  estimatedPay: number;
  existingRecordId: number | null;
  existingAdjustment: number | null;
  existingNote: string | null;
  existingActualWorkDays: number | null;
  existingTotalPay: number | null;
}

export interface PayrollRecord {
  id: number;
  month: string;
  employeeId: number;
  actualWorkDays: number;
  standardWorkDays: number;
  baseSalary: number;
  adjustment: number;
  note: string;
  totalPay: number;
  createdAt: string;
}

export type PayrollDialogMode = "finalize" | "edit" | "refinalize" | "editAfterfinalize";

export interface PayrollAdjustFormValues {
  adjustment: number;
  note: string;
}

export const buildPayrollAdjustSchema = (basePay: number) =>
  yup.object({
    adjustment: yup
      .number()
      .transform((value, originalValue) => (originalValue === "" ? undefined : value))
      .typeError("Thưởng/phạt phải là số")
      .required("Vui lòng nhập thưởng/phạt (nhập 0 nếu không có)")
      .integer("Thưởng/phạt phải là số nguyên")
      .min(-basePay, `Khoản phạt không được vượt quá ${formatCurrency(basePay)}`),
    note: yup
      .string()
      .trim()
      .max(255, "Ghi chú tối đa 255 ký tự")
      .when("adjustment", {
        is: (value: number) => !!value,
        then: (schema) => schema.required("Vui lòng nhập ghi chú cho khoản thưởng/phạt"),
      }),
  });
