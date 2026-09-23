import { queryKeys } from "@/consts/queriesKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./global"
import { LeaveRequest, UpdateLeaveRequest } from "@/interfaces/leaveRequest"
import httpService from "@/services/httpService"

const leaveKey = queryKeys.leave_request

export const useFetchLeaveRequest = () => {
    return useQuery({
        queryKey: [leaveKey],
        queryFn: () => api<LeaveRequest[]>(httpService.get("/api/leave-requests"))
    })
}

export const useUpdateLeaveRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: UpdateLeaveRequest) => {
            const { id, status } = payload
            return api<LeaveRequest>(httpService.patch(`/api/leave-requests/${id}`, { status: status }))
        },
        onSuccess: (record) => {
            queryClient.setQueryData<LeaveRequest[]>([leaveKey], (prev) =>
                prev
                    ? prev.map((lr) => (lr.id === record.id ? record : lr))
                    : [record]
            );
            queryClient.invalidateQueries({
                queryKey: [leaveKey]
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}