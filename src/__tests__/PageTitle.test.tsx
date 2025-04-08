import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTitle from '@components/ui/PageTitle';

describe('PageTitle', () => {
  it('renders the title passed as prop', () => {
    const titleText = 'Welcome to the Dashboard';
    render(<PageTitle title={titleText} />);
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });
});
