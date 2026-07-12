import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export function usePayroll(search?: string) {
  const queryFn = api?.payroll?.get;
  
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

export function usePayrollActions() {
  const createPayroll = useMutation(api.payroll.create);
  const updatePayroll = useMutation(api.payroll.update);
  const deletePayroll = useMutation(api.payroll.remove);
  const bulkDeletePayroll = useMutation(api.payroll.bulkRemove);

  return {
    createPayroll,
    updatePayroll,
    deletePayroll,
    bulkDeletePayroll,
  };
}
