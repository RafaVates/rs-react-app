import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/error-boundary';

test('Error Boundary', () => {
  const ThrowError = () => {
    throw new Error('Test');
  };
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(h1.textContent).toBe('Something went wrong.');
});
