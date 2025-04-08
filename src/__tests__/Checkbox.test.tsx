import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '@components/ui/Checkbox';

describe('Checkbox', () => {
  it('renders with the provided label', () => {
    render(<Checkbox label="Accept Terms" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  it('is checked when the checked prop is true', () => {
    render(<Checkbox label="Subscribe" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="I agree" checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
