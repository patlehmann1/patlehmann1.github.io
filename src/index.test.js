import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

jest.mock('react-dom');
jest.mock('./serviceWorker');

describe('index', () => {
  it('renders the App component to the root element', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    require('./index');

    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, root);
  });

  it('unregisters the service worker', () => {
    require('./index');

    expect(serviceWorker.unregister).toHaveBeenCalled();
  });
});