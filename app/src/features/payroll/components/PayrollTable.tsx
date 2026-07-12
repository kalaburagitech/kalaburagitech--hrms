"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Payroll } from "../types";

interface PayrollTableProps {
  data: Payroll[];
  isLoading: boolean;
  onEdit: (payroll: Payroll) => void;
  onDelete: (payroll: Payroll) => void;
}

export const columns = (onEdit: (payroll: Payroll) => void, onDelete: (payroll: Payroll) => void): ColumnDef<Payroll>[] => [
  {
    accessorKey: "employeeId",
    header: "Employee",
    cell: ({ row }) => {
      const emp = row.original.employee;
      return emp ? `${emp.firstName} ${emp.lastName}` : "Unknown";
    }
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => {
      const date = new Date();
      date.setMonth(row.original.month - 1);
      return date.toLocaleString('default', { month: 'short' });
    }
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "netSalary",
    header: "Net Salary",
    cell: ({ row }) => `$${row.original.netSalary.toLocaleString()}`
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize
          ${status === 'paid' ? 'bg-green-500/10 text-green-500' : ''}
          ${status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : ''}
          ${status === 'processing' ? 'bg-blue-500/10 text-blue-500' : ''}
          ${status === 'failed' ? 'bg-red-500/10 text-red-500' : ''}
        `}>
          {status}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(row.original)} className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground">
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(row.original)} className="border-border bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-500">
            Delete
          </Button>
        </div>
      );
    }
  }
];

export function PayrollTable({ data, isLoading, onEdit, onDelete }: PayrollTableProps) {
  const tableColumns = columns(onEdit, onDelete);
  
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex h-96 flex-col space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-muted-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-border hover:bg-accent/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No payroll records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:text-foreground"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:text-foreground"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

