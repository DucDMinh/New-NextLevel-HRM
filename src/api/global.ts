import { AxiosResponse } from "axios"
import { toast } from "react-toastify";

export const api = async <T,>(call: Promise<AxiosResponse<T>>): Promise<T> => {
    try {
        const response = await call;
        return response.data;
    } catch (error: any) {
        if (error?.response?.status !== 401) {
            toast.error(error?.response?.data?.message ?? error?.message ?? "Request failed");
        }
        throw error;
    }
}

export const queryKeys = {
    employee: 'employee',
    me: 'me'
}
