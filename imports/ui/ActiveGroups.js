import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import { Groups } from '../api/groups';

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
			const menteeGroups = Groups.find({mentees_pool: Meteor.userId()}).fetch();
			const mentorGroups = Groups.find({mentors_pool: Meteor.userId()}).fetch();
			const matchedGroups1 = Groups.find({pairs: {mentorId: Meteor.userId()}}).fetch();
			const matchedGroups2 = Groups.find({pairs: {menteeId: Meteor.userId()}}).fetch();
			const groupsArr = [];
			this.pushToArray(groupsArr, menteeGroups);
			this.pushToArray(groupsArr, mentorGroups);
			this.pushToArray(groupsArr, matchedGroups1);
			this.pushToArray(groupsArr, matchedGroups2);
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
					<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
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
									<th></th>
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