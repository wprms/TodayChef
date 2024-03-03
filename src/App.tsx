import React from 'react';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { api } from './services/api';
import { store } from './services/store';
import { Provider } from 'react-redux';
import AppInner from './AppInner';


function App() {
  return (
    <ApiProvider api={api}>
      <Provider store={store}>
        <AppInner />
      </Provider>
    </ApiProvider>
  );
}

export default App;