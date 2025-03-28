import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "../appContext";
import { ConstantsList } from "../appConfig";
class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      authenticated: true,
      routes
    };
  }

  componentDidMount() {
    // if (!this.state.authenticated) {
    //   this.redirectRoute(this.props);
    // }
  }

  componentDidUpdate() {
    // if (!this.state.authenticated) {
    //   this.redirectRoute(this.props);
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return nextState.authenticated !== this.state.authenticated;
  }

  static getDerivedStateFromProps(props, state) {
    const { location, user } = props;
    const { pathname } = location;
    const matched = state.routes.find(r => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.role)
        : true;

    return {
      authenticated
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;

    history.push({
      //pathname: ConstantsList.ROOT_PATH + "session/signin",
      pathname: ConstantsList.HOME_PAGE,
      state: { redirectUrl: pathname }
    });
  }

  render() {
    let { children } = this.props;
    const { authenticated } = this.state;

     return <Fragment>{children}</Fragment>;

    //return authenticated ? <Fragment>{children}</Fragment> : null;
  }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
