import { Id } from "../../../../../convex/_generated/dataModel";

export interface Employee {
  _id: Id<"employees">;
  _creationTime: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: "M" | "F" | "Other";
  phoneNumber: string;
  status?: "active" | "inactive" | "on_leave";
  department?: string;
  designation?: string;
  joinDate?: string;
}
