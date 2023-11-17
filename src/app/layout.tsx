import type { Metadata } from 'next';
import './globals.css';

import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Colo',
  description:
    'Colo is your one-stop destination for all things paint, providing a curated selection of wall colors from renowned manufacturers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans',
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
