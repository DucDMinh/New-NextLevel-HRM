import { useMemo, useState } from "react"
import moment from "moment"
import { useFetchRecordPayroll } from "@/api/payroll"
import { useMe } from "@/api/me"

export const useClientPayroll = () => {
    const [month, setMonth] = useState(() => moment().format("YYYY-MM"))
    const { data, isLoading } = useFetchRecordPayroll(month)
    const { data: me } = useMe()
    const myPayroll = useMemo(() => data?.[0] ?? null, [data])

    return {
        month, setMonth,
        myPayroll,
        employeeName: me?.fullName ?? "",
        isLoading,
    }
}
