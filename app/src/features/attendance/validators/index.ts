import { z } from "zod";

export const attendanceFormSchema = z.object({
  employeeId: z.string().min(1, "Employee is required."),
  shiftId: z.string().optional(),
  date: z.string().min(1, "Date is required."),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(["present", "absent", "half_day", "late"]).default("present"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters.").optional(),
});

export type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;
