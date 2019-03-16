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
			<form onSubmit={this.handleSubmit.bind(this)} className='my-3'>
				<div className="input-group"> 
					<input
					  type="text"
					  placeholder=" Message "
					  ref="message"
					/>
					<input className="btn btn-danger" type="submit" value="Submit" />
				</div>
			</form>
		);
	}
}