import React, { Component } from "react";
import { connect } from "react-redux";
import { get_initial_data } from "../reducks/data";
import LeaderboardCard from "../components/LeaderboardCard";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    return (
      <div style={styles.bg}>
        {users &&
          users.map((user, i) => (
            <LeaderboardCard key={i} user={user} {...this.props} />
          ))}
      </div>
    );
  }

  componentDidMount() {
    this.props.get_initial_data();
  }
}

const mapStateToProps = (state) => ({
  users: state.data.users,
  questions: state.data.questions,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps, { get_initial_data })(Leaderboard);

const styles = {
  bg: {
    margin: "auto",
    width: "70%",
    marginTop: 50,
    // textAlign: "center",
  },
};
