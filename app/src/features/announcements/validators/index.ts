import { z } from "zod";

export const announcementFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  publishDate: z.string().min(1, "Publish date is required."),
  expiryDate: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional().default("draft"),
});

export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;
