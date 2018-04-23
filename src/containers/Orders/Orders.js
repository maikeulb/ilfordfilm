import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc//withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import { Spin } from 'antd';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.userId);
  }

  // state = {
  //   orders: [],
  //   loading: true
  // }

  // componentDidMount() {
  //   axios.get('/orders.json')
  //     .then(res => {
  //       const fetchedOrders = [];
  //       for (let key in res.data) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key
  //         });
  //       }
  //       this.setState({
  //         loading: false,
  //         orders: fetchedOrders
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         loading: false
  //       });
  //     });
  // }

  render() {
    let orders = <Spin />;
    if ( !this.props.loading ) {
      orders = this.props.orders.map( order => (
        <Order 
          key={order.id}
          films={order.films}
          price={order.price} />
     ) )
    }
    return (
      <div>
        {orders}
      </div>
     );
   }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        user: state.auth.user,
        userId: state.auth.user.uid
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userId) => dispatch( actions.fetchOrders(userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );

