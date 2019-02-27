import React from "react";
import NavBar from "../ui/NavBar";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    this.appendMessage = this.appendMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  appendMessage(message) {
    this.setState({
      messages: this.state.messages.concat(message)
    });
  }

  handleSend(message) {
    const fullMessage = {
      username: this.props.username,
      message
    };
    const myInit = {
      method: "POST",
      body: JSON.stringify({ message: "" })
    };
    const myRequest = new Request(
      "http://localhost:8000/" +
        JSON.stringify(fullMessage.username) +
        JSON.stringify(fullMessage.message),
      myInit
    );

    fetch(myRequest)
      .then(response => {
        console.log("Message Recieved");
        return response.text();
        //console.log(response.text());
      })
      .then(text => {
        console.log("Message Appended");
        console.log(JSON.stringify(text));
        const newMessage = { message: text };
        this.appendMessage(newMessage);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div>Welcome {this.props.username}</div>
        <ChatInput onSend={this.handleSend} />
        <Messages messages={this.state.messages} />
      </div>
    );
  }
}
