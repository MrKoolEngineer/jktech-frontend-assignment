import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordPage from '../app/forgot-password/page';
import { AuthProvider } from '@context/AuthContext';
import '@testing-library/jest-dom';

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

  it('submits the form and logs the email', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Forgot Password Request:', {
        email: 'test@example.com',
      });
    });

    consoleLogSpy.mockRestore();
  });
});
