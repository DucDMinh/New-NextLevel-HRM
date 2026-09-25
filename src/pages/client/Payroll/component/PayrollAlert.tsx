import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const PayrollAlert = () => {
    return (
        <Alert variant='destructive'>
            <AlertTitle>
                *Lưu ý
            </AlertTitle>
            <AlertDescription>
                Chỉ xem được lương của bản thân, mọi thắc mắc liên quan đến lương xin vui lòng liên hệ qua kế toán hoặc HR theo SDT: 0000000
            </AlertDescription>
        </Alert>
    )
}