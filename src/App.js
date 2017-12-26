import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import FilmCase from './containers/FilmCase/FilmCase';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <FilmCase/>
        </Layout>
      </div>
    );
  }
}

export default App;
