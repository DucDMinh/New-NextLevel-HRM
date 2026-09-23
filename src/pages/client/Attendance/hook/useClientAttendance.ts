import { useFetchAttendanceData } from "@/api/attendance"
import { isToday } from "@/helpers/datetime"
import { useMemo } from "react"

export const useClientAttendance = () => {
    const { data, isLoading } = useFetchAttendanceData()
    const myAttendanceData = useMemo(() => data ? [...data].reverse() : [], [data])
    const todayRecord = useMemo(
        () => myAttendanceData.find((record) => isToday(record.checkIn)),
        [myAttendanceData],
    );
    const currentLogin = todayRecord && !todayRecord.checkOut ? todayRecord : undefined;
    return {
        myAttendanceData, currentLogin, todayRecord, isLoading
    }
}