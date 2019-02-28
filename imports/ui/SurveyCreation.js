import React from 'react';
import {Mongo} from 'meteor/mongo';

import {Surveys} from '../api/surveys';
import NavBar from './NavBar';
import Footer from './Footer';
import { browserHistory } from '../routes/routes';

export default class AddSurvey extends React.Component {
    submitSurvey(e) {
        e.preventDefault();
        
        let surveyAdmin = this.refs.surveyAdmin.value.trim();
        let q1 = this.refs.q1.value.trim();
        let q2 = this.refs.q2.value.trim();
        let q3 = this.refs.q3.value.trim();
        let q4 = this.refs.q4.value.trim();
        let q5 = this.refs.q5.value.trim();
        let q6 = this.refs.q6.value.trim();
        let q7 = this.refs.q7.value.trim();
        let q8 = this.refs.q8.value.trim();
        let q9 = this.refs.q9.value.trim();
        let q10 = this.refs.q10.value.trim();
        
        console.log('Foo');
        const surveyId = Surveys.insert({
          surveyAdmin: surveyAdmin,
          questions: [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ],
          createdAt: new Date(), // Adds timestamp
        });
       
        let elements = document.getElementsByTagName("input");
        for (var ii=0; ii < elements.length; ii++) {
          if (elements[ii].type == "text") {
            elements[ii].value = "";
          }
        }
		browserHistory.replace('/surveys');
    }
    render() {
        return ( 
          <div>
              <NavBar />
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
              <Footer /> 
          </div>
        );
    }
};
