import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/common.css';
import {Provider} from "react-redux";
import {store} from "./store";
import {InitApi} from "./utile/api";

const root = ReactDOM.createRoot(document.getElementById('root'));

InitApi()

root.render(
      <Provider store={store}>
          <App />
      </Provider>
);