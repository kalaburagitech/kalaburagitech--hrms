import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Attendance } from "../types";

interface AttendanceTableProps {
  data: Attendance[];
  onEdit: (attendance: Attendance) => void;
  onDelete: (attendance: Attendance) => void;
}

export function AttendanceTable({ data, onEdit, onDelete }: AttendanceTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-gray-800 bg-black text-gray-400">
        No attendance records found.
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "absent":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "late":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "half_day":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader className="bg-gray-900/50">
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-gray-400">Employee</TableHead>
            <TableHead className="text-gray-400">Time</TableHead>
            <TableHead className="text-gray-400">Duration</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-right text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record._id} className="border-gray-800 transition-colors hover:bg-gray-800/50">
              <TableCell className="font-medium text-gray-200">{record.date}</TableCell>
              <TableCell className="text-gray-300">
                {record.employee ? `${record.employee.firstName} ${record.employee.lastName}` : "Unknown"}
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="text-sm">
                  <div>In: {record.checkIn || "-"}</div>
                  <div>Out: {record.checkOut || "-"}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-300">
                <div className="text-sm">
                  <div>Work: {record.workingHours ? `${record.workingHours}h` : "-"}</div>
                  {(record.lateMinutes ?? 0) > 0 && <div className="text-red-400">Late: {record.lateMinutes}m</div>}
                  {(record.earlyOutMinutes ?? 0) > 0 && <div className="text-orange-400">Early Out: {record.earlyOutMinutes}m</div>}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(record.status)}>
                  {record.status.replace("_", " ").toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(record)}
                    className="h-8 w-8 text-gray-400 hover:bg-gray-800 hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(record)}
                    className="h-8 w-8 text-red-400 hover:bg-red-500/20 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

