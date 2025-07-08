    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EquipmentModel } from '@/types';
import { faChevronLeft, faChevronRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
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

export const columns: ColumnDef<EquipmentModel>[] = [
    {
        accessorKey: 'code',
        header: () => <div>ID equipo</div>,
        cell: ({ row }) => <div>{row.getValue('code')}</div>,
    },
    {
        accessorKey: 'brand',
        header: () => <div>Marca</div>,
        cell: ({ row }) => <div>{row.getValue('brand')}</div>,
    },
    {
        accessorKey: 'model',
        header: () => <div>Modelo</div>,
        cell: ({ row }) => <div>{row.getValue('model')}</div>,
    },
    {
        accessorKey: 'serial',
        header: () => <div>Serial</div>,
        cell: ({ row }) => <div>{row.getValue('serial')}</div>,
    },
    {
        accessorKey: 'status',
        header: () => <div>Estado</div>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
    },
    {
        accessorKey: 'action',
        header: () => <div>Acciones</div>,
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Link href={route('equipment.edit', { id: row.getValue('code') })}>
                    <FontAwesomeIcon icon={faPen} />
                </Link>
                <Link href={route('equipment.destroy', { id: row.getValue('code') })} method="delete" className="hover:cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                </Link>
            </div>
        ),
    },
];

export function EquipmentTable({ data }: { data: EquipmentModel[] }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const globalFilterFn: FilterFnOption<EquipmentModel> = 'includesString';
    const table = useReactTable<EquipmentModel>({
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
        <Card className="w-full">
            <CardHeader className="space-y-4">
                <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Equipos</CardTitle>
                    <Link
                        href={route('equipment.create')}
                        className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                    >
                        Agregar Equipo
                    </Link>
                </div>
                <div className="mb-4 flex space-x-2">
                    <button className="btn h-8 w-40 rounded-[12px] bg-[#F0F2F5] transition-shadow hover:shadow-lg">
                        Todos
                    </button>
                    <button className="btn h-8 w-40 rounded-[12px] bg-[#F0F2F5] transition-shadow hover:shadow-lg">
                        Activados
                    </button>
                    <button className="btn h-8 w-40 rounded-[12px] bg-[#F0F2F5] transition-shadow hover:shadow-lg">
                        Inactivos
                    </button>
                    <button className="btn h-8 w-40 rounded-[12px] bg-[#F0F2F5] transition-shadow hover:shadow-lg">
                        Mantenimiento
                    </button>
                </div>
                <div className="relative mb-4 w-full max-w-full">
                    <input
                        type="text"
                        placeholder="Buscar Equipo"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full rounded-full bg-gray-100 py-2 pr-4 pl-10 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </CardHeader>
            <CardContent className="w-full">
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
            </CardContent>
            <div className="flex items-center justify-between py-6">
                <div className="text-muted-foreground text-sm">{table.getFilteredRowModel().rows.length} fila(s) mostradas.</div>
                <div className="space-x-2">
                    <div className="flex items-center gap-2">
                        <button className="btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-2 text-sm font-medium">{table.getState().pagination.pageIndex + 1}</span>
                        <button className="btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
