import { render, screen } from '@testing-library/react';
import Spinner from '@components/ui/Spinner';

describe('Spinner', () => {
  it('renders loading spinner with aria-label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });
});
