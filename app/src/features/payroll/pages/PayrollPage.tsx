"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePayroll } from "../services";
import { useEmployees } from "../../employees/services";
import { PayrollTable } from "../components/PayrollTable";
import { PayrollDialogs } from "../components/PayrollDialogs";
import { DeletePayrollDialog } from "../components/DeletePayrollDialog";
import { Payroll } from "../types";

export function PayrollPage() {
  const { results: payrollData, status } = usePayroll();
  const { results: employeesData } = useEmployees();
  
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const isLoading = status === "LoadingFirstPage";

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Payroll</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage employee salaries, view payment statuses, and process payroll.
          </p>
        </div>
        <PayrollDialogs mode="create" employees={employeesData as any[]}>
          <Button className="bg-white/10 text-foreground hover:bg-white/20">
            <Plus className="mr-2 h-4 w-4" /> Add Payroll
          </Button>
        </PayrollDialogs>
      </div>
      
      <div className="flex-1 rounded-3xl border border-border bg-card/50 p-6 shadow-xl">
        <PayrollTable 
          data={payrollData as unknown as Payroll[]} 
          isLoading={isLoading} 
          onEdit={(payroll) => {
            setSelectedPayroll(payroll);
            setIsEditDialogOpen(true);
          }}
          onDelete={(payroll) => {
            setSelectedPayroll(payroll);
            setIsDeleteDialogOpen(true);
          }}
        />
      </div>

      <PayrollDialogs 
        mode="edit" 
        payroll={selectedPayroll || undefined} 
        employees={employeesData as any[]}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <div />
      </PayrollDialogs>

      <DeletePayrollDialog
        payroll={selectedPayroll}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
}

