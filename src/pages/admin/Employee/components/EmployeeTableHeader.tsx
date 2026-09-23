import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const EmployeeTableHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="w-28 text-right">Thao tác</TableHead>
            </TableRow>
        </TableHeader>
    )
}