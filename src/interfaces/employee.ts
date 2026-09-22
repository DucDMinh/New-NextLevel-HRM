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
