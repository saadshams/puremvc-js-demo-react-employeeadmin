import { render, screen } from '@testing-library/react';
import Application from '../src/js/Application';

test('renders learn react link', () => {
  render(<Application />);
  const linkElement = screen.getByText(/User/i);
  expect(linkElement).toBeInTheDocument();
});
