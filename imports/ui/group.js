import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Groups } from '../api/groups';
import Survey from './Survey';

export default class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			group: '',
			error: ''
		}
	}
	componentDidMount() {
		this.singleGroupTracker = Tracker.autorun(() => {
			Meteor.subscribe('groupsData');
			const myGroup = Groups.findOne({_id: this.props.id});
			this.setState(myGroup ? {group: myGroup} : {group: ''});
		});
	}
	componentWillUnmount() {
		this.singleGroupTracker.stop();
	}
	renderSurvey() {
		return (
			<Survey surveyId={this.state.group.surveyId} />
		);
	}
	render() {
		return (
			<div>
				<h1 className="font-weight-bold bg-dark text-white px-5 py-2">Group Discovery</h1>
				<div className="container">
					<div className="card mt-5">
						<div className="card-header">
							<h2>{this.state.group.name}</h2>
							{this.state.group &&  this.state.group.description ? <p className="lead font-italic">{this.state.group.description}</p> : undefined}
						</div>
						<div className="card-body">
							<p>Want to join? Pick a role & take the survey!</p>
							<ul className='list-unstyled'>
								<li><input type='radio' name='role' value="Mentor" />Mentor</li>
								<li><input type='radio' name='role' value="Mentee" />Mentee</li>
							</ul>
							<button onClick={this.renderSurvey.bind(this)}>Take Survey</button>
							{this.state.error ? <p className='text-danger font-weight-bold'>{this.state.error}</p> : undefined}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
