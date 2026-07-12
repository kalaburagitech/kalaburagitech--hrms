import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export function useEmployees(search?: string) {
  const queryFn = api?.employees?.get;
  
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

export function useEmployeeActions() {
  const createEmployee = useMutation(api.employees.create);
  const updateEmployee = useMutation(api.employees.update);
  const deleteEmployee = useMutation(api.employees.remove);
  const bulkDeleteEmployees = useMutation(api.employees.bulkRemove);

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    bulkDeleteEmployees,
  };
}
