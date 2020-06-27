import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Button } from "antd";
import { add_question, get_initial_data } from "../reducks/data";

class Add extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.props.get_initial_data();
      this.props.history.push("/");
    }
  }

  handleSubmit = () => {
    const { optionOne, optionTwo } = this.state;
    const { currentUser } = this.props;

    let newQuestionPayload = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: currentUser,
    };
    this.props.add_question(newQuestionPayload);
  };
  render() {
    return (
      <div style={styles.bg}>
        <Card>
          <p>Would you rather...</p>
          <Input
            value={this.state.optionOne}
            onChange={(e) => {
              this.setState({
                optionOne: e.target.value,
              });
            }}
            size="large"
            placeholder="First option"
          />
          <br />
          <p style={{ textAlign: "center", marginTop: 15, marginBottom: 10 }}>
            OR
          </p>
          <Input
            value={this.state.optionTwo}
            onChange={(e) => {
              this.setState({
                optionTwo: e.target.value,
              });
            }}
            size="large"
            placeholder="Second option"
          />
          <br />
          <br />
          <Button
            loading={this.props.loading}
            disabled={!this.state.optionOne || !this.state.optionTwo}
            type="primary"
            onClick={this.handleSubmit}
          >
            Add question
          </Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.authUser,
  loading: state.data.loading,
});

export default connect(mapStateToProps, { add_question, get_initial_data })(
  Add
);

const styles = {
  bg: {
    margin: "auto",
    width: "70%",
    marginTop: 50,
    // textAlign: "center",
  },
};
