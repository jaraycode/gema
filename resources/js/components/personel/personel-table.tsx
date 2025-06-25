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
    const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);

    // Extraer positions y departamentos únicos
    // const positions = useMemo(() => Array.from(new Set(data.map((item) => item.position))), [data]);
    const departments = useMemo(() => data.map((value) => value.department), [data]);

    // Función para filtrar los datos
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Filtro por búsqueda
            const matchesSearch =
                searchTerm === '' || Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));

            // Filtro por rango de fechas
            const matchesDate =
                !dateRange.startDate ||
                !dateRange.endDate ||
                (new Date(item.created_at) >= new Date(dateRange.startDate) && new Date(item.created_at) <= new Date(dateRange.endDate));

            // Filtro por positions
            const matchesposition = selectedPosition.length === 0 || selectedPosition.includes('Jefe');

            // Filtro por departamentos
            const matchesDepartamento = selectedDepartment.length === 0 || selectedDepartment.includes(item.department.map((value) => value.name));

            return matchesSearch && matchesDate && matchesposition && matchesDepartamento;
        });
    }, [data, searchTerm, dateRange, selectedPosition, selectedDepartment]);

    return (
        <Card className="w-full">
            <CardHeader className="space-y-4">
                {/* Título */}
                <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Gestión de Personal</CardTitle>
                    <Link
                        href="/personel/create"
                        className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                    >
                        Agregar Personal
                    </Link>
                </div>

                {/* Filtros */}
                <div className="w-full flex-grow flex-nowrap items-center justify-between">
                    <PersonelFilters
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        department={departments.flat()}
                        selectedPosition={selectedPosition}
                        selectedDepartment={selectedDepartment}
                        onPositionChange={(position) =>
                            setSelectedPosition((prev) => (prev.includes(position) ? prev.filter((c) => c !== position) : [...prev, position]))
                        }
                        onDepartmentChange={(departamento) =>
                            setSelectedDepartment((prev) =>
                                prev.includes(departamento) ? prev.filter((d) => d !== departamento) : [...prev, departamento],
                            )
                        }
                    />
                </div>

                {/* Barra de búsqueda */}
                <div className="w-full">
                    <PersonelSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>
            </CardHeader>

            {/* Tabla */}
            <CardContent className="w-full">
                <div className="p-t-1 w-full rounded-xl border p-2">
                    <Table className="border-separate border-spacing-y-6 border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Departamento</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <TableRow key={item.id} className="rounded-xl border-b border-gray-800 hover:bg-[#f0f2f5]">
                                        <TableCell>{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell className="font-medium">{`${item.first_name} ${item.last_name}`}</TableCell>
                                        <TableCell className="capitalize">{item.department.map((value) => value.name)}</TableCell>
                                        <TableCell>{item.phone_number}</TableCell>
                                        <TableCell>
                                            <Eye className="text-black-100 h-5 w-5" />
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
