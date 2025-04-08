import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { AuthProvider } from '@context/AuthContext';
import '@testing-library/jest-dom';

describe('Login Page', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  beforeEach(() => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  });

  afterEach(() => {
    consoleLogSpy.mockClear();
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

  it('should submit form with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Login form data:', {
        email: 'test@example.com',
        password: 'password123',
        remember: false,
      });
    });
  });
});
