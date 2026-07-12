import { Metadata } from 'next';
import { AttendancePage } from '@/features/attendance/pages/AttendancePage';

export const metadata: Metadata = {
  title: 'Attendance | KalaburagiTech HRMS',
  description: 'Manage employee attendance and track working hours.',
};

export default function AttendanceRoute() {
  return <AttendancePage />;
}
