import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PersonelFilters } from './personel-filters';
import { PersonelSearch } from './personel-search';
import { DateRange, PersonelTableProps } from './types';

export function PersonelTable({ data }: PersonelTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '',
        endDate: '',
    });
    const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);

    // Extraer positions y departamentos únicos
    const positions = useMemo(() => Array.from(new Set(data.map((item) => item.position))), [data]);
    const departments = useMemo(() => Array.from(new Set(data.map((item) => item.department))), [data]);

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
                (new Date(item.date) >= new Date(dateRange.startDate) && new Date(item.date) <= new Date(dateRange.endDate));

            // Filtro por positions
            const matchesposition = selectedPosition.length === 0 || selectedPosition.includes(item.position);

            // Filtro por departamentos
            const matchesDepartamento = selectedDepartment.length === 0 || selectedDepartment.includes(item.department);

            return matchesSearch && matchesDate && matchesposition && matchesDepartamento;
        });
    }, [data, searchTerm, dateRange, selectedPosition, selectedDepartment]);

    return (
        <Card className="w-full">
            <CardHeader className="space-y-4">
                {/* Título */}
                <CardTitle className="text-2xl">Gestión de Personal</CardTitle>

                {/* Filtros */}
                <div className="flex-grow w-full flex-nowrap items-center justify-between">
                    <PersonelFilters
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        position={positions}
                        department={departments}
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
                <div className="w-full rounded-xl border p-2 p-t-1">
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
                                    <TableRow key={item.id} className="hover:bg-[#f0f2f5] rounded-xl border-b border-gray-800">
                                        <TableCell>{format(new Date(item.date), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell>{item.cedula}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="capitalize">{item.position}</TableCell>
                                        <TableCell className="capitalize">{item.department}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>
                                            <Eye className="h-5 w-5 text-black-100" />
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
