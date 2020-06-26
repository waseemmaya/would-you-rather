import React, { Component } from "react";
import { Card, Tabs } from "antd";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { get_initial_data } from "../reducks/data";
import QuestionCard from "../components/QuestionCard";

const { TabPane } = Tabs;

class Home extends Component {
  componentDidMount() {
    this.props.get_initial_data();
  }
  render() {
    return (
      <div style={styles.bg}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="To Be Answered" key="1">
              {this.Tab1()}
            </TabPane>
            <TabPane tab="Already Answered" key="2">
              {this.Tab2()}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }

  Tab1 = () => {
    const { unAnswered } = this.props;

    if (!unAnswered) {
      return <Spinner marginTop={50} />;
    }

    return (
      <div>
        {unAnswered.map((question) => {
          let cardProps = {
            users: this.props.users,
            type: "unAnswered",
            question,
            key: question.id,
          };
          return <QuestionCard {...cardProps} />;
        })}
      </div>
    );
  };

  Tab2 = () => {
    const { answered } = this.props;

    if (!answered) {
      return <Spinner marginTop={50} />;
    }

    return (
      <div>
        {answered.map((question) => {
          let cardProps = {
            users: this.props.users,
            type: "answered",
            question,
            key: question.id,
          };
          return <QuestionCard {...cardProps} />;
        })}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  answered: state.data.answeredQuestion,
  unAnswered: state.data.unAnsweredQuestion,
  users: state.data.users,
});

export default connect(mapStateToProps, { get_initial_data })(Home);

const styles = {
  bg: {
    margin: "auto",
    width: "40%",
    marginTop: 50,
    // textAlign: "center",
  },
};
