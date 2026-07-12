import { Id } from "../../../../../convex/_generated/dataModel";

export interface Department {
  _id: Id<"departments">;
  _creationTime: number;
  name: string;
  code?: string;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
