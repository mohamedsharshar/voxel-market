import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AppProvider>
  );
}
