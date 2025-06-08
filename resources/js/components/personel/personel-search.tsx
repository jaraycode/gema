import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PersonelSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export function PersonelSearch({ searchTerm, onSearchChange }: PersonelSearchProps) {
    return (
        <div className="relative w-full max-w-full  text-[#8b8b8b] bg-[#f0f2f5] rounded-xl shadow-xs [&_input]:">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
                type="text"
                placeholder="Buscar personal..."
                className="pl-10 text-gray-500 border-none max-w-full"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

