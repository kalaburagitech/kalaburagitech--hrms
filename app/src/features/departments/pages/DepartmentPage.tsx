"use client";

import { useState } from "react";
import { useDepartments, useDepartmentActions } from "../services";
import { DepartmentTable } from "../components/DepartmentTable";
import { DepartmentForm } from "../components/DepartmentForm";
import { DeleteDepartmentDialog } from "../components/DeleteDepartmentDialog";
import { Department } from "../types";
import { DepartmentFormValues } from "../validators";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function DepartmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { results, status, loadMore } = useDepartments(searchTerm);
  const { createDepartment, updateDepartment, deleteDepartment } = useDepartmentActions();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deletingDepartment, setDeletingDepartment] = useState<Department | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handleOpenCreate = () => {
    setEditingDepartment(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (dept: Department) => {
    setDeletingDepartment(dept);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: DepartmentFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingDepartment) {
        await updateDepartment({ id: editingDepartment._id, ...data });
        toast.success("Department updated successfully");
      } else {
        await createDepartment(data);
        toast.success("Department created successfully");
      }
      setIsDialogOpen(false);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingDepartment) return;
    setIsSubmitting(true);
    try {
      await deleteDepartment({ id: deletingDepartment._id });
      toast.success("Department deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete department");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextPage = () => {
    if (status === "CanLoadMore") {
      loadMore(10);
      setPageIndex((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    setPageIndex((p) => Math.max(0, p - 1));
  };

  // Slice results based on pageIndex (since Convex paginate returns an accumulating array)
  const paginatedData = results.slice(pageIndex * 10, (pageIndex + 1) * 10);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Departments</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your organization&apos;s departments and structure.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
          <Plus className="h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="flex-1 rounded-3xl border border-white/5 bg-slate-900/50 p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageIndex(0); // Reset page on search
              }}
              className="pl-9 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <DepartmentTable
          data={paginatedData}
          isLoading={status === "LoadingFirstPage"}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasMore={status === "CanLoadMore" || (pageIndex + 1) * 10 < results.length}
          pageIndex={pageIndex}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 text-slate-100">
          <DialogHeader>
            <DialogTitle>
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </DialogTitle>
          </DialogHeader>
          <DepartmentForm
            initialValues={editingDepartment || undefined}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <DeleteDepartmentDialog
        department={deletingDepartment}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={isSubmitting}
      />
    </div>
  );
}
