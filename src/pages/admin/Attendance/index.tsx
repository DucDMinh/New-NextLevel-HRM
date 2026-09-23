import PageWrapper from "@/components/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SkeletonAttendance } from "./component/SkeletonAttendance";
import { AttendanceTableBody } from "./component/AttendanceTableBody";
import { AttendanceHeader } from "./component/AttendanceHeader";
import { SearchInput } from "./component/SearchInput";
import { EmployeeFilterSelect } from "./component/EmployeeFilterSelect";
import { StatusFilterSelect } from "./component/StatusFilterSelect";
import { useAttendance } from "./hook/useAttendance";

const AttendancePage = () => {
    const {
        search, setSearch,
        employeeFilter, setEmployeeFilter,
        statusFilter, setStatusFilter,
        employees, employeeMap,
        filteredAttendances,
        getWorkedDuration,
        isFetching
    } = useAttendance()

    if (isFetching) {
        return (
            <SkeletonAttendance />
        );
    }

    return (
        <PageWrapper>
            <div className="component:Attendance flex flex-col gap-6">
                <AttendanceHeader />

                <div className="flex flex-wrap items-center gap-3">
                    <SearchInput value={search} onChange={setSearch} />

                    <EmployeeFilterSelect
                        value={employeeFilter}
                        onChange={setEmployeeFilter}
                        employees={employees}
                    />

                    <StatusFilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />

                    <span className="ml-auto text-sm text-muted-foreground">
                        Tổng: <b className="text-foreground">{filteredAttendances.length}</b> bản ghi
                    </span>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">#</TableHead>
                                    <TableHead>Nhân viên</TableHead>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Giờ vào</TableHead>
                                    <TableHead>Giờ ra</TableHead>
                                    <TableHead>Thời gian làm</TableHead>
                                    <TableHead className="text-right">Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <AttendanceTableBody
                                filteredAttendances={filteredAttendances}
                                employeeMap={employeeMap}
                                getWorkedDuration={getWorkedDuration}
                            />
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
};

export default AttendancePage;
