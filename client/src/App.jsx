import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Routing from './Routers/Routing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Shared/Toast';
import { Provider } from 'react-redux';
import { store } from './store';
import Loader from './Shared/Loader';

function App() {
  return (
    <Provider store={store}>
      <Loader  />
      <Routing />
    </Provider>
  );
}

export default App;
