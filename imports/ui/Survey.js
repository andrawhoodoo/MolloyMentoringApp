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
			let qCounter = 0
			return this.state.survey.questions.map(questionId => {
				qCounter = qCounter + 1;
				let qOrder = "q" + qCounter;
				Meteor.subscribe('questionsData');
				const myQuestion = Questions.findOne({_id: questionId});
				if(myQuestion) {
					return (
						<div name={qOrder} questionId={questionId}>
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
		// TODO: Insert FOR loop to cycle through all questions.
		//			For now, assigning variables manually
		let qCounter = 1;
		let qOrder = "q" + qCounter;
		let questionId = document.getElementsByName(qOrder)[0].getAttribute("questionId");
		let selectionId = document.getElementsByName(questionId)[0].getAttribute("value");
		let roleInputs = target.role.value;
		let groupId = this.props.groupId;
		// Feedback for testing
		console.log("Question #" + qCounter + ": " + questionId);
		console.log("Selection ID: " + selectionId);
		console.log("Role: " + roleInputs);
		console.log("Group ID: " + groupId);
		// Write data to Groups DB
		if (roleInputs === "Mentor") {
			Meteor.call('addToMentorsPool', groupId);
		}
		else if (roleInputs === "Mentee") {
			Meteor.call('addToMenteesPool', groupId);
		}
		else {
			return 'error';
		}
		// Write data to Answers DB
		Meteor.subscribe('answersData');
		Meteor.call('addAnswer', this.props.surveyId, questionId, selectionId);
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
						<button className='btn btn-danger text-white' onClick={this.submitSurvey.bind(this)}>Submit Your Answers</button>
					</form>
				</section>
			</div>
		);
	}
}
