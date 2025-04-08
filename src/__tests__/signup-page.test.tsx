import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '../app/signup/page';
import { AuthProvider } from '@context/AuthContext';
import '@testing-library/jest-dom';

describe('Signup Page', () => {
  it('should render name, email, password, and confirm password input fields', () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });
});

describe('Signup Page - Validation', () => {
  it('should show required field errors on submit', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const signupButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument();
    });
  });

  it('should show password mismatch error', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password321' },
    });

    const signupButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('should show error if name exceeds max length', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'A'.repeat(55) },
    });

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.input(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });

    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must not exceed 50 characters/i)).toBeInTheDocument();
    });
  });
});
