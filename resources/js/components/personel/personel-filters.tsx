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
            <PopoverContent className="w-auto bg-white p-0">
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
    department: string[]; // Cambiado a array de strings
    selectedDepartment: string[];
    onDepartmentChange: (departamento: string) => void;
}

export function PersonelFilters({ dateRange, onDateRangeChange, department, selectedDepartment, onDepartmentChange }: PersonelFiltersProps) {
    return (
        <div className="m-0 flex flex-wrap items-center gap-4 bg-white p-4 [&_button]:border-none [&_button]:bg-transparent [&_button]:shadow-none">
            {/* Filtro de fecha desde */}
            <div className="flex items-center gap-2 rounded-xl border border-none bg-[#e2e2e3] shadow-sm">
                <span className="mr-2 ml-3 h-full w-full text-sm font-medium text-black">Desde:</span>
                <div className="[&_button]:border [&_button]:border-gray-600 [&_button]:bg-white [&_button]:shadow-none">
                    <div className="dropdown-wrapper rounded-r-xl bg-[#f0f2f5] text-[#8b8b8b]">
                        <DateFilter
                            label="Seleccionar fecha"
                            date={dateRange.startDate}
                            onSelect={(date) => onDateRangeChange({ ...dateRange, startDate: date })}
                        />
                    </div>
                </div>
            </div>

            {/* Filtro de fecha hasta */}
            <div className="flex items-center gap-2 rounded-xl border border-none bg-[#e2e2e3] shadow-sm">
                <span className="mr-2 ml-3 h-full w-full text-sm font-medium text-black">Hasta:</span>
                <div className="dropdown-wrapper rounded-r-xl bg-[#f0f2f5] text-[#8b8b8b]">
                    <DateFilter
                        label="Seleccionar fecha"
                        date={dateRange.endDate}
                        onSelect={(date) => onDateRangeChange({ ...dateRange, endDate: date })}
                    />
                </div>
            </div>

            {/* Filtro por departamento (equipo) */}
            <div className="gap-2border flex items-center rounded-xl border-none bg-[#e2e2e3] shadow-sm">
                <span className="mr-2 ml-3 h-full w-full text-sm font-medium text-black">Departamento:</span>
                <div className="dropdown-wrapper rounded-r-xl bg-[#f0f2f5] text-[#8b8b8b]">
                    <DropdownFilter
                        label="Todos los Departamentos"
                        options={department}
                        selected={selectedDepartment}
                        onSelect={onDepartmentChange}
                    />
                </div>
            </div>
        </div>
    );
}
