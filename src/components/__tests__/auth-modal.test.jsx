import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import AuthModal from '../AuthModal';
import { renderWithProviders } from '../../test-utils';

test('AuthModal shows validation error for invalid email', async () => {
  const onClose = vi.fn();
  renderWithProviders(<AuthModal mode="signup" onClose={onClose} onSwitch={() => {}} />);

  const continueBtn = screen.getByRole('button', { name: /^Continue$/i, selector: 'button[type="submit"]' });
  fireEvent.click(continueBtn);

  expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i);
});
