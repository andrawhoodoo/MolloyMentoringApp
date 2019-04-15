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
			questions: []
		}
	}
	componentDidMount() {
		this.questionTracker = Tracker.autorun(() => {
			Meteor.subscribe('questionsData');
		});
		this.optionsTracker = Tracker.autorun(() => {
			Meteor.subscribe('optionsData');
		});
	}
	componentWillUnmount() {
		this.questionTracker.stop();
		this.optionsTracker.stop();
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitSurvey(this.state.questions);
	}
	submitQuestion(optArr, questionTitle) {
		let options = [];
		let numOfOptions = 0;
		for(let i=0; i < optArr.length; i++) {
			Meteor.call('addOption', optArr[i].value, (err, res) => {
				options.push(res);
				numOfOptions++;
				if(numOfOptions === optArr.length) {
					Meteor.call('addQuestion', questionTitle, options, (err, res) => {
						this.state.questions.push(res);
						this.setState({questions: this.state.questions});
						console.log(this.state.questions);
					})
				}
			});
		}
	}
	renderSubmittedQs() {
		return this.state.questions.map(qId => {
			const currentQuestion = Questions.findOne({_id: qId});
			return (
				<li key={qId}>
					<p>{currentQuestion.text}</p>
					<ul>
						{this.renderOptions(currentQuestion.options)}
					</ul>
				</li>
			);
		});
	}
	renderOptions(optionsArray) {
		return optionsArray.map(opId => {
			let currentOption = Options.findOne({_id: opId});
			return (
				<li key={opId}>{currentOption.text}</li>
			);
		});
	}
	progressHandler() {
		if(this.state.questions.length > 0) {
			return <ol>{this.renderSubmittedQs()}</ol>
		}
		else {
			return (
				<p className="lead">Looks like you have no questions in your survey so far... Fill out the form below to get started!</p>
			);
		}
	}
    render() {
        return (
        	<div>
              	<div className="container">
					<h2>Survey Constructor</h2>
					<h4>Current Progress</h4>
					{this.progressHandler()}
                  	<form className="new-survey">
				  		<QuestionForm submitfunc={this.submitQuestion.bind(this)}/>
						<button className="btn btn-block molloy-button" onClick={this.handleSubmit.bind(this)}>Submit Your Survey!</button>					
                  	</form>
              	</div>
          	</div>
        );
    }
};
