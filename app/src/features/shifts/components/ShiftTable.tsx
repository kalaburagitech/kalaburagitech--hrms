"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
import { Shift } from "../types";
import { Edit2, Trash2 } from "lucide-react";

interface ShiftTableProps {
  data: Shift[];
  isLoading: boolean;
  onEdit: (shift: Shift) => void;
  onDelete: (shift: Shift) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasMore: boolean;
  pageIndex: number;
}

export function ShiftTable({ 
  data, 
  isLoading,
  onEdit,
  onDelete,
  onNextPage,
  onPrevPage,
  hasMore,
  pageIndex
}: ShiftTableProps) {

  const columns: ColumnDef<Shift>[] = [
    {
      accessorKey: "name",
      header: "Shift Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span className="text-slate-400">{row.getValue("code") || '-'}</span>
    },
    {
      id: "timing",
      header: "Timing",
      cell: ({ row }) => {
        const start = row.original.startTime;
        const end = row.original.endTime;
        return <span className="text-slate-300">{start} - {end}</span>
      }
    },
    {
      accessorKey: "weeklyOff",
      header: "Weekly Off",
      cell: ({ row }) => {
        const off = row.original.weeklyOff;
        return <span className="text-slate-400 max-w-[150px] truncate block">{off && off.length > 0 ? off.join(', ') : '-'}</span>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize
            ${status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}
          `}>
            {status}
          </span>
        );
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const shift = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(shift)}
              className="h-8 w-8 border-white/10 bg-transparent hover:bg-white/10 hover:text-white"
            >
              <Edit2 className="h-4 w-4 text-slate-300" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(shift)}
              className="h-8 w-8 border-white/10 bg-transparent hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-400" />
            </Button>
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading && data.length === 0) {
    return (
      <div className="flex h-[400px] flex-col space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 w-full animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/10 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-slate-400 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-white/10 hover:bg-white/5 transition-colors"
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
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p>No shifts found.</p>
                    <p className="text-xs">Create a new shift to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          Showing {data.length} results.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevPage}
            disabled={pageIndex === 0}
            className="border-white/10 bg-transparent text-white hover:bg-white/10"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!hasMore}
            className="border-white/10 bg-transparent text-white hover:bg-white/10"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
