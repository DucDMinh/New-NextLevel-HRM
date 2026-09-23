import CommonIcons from "@/components/CommonIcons";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        <div className="relative w-full max-w-sm">
            <CommonIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                className="pl-9"
                placeholder="Tìm theo tên, tên đăng nhập, ngày..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
