import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { MentorPairs } from '../api/mentorpairs';
import { Profiles } from '../api/profiles';
import { Groups } from '../api/groups';
import MeteorChatroom from './MeteorChatroom';
import NavBar from './NavBar';
import Footer from './Footer';

export default class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myPairs: [],
			isInChatroom: false,
			currentChat: ''
		}
	}
	componentDidMount() {
		this.pairTracker = Tracker.autorun(() => {
			Meteor.subscribe('myPairings');
			const myPairs = MentorPairs.find().fetch();
			this.setState(myPairs ? {myPairs: myPairs} : {myPairs: []});
		});
		this.namesTracker = Tracker.autorun(() => {
			Meteor.subscribe('getName');
		})
		this.groupTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
		});
	}
	componentWillUnmount() {
		this.pairTracker.stop();
		this.namesTracker.stop();
		this.groupTracker.stop();
	}
	renderCurrentChats() {
		return this.state.myPairs.map(pair => {
			let MentorName = '';
			let MenteeName = '';
			let GroupName = '';
			const Mentor = Profiles.findOne({_id: pair.MentorId});
			const Mentee = Profiles.findOne({_id: pair.MenteeId});
			const myGroup = Groups.findOne({pairs: { $in: [pair._id]}});
			if(Mentor) {
				MentorName = Mentor.name.first;
			}
			if(Mentee) {
				MenteeName = Mentee.name.first;
			}
			if(myGroup) {
				GroupName = myGroup.name;
			}
			return ( 
				<tr key={pair._id}>
					<td>{MentorName}</td>
					<td>{MenteeName}</td>
					<td>{GroupName}</td>
					<td><button className="btn btn-danger text-white" onClick={() => this.goToChatroom(pair._id)}>Go To Chat</button></td>
				</tr>
			);
		})
	}
	goToChatroom(id) {
		this.setState({currentChat: id});
		this.setState({isInChatroom: true});
	}
	render() {
		if(this.state.isInChatroom) {
			return (
				<MeteorChatroom mentorPairId={this.state.currentChat} />
			);
		}
		else {
			return (
				<div>
					<NavBar />
					<div className="container">
						<div className="card my-3">
							<div className="card-header bg-dark text-white">
								<h2>Explore Your Current Chatrooms!</h2>
							</div>
							<div className="card-body">
								<table className="table table-striped">
									<thead className="thead-dark">
										<tr>
											<th>Mentor</th>
											<th>Mentee</th>
											<th>Topic</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{this.renderCurrentChats()}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			);
		}
		
	}
}