import React, {
  Component
} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import AppLayout from './hoc/AppLayout';
import FilmCase from './containers/FilmCase/FilmCase';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLayout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={FilmCase} />
          </Switch>
        </AppLayout>
      </div>
    );
  }
}

export default App;
