'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@components/ui/Spinner';
import DashboardHeader from '@components/ui/DashboardHeader';
import { useAuth } from '@context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user?.username) {
      router.replace('/login');
    } else {
      setCheckingAuth(false);
    }
  }, [router, user]);

  if (checkingAuth) {
    return <Spinner />;
  }

  return (
    <>
      <DashboardHeader />
    </>
  );
}
