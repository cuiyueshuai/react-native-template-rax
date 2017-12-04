import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/stores/configureStore';
import Fetcher from './src/network/fetcher';
import Router from './src/routerManager';

const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    Fetcher.initNetworkState();
  }

  componentWillUnmount() {
    Fetcher.removeNetworkStateListener();
  }

  render() {
    return (
      <Provider store={store}>
        <Router {...this.props} />
      </Provider>
    );
  }
}