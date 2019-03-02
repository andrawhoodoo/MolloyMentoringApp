import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Surveys from '../api/surveys';

export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			survey: ''
		}
	}
	componentDidMount() {
		this.surveyTracker = Tracker.autorun(() => {
			Meteor.subscribe('surveysData');
			const mySurvey = Surveys.find({_id: this.props.surveyId}).fetch();
			this.setState(mySurvey ? {survey: mySurvey} : {survey: ''});
		});
	}
	componentWillUnmount() {
		this.surveyTracker.stop();
	}
	renderQuestions() {
		return(
			<section>
				<h3> Mentoring App Survey </h3>
				<form>
					<p> 1.  What is your Gender? </p>
					<ul>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					</ul>
				</form>
			</section>
		);
	}
	render() {
		return (
			<div>
				{this.renderQuestions()}
			</div>
		);
	}
}