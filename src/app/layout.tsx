import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@context/AuthContext';
import InitMSW from '@components/layouts/InitMSW';

export const metadata = {
  title: 'Document Management App',
  description: 'Manage users and documents efficiently',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <InitMSW />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
