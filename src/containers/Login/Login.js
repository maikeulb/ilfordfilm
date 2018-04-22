import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
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

  componentDidMount() {
      if (!this.props.preparingFilmCase && this.props.authRedirectPath !== '/') {
          this.props.onSetAuthRedirectPath();
      }
  }

  authWithGoogle() {
    this.props.onAuth();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div style={loginStyles}>
        {authRedirect}
        <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithGoogle() }}>Log In with Google</button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null,
    authRedirectPath: state.auth.authRedirectPath,
    preparingFilmCase: state.filmCase.preparing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( ) => dispatch( actions.startLogin() ),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );
