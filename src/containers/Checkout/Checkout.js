import React, {
  Component
} from 'react';
import {
  Route
} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component {
  state = {
    films: null,
    price: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const films = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        films[param[0]] = +param[1];
      }
    }
    this.setState({
      films: films,
      totalPrice: price
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
           films={this.state.films}
           checkoutCancelled={this.checkoutCancelledHandler}
           checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
           path={this.props.match.path + '/contact'} 
           render={(props) => (<Contact films={this.state.films} price={this.state.totalPrice} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;
