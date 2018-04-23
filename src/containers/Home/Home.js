import React, { Component } from 'react';

import banner from '../../assets/banner.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <img style={{ maxHeight: "70vh", maxWidth: "100%"}} src={banner} alt="ilford" />
      </div>
    );
  }
}

export default Home;
