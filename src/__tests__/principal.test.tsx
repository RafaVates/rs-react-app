import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Principal from '../pages/principal';

import type Country from '../components/country';
vi.mock('../components/content', () => ({
  default: ({ data }: { data: Country[] }) => (
    <div>Content: {data.length} countries</div>
  ),
}));
vi.mock('../components/error', () => ({
  default: () => <div>ErrorPage</div>,
}));
vi.mock('../context/context', () => ({
  __esModule: true,
  default: 'asia',
}));

describe('Principal', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    (window as unknown as { fetch?: typeof window.fetch }).fetch = undefined;
  });

  it('renders loading state initially', () => {
    window.fetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => [] });
    render(
      <MemoryRouter>
        <Principal />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading ... wait/i)).toBeInTheDocument();
  });

  it('renders content after successful fetch', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Array(25).fill({
          name: { common: 'Spain' },
          population: 47000000,
          flags: { png: '' },
          capital: ['Madrid'],
        }),
    });
    render(
      <MemoryRouter>
        <Principal />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Content: 20 countries/)).toBeInTheDocument();
    });
  });

  it('renders error page on fetch error', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    render(
      <MemoryRouter>
        <Principal />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/ErrorPage/)).toBeInTheDocument();
    });
  });

  it('changes page when pagination button is clicked', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Array(25).fill({
          name: { common: 'Spain' },
          population: 47000000,
          flags: { png: '' },
          capital: ['Madrid'],
        }),
    });
    render(
      <MemoryRouter>
        <Principal />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Content: 20 countries/)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.getByText(/Content: 5 countries/)).toBeInTheDocument();
    });
  });
});
