import { Id } from "../../../../../convex/_generated/dataModel";

export interface Designation {
  _id: Id<"designations">;
  _creationTime: number;
  name: string;
  code?: string;
  departmentId?: Id<"departments">;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
