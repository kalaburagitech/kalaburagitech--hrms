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
import { EmployeeForm } from "./EmployeeForm";
import { useEmployeeActions } from "../services";
import { EmployeeFormValues } from "../validators";
import { toast } from "sonner";
import { Employee } from "../types";

interface EmployeeDialogsProps {
  children: React.ReactNode;
  employee?: Employee;
  mode: "create" | "edit";
}

export function EmployeeDialogs({ children, employee, mode }: EmployeeDialogsProps) {
  const [open, setOpen] = useState(false);
  const { createEmployee, updateEmployee } = useEmployeeActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: EmployeeFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createEmployee(data);
        toast.success("Employee created successfully");
      } else if (mode === "edit" && employee) {
        await updateEmployee({ id: employee._id, ...data });
        toast.success("Employee updated successfully");
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
      <DialogContent className="sm:max-w-[425px] bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Employee" : "Edit Employee"}
          </DialogTitle>
        </DialogHeader>
        <EmployeeForm
          initialValues={employee}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

