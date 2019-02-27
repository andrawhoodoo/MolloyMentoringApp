import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

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
			const groupsArr = Groups.find().fetch();
			this.setState({groups: groupsArr});
		});
	}
	componentWillUnmount() {
		this.groupTracker.stop();
	}
	renderActiveGroupsItems() {
		return this.state.groups.map(group => {
			return (
				<tr key={group._id}>
					<td>{group.name}</td>
					<td>{group.mentorId}</td>
					<td>{group.menteeId}</td>
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
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th>Group Name</th>
									<th>MentorId</th>
									<th>MenteeId</th>
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