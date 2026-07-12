"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PayrollForm } from "./PayrollForm";
import { usePayrollActions } from "../services";
import { PayrollFormValues } from "../validators";
import { toast } from "sonner";
import { Payroll } from "../types";
import { Employee } from "../../employees/types";

interface PayrollDialogsProps {
  children: React.ReactNode;
  payroll?: Payroll;
  mode: "create" | "edit";
  employees: Employee[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PayrollDialogs({ children, payroll, mode, employees, open: controlledOpen, onOpenChange: setControlledOpen }: PayrollDialogsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled && setControlledOpen ? setControlledOpen : setUncontrolledOpen;

  const { createPayroll, updatePayroll } = usePayrollActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: PayrollFormValues) => {
    setIsSubmitting(true);
    try {
      // Need to format dates and numbers as required by schema
      const formattedData = {
        ...data,
      };

      if (mode === "create") {
        await createPayroll(formattedData as any);
        toast.success("Payroll record created successfully");
      } else if (mode === "edit" && payroll) {
        await updatePayroll({ id: payroll._id, ...formattedData } as any);
        toast.success("Payroll record updated successfully");
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
            {mode === "create" ? "Add Payroll Record" : "Edit Payroll Record"}
          </DialogTitle>
        </DialogHeader>
        <PayrollForm
          initialValues={payroll}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          employees={employees}
        />
      </DialogContent>
    </Dialog>
  );
}

