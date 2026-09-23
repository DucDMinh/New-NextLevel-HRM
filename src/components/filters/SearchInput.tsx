import CommonIcons from "@/components/CommonIcons";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export const SearchInput = ({
    value,
    onChange,
    placeholder = "Tìm kiếm...",
    className = "w-full max-w-sm",
}: SearchInputProps) => {
    return (
        <div className={`relative ${className}`}>
            <CommonIcons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                className="pl-9"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
