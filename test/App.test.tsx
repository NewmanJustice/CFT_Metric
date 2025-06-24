/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/CFT Metrics/i)).toBeInTheDocument();
  });

  it('renders the Generate Data button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Generate Data/i })).toBeInTheDocument();
  });

  it('renders the Number of records input', () => {
    render(<App />);
    expect(screen.getByLabelText(/Number of records/i)).toBeInTheDocument();
  });

  it('renders the Month input', () => {
    render(<App />);
    expect(screen.getByLabelText(/Month/i)).toBeInTheDocument();
  });
});
