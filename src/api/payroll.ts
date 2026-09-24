import { queryKeys } from "@/consts/queriesKeys"
import { CreatePayrollPayload, PayrollRecord, PayrollSummary, UpdatePayrollPayload } from "@/interfaces/payroll"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./global"
import httpService from "@/services/httpService"

const summaryPayroll = queryKeys.summaryPayroll
const recordPayroll = queryKeys.recordPayroll

export const useFetchSummaryPayroll = (month: string) => {
    return useQuery({
        queryKey: [summaryPayroll, month],
        queryFn: () => {
            return api<PayrollSummary[]>(httpService.get(`/api/payroll/summary?month=${month}`))
        }
    })
}
export const useFetchRecordPayroll = (month: string) => {
    return useQuery({
        queryKey: [recordPayroll, month],
        queryFn: () => api<PayrollRecord[]>(httpService.get(`/api/payroll?month=${month}`))
    })
}

export const useCreatePayroll = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreatePayrollPayload) => {
            return api<PayrollRecord>(httpService.post('/api/payroll/generate', payload))
        },
        onSuccess: (record) => {
            queryClient.setQueryData<PayrollRecord[]>([recordPayroll, record.month], (prev) =>
                prev ? [...prev, record] : [record]
            );
            queryClient.setQueryData<PayrollSummary[]>([summaryPayroll, record.month], (prev) =>
                prev?.map((pr) =>
                    pr.employeeId === record.employeeId
                        ? {
                            ...pr,
                            existingRecordId: record.id,
                            existingAdjustment: record.adjustment,
                            existingNote: record.note,
                            existingActualWorkDays: record.actualWorkDays,
                            existingTotalPay: record.totalPay,
                        }
                        : pr
                )
            );
            queryClient.invalidateQueries({
                queryKey: [recordPayroll]
            });
            queryClient.invalidateQueries({
                queryKey: [summaryPayroll]
            });
        },
        onError: (error) => {
            console.log(error.message)
        }
    })
}

export const useUpdatePayroll = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...body }: UpdatePayrollPayload) => {
            return api<PayrollRecord>(httpService.patch(`/api/payroll/${id}`, body))
        },
        onSuccess: (record) => {
            queryClient.setQueryData<PayrollRecord[]>([recordPayroll, record.month], (prev) =>
                prev?.map((pr) => (pr.id === record.id ? record : pr))
            );
            queryClient.setQueryData<PayrollSummary[]>([summaryPayroll, record.month], (prev) =>
                prev?.map((pr) =>
                    pr.existingRecordId === record.id
                        ? {
                            ...pr,
                            existingAdjustment: record.adjustment,
                            existingNote: record.note,
                            existingTotalPay: record.totalPay,
                        }
                        : pr
                )
            );
            queryClient.invalidateQueries({
                queryKey: [recordPayroll]
            });
            queryClient.invalidateQueries({
                queryKey: [summaryPayroll]
            });
        },
        onError: (error) => {
            console.log(error.message)
        }
    })
}
