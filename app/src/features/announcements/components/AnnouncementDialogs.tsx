"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnnouncementForm } from "./AnnouncementForm";
import { useAnnouncementActions } from "../services";
import { AnnouncementFormValues } from "../validators";
import { toast } from "sonner";
import { Announcement } from "../types";

interface AnnouncementDialogsProps {
  children: React.ReactNode;
  announcement?: Announcement;
  mode: "create" | "edit";
}

export function AnnouncementDialogs({ children, announcement, mode }: AnnouncementDialogsProps) {
  const [open, setOpen] = useState(false);
  const { createAnnouncement, updateAnnouncement } = useAnnouncementActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: AnnouncementFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createAnnouncement(data);
        toast.success("Announcement created successfully");
      } else if (mode === "edit" && announcement) {
        await updateAnnouncement({ id: announcement._id, ...data });
        toast.success("Announcement updated successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Announcement" : "Edit Announcement"}
          </DialogTitle>
        </DialogHeader>
        <AnnouncementForm
          initialValues={announcement}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

