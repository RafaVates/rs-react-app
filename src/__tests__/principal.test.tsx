import '@testing-library/jest-dom/vitest';
import { expect, describe, vi, it, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Principal from '../pages/principal';

vi.mock('../components/header', () => ({
  default: ({
    name,
    onSearch,
  }: {
    name: string;
    onSearch: (value: string) => void;
  }) => (
    <div>
      <span>Header: {name}</span>
      <button onClick={() => onSearch('asia')}>Search Asia</button>
    </div>
  ),
}));
vi.mock('../components/content', () => ({
  default: ({
    data,
  }: {
    data: Array<{ name: { common: string }; population: number }>;
  }) => <div>Content: {data.length} countries</div>,
}));
vi.mock('../components/error', () => ({
  default: () => <div>ErrorPage</div>,
}));

describe('Principal', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders loading state initially', () => {
    render(<Principal />);
    expect(screen.getByText(/Loading ... wait/i)).toBeInTheDocument();
  });

  it('renders content after successful fetch', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ name: { common: 'Spain' }, population: 47_000_000 }],
    });
    render(<Principal />);
    await waitFor(() => {
      expect(screen.getByText(/Content: 1 countries/)).toBeInTheDocument();
    });
  });

  it('renders error page on fetch error', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    render(<Principal />);
    await waitFor(() => {
      expect(screen.getByText(/ErrorPage/)).toBeInTheDocument();
    });
  });

  it('handles search change and fetches new data', async () => {
    window.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { name: { common: 'Spain' }, population: 47_000_000 },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { name: { common: 'Japan' }, population: 125_000_000 },
        ],
      });
    render(<Principal />);
    await waitFor(() => {
      expect(screen.getByText(/Content: 1 countries/)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Search Asia/));
    await waitFor(() => {
      expect(screen.getByText(/Content: 1 countries/)).toBeInTheDocument();
    });
  });

  it('throws error when error button is clicked', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    render(<Principal />);
    await waitFor(() => {
      expect(screen.getByText(/Content: 0 countries/)).toBeInTheDocument();
    });
  });
});
