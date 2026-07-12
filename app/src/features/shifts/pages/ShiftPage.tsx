"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShifts, useShiftActions } from "../services";
import { ShiftTable } from "../components/ShiftTable";
import { ShiftForm } from "../components/ShiftForm";
import { DeleteShiftDialog } from "../components/DeleteShiftDialog";
import { Shift } from "../types";
import { useDebounce } from "@/hooks/use-debounce"; // Assuming this exists or falls back

export function ShiftPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce ? useDebounce(searchTerm, 500) : searchTerm; // Gracefully handle if useDebounce is not available
  
  const { shifts, isLoading, hasMore, loadMore, status } = useShifts(debouncedSearch);
  const { createShift, updateShift, deleteShift } = useShiftActions();

  // State for Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handleCreate = () => {
    setSelectedShift(null);
    setIsFormOpen(true);
  };

  const handleEdit = (shift: Shift) => {
    setSelectedShift(shift);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (shift: Shift) => {
    setSelectedShift(shift);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (selectedShift) {
      return await updateShift(selectedShift._id, data);
    } else {
      return await createShift(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedShift) return;
    
    setIsDeleting(true);
    const success = await deleteShift(selectedShift._id);
    setIsDeleting(false);
    
    if (success) {
      setIsDeleteDialogOpen(false);
      setSelectedShift(null);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      loadMore(10);
      setPageIndex(p => p + 1);
    }
  };

  const handlePrevPage = () => {
    setPageIndex(p => Math.max(0, p - 1));
  };

  // We have a flat list of results from usePaginatedQuery, so slice it for the current page
  const pageData = shifts.slice(pageIndex * 10, (pageIndex + 1) * 10);

  return (
    <div className="flex-1 space-y-6 p-8 min-h-screen bg-slate-950 text-slate-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Shifts</h2>
          <p className="text-slate-400 mt-1">
            Manage employee shifts and working hours
          </p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Shift
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-slate-900/50 p-1 rounded-lg border border-white/5 max-w-md">
        <Search className="w-5 h-5 ml-2 text-slate-400" />
        <Input
          placeholder="Search shifts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 text-slate-200 placeholder:text-slate-500"
        />
      </div>

      <ShiftTable
        data={pageData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        hasMore={hasMore || (shifts.length > (pageIndex + 1) * 10)}
        pageIndex={pageIndex}
      />

      {isFormOpen && (
        <ShiftForm
          shift={selectedShift}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteShiftDialog
          shift={selectedShift}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
