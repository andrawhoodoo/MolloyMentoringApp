import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { ChatMessages } from '../api/chatmessages';
import { Profiles } from '../api/profiles';
import { Groups } from '../api/groups';
import NavBar from './NavBar';
import Footer from './Footer';
import MeteorChatInput from './MeteorChatInput';

export default class MeteorChatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			messages: [],
			group: ''
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
		this.groupTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			const myGroup = Groups.findOne({pairs: { $in: [this.props.mentorPairId]}});
			this.setState(myGroup ? {group: myGroup} : {group: ''});
		});
	}
	componentWillUnmount() {
		this.nameTracker.stop();
		this.convoTracker.stop();
		this.groupTracker.stop();
	}
	renderMessages() {
		return this.state.messages.map(message => {
			return (
				<div className="pt-2 border-bottom">
					<h4>{message.username}</h4>
					<p className="pb-0">{message.message}</p>
					<div className="small molloy-text font-italic text-right">{message.createdAt.toLocaleString()}</div>
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<NavBar />
				<h1 className="text-white bg-dark text-left px-5 py-2">Welcome to the Chatroom!</h1>
				<div className="container my-3">
					<h2 className="molloy-text font-weight-bold">{this.state.group.name}</h2>
					<div className="chatroom">
						{this.renderMessages()}
					</div>
					<MeteorChatInput mentorPairId={this.props.mentorPairId} username={this.state.username} />
				</div>
				<Footer />
			</div>
		);
	}
};