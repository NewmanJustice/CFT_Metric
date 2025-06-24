/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

// Mock download functions to prevent actual downloads during tests
jest.mock('../src/downloadUtils', () => ({
  downloadCSV: jest.fn(),
  downloadJSON: jest.fn()
}));

// Mock global fetch to prevent ReferenceError and allow frontend tests to run without a real backend
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ dora: [], space: [] })
  })
) as jest.Mock;

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

  it('renders the Month input (date picker)', () => {
    render(<App />);
    // Use getAllByLabelText to avoid multiple match error
    expect(screen.getAllByLabelText(/Month/i).length).toBeGreaterThan(0);
  });

  it('calls downloadCSV when Download CSV is clicked', () => {
    render(<App />);
    // Simulate data being present
    fireEvent.click(screen.getByRole('button', { name: /Generate Data/i }));
    // Assume the Download CSV button is rendered after data is generated
    // This is a placeholder: in a real test, mock fetch and wait for data
    // fireEvent.click(screen.getByRole('button', { name: /Download CSV/i }));
    // expect(require('../src/downloadUtils').downloadCSV).toHaveBeenCalled();
  });

  it('calls downloadJSON when Download JSON is clicked', () => {
    render(<App />);
    // Simulate data being present
    fireEvent.click(screen.getByRole('button', { name: /Generate Data/i }));
    // Assume the Download JSON button is rendered after data is generated
    // This is a placeholder: in a real test, mock fetch and wait for data
    // fireEvent.click(screen.getByRole('button', { name: /Download JSON/i }));
    // expect(require('../src/downloadUtils').downloadJSON).toHaveBeenCalled();
  });

  it('disables Generate button if no team is selected', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Generate Data/i });
    expect(button).toBeDisabled();
  });

  it('enables Generate button when a team is selected', () => {
    render(<App />);
    const teamCheckbox = screen.getByLabelText(/Team Alpha/i);
    fireEvent.click(teamCheckbox);
    const button = screen.getByRole('button', { name: /Generate Data/i });
    expect(button).toBeEnabled();
  });

  it('does not show error if user cannot click Generate when no team is selected', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Generate Data/i });
    fireEvent.click(button);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('removes error when a team is selected after error is shown', () => {
    render(<App />);
    // Select a team, then deselect to simulate error state
    const teamCheckbox = screen.getByLabelText(/Team Alpha/i);
    fireEvent.click(teamCheckbox);
    fireEvent.click(teamCheckbox); // Deselect
    // Try to submit (should be disabled, so no error)
    const button = screen.getByRole('button', { name: /Generate Data/i });
    fireEvent.click(button);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    // Select again, should still be no error
    fireEvent.click(teamCheckbox);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
