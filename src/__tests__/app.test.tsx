import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

test('Render a common div', () => {
  render(<div />);
  expect(true).toBeTruthy();
});

test('Render App component', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
