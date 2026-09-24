import { useChangeSetting, useSetting } from "@/api/setting";
import { toast } from "@/components/ui/use-toast";

export const DEFAULT_STANDARD_WORK_DAYS = 26;

export const useStandardWorkDays = () => {
    const { data } = useSetting()
    const standardWorkDays = data?.standardWorkDays ?? DEFAULT_STANDARD_WORK_DAYS
    const changeSetting = useChangeSetting()

    const handleChangeStandardWorkDays = async (newStandardWorkDays: number) => {
        try {
            await changeSetting.mutateAsync(newStandardWorkDays)
            return true
        } catch (error: any) {
            toast(error.message)
            return false
        }
    }

    return {
        standardWorkDays,
        handleChangeStandardWorkDays,
        isSaving: changeSetting.isPending,
    }
}
