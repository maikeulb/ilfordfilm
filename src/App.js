import React, { Component } from 'react';

import AppLayout from './components/Layout/AppLayout';
import FilmCase from './containers/FilmCase/FilmCase';
import './App.css';

import styled from 'styled-components';

class App extends Component {

// const Container = styled.div`
//   margin-top: 16px;
// `;

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
