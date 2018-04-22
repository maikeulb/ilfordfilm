import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Logout extends Component {
    // redirect: false
  // }

  componentWillMount() {
    this.props.onAuth();
    // this.setState({ redirect: true })
  }

  render() {

    if (this.props.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <Spin />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( ) => dispatch( actions.startLogout() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Logout );
