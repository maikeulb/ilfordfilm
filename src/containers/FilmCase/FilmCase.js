import React, {
  Component
} from 'react';

import Aux from '../../hoc/Aux';
import Film from '../../components/Film/Film';
import Controls from '../../components/Film/Controls/Controls';
import OrderSummary from '../../components/Film/OrderSummary/OrderSummary';
import {
  Modal,
  Spin
} from 'antd';
import axios from '../../axios-orders';

const FILM_PRICES = {
  panf: 4.5,
  delta100: 4.0,
  hp5: 5.5,
  delta3200: 8.0
};

class FilmCase extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    films: {
      panf: 0,
      delta100: 0,
      hp5: 0,
      delta3200: 0
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  // componentDidMount() {
  //   axios.get('https://ilfordfilm-61890.firebaseio.com/films.json')
  //     .then(response => {
  //       this.setState({
  //         films: response.data
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  updatePurchaseState(films) {
    const sum = Object.keys(films)
      .map(filmKey => {
        return films[filmKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  addFilmHandler = (type) => {
    const oldCount = this.state.films[type];
    const updatedCount = oldCount + 1;
    const updatedFilms = {
      ...this.state.films
    };
    updatedFilms[type] = updatedCount;
    const priceAddition = FILM_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      films: updatedFilms
    });
    this.updatePurchaseState(updatedFilms);
  }

  removeFilmHandler = (type) => {
    const oldCount = this.state.films[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedFilms = {
      ...this.state.films
    };
    updatedFilms[type] = updatedCount;
    const priceDeduction = FILM_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      films: updatedFilms
    });
    this.updatePurchaseState(updatedFilms);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      films: this.state.films,
      price: this.state.totalPrice,
      customer: {
        name: 'Mike Barnes',
        address: {
          street: '123 Main street',
          zipCode: '11011',
          country: 'USA'
        },
        email: 'demo@example.com'
      },
      deliveryMethod: 'express'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.films
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    orderSummary =
      <OrderSummary 
            films={this.state.films}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>

    if (this.state.loading) {
      orderSummary = <Spin />
    }
    return (
      <Aux>
        <Modal 
          title = "Your Order"
          visible={this.state.purchasing}
          onOk={this.purchaseContinueHandler}
          onCancel={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        <Film films ={this.state.films} />
        <Controls
          filmAdded={this.addFilmHandler}
          filmRemoved={this.removeFilmHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />

      </Aux>
    );
  }
}

export default FilmCase;
