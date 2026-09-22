import { useQuery } from "@tanstack/react-query"
import { api, queryKeys } from "./global"
import { User } from "@/interfaces/common"
import httpService from "@/services/httpService"

export const useMe = (enabled = true) => {
    return useQuery({
        queryKey: [queryKeys.me],
        queryFn: () => api<User>(httpService.get('/api/me')),
        enabled,
        retry: false,
        staleTime: Infinity,
    })
}
