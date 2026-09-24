import { queryKeys } from "@/consts/queriesKeys"
import { PayrollRecord, PayrollSummary } from "@/interfaces/payroll"
import { useQuery } from "@tanstack/react-query"
import { api } from "./global"
import httpService from "@/services/httpService"

const summaryPayroll = queryKeys.summaryPayroll
const recordPayroll = queryKeys.recordPayroll

export const useFetchSummaryPayroll = (month: string) => {
    return useQuery({
        queryKey: [summaryPayroll],
        queryFn: () => {
            return api<PayrollSummary[]>(httpService.get(`/api/payroll/summary?month=${month}`))
        }
    })
}
export const useFetchRecordPayroll = () => {
    return useQuery({
        queryKey: [recordPayroll],
        queryFn: () => api<PayrollRecord[]>(httpService.get('/api/payroll'))
    })
}