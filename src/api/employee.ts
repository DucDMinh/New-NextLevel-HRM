import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api, queryKeys } from "./global"
import httpService from "@/services/httpService"
import { Employee, EmployeeFormValues, UpdateEmployeePayload } from "@/interfaces/employee"

const empKey = queryKeys.employee

export const useFetchEmpData = () =>
    useQuery({
        queryKey: [empKey],
        queryFn: () => api<Employee[]>(httpService.get('/api/employees'))
    })


export const useCreateEmp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: EmployeeFormValues) => {
            return api<Employee[]>(httpService.post('/api/employees', formData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [empKey],
            });
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        }
    })
}

export const useUpdateEmp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateEmployeePayload) => {
            const { id, ...body } = payload;
            return api<Employee>(httpService.put(`/api/employees/${id}`, body));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [empKey] });
        },
    });
};

export const useDeleteEmp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => {
            return api<Employee>(httpService.delete(`/api/employees/${id}`));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [empKey] });
        },
    });
};