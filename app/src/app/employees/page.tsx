import { Metadata } from 'next';
import EmployeePage from '@/features/employees/page';

export const metadata: Metadata = {
  title: 'Employees | KalaburagiTech HRMS',
  description: 'Manage employees, view profiles, and update records.',
};

export default function EmployeesRoute() {
  return <EmployeePage />;
}
