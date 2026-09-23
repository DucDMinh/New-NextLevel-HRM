import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
} from "@/components/ui/table";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Employee, EmployeeFormValues } from "@/interfaces/employee";
import DialogEmployeeForm from "./components/DialogEmployeeForm";
import { useCreateEmp, useDeleteEmp, useFetchEmpData, useUpdateEmp } from "@/api/employee";
import { SkeletonEmployee } from "./components/SkeletonEmployee";
import { toast } from "react-toastify";
import { EmployeeTableBody } from "./components/EmployeeTableBody";
import { EmployeeTableHeader } from "./components/EmployeeTableHeader";
import { EmployeeHeader } from "./components/EmployeeHeader";


const EmployeePage = () => {
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const { data, isFetching } = useFetchEmpData()
  const employees = data ?? [];
  const createEmp = useCreateEmp();
  const updateEmp = useUpdateEmp();
  const deleteEmp = useDeleteEmp();

  const handleSubmitEmployee = async (values: EmployeeFormValues) => {
    if (selected) {
      await updateEmp.mutateAsync({ id: selected.id, ...values });
    } else {
      await createEmp.mutateAsync(values);
    }
    setOpenForm(false);
  };

  const handleDelete = async () => {
    if (!selected) {
      toast("No emp")
      return
    }
    await deleteEmp.mutateAsync(selected.id)
    setSelected(null)
    setOpenDelete(false)
  };

  if (isFetching) {
    return (
      <SkeletonEmployee />
    )
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <EmployeeHeader
          setOpenForm={setOpenForm}
          employees={employees}
        />
        <Card>
          <CardContent className="p-0">
            <TooltipProvider>
              <Table>
                <EmployeeTableHeader />
                <EmployeeTableBody
                  employees={employees}
                  user={user}
                  setOpenDelete={setOpenDelete}
                  setOpenForm={setOpenForm}
                  setSelected={setSelected}
                />
              </Table>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      <DialogEmployeeForm
        isOpen={openForm}
        toggle={() => setOpenForm((prev) => !prev)}
        employee={selected}
        onSubmit={handleSubmitEmployee}
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
        onSubmit={handleDelete}
      />
    </PageWrapper>
  );
};

export default EmployeePage;
