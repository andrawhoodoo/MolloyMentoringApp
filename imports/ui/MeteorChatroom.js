import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { ChatMessages } from '../api/chatmessages';
import { Profiles } from '../api/profiles';
import NavBar from './NavBar';
import Footer from './Footer';
import MeteorChatInput from './MeteorChatInput';

export default class MeteorChatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			messages: []
		}
	}
	componentDidMount() {
		this.nameTracker = Tracker.autorun(() =>{
			Meteor.subscribe('profileData');
		  	const profiles = Profiles.find().fetch();
		  	this.setState(profiles[0] ? {username: profiles[0].name.first} : {username: ''});
		});
		this.convoTracker = Tracker.autorun(() => {
			Meteor.subscribe('Conversations', this.props.mentorPairId);
			const messages = ChatMessages.find().fetch();
			this.setState(messages ? {messages: messages} : {messages: []})
		});
	}
	componentWillUnmount() {
		this.nameTracker.stop();
		this.convoTracker.stop();
	}
	renderMessages() {
		return this.state.messages.map(message => {
			return (
				<div className="border-bottom">
					<h4>{message.username}</h4>
					<p className="pb-0">{message.message}</p>
					<div className="small text-danger font-italic text-right">{message.createdAt.toLocaleString()}</div>
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<NavBar />
				<h1 className="text-white bg-dark text-left px-5 py-2">Welcome to the Chatroom!</h1>
				<div className="container">
					<div className="col col-lg-8 col-md-6">
						{this.renderMessages()}
						<MeteorChatInput mentorPairId={this.props.mentorPairId} username={this.state.username} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};