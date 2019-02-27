import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Groups } from '../api/groups';
import NavBar from './NavBar';
import Footer from './Footer';

export default class GroupSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: []
		}
	}
	componentDidMount() {
		let groupsTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			const groupSub = Groups.find().fetch();
			this.setState(groupSub ? {groups: groupSub} : {groups: []});
		})
	}
	componentWillUnmount() {
		this.groupsTracker.stop();
	}
	renderGroups() {
		return this.state.groups.map(group => {
			return (
				<tr key={group._id}>
					<td>{group.name}</td>
					<td><button className="btn btn-danger"><Link</td>
				</tr>
			);
		});
	}
	render() {
		<div>
			<Navbar />
			<section id="group-search" className='text-secondary mt-3'>
				<div className='container'>
					<div className="card mb-4">
						<div className="card-header">
							<h3>Search for a group!</h3>
						</div>
						<div className='card-body'>
							<table className="table table-striped">
								<thead className="thead-dark">
									<tr>
										<th>Group Name</th>
										<th></th>
									</tr>
								<tbody>
									{this.renderGroups()}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		<div>
	}
}