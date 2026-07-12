import { Id } from "../../../../../convex/_generated/dataModel";
import { Employee } from "../../employees/types";

export interface Payroll {
  _id: Id<"payroll">;
  _creationTime: number;
  employeeId: Id<"employees">;
  month: number;
  year: number;
  basicSalary: number;
  allowances?: number;
  deductions?: number;
  overtimeAmount?: number;
  netSalary: number;
  paymentStatus: "pending" | "processing" | "paid" | "failed";
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
  employee?: Employee | null;
}
