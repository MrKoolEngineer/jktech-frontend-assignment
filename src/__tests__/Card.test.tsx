import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@components/ui/Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Styled card</p>
      </Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
