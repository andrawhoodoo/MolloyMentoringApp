import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import { Groups } from '../api/groups';
import { MentorPairs } from '../api/mentorpairs';

/**
 * React Component designed to return a table of the current user's group memberships.
 */
export default class ActiveGroups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: []
		};
	}
	/**
	 * Upon rendering the component, repeatedly queries the server for all the group data and pairing data to reflect a user's groups.
	 * Will update immediately upon new data being submitted to the server.
	 * Sets the component state to contain an array of all the user's groups.
	 */
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
	/**
	 * Upon exiting the page or leaving this component, ends the repetitive server queries.
	 */
	componentWillUnmount() {
		this.groupTracker.stop();
	}
	/**
	 * Helper function to push each element in a target array to another array
	 * @param {array} container - the destination array you wish to add items to.
	 * @param {array} target - the array which you wish to add all its components to the container.
	 */
	pushToArray(container, target) {
		target.forEach(item => {
			container.push(item);
		});
	}
	/**
	 * For each group in the Component's state, renders a table row with the particular group's information.
	 * Returns html table row.
	 */
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