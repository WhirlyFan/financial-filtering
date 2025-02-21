import { ColumnDef, FilterFn } from '@tanstack/react-table';
import {
  HiArrowsUpDown,
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle,
} from 'react-icons/hi2';
import { RiMore2Fill } from 'react-icons/ri';
import { Toast } from '@/components/reusable/Toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency, moveColumnsDown, moveColumnsUp } from '@/lib/utils';
import { AaplDataType } from '@/types/aapl';

const yearRangeFilter: FilterFn<AaplDataType> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.min || !filterValue.max) return true;
  const dateStr = row.getValue(columnId) as string;
  const rowYear = new Date(dateStr).getFullYear();

  return rowYear >= filterValue.min && rowYear <= filterValue.max;
};

export const columns: ColumnDef<AaplDataType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Date
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const { date } = row.original;
      return <div className="font-medium text-left ">{date}</div>;
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    filterFn: yearRangeFilter,
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Revenue
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    cell: ({ row }) => {
      const { revenue } = row.original;
      return <div className="font-medium text-left ">{formatCurrency(revenue)}</div>;
    },
  },
  {
    accessorKey: 'netIncome',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Net Income
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    cell: ({ row }) => {
      const { netIncome } = row.original;
      return <div className="font-medium text-left ">{formatCurrency(netIncome)}</div>;
    },
  },
  {
    accessorKey: 'grossProfit',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Gross Profit
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    cell: ({ row }) => {
      const { grossProfit } = row.original;
      return <div className="font-medium text-left ">{formatCurrency(grossProfit)}</div>;
    },
  },
  {
    accessorKey: 'eps',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          {'EPS'}
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
  },
  {
    accessorKey: 'operatingIncome',
    header: ({ column }) => {
      return (
        <div className="flex justify-between py-2 text-left">
          Operating Income
          <HiArrowsUpDown
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        </div>
      );
    },
    footer: ({ column, table }) => {
      return (
        <div className="flex flex-row gap-4">
          <HiOutlineArrowLeftCircle
            className="w-4 h-4 ml-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsUp(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowLeftCircle>
          <HiOutlineArrowRightCircle
            className="w-4 h-4 mr-2 cursor-pointer"
            onClick={() =>
              table.setColumnOrder(moveColumnsDown(table.getAllLeafColumns(), column.id))
            }
          ></HiOutlineArrowRightCircle>
        </div>
      );
    },
    cell: ({ row }) => {
      const { operatingIncome } = row.original;
      return <div className="font-medium text-left ">{formatCurrency(operatingIncome)}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const incomeStatement = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <RiMore2Fill />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(JSON.stringify(incomeStatement))}
            >
              <Toast
                buttonText={'Copy Income Statement JSON'}
                description={'Income Statement JSON copied to clipboard'}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Income Statement {'(Placeholder)'}</DropdownMenuItem>
            <DropdownMenuItem>Edit {'(Placeholder)'}</DropdownMenuItem>
            <DropdownMenuItem>Delete {'(Placeholder)'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // ...
];
