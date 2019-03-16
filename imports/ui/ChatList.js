import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { MentorPairs } from '../api/mentorpairs';
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
			console.log(myPairs);
			this.setState(myPairs ? {myPairs: myPairs} : {myPairs: []});
		});
	}
	componentWillUnmount() {
		this.pairTracker.stop();
	}
	renderCurrentChats() {
		return this.state.myPairs.map(pair => {
			return ( 
				<tr key={pair._id}>
					<td>{pair.MentorId}</td>
					<td>{pair.MenteeId}</td>
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
					<div className="card">
						<div className="card-body">
							<table className="table table-striped">
								<thead className="thead-dark">
									<tr>
										<th>Mentor</th>
										<th>Mentee</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{this.renderCurrentChats()}
								</tbody>
							</table>
						</div>
					</div>
					<Footer />
				</div>
			);
		}
		
	}
}