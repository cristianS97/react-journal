// React
import React from 'react';
// React Router Dom
import { RouterProvider } from "react-router-dom";
// Mis importaciones
import { router } from './router/router';
import { store } from './store/store';
// React redux
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
