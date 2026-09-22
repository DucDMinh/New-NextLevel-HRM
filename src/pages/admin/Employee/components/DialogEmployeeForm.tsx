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
import SelectField from "@/components/customFieldsFormik/SelectField";
import DateTimePickerField from "@/components/customFieldsFormik/DateTimePickerField";
import { DialogI } from "@/interfaces/common";
import { Employee, EmployeeFormValues } from "@/interfaces/employee";
import { Form, Formik } from "formik";
import { DEPARTMENT_OPTIONS, ROLE_OPTIONS } from "../mockData";

interface DialogEmployeeFormProps extends DialogI<EmployeeFormValues> {
  employee?: Employee | null;
}

const DialogEmployeeForm = (props: DialogEmployeeFormProps) => {
  const { isOpen, toggle, onSubmit, employee } = props;
  const isEdit = !!employee;

  const initialValues: EmployeeFormValues = {
    username: employee?.username ?? "",
    password: "",
    fullName: employee?.fullName ?? "",
    email: employee?.email ?? "",
    phone: employee?.phone ?? ("" as unknown as number),
    position: employee?.position ?? "",
    department: employee?.department ?? "",
    role: employee?.role ?? "",
    joinDate: employee?.joinDate ?? "",
    baseSalary: employee?.baseSalary ?? ("" as unknown as number),
  };
  return (
    <Dialog open={isOpen} onOpenChange={toggle} modal>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-full md:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Sửa thông tin nhân viên" : "Thêm nhân viên mới"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Cập nhật thông tin nhân viên. Tên đăng nhập không thể thay đổi."
                : "Điền đầy đủ thông tin để tạo tài khoản cho nhân viên mới."}
            </DialogDescription>
          </DialogHeader>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit || (() => { })}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-4">
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">
                    Tài khoản
                  </p>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormikField
                      component={InputField}
                      name="username"
                      label="Tên đăng nhập"
                      placeholder="vd: nguyen.van.a"
                      disabled={isEdit}
                      helperText={
                        isEdit ? "Không thể thay đổi tên đăng nhập" : undefined
                      }
                      required={!isEdit}
                    />
                    <FormikField
                      component={InputField}
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      placeholder={
                        isEdit ? "Để trống nếu không đổi" : "Nhập mật khẩu"
                      }
                      required={!isEdit}
                    />
                  </div>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">
                    Thông tin cá nhân
                  </p>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormikField
                      component={InputField}
                      name="fullName"
                      label="Họ và tên"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                    <FormikField
                      component={InputField}
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="email@company.vn"
                      required
                    />
                    <FormikField
                      component={InputField}
                      name="phone"
                      type="tel"
                      label="Số điện thoại"
                      placeholder="0912 345 678"
                    />
                    <FormikField
                      component={DateTimePickerField}
                      name="joinDate"
                      label="Ngày vào làm"
                      hideTimePicker
                    />
                  </div>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">
                    Công việc
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormikField
                      component={SelectField}
                      name="department"
                      label="Phòng ban"
                      placeholder="Chọn phòng ban"
                      placeholderSearch="Tìm phòng ban..."
                      options={DEPARTMENT_OPTIONS}
                      required
                    />
                    <FormikField
                      component={InputField}
                      name="position"
                      label="Chức vụ"
                      placeholder="vd: Lập trình viên"
                    />
                    <FormikField
                      component={SelectField}
                      name="role"
                      label="Vai trò"
                      placeholder="Chọn vai trò"
                      placeholderSearch="Tìm vai trò..."
                      options={ROLE_OPTIONS}
                      required
                    />
                    <FormikField
                      component={InputField}
                      name="baseSalary"
                      type="number"
                      label="Lương cơ bản (VNĐ)"
                      placeholder="vd: 15000000"
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button variant="ghost" type="button" onClick={toggle}>
                    Hủy
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    {isEdit ? "Lưu thay đổi" : "Thêm nhân viên"}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogEmployeeForm;
