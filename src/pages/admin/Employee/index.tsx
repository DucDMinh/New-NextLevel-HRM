import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import CommonIcons from "@/components/CommonIcons";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Employee } from "@/interfaces/employee";
import DialogEmployeeForm from "./components/DialogEmployeeForm";
import { MOCK_EMPLOYEES, ROLE_OPTIONS } from "./mockData";

const getRoleLabel = (role: string) =>
  ROLE_OPTIONS.find((o) => o.value === role)?.label ?? role;

const EmployeePage = () => {
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const employees = MOCK_EMPLOYEES;

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelected(employee);
    setOpenForm(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelected(employee);
    setOpenDelete(true);
  };

  return (
    <PageWrapper>
      <div className="component:Employee flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Quản lý nhân viên
            </h1>
            <p className="text-sm text-muted-foreground">
              Danh sách toàn bộ nhân viên trong công ty
            </p>
          </div>
          <Button onClick={handleAdd}>
            <CommonIcons.Plus className="icon" /> Thêm nhân viên
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <CommonIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Tìm theo tên, tên đăng nhập, email..."
            />
          </div>
          <span className="ml-auto text-sm text-muted-foreground">
            Tổng: <b className="text-foreground">{employees.length}</b> nhân
            viên
          </span>
        </div>
        <Card>
          <CardContent className="p-0">
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Tên đăng nhập</TableHead>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead className="w-28 text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp, index) => {
                    const isSelf = emp.username === user?.username;
                    return (
                      <TableRow key={emp.id}>
                        <TableCell className="text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {emp.username}
                            {isSelf && (
                              <Badge variant="outline" className="font-normal">
                                Bạn
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{emp.fullName}</span>
                            <span className="text-xs text-muted-foreground">
                              {emp.position}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {emp.email}
                        </TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              emp.role === "manager" ? "default" : "secondary"
                            }
                          >
                            {getRoleLabel(emp.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(emp)}
                                >
                                  <CommonIcons.Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Sửa</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    disabled={isSelf}
                                    onClick={() => handleDelete(emp)}
                                  >
                                    <CommonIcons.Trash2 className="h-4 w-4" />
                                  </Button>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {isSelf
                                  ? "Không thể xóa tài khoản đang đăng nhập"
                                  : "Xóa"}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {employees.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-32 text-center text-muted-foreground"
                      >
                        Chưa có nhân viên nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      <DialogEmployeeForm
        isOpen={openForm}
        toggle={() => setOpenForm((prev) => !prev)}
        employee={selected}
        onSubmit={() => setOpenForm(false)}
      />
      <DialogConfirm
        isOpen={openDelete}
        toggle={() => setOpenDelete((prev) => !prev)}
        title="Xóa nhân viên"
        content={
          <>
            Bạn có chắc muốn xóa nhân viên{" "}
            <b className="text-foreground">{selected?.fullName}</b> (
            {selected?.username})? Hành động này không thể hoàn tác.
          </>
        }
        onSubmit={() => setOpenDelete(false)}
      />
    </PageWrapper>
  );
};

export default EmployeePage;
