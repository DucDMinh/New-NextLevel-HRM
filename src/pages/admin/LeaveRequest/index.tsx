import PageWrapper from "@/components/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SearchInput } from "@/components/filters/SearchInput";
import { EmployeeFilterSelect } from "@/components/filters/EmployeeFilterSelect";
import { LeaveRequestHeader } from "./component/LeaveRequestHeader";
import { LeaveStatusFilterSelect } from "./component/LeaveStatusFilterSelect";
import { LeaveRequestTableBody } from "./component/LeaveRequestTableBody";
import { useLeaveRequest } from "./hook/useLeaveRequest";

const LeaveRequestPage = () => {
    const {
        search, setSearch,
        employeeFilter, setEmployeeFilter,
        statusFilter, setStatusFilter,
        employees, employeeMap,
        filteredLeaveRequests,
        handleAction, updatingId, isFetching
    } = useLeaveRequest();

    return (
        <PageWrapper isFetching={isFetching}>
            <div className="component:LeaveRequest flex flex-col gap-6">
                <LeaveRequestHeader />
                <div className="flex flex-wrap items-center gap-3">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Tìm theo tên, tên đăng nhập, lý do..."
                    />

                    <EmployeeFilterSelect
                        value={employeeFilter}
                        onChange={setEmployeeFilter}
                        employees={employees}
                    />

                    <LeaveStatusFilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />

                    <span className="ml-auto text-sm text-muted-foreground">
                        Tổng: <b className="text-foreground">{filteredLeaveRequests.length}</b> đơn
                    </span>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Nhân viên</TableHead>
                                    <TableHead>Từ ngày</TableHead>
                                    <TableHead>Đến ngày</TableHead>
                                    <TableHead>Số ngày</TableHead>
                                    <TableHead>Lý do</TableHead>
                                    <TableHead>Ngày tạo</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead className="text-right">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <LeaveRequestTableBody
                                filteredLeaveRequests={filteredLeaveRequests}
                                employeeMap={employeeMap}
                                handleAction={handleAction}
                                updatingId={updatingId}
                            />
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default LeaveRequestPage;
