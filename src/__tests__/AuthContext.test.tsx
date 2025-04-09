import { useAuth } from '@context/AuthContext';
import { render, screen } from '@testing-library/react';
import React from 'react';

// A test component that tries to use the hook outside of provider
function TestComponent() {
  useAuth();
  return <div>Should not render</div>;
}

describe('useAuth outside AuthProvider', () => {
  it('should throw an error if used outside of AuthProvider', () => {
    // Expect it to throw the context error
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within AuthProvider');
  });
});
