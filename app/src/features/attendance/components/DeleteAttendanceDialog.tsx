import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useAttendanceActions } from "../services";
import { Attendance } from "../types";
import { useState } from "react";

interface DeleteAttendanceDialogProps {
  attendance: Attendance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteAttendanceDialog({
  attendance,
  open,
  onOpenChange,
  onSuccess,
}: DeleteAttendanceDialogProps) {
  const { deleteAttendance } = useAttendanceActions();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!attendance) return;

    try {
      setIsDeleting(true);
      await deleteAttendance({ id: attendance._id });
      toast.success("Attendance record deleted successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete attendance record");
    } finally {
      setIsDeleting(false);
    }
  };

  const employeeName = attendance?.employee 
    ? `${attendance.employee.firstName} ${attendance.employee.lastName}`
    : "Unknown Employee";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-gray-800 bg-black sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">Delete Attendance Record</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Are you sure you want to delete the attendance record for{" "}
            <span className="font-semibold text-foreground">{employeeName}</span> on{" "}
            <span className="font-semibold text-foreground">{attendance?.date}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 border-t border-gray-800 pt-4">
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-gray-800 bg-transparent text-foreground hover:bg-gray-900"
          >
            Cancel
          </AlertDialogCancel>
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

