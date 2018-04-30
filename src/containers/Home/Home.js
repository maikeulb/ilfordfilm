import React, { Component } from 'react';

import banner from '../../assets/banner.jpg';

const style = {
  max-height: "70vh",
  max-width: "100%"
};

class Home extends Component {
  render() {
    return (
      <div>
        <img style={ style } src={banner} alt="ilford" />
      </div>
    );
  }
}

export default Home;
