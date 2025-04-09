import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';

jest.mock('@context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

jest.mock('@components/layouts/InitMSW', () => () => <div data-testid="init-msw" />);

describe('RootLayout', () => {
  it('renders children and includes AuthProvider and InitMSW', () => {
    render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('init-msw')).toBeInTheDocument();
  });
});
