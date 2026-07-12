"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Announcement } from "../types";
import { AnnouncementDialogs } from "./AnnouncementDialogs";
import { DeleteAnnouncementDialog } from "./DeleteAnnouncementDialog";
import { useState } from "react";

interface AnnouncementTableProps {
  data: Announcement[];
  isLoading: boolean;
  loadMore?: () => void;
  status?: "CanLoadMore" | "LoadingMore" | "Exhausted";
}

export function AnnouncementTable({ data, isLoading, loadMore, status }: AnnouncementTableProps) {
  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium text-white">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        return (
          <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize
            ${priority === 'low' ? 'bg-slate-500/10 text-slate-400' : ''}
            ${priority === 'medium' ? 'bg-orange-500/10 text-orange-500' : ''}
            ${priority === 'high' ? 'bg-red-500/10 text-red-500' : ''}
          `}>
            {priority}
          </span>
        );
      }
    },
    {
      accessorKey: "publishDate",
      header: "Publish Date",
      cell: ({ row }) => {
        const date = row.getValue("publishDate") as string;
        return <div className="text-slate-400">{date}</div>;
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusVal = row.getValue("status") as string;
        return (
          <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize
            ${statusVal === 'published' ? 'bg-green-500/10 text-green-500' : ''}
            ${statusVal === 'draft' ? 'bg-yellow-500/10 text-yellow-500' : ''}
            ${statusVal === 'archived' ? 'bg-slate-500/10 text-slate-500' : ''}
          `}>
            {statusVal}
          </span>
        );
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const announcement = row.original;
        // We use state to trigger the appropriate dialog
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isEditOpen, setIsEditOpen] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isDeleteOpen, setIsDeleteOpen] = useState(false);

        return (
          <div className="flex justify-end">
            <AnnouncementDialogs mode="edit" announcement={announcement}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </AnnouncementDialogs>
            
            <DeleteAnnouncementDialog id={announcement._id}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </DeleteAnnouncementDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      }
    }
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
      <div className="rounded-md border border-white/10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/10 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-slate-400">
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
                  className="border-white/10 hover:bg-white/5"
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
                  className="h-24 text-center text-slate-400"
                >
                  No announcements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          {status === "LoadingMore" ? "Loading more..." : ""}
        </div>
        <div className="flex items-center space-x-2">
          {status === "CanLoadMore" && loadMore && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadMore()}
              className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Load More from Server
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
