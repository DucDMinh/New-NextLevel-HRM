import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STATUS_ALL } from "@/consts/common";

interface LeaveStatusFilterSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const LeaveStatusFilterSelect = ({ value, onChange }: LeaveStatusFilterSelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={STATUS_ALL}>Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Đã từ chối</SelectItem>
            </SelectContent>
        </Select>
    )
}
