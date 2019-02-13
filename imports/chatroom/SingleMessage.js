import React from "react";

export default class SingleMessage extends React.Component {
  render() {
    return (
      <div className="fullMessage">
        <div className="username">{this.props.username}</div>
        <div className="messagebody">{this.props.message}</div>
      </div>
    );
  }
}
