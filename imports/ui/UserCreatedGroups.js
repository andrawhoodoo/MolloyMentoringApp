import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import { Groups } from '../api/groups';
import { pair } from '../Algorithim/pairingAlgo';
import { scoreGroupMembers } from '../Algorithim/Score';

export default class UserCreatedGroups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: []
		};
	}
	componentDidMount() {
		this.groupTracker = Tracker.autorun(() => {
			Meteor.subscribe('createdGroupsData', Meteor.userId());
			const groupsArr = Groups.find({adminId: Meteor.userId()}).fetch();
			this.setState({groups: groupsArr});
		});
	}
	componentWillUnmount() {
		this.groupTracker.stop();
	}
	runPairs(id) {
		console.log('in run pairs');
		scoreGroupMembers(id);
		pair(id);
	}
	renderActiveGroupsItems() {
		return this.state.groups.map(group => {
			return (
				<tr key={group._id}>
					<td className="font-weight-bold">{group.name}</td>
					<td className="font-italic">{group.description}</td>
					<td><button onClick={() => this.runPairs(group._id)} className="btn molloy-button text-white">Match New Users!</button></td>
				</tr>
			);
		});
	}
	render() {
		return (
			<div className="container">
				<div className="card mb-4">
					<div className="card-header">
						<h3>Groups you run</h3>
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