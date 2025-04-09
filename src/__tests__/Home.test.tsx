import { render, screen, waitFor } from '@testing-library/react';
import Home from '../app/page';
import { useRouter } from 'next/navigation';

// Mocks for Spinner, Header, AdminControls
jest.mock('@components/ui/Spinner', () => () => <div>Loading spinner...</div>);
jest.mock('@components/ui/DashboardHeader', () => () => <div>Dashboard Header</div>);
jest.mock('@components/ui/AdminControls', () => () => (
  <button data-testid="manage-users-btn">Manage Users</button>
));

// Router mock
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// AuthContext mock
const mockUseAuth = jest.fn();
jest.mock('@context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /login if no user is logged in', async () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    mockUseAuth.mockReturnValue({ user: null });

    render(<Home />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });
  });

  it('should render DashboardHeader and AdminControls when user is logged in', async () => {
    (useRouter as jest.Mock).mockReturnValue({ replace: jest.fn() });
    mockUseAuth.mockReturnValue({
      user: { username: 'Test User', role: 'admin' },
      logout: jest.fn(),
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Dashboard Header')).toBeInTheDocument();
      expect(screen.getByTestId('manage-users-btn')).toBeInTheDocument();
    });
  });
});
