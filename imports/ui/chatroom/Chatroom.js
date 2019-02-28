import React from "react";
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import NavBar from "../NavBar";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import Footer from '../Footer';
import { Profiles } from '../../api/profiles';

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		username: '',
		messages: []
	};

    this.appendMessage = this.appendMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount() {
	  this.nameTracker = Tracker.autorun(() =>{
		  Meteor.subscribe('profileData');
		  const profiles = Profiles.find().fetch();
		  this.setState(profiles[0] ? {username: profiles[0].name.first} : {username: ''});
	  });
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
    const fullMessage = {
      username: this.state.username,
      message
    };
    const messagesDummy = this.props.messages;
    const myInit = {
      method: "POST",
      body: JSON.stringify(messagesDummy),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const myRequest = new Request("http://localhost:3000/?#", myInit);
    fetch(myRequest)
      .then(() => {
        this.appendMessage(fullMessage);
      })
      .then(() => {
        console.log(this.state.messages);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div>
        <NavBar />
		<h1 className="text-white bg-dark text-left px-5 py-2">Welcome to the Chatroom!</h1>
		<div className="container">
			<Messages className="mb-3" messages={this.state.messages} />
			<ChatInput onSend={this.handleSend} />
		</div>
		<Footer />
      </div>
    );
  }
}
