import { Id } from "../../../../../convex/_generated/dataModel";

export interface Announcement {
  _id: Id<"announcements">;
  _creationTime: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  publishDate: string;
  expiryDate?: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}
