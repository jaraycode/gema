'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { faChevronLeft, faChevronRight, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

export type Maintenance = {
    id: string;
    date: string;
    name: string;
};

export const columns: ColumnDef<Maintenance>[] = [
    {
        accessorKey: 'id',
        header: () => <div>ID equipo</div>,
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: () => <div>Nombre del equipo</div>,
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'date',
        header: () => <div>Fecha</div>,
        cell: ({ row }) => <div>{row.getValue('date')}</div>,
    },
];

export function MaintenanceTable({ data }: { data: Maintenance[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalFilterFn = (row: any, _columnId: string, filterValue: string) => {
        const search = filterValue.toLowerCase();
        return (
            row.getValue('id')?.toString().toLowerCase().includes(search) ||
            row.getValue('name')?.toLowerCase().includes(search) ||
            row.getValue('date')?.toLowerCase().includes(search)
        );
    };

    const table = useReactTable({
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
                pageSize: 5,
            },
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
            <div className="relative mb-4 w-full max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z" />
                        </svg>
            </span>            
            <input
                        type="text"
                        placeholder="Buscar Mantenimiento..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full rounded-full bg-gray-100 py-2 pr-4 pl-10 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
            </div>
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
                                        <TableCell className='py-5' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center" >
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
