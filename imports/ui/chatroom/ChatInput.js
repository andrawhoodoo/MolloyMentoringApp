import React from "react";
import Messages from "./Messages";

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ chatInput: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSend(this.state.chatInput);
    this.setState({ chatInput: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='my-3'>
        <input
          type="text"
          value={this.state.chatInput}
          onChange={this.handleChange}
          placeholder=" Message "
        />
        <input className="btn btn-danger" type="submit" value="Send" />
      </form>
    );
  }
}
