"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePayrollActions } from "../services";
import { toast } from "sonner";
import { Payroll } from "../types";
import { useState } from "react";

interface DeletePayrollDialogProps {
  payroll: Payroll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePayrollDialog({
  payroll,
  open,
  onOpenChange,
}: DeletePayrollDialogProps) {
  const { deletePayroll } = usePayrollActions();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!payroll) return;
    
    setIsDeleting(true);
    try {
      await deletePayroll({ id: payroll._id });
      toast.success("Payroll record deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete payroll record");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background border-border text-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete the payroll
            record for {payroll?.employee?.firstName} {payroll?.employee?.lastName} (Month: {payroll?.month}/{payroll?.year}).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border hover:bg-accent hover:text-accent-foreground hover:text-foreground">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

