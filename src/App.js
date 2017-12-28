import React, { Component } from 'react';

import AppLayout from './hoc/AppLayout';
import FilmCase from './containers/FilmCase/FilmCase';
import './App.css';
import styled from 'styled-components';

import {base} from 'base';

class App extends Component {
  render () {
    return (
      <div className="App">
        <AppLayout>
          <FilmCase/>
        </AppLayout>
      </div>
    );
  }
}

export default App;
