import { useCreateEmp, useDeleteEmp, useFetchEmpData, useUpdateEmp } from "@/api/employee";
import { Employee, EmployeeFormValues } from "@/interfaces/employee";
import { useAuth } from "@/providers/AuthenticationProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export const useEmployee = () => {
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
    return {
        user,
        openForm, setOpenForm,
        openDelete, setOpenDelete,
        selected, setSelected,
        data, isFetching,
        employees, createEmp, updateEmp, deleteEmp,
        handleSubmitEmployee, handleDelete
    }
}