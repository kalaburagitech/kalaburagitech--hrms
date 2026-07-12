import { Metadata } from 'next';
import { ComingSoon } from '@/components/layout/ComingSoon';

export const metadata: Metadata = {
  title: 'Recruitment | KalaburagiTech HRMS',
};

export default function RecruitmentRoute() {
  return <ComingSoon title="Module: Recruitment" description="This enterprise feature is currently under active development." />;
}

