import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PersonelSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export function PersonelSearch({ searchTerm, onSearchChange }: PersonelSearchProps) {
    return (
        <div className="[&_input]: relative w-full max-w-full rounded-xl bg-[#f0f2f5] text-[#8b8b8b] shadow-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
                type="text"
                placeholder="Buscar personal..."
                className="max-w-full border-none pl-10 text-gray-500"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}
