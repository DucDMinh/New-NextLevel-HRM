import * as yup from 'yup'

export interface Employee {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: number;
  position: string;
  department: string;
  role: string;
  joinDate: string;
  baseSalary: number;
}

export type EmployeeFormValues = Omit<Employee, "id"> & {
  password: string;
};

export type UpdateEmployeePayload = Pick<Employee, "id"> & EmployeeFormValues;

export const getEmployeeSchema = (isEdit: boolean) =>
  yup.object({
    username: yup.string()
      .trim()
      .min(3, "Tên đăng nhập tối thiểu 3 ký tự")
      .matches(/^[a-z0-9._]+$/, "Chỉ dùng chữ thường, số, dấu chấm hoặc gạch dưới")
      .required("Vui lòng nhập tên đăng nhập"),
    fullName: yup.string()
      .trim()
      .required("Vui lòng nhập họ và tên"),
    email: yup.string()
      .trim()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phone: yup.string()
      .matches(/^(0|\+84)[0-9]{9,10}$/, {
        message: "Số điện thoại không hợp lệ",
        excludeEmptyString: true,
      })
      .notRequired(),
    position: yup.string()
      .notRequired(),
    department: yup.string()
      .required("Vui lòng chọn phòng ban"),
    role: yup.string()
      .required("Vui lòng chọn vai trò"),
    joinDate: yup.string()
      .required("Vui lòng chọn ngày vào làm"),
    baseSalary: yup.number()
      .typeError("Lương cơ bản phải là số")
      .min(0, "Lương cơ bản không được âm")
      .required("Vui lòng nhập lương cơ bản"),
    password: isEdit
      ? yup.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
          "Mật khẩu cần tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
        )
        .notRequired()
      : yup.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
          "Mật khẩu cần tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
        )
        .required("Vui lòng nhập mật khẩu"),
  })
