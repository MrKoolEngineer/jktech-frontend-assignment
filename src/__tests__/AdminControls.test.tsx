import { render, screen } from '@testing-library/react';
import AdminControls from '@components/ui/AdminControls';

// Dynamic mock for useAuth
const mockUseAuth = jest.fn();

jest.mock('@context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('AdminControls', () => {
  it('should render Manage Users button if user is admin', () => {
    mockUseAuth.mockReturnValue({
      user: { username: 'Admin', role: 'admin' },
    });

    render(<AdminControls />);
    expect(screen.getByRole('button', { name: /manage users/i })).toBeInTheDocument();
  });

  it('should not render anything if user is not admin', () => {
    mockUseAuth.mockReturnValue({
      user: { username: 'Agent', role: 'agent' },
    });

    render(<AdminControls />);
    expect(screen.queryByRole('button', { name: /manage users/i })).not.toBeInTheDocument();
  });
});
