import { render, screen } from '@testing-library/react';

describe('Jest Test Example', () => {
  it('renders hello world text', () => {
    render(<div>Hello Duniya</div>);
    expect(screen.getByText('Hello Duniya')).toBeInTheDocument();
  });
});
