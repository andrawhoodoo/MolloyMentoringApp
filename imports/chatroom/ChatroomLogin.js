import React from "react";
import NavBar from "../ui/NavBar";
import Chatroom from "./Chatroom";

export default class ChatroomLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const usernameDummy = this.props.username;
    const myInit = {
      method: "POST",
      body: JSON.stringify(usernameDummy),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const myRequest = new Request("http://localhost:3000/?#", myInit);

    fetch(myRequest)
      .then(() => {
        this.setState({ submitted: true, username: this.state.username });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    if (this.state.submitted) {
      return <Chatroom username={this.state.username} />;
    }
    return (
      <div>
        <NavBar />
        <div>Welcome to the Public Chatroom</div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder=" Name"
          />
          <input type="submit" value="Enter" />
        </form>
      </div>
    );
  }
}
