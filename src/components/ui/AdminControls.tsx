import Button from '@components/ui/Button';
import { useAuth } from '@context/AuthContext';

const AdminControls = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') return null;

  return (
    <div className="p-5">
      <Button>Manage Users</Button>
    </div>
  );
};

export default AdminControls;
