import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Surveys } from '../api/surveys';
import { Questions } from '../api/questions';
import { Options } from '../api/options';

export default class CreateSurvey extends React.Component {
    render() {
        return (
          <div>
              <div className="container">
                <header>
                  <h1>Add Survey</h1>
                  <form className="new-survey" onSubmit={this.submitSurvey.bind(this)}>
                    <ul className="list-unstyled">
                      <li>Survey administrator: <input type="text" ref="surveyAdmin" name="surveyAdmin" placeholder="User ID" /></li>

                      <li>Question 1: <input type="text" ref="q1" name="q1" placeholder="Question ID" /></li>
                      <li>Question 2: <input type="text" ref="q2" name="q2" placeholder="Question ID" /></li>
                      <li>Question 3: <input type="text" ref="q3" name="q3" placeholder="Question ID" /></li>
                      <li>Question 4: <input type="text" ref="q4" name="q4" placeholder="Question ID" /></li>
                      <li>Question 5: <input type="text" ref="q5" name="q5" placeholder="Question ID" /></li>
                      <li>Question 6: <input type="text" ref="q6" name="q6" placeholder="Question ID" /></li>
                      <li>Question 7: <input type="text" ref="q7" name="q7" placeholder="Question ID" /></li>
                      <li>Question 8: <input type="text" ref="q8" name="q8" placeholder="Question ID" /></li>
                      <li>Question 9: <input type="text" ref="q9" name="q9" placeholder="Question ID" /></li>
                      <li>Question 10: <input type="text" ref="q10" name="q10" placeholder="Question ID" /></li>
                      <li><input type="submit" /></li>
                    </ul>

                  </form>
                </header>
              </div>
          </div>
        );
    }
};
