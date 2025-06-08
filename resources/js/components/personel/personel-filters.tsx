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
                <Button variant="outline" className={cn('w-[180px] justify-between text-left font-normal', !date && 'text-muted-foreground')}>
                    {date ? format(new Date(date), 'dd/MM/yyyy') : label}
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#cccccc]" />
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
                <Button variant="outline" className="w-[180px] justify-between">
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
        <div className="flex flex-wrap items-center gap-4 justify-between p-4 bg-white [&_button]:border-none [&_button]:shadow-none [&_button]:bg-transparent m-0">

            {/* <div className="flex items-center gap-2 border rounded-4xl bg-gray">
                <span className="text-muted-foreground text-sm ml-3 bg-gray">Desde:</span>
                <div className="rounded-4xl bg-gray">
                    <DateFilter
                        label="Seleccionar fecha"
                        date={dateRange.startDate}
                        onSelect={(date) => onDateRangeChange({ ...dateRange, startDate: date })}
                    />
                </div>
            </div> */}

            <div className="flex items-center gap-2 border rounded-xl bg-[#e2e2e3] border-none shadow-sm">
                <span className="text-sm ml-3 w-full h-full text-black font-medium mr-2">Desde:</span>
                <div className="[&_button]:border [&_button]:shadow-none [&_button]:bg-white [&_button]:border-gray-600">
                   <div className="dropdown-wrapper text-[#8b8b8b] bg-[#f0f2f5] rounded-r-xl">
                        <DateFilter
                        label="Seleccionar fecha"
                        date={dateRange.startDate}
                        onSelect={(date) => onDateRangeChange({ ...dateRange, startDate: date })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 border rounded-xl bg-[#e2e2e3] border-none shadow-sm">
                <span className="text-sm ml-3 w-full h-full text-black font-medium mr-2">Hasta:</span>
                <div className="dropdown-wrapper text-[#8b8b8b] bg-[#f0f2f5] rounded-r-xl">
                    <DateFilter
                        label="Seleccionar fecha"
                        date={dateRange.endDate}
                        onSelect={(date) => onDateRangeChange({ ...dateRange, endDate: date })}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 border rounded-xl bg-[#e2e2e3] border-none shadow-sm">
                <span className="text-sm ml-3 w-full h-full text-black font-medium mr-2">Cargo:</span>
                <div className="dropdown-wrapper text-[#8b8b8b] bg-[#f0f2f5] rounded-r-xl">
                    <DropdownFilter label="Todos los cargos" options={position} selected={selectedPosition} onSelect={onPositionChange} />
                </div>
            </div>

            <div className="flex items-center gap-2border rounded-xl bg-[#e2e2e3] border-none shadow-sm">
                <span className="text-sm ml-3 w-full h-full text-black font-medium mr-2">Equipo:</span>
                
                {/* <DropdownFilter label="Todos los equipos" options={department} selected={selectedDepartment} onSelect={onDepartmentChange} /> */}

                <div className="dropdown-wrapper text-[#8b8b8b] bg-[#f0f2f5] rounded-r-xl">
                    <DropdownFilter
                        label="Todos los equipos"
                        options={department}
                        selected={selectedDepartment}
                        onSelect={onDepartmentChange}
                    />
                </div>
            </div>
        </div>
    );
}
