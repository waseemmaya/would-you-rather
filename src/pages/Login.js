import React, { Component } from "react";
import { Card, Select } from "antd";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { login_user } from "../reducks/auth";

const { Option } = Select;

class Login extends Component {
  onChange = (user) => {
    this.props.login_user(user);
  };

  render() {
    const { users } = this.props;

    if (!users) {
      return <Spinner />;
    }

    return (
      <div style={styles.bg}>
        <Card style={styles.card} title="Welcome to Would You Rather!">
          <p>Login to continue</p>
          <Select
            showSearch
            style={{ width: "100%", margin: "auto 0" }}
            placeholder="Select a person to login"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {users.map((v) => {
              return (
                <Option key={v.id} value={v.id}>
                  {v.name}
                </Option>
              );
            })}
          </Select>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.data.users,
});

export default connect(mapStateToProps, { login_user })(Login);

const styles = {
  card: {
    margin: "auto",
    width: "25%",
    marginTop: 200,
    padding: 10,
  },
  bg: {
    backgroundColor: "#ececec",
  },
};
