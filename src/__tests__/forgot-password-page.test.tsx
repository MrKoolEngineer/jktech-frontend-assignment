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
});
