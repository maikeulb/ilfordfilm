import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout';
import FilmCase from './containers/FilmCase/FilmCase';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/films" exact component={FilmCase} />
            <Route path="/Login" exact component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
