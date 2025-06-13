import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedData } from '@/types';
import { faChevronLeft, faChevronRight, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFnOption,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'id',
        header: () => <div>ID ubicación</div>,
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: () => <div>Nombre de la ubicación</div>,
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'type',
        header: () => <div>Tipo</div>,
        cell: ({ row }) => <div>{row.getValue('type')}</div>,
    },
    {
        accessorKey: 'state',
        header: () => <div>Estado</div>,
        cell: ({ row }) => <div>{row.getValue('state')}</div>,
    },
];

export function EquipmentTable({ data }: PaginatedData<any>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const globalFilterFn: FilterFnOption<any> = 'includesString';
    const table = useReactTable<any>({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-lg font-semibold mb-2">Equipos</h2>

                <a className="flex w-48 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]" href={route('equipment.create')}>
                    Agregar Equipo
                </a>

            </div>
            <div className="flex space-x-2 mb-4">
                <button className="btn bg-[#F0F2F5] rounded-[12px] w-40 h-8 hover:shadow-lg transition-shadow" onClick={() => {/* lógica para filtrar todos */}}>Todos</button>
                <button className="btn bg-[#F0F2F5] rounded-[12px] w-40 h-8 hover:shadow-lg transition-shadow" onClick={() => {/* lógica para filtrar activados */}}>Activados</button>
                <button className="btn bg-[#F0F2F5] rounded-[12px] w-40 h-8 hover:shadow-lg transition-shadow" onClick={() => {/* lógica para filtrar inactivos */}}>Inactivos</button>
                <button className="btn bg-[#F0F2F5] rounded-[12px] w-40 h-8 hover:shadow-lg transition-shadow" onClick={() => {/* lógica para filtrar mantenimiento */}}>Mantenimiento</button>
            </div>
            <div className="relative w-full max-w-md mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z" />
                </svg>
            </span>
            <input
                type="text"
                placeholder="Buscar Equipo"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sin resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className="text-muted-foreground text-sm">{table.getFilteredRowModel().rows.length} fila(s) mostradas.</div>
                <div className="space-x-2">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>

                        <span className="px-2 text-sm font-medium">{table.getState().pagination.pageIndex + 1}</span>

                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
