import * as z from "zod";

export const shiftSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().optional(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Must be in HH:MM format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Must be in HH:MM format"),
  graceTime: z.number().min(0).optional(),
  breakDuration: z.number().min(0).optional(),
  weeklyOff: z.string().optional(), // We'll handle string to array conversion in the form submission
  status: z.enum(["active", "inactive"]),
});

export type ShiftFormValues = z.infer<typeof shiftSchema>;
