import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STATUS_ALL } from "@/consts/common";
import { Employee } from "@/interfaces/employee";

interface EmployeeFilterSelectProps {
    value: string;
    onChange: (value: string) => void;
    employees: Employee[];
    className?: string;
}

export const EmployeeFilterSelect = ({
    value,
    onChange,
    employees,
    className = "w-full sm:w-52",
}: EmployeeFilterSelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder="Tất cả nhân viên" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={STATUS_ALL}>Tất cả nhân viên</SelectItem>
                {employees.map((emp) => (
                    <SelectItem key={emp.id} value={`${emp.id}`}>
                        {emp.fullName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
