import React from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import NavBar from "../NavBar";
import ChatInput from "./ChatInput";
import Footer from "../Footer";
import { Profiles } from "../../api/profiles";

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      messages: []
    };

    this.appendMessage = this.appendMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount() {
    this.nameTracker = Tracker.autorun(() => {
      Meteor.subscribe("profileData");
      const profiles = Profiles.find().fetch();
      this.setState(
        profiles[0] ? { username: profiles[0].name.first } : { username: "" }
      );
    });

    /*const myInit = {
      method: "POST",
      body: { fullMessage },
      header: { "Content-Type": "application/json" }
    };
    const myRequest = new Request("http://localhost:8000/", myInit);
    fetch(myRequest)
      .then(response => {
        return response.body;
        //this.appendMessage(response.body);
      })
      .then(data => {
        console.log(JSON.stringify(data));
        this.appendMessage(JSON.stringify(data));
        console.log(this.state.messages);
      })
      .catch(error => {
        console.error("Error:", error);
      });*/
  }
  componentWillUnmount() {
    this.nameTracker.stop();
  }

  appendMessage(message) {
    this.setState({
      messages: this.state.messages.concat(message)
    });
  }

  handleSend(message) {
    const fullMessage = { fullMessage: this.state.username + ": " + message };
    const myInit = {
      method: "POST",
      body: JSON.stringify(fullMessage),
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*"
      }
    };
    const myRequest = new Request("http://localhost:8000/", myInit);

    fetch(myRequest)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.fullMessage);
        this.appendMessage(data.fullMessage);
        console.log(this.state.messages);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  renderMessages() {
    return this.state.messages.map(message => {
      return (
        <div className='message-group'>
          <h5>{this.state.username}: </h5>
          <p>{message}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <NavBar />
        <h1 className="text-white bg-dark text-left px-5 py-2">
          Welcome to the Chatroom!
        </h1>
        <div className="container">
          <div>{this.renderMessages()}</div>
          <ChatInput onSend={this.handleSend} />
        </div>
        <Footer />
      </div>
    );
  }
}
