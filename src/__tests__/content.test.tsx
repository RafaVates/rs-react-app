import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Content from '../components/content';

test('checking results', () => {
  const mockData = [
    { name: { common: 'Argentina' }, population: 45000000 },
    { name: { common: 'Uruguay' }, population: 15000000 },
  ];

  render(<Content data={mockData} />);
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  expect(h2.textContent).toBe('List of countries and its population');
  expect(screen.getByText(/argentina/i)).toBeInTheDocument();
});
