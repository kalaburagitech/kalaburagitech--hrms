import { usePaginatedQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";

export function useShifts(searchTerm: string = "") {
  const {
    results,
    status,
    loadMore,
    isLoading
  } = usePaginatedQuery(
    api.shifts.getShifts,
    { search: searchTerm || undefined },
    { initialNumItems: 10 }
  );

  return {
    shifts: results,
    status,
    loadMore,
    isLoading,
    hasMore: status === "CanLoadMore"
  };
}

export function useShiftActions() {
  const createShift = useMutation(api.shifts.createShift);
  const updateShift = useMutation(api.shifts.updateShift);
  const deleteShift = useMutation(api.shifts.deleteShift);

  const handleCreate = async (data: any) => {
    try {
      await createShift(data);
      toast.success("Shift created successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to create shift");
      return false;
    }
  };

  const handleUpdate = async (id: Id<"shifts">, data: any) => {
    try {
      await updateShift({ id, ...data });
      toast.success("Shift updated successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to update shift");
      return false;
    }
  };

  const handleDelete = async (id: Id<"shifts">) => {
    try {
      await deleteShift({ id });
      toast.success("Shift deleted successfully");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to delete shift");
      return false;
    }
  };

  return {
    createShift: handleCreate,
    updateShift: handleUpdate,
    deleteShift: handleDelete,
  };
}
