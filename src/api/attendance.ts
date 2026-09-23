import { useQuery } from "@tanstack/react-query"
import { api } from "./global"
import httpService from "@/services/httpService"
import { Attendance } from "@/interfaces/attendance"
import { queryKeys } from "@/consts/queriesKeys"

export const useFetchAttendanceData = () => {
    return useQuery({
        queryKey: [queryKeys.attendance],
        queryFn: () => api<Attendance[]>(httpService.get('/api/attendance')),
    })
}
