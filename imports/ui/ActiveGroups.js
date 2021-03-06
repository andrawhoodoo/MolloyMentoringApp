import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import { Groups } from '../api/groups';
import { MentorPairs } from '../api/mentorpairs';

export default class ActiveGroups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: []
		};
	}
	componentDidMount() {
		this.groupTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			Meteor.subscribe('myPairings');
			const menteeGroups = Groups.find({mentees_pool: Meteor.userId()}).fetch();
			const mentorGroups = Groups.find({mentors_pool: Meteor.userId()}).fetch();
			{/* need to alter these matched groups to reflect active groups*/}
			const myPairs = MentorPairs.find().fetch();
			console.log(myPairs);
			let matchedGroups = [];
			const findPairGroups = (arr) => {
				arr.forEach(obj => {
					let currentGroup = Groups.findOne({pairs: obj._id});
					matchedGroups.push(currentGroup);
				});
			}
			findPairGroups(myPairs);
			console.log(matchedGroups);
			const groupsArr = [];
			this.pushToArray(groupsArr, menteeGroups);
			this.pushToArray(groupsArr, mentorGroups);
			this.pushToArray(groupsArr, matchedGroups);
			this.setState({groups: groupsArr});
		});
	}
	componentWillUnmount() {
		this.groupTracker.stop();
	}
	pushToArray(container, target) {
		target.forEach(item => {
			container.push(item);
		});
	}
	renderActiveGroupsItems() {
		return this.state.groups.map(group => {
			return (
				<tr key={group._id}>
					<td className="font-weight-bold">{group.name}</td>
					<td className="font-italic">{group.description}</td>
				</tr>
			);
		});
	}
	render() {
		return (
			<div className="container">
				<div className="card mb-4">
					<div className="card-header">
						<h3>Your Active Groups</h3>
					</div>
					<div className='card-body'>
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th>Group Name</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{this.renderActiveGroupsItems()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}