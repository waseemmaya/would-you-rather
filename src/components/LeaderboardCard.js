import React, { Component } from "react";
import { Card, Row, Col, Avatar } from "antd";
import userImg from "./../images/user.jpg";
import { withRouter } from "react-router-dom";

class LeaderboardCard extends Component {
  render() {
    const { user } = this.props;

    let questionAnswered = Object.keys(user.answers).length;
    let questionAsked = user.questions.length;
    let avatarUrl = user ? user.avatarURL : userImg;

    return (
      <Card key={user.id} style={{ marginTop: 20 }}>
        <Row justify="space-between">
          <Col span={8}>
            <p>{user.name}</p>
            <Avatar src={avatarUrl} size={100} />
          </Col>
          <Col span={8}>
            <p>Question Asked : {questionAsked}</p>
            <p>Question Answered : {questionAnswered}</p>
          </Col>
          <Col span={8}>Total : {questionAnswered + questionAsked}</Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(LeaderboardCard);
