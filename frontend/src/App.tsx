import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './redux/store';
import { history } from './redux/debugger'
import { ConnectedRouter } from 'connected-react-router';
import Layout from './Layout';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Provider>
  );
}


export default App
