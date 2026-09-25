import PageWrapper from "@/components/PageWrapper"
import { PayrollHeader } from "./component/PayrollHeader"
import { PayrollDetail } from "./component/PayrollDetail"
import { PayrollSummary } from "./component/PayrollSummary"
import { PayrollEmpty } from "./component/PayrollEmpty"
import { PayrollAlert } from "./component/PayrollAlert"
import { useClientPayroll } from "./hook/useClientPayroll"

const PayrollPage = () => {
    const { month, setMonth, myPayroll, employeeName, isLoading } = useClientPayroll()

    return (
        <PageWrapper isFetching={isLoading}>
            <div className="component:Payroll flex flex-col gap-6">
                <PayrollHeader month={month} onMonthChange={setMonth} />

                {myPayroll ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <PayrollDetail payroll={myPayroll} />
                        <PayrollSummary payroll={myPayroll} employeeName={employeeName} />
                    </div>
                ) : (
                    <PayrollEmpty month={month} />
                )}
                <PayrollAlert />
            </div>
        </PageWrapper>
    )
}

export default PayrollPage
