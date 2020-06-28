import React, { Component } from "react";
import { Card, Row, Col, Avatar, Progress, Divider } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import user from "./../images/user.jpg";
import Spinner from "../components/Spinner";
import { get_initial_data } from "../reducks/data";

class QuestionResult extends Component {
  render() {
    const { questions, users } = this.props;
    let { qid } = this.props.match.params;

    let question = questions && questions.find((q) => q.id === qid);

    if (!question) {
      return <Spinner />;
    }

    let avatarUrl = "";
    let currentUser = users.find((v) => v.id === question.author);

    avatarUrl = currentUser ? currentUser.avatarURL : user;

    let results = [question.optionOne, question.optionTwo];

    let total = question.optionOne.votes.concat(question.optionTwo.votes)
      .length;

    return (
      <div style={styles.bg}>
        <Card key={question.id} style={{ marginTop: 20 }}>
          <Row justify="space-between">
            <Col span={4}>
              <p>{question.author}</p>
              <Avatar src={avatarUrl} size={100} />
            </Col>
            <Col span={20}>
              <Card>
                {results.map((v, i) => {
                  let voteLength = v.votes.length;
                  let percent = (voteLength / total) * 100;

                  percent = Math.round(percent);
                  return (
                    <>
                      <Row key={i}>
                        <Col span={8}>{i + 1} -</Col>
                        <Col span={8}>{v.text}</Col>
                        <Col span={8}>
                          <Progress percent={percent} status="active" />
                          {voteLength} out of {total}
                        </Col>
                      </Row>
                      {i !== results.length - 1 && <Divider />}
                    </>
                  );
                })}
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.data.questions,
  users: state.data.users,
  loading: state.data.loading,
});

export default withRouter(
  connect(mapStateToProps, { get_initial_data })(QuestionResult)
);

const styles = {
  bg: {
    margin: "auto",
    width: "70%",
    marginTop: 50,
    // textAlign: "center",
  },
};
