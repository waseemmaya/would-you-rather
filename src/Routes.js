import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { Layout, Button } from "antd";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { get_initial_data } from "./reducks/data";
import QuestionPage from "./pages/QuestionPage";
import { logout_user } from "./reducks/auth";

const { Header, Content } = Layout;

class Routes extends Component {
  render() {
    const { authUser } = this.props;

    return (
      <Router>
        <Switch>{!authUser ? this.AuthRoutes() : this.MainRoutes()}</Switch>
      </Router>
    );
  }

  AuthRoutes = () => {
    // return (
    //   <Redirect
    //     to={{
    //       pathname: "/",
    //     }}
    //   />
    // );
    return (
      <Content>
        <Route exact path="/">
          <Login />
        </Route>
      </Content>
    );
  };

  MainRoutes = () => {
    return (
      <>
        <Content>
          <Header>
            <Button
              onClick={() => {
                this.props.logout_user();
              }}
              type="default"
            >
              Logout
            </Button>
          </Header>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/question/:qid">
            <QuestionPage />
          </Route>
        </Content>
      </>
    );
  };

  componentDidMount() {
    this.props.get_initial_data();
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps, { get_initial_data, logout_user })(
  Routes
);
