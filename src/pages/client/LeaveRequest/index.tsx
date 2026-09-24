import PageWrapper from "@/components/PageWrapper";
import { LeaveRequestHeader } from "./component/LeaveRequestHeader";
import { LeaveBalanceCards } from "./component/LeaveBalanceCards";
import { DialogLeaveRequestForm } from "./component/DialogLeaveRequestForm";
import { MyLeaveRequestTable } from "./component/MyLeaveRequestTable";
import { useClientLeaveRequest } from "./hook/useClientLeaveRequest";

const LeaveRequestPage = () => {

    const {
        openForm, setOpenForm,
        myLeaveRequests, leaveBalance
    } = useClientLeaveRequest()

    return (
        <PageWrapper>
            <div className="component:LeaveRequest flex flex-col gap-6">
                <LeaveRequestHeader onCreate={() => setOpenForm(true)} />
                <LeaveBalanceCards
                    {...leaveBalance}
                />
                <div>
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                        Đơn nghỉ phép của tôi
                    </p>
                    <MyLeaveRequestTable
                        data={myLeaveRequests}
                        onCancel={() => { }}
                    />
                </div>
            </div>
            <DialogLeaveRequestForm
                isOpen={openForm}
                toggle={() => setOpenForm((prev) => !prev)}
                onSubmit={() => setOpenForm(false)}
            />
        </PageWrapper>
    );
};

export default LeaveRequestPage;
