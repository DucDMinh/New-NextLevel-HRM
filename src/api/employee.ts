import { useQuery } from "@tanstack/react-query"
import { api, queryKeys } from "./global"
import httpService from "@/services/httpService"
import { Employee } from "@/interfaces/employee"

export const useFetchEmpData = () => {
    return useQuery({
        queryKey: [queryKeys.employee],
        queryFn: () => api<Employee[]>(httpService.get('/api/employees'))
    })
}