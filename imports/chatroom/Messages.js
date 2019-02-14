import React from "react";
import SingleMessage from "./SingleMessage";

export default class Messages extends React.Component {
  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <SingleMessage
          key={i}
          username={message.username}
          message={message.message}
        />
      );
    });
    return (
      <div className="messages" id="messageList">
        {messages}
      </div>
    );
  }
}
