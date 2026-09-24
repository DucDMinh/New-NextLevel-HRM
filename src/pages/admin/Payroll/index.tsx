import PageWrapper from "@/components/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayrollHeader } from "./component/PayrollHeader";
import { PayrollStatsCards } from "./component/PayrollStatsCards";
import { PayrollSummaryTableBody } from "./component/PayrollSummaryTableBody";
import { PayrollRecordTable } from "./component/PayrollRecordTable";
import { DialogPayrollForm } from "./component/DialogPayrollForm";
import { usePayroll } from "./hook/usePayroll";

const PayrollPage = () => {
    const {
        month, setMonth,
        payrollSummary, payrollRecords,
        drafts,
        openDialog, setOpenDialog, dialogMode, selectedPayroll,
        handleOpenDialog, handleSubmitPayroll,
    } = usePayroll()
    const summaryMap = new Map(payrollSummary.map((p) => [p.employeeId, p]));

    return (
        <PageWrapper>
            <div className="component:Payroll flex flex-col gap-6">
                <PayrollHeader month={month} onMonthChange={setMonth} />

                <PayrollStatsCards
                    standardWorkDays={payrollSummary[0]?.standardWorkDays ?? 26}
                    total={payrollSummary.length}
                    meetsCount={payrollSummary.filter((p) => p.meetsRequirement).length}
                    missingCount={payrollSummary.filter((p) => !p.meetsRequirement).length}
                    finalizedCount={payrollSummary.filter((p) => p.existingRecordId !== null).length}
                />

                <Tabs defaultValue="summary" className="flex flex-col gap-3">
                    <TabsList className="w-fit">
                        <TabsTrigger value="summary">Lương chưa chốt</TabsTrigger>
                        <TabsTrigger value="records">Lương đã chốt</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="mt-0">
                        <PayrollSummaryTableBody
                            data={payrollSummary}
                            drafts={drafts}
                            onOpenDialog={handleOpenDialog}
                        />
                    </TabsContent>

                    <TabsContent value="records" className="mt-0">
                        <PayrollRecordTable
                            data={payrollRecords}
                            summaryMap={summaryMap}
                            onOpenDialog={handleOpenDialog}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            <DialogPayrollForm
                key={`${dialogMode}-${selectedPayroll?.employeeId}`}
                isOpen={openDialog}
                toggle={() => setOpenDialog((prev) => !prev)}
                mode={dialogMode}
                payroll={selectedPayroll}
                draft={selectedPayroll ? drafts[selectedPayroll.employeeId] : undefined}
                onSubmit={handleSubmitPayroll}
            />
        </PageWrapper>
    );
};

export default PayrollPage;
