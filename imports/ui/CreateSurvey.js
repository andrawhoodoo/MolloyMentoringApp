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
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitSurvey(this.state.surveyInfo);
	}
    render() {
        return (
        	<div>
              	<div className="container">
                  	<form className="new-survey">
				  		<QuestionForm />
						<button onClick={this.handleSubmit.bind(this)}>Submit Your Survey!</button>					
                  	</form>
              	</div>
          	</div>
        );
    }
};
