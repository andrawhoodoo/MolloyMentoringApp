import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Groups } from '../api/groups';
import Group from './Group';
import NavBar from './NavBar';
import Footer from './Footer';

export default class GroupSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			groups: []
		}
	}
	componentDidMount() {
		this.groupsTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			const groupSub = Groups.find().fetch();
			this.setState(groupSub ? {groups: groupSub} : {groups: []});
		})
	}
	componentWillUnmount() {
		this.groupsTracker.stop();
	}
	startSearch(id) {
		this.setState({search: id});		
	}
	renderGroupsList() {
		return this.state.groups.map(group => {
			const id = group._id;
			return (
				<tr key={id}>
					<td>{group.name}</td>
					<td><button className="btn btn-danger" onClick={this.startSearch.bind(this, id)}>Look at group</button></td>
				</tr>
			);
		});
	}
	back() {
		this.setState({search: ''});
	}
	render() {
		if(this.state.search !== '') {
			return (
				<div>
					<NavBar />
					<Group id={this.state.search} />
					<div className="container">
						<button className="btn btn-lg btn-dark text-white my-5" onClick={this.back.bind(this)}>Return to List</button>
					</div>
					<Footer />
				</div>
			);
		}
		else {
			return (
				<div>
					<NavBar />
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
										</thead>
										<tbody>
											{this.renderGroupsList()}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
			);
		}
		
	}
}