import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export function useAttendance(search?: string) {
  const queryFn = api?.attendance?.getAttendance;
  
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

export function useAttendanceActions() {
  const createAttendance = useMutation(api.attendance.createAttendance);
  const updateAttendance = useMutation(api.attendance.updateAttendance);
  const deleteAttendance = useMutation(api.attendance.deleteAttendance);

  return {
    createAttendance,
    updateAttendance,
    deleteAttendance,
  };
}
