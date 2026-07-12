"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAnnouncementActions } from "../services";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";

interface DeleteAnnouncementDialogProps {
  children: React.ReactNode;
  id: Id<"announcements">;
}

export function DeleteAnnouncementDialog({ children, id }: DeleteAnnouncementDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteAnnouncement } = useAnnouncementActions();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAnnouncement({ id });
      toast.success("Announcement deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete announcement");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete this announcement? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-border bg-transparent text-foreground hover:bg-accent/50"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

