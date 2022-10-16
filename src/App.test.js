import { render, screen } from '@testing-library/react';
import App from './App';

test('renders new customer button', () => {
  render(<App />);
  const buttonElement = screen.getByText("New Customer TEST");
  expect(buttonElement).toBeInTheDocument();
});
