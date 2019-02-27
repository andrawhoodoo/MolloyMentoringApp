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
	renderPossibleGroups() {
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
		<div>
			<Navbar />
			<section id="group-search" className='text-secondary mt-3'>
				<div className='container'>
					
				</div>
			</section>
			<Footer />
		<div>
	}
}