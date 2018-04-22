import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { app, googleProvider } from '../../firebase'
import { startLogin } from './../actions/auth';
import * as actions from '../../store/actions/index';

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithGoogle = this.authWithGoogle.bind(this)
    this.state = {
      redirect: false
    }
  }

  authWithGoogle() {
    app.auth().signInWithPopup(googleProvider)
      .then((user, error) => {
        if (error) {
        } else {
          console.log('logged in')
          this.props.onAuth()
          this.setState({ redirect: true })
        }
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }

    return (
      <div style={loginStyles}>
        <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithGoogle() }}>Log In with Google</button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( ) => dispatch( actions.auth() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );
