import React from "react";
import NavBar from "../NavBar";
import Chatroom from "./Chatroom";
import Footer from '../Footer';

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
		<h1 className='text-white py-2 text-center bg-dark'>Welcome to the Public Chatroom</h1>
		<div className='container'>
			<h3>Please Enter Your Name Here:</h3>
			<form onSubmit={this.handleSubmit} className="my-3">
			  <input
				type="text"
				value={this.state.username}
				onChange={this.handleChange}
				placeholder=" Name"
			  />
			  <input className="btn btn-danger" type="submit" value="Enter" />
			</form>
		</div>
		<Footer />
      </div>
    );
  }
}
