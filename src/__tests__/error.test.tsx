import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../components/error';

test('Server side error', () => {
  render(<ErrorPage />);
  const h1 = screen.getByRole('heading', { level: 1 });
  const p = screen.getByRole('paragraph');
  expect(h1).toBeInTheDocument();
  expect(p).toBeInTheDocument();
  expect(h1.textContent).toBe('Ops ... this is not a valid region');
  expect(p.textContent).toBe('Press error button again to continue');
});
