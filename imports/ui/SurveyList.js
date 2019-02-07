import React from 'react';
import ReactDOM from 'react-dom';

import AddSurvey from './Survey';

export default class SurveyList extends React.Component {
    render() {
        return (
            <section id="survey-page" class="text-secondary mt-3">
                <div class="container">
                    <h2 class="survey-welcome px-3 mb-4">[Your Name Here]'s Surveys</h2>
                </div>	

                <div class="container">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3>User's Created Surveys</h3>
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Survey Type</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mentor</td>
                                        <td>Complete</td>
                                        <td><a href="#" class="btn btn-danger text-white">Go To Survey</a></td>
                                        <td><a href="#" class="remove-survey-button text-dark"><i class="fas fa-times pt-2"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td>Mentee</td>
                                        <td>Incomplete</td>
                                        <td><a href="#" class="btn btn-danger text-white">Edit Survey</a></td>
                                        <td><a href="#" class="remove-survey-button text-dark"><i class="fas fa-times pt-2"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer">
                           <button class="create-survey btn btn-dark btn-block" onClick={() => {ReactDOM.render(<AddSurvey />, document.getElementById('AppConsole'))}}>Create a new survey!</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
} 