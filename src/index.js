import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import filmCaseReducer from './store/reducers/filmCase';
import orderReducer from './store/reducers/order';

const store = createStore(reducer);

const rootReducer = combineReducers({
    filmCase: filmCaseReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
