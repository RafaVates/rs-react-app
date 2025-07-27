import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header';

describe('Header', () => {
  const onSearch = vi.fn();
  beforeEach(() => {
    onSearch.mockClear();
    localStorage.clear();
  });

  it('renders Home and About links', () => {
    render(
      <MemoryRouter>
        <Header name="" onSearch={onSearch} />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders input with initial value', () => {
    render(
      <MemoryRouter>
        <Header name="Asia" onSearch={onSearch} />
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('Asia')).toBeInTheDocument();
  });

  it('calls onSearch and sets localStorage when Search is clicked', () => {
    render(
      <MemoryRouter>
        <Header name="" onSearch={onSearch} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Europe' } });
    fireEvent.click(screen.getByText('Search'));
    expect(onSearch).toHaveBeenCalledWith('Europe');
    expect(localStorage.getItem('busqueda')).toBe('Europe');
  });

  it('does not call onSearch or set localStorage if input is empty', () => {
    render(
      <MemoryRouter>
        <Header name="" onSearch={onSearch} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Search/i), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(onSearch).not.toHaveBeenCalled();
    expect(localStorage.getItem('busqueda')).toBeNull();
  });
});
