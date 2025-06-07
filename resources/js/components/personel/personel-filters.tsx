import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';

interface DateFilterProps {
    label: string;
    date: string;
    onSelect: (date: string) => void;
}

export function DateFilter({ label, date, onSelect }: DateFilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-[180px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(new Date(date), 'dd/MM/yyyy') : label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={(date) => date && onSelect(date.toISOString())}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

interface DropdownFilterProps {
    label: string;
    options: string[];
    selected: string[];
    onSelect: (value: string) => void;
}

export function DropdownFilter({ label, options, selected, onSelect }: DropdownFilterProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start">
                    {selected.length > 0 ? `${selected.length} seleccionados` : label}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option}
                        onSelect={(e) => {
                            e.preventDefault();
                            onSelect(option);
                        }}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center">
                            <input type="checkbox" checked={selected.includes(option)} onChange={() => {}} className="mr-2 h-4 w-4" />
                            {option}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface PersonelFiltersProps {
    dateRange: { startDate: string; endDate: string };
    onDateRangeChange: (range: { startDate: string; endDate: string }) => void;
    position: string[];
    department: string[];
    selectedPosition: string[];
    selectedDepartment: string[];
    onPositionChange: (position: string) => void;
    onDepartmentChange: (departamento: string) => void;
}

export function PersonelFilters({
    dateRange,
    onDateRangeChange,
    position,
    department,
    selectedPosition,
    selectedDepartment,
    onPositionChange,
    onDepartmentChange,
}: PersonelFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Desde:</span>
                <DateFilter
                    label="Seleccionar fecha"
                    date={dateRange.startDate}
                    onSelect={(date) => onDateRangeChange({ ...dateRange, startDate: date })}
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Hasta:</span>
                <DateFilter
                    label="Seleccionar fecha"
                    date={dateRange.endDate}
                    onSelect={(date) => onDateRangeChange({ ...dateRange, endDate: date })}
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Cargo:</span>
                <DropdownFilter label="Todos los cargos" options={position} selected={selectedPosition} onSelect={onPositionChange} />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Equipo:</span>
                <DropdownFilter label="Todos los equipos" options={department} selected={selectedDepartment} onSelect={onDepartmentChange} />
            </div>
        </div>
    );
}
