import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STATUS_ALL, STATUS_DONE, STATUS_WORKING } from "@/consts/common";

interface StatusFilterSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const StatusFilterSelect = ({ value, onChange }: StatusFilterSelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={STATUS_ALL}>Tất cả trạng thái</SelectItem>
                <SelectItem value={STATUS_WORKING}>Đang làm</SelectItem>
                <SelectItem value={STATUS_DONE}>Đã check-out</SelectItem>
            </SelectContent>
        </Select>
    )
}
