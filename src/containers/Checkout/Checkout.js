import React, {
  Component
} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    films: {
      panf: 1,
      delta100: 1,
      hp5: 1,
      delta3200: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
           films={this.state.films}
           checkoutCancelled={this.checkoutCancelledHandler}
           checkoutContinued={this.checkoutContinuedHandler}/>
      </div>
    );
  }
}

export default Checkout;
