import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class ChatInput extends React.Component {
	constructor(props) {
		super(props);
	}
	handleSubmit(e) {
		e.preventDefault();
		let message = this.refs.message.value.trim();
		Meteor.call('insertMessage', this.props.mentorPairId, this.props.username, message);
		this.refs.message.value = '';
	}
	render() {
		return (
			<div className='my-3'>
				<input
				  type="text"
				  placeholder=" Message "
				  ref="message"
				/>
				<button className="btn btn-danger" onClick={this.handleSubmit.bind(this)}>Submit</button>
			</div>
		);
	}
}