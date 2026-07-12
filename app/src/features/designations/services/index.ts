import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";

export const useDesignations = (searchTerm: string) => {
  const {
    results,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(
    api.designations.getDesignations,
    { searchTerm: searchTerm || undefined },
    { initialNumItems: 10 }
  );

  return {
    designations: results,
    status,
    loadMore,
    isLoading,
  };
};

export const useDesignationActions = () => {
  const createDesignation = useMutation(api.designations.createDesignation);
  const updateDesignation = useMutation(api.designations.updateDesignation);
  const deleteDesignation = useMutation(api.designations.deleteDesignation);

  const create = async (data: any) => {
    try {
      await createDesignation(data);
      toast.success("Designation created successfully");
    } catch (error) {
      toast.error("Failed to create designation");
      throw error;
    }
  };

  const update = async (data: any) => {
    try {
      await updateDesignation(data);
      toast.success("Designation updated successfully");
    } catch (error) {
      toast.error("Failed to update designation");
      throw error;
    }
  };

  const remove = async (id: Id<"designations">) => {
    try {
      await deleteDesignation({ id });
      toast.success("Designation deleted successfully");
    } catch (error) {
      toast.error("Failed to delete designation");
      throw error;
    }
  };

  return { create, update, remove };
};
