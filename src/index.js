import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HttpService from "./services/http-service";
import UserService from "./services/user-service";
import 'bootstrap/dist/css/bootstrap.min.css';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


UserService.initKeycloak(renderApp);
HttpService.configure();