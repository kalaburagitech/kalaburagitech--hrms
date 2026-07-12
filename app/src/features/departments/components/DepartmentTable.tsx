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
import { Department } from "../types";
import { Edit2, Trash2 } from "lucide-react";

interface DepartmentTableProps {
  data: Department[];
  isLoading: boolean;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasMore: boolean;
  pageIndex: number;
}

export function DepartmentTable({ 
  data, 
  isLoading,
  onEdit,
  onDelete,
  onNextPage,
  onPrevPage,
  hasMore,
  pageIndex
}: DepartmentTableProps) {

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name",
      header: "Department Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("code") || '-'}</span>
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const desc = row.getValue("description") as string;
        return <span className="text-muted-foreground max-w-[200px] truncate block">{desc || '-'}</span>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize
            ${status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-muted-foreground'}
          `}>
            {status}
          </span>
        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => {
        const dateStr = row.getValue("createdAt") as string;
        return <span className="text-muted-foreground">{new Date(dateStr).toLocaleDateString()}</span>
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const dept = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(dept)}
              className="h-8 w-8 border-border bg-transparent hover:bg-accent hover:text-accent-foreground hover:text-foreground"
            >
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(dept)}
              className="h-8 w-8 border-border bg-transparent hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-400" />
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
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-card/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-muted-foreground font-medium">
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
                  className="border-border hover:bg-accent/50 transition-colors"
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
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p>No departments found.</p>
                    <p className="text-xs">Create a new department to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {data.length} results.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevPage}
            disabled={pageIndex === 0}
            className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!hasMore}
            className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

