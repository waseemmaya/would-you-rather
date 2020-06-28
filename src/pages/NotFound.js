import React, { Component } from "react";
import { Card, Button } from "antd";
import { withRouter } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div style={styles.bg}>
        <Card
          style={styles.card}
          title="Requested route not found OR you are not logged in to access this page!"
        >
          {/* <p></p> */}
          <Button onClick={() => this.props.history.push("/")}>
            Back to Main page
          </Button>
        </Card>
      </div>
    );
  }
}
export default withRouter(NotFound);

const styles = {
  card: {
    margin: "auto",
    width: "50%",
    marginTop: 200,
    padding: 10,
  },
  bg: {
    backgroundColor: "#ececec",
  },
};
