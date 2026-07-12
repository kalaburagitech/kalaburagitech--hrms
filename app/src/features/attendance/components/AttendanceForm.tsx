import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

import { attendanceFormSchema, AttendanceFormValues } from "../validators";
import { Attendance } from "../types";
import { useAttendanceActions } from "../services";

interface AttendanceFormProps {
  initialData?: Attendance | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AttendanceForm({ initialData, onSuccess, onCancel }: AttendanceFormProps) {
  const { createAttendance, updateAttendance } = useAttendanceActions();
  const employees = useQuery(api.employees.getAll) || [];
  const shifts = useQuery(api.shifts.getAllShifts) || [];

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      employeeId: "",
      shiftId: "",
      date: new Date().toISOString().split('T')[0],
      checkIn: "",
      checkOut: "",
      status: "present",
      notes: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        employeeId: initialData.employeeId,
        shiftId: initialData.shiftId || "none",
        date: initialData.date,
        checkIn: initialData.checkIn || "",
        checkOut: initialData.checkOut || "",
        status: initialData.status,
        notes: initialData.notes || "",
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: AttendanceFormValues) => {
    try {
      const payload = {
        employeeId: data.employeeId as Id<"employees">,
        shiftId: data.shiftId === "none" || !data.shiftId ? undefined : data.shiftId as Id<"shifts">,
        date: data.date,
        checkIn: data.checkIn || undefined,
        checkOut: data.checkOut || undefined,
        status: data.status,
        notes: data.notes || undefined,
      };

      if (initialData) {
        await updateAttendance({ id: initialData._id, ...payload });
        toast.success("Attendance record updated successfully");
      } else {
        await createAttendance(payload);
        toast.success("Attendance record created successfully");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={!!initialData} // Cannot change employee for existing record
                >
                  <FormControl>
                    <SelectTrigger className="bg-black border-gray-800">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-900 border-gray-800">
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

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="bg-black border-gray-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shiftId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black border-gray-800">
                      <SelectValue placeholder="Select shift (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="none">No Shift</SelectItem>
                    {shifts.map((shift) => (
                      <SelectItem key={shift._id} value={shift._id}>
                        {shift.name} ({shift.startTime} - {shift.endTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-black border-gray-800">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="half_day">Half Day</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check In Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="bg-black border-gray-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Out Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="bg-black border-gray-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional information..."
                  className="resize-none bg-black border-gray-800 min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-800 hover:bg-gray-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-white text-black hover:bg-gray-200"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Record"
                : "Create Record"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

