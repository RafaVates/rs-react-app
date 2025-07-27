import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Content from '../components/content';

const mockCountries = [
  {
    name: { common: 'Spain' },
    population: 47000000,
    flags: { png: 'spain.png' },
    capital: ['Madrid'],
  },
  {
    name: { common: 'Japan' },
    population: 125000000,
    flags: { png: 'japan.png' },
    capital: ['Tokyo'],
  },
];

describe('Content', () => {
  it('renders the title', () => {
    render(
      <MemoryRouter>
        <Content data={mockCountries} />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/List of countries and its population/i)
    ).toBeInTheDocument();
  });

  it('renders a list of countries', () => {
    render(
      <MemoryRouter>
        <Content data={mockCountries} />
      </MemoryRouter>
    );
    expect(screen.getByText('Spain')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('47000000')).toBeInTheDocument();
    expect(screen.getByText('125000000')).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    render(
      <MemoryRouter>
        <Content data={mockCountries} />
      </MemoryRouter>
    );
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(2);
  });
});
