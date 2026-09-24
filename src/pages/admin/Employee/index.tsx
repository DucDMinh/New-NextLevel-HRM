import PageWrapper from "@/components/PageWrapper";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
} from "@/components/ui/table";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import DialogEmployeeForm from "./components/DialogEmployeeForm";
import { EmployeeTableBody } from "./components/EmployeeTableBody";
import { EmployeeTableHeader } from "./components/EmployeeTableHeader";
import { EmployeeHeader } from "./components/EmployeeHeader";
import { useEmployee } from "./hook/useEmployee"

const EmployeePage = () => {

  const {
    user,
    openForm, setOpenForm,
    openDelete, setOpenDelete,
    selected, setSelected, isFetching,
    employees,
    handleSubmitEmployee, handleDelete
  } = useEmployee()

  return (
    <PageWrapper isFetching={isFetching}>
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
