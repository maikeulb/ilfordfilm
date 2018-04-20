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

  render() {
    return (
      <div>
                <CheckoutSummary films={this.state.films}/>
            </div>
    );
  }
}

export default Checkout;
