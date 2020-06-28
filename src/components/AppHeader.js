import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";

const AppHeader = (props) => {
  const { authUser, logout_user } = props;
  return (
    <div>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/add">Add Question</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/leaderboard">Leaderboard</Link>
        </Menu.Item>
        <div style={{ float: "right" }}>
          <span style={{ marginRight: 20, fontSize: 14 }}>
            Current User : {authUser.toUpperCase()}
          </span>
          <Button
            onClick={() => {
              logout_user();
            }}
            type="default"
          >
            Logout
          </Button>
        </div>
      </Menu>
    </div>
  );
};

export default AppHeader;

// <div>
//       <Link to="/">
//           Home
//           </Link>
//       <Link to="/add">Add Question</Link>
//       <Link to="/leaderboard">Leaderboard</Link>
//       <Button
//         onClick={() => {
//           logout_user();
//         }}
//         type="default"
//       >
//         Logout
//       </Button>
//       <div>Current User : {authUser && authUser}</div>
