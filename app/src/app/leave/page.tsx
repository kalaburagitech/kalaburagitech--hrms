import { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = {
  title: 'Leave | KalaburagiTech HRMS',
};

export default function LeaveRoute() {
  return <ComingSoon title="Module: Leave" description="This enterprise feature is currently under active development." />;
}

