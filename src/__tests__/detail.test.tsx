import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal: () => Promise<unknown>) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  const mockNavigate = vi.fn();
  (
    globalThis as unknown as { mockNavigate: ReturnType<typeof vi.fn> }
  ).mockNavigate = mockNavigate;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Detail from '../pages/detail';

describe('Detail', () => {
  const country = {
    name: { common: 'Spain' },
    population: 47000000,
    flags: { png: 'spain.png' },
    capital: ['Madrid'],
  };

  it('renders country details', () => {
    render(<Detail />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[{ pathname: '/', state: { country } }]}>
          {children}
        </MemoryRouter>
      ),
    });
    expect(screen.getByText('Spain')).toBeInTheDocument();
    expect(screen.getByText(/Its capital name is:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Volver/i })).toBeInTheDocument();
    expect(screen.getByAltText('Spain')).toHaveAttribute('src', 'spain.png');
  });

  it('navigates to home when Volver is clicked', () => {
    render(<Detail />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[{ pathname: '/', state: { country } }]}>
          {' '}
          {children}{' '}
        </MemoryRouter>
      ),
    });
    fireEvent.click(screen.getByRole('button', { name: /Volver/i }));
    expect(
      (globalThis as unknown as { mockNavigate: ReturnType<typeof vi.fn> })
        .mockNavigate
    ).toHaveBeenCalledWith('/');
  });
});
