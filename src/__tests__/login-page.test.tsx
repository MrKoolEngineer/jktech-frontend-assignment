import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import LoginPage from '../app/login/page';
import { AuthProvider } from '@context/AuthContext';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  });

  it('should render email and password input fields', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should show validation errors on submit with empty fields', async () => {
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('should show error if email exceeds 255 characters', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, {
      target: { value: 'a'.repeat(255) + '@test.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'validPass123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/email must be under 255 characters/i)).toBeInTheDocument();
    });
  });

  it('should show error if password exceeds 128 characters', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'a'.repeat(129) } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/password must be under 128 characters/i)).toBeInTheDocument();
    });
  });
});

describe('Login Page - API Integration', () => {
  it('should submit form and call login + redirect on success', async () => {
    const mockReplace = jest.fn();

    // Mock router
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    // Mock fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          username: 'Test User',
          role: 'agent',
        },
        token: '123abc',
      }),
    });

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it('should show failure toast on entering wrong login credentials', async () => {
    jest.useFakeTimers();

    // Mock fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    });

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Assert toast is visible
    const toast = await screen.findByText(/Invalid credentials/i);
    expect(toast).toBeInTheDocument();

    // Fast-forward time to auto-dismiss
    jest.runAllTimers();

    // Optionally, assert that it's removed after dismissal
    await waitFor(() => {
      expect(screen.queryByText(/Invalid credentials/i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should show generic error toast when login request fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Force fetch to throw an error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    const toast = await screen.findByText(/something went wrong/i);
    expect(toast).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Login error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
