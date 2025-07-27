import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../pages/layout';

vi.mock('../components/header', () => ({
  default: ({
    name,
    onSearch,
  }: {
    name: string;
    onSearch: (v: string) => void;
  }) => (
    <div>
      <span>Header: {name}</span>
      <button onClick={() => onSearch('asia')}>Search Asia</button>
    </div>
  ),
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Outlet content</div>,
}));

beforeEach(() => {
  localStorage.clear();
});

describe('Layout', () => {
  it('renders header and outlet', () => {
    render(<Layout />);
    expect(screen.getByText(/Header:/i)).toBeInTheDocument();
    expect(screen.getByText(/Outlet content/i)).toBeInTheDocument();
  });

  it('uses localStorage value as initial context', () => {
    localStorage.setItem('busqueda', 'america');
    render(<Layout />);
    expect(screen.getByText('Header: america')).toBeInTheDocument();
  });

  it('updates context value when search is triggered', () => {
    render(<Layout />);
    fireEvent.click(screen.getByText('Search Asia'));
    expect(screen.getByText('Header: asia')).toBeInTheDocument();
  });
});
