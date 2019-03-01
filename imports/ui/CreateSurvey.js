import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Surveys } from '../api/surveys';
import { Questions } from '../api/questions';
import { Options } from '../api/options';

export default class CreateSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			surveyInfo: {
				title: 'blah',
				author: this.userId,
				questions: [0, 1, 2]
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
                	<header>
                  	<h1>Add Survey</h1>
                  	<form className="new-survey">
				  		{/* 
							Need Survey Form Here
							
							
						
						*/}
						<button onClick={this.handleSubmit.bind(this)}>Submit Your Survey!</button>					
                  	</form>
                	</header>
              	</div>
          	</div>
        );
    }
};
