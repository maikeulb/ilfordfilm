import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';

import Film from '../../components/Film/Film';
import Controls from '../../components/Film/Controls/Controls';
import OrderSummary from '../../components/Film/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import { Modal, Spin } from 'antd';

class FilmCase extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitFilms();
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
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState( { purchasing: true } );
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.flms
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
              isAuth={this.props.isAuthenticated}
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
    flms: state.filmCase.films,
    price: state.filmCase.totalPrice,
    error: state.filmCase.error,
    isAuthenticated: state.auth.user !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFilmAdded: (flmName) => dispatch(actions.addFilm(flmName)),
    onFilmRemoved: (flmName) => dispatch(actions.removeFilm(flmName)),
    onInitFilms: () => dispatch(actions.initFilms()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( FilmCase, axios ));
