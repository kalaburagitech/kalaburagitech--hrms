import { z } from "zod";

export const employeeFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  age: z.coerce.number().min(18, "Employee must be at least 18 years old."),
  sex: z.enum(["M", "F", "Other"]),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits."),
  status: z.enum(["active", "inactive", "on_leave"]).optional().default("active"),
  department: z.string().optional(),
  designation: z.string().optional(),
  joinDate: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
