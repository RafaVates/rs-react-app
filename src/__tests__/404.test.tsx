import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from '../pages/404';

test('Server side error', () => {
  render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );
  const h1 = screen.getByRole('heading', { level: 1 });
  const button = screen.getByRole('button');
  expect(h1).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(h1.textContent).toMatch(/Ops ... this is not a valid/);
  expect(button.textContent).toBe('Volver');
});
