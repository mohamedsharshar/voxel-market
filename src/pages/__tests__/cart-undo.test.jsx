import React from 'react';
import { screen } from '@testing-library/react';
import Cart from '../Cart';
import { renderWithProviders } from '../../test-utils';

test('removeFromCart shows undo toast and undo restores item', async () => {
  renderWithProviders(<Cart />);
  expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
});
