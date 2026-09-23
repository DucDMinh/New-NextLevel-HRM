import { useQuery } from "@tanstack/react-query"
import { api } from "./global"
import { User } from "@/interfaces/common"
import httpService from "@/services/httpService"
import { queryKeys } from "@/consts/queriesKeys"

export const useMe = (enabled = true) => {
    return useQuery({
        queryKey: [queryKeys.me],
        queryFn: () => api<User>(httpService.get('/api/me')),
        enabled,
        retry: false,
        staleTime: Infinity,
    })
}
