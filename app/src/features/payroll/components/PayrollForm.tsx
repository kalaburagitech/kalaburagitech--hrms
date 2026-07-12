"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { payrollFormSchema, PayrollFormValues } from "../validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee } from "../../employees/types";
import { useEffect } from "react";

interface PayrollFormProps {
  initialValues?: Partial<PayrollFormValues>;
  onSubmit: (data: PayrollFormValues) => void;
  isSubmitting?: boolean;
  employees: Employee[];
}

export function PayrollForm({ initialValues, onSubmit, isSubmitting, employees }: PayrollFormProps) {
  const form = useReactHookForm<PayrollFormValues>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: {
      employeeId: initialValues?.employeeId || "",
      month: initialValues?.month || new Date().getMonth() + 1,
      year: initialValues?.year || new Date().getFullYear(),
      basicSalary: initialValues?.basicSalary || 0,
      allowances: initialValues?.allowances || 0,
      deductions: initialValues?.deductions || 0,
      overtimeAmount: initialValues?.overtimeAmount || 0,
      netSalary: initialValues?.netSalary || 0,
      paymentStatus: (initialValues?.paymentStatus as any) || "pending",
      paymentDate: initialValues?.paymentDate || "",
    },
  });

  const { watch, setValue } = form;
  const basicSalary = watch("basicSalary");
  const allowances = watch("allowances");
  const deductions = watch("deductions");
  const overtimeAmount = watch("overtimeAmount");

  useEffect(() => {
    const net = Number(basicSalary || 0) + Number(allowances || 0) + Number(overtimeAmount || 0) - Number(deductions || 0);
    setValue("netSalary", net);
  }, [basicSalary, allowances, deductions, overtimeAmount, setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp._id} value={emp._id}>
                      {emp.firstName} {emp.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month (1-12)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" min={2000} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="basicSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Basic Salary</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowances"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowances</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deductions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deductions</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="overtimeAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overtime Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="netSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Salary</FormLabel>
                <FormControl>
                  <Input type="number" disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Payroll"}
        </Button>
      </form>
    </Form>
  );
}
