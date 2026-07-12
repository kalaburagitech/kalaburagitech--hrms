import { ShiftPage } from "@/features/shifts/pages/ShiftPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shifts | HRMS",
  description: "Manage employee shifts",
};

export default function ShiftsRoute() {
  return <ShiftPage />;
}

