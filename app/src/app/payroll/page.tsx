import { Metadata } from 'next';
import { PayrollPage } from '@/features/payroll/pages/PayrollPage';

export const metadata: Metadata = {
  title: 'Payroll | KalaburagiTech HRMS',
};

export default function PayrollRoute() {
  return <PayrollPage />;
}

