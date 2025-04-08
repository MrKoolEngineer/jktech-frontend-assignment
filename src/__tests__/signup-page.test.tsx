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
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
    });
  });
});
