import React from "react";

export default class SingleMessage extends React.Component {
  render() {
    return (
      <div className="fullMessage">
        <h5 className="username">{this.props.username}:</h5>
        <div className="messagebody">{this.props.message}</div>
      </div>
    );
  }
}
