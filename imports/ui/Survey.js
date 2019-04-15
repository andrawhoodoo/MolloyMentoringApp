import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Surveys } from '../api/surveys';
import { Questions } from '../api/questions';
import { Options } from '../api/options';
import { Answers } from '../api/answers';
import { browserHistory } from '../routes/routes';

export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			survey: '',
			numQuestions: 0
		}
	}
	componentDidMount() {
		this.surveyTracker = Tracker.autorun(() => {
			Meteor.subscribe('surveysData');
			const mySurvey = Surveys.findOne({_id: this.props.surveyId});
			this.setState(mySurvey ? {survey: mySurvey} : {survey: ''});
			this.setState(mySurvey ? {numQuestions: mySurvey.questions.length} : {numQuestions: 0});
		});
		
	}
	componentWillUnmount() {
		this.surveyTracker.stop();
	}
	renderQuestions() {
		if(this.state.survey) {
			let qCounter = 0
			return this.state.survey.questions.map(questionId => {
				qCounter = qCounter + 1;
				let qOrder = "q" + qCounter;
				Meteor.subscribe('questionsData');
				const myQuestion = Questions.findOne({_id: questionId});
				if(myQuestion) {
					return (
						<div name={qOrder} questionid={questionId}>
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
		const questionId = question._id;
		return question.options.map(optionId => {
			Meteor.subscribe('optionsData');
			const myOption = Options.findOne({_id: optionId});
			if(myOption) {
				return (
					<li><input type ="radio" name={questionId} value={optionId} />{myOption.text}</li>
				);

			}
		});
	}

	submitSurvey(e) {
		e.preventDefault();
		const target = event.target.form;
		let roleInputs = target.role.value;
		let groupId = this.props.groupId;
		for(let i=1; i<this.state.numQuestions+1; i++) {
			let qOrder = "q" + i;
			let questionId = document.getElementsByName(qOrder)[0].getAttribute("questionid");
			let radios = document.getElementsByName(questionId);
			let selectionId = '';
			for(let i=0; i<radios.length; i++) {
				if(radios[i].checked) {
					selectionId = radios[i].value
				}
			}
			// Write data to Answers DB
			Meteor.call('addAnswer', this.props.surveyId, questionId, selectionId);
		}
		// Feedback for testing
		// Write data to Groups DB
		if (roleInputs === "Mentor") {
			Meteor.call('addToMentorsPool', groupId, (err, res) => {
				if(err) {
					return err.message;
				}
				else {
					browserHistory.replace('/home');
				}
			});
		}
		else if (roleInputs === "Mentee") {
			Meteor.call('addToMenteesPool', groupId, (err, res) => {
				if(err) {
					return err.message;
				}
				else {
					browserHistory.replace('/home');
				}
			});
		}
		else {
			return 'error';
		}
	}

	render() {
		return (
			<div>
				<section>
					<h3> Mentoring App Survey </h3>
					<form>
						<h5>Which role would you like to have for this group?</h5>
						<ul className='list-unstyled'>
							<li><input type='radio' name='role' value="Mentor" />Mentor</li>
							<li><input type='radio' name='role' value="Mentee" />Mentee</li>
						</ul>
						{this.renderQuestions()}
						<button className='btn molloy-button text-white' onClick={this.submitSurvey.bind(this)}>Submit Your Answers</button>
					</form>
				</section>
			</div>
		);
	}
}
