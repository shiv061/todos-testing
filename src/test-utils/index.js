import { render } from '@testing-library/react';
import { AppContextProvider } from '../hooks/useAppState';

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: AppContextProvider, ...options });
};

export * from '@testing-library/react';

export { renderWithContext as render };
