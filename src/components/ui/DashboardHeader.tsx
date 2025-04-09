'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import Button from './Button';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    user?.username && (
      <div className="bg-gray-900 p-5">
        <div className="flex items-baseline justify-between space-y-4">
          <h1 className="text-xl font-bold text-white">
            Welcome <br /> {user?.username}!
          </h1>
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <p className="text-sm text-white">This is your dashboard.</p>
      </div>
    )
  );
};

export default DashboardHeader;
