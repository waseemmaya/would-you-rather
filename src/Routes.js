import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { get_initial_data } from "./reducks/data";
import QuestionPage from "./pages/QuestionPage";
import { logout_user } from "./reducks/auth";
import QuestionResult from "./pages/QuestionResult";
import Leaderboard from "./pages/Leaderboard";
import Add from "./pages/Add";
import AppHeader from "./components/AppHeader";

const { Header, Content } = Layout;

class Routes extends Component {
  render() {
    const { authUser } = this.props;

    return <Router>{!authUser ? this.AuthRoutes() : this.MainRoutes()}</Router>;
  }

  AuthRoutes = () => {
    return (
      <Content>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Content>
    );
  };

  MainRoutes = () => {
    return (
      <>
        <Content>
          <Header>
            <AppHeader {...this.props} />
          </Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/question/:qid" component={QuestionPage} />
            <Route
              exact
              path="/questionResult/:qid"
              component={QuestionResult}
            />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/add" component={Add} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
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
