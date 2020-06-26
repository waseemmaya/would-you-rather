import React, { Component } from "react";
import { Card, Row, Col, Button, Avatar } from "antd";
import user from "./../images/user.jpg";
import { withRouter } from "react-router-dom";

class QuestionCard extends Component {
  render() {
    const { question, type, users } = this.props;

    let avatarUrl = "";
    let currentUser = users.find((v) => v.id === question.author);

    avatarUrl = currentUser ? currentUser.avatarURL : user;

    return (
      <Card key={question.id} style={{ marginTop: 20 }}>
        <Row justify="space-between">
          <Col span={8}>
            <p>{question.author}</p>
            <Avatar src={avatarUrl} size={100} />

            {/* <img src={user} style={{ width: 200 }} alt={"userAvatar"} /> */}
          </Col>
          <Col span={8}>
            <div>
              <p>Would you rather</p>
              <p> {question.optionOne.text}...</p>
              <p>OR</p>
              <p>...</p>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ float: "right", marginTop: 100 }}>
              <Button
                onClick={() => {
                  if (type === "answered") {
                    this.props.history.push("/question", {
                      qid: question.id,
                    });
                  } else {
                    this.props.history.push("/question/" + question.id);
                  }
                }}
                type="primary"
              >
                {type === "answered" ? "Check Results" : "Answer"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(QuestionCard);
