import type { Metadata } from 'next';
import './globals.css';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'KalaburagiTech HRMS',
  description: 'Modern enterprise HRMS platform from KalaburagiTech',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <DashboardShell>{children}</DashboardShell>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

