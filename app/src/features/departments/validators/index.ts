import { z } from "zod";

export const departmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name cannot exceed 100 characters."),
  code: z.string().optional(),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>;
