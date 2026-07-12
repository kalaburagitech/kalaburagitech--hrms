import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export function useAnnouncements(searchQuery?: string) {
  const queryFn = api.announcements.getAnnouncements;
  
  if (!queryFn) {
    return {
      results: [],
      status: "Exhausted" as const,
      loadMore: () => {},
    };
  }

  return usePaginatedQuery(queryFn, { searchQuery }, { initialNumItems: 10 });
}

export function useAnnouncementActions() {
  const createAnnouncement = useMutation(api.announcements.createAnnouncement);
  const updateAnnouncement = useMutation(api.announcements.updateAnnouncement);
  const deleteAnnouncement = useMutation(api.announcements.deleteAnnouncement);

  return {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  };
}
