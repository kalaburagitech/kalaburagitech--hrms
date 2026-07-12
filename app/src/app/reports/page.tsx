import { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = {
  title: 'Reports | KalaburagiTech HRMS',
};

export default function ReportsRoute() {
  return <ComingSoon title="Module: Reports" description="This enterprise feature is currently under active development." />;
}
