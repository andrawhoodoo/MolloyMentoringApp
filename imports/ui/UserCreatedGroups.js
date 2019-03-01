import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import { Groups } from '../api/groups';

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
	renderActiveGroupsItems() {
		return this.state.groups.map(group => {
			return (
				<tr key={group._id}>
					<td className="font-weight-bold">{group.name}</td>
					<td className="font-italic">{group.description}</td>
					<td><a href="#" className="btn btn-danger text-white">Match New Users!</a></td>
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