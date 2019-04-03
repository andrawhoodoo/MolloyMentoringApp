import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Surveys } from '../api/surveys';
import { Questions } from '../api/questions';
import { Options } from '../api/options';
import QuestionForm from './QuestionForm';

export default class CreateSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			surveyInfo: {
				title: '',
				author: this.userId,
				questions: []
			}
		}
	}
	componentDidMount() {
		const myArr = [];
		const qArr = [];
		Meteor.call('addOption', 'This is option 1', (err, result) => {
			myArr.push(result);
			Meteor.call('addOption', 'This is option 2', (err, result) => {
				myArr.push(result);
				Meteor.call('addQuestion', 'This is my question', myArr, 'limit', (err, result) => {
					qArr.push(result);	
					Meteor.call('addOption', 'This is a sample option', (err, result) => {
						myArr.push(result);
						Meteor.call('addQuestion', 'Here is another question', myArr, 'limit', (err, result) => {
							qArr.push(result);
							console.log(this.state.questions);
						});
					});
					
				});
			});
		});
		this.qTracker = Tracker.autorun(() => {
			this.setState({questions: qArr});
		})
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitSurvey(this.state.surveyInfo);
	}
	renderQuestionsSoFar() {
		return this.state.questions.map(questionId => {
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
	renderOptions(question) {
		const questionId = question._id;
		return question.options.map(optionId => {
			console.log(optionId)
			Meteor.subscribe('optionsData');
			const myOption = Options.findOne({_id: optionId});
			if(myOption) {
				return (
					<li key={optionId}>{myOption.text}</li>
				);

			}
		});
	}
    render() {
        return (
        	<div>
              	<div className="container">
                  	<form className="new-survey">
						<h3>Here's your work so far...</h3>
						{this.renderQuestionsSoFar()}
				  		<QuestionForm />
						<button onClick={this.handleSubmit.bind(this)}>Submit Your Survey!</button>					
                  	</form>
              	</div>
          	</div>
        );
    }
};
