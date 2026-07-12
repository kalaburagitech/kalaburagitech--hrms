import { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = {
  title: 'Settings | KalaburagiTech HRMS',
};

export default function SettingsRoute() {
  return <ComingSoon title="Module: Settings" description="This enterprise feature is currently under active development." />;
}
