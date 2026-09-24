import { queryKeys } from "@/consts/queriesKeys"
import { Setting } from "@/interfaces/setting"
import httpService from "@/services/httpService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "./global"

const settingKey = queryKeys.setting

export const useSetting = () => {
    return useQuery({
        queryKey: [settingKey],
        queryFn: () => {
            return api<Setting>(httpService.get('/api/settings'))
        }
    })
}

export const useChangeSetting = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newStandardWorkDays: number) => {
            console.log(`newStandardWorkDays: ${newStandardWorkDays}`)
            return api<Setting>(httpService.put(`/api/settings`, { standardWorkDays: newStandardWorkDays }))
        },
        onSuccess: (record) => {
            queryClient.setQueryData([settingKey], record)
            queryClient.invalidateQueries({
                queryKey: [settingKey]
            })
            queryClient.invalidateQueries({
                queryKey: [queryKeys.summaryPayroll]
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}