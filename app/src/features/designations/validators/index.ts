import { z } from "zod";

export const DesignationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  code: z.string().optional(),
  departmentId: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export type DesignationFormValues = z.infer<typeof DesignationFormSchema>;
