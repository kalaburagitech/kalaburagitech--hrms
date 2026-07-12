import type { Metadata } from 'next';
import './globals.css';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider';

export const metadata: Metadata = {
  title: 'KalaburagiTech HRMS',
  description: 'Modern enterprise HRMS platform from KalaburagiTech',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <DashboardShell>{children}</DashboardShell>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
