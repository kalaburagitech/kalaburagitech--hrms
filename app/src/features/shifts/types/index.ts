import { Id } from "../../../../../convex/_generated/dataModel";

export interface Shift {
  _id: Id<"shifts">;
  _creationTime: number;
  name: string;
  code?: string;
  startTime: string;
  endTime: string;
  graceTime?: number;
  breakDuration?: number;
  weeklyOff: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
