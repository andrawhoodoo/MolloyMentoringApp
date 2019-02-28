import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/Tracker';

import { Groups } from '../api/groups';

export default class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			group: ''
		}
	}
	componentDidMount() {
		this.singleGroupTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			const myGroup = Groups.find({_id: this.props.id}).fetch();
			this.setState(myGroup ? {group: myGroup} : {group: ''});
		});
	}
	componentWillUnmount() {
		this.singleGroupTracker.stop();
	}
	render() {
		return (
			<div>
				<h1>{this.state.group.name}</h1>
				{this.state.group.description ? return <p className="lead">{this.state.group.description}</p> : undefined}
				<div>
					<p>Want to join? Pick a role & take the survey!</p>
					<ul>
						<li><input type='radio' name='role' value="Mentor">Mentor</li>
						<li><input type='radio' name='role' value="Mentee">Mentee</li>
					</ul>
					<button>Take Survey</button>
				</div>
			</div>
		);
	}
}