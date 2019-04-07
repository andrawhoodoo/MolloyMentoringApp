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
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitSurvey(this.state.questions);
	}
	submitQuestion(optArr, questionTitle) {
		let options = [];
		for(let i=0; i < optArr.length; i++) {
			Meteor.call('addOption', optArr[i].value, (err, res) => {
				options.concat(res);
				console.log(options);
				if(i === optArr.length - 1) {
					Meteor.call('addQuestion', questionTitle, options, (err, res) => {
						this.state.questions.concat(res);
						this.setState({questions: this.state.questions});
					})
				}
			});
		}
		{/*
		optArr.map(option => {
			Meteor.call('addOption', option.value, (err, res) => {
				options.concat(res);
			});
		});
		Meteor.call('addQuestion', questionTitle, options, (err, res) => {
			this.state.questions.concat(res);
			this.setState({questions: this.state.questions});
		});
		*/}
	}
    render() {
        return (
        	<div>
              	<div className="container">
                  	<form className="new-survey">
				  		<QuestionForm submitfunc={this.submitQuestion.bind(this)}/>
						<button onClick={this.handleSubmit.bind(this)}>Submit Your Survey!</button>					
                  	</form>
              	</div>
          	</div>
        );
    }
};
