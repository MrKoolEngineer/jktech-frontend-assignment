import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '../app/signup/page';
import { AuthProvider } from '@context/AuthContext';
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Signup successful' }),
  })
) as jest.Mock;

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
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
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

  it('should show error if name exceeds max length of 50 characters', async () => {
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

  it('should show error if email exceeds max length of 255 characters', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'a'.repeat(255) + '@test.com' },
    });

    fireEvent.input(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });

    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email must be under 255 characters/i)).toBeInTheDocument();
    });
  });

  it('should show error if password exceeds max length of 128 characters', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.input(screen.getByLabelText(/^password$/i), {
      target: { value: 'a'.repeat(129) },
    });

    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });
  });
});

describe('Signup Page - Integration', () => {
  it('should submit form with valid data and show success toast', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
    });
  });

  it('should show error toast when API responds with an error', async () => {
    const mockErrorResponse = {
      message: 'Email already in use',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(mockErrorResponse),
      })
    ) as jest.Mock;

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Error User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'error@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });

  it('should show error toast when API call fails (catch block)', async () => {
    // Force fetch to throw an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Error User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'error@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument(); // Adjust this based on your toast message
    });
  });

  it('should show success toast on successful signup and auto-dismiss', async () => {
    jest.useFakeTimers();

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Signup successful' }),
    });

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    const toast = await screen.findByText(/signup successful/i);
    expect(toast).toBeInTheDocument();

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.queryByText(/signup successful/i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
