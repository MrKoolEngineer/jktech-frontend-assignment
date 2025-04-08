import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { AuthProvider } from '@context/AuthContext';

describe('Login Page', () => {
  it('should render email and password input fields', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

describe('Login Page - Validation', () => {
  it('should show required field errors on submit', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});
