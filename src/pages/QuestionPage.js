import React, { Component } from "react";
import { Card, Row, Col, Button, Avatar, Radio } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import user from "./../images/user.jpg";
import Spinner from "../components/Spinner";
import { save_answer, get_initial_data } from "../reducks/data";

class QuestionPage extends Component {
  state = {
    selectedValue: "",
  };

  onChange = (e) => {
    this.setState({
      selectedValue: e.target.value,
    });
  };

  handleSubmit = () => {
    const { selectedValue } = this.state;
    const { authUser } = this.props;
    let { qid } = this.props.match.params;

    let updateObj = {
      authedUser: authUser,
      qid,
      answer: selectedValue,
    };
    this.props.save_answer(updateObj);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.props.history.push("/");
      this.props.get_initial_data();
    }
  }

  render() {
    let { qid } = this.props.match.params;
    const { questions, users } = this.props;

    let question = questions && questions.find((q) => q.id === qid);

    if (!question) {
      return <Spinner />;
    }

    let avatarUrl = "";
    let currentUser = users.find((v) => v.id === question.author);

    avatarUrl = currentUser ? currentUser.avatarURL : user;

    return (
      <div style={styles.bg}>
        <Card key={question.id} style={{ marginTop: 20 }}>
          <Row justify="space-between">
            <Col span={8}>
              <p>{question.author}</p>
              <Avatar src={avatarUrl} size={100} />
            </Col>
            <Col span={8}>
              <div>
                <p>Would you rather</p>
                <div>
                  <Radio.Group
                    onChange={this.onChange}
                    value={this.state.selectedValue}
                  >
                    <Radio value={"optionOne"}>{question.optionOne.text}</Radio>
                    <p style={{ marginTop: 15 }}>OR</p>
                    <Radio value={"optionTwo"}>{question.optionTwo.text}</Radio>
                  </Radio.Group>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ float: "right", marginTop: 114 }}>
                <Button
                  loading={this.props.loading}
                  disabled={!this.state.selectedValue}
                  onClick={this.handleSubmit}
                  type="primary"
                >
                  Submit
                </Button>
              </div>
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
  authUser: state.auth.authUser,
});

export default withRouter(
  connect(mapStateToProps, { save_answer, get_initial_data })(QuestionPage)
);

const styles = {
  bg: {
    margin: "auto",
    width: "70%",
    marginTop: 50,
    // textAlign: "center",
  },
};
