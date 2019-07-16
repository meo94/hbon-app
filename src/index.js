import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './app';
import store from './app/redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
