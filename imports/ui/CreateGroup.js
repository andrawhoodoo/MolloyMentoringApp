import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';
import { browserHistory } from '../routes/routes';
import CreateSurvey from './CreateSurvey';
import { Groups } from '../api/groups';

export default class CreateGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			surveyId: ''
		}
	}
	componentDidMount() {	
	}
	submitGroup(e) {
		const groupName = this.refs.groupName.value.trim()
		const description = this.refs.groupDescription.value.trim()
		if(this.state.surveyId) {
			Meteor.call('createGroup', groupName, this.state.surveyId, description);
			browserHistory.replace('/home');
		}
		else {
			throw new Meteor.Error('must first submit a survey before creating a group!');
		}
	}
	submitSurvey(questions) {
		Meteor.call('addSurvey', questions, (err,res) => {
			this.setState({surveyId: res});
		});
	}
	render() {
		if(this.state.surveyId) {
			return (
				<div>
					<NavBar />
					<h1 className='bg-dark text-white font-italic'>Group Creation Center</h1>
					<div className="container mb-3">
						<form>
							<ul className="list-unstyled">
								<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Group Name</span></div><input className="form-control" type="text" ref="groupName" /></div></li>

								<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Group Description</span></div><input className="form-control" type="text" ref="groupDescription" placeholder="(optional)" /></div></li>
							</ul>
						</form>
						<div className="bg-dark text-white">
							<h4 className="text-success">Survey Submitted!</h4>
							<button className="btn btn-block molloy-button" onClick={this.submitGroup.bind(this)}>Create Your New Group</button>
						</div>
					</div>
					<Footer />
				</div>
			);
		}
		else {
			return (
				<div>
					<NavBar />
					<h1 className='bg-dark text-white font-italic'>Group Creation Center</h1>
					<div className="container mb-3">
						<form>
							<ul className="list-unstyled">
								<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Group Name</span></div><input className="form-control" type="text" ref="groupName" /></div></li>

								<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Group Description</span></div><input className="form-control" type="text" ref="groupDescription" placeholder="(optional)" /></div></li>
							</ul>
						</form>
						<div className="bg-dark text-white">
							<CreateSurvey submitSurvey={this.submitSurvey.bind(this)} />
						</div>
					</div>
					<Footer />
				</div>
			);
		}
	}
}