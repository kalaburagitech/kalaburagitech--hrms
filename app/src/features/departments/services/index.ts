import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export function useDepartments(search?: string) {
  const queryFn = api?.departments?.getDepartments;
  
  // If API is not available, we return a mock structure that matches usePaginatedQuery
  // without actually calling the hook which would crash the application.
  if (!queryFn) {
    return {
      results: [],
      status: "Exhausted" as const,
      loadMore: () => {},
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePaginatedQuery(queryFn, { search }, { initialNumItems: 10 });
}

export function useDepartmentActions() {
  const createDepartment = useMutation(api.departments.createDepartment);
  const updateDepartment = useMutation(api.departments.updateDepartment);
  const deleteDepartment = useMutation(api.departments.deleteDepartment);

  return {
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
}
