import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Surveys } from '../api/surveys';
import { Questions } from '../api/questions';
import { Options } from '../api/options';
import { Answers } from '../api/answers';

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
			const mySurvey = Surveys.findOne({_id: this.props.surveyId});
			this.setState(mySurvey ? {survey: mySurvey} : {survey: ''});
		});
	}
	componentWillUnmount() {
		this.surveyTracker.stop();
	}
	renderQuestions() {
		console.log(this.state.survey.questions);
		if(this.state.survey) {
			return this.state.survey.questions.map(questionId => {
				Meteor.subscribe('questionsData');
				const myQuestion = Questions.findOne({_id: questionId});
				if(myQuestion) {
					return (
						<div key={questionId}>
							<p>{myQuestion.text}</p>
							<ol>
							{this.renderOptions(myQuestion)}
							</ol>
						</div>
					);
				}
			});
		} 
		
		
	}
	renderOptions(question) {
		return question.options.map(optionId => {
			Meteor.subscribe('optionsData');
			const myOption = Options.findOne({_id: optionId});
			if(myOption) {
				return (
					<li key={optionId}><input type ="radio" value={optionId} />{myOption.text}</li>
				);
			}
			
		});
	}
	submitSurvey() {
		return 'foo'
	}
	render() {
		return (
			<div>
				<section>
					<h3> Mentoring App Survey </h3>
					<form>
						{this.renderQuestions()}
						<button className='btn btn-danger text-white' onClick={this.submitSurvey.bind(this)}>Submit Your Answers</button>
					</form>
				</section>
			</div>
		);
	}
}