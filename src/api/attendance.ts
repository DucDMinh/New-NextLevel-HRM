import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./global"
import httpService from "@/services/httpService"
import { Attendance } from "@/interfaces/attendance"
import { queryKeys } from "@/consts/queriesKeys"

const attKey = queryKeys.attendance

export const useFetchAttendanceData = () => {
    return useQuery({
        queryKey: [attKey],
        queryFn: () => api<Attendance[]>(httpService.get('/api/attendance')),
    })
}

export const useCheckIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            return api<Attendance>(httpService.post('/api/attendance/check-in'))
        },
        onSuccess: (record) => {
            queryClient.setQueryData<Attendance[]>([attKey], (prev) =>
                prev ? [...prev, record] : [record]
            );
            queryClient.invalidateQueries({
                queryKey: [attKey],
            });
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        }
    })
}
export const useCheckOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            return api<Attendance>(httpService.post('/api/attendance/check-out'))
        },
        onSuccess: (record) => {
            queryClient.setQueryData<Attendance[]>([attKey], (prev) =>
                prev
                    ? prev.map((att) => (att.id === record.id ? record : att))
                    : [record]
            );
            queryClient.invalidateQueries({
                queryKey: [attKey],
            });
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        }
    })
}
