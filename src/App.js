import React, { Component } from 'react';

import Button from 'antd/lib/button';
import Layout from './components/Layout/Layout';
import FilmCase from './containers/FilmCase/FilmCase';
import './App.css';

import styled from 'styled-components';

const Container = styled.div`
  margin-top: 16px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class App extends Component {
  render () {
    return (
      <div className="App">

        <Container>
          <Layout>
            <FilmCase/>
          </Layout>
        </Container>

      </div>
    );
  }
}

export default App;
