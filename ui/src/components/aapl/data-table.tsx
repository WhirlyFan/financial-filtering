import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState, //HERE
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { DataTableFacetedFilter } from '@/components/reusable/faceted-filter';
import { DataTablePagination } from '@/components/reusable/pagination-controls';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDropDownValues } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // table: TanstackTable<TData>; //HERE
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  //STATES:
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //row selection
    onRowSelectionChange: setRowSelection,
    //sorting:
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
    //pagination:
    getPaginationRowModel: getPaginationRowModel(),
    //Order of columns
    onColumnOrderChange: setColumnOrder,

    //filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    //Faceted filters:
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),

    //Visibility:
    onColumnVisibilityChange: setColumnVisibility,

    //Control pagination. Default is 10
    initialState: {
      pagination: { pageSize: 5 },
    },

    //This can be added to insert custom functions, accessible :table.options.meta.methodName
    meta: {
      myOwnMethod: () => {
        console.log('Custom method');
      },
    },
  });

  //Used to show reset button
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <div className="flex justify-between py-4">
        <div className="flex gap-3">
          {/* Filters */}
          <div>
            {/* Change to Date Range Picker */}
            {table.getColumn('date') && (
              <DataTableFacetedFilter
                column={table.getColumn('date')}
                title="Date"
                options={getDropDownValues(data, 'date')}
              />
            )}
          </div>
          <div className="flex-col">
            {/* Change to select user-specified range */}
            {table.getColumn('revenue') && (
              <DataTableFacetedFilter
                column={table.getColumn('revenue')}
                title="Revenue"
                options={getDropDownValues(data, 'revenue')}
              />
            )}
          </div>
          <div className="flex-col">
            {/* Change to select user-specified range */}
            {table.getColumn('netIncome') && (
              <DataTableFacetedFilter
                column={table.getColumn('netIncome')}
                title="Net Income"
                options={getDropDownValues(data, 'netIncome')}
              />
            )}
          </div>

          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="w-40 p-2">
              Clear filters
            </Button>
          )}
        </div>

        <Button
          onClick={() => {
            table.resetRowSelection(), table.resetColumnFilters(), table.resetColumnVisibility();
            table.resetColumnOrder();
          }}
          variant="outline"
          className="text-red-800 border-red-800"
        >
          Reset table
        </Button>
      </div>

      {/* Column selection button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Select columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-3 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <Separator orientation="vertical" />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end pt-4">
        <DataTablePagination table={table}></DataTablePagination>
      </div>
    </div>
  );
}
