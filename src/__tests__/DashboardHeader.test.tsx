import { render, screen, fireEvent } from '@testing-library/react';
import DashboardHeader from '@components/ui/DashboardHeader';

jest.mock('@context/AuthContext', () => ({
  useAuth: () => ({
    user: { username: 'Test User', role: 'agent' },
    logout: jest.fn(),
  }),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('DashboardHeader', () => {
  it('renders welcome message and username', () => {
    render(<DashboardHeader />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });

  it('renders the logout button', () => {
    render(<DashboardHeader />);
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();
  });

  it('calls logout and redirects on logout button click', () => {
    render(<DashboardHeader />);
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    // push to /login should be triggered
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders dashboard message', () => {
    render(<DashboardHeader />);
    expect(screen.getByText(/This is your dashboard/i)).toBeInTheDocument();
  });
});
