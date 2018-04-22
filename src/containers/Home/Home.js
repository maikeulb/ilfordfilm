import React, {
  Component
} from 'react';

class Home extends Component {

  render() {
    return (
      <div>
        <img style={{ maxHeight: "70vh", maxWidth: "100%"}} src={'http://www.brunosbildverkstad.se/image/4980/ILFORD1_3.jpg'} alt="ilford"/><span>{this.props.name}</span>
      </div>);
  }
}

export default Home;
