import { render, screen } from '@testing-library/react';
import Vis from './Vis';

test('renders learn react link', () => {
  render(<Vis />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
