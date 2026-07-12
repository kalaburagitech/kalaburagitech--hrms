import { Metadata } from 'next';
import { AnnouncementPage } from '@/features/announcements/pages/AnnouncementPage';

export const metadata: Metadata = {
  title: 'Announcements | KalaburagiTech HRMS',
  description: 'Manage company announcements and updates.',
};

export default function AnnouncementsRoute() {
  return <AnnouncementPage />;
}

