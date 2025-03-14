import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

export const renderWithRedux = (
  ui,
  {
    initialState,
    store = mockStore(initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};
