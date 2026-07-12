"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shiftSchema, ShiftFormValues } from "../validators";
import { Shift } from "../types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ShiftFormProps {
  shift?: Shift | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<boolean>;
}

export function ShiftForm({ shift, isOpen, onClose, onSubmit }: ShiftFormProps) {
  const isEditing = !!shift;

  const form = useForm<ShiftFormValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      name: shift?.name || "",
      code: shift?.code || "",
      startTime: shift?.startTime || "09:00",
      endTime: shift?.endTime || "17:00",
      graceTime: shift?.graceTime || 0,
      breakDuration: shift?.breakDuration || 0,
      weeklyOff: shift?.weeklyOff ? shift.weeklyOff.join(", ") : "",
      status: shift?.status || "active",
    },
  });

  const handleSubmit = async (values: ShiftFormValues) => {
    const payload = {
      ...values,
      weeklyOff: values.weeklyOff
        ? values.weeklyOff.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };
    const success = await onSubmit(payload);
    if (success) {
      form.reset();
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Shift" : "Create New Shift"}
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 h-6 w-6 p-0 hover:bg-muted rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Shift Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Morning Shift" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Shift Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. MORN" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Start Time (HH:MM)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="09:00" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">End Time (HH:MM)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="17:00" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graceTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Grace Time (mins)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="15" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="breakDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Break Duration (mins)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="60" 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="weeklyOff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Weekly Off (Comma Separated)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Saturday, Sunday" 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="bg-transparent border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-indigo-600 text-foreground hover:bg-indigo-700"
              >
                {form.formState.isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Shift"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

