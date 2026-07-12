"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

import { useAttendance } from "../services";
import { Attendance } from "../types";
import { AttendanceTable } from "../components/AttendanceTable";
import { AttendanceForm } from "../components/AttendanceForm";
import { DeleteAttendanceDialog } from "../components/DeleteAttendanceDialog";
import { Skeleton } from "../../../components/ui/skeleton";

export function AttendancePage() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Attendance | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<Attendance | null>(null);

  const { results: attendanceList, status, loadMore } = useAttendance(search);

  const handleEdit = (record: Attendance) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (record: Attendance) => {
    setRecordToDelete(record);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Attendance</h1>
          <p className="text-gray-400">Manage employee attendance and tracking.</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search by name or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-black border-gray-800 focus-visible:ring-1 focus-visible:ring-gray-700"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {status === "LoadingFirstPage" ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full bg-gray-800/50" />
            <Skeleton className="h-12 w-full bg-gray-800/50" />
            <Skeleton className="h-12 w-full bg-gray-800/50" />
          </div>
        ) : (
          <>
            <AttendanceTable
              data={attendanceList as Attendance[]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            
            {status === "CanLoadMore" && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => loadMore(10)}
                  className="border-gray-800 text-gray-300 hover:bg-gray-900"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="border-gray-800 bg-black sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedRecord ? "Edit Attendance Record" : "Mark Attendance"}
            </DialogTitle>
          </DialogHeader>
          <AttendanceForm
            initialData={selectedRecord}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>

      <DeleteAttendanceDialog
        attendance={recordToDelete}
        open={!!recordToDelete}
        onOpenChange={(open) => !open && setRecordToDelete(null)}
      />
    </div>
  );
}

