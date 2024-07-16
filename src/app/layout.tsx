import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Navbar } from '@/components';
import NavigationLine from '@/components/NavigationLine/NavigationLine';
import { ThemeProvider } from '@/components/сontext/theme/ThemeContext';
import { NotificationMessage } from '@/components/notifications/ToastContainer/ToastContainer';

export const metadata: Metadata = {
  title: 'Anime',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="bg-gray-300 dark:bg-gray-background h-fit min-h-screen pt-[110px]">
            <Navbar />
            <NotificationMessage />
              <div className="flex justify-center">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
