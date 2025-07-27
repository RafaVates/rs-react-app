import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/about';

describe('About', () => {
  it('renders the designer name', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Designed by Rafael/i)).toBeInTheDocument();
  });

  it('renders the Rs School link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Go to Rs School/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/');
    expect(link).toHaveAttribute('target', 'blank');
  });
});
