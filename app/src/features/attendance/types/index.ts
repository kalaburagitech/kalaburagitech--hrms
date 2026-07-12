import { Id } from "../../../../../convex/_generated/dataModel";

export interface Attendance {
  _id: Id<"attendance">;
  _creationTime: number;
  employeeId: Id<"employees">;
  departmentId?: Id<"departments">;
  designationId?: Id<"designations">;
  shiftId?: Id<"shifts">;
  date: string;
  checkIn?: string;
  checkOut?: string;
  workingHours?: number;
  lateMinutes?: number;
  earlyOutMinutes?: number;
  overtime?: number;
  status: "present" | "absent" | "half_day" | "late";
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Enriched fields from the query
  employee?: {
    firstName: string;
    lastName: string;
  };
  shift?: {
    name: string;
    startTime: string;
    endTime: string;
  };
  department?: {
    name: string;
  };
}
