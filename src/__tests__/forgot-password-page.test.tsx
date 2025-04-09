import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordPage from '../app/forgot-password/page';
import { AuthProvider } from '@context/AuthContext';
import '@testing-library/jest-dom';

// Mock the fetch API
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Reset link sent' }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Forgot Password Page', () => {
  it('should render email input field', () => {
    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});

describe('Forgot Password Page - Validation', () => {
  it('should show email validation error on empty submit', async () => {
    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    const submitButton = screen.getByRole('button', { name: /reset password/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should show invalid email error for wrong email format', async () => {
    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' },
    });

    const submitButton = screen.getByRole('button', { name: /reset password/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should show error if email exceeds max length of 255 characters', async () => {
    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'a'.repeat(255) + '@test.com' },
    });

    const submitButton = screen.getByRole('button', { name: /reset password/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email must be under 255 characters/i)).toBeInTheDocument();
    });
  });

  it('should submit the forgot password form with valid email', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Reset link sent' }),
      })
    ) as jest.Mock;

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/reset link sent/i)).toBeInTheDocument();
    });
  });

  it('shows success toast on successful reset request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Reset link sent' }),
    });

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/reset link sent/i)).toBeInTheDocument();
    });
  });

  it('shows error toast if reset request fails with 400', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Signup failed. Please try again.' }),
    });

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'fail@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
    });
  });

  it('logs error to console if fetch throws an error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Forgot Password Error:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should show success toast on successful forgot password request', async () => {
    jest.useFakeTimers();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Reset link sent' }),
    });

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    // Assert toast is visible
    const toast = await screen.findByText(/reset link sent/i);
    expect(toast).toBeInTheDocument();

    // Fast-forward time to auto-dismiss
    jest.runAllTimers();

    // Optionally, assert that it's removed after dismissal
    await waitFor(() => {
      expect(screen.queryByText(/reset link sent/i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
