import '@testing-library/jest-dom/vitest';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/header';

describe('Search component', () => {
  const mockSearch = vi.fn();
  const mockName = '';

  beforeEach(() => {
    render(<Header name={mockName} onSearch={mockSearch} />);
  });

  it('Button search exists', () => {
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Search');
  });

  it('complete search input and send data', async () => {
    const searchTerm = 'asia';
    const input = screen.getByPlaceholderText(
      'Search ... Enter a valid region (Asia-America-North America-Europe)'
    );
    const button = screen.getByRole('button', { name: 'Search' });

    await userEvent.type(input, searchTerm);
    await userEvent.click(button);

    expect(mockSearch).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith(searchTerm);
  });

  it('null input value', async () => {
    const input = screen.getByPlaceholderText(
      'Search ... Enter a valid region (Asia-America-North America-Europe)'
    );
    const button = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(button);

    expect(input.textContent).toBe('');
    expect(mockSearch).toHaveBeenCalled();
  });
});
