import { z } from "zod";

export const payrollFormSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  month: z.coerce.number().min(1, "Month is required").max(12, "Invalid month"),
  year: z.coerce.number().min(2000, "Year is required"),
  basicSalary: z.coerce.number().min(0, "Basic salary must be at least 0"),
  allowances: z.coerce.number().min(0).optional().default(0),
  deductions: z.coerce.number().min(0).optional().default(0),
  overtimeAmount: z.coerce.number().min(0).optional().default(0),
  netSalary: z.coerce.number().min(0, "Net salary is required"),
  paymentStatus: z.enum(["pending", "processing", "paid", "failed"]).optional().default("pending"),
  paymentDate: z.string().optional(),
});

export type PayrollFormValues = z.infer<typeof payrollFormSchema>;
