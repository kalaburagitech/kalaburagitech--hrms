import { Metadata } from 'next';
import { DepartmentPage } from '@/features/departments/pages/DepartmentPage';

export const metadata: Metadata = {
  title: 'Departments | KalaburagiTech HRMS',
  description: 'Manage departments and organizational structure.',
};

export default function DepartmentsRoute() {
  return <DepartmentPage />;
}

