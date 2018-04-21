import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

import Film from '../../components/Film/Film';
import Controls from '../../components/Film/Controls/Controls';
import OrderSummary from '../../components/Film/OrderSummary/OrderSummary';
import * as actionTypes from '../../store/actions';

import { Modal, Spin } from 'antd';

// const FILM_PRICES = {
//   panf: 4.5,
//   delta100: 4.0,
//   hp5: 5.5,
//   delta3200: 8.0
// };

class FilmCase extends Component {

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  // state = {
  //   films: null,
  //   totalPrice: 0,
  //   purchasable: false,
  //   purchasing: false,
  //   loading: false,
  // }

  componentDidMount() {
    // axios.get('https://ilfordfilm-61890.firebaseio.com/films.json')
      // .then(response => {
        // this.setState({
          // films: response.data
        // });
      // })
      // .catch(error => {
        // this.setState({
          // error: true
        // });
      // });
  }

  updatePurchaseState(films) {
    const sum = Object.keys(films)
      .map(filmKey => {
        return films[filmKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
    // this.setState({
      // purchasable: sum > 0
    // });
  }

  // addFilmHandler = (type) => {
  //   const oldCount = this.state.films[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedFilms = {
  //     ...this.state.films
  //   };
  //   updatedFilms[type] = updatedCount;
  //   const priceAddition = FILM_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     totalPrice: newPrice,
  //     films: updatedFilms
  //   });
  //   this.updatePurchaseState(updatedFilms);
  // }

  // removeFilmHandler = (type) => {
  //   const oldCount = this.state.films[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedFilms = {
  //     ...this.state.films
  //   };
  //   updatedFilms[type] = updatedCount;
  //   const priceDeduction = FILM_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     totalPrice: newPrice,
  //     films: updatedFilms
  //   });
  //   this.updatePurchaseState(updatedFilms);
  // }

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
      this.props.history.push('/checkout');
  }

  // purchaseContinueHandler = () => {
  //   const queryParams = [];
  //   for (let i in this.state.films) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this
  //       .state.films[i]));
  //   }
  //   queryParams.push('price=' + this.state.totalPrice);
  //   const queryString = queryParams.join('&');
  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: '?' + queryString
  //   });
  // }


  render() {
    const disabledInfo = {
      ...this.state.flms
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let film = this.state.error ? <p>Films can't be loaded!</p> :
      <Spin />;

    if (this.props.flms) {
      film = (
        <Aux>
            <Film films={this.props.flms} />
            <Controls
              filmAdded={this.props.onFilmAdded}
              filmRemoved={this.props.onFilmRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.flms)}
              ordered={this.purchaseHandler}
              price={this.props.price} />
        </Aux>
      );

      orderSummary =
        <OrderSummary 
              films={this.props.flms}
              price={this.props.price}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}/>;
    }


    // if (this.state.films) {
    //   film = (
    //     <Aux>
    //         <Film films={this.state.films} />
    //         <Controls
    //           filmAdded={this.addFilmHandler}
    //           filmRemoved={this.removeFilmHandler}
    //           disabled={disabledInfo}
    //           purchasable={this.state.purchasable}
    //           ordered={this.purchaseHandler}
    //           price={this.state.totalPrice} />
    //     </Aux>
    //   );

      // orderSummary =
      //   <OrderSummary 
      //         films={this.state.films}
      //         price={this.state.totalPrice}
      //         purchaseCancelled={this.purchaseCancelHandler}
      //         purchaseContinued={this.purchaseContinueHandler}/>;
    // }

    if (this.state.loading) {
      orderSummary = <Spin />;
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
          {film}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
        flms: state.films,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFilmAdded: (flmName) => dispatch({type: actionTypes.ADD_FILM, filmName: flmName}),
        onFilmRemoved: (flmName) => dispatch({type: actionTypes.REMOVE_FILM, filmName: flmName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( FilmCase, axios ));
// export default withErrorHandler(FilmCase, axios);
