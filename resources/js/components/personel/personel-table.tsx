import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DateRange, PersonnelTableProps } from '@/types';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PersonelFilters } from './personel-filters';
import { PersonelSearch } from './personel-search';

export function PersonelTable({ data }: PersonnelTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '',
        endDate: '',
    });
    const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);

    const departments = useMemo(() => {
        const deptSet = new Set<string>();
        data.forEach((item) => {
            if (item.departments) deptSet.add(item.departments);
        });
        return Array.from(deptSet);
    }, [data]);

    const formatDate = (dateString: string) => {
        try {
            const fixed = dateString.replace(/(\d{4}-\d{2}-\d{2}T)(\d{2})(\d{2})(\d{2})/, '$1$2:$3:$4').replace(/(\.\d{6})\d+$/, '$1Z');

            return format(new Date(fixed), 'dd/MM/yyyy');
        } catch (error) {
            console.error('Error formateando fecha:', dateString, error);
            return dateString;
        }
    };

    // Filtrar datos
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch =
                searchTerm === '' ||
                Object.entries(item).some(([key, value]) => {
                    // Saltar propiedades complejas
                    if (key === 'departments' || key === 'avatar') return false;

                    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
                });

            let matchesDate = true;
            try {
                if (dateRange.startDate && dateRange.endDate) {
                    const itemDate = new Date(item.created_at.replace(/(\d{4}-\d{2}-\d{2}T)(\d{2})(\d{2})(\d{2})/, '$1$2:$3:$4'));
                    const start = new Date(dateRange.startDate);
                    const end = new Date(dateRange.endDate);

                    matchesDate = itemDate >= start && itemDate <= end;
                }
            } catch (e) {
                console.error('Error filtrando por fecha:', e);
            }

            const matchesDepartment = selectedDepartment.length === 0 || (item.departments && selectedDepartment.includes(item.departments));

            return matchesSearch && matchesDate && matchesDepartment;
        });
    }, [data, searchTerm, dateRange, selectedDepartment]);

    return (
        <Card className="w-full">
            <CardHeader className="space-y-4">
                {/* Título */}
                <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Gestión de Personal</CardTitle>
                    <Link
                        href={route('personel.create')}
                        className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                    >
                        Agregar Personal
                    </Link>
                </div>

                {/* Filtros */}
                <div className="w-full flex-grow flex-nowrap items-center">
                    <PersonelFilters
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        department={departments}
                        selectedDepartment={selectedDepartment}
                        onDepartmentChange={(dept) =>
                            setSelectedDepartment((prev) => (prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]))
                        }
                    />
                </div>

                <div className="w-full">
                    <PersonelSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>
            </CardHeader>

            <CardContent className="w-full">
                <div className="p-t-1 w-full rounded-xl border p-2">
                    <Table className="border-separate border-spacing-y-6 border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Nombre</TableHead>

                                <TableHead>Departamento</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <TableRow key={item.id} className="rounded-xl border-b border-gray-800">
                                        <TableCell>{formatDate(item.created_at)}</TableCell>
                                        <TableCell>{item.dni}</TableCell>
                                        <TableCell className="font-medium">
                                            {item.first_name}
                                            {item.second_name && ` ${item.second_name}`}
                                            {` ${item.last_name}`}
                                            {item.second_last_name && ` ${item.second_last_name}`}
                                        </TableCell>

                                        <TableCell className="capitalize">{item.departments}</TableCell>
                                        <TableCell>{item.phone_number}</TableCell>
                                        <TableCell>
                                            <Link href={route('personel.show', { id: item.id })}>
                                                <Eye className="text-black-100 h-5 w-5 hover:text-[#1e9483]" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No se encontraron resultados
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
